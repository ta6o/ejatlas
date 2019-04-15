$ejit = {
  :adapter  => 'postgresql',
  :encoding => 'utf8',
  :host => '127.0.0.1',
  :port => '5432',
  :user => "yakup",
  :password => "***REMOVED***",
  :database => 'ejit'
}

class ItConflict < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :conflicts
end

class ItAccount < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :accounts
end

class ItCompany < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :companies
end

class ItSupporter < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :supporters
end

class ItLegislation < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :legislations
end

class ItMedialink < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :medialinks
end

class ItWeblink < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :weblinks
end

class ItDocument < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :documents
end

class ItImage < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :images
end

class ItReference < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :references
end


# Relational tables

class ItCType < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_types
  belongs_to :type
  belongs_to :conflict
end
class ItCProduct < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_products
  belongs_to :product
  belongs_to :conflict
end
class ItPCompany < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :p_companies
  belongs_to :company
  belongs_to :product
end
class ItCCompany < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_companies
  belongs_to :company
  belongs_to :conflict
  validates_uniqueness_of :company_id, :scope => :conflict_id
end
class ItCSupporter < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_supporters
  belongs_to :supporter
  belongs_to :conflict
end
class ItCMobilizingGroup < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_mobilizing_groups
  belongs_to :mobilizing_group
  belongs_to :conflict
end
class ItCMobilizingForm < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_mobilizing_forms
  belongs_to :mobilizing_form
  belongs_to :conflict
end
class ItCEnvImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_env_impacts
  belongs_to :env_impact
  belongs_to :conflict
end
class ItCHltImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_hlt_impacts
  belongs_to :hlt_impact
  belongs_to :conflict
end
class ItCSecImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_sec_impacts
  belongs_to :sec_impact
  belongs_to :conflict
end
class ItCConflictEvent < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_conflict_events
  belongs_to :conflict_event
  belongs_to :conflict
end
