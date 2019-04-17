
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

def check_id_columns model, prefix=nil
  model.connection.tap do |db|
    db.tables.each do |table|
      puts table
      db.columns(table).each do |col|
        puts "  #{col.name}" if col.name.match(/_id$/)
        if col.name.match(/_id$/) and col.name != "attachable_id" and prefix and not col.name.match(/^#{prefix}_/)
          rename_column model, table, col.name, "#{prefix}_#{col.name}"
        end
      end
    end
  end
  nil
end

def compare_models_with_translations prefix
  result = {}
  "categories,conflict_events,env_impacts,hlt_impacts,mobilizing_forms,mobilizing_groups,products,project_statuses,reactions,sec_impacts,statuses,types".split(",").each do |table|
    found = []
    trans = table
    trans = "category_id" if table == "categories"
    trans = trans.sub(/e?s$/,"_id") if ["project_statuses", "reactions", "statuses"].include?(table)
    result[trans] = {}
    puts
    puts "#{table.classify.blue} #{eval("#{table.classify}.count")}"
    puts "#{prefix.titlecase.green}#{table.classify.green} #{eval("#{prefix.titlecase}#{table.classify}.count")}"
    [eval("#{table.classify}.order(:id).last.id"),eval("#{prefix.titlecase}#{table.classify}.order(:id).last.id")].max.times do |i|
      begin
        en = eval("#{table.classify}").find(i+1)
        tnm = I18n.t("m.#{trans}.#{en.name.slug("_")}",:tr)
        begin
          lo = eval("#{prefix.titlecase}#{table.classify}").find_by_slug(tnm.slug)
        rescue
          lo = eval("#{prefix.titlecase}#{table.classify}").find_by_name(tnm)
        end
        if lo
          puts "#{(i+1).to_s.yellow}  #{en.name.blue} #{lo.id} #{lo.name.cyan}"
          found << lo.id
          result[trans][lo.id] = i+1
        else
          puts "#{(i+1).to_s.yellow}  #{en.name.blue} ? #{tnm.magenta}"
        end
      rescue
        puts "#{(i+1).to_s.yellow}  #{"not found".red}"
      end
    end
    [eval("#{table.classify}.order(:id).last.id"),eval("#{prefix.titlecase}#{table.classify}.order(:id).last.id")].max.times do |i|
      next if found.include?(i+1)
      begin
        lo = eval("#{prefix.titlecase}#{table.classify}").find(i+1)
        puts "#{(i+1).to_s.red}  #{lo.name.green}"
      rescue
        puts "#{(i+1)}  not found".red
      end
    end
  end
  result
end

def update_legacy_name model, id, name
  model.find(id).update_attribute :name, name
  model.find(id).update_attribute :slug, name.slug if model.has_attribute?(:slug)
end

def compare_models prefix
  "categories,conflict_events,env_impacts,hlt_impacts,mobilizing_forms,mobilizing_groups,products,project_statuses,reactions,sec_impacts,statuses,types".split(",").each do |table|
    puts
    puts "#{table.classify.blue} #{eval("#{table.classify}.count")}"
    puts "#{prefix.titlecase.green}#{table.classify.green} #{eval("#{prefix.titlecase}#{table.classify}.count")}"
    [eval("#{table.classify}.order(:id).last.id"),eval("#{prefix.titlecase}#{table.classify}.order(:id).last.id")].max.times do |i|
      begin
        en = eval("#{table.classify}.find(i+1)")
        puts "#{i+1}  #{en.name.blue}"
      rescue
        puts "#{i+1}  not found".red
      end
      begin
        lo = eval("#{prefix.titlecase}#{table.classify}.find(i+1)")
        puts "#{i+1}  #{lo.name.green}"
      rescue
        puts "#{i+1}  not found".red
      end
    end
  end
  nil
end

def rename_column model, table, column, name
  model.connection.tap do |db|
    if db.column_exists? table.to_sym, column.to_sym
      db.rename_column table.to_sym, column.to_sym, name.to_sym
    end
  end
  nil
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

def check_tr_conflicts
  load "#{Dir.pwd}/misc/tr-models.rb"
  lastlocale = I18n.locale
  I18n.locale = :tr
  csv = CSV.read("../turkish.csv")
  header = csv.shift.map{|x|x.slug("_")}
  coat = {}
  ctat = {}
  rels = {}
  res = {"categoy_id"=>{8=>1, 7=>2, 2=>3, 9=>4, 5=>5, 6=>6, 1=>7, 10=>8, 3=>9, 4=>10, 0=>11}, "conflict_events"=>{15=>1, 18=>2, 1=>3, 12=>4, 5=>5, 9=>6, 10=>8, 11=>9, 6=>11, 13=>12, 16=>13, 4=>14, 7=>15, 8=>16, 14=>17, 2=>18, 3=>19, 19=>20, 17=>21, 0=>26}, "env_impacts"=>{1=>1, 2=>2, 3=>3, 4=>4, 5=>5, 6=>6, 7=>7, 8=>8, 9=>9, 10=>10, 11=>11, 12=>12, 13=>13, 14=>14, 15=>15, 16=>16, 17=>17, 18=>18, 19=>19, 20=>20, 0=>21}, "hlt_impacts"=>{1=>1, 5=>2, 6=>3, 7=>4, 8=>5, 9=>6, 2=>7, 3=>8, 10=>9, 4=>10, 0=>11}, "mobilizing_forms"=>{14=>2, 5=>3, 23=>4, 3=>5, 17=>6, 2=>7, 25=>8, 24=>9, 9=>10, 15=>11, 6=>12, 19=>13, 13=>14, 18=>15, 20=>16, 12=>17, 22=>18, 16=>19, 11=>20, 21=>21, 4=>22, 1=>23, 10=>24, 7=>25, 0=>28}, "mobilizing_groups"=>{12=>1, 2=>2, 22=>4, 15=>5, 9=>6, 18=>7, 20=>8, 17=>9, 21=>10, 10=>11, 6=>12, 16=>13, 13=>14, 3=>15, 8=>16, 5=>17, 14=>18, 19=>19, 4=>20, 1=>3, 7=>14, 0=>21}, "products"=>{24=>33, 2=>1, 3=>2, 4=>3, 28=>4, 45=>5, 40=>6, 33=>7, 27=>8, 5=>9, 38=>10, 43=>11, 23=>12, 31=>13, 17=>14, 15=>15, 20=>16, 41=>17, 6=>18, 37=>19, 1=>20, 13=>21, 26=>22, 50=>23, 35=>24, 36=>25, 9=>26, 25=>27, 19=>28, 14=>29, 42=>30, 10=>31, 39=>32, 44=>34, 30=>35, 34=>36, 29=>37, 22=>38, 46=>39, 11=>40, 48=>41, 51=>42, 8=>43, 12=>44, 47=>45, 7=>46, 21=>47, 16=>48, 18=>49, 32=>50, 53=>57, 0=>57}, "project_status_id"=>{1=>2, 2=>3, 3=>4, 4=>5, 5=>6, 6=>1, 0=>1}, "reaction_id"=>{1=>2, 2=>3, 3=>4, 4=>5, 0=>1}, "sec_impacts"=>{2=>1, 1=>2, 3=>3, 4=>4, 5=>5, 6=>6, 9=>7, 10=>8, 11=>9, 12=>10, 13=>11, 14=>12, 0=>13}, "status_id"=>{1=>2, 2=>3, 3=>4, 4=>5, 0=>1}, "types"=>{39=>1, 38=>2, 37=>3, 34=>4, 35=>5, 33=>6, 36=>7, 8=>8, 4=>9, 5=>10, 6=>11, 49=>12, 47=>13, 44=>14, 46=>15, 48=>16, 43=>17, 41=>18, 7=>19, 40=>20, 42=>21, 26=>22, 23=>23, 18=>24, 25=>25, 24=>26, 20=>27, 22=>28, 27=>29, 19=>30, 21=>31, 51=>32, 31=>33, 32=>34, 28=>35, 29=>36, 30=>37, 3=>38, 1=>39, 2=>40, 53=>41, 50=>42, 11=>43, 12=>44, 9=>45, 10=>46, 15=>47, 17=>48, 16=>49, 14=>50, 13=>51, 0=>53}}
  header.each_with_index do |h,i|
    if ConflictText.attribute_names.include?(h)
      ctat[i] = h
    elsif Conflict.attribute_names.include?(h)
      coat[i] = h
    elsif not ["link","eid"].include?(h)
      rels[i] = h
    end
  end
  ctat.delete 2
  coat[2] = "id"
  TrAccount.all.order(:id).each_with_index do |tr,ind|
    print "\r TrAccount #{ind+1}/#{TrAccount.count}"
    next if Account.find_by_email(tr.email)
    acc = create_in_ejatlas tr
    tr.tr_images.each do |img|
      create_in_ejatlas img, acc.id
    end
  end
  puts
  csv.each_with_index do |row,ind|
    print "\r TrConflict #{ind+1}/#{csv.length}"
    puts
    found = false
    if row[1]
      if c = Conflict.find(row[1].to_i)
        unless ct = ConflictText.find_by_slug(row[4].strip)
          ct = ConflictText.create :locale=>:tr, :conflict_id => c.id
        end
      else
        puts row[1].red
      end
      found = true
    elsif ct = ConflictText.find_by_slug(row[4].strip)
      c = ct.conflict
      unless c
        ct.destroy
        puts "ConflictText destroyed!".red
        break
      end
    else
      c = Conflict.create
      ct = ConflictText.create :locale=>:tr, :conflict_id => c.id
    end
    row.each_with_index do |val, index|
      next unless val
      attr = header[index]
      puts attr.yellow
      next if "table,json,marker,commented,features,licence,ready,formerid,tr_region_id".split(",").include?(attr)
      attr = "formerid" if attr === "id"
      if coat.keys.include? index 
        c.update_attribute attr, val unless found
      elsif ctat.keys.include? index
        ct.update_attribute attr, val
        if attr == "approval_status"
          c.update_attribute attr, val
        end
      elsif rels.keys.include? index
        next if found
        soul = []
        cool = []
        if attr == "account" 
          if a = Account.find_by_name(val)
            c.update_attribute :account_id, a.id
          else
            puts val
          end
        elsif attr == "types"
          soul = val.split(":::").map{|x|[x]}
          model = Type
        #elsif "product_id,conflict_event_id,mobilizing_group_id,mobilizing_form_id".split(",").include?(attr)
        elsif attr.match(/_id$/)
          soul = val.split(/\n/).map{|x|[x]}
          model = eval(attr.sub(/_id$/,"").classify)
        elsif attr.match(/_impact$/)
          soul = val.split(/\n/).map do |x|
            y = x.match(/\(.\)$/)[0]
            [x.sub(/\s*\(.\)$/,""),{:imp=>y.slug}]
          end
          model = eval("#{attr}s".classify)
        elsif "references,legislations,weblinks,medialinks".split(",").include?(attr)
          cool = val.split(/\]\n/).map do |x|
            y = x.split(/\)\s*\[/)
            puts
            p y
            [y[0].sub(/^\(/,"").strip,{:url=>(y[1]||"").sub(/\]?$/,"").strip}]
          end
          p soul
          model = eval(attr.classify)
          puts model.to_s.green
        elsif "".split(",").include?(attr)
        end
        others = []
        other = ""
        puts
        puts model.to_s.red
        soul.each do |line|
          name = line[0]
          tname = model.to_s.tableize
          begin
            t = eval("Tr#{model}").find_by_slug(name.slug)
          rescue
            t = eval("Tr#{model}").find_by_name(name)
          end
          if t
            tid = res[tname][t.id]
            if res[tname][0] == t.id or not tid
              tt = model.find(res[tname][0])
              if eval("c.#{tname}").include? tt
                puts "#{t.name.magenta} already added"
              else
                puts "#{t.name.blue} adding to case"
              end
              other = "other_#{tname}"
              if ConflictText.has_attribute?(other)
                others << t.name
              end
            else
              tt = model.find(tid)
              if eval("c.#{tname}").include? tt
                puts "#{tt.name.cyan} already added"
              else
                puts "#{tt.name.green} adding to case"
              end
            end
            opts = {"conflict_id" => c.id, tname.sub(/s$/,"_id") => tt.id}
            if tname.match(/_impacts$/) and line[1].has_key?(:imp)
              opts["visible"] = (line[1][:imp] == "g" ? true : false)
            end
            eval("C#{model}").create opts
          else
            puts "#{model} not found: #{line.blue}".red
          end
        end
        cool.each do |line|
          name = line[0]
          tname = model.to_s.tableize
          if line[1].has_key?(:url) 
            tt = model.where(:url=>line[1][:url],:conflict_id=>c.id)
            if tt
              if eval("c.#{tname}").include? tt
                puts "#{tt.name.cyan} already added"
              end
            else
              puts "#{tt.name.green} adding to case"
              opts = {"conflict_id" => c.id, "url" => line[1][:url], "name" => name}
              model.create opts
            end
          else
          end
        end
        if ConflictText.has_attribute?(other)
          puts "#{other.yellow}: #{others.join(", ")}".yellow
          ct.update_attribute other, others.join(", ")
        end
      end
    end
    puts
    break if ind == 6
  end
  I18n.locale = lastlocale
  nil
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

