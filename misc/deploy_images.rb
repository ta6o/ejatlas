def deploy_docs
  abs = "/mnt/data/ejatlas-static/docs"
  Dir.chdir(abs)
  Conflict.order(:id).each_with_index do |con,ind|
    ifns = con.images.map {|i| i.file.file.filename}
    next if con.documents.empty?
    con.documents.each do |doc|
      fn = doc.file.file.filename
      if File.file?("#{abs}/#{fn}")
        path = "#{abs}/#{fn}"
        col = :red
      elsif File.file?("#{abs}/#{con.id}/#{fn}")
        path = "#{abs}/#{con.id}/#{fn}"
        col = :green
      elsif File.file?("#{abs}/#{con.slug}/#{fn}")
        path = "#{abs}/#{con.slug}/#{fn}"
        col = :yellow
      else
        doc.destroy
        next
      end
      type = `file --mime-type --brief #{path}`.strip
      if type.match(/^image/) 
        if ifns.include?(fn) 
          if File.file?("/mnt/data/ejatlas-static/img/Conflict/#{con.id}/#{fn}")
            File.delete(path)
            doc.destroy
          else
            puts "#{doc.conflict.name.green}, #{doc.conflict_id}, #{fn.cyan}"
          end
        else
          ext = type.split("/")[-1].downcase.sub(/^jpeg$/,"jpg")
          puts "#{doc.conflict.name.green}, #{doc.conflict_id}, #{fn.magenta}"
        end
      elsif col != :green
        Dir.mkdir "#{abs}/#{con.id}" unless File.directory?("#{abs}/#{con.id}")
        File.rename path, "#{abs}/#{con.id}/#{fn}" 
        if col == :yellow
          begin
            Dir.rmdir("#{abs}/#{con.slug}")
            File.symlink("./#{con.id}", "#{abs}/#{con.slug}")
          rescue
          end
        end
        #puts "#{doc.conflict.name.green}, #{doc.conflict_id}, #{fn.colorize(col)}"
      end
      unless File.file?("#{doc.file.store_dir}/#{fn}")
        puts "#{doc.conflict.name.green}, #{doc.conflict_id}, #{fn.colorize(col)}"
      end
    end
    #break if ind > 120
  end
  Dir.chdir("/var/www/ejatlas")
  nil
end

def deploy_images
  abs = "/mnt/data/ejatlas-static/img/Conflict"
  Dir.chdir(abs)
  erc = 0
  efc = 0
  trc = 0
  tfc = 0
  Dir.foreach(".").sort.each do |dir|
    path = "./#{dir}"
    if File.file?(path)
      next
    elsif File.symlink?(path)
      puts path.cyan
      next
    elsif dir.match(/^\./)
      next
    elsif dir.match(/^\d+$/) # ID
      c = Conflict.find(dir.to_i)
      fc = 0
      Dir.foreach(path).sort.each do |file|
        fc += 1 if File.file?("#{path}/#{file}")
      end
      #trc += 1
      tfc += fc
    elsif ConflictText.where(:slug=>dir).any?
      fc = 0
      Dir.foreach(path).sort.each do |file|
        fc += 1 if File.file?("#{path}/#{file}")
      end
      cts =  ConflictText.where(:slug=>dir)
      [cts.sort_by{|x|[nil,"auto_tx","deleted","draft","queued","modified","approved"].reverse.index(x.approval_status)}.first].each do | ct|
        #puts "#{ct.locale.yellow} #{ct.name} #{(ct.approval_status||"").magenta} #{ct.conflict_id.to_s.cyan}"
        if Conflict.where(:id=>ct.conflict_id).any?
          Dir.foreach(path).sort.each do |file|
            next if file.match(/^\./)
            if File.directory?(file)
              return [path,file]
            end
            File.rename "#{path}/#{file}", "./#{ct.conflict_id}/#{file}"
          end
          Dir.rmdir(path)
          File.symlink("./#{ct.conflict_id}", path)
        else
          Dir.rmdir(path)
        end
      end
      trc += 1
      tfc += fc
    elsif c = Conflict.find_slug(dir)
      fc = 0
      Dir.foreach(path).sort.each do |file|
        fc += 1 if File.file?("#{path}/#{file}")
      end
      Dir.foreach(path).sort.each do |file|
        next if file.match(/^\./)
        if File.directory?(file)
          return [path,file]
        end
        File.rename "#{path}/#{file}", "./#{c.id}/#{file}"
      end
      Dir.rmdir(path)
      File.symlink("./#{c.id}", path)
      trc += 1
      tfc += fc
    else
      fc = 0
      Dir.foreach(path).sort.each do |file|
        fc += 1 if File.file?("#{path}/#{file}")
      end
      #puts "#{dir.red}: #{fc}" 
      erc += 1
      efc += fc
    end
  end
  Dir.chdir("/var/www/ejatlas")
  [[erc, efc],[trc,tfc]]
end

def test_symlink
  Dir.chdir "/home/atlas/test"
  File.symlink "./test","./test-link"
end
