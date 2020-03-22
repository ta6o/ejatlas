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
      begin
        data = JSON.parse(RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/datastores/geonode_data/featuretypes/#{l["name"]}.json", params={}).body)["featureType"]
        type = "vector"
      rescue
        begin
          data = JSON.parse(RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/coveragestores/tmax_07/coverages/#{l["name"]}.json", params={}).body)["coverage"]
          type = "raster"
        rescue => e
          puts e.to_s.red
        end
      end
      puts "#{data["title"].cyan} (#{data["name"]})"
      style = ""
      attributes = []
      omitted = []
      if type == "vector"
        sld = RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/styles/#{l["name"]}.sld", params={}).body
        File.open("/tmp/#{l['name']}.sld","w") {|f| f << sld}
        `/usr/bin/node #{Dir.pwd}/misc/sld2json/sld2json#{sld.match(/<se:/) ? "_se" : ""}.js /tmp/#{l['name']}.sld`
        sld = File.read("/tmp/#{l['name']}.json")
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
            if    key == "fill-color"
              script += "\n      fill: true,"
              script += "\n      fillColor: \"#{val}\","
            elsif key == "fill-opacity"
              script += "\n      fillOpacity: #{val},"
            elsif key == "line-color"
              script += "\n      stroke: true,"
              script += "\n      color: \"#{val}\","
            elsif key == "line-width"
              script += "\n      weight: #{val},"
            elsif key == "line-opacity"
              script += "\n      opacity: #{val},"
            elsif key == "line-join"
              script += "\n      lineJoin: \"#{val.sub(/^#/,'')}\","
            end
          end
          unless layer["paint"].has_key?("line-color")
            script += "\n      stroke: false,"
          end
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

        attributes = data["attributes"]["attribute"].map{|a| a["name"]}
        attributes.each do |a|
          if a.match(/^\w+_id$/) or a === "id"
            omitted << a 
          end
        end
      end
      attrs = {:name=>data["title"], :slug=>l["name"], :url=>"#{data["namespace"]["name"]}:#{l["name"]}", :description=>data["abstract"], :bbox=>"#{data["latLonBoundingBox"]["minx"]},#{data["latLonBoundingBox"]["maxx"]},#{data["latLonBoundingBox"]["miny"]},#{data["latLonBoundingBox"]["maxy"]}",:style=>style,:layer_type=>type,:attributes_available=>attributes.to_json,:attributes_omitted=>omitted.to_json,:srs=>data["srs"]}
      if local.include?(l["name"])
        local.delete l["name"]
        GeoLayer.find_by_slug(l["name"]).update_attributes(attrs.except("description","attributes_omitted"))
      else
        GeoLayer.create attrs
      end
    end
    local.each do |l|
      if la = GeoLayer.find_by_slug(l)
        la.destroy
      end
    end
  end

  def info
    {:name=>self.name, :style=>self.style, :type=>self.layer_type, :omit=>self.attributes_omitted}
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
    self.attachable ? "<a href='/#{self.attachable_type.downcase}/#{self.attachable.old_slug}' target='_blank'>#{self.attachable.name}</a> <small>(#{self.attachable_type})</small>" : ""
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
