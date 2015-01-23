class VectorDatum < ActiveRecord::Base
  belongs_to :attachable, polymorphic: true
  belongs_to :vector_style

  before_save :set_style

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end

  def inspect
    self.attachable ? "#{self.name} of #{self.attachable.name}" : self.name
  end

  def map
    self.attachable ? "<a href='/#{self.attachable_type.downcase}/#{self.attachable.old_slug}' target='_blank'>#{self.attachable.name}</a> <small>(#{self.attachable_type})</small>" : ""
  end

  private
  def set_style
    self.vector_style = VectorStyle.first if self.vector_style.nil?
    self.style = self.vector_style.jsonize if self.vector_style_id
    self.description = self.description.gsub(/\n/,'<br />')
  end
end

class VectorStyle < ActiveRecord::Base
  self.primary_key = :id
  has_many :vector_data

  before_save :set_slug

  def jsonize
    styles = {}
    styles["color"] = self.stroke_color if self.stroke_color
    styles["opacity"] = self.stroke_opacity.to_f if self.stroke_opacity
    styles["fillColor"] = self.fill_color if self.fill_color
    styles["fillOpacity"] = self.fill_opacity.to_f if self.fill_opacity
    styles["weight"] = self.weight.to_i if self.weight
    styles["dashArray"] = self.dash_array if self.dash_array
    return styles.to_json
  end

  def inspect
    self.name
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
  end

end

class OldSlug < ActiveRecord::Base
  self.primary_key = :id
  belongs_to :attachable, polymorphic: true

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end
end
