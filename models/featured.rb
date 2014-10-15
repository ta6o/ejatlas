class Featured < ActiveRecord::Base
  has_many :vector_data, as: :attachable, dependent: :destroy

  def inspect
    self.name
  end

  before_save :set_slug

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    @json[:description] = self.description
    return @json.to_json
  end

  def ping conflicts
    json, marker, link = [], [], []
    data = JSON.parse(self.filter || "{}")
    feats = JSON.parse(self.features || "{}")
    data["id"] = self.id
    data["data"] = feats
    ftags = (data['tag'] || []).map {|t| Tag.find_slug(t)}
    conflicts.each do |c|
      cmarker = JSON.parse(c.marker)
      JSON.parse(c.features).each do |k,v|
        cmarker[k] = v
      end
      cmarker[:dmn] = (ftags & c.tags).map {|t| t.domain}
      cmarker[:tags] = (ftags & c.tags).map {|t| t.name}
      json << c.json
      marker << cmarker.to_json
      puts
      p data
      link << c.as_button(data)
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
    self.save!
  end

  def self.find_slug slug
    if c = Featured.find(:first, :conditions => ["slug = lower(?)", slug])
      return c
    else
      return nil
    end
  end

  def self.find_name name
    Featured.find(:first, :conditions => ["name = lower(?)", name])
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
  end
end

