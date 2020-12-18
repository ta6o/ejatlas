class Weblink < ActiveRecord::Base
  belongs_to :conflict
  before_save :trim

  def inspect
    "Weblink: ##{self.conflict_id.to_s.rjust(5,"0").cyan}-#{self.locale.to_s.green}-#{self.id.to_s.rjust(5,"0").green}: #{self.description}"
  end

  private
  def trim
    self.description = self.description.gsub(/\r?\n/,"\r\n").strip unless self.description.nil? or destroyed?
  end
end
