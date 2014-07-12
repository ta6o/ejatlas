class MobilizingGroup < ActiveRecord::Base
  has_many :c_mobilizing_groups
  has_many :conflicts, :through => :c_mobilizing_groups
end
