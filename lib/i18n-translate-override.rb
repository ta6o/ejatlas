module I18n
  module Base
    def translate(*args)
      options  = args.last.is_a?(Hash) ? args.pop.dup : {:default_locale=>:en}
      key      = args.shift
      backend  = config.backend
      locale   = options.delete(:locale) || config.locale
      handling = options.delete(:throw) && :throw || options.delete(:raise) && :raise # TODO deprecate :raise

      enforce_available_locales!(locale)

      result = catch(:exception) do
        if key.is_a?(Array)
          key.map { |k| backend.translate(locale, k, options) }
        else
          backend.translate(locale, key, options)
        end
      end
      if result.is_a?(MissingTranslation)
        puts "TX not found: #{key} in #{locale}." if $debug
        #handle_exception(handling, result, locale, key, options) 
      elsif result.is_a? String
        result.sub(/^-$/,"")
      else
        result
      end
    end
    alias :t :translate
  end
end

class String
  def strip_html
    self.split(/\<.*?\>/)
     .map(&:strip)
     .reject(&:empty?)
     .join(' ')
     .gsub(/\s,/,',')
  end
  def slug fill="-", transliterate = true
    return self if self.nil?
    s = transliterate ? I18n.transliterate(self) : self
    s
      .downcase
      .strip
      .gsub(/[-_\s\/]+/, '-')
      .gsub(/[^\w-]/, '')
      .gsub(/-+/,fill)
  end
  def unslug lettercase="down"
    return self if self.nil?
    lettercase = lettercase.to_s.downcase
    if lettercase == "title"
      self.gsub(/[-_\s\/]+/, ' ').titlecase
    elsif lettercase == "up"
      self.gsub(/[-_\s\/]+/, ' ').upcase
    else
      self.gsub(/[-_\s\/]+/, ' ')
    end
  end
  def shorten_en
    words = self.gsub(/%{[^}]+}/,"var").strip.slug("-",false).split(/-/)
    ["a","and","of","the"].each{|d| words.delete(d)} if words.length > 3
    words[0..4].join("_")
  end
  def exists?
    return false if self.nil?
    return false if self == ""
    true
  end
end

class Integer
  def exists?
    return false if self.nil?
    true
  end
end

class NilClass
  def editor?
    false
  end
  def gis?
    false
  end
  def html_safe
    ""
  end
  def gsub x, y
    ""
  end
end

