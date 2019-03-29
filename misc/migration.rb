
def create_table table
  unless ActiveRecord::Base.connection.table_exists? table
    ActiveRecord::Base.connection.create_table table
  end
end

def drop_table table
  if ActiveRecord::Base.connection.table_exists? table
    ActiveRecord::Base.connection.drop_table table
  end
end

def add_column_to_table table, cols
  cols.each do |name, type|
    unless ActiveRecord::Base.connection.column_exists? table.to_sym, name
      ActiveRecord::Migration.add_column table.to_sym, name, type.to_sym
    end
  end
end

def drop_column_from_table table, cols
  if cols.is_a? Hash
    cols = cols.keys
  elsif cols.is_a? String or cols.is_a? Symbol
    cols = [cols]
  end
  cols.each do |name|
    if ActiveRecord::Base.connection.column_exists? table.to_sym, name
      ActiveRecord::Migration.remove_column table.to_sym, name
    end
  end
end

def parse_columns str
  res = {}
  str.split(/\n/).each do |line|
    a = line.strip.split(/\s+/)
    res[a[1]] = a[0]
  end
  res
end

def migrate_to_i18n

  # translations

=begin
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  drop_table :conflict_texts
  create_table :conflict_texts
  add_column_to_table :conflict_texts, cols
  tot = Conflict.count
  Conflict.all.order(:id).each_with_index do |con,ind|
    print("\r#{ind+1} / #{tot}: #{con.id}")
    begin
      ct = ConflictText.new
      ct.conflict_id = con.id
      ct.locale = "en"
      cols.each do |attr, type|
        next if ["conflict_id","locale"].include?(attr)
        eval "ct.#{attr} = con.attributes[attr]"
      end
      ct.created_at = Time.now
      ct.modified_at = Time.now
      ct.updated_at = Time.now
      ct.save!
    rescue => e
      puts
      puts "id: #{ct.id}, "
      puts e
      return
    end
  end
  drop_column_from_table :conflicts, cols.reject{|k,v| ["approval_status","created_at","updated_at","modified_at"].include?(k)}
  add_column_to_table :cacheds, {:locale=>"varchar(3)"}
  
=end

  # roles
  
  drop_table :roles
  create_table :roles
  add_column_to_table :roles, {:name=>"varchar(32)",:description=>"varchar(255)"}
  drop_table :account_roles
  create_table :account_roles
  add_column_to_table :account_roles, {:account_id=>"integer",:role_id=>"integer"}
  Role.create(:name=>"editor")
  Role.create(:name=>"translator")
  Role.create(:name=>"gis")
  Admin.fetch_translations(false) unless $tstatus
  tkeys =  $tstatus.values.map(&:keys).flatten.uniq.sort
  tkeys.each {|k| Role.create(:name=>"locale-#{k}")}

  cacheparams = {"filter"=>"on", "conflicts"=>"on", "countries"=>"on", "companies"=>"on", "ifis"=>"on", "commodities"=>"on", "categories"=>"on", "featureds"=>"on"}

  tkeys.each do |loc|
    cacheparams["locale"] = loc
    AsyncTask.new.setcache cacheparams
  end

  true
end

def produce_conflict_getter_methods
  rb = ""
  rb += "\n"
  parse_columns(File.read("#{Dir.pwd}/misc/migrate.txt")).each do |attr,type|
    rb += "  def #{attr} locale=I18n.locale\n"
    rb += "    self.get_local_text(\"#{attr}\",locale.to_s)\n"
    rb += "  end\n"
    rb += "  def #{attr}= val, locale=I18n.locale\n"
    rb += "    self.set_local_text(\"#{attr}\",val,locale.to_s)\n"
    rb += "  end\n"
    rb += "\n"
  end
  rb
end

$ejit = {
  :adapter  => 'postgresql',
  :encoding => 'utf8',
  :host => '127.0.0.1',
  :port => '5432',
  :user => "yakup",
  :password => "***REMOVED***",
  :database => 'ejit'
}

class ItConflict < ActiveRecord::Base
  establish_connection $ejit
end

def check_langs
  clangs = {}
  tot = ConflictText.count
  ConflictText.all.order(:conflict_id).each_with_index do |ct,ind|
    text = ct.description
    text = ct.name if text.nil? or text.length <= 16
    lang = id_language(text)
    clangs[lang] ||= []
    clangs[lang] << ct.conflict_id
    print "\r#{ind} / #{tot}"
  end
  clangs
end

def id_language text
  res = `python2 misc/idlang.py "#{text.gsub(/["'`]/,"")}"`
  if res.length > 0
    #res.strip.gsub(/(\[|\])+/,"").split(/\s*,\s*/).map{|e|a=e.split(/:/);[a[0],a[1].to_f]}.to_h
    res.strip
  else
    false
  end
end

def check_ar_conflicts
  found = 0
  CSV.read("../arabic.csv").each_with_index do |ar,ind|
    next if ind == 0
    if en = Conflict.find_slug(ar[0].strip.split(/\//)[-1])
      found += 1
      begin
        ct = ConflictText.new
        ct.locale = "ar"
        ct.conflict_id = en.id
        ct.name = ar[2]
        ct.description = ar[3]
        ct.save!
      rescue => e
        puts e
      end
    else
      puts "not found: #{ar[0]}"
    end
  end
  puts found
  nil
end

def check_it_conflicts
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  File.readlines("../it_cases.txt").each do |line|
    line = line.split(" - ")
    p line
    if it = ItConflict.find_by_slug(line[0].slug)
      if en = Conflict.find_slug(line[1].slug) and ConflictText.where(:conflict_id=>en.id,:locale=>"it").empty?
        puts "it: #{it.id}, en: #{en.id}"
        begin
          ct = ConflictText.new
          ct.locale = "it"
          ct.conflict_id = en.id
          cols.each do |attr, type|
            next if ["conflict_id","locale"].include?(attr)
            eval "ct.#{attr} = it.attributes[attr]"
          end
          ct.save!
        rescue => e
          puts e
        end
      else
        puts "it: #{it.id}, en: none"
        begin
          c = Conflict.create
          ct = ConflictText.new
          ct.locale = "it"
          ct.conflict_id = c.id
          it.attributes.each do |attr, type|
            if cols.keys.include?(attr)
              eval "ct.#{attr} = it.attributes[attr]"
            else
              eval "c.#{attr} = it.attributes[attr]"
            end
          end
          it.methods.grep(/^validate_associated_records_for_.*$/).map{|m|m.to_s.split("validate_associated_records_for_")[1]}.each do |rel|
          end
          ct.save!
        rescue => e
          puts e
        end
      end
    end
  end
  nil
end

def test_it 
  ItConflict.all.order(:id).each do |it|
    puts "#{it.name} (#{it.approval_status})"
    p it.methods.grep(/^validate_associated_records_for_.*$/).map{|m|m.to_s.split("validate_associated_records_for_")[1]}
  end
  nil
end

