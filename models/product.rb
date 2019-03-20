class Product < ActiveRecord::Base
  has_many :c_products
  has_many :conflicts, :through => :c_products

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  before_save :set_slug

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
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
    if c = Product.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Product'").where(:name=>slug.downcase).first
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Product.where(:slug=>slug.downcase).first
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    ping
  end
end
