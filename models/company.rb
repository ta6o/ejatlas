class Company < ActiveRecord::Base
  has_many :c_companies
  has_many :conflicts, :through => :c_companies

  has_many :p_companies
  has_many :products, :through => :p_companies

  has_many :logo_images, class_name: "Image", as: :attachable, dependent: :destroy
  has_many :vector_data, as: :attachable, dependent: :destroy

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  belongs_to :country

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

  def ping
    json, marker, link = [], [], []
    self.conflicts.order("name asc").where(approval_status: 'approved').each do |c|
      json << c.json
      marker << c.marker
      link << c.as_button
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
  end

  def self.find_slug slug
    if c = Company.find(:first, :conditions => ["slug = lower(?)", slug])
      return c
    elsif os = OldSlug.where("attachable_type = 'Company'").find(:first, :conditions => ["name = lower(?)", slug])
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Company.find(:first, :conditions => ["slug = lower(?)", slug])
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    ping
  end
end
