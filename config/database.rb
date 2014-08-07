##
# You can use other adapters like:
#
#   ActiveRecord::Base.configurations[:development] = {
#     :adapter   => 'mysql',
#     :encoding  => 'utf8',
#     :reconnect => true,
#     :database  => 'your_database',
#     :pool      => 5,
#     :username  => 'root',
#     :password  => '',
#     :host      => 'localhost',
#     :socket    => '/tmp/mysql.sock'
#   }
#
ActiveRecord::Base.configurations[:development] = {
  :adapter  => 'postgresql',
  :encoding => 'utf8',
  :database => 'ejtest',
  :username => 'yakup',
  :password => '***REMOVED***',
  :host     => '127.0.0.1'
}

dbconfig = {}
if ENV["DATABASE_URL"]
  db_from_env = ENV["DATABASE_URL"].sub(/^postgres:\/\//,'').split(':')
  dbconfig[:user] = db_from_env[0]
  dbconfig[:password] = db_from_env[1].split('@')[0]
  dbconfig[:host] = db_from_env[1].split('@')[1]
  dbconfig[:port] = db_from_env[2].split('/')[0]
  dbconfig[:database] = db_from_env[2].split('/')[1]
end
ActiveRecord::Base.configurations[:production] = {
  :adapter  => 'postgresql',
  :encoding => 'utf8',
  :host => dbconfig[:host],
  :port => dbconfig[:port].to_i,
  :user => dbconfig[:user],
  :password => dbconfig[:password],
  :database => dbconfig[:database],
  :url => ENV["DATABASE_URL"]
}

# Setup our logger
ActiveRecord::Base.logger = logger

# Include Active Record class name as root for JSON serialized output.
ActiveRecord::Base.include_root_in_json = true

# Store the full class name (including module namespace) in STI type column.
ActiveRecord::Base.store_full_sti_class = true

# Use ISO 8601 format for JSON serialized times and dates.
ActiveSupport.use_standard_json_time_format = true

# Don't escape HTML entities in JSON, leave that for the #json_escape helper.
# if you're including raw json in an HTML page.
ActiveSupport.escape_html_entities_in_json = false

# Now we can estabilish connection with our db
ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Padrino.env])

# mongo -u heroku -p JqIwwmBHDqqDCowJf3_hR2twtoIGZlYkJbXAweJEYeT2q_GzSNxO-HZtREBGvaAF3XfD20yAo2s3H2d98ZxhsQ --host oceanic.mongohq.com --port 10020 app23892089
#
# { \"_id\" : ObjectId(\"538077cb4b689e4453000001\"), \"priority\" : 0, \"attempts\" : 0, \"queue\" : null, \"handler\" : \"--- !ruby/object:Delayed::PerformableMethod\nobject: !ruby/object:AsyncTask {}\nmethod_name: :setcache_without_delay\nargs:\n- filter: 'on'\n  conflicts: 'on'\n  countries: 'on'\n  companies: 'on'\n  ifis: 'on'\n  commodities: 'on'\n  categories: 'on'\n\", \"run_at\" : ISODate(\"2014-05-24T10:43:23.115Z\"), \"updated_at\" : ISODate(\"2014-05-24T10:43:23.115Z\"), \"created_at\" : ISODate(\"2014-05-24T10:43:23.115Z\") }
