class EnvImpact < ActiveRecord::Base
  has_many :c_env_impacts
  has_many :conflicts, :through => :c_env_impacts

  def inspect
    self.name
  end
end
