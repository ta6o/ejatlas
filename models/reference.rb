class Reference < ActiveRecord::Base
  belongs_to :conflict
  before_save :trim
  private
  def trim
    self.description.gsub!(/\r?\n/,"\r\n") if self.description
  end
end
