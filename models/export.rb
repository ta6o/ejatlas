class Export
  extend CarrierWave::Mount
  attr_accessor :file
  mount_uploader :file, Exporter
  def save
    self.store_file!
  end
end
