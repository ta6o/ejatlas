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
