class Tag < ActiveRecord::Base
  has_many :c_tags, :dependent => :destroy
  has_many :conflicts, :through => :c_tags

  has_many :f_tags, :dependent => :destroy
  has_many :featureds, :through => :f_tags

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  belongs_to :filter

  def inspect
    "#{self.id.to_s.cyan}: #{self.name}"
  end

  def index
    $client.index index: $esindex, id: "tag_#{self.id}", body: {id:self.id,name:self.name,slug:self.slug,type:"tag"}
  end

  def update_from_filter
    return false unless self.filter
    fc = self.filter.conflicts
    ctd = []
    self.c_tags.each do |ct|
      unless fc.include? (ct.conflict)
        ctd << ct.id
      end
    end
    ctd.each { |ct| CTag.find(ct).destroy }
    fc.each do |c|
      unless self.conflicts.include?(c)
        self.conflicts << c
      end
    end
    self.index
  end

  before_save :set_slug

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def self.find_slug slug
    if c = Tag.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Tag'").where(:name=>slug.downcase).first
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
    self.index
  end
end

