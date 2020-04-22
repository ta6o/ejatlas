class GeoLayer < ActiveRecord::Base
  has_many :geo_layer_attachables, :dependent => :destroy
  has_many :featureds, :through => :geo_layer_attachables, :source=>:attachable, :source_type=>"Featured"
  has_many :conflicts, :through => :geo_layer_attachables, :source=>:attachable, :source_type=>"Conflict"

  def self.check_layers
    require "rest_client"
    local = GeoLayer.all.map(&:slug)
    layers = JSON.parse(RestClient.get("https://geo.ejatlas.org/geoserver/rest/layers.json", params={}).body)["layers"]["layer"]
    layers |= []
    layers.each do |l|
      pata = JSON.parse(RestClient.get(l["href"], params={}).body)["layer"]
      type = pata["type"].downcase
      data = JSON.parse(RestClient.get(pata["resource"]["href"], params={}).body)[{"vector"=>"featureType","raster"=>"coverage"}[type]]
      puts "#{data["title"].cyan} (#{data["name"]})"
      attrs = {:name=>data["title"], :slug=>data["name"], :url=>"#{data["namespace"]["name"]}:#{data["name"]}", :description=>data["abstract"], :bbox=>"#{data["latLonBoundingBox"]["minx"]},#{data["latLonBoundingBox"]["maxx"]},#{data["latLonBoundingBox"]["miny"]},#{data["latLonBoundingBox"]["maxy"]}",:layer_type=>type,:srs=>data["srs"]}
      if local.include?(data["name"])
        local.delete data["name"]
        gl = GeoLayer.find_by_slug(data["name"])
        gl.update_attributes(attrs)
        gl.update_style
      else
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
      data = JSON.parse(RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/datastores/geonode_data/featuretypes/#{self.slug}.json", params={}).body)["featureType"]
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
        self.update_attributes :attributes_available=>attributes.to_json,:attributes_omitted=>omitted.to_json,:id_column => idcol
      else
        self.update_attributes :attributes_available=>attributes.to_json
      end
    end
  end

  def update_style
    style = ""
    begin
      if self.layer_type == "vector"
        data = JSON.parse(RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/datastores/geonode_data/featuretypes/#{self.slug}.json", params={}).body)["featureType"]
        sld = RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/styles/#{self.slug}.sld", params={}).body.gsub(/<\w+:/,"<").gsub(/<\/\w+:/,"</").gsub("<CssParameter","<SvgParameter").gsub("</CssParameter","</SvgParameter")
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
        sld = JSON.parse(sld)
        first = []
        last = []
        sld["layers"].each do |layer|
          script = ""
          condition = []
          condition << "zoom >= #{layer['minzoom']}" if layer.has_key? "minzoom"
          condition << "zoom <  #{layer['maxzoom']}" if layer.has_key? "maxzoom"
          if layer.has_key? "filter"
            layer["filter"].each do |key,val|
              filter = []
              val.each do |v|
                filter << "String(properties[\"#{key}\"]) === \"#{v}\""
              end
              condition << "(#{filter.join(' || ')})"
            end
          end
          script += "\n  if(#{condition.join(" && ")}) {" if condition.any?
          script += "\n    return ({"
          layer["paint"].each do |key,val|
            val = val.to_s.strip
            if    key == "line-color"
              script += "\n      stroke: true,"
              script += "\n      color: \"#{val}\","
            elsif key == "line-width"
              script += "\n      weight: #{val},"
            elsif key == "line-opacity"
              script += "\n      opacity: #{val},"
            elsif key == "line-cap"
              script += "\n      lineCap: \"#{val.sub(/^#/,'')}\","
            elsif key == "line-join"
              script += "\n      lineJoin: \"#{val.sub(/^#/,'')}\","
            elsif key == "line-dasharray"
              script += "\n      dashArray: #{val},"
            elsif key == "line-dashoffset"
              script += "\n      dashOffset: #{val},"
            elsif key == "fill-color"
              script += "\n      fill: true,"
              script += "\n      fillColor: \"#{val}\","
            elsif key == "fill-opacity"
              script += "\n      fillOpacity: #{val},"
            end
          end
          script += "\n      stroke: false," unless layer["paint"].has_key?("line-color")
          script += "\n      fill: false,"   unless layer["paint"].has_key?("fill-color")
          script += "\n    })"
          script += "\n  }" if condition.any?
          if condition.any?
            first << script
          else
            last << script
          end
        end
        style = "function(properties, zoom, geometryDimension) {"
        first.each {|x| style += x}
        last.each {|x| style += x}
        style += "\n}"

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
      self.update_attributes :style => style, :icon=>icon
      return true
    rescue => e
      return e
    end
  end

  def info
    {:id=>self.id,:name=>self.name, :style=>self.style, :type=>self.layer_type, :omit=>self.attributes_omitted,:icon=>self.icon,:id_column=>self.id_column}
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
