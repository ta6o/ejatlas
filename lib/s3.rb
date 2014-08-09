require 'carrierwave'

CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => 'AKIAJQV2IS77WH4CVNOQ',
    :aws_secret_access_key  => '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'
  }
  config.fog_directory  = 'ejatlas'
  config.fog_public     = true
end

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  storage :fog
  def store_dir
    "img/#{self.model.attachable.class}/#{self.model.attachable.slug}"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end

  version :thumb do
    process :resize_to_fit => [2400,240]
  end
end

class DocumentUploader < CarrierWave::Uploader::Base
  storage :fog
  def store_dir
    "docs/"+self.model.conflict.slug
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class Exporter < CarrierWave::Uploader::Base
  storage :fog
  def store_dir
    "exports"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class PatternUploader < CarrierWave::Uploader::Base
  storage :fog
  def store_dir
    "patterns"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class ChoroUploader < CarrierWave::Uploader::Base
  storage :fog
  def store_dir
    "choropleth"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class GeoUploader < CarrierWave::Uploader::Base
  storage :fog
  def store_dir
    "vector"
  end

  def cache_dirchoropleth
    "#{Padrino.root}/tmp/uploads"
  end
end

class TmpUploader < CarrierWave::Uploader::Base
  storage :fog
  #config.fog_authenticated_url_expiration = 600 
  def store_dir
    "tmp"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

class BackUploader < CarrierWave::Uploader::Base
  storage :fog
  def filename
    "ejdb#{Time.now.strftime('%y%m%d%H%M%S')}.dump"
  end
  def store_dir
    "backup"
  end

  def cache_dir
    "#{Padrino.root}/tmp/uploads"
  end
end

