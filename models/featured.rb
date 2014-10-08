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
    conflicts.each do |c|
      cmarker = JSON.parse(c.marker)
      data = JSON.parse(self.features)['data']
      JSON.parse(c.features).each do |k,v|
        cmarker[k] = v
      end
      json << c.json
      marker << cmarker
      link << c.as_button
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
    self.save
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

