lines = []
File.readlines("#{Dir.pwd}/db/schema.rb").each do |line|
  lines << line.match(/".+"/)[0].gsub("\"","")+":" if line.match(/^\s*create_table/)
  lines << "  t:  "+line.match(/".+"/)[0].gsub("\"","") if line.match(/^\s*t\.text/)
  lines << "  s:  "+line.match(/".+"/)[0].gsub("\"","") if line.match(/^\s*t\.string/)
end
puts lines.join("\n")
