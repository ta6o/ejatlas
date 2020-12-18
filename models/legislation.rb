class Legislation < ActiveRecord::Base
  belongs_to :conflict
  #after_create :set_defaults
  #validates_presence_of :pid
  #validates_uniqueness_of :pid, scope: :conflict_id
  before_save :trim

  def set_defaults
    self.update_attribute :locale, I18n.locale unless self.locale
    if self.conflict and not self.pid
      self.update_attribute :pid, ((self.conflict.legislations.order(:pid).map(&:pid)-[nil]).last || 0) + 1
    end
  end

  def inspect
    "Legislation: ##{self.conflict_id.to_s.rjust(5,"0").cyan}-#{self.locale.to_s.green}-#{self.id.to_s.rjust(5,"0").green}: #{self.description}"
  end

  private
  def trim
    self.description = self.description.gsub(/\r?\n/,"\r\n").strip unless self.description.nil? or destroyed?
  end
end
