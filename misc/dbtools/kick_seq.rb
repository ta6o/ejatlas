class KickSequence < ActiveRecord::Migration
    def up
        ["c_categories", "c_companies", "c_conflict_events", "c_env_impacts", "c_government_actors", "c_hlt_impacts", "c_justice_parties", "c_mobilizing_forms", "c_mobilizing_groups", "c_products", "c_sec_impacts", "c_supporters", "c_types", "companies", "conflicts", "government_actors", "justice_parties", "supporters", "versions"].each do |table_name|
          connection.execute(%q{
              select setval('}+table_name+%q{_id_seq', max(id))
              from }+table_name+%q{
          })
          puts table_name
      end
    end
    def down
        raise ActiveRecord::IrreversibleMigration
    end
end
