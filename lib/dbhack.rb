def trimdocs
  # ActiveRecord::Migration.add_column :documents, "copied?", :boolean
  Conflict.all.find_in_batches do |batch|
    batch.each do |con|
      next if con.documents.count == 0
      print "#{con.id}\r"
      docs = con.documents.map{|x| [x.file.file.filename,x]}.to_h
      imgs = con.images.map{|x| x.file.file.filename}
      imgs.each do |img|
        if o = docs.keys.index(img) 
          docs[img].update_attribute :copied?, true
        end
      end
    end
  end
end

def hackDB
  ActiveRecord::Migration.class_eval do |t|
    create_table "requests", :force => true do |t|
      t.integer  "id"
      t.text     "description"
      t.integer  "requester_id"
      t.integer  "requested_id"
      t.integer  "version_id"
      t.boolean  "accepted"
      t.boolean  "rejected"
      t.text     "rejection_note"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end

def resetPWs
  Account.where(role:'user').each do |a|
    rnd = '%12x' % (rand((8 ** 16)*15)+(8**16))
    a.password = rnd
    a.password_confirmation = rnd
    a.save
  end
end

def create_ca
  ActiveRecord::Migration.class_eval do |t|
    create_table "conflict_accounts", :force => true do |t|
      t.integer "conflict_id"
      t.integer "account_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end

def create_messaging
  ActiveRecord::Migration.class_eval do |t|
    create_table "conflict_messages", :force => true do |t|
      t.integer  "conflict_id"
      t.integer  "account_id"
      t.text     "content"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end

def fix_descs
  Conflict.all.each_with_index do |con,ind|
    print "\r#{ind+1} / #{Conflict.count}"
    next unless con.description
    desc = (con.description.split(/((<\/p><p>)|\n|\s\s+)+/) - [nil, "", " ", "</p><p>"]).map{|pa| pa.sub(/\.\s*$/,".</p><p>").sub(/[”"]\s*$/,"”</p><p>").sub(/[’']\s*$/,"’</p><p>")}.join(" ").sub(/^\s*(<p>)?\s*/,"<p>").sub(/\s*(<\/p>)?\s*$/,"</p>").gsub(/\s+/," ")
    con.update_attribute :description, desc
    con.ping
    con.save
  end
  puts
  "Done."
end

