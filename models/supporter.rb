class Supporter < ActiveRecord::Base
  has_many :c_supporters
  has_many :conflicts, :through => :c_supporters

  belongs_to :country

  has_many :logo_images, class_name: "Image", as: :attachable, dependent: :destroy
  has_many :vector_data, as: :attachable, dependent: :destroy

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  before_save :set_slug

  def inspect
    self.name
  end

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def old_slug
    if self.old_slugs.any?
      return self.old_slugs[0].name
    end
    return self.slug
  end

  def ping
    json, marker, link = [], [], []
    self.conflicts.where(approval_status: 'approved').order("id asc").each do |c|
      #json << c.json
      marker << c.marker
      link << c.as_button
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
  end

  def self.find_slug slug
    if c = Supporter.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Supporter'").where(:name=>slug.downcase).first
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Supporter.where(:slug=>slug.downcase).first
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    ping
  end
end
