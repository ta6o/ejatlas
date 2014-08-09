class Country < ActiveRecord::Base
  has_many :conflicts
  has_many :companies
  has_many :supporters

  has_many :flag_images, class_name: "Image", as: :attachable, dependent: :destroy
  has_many :vector_data, as: :attachable, dependent: :destroy
  belongs_to :region

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  before_save :set_slug

  def conflicts_count
    self.conflicts.where(approval_status: 'approved').count
  end

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def self.find_slug slug
    if c = Country.find(:first, :conditions => ["slug = lower(?)", slug])
      return c
    elsif os = OldSlug.where("attachable_type = 'Country'").find(:first, :conditions => ["name = lower(?)", slug])
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Country.find(:first, :conditions => ["slug = lower(?)", slug])
  end

  def old_slug
    if self.old_slugs.any?
      return self.old_slugs[0]
    end
    return self.slug
  end

  def ping
    json, marker, link = [], [], []
    self.conflicts.order("name asc").where(approval_status: 'approved').each do |c|
      marker << c.marker
      json << c.json
      link << c.as_button
    end
    self.conflicts_marker = marker.to_json
    self.conflicts_json = json.to_json
    self.conflicts_link = link.join

    cs, marker, json, link = [], [], [], []
    self.companies.order("name asc").all(:include => :conflicts).each do |c|
      #next if c.conflicts.count < 2
      c.conflicts.order("name asc").where(approval_status: 'approved').each do |cc|
        next if cs.include?(cc.id)
        cs << cc.id
        marker << cc.marker
        json << cc.json
        culprits = []
        cc.companies.where(country_id: self.id).each {|cu| culprits << "<a href='/company/#{cu.slug}'>#{cu.name}</a>"}
        link << "<p><a href='/conflict/#{cc.slug}'>#{cc.name}</a> <small>(#{culprits.join(', ')})</small></p>"
      end
    end
    self.companies_marker = marker.to_json
    self.companies_json = json.to_json
    self.companies_link = link.join

    cs, marker, json, link = [], [], [], []
    self.supporters.order("name asc").all(:include => :conflicts).each do |c|
      #next if c.conflicts.count < 2
      c.conflicts.order("name asc").where(approval_status: 'approved').each do |cc|
        next if cs.include?(cc.id)
        cs << cc.id
        marker << cc.marker
        json << cc.json
        culprits = []
        cc.supporters.where(country_id: self.id).each {|cu| culprits << "<a href='/institution/#{cu.slug}'>#{cu.name}</a>"}
        link << "<p><a href='/conflict/#{cc.slug}'>#{cc.name}</a> <small>(#{culprits.join(', ')})</small></p>"
      end
    end
    self.supporters_marker = marker.to_json
    self.supporters_json = json.to_json
    self.supporters_link = link.join
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    ping
  end
end

class Region < ActiveRecord::Base
  has_many :countries
  has_many :vector_data, as: :attachable, dependent: :destroy
  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  before_save :set_slug

  def conflicts_count
    count = 0
    self.countries.each do |con|
      count += con.conflicts.count
    end
    return count
  end

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    return @json.to_json
  end

  def self.find_slug slug
    if c = Region.find(:first, :conditions => ["slug = lower(?)", slug])
      return c
    elsif os = OldSlug.where("attachable_type = 'Region'").find(:first, :conditions => ["name = lower(?)", slug])
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Region.find(:first, :conditions => ["slug = lower(?)", slug])
  end

  def ping
    json, marker, link = [], [], []
    if self.countries.any?
      self.countries.first.conflicts.order("name asc").where(approval_status: 'approved').each do |c|
        marker << c.marker
        json << c.json
        link << c.as_button
      end
      self.conflicts_marker = marker.to_json
      self.conflicts_json = json.to_json
      self.conflicts_link = link.join

      cs, marker, json, link = [], [], [], []
      self.countries.first.companies.order("name asc").all(:include => :conflicts).each do |c|
        next if c.conflicts.count < 2
        c.conflicts.order("name asc").where(approval_status: 'approved').each do |cc|
          next if cs.include?(cc.id)
          cs << cc.id
          marker << cc.marker
          json << cc.json
          culprits = []
          cc.companies.where(country_id: self.id).each {|cu| culprits << "<a href='/country-of-company/#{cu.slug}'>#{cu.name}</a>"}
          link << "<p><a href='/conflict/#{cc.slug}'>#{cc.name}</a> <small>(#{culprits.join(', ')})</small></p>"
        end
      end
      self.companies_marker = marker.to_json
      self.companies_json = json.to_json
      self.companies_link = link.join

      cs, marker, json, link = [], [], [], []
      self.countries.first.supporters.order("name asc").all(:include => :conflicts).each do |c|
        next if c.conflicts.count < 2
        c.conflicts.order("name asc").where(approval_status: 'approved').each do |cc|
          next if cs.include?(cc.id)
          cs << cc.id
          marker << cc.marker
          json << cc.json
          culprits = []
          cc.supporters.where(country_id: self.id).each {|cu| culprits << "<a href='/country-of-institution/#{cu.slug}'>#{cu.name}</a>"}
          link << "<p><a href='/conflict/#{cc.slug}'>#{cc.name}</a> <small>(#{culprits.join(', ')})</small></p>"
        end
      end
      self.supporters_marker = marker.to_json
      self.supporters_json = json.to_json
      self.supporters_link = link.join
    end
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    ping
  end
end
