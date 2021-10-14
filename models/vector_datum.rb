class GeoLayer < ActiveRecord::Base
  has_many :geo_layer_attachables, :dependent => :destroy
  has_many :featureds, :through => :geo_layer_attachables, :source=>:attachable, :source_type=>"Featured"
  has_many :conflicts, :through => :geo_layer_attachables, :source=>:attachable, :source_type=>"Conflict"

  def self.check_layers slugs
    require "rest_client"
    slugs = [] unless slugs
    puts slugs.join(", ").magenta
    local = GeoLayer.all.map(&:slug)
    layers = JSON.parse(RestClient.get("#{$gs_url}/rest/layers.json", params={}).body)["layers"]["layer"]
    layers |= []
    layers.each do |l|
      pata = JSON.parse(RestClient.get(l["href"], params={}).body)["layer"]
      type = pata["type"].downcase
      data = JSON.parse(RestClient.get(pata["resource"]["href"], params={}).body)[{"vector"=>"featureType","raster"=>"coverage"}[type]]
      attrs = {:name=>data["title"], :slug=>data["name"], :url=>"#{data["namespace"]["name"]}:#{data["name"]}", :description=>data["abstract"], :bbox=>"#{data["latLonBoundingBox"]["minx"]},#{data["latLonBoundingBox"]["maxx"]},#{data["latLonBoundingBox"]["miny"]},#{data["latLonBoundingBox"]["maxy"]}",:layer_type=>type,:srs=>data["srs"]}
      if local.include?(data["name"])
        local.delete data["name"]
        if slugs.empty? or slugs.include?(data["name"])
          puts "#{data["title"].cyan} (#{data["name"]})"
          gl = GeoLayer.find_by_slug(data["name"])
          gl.update(attrs)
          gl.update_style
        else
          puts "#{data["title"].yellow} (#{data["name"]})"
        end
      else
        puts "#{data["title"].green} (#{data["name"]})"
        gl = GeoLayer.create attrs
        gl.update_attrs true
        gl.update_style
      end
    end
    local.each do |l|
      if la = GeoLayer.find_by_slug(l)
        la.destroy
      end
    end
  end

  def update_attrs creating=false
    if self.layer_type == "vector"
      data = JSON.parse(RestClient.get("#{$gs_url}/rest/workspaces/geonode/datastores/geonode_data/featuretypes/#{self.slug}.json", params={}).body)["featureType"]
      attributes = []
      omitted = []
      idcol = nil
      attributes = data["attributes"]["attribute"].map{|a| a["name"]}
      attributes.each do |a|
        if a.match(/^\w+_id$/) or a === "id" or a.match(/^\w+_ID$/) or a === "ID"
          omitted << a 
        end
      end
      idcol = attributes.include?("feature_id") ? "feature_id" : omitted[0]
      if creating
        self.update :attributes_available=>attributes.to_json,:attributes_omitted=>omitted.to_json,:id_column => idcol
      else
        self.update :attributes_available=>attributes.to_json
      end
    end
  end

  def update_style
    style = ""
    if self.layer_type == "vector"
      data = JSON.parse(RestClient.get("#{$gs_url}/rest/workspaces/geonode/datastores/geonode_data/featuretypes/#{self.slug}.json", params={}).body)["featureType"]
      sld = RestClient.get("#{$gs_url}/rest/workspaces/geonode/styles/#{self.slug}.sld", params={}).body.gsub(/<\w+:/,"<").gsub(/<\/\w+:/,"</").gsub("<CssParameter","<SvgParameter").gsub("</CssParameter","</SvgParameter")#.gsub("<UserStyle","<StyledLayerDescriptor").gsub("</UserStyle","</StyledLayerDescriptor")
      File.open("/tmp/#{self.slug}.sld","w") {|f| f << sld}
      `/usr/bin/node #{Dir.pwd}/misc/sld2json/sld2json.js /tmp/#{self.slug}.sld`
      sld = File.read("/tmp/#{self.slug}.json")
      sld.gsub!(/rgb\(\d+\s*,\s*\d+\s*,\s*\d+\)/) do |args|
        hex = "#"
        args.scan(/\d+/).to_a.each do |x|
          hex += x.to_i.to_s(16).rjust(2,"0").upcase
        end
        hex
      end
      begin
        sld = JSON.parse(sld)
      rescue => e
        puts "#{self.name.green} #{self.url.yellow}"
        puts sld
        puts e.to_s.red
        return false
      end

      first = []
      last = []
      olfirst = []
      ollast = []
      imgs = []

      sld["layers"].each do |layer|
        script = ""
        olascr = ""
        key = ""
        condition = []
        condition << "zoom >= #{layer['minzoom']}" if layer.has_key? "minzoom"
        condition << "zoom <  #{layer['maxzoom']}" if layer.has_key? "maxzoom" and layer["maxzoom"].to_f > 0

        if layer.has_key? "filter"
          layer["filter"].each do |op,fil|
            cond = []
            fil.each do |key,val|
              filter = []
              if val.is_a? Array
                val.each do |v|
                  #filter << "String(feature.properties_[\"#{key}\"]) === \"#{v}\""
                  filter << "String(feature.properties_[\"#{key}\"]) #{op} \"#{v}\""
                end
              else
                filter << "feature.properties_[\"#{key}\"] #{op} #{val}"
              end
              cond << filter.join(' || ')
            end
            condition << cond.join(" && ") if cond.any?
          end
        end

        script += "\n  if(#{condition.join(" && ")}) {" if condition.any?
        if condition.any?
          key = condition.map{|c|c.scan(/("[^"]+"|\d+)/).map(&:first).join(":")}.join(";").gsub(/"/,"")
          olascr += "\n  if(#{condition.join(" && ")}) {" 
          olascr += "\n    if(Object.keys(geoStyles[\"#{self.slug}_style_cache\"]).indexOf(\"#{key}\") >= 0) { return geoStyles[\"#{self.slug}_style_cache\"][\"#{key}\"] };"
        else
          olascr += "\n    if(geoStyles[\"#{self.slug}_style_cache\"].length > 0) { return geoStyles[\"#{self.slug}_style_cache\"] };"
        end

        if layer["paint"].has_key?("icon-url")
          script += "\n    return ({"
          script += "\n      icon: new L.icon({"

          olascr += "\n    st = new ol.style.Style({"
          olascr += "\n      image: new ol.style.Icon({"
          img = "img_#{self.slug}_#{imgs.length}"
          imgs << layer['paint']['icon-url']

          layer["paint"].each do |key,val|
            if val.is_a? Hash
              val = val.to_json.strip
            else
              val = val.to_s.strip
            end
            if    key == "icon-url"
              script += "\n        iconUrl: '#{val}',"
              olascr += "\n        img: geoImages[\"#{img}\"],"
              olascr += "\n        imgSize: [geoImages[\"#{img}\"].width,geoImages[\"#{img}\"].height],"
            elsif key == "icon-size"
              script += "\n        iconSize: #{val},"
              size = JSON.parse(val);
              olascr += "\n        size: [geoImages[\"#{img}\"].width,geoImages[\"#{img}\"].height],"
              olascr += "\n        scale: #{size['x']} / geoImages[\"#{img}\"].width,"
            elsif key == "icon-anchor"
              script += "\n        iconAnchor: #{val},"
              olascr += "\n        anchor: #{val},"
              olascr += "\n        anchorXUnits: 'pixels',"
              olascr += "\n        anchorYUnits: 'pixels',"
            end
          end
          script += "\n      })"
          olascr += "\n      })"

        elsif layer["paint"].has_key?("icon-size")
          script += "\n    return ({"
          script += "\n      icon: new L.icon({"
          olascr += "\n    st = new ol.style.Style({"
          olascr += "\n      image: new ol.style.Circle({"
          layer["paint"].each do |key,val|
            if val.is_a? Hash
              val = val.to_json.strip
            else
              val = val.to_s.strip
            end
            if [ "fill-color", "icon-color"].include?(key)
              olascr += "\n        fill: new ol.style.Fill({"
              olascr += "\n          color: '#{val}',"
              olascr += "\n        }),"
            elsif key == "icon-size"
              x = JSON.parse(val)["x"] || 10;
              olascr += "\n        radius: #{(x/2.0).to_i},"
            elsif    key == "line-color"
              olascr += "\n        stroke: new ol.style.Stroke({"
              olascr += "\n          color: \"#{val}\","
              olascr += "\n          width: #{layer['paint']['line-width']}," if layer['paint'].has_key?("line-width")
              olascr += "\n        }),"
            end
          end
          script += "\n      })"
          olascr += "\n      })"
        else
          script += "\n    return ({"
          olascr += "\n    st = new ol.style.Style({"
          if (layer["paint"].keys & ["line-color"]).any?
            olascr += "\n      stroke: new ol.style.Stroke({"
            layer["paint"].each do |key,val|
              if val.is_a? Hash
                val = val.to_json.strip
              else
                val = val.to_s.strip
              end
              if    key == "line-color"
                script += "\n      stroke: true,"
                script += "\n      color: \"#{val}\","
                olascr += "\n        color: \"#{val}\","
              elsif key == "line-width"
                script += "\n      weight: #{val},"
                olascr += "\n        width: #{val},"
              elsif key == "line-opacity"
                script += "\n        opacity: #{val},"
                # TODO
              elsif key == "line-cap"
                script += "\n      lineCap: \"#{val.sub(/^#/,'')}\","
                olascr += "\n        lineCap: \"#{val.sub(/^#/,'')}\","
              elsif key == "line-join"
                script += "\n      lineJoin: \"#{val.sub(/^#/,'')}\","
                olascr += "\n        lineJoin: \"#{val.sub(/^#/,'')}\","
              elsif key == "line-dasharray"
                script += "\n      dashArray: #{val},"
                olascr += "\n        lineDash: #{val},"
              elsif key == "line-dashoffset"
                script += "\n      dashOffset: #{val},"
                olascr += "\n        lineDashOffset: #{val},"
              end
            end
            olascr += "\n      }),"
          end
          if (layer["paint"].keys & ["fill-color"]).any?
            olascr += "\n      fill: new ol.style.Fill({"
            if layer["paint"].has_key? "fill-opacity"
              opa = (layer["paint"]["fill-opacity"] * 255).round.to_s(16).upcase
            else
              opa = "FF"
            end
            layer["paint"].each do |key,val|
              if val.is_a? Hash
                val = val.to_json.strip
              else
                val = val.to_s.strip
              end
              if key == "fill-color"
                script += "\n      fill: true,"
                script += "\n      fillColor: \"#{val}\","
                olascr += "\n        color: \"#{val}#{opa}\","
              elsif key == "icon-color"
                script += "\n      fill: true,"
                script += "\n      fillColor: \"#{val}\","
                #script += "\n      color: \"#{val}\","
                olascr += "\n        color: \"#{val}#{opa}\","
              elsif key == "icon-size"
                script += "\n      radius: #{val.to_json},"
              end
            end
            olascr += "\n      })"
          end
        end

        if layer["paint"].has_key?("line-color")
          unless layer["paint"].has_key?("line-width")
            script += "\n      weight: 1,"
          end
        else
          script += "\n      stroke: false," 
        end
        script += "\n      fill: false,"   unless layer["paint"].has_key?("fill-color") or layer["paint"].has_key?("icon-color") or layer["paint"].has_key?("fill")
        script += "\n    })"
        script += "\n  }" if condition.any?
        if condition.any?
          olascr += "\n    })"
          olascr += "\n    geoStyles[\"#{self.slug}_style_cache\"][\"#{key}\"] = st;"
          olascr += "\n    return st" 
          olascr += "\n  }" 
        else
          olascr += "\n    })"
          olascr += "\n    geoStyles[\"#{self.slug}_style_cache\"] = st;"
          olascr += "\n    return st" 
        end
        if condition.any?
          first << script
          olfirst << olascr
        else
          last << script
          ollast << olascr
        end
      end
      style = "function #{self.slug}_style(feature, resolution) {"
      olstyle = "geoStyles[\"#{self.slug}_style_cache\"] = {};"
      olstyle += "\nfunction #{self.slug}_style(feature, resolution) {"
      #olstyle += "\n  console.log(['#{self.slug}',feature.properties_]);"
      first.each {|x| style += x}
      last.each {|x| style += x}
      olfirst.each {|x| olstyle += x}
      ollast.each {|x| olstyle += x}
      style += "\n}"
      olstyle += "\n}"
      imgs.each_with_index do |url,ind|
        img = "img_#{self.slug}_#{ind}"
        olstyle += "\n"
        olstyle += "\ngeoImages[\"#{img}\"] = new Image;"
        olstyle += "\ngeoImages[\"#{img}\"].src = \"#{url}\";"
      end

      icon = style.gsub(/,\n/,";").gsub(/\s*/,"").match(/return\({([^}]+)}\)/)
      if icon
        icon = icon[1]
        {"stroke:false;"=>"","fill:false;"=>"","stroke:true;"=>"","fill:true;"=>"",";color"=>";stroke","weight"=>"stroke-width","strokeOpacity"=>"stroke-opacity","fillColor"=>"fill","fillOpacity"=>"fill-opacity","\""=>""}.each do |k,v|
          icon = icon.gsub(k,v)
        end
        icon = "{\n    #{icon}\n}"
      else
        icon = nil
      end
    end
    #self.update :style => style, :icon=>icon
    self.update :style => olstyle, :icon=>icon
    return true
  end

  def info
    {:id=>self.id,:name=>self.name, :slug=>self.slug, :style=>self.style, :type=>self.layer_type, :omit=>self.attributes_omitted,:icon=>self.icon,:id_column=>self.id_column,:title_column=>self.title_column,:desc=>self.description}
  end

  def inspect
    if self.geo_layer_attachables.any? 
      "#{self.name.cyan} in #{self.geo_layer_attachables.sort.map{|a| "#{a.attachable.name.yellow} (#{a.attachable_type.green})"}.join(", ")}"
    else
      self.name.cyan
    end
  end
