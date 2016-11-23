class DocumentUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "#{Padrino.root}/../file/docs/"
  end

  def url
    "https://file.ejatlas.org/docs/#{self.file.filename}"
  end

  def cache_dir
    "/tmp/uploads"
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
    puts self.model.folder
    "#{Padrino.root}/../file/vector/#{self.model.folder}"
  end

  def url
    "https://file.ejatlas.org/vector/#{self.model.folder}/#{self.file.filename}"
  end
end

class BackupUploader < CarrierWave::Uploader::Base
  storage :fog

  def cache_dir
    "/tmp"
  end

end

