require 'carrierwave'

CarrierWave.configure do |config|
  config.storage = :file
end

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  storage :file
  def store_dir
    at = self.model.attachable 
    return "#{Padrino.root}/../img/#{at.class}/#{at.old_slug}"if at.has_attribute?('old_slug')
    return "#{Padrino.root}/../img/#{at.class}/#{at.slug}"if at.has_attribute?('slug')
    "#{Padrino.root}/../img/#{at.class}/#{at.id}"
  end

  def cache_dir
    "/tmp/uploads"
  end

  def url
    at = self.model.attachable 
    return "https://file.ejatlas.org/img/#{at.class}/#{at.old_slug}/#{self.file.filename}"if at.has_attribute?('old_slug')
    return "https://file.ejatlas.org/img/#{at.class}/#{at.slug}/#{self.file.filename}"if at.has_attribute?('slug')
    "https://file.ejatlas.org/img/#{at.class}/#{at.id}/#{self.file.filename}"
  end

  version :thumb do
    process :resize_to_fit => [2400,240]
  end
end

class DocumentUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../file/docs/"+self.model.conflict.old_slug
  end

  def url
    "https://file.ejatlas.org/docs/#{self.model.conflict.old_slug}/#{self.file.filename}"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class Exporter < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../exports"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class PatternUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../patterns"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class GeoUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../vector"
  end

  def cache_dirchoropleth
    "#{Padrino.root}/tmp/uploads"
  end
end

class TmpUploader < CarrierWave::Uploader::Base
  storage :file
  #config.fog_authenticated_url_expiration = 600 
  def store_dir
    "/tmp"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

