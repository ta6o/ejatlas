class Country < ActiveRecord::Base
  has_many :conflicts
  has_many :companies
  has_many :supporters

  has_many :flag_images, class_name: "Image", as: :attachable, dependent: :destroy
  has_many :vector_data, as: :attachable, dependent: :destroy
  belongs_to :region

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  before_save :set_slug

  def local_conflicts locale=:en
    self.conflicts.where(approval_status: 'approved').map{|c|ct=c.conflict_texts.where(:locale=>locale);if ct.any? then ct[0] else nil end}.uniq - [nil]
  end

  def local_conflicts_count locale=:en
    self.local_conflicts(locale).count
  end

  def conflicts_count
    self.conflicts.where(approval_status: 'approved').count
  end

  def jsonize locale=:en
    @json = {}
    @json[:name] = I18n.t("countries.#{self.name.shorten_en}",:locale=>locale).gsub(/\([^\)]+\)/,"")
    @json[:slug] = self.slug
    return @json.to_json
  end

  def self.find_slug slug
    if c = Country.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Country'").where(:name=>slug.downcase).first
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Country.where(:slug=>slug.downcase).first
  end

  def old_slug new=false
    if self.old_slugs.any?
      return self.old_slugs[0].name
    end
    return self.slug if new
    nil
  end

  def query_capital
    return self.name unless self.capital
    city = self.capital.split('|')[0]
    puts self.capital
    uri = URI("http://nominatim.openstreetmap.org/search?city=#{city.to_ascii.downcase.gsub(' ','+')}&format=jsonv2")
    begin
      res = Net::HTTP.get_response(uri)
    rescue => e 
      puts "Error: #{e}"
      return nil
    end
    res = JSON.parse(res.body)[0] 
    ll = [res["lat"],res["lon"]].map {|l| "#{l.split('.')[0]}.#{l.split('.')[1].gsub('.','')[0..1]}"}
    self.capital = "#{city}|#{ll[0]}|#{ll[1]}"
    puts self.capital
    self.save
  end

  def ping
    json, marker, link = [], [], []
    self.conflicts.where(approval_status: 'approved').order("id asc").each do |c|
      marker << JSON.parse(c.marker||c.as_marker.to_json)
      #json << c.json
      link << c.as_button
    end
    self.conflicts_marker = marker.to_json
    self.conflicts_json = json.to_json
    self.conflicts_link = link.join

    cs, marker, json, link = [], [], [], []
    self.companies.order("name asc").includes(:conflicts).each do |c|
      #next if c.conflicts.count < 2
      c.conflicts.where(approval_status: 'approved').order("id asc").each do |cc|
        next if cs.include?(cc.id)
        cs << cc.id
        marker << JSON.parse(cc.marker)
        json << cc.json
        culprits = []
        cc.companies.where(country_id: self.id).each {|cu| culprits << "<a href='/company/#{cu.slug}'>#{cu.name}</a>"}
        link << "<p class='conflict-button' data-id='#{cc.id}'><a href='/conflict/#{cc.slug}'>#{cc.name}</a> <small>(#{culprits.join(', ')})</small></p>"
      end
    end
    self.companies_marker = marker.to_json
    self.companies_json = json.to_json
    self.companies_link = link.join

    cs, marker, json, link = [], [], [], []
    self.supporters.order("name asc").includes(:conflicts).each do |c|
      #next if c.conflicts.count < 2
      c.conflicts.where(approval_status: 'approved').order("id asc").each do |cc|
        next if cs.include?(cc.id)
        cs << cc.id
        marker << JSON.parse(cc.marker)
        json << cc.json
        culprits = []
        cc.supporters.where(country_id: self.id).each {|cu| culprits << "<a href='/institution/#{cu.slug}'>#{cu.name}</a>"}
        link << "<p class='conflict-button' data-id='#{cc.id}'><a href='/conflict/#{cc.slug}'>#{cc.name}</a> <small>(#{culprits.join(', ')})</small></p>"
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

  def jsonize locale=:en
    @json = {}
    @json[:name] = I18n.t("countries.region.#{self.name.slug("_")}",:locale=>locale).gsub(/\([^\)]+\)/,"")
    @json[:slug] = self.slug
    return @json.to_json
  end

  def self.find_slug slug
    if c = Region.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Region'").where(:name=>slug.downcase).first
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Region.where(:slug=>slug.downcase).first
  end

  def ping
    json, marker, link = [], [], []
    if self.countries.any?
      self.countries.first.where(approval_status: 'approved').conflicts.order("id asc").each do |c|
        marker << JSON.parse(c.marker||c.as_marker.to_json)
        json << c.json
        link << c.as_button
      end
      self.conflicts_marker = marker.to_json
      self.conflicts_json = json.to_json
      self.conflicts_link = link.join

      cs, marker, json, link = [], [], [], []
      self.countries.first.companies.order("name asc").includes(:conflicts).each do |c|
        next if c.conflicts.count < 2
        c.conflicts.where(approval_status: 'approved').order("id asc").each do |cc|
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
      self.countries.first.supporters.order("name asc").includes(:conflicts).each do |c|
        next if c.conflicts.count < 2
        c.conflicts.where(approval_status: 'approved').order("id asc").each do |cc|
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
