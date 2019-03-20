
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
=begin
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  drop_table :conflict_texts
  create_table :conflict_texts
  add_column_to_table :conflict_texts, cols
  tot = Conflict.count
  Conflict.all.order(:id).each_with_index do |con,ind|
    print("\r#{ind+1} / #{tot}: #{con.name}")
    ct = ConflictText.new
    begin
      ct.update_attribute :conflict_id, con.id
      ct.update_attribute :locale, "en"
      cols.each do |attr, type|
        next if ["conflict_id","locale"].include?(attr)
        eval "ct.#{attr} = con.attributes[attr]"
      end
      ct.save!
    rescue => e
      puts
      puts "id: #{ct.id}, "
      puts e
      break
    end
  end
  drop_column_from_table :conflicts, cols
  true
=end
  add_column_to_table :cacheds, {:locale=>"varchar(3)"}
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
  :database => 'ejit',
}

class ItConflict < ActiveRecord::Base
  establish_connection $ejit
end


def check_it_conflicts
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  File.readlines("../it_cases.txt").each do |line|
    line = line.split(" - ")
    p line
    if it = ItConflict.find_by_slug(line[0].slug)
      if en = Conflict.find_slug(line[1].slug)
        puts "it: #{it.id}, en: #{en.id}"
        begin
          ct = ConflictText.new
          ct.locale = "it"
          ct.conflict_id = en.id
          cols.each do |attr, type|
            next if ["conflict_id","locale"].include?(attr)
            eval "ct.#{attr} = it.attributes[attr]"
          end
          pp ct.attributes.values[0..5]
          ct.save!
        rescue => e
          puts e
        end
      end
    end
  end
  nil
end


