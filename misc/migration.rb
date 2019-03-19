
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
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  create_table :conflict_texts
  add_column_to_table :conflict_texts, cols
  tot = Conflict.count
  Conflict.all.order(:id).each_with_index do |con,ind|
    #print("\r#{ind+1} / #{tot}: #{con.name}")
    puts con.id
    ct = ConflictText.new
    ct.conflict_id = con.id
    ct.locale = "en"
    begin
      ct.save!
    rescue => e
      puts "1: #{con.id}"
      puts e
      break
    end
    cols.each do |attr, type|
      eval "ct.#{attr} = con.attributes[attr]"
    end
    begin
      ct.save!
    rescue => e
      puts "2: #{con.id}"
      puts e
      break
    end
  end
  true
end

