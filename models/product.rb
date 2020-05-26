class Product < ActiveRecord::Base
  has_many :c_products
  has_many :conflicts, :through => :c_products

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  before_save :set_slug

  def jsonize locale=:en, keep_para=false
    @json = {}
    if keep_para
      @json[:name] = I18n.t("m.products.#{self.name.slug("_").split("_")[0..7].join("_")}",:locale=>locale)
    else
      @json[:name] = I18n.t("m.products.#{self.name.slug("_").split("_")[0..7].join("_")}",:locale=>locale).gsub(/\([^\)]+\)/,"")
    end
    @json[:slug] = self.slug
    return @json.to_json
  end

  def ping
    json, marker, link = [], [], []
    self.conflicts.order("id asc").each do |c|
      if c.approval_status == "approved"
        marker << JSON.parse(c.marker||c.as_marker.to_json)
        link << c.as_button
      end
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
  end

  def local_conflicts locale=:en
    self.conflicts.map{|c|ct=c.conflict_texts.where(approval_status: 'approved', locale: locale);if ct.any? then ct[0] else nil end}.uniq - [nil]
  end

  def local_conflicts_count locale=:en
    self.local_conflicts(locale).count
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
