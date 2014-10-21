class RelatedConflict < ActiveRecord::Base
  belongs_to :conflict
  belongs_to :related, :class_name => 'Conflict'
end
class CTag < ActiveRecord::Base
  belongs_to :tag
  belongs_to :conflict
end
class FTag < ActiveRecord::Base
  belongs_to :tag
  belongs_to :featured
  self.primary_key = :id
end
class CType < ActiveRecord::Base
  belongs_to :type
  belongs_to :conflict
end
class CProduct < ActiveRecord::Base
  belongs_to :product
  belongs_to :conflict
end
class PCompany < ActiveRecord::Base
  belongs_to :company
  belongs_to :product
end
class CCompany < ActiveRecord::Base
  belongs_to :company
  belongs_to :conflict
  validates_uniqueness_of :company_id, :scope => :conflict_id
end
class CGovernmentActor < ActiveRecord::Base
  belongs_to :government_actor
  belongs_to :conflict
end
class CSupporter < ActiveRecord::Base
  belongs_to :supporter
  belongs_to :conflict
end
class CJusticeParty < ActiveRecord::Base
  belongs_to :justice_party
  belongs_to :conflict
end
class CMobilizingGroup < ActiveRecord::Base
  belongs_to :mobilizing_group
  belongs_to :conflict
end
class CMobilizingForm < ActiveRecord::Base
  belongs_to :mobilizing_form
  belongs_to :conflict
end
class CEnvImpact < ActiveRecord::Base
  belongs_to :env_impact
  belongs_to :conflict
end
class CHltImpact < ActiveRecord::Base
  belongs_to :hlt_impact
  belongs_to :conflict
end
class CSecImpact < ActiveRecord::Base
  belongs_to :sec_impact
  belongs_to :conflict
end
class CConflictEvent < ActiveRecord::Base
  belongs_to :conflict_event
  belongs_to :conflict
end
