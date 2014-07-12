class Migrate < ActiveRecord::Migration
  def self.up
    create_table :delayed_jobs, :force => true do |table|
      table.integer :priority, :default => 0
      table.integer :attempts, :default => 0
      table.text :handler
      table.text :last_error
      table.datetime :run_at
      table.datetime :locked_at
      table.datetime :failed_at
      table.string :locked_by
      table.string :queue
      table.timestamps
    end
  end
end
