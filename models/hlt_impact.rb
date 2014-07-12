class HltImpact < ActiveRecord::Base
  has_many :c_hlt_impacts
  has_many :conflicts, :through => :c_hlt_impacts

  def inspect
    self.name
  end
end
