class JusticeParty < ActiveRecord::Base
  has_many :c_justice_parties
  has_many :conflicts, :through => :c_justice_parties

  has_many :vector_data, as: :attachable, dependent: :destroy

  def inspect
    self.name
  end
end
