class SecImpact < ActiveRecord::Base
  has_many :c_sec_impacts
  has_many :conflicts, :through => :c_sec_impacts

  def inspect
    self.name
  end
end
