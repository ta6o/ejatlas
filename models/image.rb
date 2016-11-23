require 'carrierwave'

CarrierWave.configure do |config|
  config.storage = :fog
  #config.fog_provider = "fog/aws"
  config.fog_credentials = {
    :provider               => 'AWS',
    #:region                 => 'eu-west-1',
    :aws_access_key_id      => 'AKIAJQV2IS77WH4CVNOQ',
    :aws_secret_access_key  => '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'
  }
  config.fog_directory  = 'ejatlas'
end

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  storage :file
  def store_dir
    at = self.model.attachable 
    return "#{Padrino.root}/../file/img/#{at.class}/#{at.old_slug}"if at.methods.include?(:old_slug)
    return "#{Padrino.root}/../file/img/#{at.class}/#{at.slug}"if at.has_attribute?('slug')
    "#{Padrino.root}/../file/img/#{at.class}/#{at.id}"
  end

  def cache_dir
    "/tmp/uploads"
  end

  def url
    at = self.model.attachable 
    return "https://file.ejatlas.org/img/#{at.class}/#{at.old_slug}/#{self.file.filename}"if at.methods.include?(:old_slug)
    return "https://file.ejatlas.org/img/#{at.class}/#{at.slug}/#{self.file.filename}"if at.has_attribute?('slug')
    "https://file.ejatlas.org/img/#{at.class}/#{at.id}/#{self.file.filename}"
  end

  def thumb_url
    at = self.model.attachable 
    return "https://file.ejatlas.org/img/#{at.class}/#{at.old_slug}/thumb_#{self.file.filename}"if at.methods.include?(:old_slug)
    return "https://file.ejatlas.org/img/#{at.class}/#{at.slug}/thumb_#{self.file.filename}"if at.has_attribute?('slug')
    "https://file.ejatlas.org/img/#{at.class}/#{at.id}/thumb_#{self.file.filename}"
  end

  version :thumb do
    process :resize_to_fit => [2400,240]
  end
end

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
