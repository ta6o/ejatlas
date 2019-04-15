$ejit = {
  :adapter  => 'postgresql',
  :encoding => 'utf8',
  :host => '127.0.0.1',
  :port => '5432',
  :user => "yakup",
  :password => "***REMOVED***",
  :database => 'ejit'
}


class ItAccount < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :accounts
  has_many :it_conflicts
  has_many :it_conflict_accounts
  has_many :it_conflict_messages
  has_many :it_images, class_name: "ItImage", as: :attachable, dependent: :destroy
end


class ItCategory < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :categories
  has_many :it_types
  has_many :it_conflicts
end


class ItCompany < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :companies
  has_many :it_c_companies
  has_many :it_conflicts, :through => :it_c_companies
  has_many :it_p_companies
  has_many :it_products, :through => :it_p_companies
  has_many :it_logo_images, class_name: "ItImage", as: :attachable, dependent: :destroy
  belongs_to :it_country
end


class ItConflictEvent < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :conflict_events
  has_many :it_c_conflict_events
  has_many :it_conflicts, :through => :it_c_conflict_events
end


class ItConflict < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :conflicts
  belongs_to :it_country
  belongs_to :it_category
  belongs_to :it_account
  belongs_to :it_project_status
  belongs_to :it_status
  belongs_to :it_reaction
  has_many :it_c_types
  has_many :it_types, :through => :it_c_types
  has_many :it_c_products
  has_many :it_products, :through => :it_c_products
  has_many :it_c_companies
  has_many :it_companies, :through => :it_c_companies
  has_many :it_c_supporters
  has_many :it_supporters, :through => :it_c_supporters
  has_many :it_c_mobilizing_groups
  has_many :it_mobilizing_groups, :through => :it_c_mobilizing_groups
  has_many :it_c_mobilizing_forms
  has_many :it_mobilizing_forms, :through => :it_c_mobilizing_forms
  has_many :it_c_env_impacts
  has_many :it_env_impacts, :through => :it_c_env_impacts
  has_many :it_c_hlt_impacts
  has_many :it_hlt_impacts, :through => :it_c_hlt_impacts
  has_many :it_c_sec_impacts
  has_many :it_sec_impacts, :through => :it_c_sec_impacts
  has_many :it_c_conflict_events
  has_many :it_conflict_events, :through => :it_c_conflict_events
  has_many :it_legislations, :dependent => :destroy
  has_many :it_weblinks, :dependent => :destroy
  has_many :it_references, :dependent => :destroy
  has_many :it_medialinks, :dependent => :destroy
  has_many :it_documents, :dependent => :destroy
  has_many :it_images, class_name: "ItImage", as: :attachable, dependent: :destroy
end


class ItDocument < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :documents
  belongs_to :it_conflict
  def file_url
    return "http://archiveatlas.cdca.it/docs/#{self.file}"
  end
end


class ItEnvImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :env_impacts
  has_many :it_c_env_impacts
  has_many :it_conflicts, :through => :it_c_env_impacts
end


class ItHltImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :hlt_impacts
  has_many :it_c_hlt_impacts
  has_many :it_conflicts, :through => :it_c_hlt_impacts
end


class ItImage < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :images
  belongs_to :attachable, polymorphic: true
  def file_url
    at = self.attachable
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^It/,"")}/#{at.old_slug}/#{self.file}" if at.has_attribute?('old_slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^It/,"")}/#{at.slug}/#{self.file}" if at.has_attribute?('slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^It/,"")}/#{at.id}/#{self.file}"
  end
  def thumb_url
    at = self.attachable
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^It/,"")}/#{at.old_slug}/thumb_#{self.file}" if at.has_attribute?('old_slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^It/,"")}/#{at.slug}/thumb_#{self.file}" if at.has_attribute?('slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^It/,"")}/#{at.id}/thumb_#{self.file}"
  end
  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end
end


class ItLegislation < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :legislations
  belongs_to :it_conflict
end


class ItMedialink < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :medialinks
  belongs_to :it_conflict
end


class ItMobilizingForm < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :mobilizing_forms
  has_many :it_c_mobilizing_forms
  has_many :it_conflicts, :through => :it_c_mobilizing_forms
end


class ItMobilizingGroup < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :mobilizing_groups
  has_many :it_c_mobilizing_groups
  has_many :it_conflicts, :through => :it_c_mobilizing_groups
end


class ItProduct < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :products
  has_many :it_c_products
  has_many :it_conflicts, :through => :it_c_products
end


class ItProjectStatus < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :project_statuses
  has_many :it_conflicts
end


class ItReaction < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :reactions
  has_many :it_conflicts
end


class ItReference < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :references
  belongs_to :it_conflict
end


class ItCType < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_types
  belongs_to :it_type
  belongs_to :it_conflict
end


class ItCProduct < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_products
  belongs_to :it_product
  belongs_to :it_conflict
end


class ItPCompany < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :p_companies
  belongs_to :it_company
  belongs_to :it_product
end


class ItCCompany < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_companies
  belongs_to :it_company
  belongs_to :it_conflict
  validates_uniqueness_of :company_id, :scope => :conflict_id
end


class ItCSupporter < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_supporters
  belongs_to :it_supporter
  belongs_to :it_conflict
end


class ItCMobilizingGroup < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_mobilizing_groups
  belongs_to :it_mobilizing_group
  belongs_to :it_conflict
end


class ItCMobilizingForm < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_mobilizing_forms
  belongs_to :it_mobilizing_form
  belongs_to :it_conflict
end


class ItCEnvImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_env_impacts
  belongs_to :it_env_impact
  belongs_to :it_conflict
end


class ItCHltImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_hlt_impacts
  belongs_to :it_hlt_impact
  belongs_to :it_conflict
end


class ItCSecImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_sec_impacts
  belongs_to :it_sec_impact
  belongs_to :it_conflict
end


class ItCConflictEvent < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :c_conflict_events
  belongs_to :it_conflict_event
  belongs_to :it_conflict
end


class ItSecImpact < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :sec_impacts
  has_many :it_c_sec_impacts
  has_many :it_conflicts, :through => :it_c_sec_impacts
end


class ItStatus < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :statuses
  has_many :it_conflict
end


class ItSupporter < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :supporters
  has_many :it_c_supporters
  has_many :it_conflicts, :through => :it_c_supporters
  belongs_to :it_country
  has_many :it_logo_images, class_name: "ItImage", as: :attachable, dependent: :destroy
end


class ItType < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :types
  belongs_to :it_category
  has_many :it_c_types
  has_many :it_conflicts, :through => :it_c_types
end


class ItWeblink < ActiveRecord::Base
  establish_connection $ejit
  self.table_name = :weblinks
  belongs_to :it_conflict
end


