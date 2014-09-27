#coding: utf-8
def plinking field
  rows = {}
  urls = {}
  rsls = []
  return rsls if field.nil?
  field.to_s.force_encoding("utf-8").gsub(/\r\n/,"\n").split(/\n/).each_with_index do |f,ind|
    unless f.match(/^\s*$/)
      f.gsub!(/^\s*(-|\)|\d|\.|•|)*\s*/,"")
      url = f.match(/(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
      url = f.match(/(?:(?:http|https|Http|HTTP|Https|HTTPS):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
      if url
        url = url.to_s
        if url.length == f.length
          urls[ind] = url[0..254]
        else
          desc = f.gsub(url,"")[0..254]
          rsls << {:desc=> desc, :url=>url}
        end
        f.gsub!(url,"")
      else
        rows[ind] = f
      end
    end
  end
  desc = ""
  lasturl = 0
  urls.each do |k,url|
    if rows[k-1]
      desc = rows.delete k-1
      desc = desc[0..254]
      rsls << {:desc=> desc, :url=>url}
    else
      if lasturl == k-1
        rsls << {:desc=> desc, :url=>url}
      else
        rsls << {:desc=> nil, :url=>url}
      end
    end
    lasturl = k
  end
  rows.each do |k,v|
    rsls << {:desc=> v, :url=>nil}
  end
  return rsls
end

def parsePart
  require "csv"
  testing = false
  master = File.read("#{PADRINO_ROOT}/misc/numbers.csv")#.force_encoding("utf-8")
  CSV.open("#{PADRINO_ROOT}/misc/textconversion.csv") do |csv|
    csv.each do |c|
      r = c[2]
      puts "#{r.to_s} (#{master.count(r.to_s).to_s}) #{c[2]} => #{c[1]}"
      master.gsub! (r) do |x|
        c[1]
      end
    end
  end
  conflicts = CSV.parse(master, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
  header = conflicts.shift
  conflicts.shuffle! if testing
  errors = []
  merrs = {}
  parsedcount = 0
  conflicts.each_with_index do |row,index|
    parsedcount += 1
    break if parsedcount > 120 and testing
    break if row[1] == "" or row[1].nil?
    unless c = Conflict.find_by_slug(Admin.slugify(row[1]))
      #puts "#{index} #{row[1]
      errors << "#{row[1]}: Not matched any case"
      next
    else
      puts "#{index} #{c.name} #{c.id} #{row[5]}"
    end

    c.project_area = row[5]

    c.affected_people = row[18]
    if row[18] and aps = row[18].gsub('thousand','000').gsub('million','000000').gsub('billion','000000000').gsub(/[\.,\s]+/,'').scan(/\d+/)
      c.affected_min = aps.min
      c.affected_max = aps.max
    end

    isum = row[19]
    if isum
      puts isum.background(:green) 
      c.investment_string = isum
      nisum = isum.scan(/\(([^\)]+)\)/)[0]
      isum = isum.gsub(nisum[0],'') if nisum
      #isum = isum.split('-')[0] if isum.match(/-/)
      isum = isum.gsub('million','000000').gsub('billion','000000000').gsub(/[\.,\s]+/,'') if isum
      isum = isum.scan(/\d+/).map{|x| x.to_i} if isum
      isum = isum.max if isum
      puts isum.to_s.background(:red) if isum
      c.investment_sum = isum.to_i
    end

=begin
    plinking(row[82]).each do |l|
      ref = Legislation.create :description => l[:desc], :url => l[:url]
      c.legislations << ref
    end

    plinking(row[83]).each do |l|
      ref = Reference.create :description => l[:desc], :url => l[:url]
      c.references << ref
    end

    plinking(row[84]).each do |l|
      ref = Weblink.create :description => l[:desc], :url => l[:url]
      c.weblinks << ref
    end

    plinking(row[85]).each do |l|
      ref = Medialink.create :description => l[:desc], :url => l[:url]
      c.medialinks << ref
    end
=end
    begin
      c.save
    rescue => exc
      errors << "#{c.name}: #{exc.inspect}"
    end

  end
  if errors.any?
    12.times do
      puts "                                                           ".background(:red)
    end
    errors.each {|e| puts e}
    12.times do
      puts "                                                           ".background(:red)
    end
  end
  puts
  merrs.each do |t, m|
    if m.any?
      puts t
      m.each do |mt|
        puts "#{mt[0]}: #{mt[1]}"
      end
    end
  end
  puts
end


def parseData
  require "csv"
  testing = false
  #conflicts = CSV.read("#{PADRINO_ROOT}/misc/master.csv", :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
  master = File.read("#{PADRINO_ROOT}/misc/missing.csv")#.force_encoding("utf-8")
  CSV.open("#{PADRINO_ROOT}/misc/textconversion.csv") do |csv|
    csv.each do |c|
      r = c[2]
      puts "#{r.to_s} (#{master.count(r.to_s).to_s}) #{c[2]} => #{c[1]}"
      master.gsub! (r) do |x|
        c[1]
      end
    end
  end
  conflicts = CSV.parse(master, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
  header = conflicts.shift
  conflicts.shuffle! if testing
  errors = []
  merrs = {}
  parsedcount = 0
  conflicts.each_with_index do |row,index|
    parsedcount += 1
    break if parsedcount > 200 and testing
    break if row[1] == "" or row[1].nil?
    next if Conflict.find_by_name(row[1])
    c = Conflict.new

    c.formerid = row[0].to_i
    c.name = row[1]
    puts
    puts "#{index} #{c.name if c.name}"
    country = Country.find_name(row[2].to_s)
    unless country
      country = Country.create(:name=>row[2])
      c.formerid = row[0].to_i
    end
    c.country = country
    c.site = row[3]
    c.province = row[4]
    c.accuracy_level = ["","Low","Medium","High"].index(row[5])

    c.project_area = row[6]
=begin
    project_length = nil
    if project_area
      if project_area.match(/\b(hectar|ha)/)
        project_area.gsub! /\D/, ""
      elsif project_area.match(/\b(acre)/)
        project_area.gsub! /\D/, ""
        project_area = (project_area.to_i * 0.404686).to_i.to_s
      elsif project_area.match(/\b(sqkm|square km|square kilom)/)
        project_area.gsub! /\D/, ""
        project_area = (project_area.to_i * 100).to_i.to_s
      elsif project_area.match(/\b(sqmi|square mi|square mile)/)
        project_area.gsub! /\D/, ""
        project_area = (project_area.to_i * 258.999).to_i.to_s
      elsif project_area.match(/\b(km|kilometer)/)
        project_length = project_area.gsub! /\D/, ""
        project_area = nil
      elsif project_area.match(/\b(mi|mile)/)
        project_length = project_area.gsub! /\D/, ""
        project_length = (project_length.to_i * 1.60934).to_i.to_s
        project_area = nil
      end
      c.project_area = project_area
      c.project_length = project_length
    end
=end

    merrs[:category] = []
    if row[7] and cate = Category.find_by_slug(Admin.slugify row[7])
      c.category = cate
    else
      merrs[:category] << [row[1], row[7]]
    end
    c.save
    merrs[:type] = []
    row[8].split(':::').each_with_index do |t,i|
      if tt = Type.find_by_slug(Admin.slugify t)
        ct = CType.new
        ct.conflict_id = c.id
        ct.type_id = tt.id
        ct.ordering = c.types.count
        merrs[:type] << [row[1], t] unless ct.save
      else
        merrs[:type] << [row[1], t]
      end
    end

    c.description = rmlines row[9]
    puts c.description if c.description

    merrs[:commodity] = []
    if row[10]
      row[10].split(':::').each do |t|
        p = Product.find_by_name(t) unless t.nil?
        unless p.nil?
          c.products << p 
        else
          merrs[:commodity] << [row[1], row[7]]
        end
      end
    end

    c.other_products = row[11]
    c.products << Product.find_by_name('Other') if c.other_products.nil? and !c.products.include?(Product.find_by_name('Other'))

    c.project_details = rmlines row[12]
    puts c.project_details

    c.affected_people = row[13]
    if row[13] and aps = row[13].gsub('thousand','000').gsub('million','000000').gsub('billion','000000000').gsub(/[\.,\s]+/,'').scan(/\d+/)
      c.affected_min = aps.min
      c.affected_max = aps.max
    end


    organ(row[14],Company,c,'companies')

    if row[15]
      puts "Government Actors"
      row[15].split(/(\n|,\s*)+/).each do |ch|
        if ch
          next if ch.match /:$/ or ch.match(/^\s*$/) or ch.gsub(/\s/,'').length < 2
          t = ch.sub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
          t.strip!
          country = t.scan(/\(([^\)]+)\)\s*$/).last
          if country.is_a? Array
            country = country.first
          end
          if country
            t.sub!(/\(([^\)]+)\)\s*$/,'')
          end
          com = GovernmentActor.find_by_name(t)
          unless com
            com = GovernmentActor.new
            com.name = t[0..254]
            com.save
          end
          c.government_actors << com
        end
      end
    end

    organ(row[17],Supporter,c,'supporters')

    if row[18]
      puts "EJOs"
      row[18].split(/(\n|,\s*)+/).each do |ch|
        if ch
          next if ch.match /:$/ or ch.match(/^\s*$/) or ch.gsub(/\s/,'').length < 2
          t = ch.sub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
          t.strip!
          gov = JusticeParty.find_by_name(t)
          unless gov
            gov = JusticeParty.new
            gov.name = t[0..254]
            gov.save
          end
          puts gov.name
          c.justice_parties << gov
        end
      end
    end

    c.status = Status.find_by_name(row[19])
    c.reaction = Reaction.find_by_name(row[20])
    c.related_conflict_string = row[21]
    merrs[:poptype] = []
    c.population_type = ['Unknown','Urban','Semi-urban','Rural'].index(row[22])
    unless c.population_type
      merrs[:poptype] = [[row[1], row[22]]]
    end
    if c.affected_people
      puts c.affected_people.background(:blue) 
    else
      c.affected_people = row[23]
      puts c.affected_people.background(:blue) if c.affected_people
    end


    isum = row[24]
    if isum
      puts isum.background(:green) 
      c.investment_string = isum
      nisum = isum.scan(/\(([^\)]+)\)/)[0]
      isum = isum.gsub(nisum[0],'') if nisum
      #isum = isum.split('-')[0] if isum.match(/-/)
      isum = isum.gsub('million','000000').gsub('billion','000000000').gsub(/[\.,\s]+/,'') if isum
      isum = isum.scan(/\d+/).map{|x| x.to_i} if isum
      isum = isum.max if isum
      puts isum.to_s.background(:red) if isum
      c.investment_sum = isum.to_i
    end

    puts 'danger'

    sdate = row[25]
    sdate.to_s.downcase.gsub('x','0').gsub(/[-\/]/,'/')
    puts sdate
    sdates = stripDate(sdate)
    puts sdates
    olddate = Date.parse('1800-01-01')
    if sdates and sdates[0] > olddate
      c.start_datestamp = sdates[0]
      c.start_date = sdates[1]
      puts sdates[0]
    end

    edate = row[26]
    edate = []
    edate.to_s.downcase.gsub('x','0').gsub(/[-\/]/,'/')
    edates = stripDate(edate)
    if edates and edates[0] > olddate
      c.end_datestamp = edates[0]
      c.end_date = edates[1]
      puts edates[0]
    end

    merrs[:mobgroup] = []
    if row[27]
      row[27].split(':::').each do |t|
        p = MobilizingGroup.find_by_name(t) unless t.nil?
        unless p.nil?
          c.mobilizing_groups << p
        else
          merrs[:mobgroup] << [row[1], t]
        end
      end
    end

    c.other_mobilizing_groups = row[28]
    c.mobilizing_groups << MobilizingGroup.find_by_name('Other') if c.other_mobilizing_groups and !c.mobilizing_groups.include?(MobilizingGroup.find_by_name('Other'))

    merrs[:mobform] = []
    if row[29]
      row[29].split(':::').each do |t|
        p = MobilizingForm.find_by_name(t) unless t.nil?
        unless p.nil?
          c.mobilizing_forms << p
        else
          merrs[:mobform] << [row[1], t]
        end
      end
    end

    c.other_mobilizing_forms = row[30]
    c.mobilizing_forms << MobilizingForm.find_by_name('Other') if c.other_mobilizing_forms and !c.mobilizing_forms.include?(MobilizingForm.find_by_name('Other'))

    p = ["Yes","Not sure","No"].index row[77]
    c.success_level = p unless p.nil?


    merrs[:env_impact] = []
    31.upto(50) do |imp|
      re = row[imp]
      im = ['No Data','Latent, Potential or Uncertain','Observed or Documented'].index re
      next unless im
      if im > 0
        impa = EnvImpact.find(imp-30)
        cimp = CEnvImpact.new
        cimp.conflict = c
        cimp.env_impact = impa
        cimp.visible = (im == 2)
        cimp.save
      else
        merrs[:env_impact] << [row[1],re]
      end
    end
    c.other_env_impacts = row[51]

    merrs[:hlt_impact] = []
    52.upto(61) do |imp|
      re = row[imp]
      im = ['No Data','Latent, Potential or Uncertain','Observed or Documented'].index re
      next unless im
      if im > 0
        impa = HltImpact.find(imp-51)
        cimp = CHltImpact.new
        cimp.conflict = c
        cimp.hlt_impact = impa
        cimp.visible = (im == 2)
        cimp.save
      else
        merrs[:hlt_impact] << [row[1],re]
      end
    end
    c.other_hlt_impacts = row[62]

    merrs[:sec_impact] = []
    63.upto(74) do |imp|
      re = row[imp]
      im = ['No Data','Latent, Potential or Uncertain','Observed or Documented'].index re
      next unless im
      if im > 0
        impa = SecImpact.find(imp-62)
        cimp = CSecImpact.new
        cimp.conflict = c
        cimp.sec_impact = impa
        cimp.visible = (im == 2)
        cimp.save
      else
        merrs[:sec_impact] << [row[1],re]
      end
    end
    c.other_sec_impacts = row[75]

    t = row[76]
    merrs[:status] = []
    p = ProjectStatus.find_by_name(t) unless t.nil?
    if p and p.class == ProjectStatus
      puts p.name
      c.project_status = p 
    else
      merrs[:status] << [row[1],t]
    end

    c.success_reason = row[78]
    puts c.success_reason if c.success_reason

    merrs[:outcome] = []
    if row[79]
      row[79].split(':::').each do |t|
        p = ConflictEvent.find_by_name(t) unless t.nil?
        unless p.nil?
          c.conflict_events << p 
        else
          merrs[:outcome] << [row[1],t]
        end
      end
    end

    c.other_outcomes = row[80]
    c.conflict_events << ConflictEvent.find_by_name('Other') unless c.other_outcomes.nil?

    c.suggested_alternatives = row[81]

    linking(row[82]).each do |l|
      ref = Legislation.create :description => l[:desc], :url => l[:url]
      c.legislations << ref
    end

    linking(row[83]).each do |l|
      ref = Reference.create :description => l[:desc], :url => l[:url]
      c.references << ref
    end

    linking(row[84]).each do |l|
      ref = Weblink.create :description => l[:desc], :url => l[:url]
      c.weblinks << ref
    end

    linking(row[85]).each do |l|
      ref = Medialink.create :description => l[:desc], :url => l[:url]
      c.medialinks << ref
    end

    c.other_comments = row[86]
    c.contributor = row[87]

    cem = row[89]
    unless ac = Account.find_by_email(cem) 
      ac = Account.new
      unless cem and cem.match /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
        cem = "ejoltmap@gmail.com"
      end
      ac.email = cem
      if row[88]
        ac.name = row[88]
      else
        ac.name = "No Name"
      end
      ac.address = row[90]
      ac.surname = '%12x' % (rand((8 ** 16)*15)+(8**16))
      ac.password = ac.surname
      ac.password_confirmation = ac.surname
      ac.role = "user"
      ac.save
    end
    puts ac.name
    puts ac.email
    c.account = ac

    if row[95]
      aps = row[95].downcase.strip
      aps = 'queued' if aps == 'pending moderation'
      aps = 'draft' if aps.nil?
      aps = 'draft' if aps.match(/.*\d+.*/)
      c.approval_status = aps
    end
    c.lon = row[96].to_f
    c.lat = row[97].to_f

    begin
      c.save
    rescue => exc
      errors << "#{c.name}: #{exc.inspect}"
    12.times do
      puts "                                                           ".background(:red)
    end
    end

  end
  if errors.length > 0
    12.times do
      puts "                                                           ".background(:red)
    end
    errors.each {|e| puts e+"\n\n"}
    12.times do
      puts "                                                           ".background(:red)
    end
  end
  merrs.each do |t, m|
    if m.any?
      puts t
      m.each do |mt|
        puts "#{mt[0]}: #{mt[1]}"
      end
    end
  end
  puts
end

def organ row, cls, c, cnam
  if row
    puts cnam
    gdesc = nil
    row.split("\n").each do |comp|
      next if comp.match(/^\s*$/)
      gd = comp.split(":")
      if gd[0]== ""
        gdesc = gd[1..-1].join(":")
        next
      end
      x = comp.gsub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
      x = x.gsub("CAN","Canada").force_encoding("utf-8")
      f = {}
      f[:name] = x.match(/^[\p{L}\d\s\-\,\.\/’&]+(\[|\(|:|$)/).to_s.chomp('[').chomp('(').chomp(':').chomp(' ')
      f[:name] = f[:name][0..254]
      puts f[:name]
      acr = x.scan(/\[([^\]]+)\]/)
      f[:acronym] = acr[0][0].gsub(/[\[\]]/,'') if acr.length > 0

      cnt = x.scan(/\(([^\)]+)\)/)
      if cnt.length == 1
        if cnt[0][0].match(/[,-\/]/)
          f[:country] = cnt[0][0].gsub(/[\(\)]/,'').split(/\s*[,-\/]\s*/)
        else
          f[:country] = [cnt[0][0].gsub(/[\(\)]/,'')] 
        end
      elsif cnt.length > 1
        cns = []
        cnt.each do |cn|
          cns << cn[0].gsub(/[\(\)]/,'')
        end
        f[:country] = cns
      end
      cid = nil
      if f[:country] and cnt = Country.find_slug(Admin.slugify(f[:country][0]))
        cid = cnt.id
      end

      dsc = x.split(":")
      f[:description] = gdesc.to_s+" "+dsc[1..-1].join(":") if dsc.length > 1
      url = f[:description].match(/(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/).to_s if f[:description]
      f[:website] = url.to_s if url

      unless f[:name].nil? or f[:name] == ""
        company = cls.find_by_slug(Admin.slugify(f[:name]))
      end
      unless ! cls.attribute_names.include? 'acronym' or f[:acronym] == "" or f[:acronym].nil?
        company = cls.find_by_acronym(f[:acronym]) unless company
      end
      unless company 
        if (f[:name].nil? or f[:name] == "") and (f[:acronym].nil? or f[:acronym] == "")
          next
        elsif cls.attribute_names.include? 'acronym'
          company = cls.create( :name => f[:name], :acronym => f[:acronym], :country_id => cid )
        elsif cls.attribute_names.include? 'country_id'
          company = cls.create( :name => f[:name], :country_id => cid )
        else
          company = cls.create( :name => f[:name] )
        end
      end
      company.name = f[:name] if company.name.nil?
      company.acronym = f[:acronym] if cls.attribute_names.include? 'acronym' and company.acronym.nil? 
      company.website = f[:website] if cls.attribute_names.include? 'website' and company.website.nil? 
      company.country_id = cid if cls.attribute_names.include? 'country_id' and company.country_id.nil? 
      company.save
      c_c = eval "c.#{cnam}"
      c_c << company unless c_c.include? company
      if cnam == "companies" and cc = c.c_companies.find_by_company_id(company.id)
        cc.involvement = f[:description]
        cc.save
      end
    end
    c.companies.each {|cc| puts cc.name}
  end
end

def first r,i
  return r.children[i].children.first.text if r.children[i].children.any?
  return nil
end

def linking field
  rows = {}
  urls = {}
  rsls = []
  return rsls if field.nil?
  field.to_s.force_encoding("utf-8").gsub(/\r\n/,"\n").split(/\n/).each_with_index do |f,ind|
    unless f.match(/^\s*$/)
      f.gsub!(/^\s*(-|\)|\d|\.|•|)*\s*/,"")
      url = f.match(/(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
      url = f.match(/(?:(?:http|https|Http|HTTP|Https|HTTPS):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
      if url
        url = url.to_s
        if url.length == f.length
          urls[ind] = url[0..254]
        else
          desc = f.gsub(url,"")[0..254]
          rsls << {:desc=> desc, :url=>url}
        end
        f.gsub!(url,"")
      else
        rows[ind] = f
      end
    end
  end
  desc = ""
  lasturl = 0
  urls.each do |k,url|
    if rows[k-1]
      desc = rows.delete k-1
      desc = desc[0..254]
      rsls << {:desc=> desc, :url=>url}
    else
      if lasturl == k-1
        rsls << {:desc=> desc, :url=>url}
      else
        rsls << {:desc=> nil, :url=>url}
      end
    end
    lasturl = k
  end
  rows.each do |k,v|
    rsls << {:desc=> v, :url=>nil}
  end
  return rsls
end

def pingCountries
  Country.all.each do |c| 
    c.ping
    puts c.name
    c.save
  end
end

def clearDups id
  conf = Conflict.find(id)
  puts "Cleaning Bugs & Rogues for #{conf.name}"
  m2ms = {
    "c_types" => Type,
    "c_companies" => Company,
    "c_products" => Product,
    "c_conflict_events" => ConflictEvent,
    "c_mobilizing_groups" => MobilizingGroup,
    "c_mobilizing_forms" => MobilizingForm,
    "c_government_actors" => GovernmentActor,
    "c_supporters" => Supporter,
    "c_justice_parties" => JusticeParty,
    "c_env_impacts" => EnvImpact,
    "c_hlt_impacts" => HltImpact,
    "c_sec_impacts" => SecImpact
  }
  m2ms.each do |nm, ar|
    cs = eval("conf.#{nm}")
    ms = []
    cs.each do |c|
      ot = eval("c.#{nm.gsub(/^c_/,'').gsub(/ies$/,'y').gsub(/s$/,'')}_id")
      if ms.include?([conf.id,ot])
        c.destroy
        puts "Destroyed bug '#{ar.find(ot).name}' from #{nm} of #{conf.name}"
      end
      ms << [conf.id,ot]
    end
  end
end

def clearRogues
  puts "Cleaning Bugs & Rogues"
  m2ms = {
    "c_types" => Type,
    "p_companies" => Company,
    "c_companies" => Company,
    "c_products" => Product,
    "c_conflict_events" => ConflictEvent,
    "c_mobilizing_groups" => MobilizingGroup,
    "c_mobilizing_forms" => MobilizingForm,
    "c_government_actors" => GovernmentActor,
    "c_supporters" => Supporter,
    "c_justice_parties" => JusticeParty,
    "c_env_impacts" => EnvImpact,
    "c_hlt_impacts" => HltImpact,
    "c_sec_impacts" => SecImpact
  }
  m2ms.each do |nm, ar|
    ar.all.each do |ot|
      cs = eval("ot.#{nm}")
      ms = []
      cs.each do |c|
        if c.has_attribute? :conflict_id
          if c.conflict and ms.include?([c.conflict.id,ot.id])
            c.destroy
            puts "destroyed bug from #{nm} of #{c.conflict.name}"
          elsif c.conflict
            ms << [c.conflict.id,ot.id]
          else
            c.destroy
            puts "destroyed rogue from #{nm} of #{ot.name}"
          end
        elsif c.has_attribute? :product_id
          if c.product and ms.include?([c.product.id,ot.id])
            c.destroy
            puts "destroyed bug from #{nm} of #{c.product.name}"
          elsif c.product
            ms << [c.product.id,ot.id]
          else
            c.destroy
            puts "destroyed rogue from #{nm} of #{ot.name}"
          end
        end
      end
    end
  end
end

def rmlines str
  return nil if str.nil?
  arr = str.split("\n")
  res = []
  arr.each do |a|
    if a.match(/[.!?]+\s*$/)
      res << a.strip.sub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
      res << "\n"
    else
      res << a.strip.sub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
    end
  end
  return res.join(" ")
end

def stripDate par
  return if par.nil? or par.length == 0
  par.reverse! if par.match /\d{4}.\d{2}.\d{2}/
  matches = ['','01/','01/01/']
  subs = [0,par.length-7,par.length-4]
  n = 0
  begin
    s = par[[subs[n],0].max..-1]
    puts matches[n]+s
    d = Date.strptime matches[n]+s, '%d/%m/%Y'
    y = d.year
  rescue ArgumentError
    n += 1
    unless n > 2
      retry
    end
  end
  return [d,s] if d and s and d.class == Date
  return
end

def fixissues
  Conflict.where('other_products is not null').each do |c|
    op = c.other_products
    ccp = c.c_products.where(product_id: 57)[0]
    if op.length < 3
      c.other_products = nil 
      ccp.destroy if ccp
    else
      c.other_products = UnicodeUtils.titlecase(op)
      c.products << Product.find(57) unless ccp
    end
    c.save
  end
end

def mergeAccounts
  require "csv"
  accs = CSV.read("#{PADRINO_ROOT}/misc/accounts_merged.csv", :row_sep => :auto, :col_sep => ",", encoding: "utf-8")
  accs.each_with_index do |row,index|
    main = Account.find_by_email row[0]
    next unless main
    rest = []
    i = 1
    while row[i]
      if ac = Account.find_by_email(row[i])
        rest << ac
      else
        puts row[i]
      end
      i += 1
    end
    rest.each do |r|
      r.conflicts.each do |c|
        main.conflicts << c
      end
      main.name = r.name if main.name == "No Name"
      r.destroy
    end
    main.save
  end
  Account.all.each {|a| a.public = true; a.save}
end

def resetSurnames
  CSV.open("#{PADRINO_ROOT}/misc/oldaccounts.csv", :col_sep => "\t") do |csv|
    csv.each do |c|
      if ac = Account.find_by_email(c[1])
        ac.surname = c[0] unless c[2] == "true"
        ac.approved = true if c[2] == "true"
        ac.save
      else
        puts c[1]
      end
    end
  end
end

def checkflags
  root = "#{PADRINO_ROOT}/misc/flags/"
  flags = []
  Dir.open(root).each do |filename| 
    unless File.directory? root+filename 
      slug = Admin.slugify(filename.split(".")[0..-2].join("."))
      flags << slug
      if comp = Country.find_by_slug(slug)
        i = Image.new
        comp.flag_images << i
        i.file.store! File.open("#{root}#{filename}",'r')
        i.save
        puts comp.name
      else
        puts filename
      end
    end
  end
  #puts "flags not in comps"
  #puts (flags - Country.select(:name).map(&:name))
end


def checkdocs
  root = "#{PADRINO_ROOT}/misc/docs/"
  docs = []
  imgs = []
  require 'csv'

  source = CSV.read("#{PADRINO_ROOT}/misc/docs.csv")
  titles = {}
  source.each do |line|
    unless titles.has_key? line[0].to_i
      titles[line[0].to_i] = {}
    end
    begin
      titles[line[0].to_i] = [line[1], line[2], line[3]]
    rescue
      puts 'nope!'
    end
  end
  tits = titles.keys.sort
  tits.each do |k|
    if conf = Conflict.find_by_formerid(k) 
      if File.file?("#{PADRINO_ROOT}/misc/docs/#{titles[k][0]}")
        filename = titles[k][0]
        if ["jpg","jpeg","png","gif","bmp"].include? filename.split('.')[-1].downcase
          i = Image.new
          conf.images << i
          i.file.store! File.open("#{PADRINO_ROOT}/misc/docs/#{filename}",'r')
          i.title = titles[k][1]
          i.save
          #puts "OK with #{conf.name}: #{titles[k][0]}, #{titles[k][1]}"
        elsif filename.split('.')[-1].downcase == "pdf" and false
          i = Document.new
          i.conflict = conf
          i.file.store! File.open("#{PADRINO_ROOT}/misc/docs/#{filename}",'r')
          i.title = titles[k][1]
          i.save
          puts "#{conf.name}: #{titles[k][0]}, #{titles[k][1]}"
        end
      else
        puts "  File not found for #{conf.name}: #{titles[k][0]}, #{titles[k][1]}"
      end
    else
      puts "  Conflict #{k} not found: #{titles[k][0]}, #{titles[k][1]}"
    end
  end

end

def checklogos
  root = "#{PADRINO_ROOT}/misc/logos/"
  logos = []
  Dir.open(root).each do |filename| 
    unless File.directory? root+filename 
      slug = Admin.slugify(filename.split(".")[0..-2].join("."))
      logos << slug
      if comp = Company.find_by_slug(slug)
        i = Image.new
        comp.logo_images << i
        i.file.store! File.open("#{root}#{filename}",'r')
        i.save
        puts comp.name
      else
        puts filename
      end
    end
  end
  #puts "logos not in comps"
  #puts (logos - Company.select(:name).map(&:name))
end

def textualizeActors
  Conflict.all.each do |c|
    puts c.name
    c.ejos = c.justice_parties.map(&:name).join(', ') if c.justice_parties.any?
    c.govt_actors = c.government_actors.map(&:name).join(', ') if c.government_actors.any?
    c.ping
    c.save
  end
end

def fixSlugs
  models = [Conflict, Country, Region, Company, Supporter, Product, Type]
  models.each do |m|
    puts m.to_s
    m.all.each do |i|
      os = i.slug
      s = Admin.slugify(i.name)
      if os != s
        old = OldSlug.create :name => os, :attachable_type => m.to_s, :attachable_id => i.id if os and os.length > 0
        i.slug = s
        i.save
        puts "  #{s} != #{os}"
      end
    end
  end
end