def check_existing_it_conflicts
  load "#{Dir.pwd}/misc/it-models.rb"
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  lines = File.readlines("../it_cases.txt")
  lines.each_with_index do |line,ind|
    print "\r #{ind+1}/#{lines.length}"
    #puts
    line = line.split(" - ")
    #p line
    if it = ItConflict.find_by_slug(line[0].slug)
      if en = Conflict.find_slug(line[1].slug)
        unless ConflictText.where(:conflict_id=>en.id,:locale=>"it").empty?
          #puts "it: #{it.id}, en: #{en.id}"
          #puts "found"
          next
        end
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
        #puts "it: #{it.id}, en: none"
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

def check_it_conflicts 
  load "#{Dir.pwd}/misc/it-models.rb"
  lastlocale = I18n.locale
  I18n.locale = :it
  cols = parse_columns File.read("#{Dir.pwd}/misc/migrate.txt")
  puts
  puts "Accounts"
  itslugs = File.readlines("../it_cases.txt").map{|l| l.split(" - ")[0]}
  ItAccount.all.order(:id).each_with_index do |it,ind|
    print "\r #{ind+1}/#{ItAccount.count}"
    next if Account.find_by_email(it.email)
    acc = create_in_ejatlas it
    it.it_images.each do |img|
      create_in_ejatlas img, acc.id
    end
  end
  puts
  puts "Conflicts"
  ItConflict.all.order(:id).each_with_index do |it,ind|
    print "\r #{ind+1}/#{ItConflict.count}"
    #puts
    #puts "#{it.name} (#{it.approval_status})"
    next if itslugs.include?(it.slug)
