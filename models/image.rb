class Image < ActiveRecord::Base
  #attr_accessible :file, :title, :description, :remote_file_url, :file_cache, :remove_file, :conflict_id
  validates_presence_of :file
  mount_uploader :file, ImageUploader
  belongs_to :attachable, polymorphic: true

  def file_url
    at = self.attachable
    return "#{$fileurl}/img/Conflict/#{at.id}/#{self.file.file.filename}" if at.is_a?(Conflict) and File.exists?("#{$filedir}/img/Conflict/#{at.id}/#{self.file.file.filename}")
    return "#{$fileurl}/img/#{at.class}/#{at.old_slug}/#{self.file.file.filename}" if at.has_attribute?('old_slug') and at.old_slug and File.exists?("#{$filedir}/img/#{at.class}/#{at.old_slug}/#{self.file.file.filename}")

    if at.is_a? Conflict
      return "#{$fileurl}/img/Conflict/#{at.slug(:en)}/#{self.file.file.filename}" if File.exists?("#{$filedir}/img/Conflict/#{at.slug(:en)}/#{self.file.file.filename}")
      return "#{$fileurl}/img/Conflict/#{at.slug(I18n.locale)}/#{self.file.file.filename}" if File.exists?("#{$filedir}/img/Conflict/#{at.slug(I18n.locale)}/#{self.file.file.filename}")
      return "#{$fileurl}/img/Conflict/#{at.slug(nil)}/#{self.file.file.filename}" if File.exists?("#{$filedir}/img/Conflict/#{at.slug(nil)}/#{self.file.file.filename}")
    elsif at.has_attribute?('slug')
      return "#{$fileurl}/img/#{at.class}/#{at.slug}/#{self.file.file.filename}"
    end

    begin
      return "#{$fileurl}/img/#{at.class}/#{at.slug}/#{self.file.file.filename}" unless at.slug.nil?
    rescue
      return "#{$fileurl}/img/#{at.class}/#{at.id}/#{self.file.file.filename}"
    end
  end

  def thumb_url
    at = self.attachable
    return "#{$fileurl}/img/Conflict/#{at.id}/thumb_#{self.file.file.filename}" if at.is_a?(Conflict) and File.exists?("#{$filedir}/img/Conflict/#{at.id}/thumb_#{self.file.file.filename}")
    return "#{$fileurl}/img/#{at.class}/#{at.old_slug}/thumb_#{self.file.file.filename}" if at.has_attribute?('old_slug') and at.old_slug and File.exists?("#{$filedir}/img/#{at.class}/#{at.old_slug}/thumb_#{self.file.file.filename}")

    if at.is_a? Conflict
      return "#{$fileurl}/img/Conflict/#{at.slug(:en)}/thumb_#{self.file.file.filename}" if File.exists?("#{$filedir}/img/Conflict/#{at.slug(:en)}/thumb_#{self.file.file.filename}")
      return "#{$fileurl}/img/Conflict/#{at.slug(I18n.locale)}/thumb_#{self.file.file.filename}" if File.exists?("#{$filedir}/img/Conflict/#{at.slug(I18n.locale)}/thumb_#{self.file.file.filename}")
      return "#{$fileurl}/img/Conflict/#{at.slug(nil)}/thumb_#{self.file.file.filename}" if File.exists?("#{$filedir}/img/Conflict/#{at.slug(nil)}/thumb_#{self.file.file.filename}")
    elsif at.has_attribute?('slug')
      return "#{$fileurl}/img/#{at.class}/#{at.slug}/thumb_#{self.file.file.filename}"
    end

    begin
      return "#{$fileurl}/img/#{at.class}/#{at.slug}/thumb_#{self.file.file.filename}" unless at.slug.nil?
    rescue
      return "#{$fileurl}/img/#{at.class}/#{at.id}/thumb_#{self.file.file.filename}"
    end
  end

  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end

  def inspect
    self.file
  end

  def set_defaults
    self.update_attribute :locale, I18n.locale unless self.locale
    if self.attachable and self.attachable_type == "Conflict" and not self.pid
      self.update_attribute :pid, ((self.attachable.images.order(:pid).map(&:pid)-[nil]).last || 0) + 1
    end
  end
end

