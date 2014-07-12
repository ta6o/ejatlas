class Image < ActiveRecord::Base
  attr_accessible :file, :title, :description, :remote_file_url, :file_cache, :remove_file, :conflict_id
  validates_presence_of :file
  mount_uploader :file, ImageUploader
  belongs_to :attachable, polymorphic: true

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end

  def inspect
    self.name
  end
end