#=begin
    if ct = ConflictText.find_by_slug(it.slug)
      c = ct.conflict
    else
      c = Conflict.create
      ct = ConflictText.create :locale=>:it, :conflict_id => c.id
    end
#=end
    it.attributes.each do |attr,val|
      next if "table,json,marker,commented,features,licence,ready,formerid,it_region_id".split(",").include?(attr)
      attr = "formerid" if attr === "id"
      attr = attr.sub(/^it_/,"") if attr.match(/_id$/)
      if cols.keys.include?(attr)
        #puts "    #{attr.green}: #{val}"
        ct.update_attribute attr, val
        if attr == "approval_status"
          c.update_attribute attr, val
        elsif attr == "province" and it.it_region_id
          ct.update_attribute attr, "#{val.strip}, #{it.it_region.name.strip}"
        end
      else
        #puts "    #{attr.blue}: #{val}"
        if attr == "account_id"
          c.update_attribute attr, Account.find_by_email(ItAccount.find(val).email).id
        else
          c.update_attribute attr, val
        end
      end
    end
    it.methods.grep(/^validate_associated_records_for_.*$/).map{|m|m.to_s.split("validate_associated_records_for_")[1]}.each do |rel|
      if rel.match(/^it_[pc]_/)
        #puts "    #{rel.red}: #{eval("it.#{rel}.map(&:id)")}"
      else
        if "categories,conflict_events,env_impacts,hlt_impacts,mobilizing_forms,mobilizing_groups,products,project_statuses,reactions,sec_impacts,statuses,types".split(",").map{|x| "it_#{x}"}.include?(rel)
          begin
            #puts "    #{rel.yellow}: #{eval("it.#{rel}.map(&:name)")}"
          rescue
            #puts "    #{rel.purple}: #{eval("it.#{rel}.map(&:id)")}"
          end
          eval("it.#{rel}").each do |obj|
            oid = obj.id
            oid = 53 if obj.model_name == "ItType" and obj.id == 52
            eval("c.#{rel.sub(/^it_/,"")}") << eval(obj.model_name.to_s.sub(/^It/,"")).find(oid)
          end
        elsif "companies,supporters".split(",").map{|x| "it_#{x}"}.include?(rel)
          #puts "    #{rel.magenta}: #{eval("it.#{rel}.map(&:id)")}"
          eval("it.#{rel}").each do |comp|
            if cm = eval(comp.model_name.to_s.sub(/^It/,"")).find_by_slug(comp.slug)
              eval("c.#{rel.sub(/^it_/,"")}") << cm unless eval("c.#{rel.sub(/^it_/,"")}").include?(cm)
            else
              create_in_ejatlas comp, c.id
            end
          end
        else
          #puts "    #{rel.cyan}: #{eval("it.#{rel}.map(&:id)")}"
          eval("it.#{rel}").each do |obj|
            create_in_ejatlas obj, c.id
          end
        end
      end
    end
    #break if ind == 0
  end
  I18n.locale = lastlocale
  nil
end

def create_in_ejatlas obj, aid=nil
  pref = I18n.locale.to_s.downcase
  if obj.has_attribute? :slug and eval(obj.model_name.to_s.sub(/^#{pref.titlecase}/,"")).find_by_slug(obj.slug)
    return nil
  end
  ebj = eval(obj.model_name.to_s.sub(/^#{pref.titlecase}/,"")).new
  obj.attributes.each do |attr,val|
    next if attr.match(/^id$/)
    next if attr.match(/^file$/)
    if attr.match(/_id$/)
      attr = attr.sub(/^#{pref}_/,"")
      ebj.update_attribute attr, aid
    else
      val = val.sub(/^#{pref.titlecase}/,"") if attr === "attachable_type"
      ebj.update_attribute attr, val
    end
  end
  if obj.has_attribute? :file
    `cd #{Dir.pwd}/tmp && curl -O #{obj.file_url} 2> /dev/null && cd ..`
    file = File.open("#{Dir.pwd}/tmp/#{obj.file_url.split(/\//)[-1]}","rb")
    #file = open(obj.file_url)
    ebj.file = file
    begin
      ebj.save!
    rescue => e
      puts e
    end
  end
  ebj
end

