load "#{Dir.pwd}/misc/greatcircle.rb"

def parse_csv
  filter = "{\"must\":{\"term\":[{\"country_id\":\"195\"},{\"category_id\":\"5\"},{\"types\":\"32\"},{\"products\":\"7\"}]}}"
  eja_plants = Admin.filter(filter, :en, true, [:id, :name, :lat, :lon], false).map { |c|
    [c["_source"]["id"],c["_source"]]
  }.to_h
  lati = 0
  loni = 0
  nami = 0
  idi  = 0
  pari = 0
  result = ["eja_id,eja_name,eja_company,gem_id,gem_name,gem_parent,distance_km".split(",")]
  eja_plants.each do |k,v|
    puts
    puts "#{v["id"].to_s.rjust(6)} #{v["name"].cyan}"
    list = []
    comp = Conflict.find(v["id"].to_i).companies.map(&:name).join(", ")
    CSV.read("#{Dir.pwd}/misc/coal_sample.csv").each_with_index do |row,ind|
      header = []
      if ind == 0
        header = row
        lati = header.index("latitude")
        loni = header.index("longitude")
        nami = header.index("plant")
        idi  = header.index("tracker id")
        pari = header.index("parent")
      else
        distance = GreatCircle.distance(v["lat"], v["lon"], row[lati].to_f, row[loni].to_f)
        if distance < 50
          puts "#{row[idi]} #{row[nami].green} #{distance.round(1)}km"
          list << [v["id"], v["name"], comp, row[idi], row[nami], row[pari], distance.round(2)]
        end
      end
    end
    list = list.sort do |a,b|
      a[6] <=> b[6]
    end
    list.each {|l| result << l }
  end
  CSV.open("#{Dir.pwd}/misc/coal_plant_distances.csv","w") do |csv|
    result.each do |row|
      csv << row
    end
  end
  nil
end