Admin.helpers do
  def self.fetch_translations download=true
    if download
      `rm #{Dir.pwd}/lib/sheets/*`
      print "\rFetching..."
      require "google_drive"
      api_id = "***REMOVED***.apps.googleusercontent.com"
      api_key = "***REMOVED***"
      $session = GoogleDrive.saved_session("./stored_token.json", nil, api_id, api_key)
      file = $session.spreadsheet_by_key("***REMOVED***")
      file.worksheets.each do |ws|
        next if ws.title.downcase == "legend"
        CSV.open("#{Dir.pwd}/lib/sheets/#{ws.title.downcase}.csv","w") do |csv|
          ws.rows.each do |row|
            csv << row
          end
        end
      end
      File.open("#{Dir.pwd}/lib/sheets/stamp","w"){|f| f << Time.now.to_i}
      $tkeys = []
      Dir.foreach("#{Dir.pwd}/lib/locales") {|x| $tkeys << x.split(".")[0] unless x.match(/^\./)}
    end

    print "\rParsing..."
    locales = {}
    locs = []
    keys = []
    $tstatus = {}
    `rm #{Dir.pwd}/lib/locales/* &> /dev/null` unless Dir.empty?("#{Dir.pwd}/lib/locales/")
    Dir.foreach("#{Dir.pwd}/lib/sheets/") do |file|
      next if file.match /^\./
      next unless file.match /\.csv$/
      next if file.match(/^auto/)
      file = file.strip
      CSV.read("#{Dir.pwd}/lib/sheets/#{file}").each_with_index do |row,ind|
        domain = "models,views,forms".split(",").include?(file.sub(/\.csv$/,"").slug) ? file[0].slug : file.sub(/\.csv$/,"").slug("_")
        fn = file.split(".")[0].slug
        $tstatus[fn] = {} unless $tstatus.has_key?(fn)
        if ind == 0
          locs = row.map{|loc| loc.slug("_")}
          locs[1..-1].each do |loc| 
            next if loc == ""
            $tstatus[fn][loc] = 0
            if locales.has_key?(loc)
              locales[loc][domain] = {} unless locales[loc].has_key?(domain)
            else
              locales[loc] = {domain=>{}} 
            end
          end
        else
          scope = row[0].strip.split(/\./)
          if ["m","c"].include? domain
            key = row[locs.index("master")].slug("_").split("_")[0..7].join("_")
          else
            key = row[locs.index("master")].shorten_en
          end
          keys << key
          row.each_with_index do |c,i|
            next if i == 0
            next if c.nil? or c.length == 0
            loc = locs[i]
            next if loc == ""
            $tstatus[fn][loc] += 1
            point = locales[loc][domain]
            scope.length.times do |t|
              point[scope[t]] = {} unless point.has_key? scope[t]
              point = point[scope[t]]
            end
            #puts "duplicate key: #{c}" if point[key]
            point[key] = c.strip
          end
        end
      end
    end
    pp locales.keys
    locales.each do |k,v|
      next if v.empty?
      #next if k == "master"
      File.open("#{Dir.pwd}/lib/locales/#{k}.yml","w") do |file|
        file << {k => v}.to_yaml
      end
    end
    #$tstatus.delete("master")
    $available_locales = []
    totals = $tkeys.map{|k| [k,0]}.to_h
    $tstatus.each do |k,v| 
      v.each do |l,i|
        totals[l] += i if totals.has_key?(l)
      end
    end
    master = totals.delete("master").to_f
    totals.each {|k,v| if v / master >= 0.75 then $available_locales << k end}
    $available_locales.sort!
    print "\rReloading"
    I18n.backend.reload!
    print "\r            "
    print "\r"

  end

  def self.fetch_translations download=true
    if download
      `rm #{Dir.pwd}/lib/sheets/*`
      print "\rFetching..."
      require "google_drive"
      api_id = "***REMOVED***.apps.googleusercontent.com"
      api_key = "***REMOVED***"
      $session = GoogleDrive.saved_session("./stored_token.json", nil, api_id, api_key)
      file = $session.spreadsheet_by_key("***REMOVED***")
      file.worksheets.each do |ws|
        next if ws.title.downcase == "legend"
        CSV.open("#{Dir.pwd}/lib/sheets/#{ws.title.downcase}.csv","w") do |csv|
          ws.rows.each do |row|
            csv << row
          end
        end
      end
      File.open("#{Dir.pwd}/lib/sheets/stamp","w"){|f| f << Time.now.to_i}
      $tkeys = []
      Dir.foreach("#{Dir.pwd}/lib/locales") {|x| $tkeys << x.split(".")[0] unless x.match(/^\./)}
    end

    print "\rParsing..."
    locales = {}
    locs = []
    keys = []
    $tstatus = {}
    `rm #{Dir.pwd}/lib/locales/* &> /dev/null` unless Dir.empty?("#{Dir.pwd}/lib/locales/")
    Dir.foreach("#{Dir.pwd}/lib/sheets/") do |file|
      next if file.match /^\./
      next unless file.match /\.csv$/
      next if file.match(/^auto/)
      file = file.strip
      CSV.read("#{Dir.pwd}/lib/sheets/#{file}").each_with_index do |row,ind|
        domain = "models,views,forms".split(",").include?(file.sub(/\.csv$/,"").slug) ? file[0].slug : file.sub(/\.csv$/,"").slug("_")
        fn = file.split(".")[0].slug
        $tstatus[fn] = {} unless $tstatus.has_key?(fn)
        if ind == 0
          locs = row.map{|loc| loc.slug("_")}
          locs[1..-1].each do |loc| 
            next if loc == ""
            $tstatus[fn][loc] = 0
            if locales.has_key?(loc)
              locales[loc][domain] = {} unless locales[loc].has_key?(domain)
            else
              locales[loc] = {domain=>{}} 
            end
          end
        else
          scope = row[0].strip.split(/\./)
          if ["m","c"].include? domain
            key = row[locs.index("master")].slug("_").split("_")[0..7].join("_")
          else
            key = row[locs.index("master")].shorten_en
          end
          keys << key
          row.each_with_index do |c,i|
            next if i == 0
            next if c.nil? or c.length == 0
            loc = locs[i]
            next if loc == ""
            $tstatus[fn][loc] += 1
            point = locales[loc][domain]
            scope.length.times do |t|
              point[scope[t]] = {} unless point.has_key? scope[t]
              point = point[scope[t]]
            end
            #puts "duplicate key: #{c}" if point[key]
            point[key] = c.strip
          end
        end
      end
    end
    pp locales.keys
    locales.each do |k,v|
      next if v.empty?
      #next if k == "master"
      File.open("#{Dir.pwd}/lib/locales/#{k}.yml","w") do |file|
        file << {k => v}.to_yaml
      end
    end
    #$tstatus.delete("master")
    $available_locales = []
    totals = $tkeys.map{|k| [k,0]}.to_h
    $tstatus.each do |k,v| 
      v.each do |l,i|
        totals[l] += i if totals.has_key?(l)
      end
    end
    master = totals.delete("master").to_f
    totals.each {|k,v| if v / master >= 0.75 then $available_locales << k end}
    $available_locales.sort!
    print "\rReloading"
    I18n.backend.reload!
    print "\r            "
    print "\r"

  end

  def self.fetch_translations download=true
    if download
      `rm #{Dir.pwd}/lib/sheets/*`
      print "\rFetching..."
      require "google_drive"
      api_id = "***REMOVED***.apps.googleusercontent.com"
      api_key = "***REMOVED***"
      $session = GoogleDrive.saved_session("./stored_token.json", nil, api_id, api_key)
      file = $session.spreadsheet_by_key("***REMOVED***")
      file.worksheets.each do |ws|
        next if ws.title.downcase == "legend"
        CSV.open("#{Dir.pwd}/lib/sheets/#{ws.title.downcase}.csv","w") do |csv|
          ws.rows.each do |row|
            csv << row
          end
        end
      end
      File.open("#{Dir.pwd}/lib/sheets/stamp","w"){|f| f << Time.now.to_i}
      $tkeys = []
      Dir.foreach("#{Dir.pwd}/lib/locales") {|x| $tkeys << x.split(".")[0] unless x.match(/^\./)}
    end

    print "\rParsing..."
    locales = {}
    locs = []
    keys = []
    $tstatus = {}
    `rm #{Dir.pwd}/lib/locales/* &> /dev/null` unless Dir.empty?("#{Dir.pwd}/lib/locales/")
    Dir.foreach("#{Dir.pwd}/lib/sheets/") do |file|
      next if file.match /^\./
      next unless file.match /\.csv$/
      next if file.match(/^auto/)
      file = file.strip
      CSV.read("#{Dir.pwd}/lib/sheets/#{file}").each_with_index do |row,ind|
        domain = "models,views,forms".split(",").include?(file.sub(/\.csv$/,"")) ? file[0] : file.sub(/\.csv$/,"")
        fn = file.split(".")[0]
        $tstatus[fn] = {} unless $tstatus.has_key?(fn)
        if ind == 0
          locs = row.map{|loc| loc.downcase}
          locs[1..-1].each do |loc| 
            next if loc == ""
            $tstatus[fn][loc] = 0
            if locales.has_key?(loc)
              locales[loc][domain] = {} unless locales[loc].has_key?(domain)
            else
              locales[loc] = {domain=>{}} 
            end
          end
        else
          scope = row[0].strip.split(/\./)
          if ["m","c"].include? domain
            key = row[locs.index("master")].slug("_",false).split("_")[0..7].join("_")
          else
            key = row[locs.index("master")].shorten_en
          end
          keys << key
          row.each_with_index do |c,i|
            next if i == 0
            next if c.nil? or c.length == 0
            loc = locs[i]
            next if loc == ""
            $tstatus[fn][loc] += 1
            point = locales[loc][domain]
            scope.length.times do |t|
              point[scope[t]] = {} unless point.has_key? scope[t]
              point = point[scope[t]]
            end
            #puts "duplicate key: #{c}" if point[key]
            point[key] = c.strip
          end
        end
      end
    end
    locales.each do |k,v|
      next if v.empty?
      #next if k == "master"
      File.open("#{Dir.pwd}/lib/locales/#{k}.yml","w") do |file|
        file << {k => v}.to_yaml
      end
    end
    #$tstatus.delete("master")
    $available_locales = []
    totals = $tkeys.map{|k| [k,0]}.to_h
    $tstatus.each do |k,v| 
      v.each do |l,i|
        totals[l] += i if totals.has_key?(l)
      end
    end
    master = totals.delete("master").to_f
    totals.each {|k,v| if v / master >= 0.75 then $available_locales << k end}
    $available_locales.sort!
    print "\rReloading"
    I18n.backend.reload!
    print "\r            "
    print "\r"

  end
end

