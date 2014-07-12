class Export
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, Exporter
  def save
    self.store_file!
  end
end

class Pattern
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, PatternUploader
  def save
    self.store_file!
  end
end


class ChoroData
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, ChoroUploader
  def save
    self.store_file!
  end
end

class GeoData
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, GeoUploader
  def save
    self.store_file!
  end
end

class TmpData
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, TmpUploader
  def save
    self.store_file!
  end
end

class Backup
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, BackUploader
  def save
    self.store_file!
  end
end

