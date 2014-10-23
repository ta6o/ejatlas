class Tag < ActiveRecord::Base
  has_many :c_tags
  has_many :conflicts, :through => :c_tags

  has_many :f_tags
  has_many :featureds, :through => :f_tags

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  def inspect
    self.name
  end

  before_save :set_slug

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def self.find_slug slug
    if c = Tag.find(:first, :conditions => ["slug = lower(?)", slug])
      return c
    elsif os = OldSlug.where("attachable_type = 'Tag'").find(:first, :conditions => ["name = lower(?)", slug])
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    Tag.find(:first, :conditions => ["name = lower(?)", name])
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
  end
end
