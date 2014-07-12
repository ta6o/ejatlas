class Request < ActiveRecord::Base
  self.primary_key = 'id'
  belongs_to :requester, :class_name => 'Account', :inverse_of => :requesteds
  belongs_to :requested, :class_name => 'Account', :inverse_of => :asked_fors
  belongs_to :version
end
