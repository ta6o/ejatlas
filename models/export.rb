class Pattern
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, PatternUploader
  def save
    self.store_file!
  end
end

class GeoData
  extend CarrierWave::Mount
  attr_accessor :file, :folder
  mount_uploader :file, GeoUploader
  def save
    self.store_file!
  end
end