end

class GeoLayerAttachable < ActiveRecord::Base
  belongs_to :attachable, polymorphic: true
  belongs_to :geo_layer
end

class VectorDatum < ActiveRecord::Base
  belongs_to :attachable, polymorphic: true
  belongs_to :vector_style
  belongs_to :account

  before_save :set_style

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end

  def inspect
    self.attachable ? "#{self.name} of #{self.attachable.name}" : self.name
  end

  def map
    self.attachable ? "<a href='/#{self.attachable_type.downcase}/#{self.attachable.old_slug(true)}' target='_blank'>#{self.attachable.name}</a> <small>(#{self.attachable_type})</small>" : ""
  end

  private
  def set_style
    self.vector_style = VectorStyle.first if self.vector_style.nil?
    self.style = self.vector_style.jsonize if self.vector_style_id
    self.description = self.description.gsub(/\n/,'<br />')
  end
end

class VectorStyle < ActiveRecord::Base
  self.primary_key = :id
  has_many :vector_data

  before_save :set_slug

  def jsonize
    styles = {}
    styles["color"] = self.stroke_color if self.stroke_color
    styles["opacity"] = self.stroke_opacity.to_f if self.stroke_opacity
    styles["fillColor"] = self.fill_color if self.fill_color
    styles["fillOpacity"] = self.fill_opacity.to_f if self.fill_opacity
    styles["weight"] = self.weight.to_i if self.weight
    styles["dashArray"] = self.dash_array if self.dash_array
    return styles.to_json
  end

  def inspect
    self.name
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
  end

end

class OldSlug < ActiveRecord::Base
  self.primary_key = :id
  belongs_to :attachable, polymorphic: true

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end
end
