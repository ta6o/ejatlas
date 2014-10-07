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


ActiveRecord::Base.configurations[:production] = {
  adapter:      'postgresql',
  host:         '178.62.205.134',
  username:     'root',
  port:         '5432',
  password:     '***REMOVED***',
  database:     'ejatlas',
  encoding:     'utf8',
  pool:         ENV['DB_POOL'] || 6,
  connections:  ENV['DB_CONNECTIONS'] || 20,
  reaping_frequency: ENV['DB_REAP_FREQ'] || 10
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
