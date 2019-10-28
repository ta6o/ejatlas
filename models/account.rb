class Account < ActiveRecord::Base
  attr_accessor :password, :password_confirmation

  has_many :account_roles
  has_many :roles, :through => :account_roles
  has_many :conflicts
  has_many :conflict_accounts
  has_many :conflict_messages
  has_many :filters
  has_many :featureds
  has_many :vector_data
  has_many :former_infos, class_name: "FormerInfo", as: :attachable, dependent: :destroy
  has_many :images, class_name: "Image", as: :attachable, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  # Validations
  validates_presence_of     :name, :email, :role
  validates_presence_of     :password,                   :if => :password_required
  validates_presence_of     :password_confirmation,      :if => :password_required
  validates_length_of       :password, :within => 4..40, :if => :password_required
  validates_confirmation_of :password,                   :if => :password_required
  validates_length_of       :email,    :within => 3..100
  validates_uniqueness_of   :email,    :case_sensitive => false
  validates_format_of       :email,    :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_format_of       :role,     :with => /[A-Za-z]/

  # Callbacks
  before_save :encrypt_password, :if => :password_required
  after_save :index

  #
  # This method is for authentication purpose
  #
  def self.authenticate(email, password)
    account = Account.find_by_email(email) if email.present?
    account && account.has_password?(password) ? account : nil
  end

  def has_password?(password)
    ::BCrypt::Password.new(crypted_password) == password
  end

  def editor? locale=I18n.locale
    ["admin","editor"].include? self.role or self.roles.map(&:name).sort.join(",").match(/editor.+locale-#{locale}/)
  end

  def contributor? conflict, locale=I18n.locale
    return false unless conflict
    ["admin","editor"].include?(self.role) or conflict.account_id == self.id or conflict.conflict_accounts.map(&:account_id).include?(self.id) or self.roles.map(&:name).sort.join(",").match(/editor.+locale-#{locale}/)
  end

  def translator? locale=I18n.locale
    self.roles.map(&:name).sort.join(",").match(/locale-#{locale}.+translator/)
  end

  def full_name
    return self.name
  end

  def index
    $client.index index: $esindex, type: 'doc', id: "acc_#{self.id}", body:{:id=>self.id, :name=>self.name, :type=>"account"}
  end

  def inspect
    "##{self.id.to_s.rjust(5,"0").cyan}: #{self.name} (#{self.email.magenta}), #{self.role.titlecase.green} #{self.roles.map(&:name).join(', ').green})"
  end

  private
    def encrypt_password
      self.crypted_password = ::BCrypt::Password.create(password)
    end

    def password_required
      crypted_password.blank? || password.present?
    end
end

class Role < ActiveRecord::Base
  has_many :account_roles
  has_many :accounts, :through => :account_roles

  def inspect
    "##{self.id.to_s.rjust(5,"0").cyan}: #{self.name ? self.name : "no name".red} #{self.description ? self.description.magenta : ""}"
  end

end

class AccountRole < ActiveRecord::Base
  belongs_to :account
  belongs_to :role

  def inspect
    "##{self.id.to_s.rjust(5,"0").cyan}: #{self.account ? self.account.name.green : self.account_id.to_s.red} <=> #{self.role ? self.role.name.yellow : self.account_id.to_s.red}"
  end

end

class ConflictAccount < ActiveRecord::Base
  belongs_to :conflict
  belongs_to :account
end

class ConflictMessage < ActiveRecord::Base
  belongs_to :conflict
  belongs_to :account
end

