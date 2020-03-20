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
      data = JSON.parse(RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/datastores/geonode_data/featuretypes/#{l["name"]}.json", params={}).body)["featureType"]
      puts data["title"].cyan
      style = RestClient.get("https://geo.ejatlas.org/geoserver/rest/workspaces/geonode/styles/#{l["name"]}.sld", params={}).body
      File.open("/tmp/#{l['name']}.sld","w") {|f| f << style}
      `node #{Dir.pwd}/misc/sld2json/sld2json#{style.match(/se:/) ? "_se" : ""}.js /tmp/#{l['name']}.sld`
      style = File.read("/tmp/#{l['name']}.json")
      style.gsub!(/rgb\(\d+\s*,\s*\d+\s*,\s*\d+\)/) do |args|
        hex = "#"
        args.scan(/\d+/).to_a.each do |x|
          hex += x.to_i.to_s(16).rjust(2,"0").upcase
        end
        hex
      end
      p JSON.parse(style)
      attrs = {:name=>data["title"], :slug=>l["name"], :url=>"#{data["namespace"]["name"]}:#{l["name"]}", :description=>data["abstract"], :bbox=>"#{data["latLonBoundingBox"]["minx"]},#{data["latLonBoundingBox"]["maxx"]},#{data["latLonBoundingBox"]["miny"]},#{data["latLonBoundingBox"]["maxy"]}"}
      if local.include?(l["name"])
        local.delete l["name"]
        GeoLayer.find_by_slug(l["name"]).update_attributes(attrs)
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
