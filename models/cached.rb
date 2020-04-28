class Cached < ActiveRecord::Base
  def self.loc locale
    nil
    if Cached.where(:locale=>locale).any?
      Cached.where(:locale=>locale).first
    end
  end
end
