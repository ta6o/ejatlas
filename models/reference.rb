class Reference < ActiveRecord::Base
  belongs_to :conflict
  before_save :trim
  private
  def trim
    self.description = self.description.strip.gsub(/\r?\n/,"\r\n") unless self.description.nil? or destroyed?
  end
end
