#coding:utf-8

require "csv"

def to_csv model
  m = eval model
  
  file = "tmp/"+model+".csv"
  filename = "tmp/"+model+"-"+Time.now.strftime("%Y-%m-%d-%H:%M:%S")+".csv"
  CSV.open(file, "wb") do |csv|
    
    m.order('name asc').each_with_index do |i,ind|
      begin
        if ind == 0
          hdr = []
          i.attributes.each {|na,t| hdr << na}
          csv << hdr
        end
        ats = []
        i.attributes.each do |n,at|
          begin
            ats << at
          rescue
            ats << ""
          end
        end
        csv << ats
      rescue
      end
    end
  end
  return [file, filename]
end
