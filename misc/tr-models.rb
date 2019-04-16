if ENV['RACK_ENV'] == "development"
  $ejtr = {
    :adapter  => 'postgresql',
    :encoding => 'utf8',
    :host => '127.0.0.1',
    :port => '5432',
    :user => "yakup",
    :password => "***REMOVED***",
    :database => 'ejtr'
  }
else
  $ejtr = {
    :adapter  => 'postgresql',
    :encoding => 'utf8',
    :host => '127.0.0.1',
    :port => '5432',
    :user => "root",
    :password => "***REMOVED***",
    :database => 'ejtr'
  }
end


class TrAccount < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :accounts
  has_many :tr_conflicts
  has_many :tr_conflict_accounts
  has_many :tr_conflict_messages
  has_many :tr_images, class_name: "TrImage", as: :attachable, dependent: :destroy
end


class TrRegion < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :regions
  has_many :tr_conflicts
end

class TrCategory < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :categories
  has_many :tr_types
  has_many :tr_conflicts
end


class TrCompany < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :companies
  has_many :tr_c_companies
  has_many :tr_conflicts, :through => :tr_c_companies
  has_many :tr_p_companies
  has_many :tr_products, :through => :tr_p_companies
  has_many :tr_logo_images, class_name: "TrImage", as: :attachable, dependent: :destroy
  belongs_to :tr_country
end


class TrConflictEvent < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :conflict_events
  has_many :tr_c_conflict_events
  has_many :tr_conflicts, :through => :tr_c_conflict_events
end


class TrConflict < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :conflicts
  belongs_to :tr_country
  belongs_to :tr_region
  belongs_to :tr_category
  belongs_to :tr_account
  belongs_to :tr_project_status
  belongs_to :tr_status
  belongs_to :tr_reaction
  has_many :tr_c_types
  has_many :tr_types, :through => :tr_c_types
  has_many :tr_c_products
  has_many :tr_products, :through => :tr_c_products
  has_many :tr_c_companies
  has_many :tr_companies, :through => :tr_c_companies
  has_many :tr_c_supporters
  has_many :tr_supporters, :through => :tr_c_supporters
  has_many :tr_c_mobilizing_groups
  has_many :tr_mobilizing_groups, :through => :tr_c_mobilizing_groups
  has_many :tr_c_mobilizing_forms
  has_many :tr_mobilizing_forms, :through => :tr_c_mobilizing_forms
  has_many :tr_c_env_impacts
  has_many :tr_env_impacts, :through => :tr_c_env_impacts
  has_many :tr_c_hlt_impacts
  has_many :tr_hlt_impacts, :through => :tr_c_hlt_impacts
  has_many :tr_c_sec_impacts
  has_many :tr_sec_impacts, :through => :tr_c_sec_impacts
  has_many :tr_c_conflict_events
  has_many :tr_conflict_events, :through => :tr_c_conflict_events
  has_many :tr_legislations, :dependent => :destroy
  has_many :tr_weblinks, :dependent => :destroy
  has_many :tr_references, :dependent => :destroy
  has_many :tr_medialinks, :dependent => :destroy
  has_many :tr_documents, :dependent => :destroy
  has_many :tr_images, class_name: "TrImage", as: :attachable, dependent: :destroy
end


class TrDocument < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :documents
  belongs_to :tr_conflict
  def file_url
    return "http://archiveatlas.cdca.it/docs/#{self.file}"
  end
end


class TrEnvImpact < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :env_impacts
  has_many :tr_c_env_impacts
  has_many :tr_conflicts, :through => :tr_c_env_impacts
end


class TrHltImpact < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :hlt_impacts
  has_many :tr_c_hlt_impacts
  has_many :tr_conflicts, :through => :tr_c_hlt_impacts
end


