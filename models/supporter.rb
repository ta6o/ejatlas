class Supporter < ActiveRecord::Base
  has_many :c_supporters
  has_many :conflicts, :through => :c_supporters

  has_many :logo_images, class_name: "Image", as: :attachable, dependent: :destroy
  has_many :vector_data, as: :attachable, dependent: :destroy

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy
  has_many :former_infos, class_name: "FormerInfo", as: :attachable, dependent: :destroy

  belongs_to :parent, :class_name => "Supporter", :foreign_key => "parent_id"

  belongs_to :country

  before_save :set_slug
  before_destroy :destroy_instance

  def inspect
    self.name
  end

  def children
    Supporter.where(:parent_id=>self.id)
  end

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def old_slug new=false
    if self.old_slugs.any?
      return self.old_slugs[0].name
    end
    return self.slug if new
    nil
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
    self.conflicts.where(approval_status: 'approved').map{|c|ct=c.conflict_texts.where(:locale=>locale);if ct.any? then ct[0] else nil end} - [nil]
  end

  def local_conflicts_count locale=:en
    self.local_conflicts(locale).count
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
  def destroy_instance
    CSupporter.where(:supporter_id=>self.id).each  &:destroy
    self.logo_images.each  &:destroy
    self.old_slugs.each    &:destroy
    self.former_infos.each &:destroy
    $client.delete index: $esindex, type: "doc", id: "ifi_#{self.id}"
  end
end
