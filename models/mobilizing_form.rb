class MobilizingForm < ActiveRecord::Base
  has_many :c_mobilizing_forms
  has_many :conflicts, :through => :c_mobilizing_forms
end
