class Filter < ActiveRecord::Base
  self.primary_key = :id

  belongs_to :account

  validate :unique

  def inspect
    self.uid
  end

  def to_html
    JSON.pretty_generate(JSON.parse(Filter.last.query)).gsub(/\n/,"<br/>")
  end

  def self.recurse obj
    if obj.is_a? Array
      obj.map{|item|Filter.recurse item}
    elsif obj.is_a? Hash
      obj.each do |key,val|
        if key == 'bool'
          Filter.recurse val
        elsif log = {'must'=>'and','should'=>'or','must_not'=>'not'}[key]
          {tag:'div',children:val.map{|item|Filter.recurse item}}
        end
      end
    else
      obj
    end
  end

  def self.html json
    hash = JSON.parse(json)['filtered']['filter']['bool']['must'].map{|h| h if h.keys.first == 'bool'}
    hash.delete(nil)
    Filter.recurse hash
  end

  def self.randomize
    (0..5).map{ (('a'..'z').to_a+('A'..'Z').to_a+(0..9).to_a)[rand(62)] }.join
  end

  def self.find id
    if id.is_a? String and id.length == 6
      Filter.find_by_uid(id)
    else
      Filter.find_by_id(id)
    end
  end

  def unique
    while self.new_record? && (self.uid == nil || Filter.find_by_uid(self.uid))
      self.uid = Filter.randomize
    end
  end
end
