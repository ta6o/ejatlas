require "carrierwave-aws"
CarrierWave.configure do |config|
  config.storage = :aws
  config.aws_bucket = 'ejatlas'
  config.aws_acl = 'public-read'
  config.aws_credentials = {
    access_key_id: 'AKIAJQV2IS77WH4CVNOQ',
    secret_access_key: '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',
    region: 'us-east-1'
  }
end

class ImageUploader < CarrierWave::Uploader::Base
  #include CarrierWave::RMagick
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

class PatternUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../file/patterns"
  end

  def url
    "https://file.ejatlas.org/patterns/#{self.file.filename}"
  end

  def cache_dir
    "/tmp/uploads"
  end
end

class GeoUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../file/vector/#{self.model.folder}"
  end

  def url
    "https://file.ejatlas.org/vector/#{self.model.folder}/#{self.file.filename}"
  end
end

class BackupUploader < CarrierWave::Uploader::Base
  storage :aws

  def store_dir
    "/backup"
  end

  def cache_dir
    "/tmp"
  end

end

