class Medialink < ActiveRecord::Base
  belongs_to :conflict
  before_save :trim
  private
  def trim
    self.description.gsub!(/\r?\n/,"\r\n").strip! if self.description
  end
end
