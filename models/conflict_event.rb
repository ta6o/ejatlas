class ConflictEvent < ActiveRecord::Base
  has_many :c_conflict_events
  has_many :conflicts, :through => :c_conflict_events
end
