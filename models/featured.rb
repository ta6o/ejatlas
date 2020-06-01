class Featured < ActiveRecord::Base
  has_many :vector_data, as: :attachable, dependent: :destroy

  has_many :f_tags
  has_many :tags, :through => :f_tags

  has_many :images, class_name: "Image", as: :attachable, dependent: :destroy

  has_many :geo_layer_attachables, :as => :attachable
  has_many :geo_layers, :through => :geo_layer_attachables

  accepts_nested_attributes_for :images, allow_destroy: true

  belongs_to :account

  validates_presence_of :slug
  #validates_uniqueness_of :slug

  before_save :set_slug

  def jsonize
    @json = {}
    @json[:name] = self.name
    @json[:slug] = self.slug
    @json[:description] = self.description
    return @json.to_json
  end

  def old_slug new=false
    return self.slug
  end

  def view
    return [0,0,1] if self.viewport.nil? or self.viewport == ""
    return self.viewport.split("|").map(&:to_f)
  end

  def followed
    JSON.parse(self.conflicts_marker).map{|x| Conflict.find(JSON.parse(x)["i"])}
  end

  def followed_count
    JSON.parse(self.conflicts_marker).length
  end

  def filterping
    filter = "{}"
    filter = self.filter if self.filter.length > 0
    begin
      self.ping((Admin.filter(filter,false).map{|i| begin Conflict.find(i['_id'].to_i) rescue nil end}-[nil]).sort{|a,b| a.slug <=> b.slug})
    rescue
      self.ping((Admin.old_filter(filter) || []).sort{|a,b| a.slug <=> b.slug})
    end
  end

  def ping conflicts
    json, marker, link = [], [], []
    data = {}
    data["tag"] = self.tags.map(&:id)
    feats = JSON.parse(self.features || "{}")
    data["id"] = self.id
    mania = ['types','products','conflict_events','mobilizing_groups','mobilizing_forms','companies','supporters']
    imps = ['env_impacts','hlt_impacts','sec_impacts']
    data["attrs"] = (Conflict.attribute_names & feats)
    data["mania"] = ((mania | imps) & feats)
    data["data"] = feats - (mania | imps | Conflict.attribute_names)
    ftags = (data['tag'] || []).map do |t|
      if t.is_a?(Integer) or t == t.to_i.to_s
        Tag.find(t.to_i)
      else
        Tag.find_slug(t)
      end
    end
    conflicts.each do |cindex|
      if cindex.is_a? Hash
        c = Conflict.find(cindex["_id"])
      elsif cindex.is_a? Conflict
        c = cindex
      else
        next
      end
      next unless c
      cmarker = c.as_marker
      JSON.parse(c.features||"{}").each do |k,v|
        if v and v.strip.match(/(?:(?:http|https|Http|HTTP|Https|HTTPS):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
          if v.strip.match(/\s/)
            cmarker[k] = (v.split(/\s+/).map(&:strip).map { |vv| vv and vv.length > 0 ?  "<a href='#{vv}' target='_blank'>#{vv}</a>" : nil }-[nil]).join("<br/>")
          else
            cmarker[k] = "<a href='#{v.strip}' target='_blank'>#{v.strip}</a>"
          end
        elsif v
          cmarker[k] = v
        end
      end
      if (ftags & c.tags).length >= 1
        cmarker[:dmn] = (ftags & c.tags).map {|t| t.domain} || ""
        cmarker[:tags] = (ftags & c.tags).map {|t| t.name}
      elsif self.id == 69
        cmarker[:dmn] = ["000000"]
        cmarker[:tags] = [""]
      else
        cmarker[:dmn] = []
        cmarker[:tags] = []
      end
      (Conflict.attribute_names & feats).each do |f|
        v = eval("c.#{f}")
        k = f
        if k.to_s[-3..-1] == "_id" and !["reaction_id","status_id","category_id","project_status_id"].include? k
          begin
            ass = eval "self."+k.to_s[0...-3]
          rescue
            next
          end
          header << k.to_s[0...-3].gsub("_"," ").titlecase if index == 0
          if ass.nil?
            val = ""
          elsif ass.name
            val = ass.name
          else
            val = ass.attributes
          end
        elsif k == "success_level"
          if v
            val = ["Success", "Not sure", "Failure"][v]
          else
            val = ""
          end
        elsif k == "category_id"
          if v
            val = Category.find(v).name
          else
            val = ""
          end
        elsif k == "reaction_id"
          if v
            val = Reaction.find(v).name
          else
            val = ""
          end
        elsif k == "status_id"
          if v
            val = Status.find(v).name
          else
            val = ""
          end
        elsif k == "project_status_id"
          if v
            val = ProjectStatus.find(v).name
          else
            val = ""
          end
        elsif k == "population_type"
          if v
            val = ['Unknown','Urban','Semi-urban','Rural'][v]
          else
            val = ""
          end
        elsif k == "accuracy_level"
          if v
            val = ['','LOW country/state level','MEDIUM regional level','HIGH local level'][v]
          else
            val = ""
          end
        elsif v
          val = v
        end
        cmarker["#{self.id}:#{f}"] = val
      end
      ((mania | imps) & feats).each do |f|
        cmarker["#{self.id}:#{f}"] = eval("c.#{f}").map{ |x|
          if x.name.downcase == "other"
            begin
              name =  eval("c.other_#{f.sub("conflict_event","outcome")}")
            rescue
              name = x.name
            end
          else
            name = x.name
          end
          name
        }.join(', ')
      end
      #json << JSON.parse(c.json)
      #json << {:id=>c.id, :name=>c.name}
      marker << cmarker.to_json
      link << c.as_button(data)
    end
    self.conflicts_json = json.to_json
    self.conflicts_marker = marker.to_json
    self.conflicts_link = link.join
    self.save!
    #puts self.conflicts_json.length
  end

  def self.find_slug slug
    if c = Featured.where(:slug=>slug.downcase).first
      return c
    else
      return nil
    end
  end

  def self.find_name name
    Featured.where(:name=>slug.downcase).first
  end

  def inspect
    "Featured ##{self.id.to_s.rjust(5,"0").cyan}: #{self.name} (#{self.followed_count.to_s.magenta} #{"conflicts".magenta})"
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    self.slug.downcase!
  end
end

