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

