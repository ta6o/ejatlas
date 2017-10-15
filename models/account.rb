class Account < ActiveRecord::Base
  attr_accessor :password, :password_confirmation

  has_many :conflicts
  has_many :conflict_accounts
  has_many :filters
  has_many :featureds
  has_many :vector_data
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

  def full_name
    return self.name
  end

  private
    def encrypt_password
      self.crypted_password = ::BCrypt::Password.create(password)
    end

    def password_required
      crypted_password.blank? || password.present?
    end
end

class ConflictAccount < ActiveRecord::Base
  belongs_to :conflict
  belongs_to :account
end
