# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 1) do

  create_table "accounts", :force => true do |t|
    t.string  "name"
    t.string  "surname"
    t.string  "email"
    t.string  "organization"
    t.text    "address"
    t.string  "crypted_password"
    t.string  "role"
    t.string  "phone",            :limit => 20
    t.boolean "approved"
    t.boolean "public"
    t.text    "source"
    t.text    "intention"
    t.text    "comments"
  end

  create_table "c_categories", :force => true do |t|
    t.integer "category_id"
    t.integer "conflict_id"
  end

  create_table "c_companies", :force => true do |t|
    t.integer "company_id"
    t.integer "conflict_id"
    t.text    "involvement"
  end

  create_table "c_conflict_events", :force => true do |t|
    t.integer "conflict_id"
    t.integer "conflict_event_id"
  end

  create_table "c_env_impacts", :force => true do |t|
    t.integer "conflict_id"
    t.integer "env_impact_id"
    t.boolean "visible"
  end

  create_table "c_government_actors", :force => true do |t|
    t.integer "conflict_id"
    t.integer "government_actor_id"
  end

  create_table "c_hlt_impacts", :force => true do |t|
    t.integer "conflict_id"
    t.integer "hlt_impact_id"
    t.boolean "visible"
  end

  create_table "c_justice_parties", :force => true do |t|
    t.integer "conflict_id"
    t.integer "justice_party_id"
  end

  create_table "c_legislations", :force => true do |t|
    t.integer "conflict_id"
    t.integer "legislation_id"
    t.text    "notes"
  end

  create_table "c_mobilizing_forms", :force => true do |t|
    t.integer "conflict_id"
    t.integer "mobilizing_form_id"
  end

  create_table "c_mobilizing_groups", :force => true do |t|
    t.integer "conflict_id"
    t.integer "mobilizing_group_id"
  end

  create_table "c_products", :force => true do |t|
    t.integer "conflict_id"
    t.integer "product_id"
  end

  create_table "c_project_statuses", :force => true do |t|
    t.integer "conflict_id"
    t.integer "project_status_id"
  end

  create_table "c_sec_impacts", :force => true do |t|
    t.integer "conflict_id"
    t.integer "sec_impact_id"
    t.boolean "visible"
  end

  create_table "c_supporters", :force => true do |t|
    t.integer "conflict_id"
    t.integer "supporter_id"
    t.text    "involvement"
  end

  create_table "c_tags", :force => true do |t|
    t.integer "conflict_id"
    t.integer "tag_id"
  end

  create_table "f_tags", :force => true do |t|
    t.integer "featured_id"
    t.integer "tag_id"
  end

  create_table "c_types", :force => true do |t|
    t.integer "conflict_id"
    t.integer "type_id"
    t.integer "ordering"
  end

  create_table "c_weblinks", :force => true do |t|
    t.integer "conflict_id"
    t.integer "weblink_id"
    t.text    "notes"
  end

  create_table "cacheds", :force => true do |t|
    t.text     "conflicts_marker"
    t.text     "conflicts_json"
    t.text     "countries"
    t.text     "companies"
    t.text     "commodities"
    t.text     "types"
    t.text     "filterdata"
    t.text     "supporters"
    t.datetime "updated_at"
  end

  create_table "categories", :force => true do |t|
    t.string "name"
    t.string "slug"
    t.text   "description"
  end

  create_table "murders", :force => true do |t|
    t.string  "name"
    t.text    "description"
    t.date    "murdered_at"
    t.integer "conflict_id"
  end

  create_table "companies", :force => true do |t|
    t.string  "name"
    t.string  "slug"
    t.text    "description"
    t.string  "url"
    t.string  "acronym"
    t.string  "logo_image"
    t.integer "country_id"
    t.text    "other_products"
    t.text    "conflicts_marker"
    t.text    "conflicts_json"
    t.text    "conflicts_link"
  end

  create_table "conflict_accounts", :force => true do |t|
    t.integer "conflict_id"
    t.integer "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "conflict_events", :force => true do |t|
    t.string "name"
  end

  create_table "conflict_messages", :force => true do |t|
    t.integer  "conflict_id"
    t.integer  "account_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "conflict_relations", :id => false, :force => true do |t|
    t.integer "id", :null => false
    t.integer "to_id", :null => false
    t.integer "from_id", :null => false
  end

  create_table "conflicts", :force => true do |t|
    t.string   "name"
    t.string   "slug"
    t.integer  "country_id"
    t.string   "site"
    t.string   "province"
    t.string   "lon"
    t.string   "lat"
    t.integer  "accuracy_level"
    t.string   "project_area"
    t.string   "project_length"
    t.integer  "population_type"
    t.integer  "category_id"
    t.text     "other_types"
    t.text     "description"
    t.text     "other_products"
    t.text     "project_details"
    t.integer  "investment_sum",          :limit => 8
    t.string   "investment_string"
    t.string   "affected_people"
    t.integer  "affected_min",            :limit => 8
    t.integer  "affected_max",            :limit => 8
    t.text     "other_supporters"
    t.integer  "status_id"
    t.integer  "reaction_id"
    t.string   "related_conflict_string"
    t.integer  "related_conflict_id"
    t.date     "start_datestamp"
    t.string   "start_date"
    t.date     "end_datestamp"
    t.string   "end_date"
    t.text     "other_mobilizing_groups"
    t.text     "other_mobilizing_forms"
    t.text     "other_env_impacts"
    t.text     "other_hlt_impacts"
    t.text     "other_sec_impacts"
    t.integer  "project_status_id"
    t.text     "other_outcomes"
    t.text     "suggested_alternatives"
    t.integer  "success_level"
    t.text     "success_reason"
    t.text     "other_comments"
    t.integer  "account_id"
    t.string   "approval_status"
    t.string   "contributor"
    t.string   "licence"
    t.boolean  "ready"
    t.integer  "formerid"
    t.text     "notes"
    t.text     "marker"
    t.text     "table"
    t.text     "json"
    t.datetime "created_at",                           :null => false
    t.datetime "updated_at",                           :null => false
    t.text     "ejos"
    t.text     "govt_actors"
    t.datetime "modified_at"
    t.text     "features"
    t.string   "headline"
    t.boolean  "general"
    t.boolean  "commented"
  end

  create_table "contact_people", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "countries", :force => true do |t|
    t.string  "name"
    t.string  "slug"
    t.string  "flag_image"
    t.text    "description"
    t.text    "conflicts_marker"
    t.text    "conflicts_json"
    t.text    "conflicts_link"
    t.integer "region_id"
    t.text    "companies_marker"
    t.text    "companies_json"
    t.text    "companies_link"
    t.text    "supporters_marker"
    t.text    "supporters_json"
    t.text    "supporters_link"
    t.integer "iso_numeric"
    t.string  "capital"
  end

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0
    t.integer  "attempts",   :default => 0
    t.text     "handler"
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "documents", :force => true do |t|
    t.string   "file"
    t.string   "title"
    t.text     "description"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "env_impacts", :force => true do |t|
    t.string "name"
  end

  create_table "featureds", :force => true do |t|
    t.string "name"
    t.string "slug"
    t.string "slogan"
    t.string "image"
    t.text   "description"
    t.text   "filter"
    t.text   "conflicts_marker"
    t.text   "conflicts_json"
    t.text   "conflicts_link"
    t.text   "features"
    t.text   "basemaps"
    t.string "color", :limit=>6
    t.boolean "published"
    t.string   "headline"
    t.integer "account_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "viewport"
  end

  create_table "filters", :force => true do |t|
    t.string  "uid", :limit=>6
    t.string  "name"
    t.text    "query"
    t.integer "account_id"
    t.text    "description"
    t.text    "query_json"
    t.text    "query_html"
    t.boolean "public", :default => true
  end

  create_table "government_actors", :force => true do |t|
    t.string "name"
  end

  create_table "hlt_impacts", :force => true do |t|
    t.string "name"
  end

  create_table "images", :force => true do |t|
    t.string   "file"
    t.string   "title"
    t.text     "description"
    t.string   "credit"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "attachable_id"
    t.string   "attachable_type"
    t.integer  "prime"
  end

  create_table "justice_parties", :force => true do |t|
    t.string "name"
    t.string "slug"
    t.text   "description"
    t.string "url"
    t.text   "conflicts_marker"
    t.text   "conflicts_json"
    t.text   "conflicts_link"
  end

  create_table "legislations", :force => true do |t|
    t.text     "description"
    t.string   "url"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "medialinks", :force => true do |t|
    t.text     "description"
    t.string   "url"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "mobilizing_forms", :force => true do |t|
    t.string "name"
  end

  create_table "mobilizing_groups", :force => true do |t|
    t.string "name"
  end

  create_table "old_slugs", :force => true do |t|
    t.string "name"
    t.string  "attachable_type"
    t.integer "attachable_id"
  end

  create_table "p_companies", :force => true do |t|
    t.integer "company_id"
    t.integer "product_id"
  end

  create_table "products", :force => true do |t|
    t.string  "name"
    t.string  "slug"
    t.text    "description"
    t.text    "main_producers"
    t.string  "global_production"
    t.string  "price"
    t.integer "type"
    t.text    "conflicts_marker"
    t.text    "conflicts_json"
    t.text    "conflicts_link"
  end

  create_table "project_statuses", :force => true do |t|
    t.string  "name"
    t.integer "conflict_id"
  end

  create_table "provinces", :force => true do |t|
    t.string  "name"
    t.decimal "lat"
    t.decimal "lon"
  end

  create_table "reactions", :force => true do |t|
    t.string "name"
  end

  create_table "references", :force => true do |t|
    t.text     "description"
    t.string   "url"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "regions", :force => true do |t|
    t.string "name"
    t.string "slug"
    t.text   "description"
    t.text   "conflicts_marker"
    t.text   "conflicts_json"
    t.text   "conflicts_link"
    t.text   "companies_marker"
    t.text   "companies_json"
    t.text   "companies_link"
    t.text   "supporters_marker"
    t.text   "supporters_json"
    t.text   "supporters_link"
  end

  create_table "requests", :force => true do |t|
    t.text     "description"
    t.integer  "requester_id"
    t.integer  "requested_id"
    t.integer  "conflict_id"
    t.boolean  "accepted"
    t.boolean  "rejected"
    t.text     "rejection_note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sec_impacts", :force => true do |t|
    t.string "name"
  end

  create_table "statuses", :force => true do |t|
    t.string "name"
  end

  create_table "supporters", :force => true do |t|
    t.string  "name"
    t.string  "slug"
    t.string  "acronym"
    t.string  "url"
    t.integer "country_id"
    t.text    "conflicts_marker"
    t.text    "conflicts_json"
    t.text    "conflicts_link"
    t.text    "description"
  end

  create_table "tags", :force => true do |t|
    t.string "name"
    t.string "slug"
    t.text   "description"
    t.string "domain"
  end

  create_table "types", :force => true do |t|
    t.string  "name"
    t.string  "slug"
    t.text    "description"
    t.integer "category_id"
    t.text    "conflicts_marker"
    t.text    "conflicts_json"
    t.text    "conflicts_link"
  end

  create_table "vector_data", :force => true do |t|
    t.string  "name"
    t.string  "url"
    t.string  "source"
    t.text    "description"
    t.string  "geometry_type"
    t.string  "attachable_type"
    t.integer "attachable_id"
    t.text    "choropleth"
    t.integer "vector_style_id"
    t.string  "style"
    t.integer "shown"
    t.string  "status"
    t.string  "link"
    t.integer "account_id"
    t.integer "rank"
    t.boolean "clickable"
  end

  create_table "vector_styles", :id => false, :force => true do |t|
    t.integer "id",                          :null => false
    t.string  "stroke_color"
    t.string  "fill_color"
    t.string  "weight",         :limit => 3
    t.string  "stroke_opacity", :limit => 5
    t.string  "fill_opacity",   :limit => 5
    t.string  "dash_array"
    t.string  "name"
    t.string  "slug"
    t.text    "defs"
  end

  create_table "videos", :force => true do |t|
    t.integer  "source"
    t.string   "uid"
    t.string   "title"
    t.text     "description"
    t.string   "credit"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "weblinks", :force => true do |t|
    t.text     "description"
    t.string   "url"
    t.integer  "conflict_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

end
