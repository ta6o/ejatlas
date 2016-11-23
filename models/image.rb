require 'carrierwave'

class Image < ActiveRecord::Base
  #attr_accessible :file, :title, :description, :remote_file_url, :file_cache, :remove_file, :conflict_id
  validates_presence_of :file
  mount_uploader :file, ImageUploader
  belongs_to :attachable, polymorphic: true

  def file_url
    at = self.attachable
    return "https://file.ejatlas.org/img/#{at.class}/#{at.old_slug}/#{self.file.file.filename}" if at.has_attribute?('old_slug')
    return "https://file.ejatlas.org/img/#{at.class}/#{at.slug}/#{self.file.file.filename}" if at.has_attribute?('slug')
    return "https://file.ejatlas.org/img/#{at.class}/#{at.id}/#{self.file.file.filename}"
  end

  def thumb_url
    at = self.attachable
    return "https://file.ejatlas.org/img/#{at.class}/#{at.old_slug}/thumb_#{self.file.file.filename}" if at.has_attribute?('old_slug')
    return "https://file.ejatlas.org/img/#{at.class}/#{at.slug}/thumb_#{self.file.file.filename}" if at.has_attribute?('slug')
    return "https://file.ejatlas.org/img/#{at.class}/#{at.id}/thumb_#{self.file.file.filename}"
  end

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end

  def inspect
    self.file
  end
end
