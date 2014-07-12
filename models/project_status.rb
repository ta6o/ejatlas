class ProjectStatus < ActiveRecord::Base
  has_many :conflicts
end
