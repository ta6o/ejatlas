class Weblink < ActiveRecord::Base
  belongs_to :conflict
  before_save :trim
  private
  def trim
    self.description.gsub!(/\r?\n/,"\r\n")
  end
end
