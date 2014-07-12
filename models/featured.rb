class Featured < ActiveRecord::Base
  has_many :vector_data, as: :attachable, dependent: :destroy

  def inspect
    self.name
  end
end

