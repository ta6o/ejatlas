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

  private
  def trim
    self.description.gsub!(/\r?\n/,"\r\n").strip! if self.description
  end
end
