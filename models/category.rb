class Category < ActiveRecord::Base
  has_many :types
  has_many :conflicts

  accepts_nested_attributes_for :types

  before_save :set_slug

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
  end
end