class TrImage < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :images
  belongs_to :attachable, polymorphic: true
  def file_url
    at = self.attachable
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^Tr/,"")}/#{at.old_slug}/#{self.file}" if at.has_attribute?('old_slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^Tr/,"")}/#{at.slug}/#{self.file}" if at.has_attribute?('slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^Tr/,"")}/#{at.id}/#{self.file}"
  end
  def thumb_url
    at = self.attachable
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^Tr/,"")}/#{at.old_slug}/thumb_#{self.file}" if at.has_attribute?('old_slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^Tr/,"")}/#{at.slug}/thumb_#{self.file}" if at.has_attribute?('slug')
    return "http://archiveatlas.cdca.it/img/#{at.class.to_s.sub(/^Tr/,"")}/#{at.id}/thumb_#{self.file}"
  end
  def attachable_type=(sType)
     super(sType.to_s.classify.constantize.base_class.to_s)
  end
end


class TrLegislation < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :legislations
  belongs_to :tr_conflict
end


class TrMedialink < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :medialinks
  belongs_to :tr_conflict
end


class TrMobilizingForm < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :mobilizing_forms
  has_many :tr_c_mobilizing_forms
  has_many :tr_conflicts, :through => :tr_c_mobilizing_forms
end


class TrMobilizingGroup < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :mobilizing_groups
  has_many :tr_c_mobilizing_groups
  has_many :tr_conflicts, :through => :tr_c_mobilizing_groups
end


class TrProduct < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :products
  has_many :tr_c_products
  has_many :tr_conflicts, :through => :tr_c_products
end


class TrProjectStatus < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :project_statuses
  has_many :tr_conflicts
end


class TrReaction < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :reactions
  has_many :tr_conflicts
end


class TrReference < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :references
  belongs_to :tr_conflict
end


class TrCType < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_types
  belongs_to :tr_type
  belongs_to :tr_conflict
end


class TrCProduct < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_products
  belongs_to :tr_product
  belongs_to :tr_conflict
end


class TrPCompany < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :p_companies
  belongs_to :tr_company
  belongs_to :tr_product
end


class TrCCompany < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_companies
  belongs_to :tr_company
  belongs_to :tr_conflict
  validates_uniqueness_of :company_id, :scope => :conflict_id
end


class TrCSupporter < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_supporters
  belongs_to :tr_supporter
  belongs_to :tr_conflict
end


class TrCMobilizingGroup < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_mobilizing_groups
  belongs_to :tr_mobilizing_group
  belongs_to :tr_conflict
end


class TrCMobilizingForm < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_mobilizing_forms
  belongs_to :tr_mobilizing_form
  belongs_to :tr_conflict
end


class TrCEnvImpact < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_env_impacts
  belongs_to :tr_env_impact
  belongs_to :tr_conflict
end


class TrCHltImpact < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_hlt_impacts
  belongs_to :tr_hlt_impact
  belongs_to :tr_conflict
end


class TrCSecImpact < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_sec_impacts
  belongs_to :tr_sec_impact
  belongs_to :tr_conflict
end


class TrCConflictEvent < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :c_conflict_events
  belongs_to :tr_conflict_event
  belongs_to :tr_conflict
end


class TrSecImpact < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :sec_impacts
  has_many :tr_c_sec_impacts
  has_many :tr_conflicts, :through => :tr_c_sec_impacts
end


class TrStatus < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :statuses
  has_many :tr_conflict
end


class TrSupporter < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :supporters
  has_many :tr_c_supporters
  has_many :tr_conflicts, :through => :tr_c_supporters
  belongs_to :tr_country
  has_many :tr_logo_images, class_name: "TrImage", as: :attachable, dependent: :destroy
end


class TrType < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :types
  belongs_to :tr_category
  has_many :tr_c_types
  has_many :tr_conflicts, :through => :tr_c_types
end


class TrWeblink < ActiveRecord::Base
  establish_connection $ejtr
  self.table_name = :weblinks
  belongs_to :tr_conflict
end


