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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_roles", force: :cascade do |t|
    t.integer "account_id"
    t.integer "role_id"
  end

  create_table "accounts", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "surname", limit: 255
    t.string "email", limit: 255
    t.string "organization", limit: 255
    t.text "address"
    t.string "crypted_password", limit: 255
    t.string "role", limit: 255
    t.string "phone", limit: 20
    t.boolean "approved"
    t.boolean "confirmed"
    t.boolean "public"
    t.text "intention"
    t.text "comments"
    t.text "source"
  end

  create_table "c_categories", id: :serial, force: :cascade do |t|
    t.integer "category_id"
    t.integer "conflict_id"
  end

  create_table "c_companies", id: :serial, force: :cascade do |t|
    t.integer "company_id"
    t.integer "conflict_id"
    t.text "involvement"
  end

  create_table "c_conflict_events", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "conflict_event_id"
  end

  create_table "c_env_impacts", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "env_impact_id"
    t.boolean "visible"
  end

  create_table "c_government_actors", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "government_actor_id"
  end

  create_table "c_hlt_impacts", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "hlt_impact_id"
    t.boolean "visible"
  end

  create_table "c_justice_parties", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "justice_party_id"
  end

  create_table "c_legislations", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "legislation_id"
    t.text "notes"
  end

  create_table "c_mobilizing_forms", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "mobilizing_form_id"
  end

  create_table "c_mobilizing_groups", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "mobilizing_group_id"
  end

  create_table "c_products", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "product_id"
  end

  create_table "c_project_statuses", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "project_status_id"
  end

  create_table "c_sec_impacts", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "sec_impact_id"
    t.boolean "visible"
  end

  create_table "c_supporters", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "supporter_id"
    t.text "involvement"
  end

  create_table "c_tags", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "tag_id"
  end

  create_table "c_types", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "type_id"
    t.integer "ordering"
  end

  create_table "c_weblinks", id: :serial, force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "weblink_id"
    t.text "notes"
  end

  create_table "cacheds", id: :serial, force: :cascade do |t|
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "countries"
    t.text "companies"
    t.text "commodities"
    t.text "types"
    t.text "filterdata"
    t.text "supporters"
    t.datetime "updated_at"
    t.string "locale", limit: 3
    t.text "featureds"
  end

  create_table "categories", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
  end

  create_table "companies", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
    t.string "url", limit: 255
    t.string "acronym", limit: 255
    t.string "logo_image", limit: 255
    t.integer "country_id"
    t.text "other_products"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
    t.text "local_names"
  end

  create_table "conflict_accounts", force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "conflict_events", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "conflict_messages", force: :cascade do |t|
    t.integer "conflict_id"
    t.integer "account_id"
    t.text "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "conflict_relations", id: false, force: :cascade do |t|
    t.serial "id", null: false
    t.integer "to_id", null: false
    t.integer "from_id", null: false
  end

  create_table "conflict_locale_suggestions", force: :cascade do |t|
    t.integer  "conflict_text_id"
    t.integer  "account_id"
    t.string   "locale", limit: 3
    t.timestamps
  end

  create_table "conflict_texts", force: :cascade do |t|
    t.integer  "conflict_id"
    t.string   "locale", limit: 3
    t.string   "name"
    t.string   "slug"
    t.string   "site"
    t.string   "province"
    t.string   "project_area"
    t.string   "project_length"
    t.text     "other_types"
    t.text     "description"
    t.text     "other_products"
    t.text     "project_details"
    t.string   "investment_string"
    t.string   "affected_people"
    t.text     "other_supporters"
    t.string   "related_conflict_string"
    t.text     "other_mobilizing_groups"
    t.text     "other_mobilizing_forms"
    t.text     "other_env_impacts"
    t.text     "other_hlt_impacts"
    t.text     "other_sec_impacts"
    t.text     "other_outcomes"
    t.text     "suggested_alternatives"
    t.text     "success_reason"
    t.text     "other_comments"
    t.text     "table"
    t.text     "ejos"
    t.text     "govt_actors"
    t.text     "features"
    t.text     "notes"
    t.string   "headline"
    t.string   "contributor"
    t.string   "translator"
    t.string   "approval_status", limit: 8
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "modified_at"
  end

  create_table "conflicts", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.string "lon", limit: 255
    t.string "lat", limit: 255
    t.integer "accuracy_level"
    t.integer "population_type"
    t.integer "category_id"
    t.bigint "investment_sum"
    t.bigint "affected_min"
    t.bigint "affected_max"
    t.integer "status_id"
    t.integer "reaction_id"
    t.integer "related_conflict_id"
    t.date "start_datestamp"
    t.string "start_date", limit: 255
    t.date "end_datestamp"
    t.string "end_date", limit: 255
    t.integer "project_status_id"
    t.integer "success_level"
    t.integer "account_id"
    t.string "approval_status", limit: 255
    t.string "contributor", limit: 255
    t.string "licence", limit: 255
    t.boolean "ready"
    t.integer "formerid"
    t.text "notes"
    t.text "marker"
    t.text "json"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "modified_at"
    t.datetime "saved_at"
    t.boolean "general"
    t.boolean "commented"
  end

  create_table "contact_people", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.text "description"
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.string "flag_image", limit: 255
    t.text "description"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
    t.integer "region_id"
    t.text "companies_marker"
    t.text "companies_json"
    t.text "companies_link"
    t.text "supporters_marker"
    t.text "supporters_json"
    t.text "supporters_link"
    t.integer "iso_numeric"
    t.string "capital", limit: 255
  end

  create_table "delayed_jobs", id: :serial, force: :cascade do |t|
    t.integer "priority", default: 0
    t.integer "attempts", default: 0
    t.text "handler"
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by", limit: 255
    t.string "queue", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", id: :serial, force: :cascade do |t|
    t.string "file", limit: 255
    t.string "title", limit: 255
    t.text "description"
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "copied?"
    t.string "locale", limit: 3
    t.integer "pid"
  end

  create_table "env_impacts", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "f_tags", id: false, force: :cascade do |t|
    t.serial "id", null: false
    t.integer "featured_id"
    t.integer "tag_id"
  end

  create_table "featureds", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.string "slogan", limit: 255
    t.string "image", limit: 255
    t.text "description"
    t.text "filter"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
    t.text "features"
    t.text "baselayers"
    t.string "color", limit: 6
    t.boolean "published"
    t.string "headline", limit: 255
    t.integer "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "viewport", limit: 24
  end

  create_table "filters", id: false, force: :cascade do |t|
    t.serial "id", null: false
    t.string "uid", limit: 6
    t.string "name", limit: 255
    t.text "query"
    t.integer "account_id"
    t.boolean "public"
    t.text "description"
    t.integer "result_length"
  end

  create_table "former_infos", force: :cascade do |t|
    t.integer "former_id"
    t.string "former_db", limit: 12
    t.string "attachable_type", limit: 32
    t.integer "attachable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "government_actors", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "hlt_impacts", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "images", id: :serial, force: :cascade do |t|
    t.string "file", limit: 255
    t.string "title", limit: 255
    t.text "description"
    t.string "credit", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "attachable_id"
    t.string "attachable_type", limit: 255
    t.integer "prime"
    t.string "locale", limit: 3
    t.integer "pid"
  end

  create_table "justice_parties", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
    t.string "url", limit: 255
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
  end

  create_table "legislations", id: :serial, force: :cascade do |t|
    t.text "description"
    t.string "url", limit: 255
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "locale", limit: 3
    t.integer "pid"
  end

  create_table "medialinks", id: :serial, force: :cascade do |t|
    t.text "description"
    t.string "url", limit: 255
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "locale", limit: 3
    t.integer "pid"
  end

  create_table "mobilizing_forms", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "mobilizing_groups", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "old_slugs", id: false, force: :cascade do |t|
    t.serial "id", null: false
    t.string "name", limit: 255
    t.string "attachable_type", limit: 255
    t.integer "attachable_id"
  end

  create_table "p_companies", id: :serial, force: :cascade do |t|
    t.integer "company_id"
    t.integer "product_id"
  end

  create_table "products", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
    t.text "main_producers"
    t.string "global_production", limit: 255
    t.string "price", limit: 255
    t.integer "type"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
  end

  create_table "project_statuses", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.integer "conflict_id"
  end

  create_table "provinces", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.decimal "lat"
    t.decimal "lon"
  end

  create_table "reactions", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "references", id: :serial, force: :cascade do |t|
    t.text "description"
    t.string "url", limit: 255
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "locale", limit: 3
    t.integer "pid"
  end

  create_table "regions", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
    t.text "companies_marker"
    t.text "companies_json"
    t.text "companies_link"
    t.text "supporters_marker"
    t.text "supporters_json"
    t.text "supporters_link"
  end

  create_table "requests", id: :serial, force: :cascade do |t|
    t.text "description"
    t.integer "requester_id"
    t.integer "requested_id"
    t.integer "conflict_id"
    t.boolean "accepted"
    t.boolean "rejected"
    t.text "rejection_note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name", limit: 32
    t.string "description", limit: 255
  end

  create_table "sec_impacts", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "statuses", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
  end

  create_table "supporters", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.string "acronym", limit: 255
    t.string "url", limit: 255
    t.integer "country_id"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
    t.text "description"
    t.text "local_names"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
    t.string "domain", limit: 255
  end

  create_table "types", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "description"
    t.integer "category_id"
    t.text "conflicts_marker"
    t.text "conflicts_json"
    t.text "conflicts_link"
  end

  create_table "geo_layer", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text   "description"
    t.string "url", limit: 255
    t.string "bbox", limit: 255
    t.text   "style"
    t.text   "attributes_available"
    t.text   "attributes_omitted"
    t.string "layer_type", :limit: 6
    t.string "srs", :limit: 32
    t.string "icon", limit: 255
    t.string "id_column", limit: 255
  end

  create_table "geo_layer_attachable", id: :serial, force: :cascade do |t|
    t.integer "geo_layer_id"
    t.string  "attachable_type", limit: 255
    t.integer "attachable_id"
    t.text    "attributes_omitted"
    t.integer "shown"
    t.boolean "clickable"
    t.integer "rank"
  end

  create_table "vector_data", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "url", limit: 255
    t.string "source", limit: 255
    t.text "description"
    t.string "attachable_type", limit: 255
    t.integer "attachable_id"
    t.text "choropleth"
    t.integer "vector_style_id"
    t.string "style", limit: 255
    t.integer "shown"
    t.string "status", limit: 255
    t.string "link", limit: 255
    t.integer "account_id"
    t.integer "rank"
    t.boolean "clickable"
    t.string "geometry_type", limit: 12
  end

  create_table "vector_styles", id: false, force: :cascade do |t|
    t.serial "id", null: false
    t.string "stroke_color", limit: 255
    t.string "fill_color", limit: 255
    t.string "weight", limit: 3
    t.string "stroke_opacity", limit: 5
    t.string "fill_opacity", limit: 5
    t.string "dash_array", limit: 255
    t.string "name", limit: 255
    t.string "slug", limit: 255
    t.text "defs"
  end

  create_table "videos", id: :serial, force: :cascade do |t|
    t.integer "source"
    t.string "uid", limit: 255
    t.string "title", limit: 255
    t.text "description"
    t.string "credit", limit: 255
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weblinks", id: :serial, force: :cascade do |t|
    t.text "description"
    t.string "url", limit: 255
    t.integer "conflict_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "locale", limit: 3
    t.integer "pid"
  end

end
