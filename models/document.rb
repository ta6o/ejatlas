class Document < ActiveRecord::Base
  #attr_accessible :file, :title, :description, :remote_file_url, :file_cache, :remove_file, :conflict_id
  validates_presence_of :file
  mount_uploader :file, DocumentUploader
  belongs_to :conflict

  def file_url
    return "#{$fileurl}/docs/#{self.conflict.old_slug}/#{self.file}"
  end

  def set_defaults
    self.update_attribute :locale, I18n.locale unless self.locale
    if self.conflict and not self.pid
      self.update_attribute :pid, ((self.conflict.documents.order(:pid).map(&:pid)-[nil]).last || 0) + 1
    end
  end
end
