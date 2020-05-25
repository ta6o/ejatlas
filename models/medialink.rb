class Medialink < ActiveRecord::Base
  belongs_to :conflict
  before_save :trim
  private
  def trim
    self.description = self.description.gsub(/\r?\n/,"\r\n").strip unless self.description.nil? or destroyed?
  end
end
