class GovernmentActor < ActiveRecord::Base
  has_many :c_government_actors
  has_many :conflicts, :through => :c_government_actors

  def inspect
    self.name
  end
end
