class Type < ActiveRecord::Base
  belongs_to :category

  has_many :c_types
  has_many :conflicts, :through => :c_types

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  def inspect
    return self.id, self.name
  end

  before_save :set_slug

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def ping
    json, marker, link = [], [], []
    self.conflicts.order("name asc").where(approval_status: 'approved').each do |c|
      #json << c.json
      marker << c.marker
      link << c.as_button
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
  end

  def self.find_slug slug
    if c = Type.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Type'").where(:name=>slug.downcase).first
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Type.where(:slug=>slug.downcase).first
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    ping
  end
end
