class Document < ActiveRecord::Base
  #attr_accessible :file, :title, :description, :remote_file_url, :file_cache, :remove_file, :conflict_id
  validates_presence_of :file
  mount_uploader :file, DocumentUploader
  belongs_to :conflict

  def file_url
    return "https://file.ejatlas.org/docs/#{self.conflict.old_slug}/#{self.file}"
  end
end
