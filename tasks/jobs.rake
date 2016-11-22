task :environment do
  require File.expand_path(File.join(File.dirname(__FILE__), '..', 'config', 'boot.rb'))
  require File.expand_path(File.join(File.dirname(__FILE__), '..', 'lib', 'async.rb'))
end
 
namespace :jobs do
  desc "Clear the delayed_job queue."
  task :clear => :environment do
    Delayed::Job.delete_all
  end
 
  desc 'delayed_job worker process'
  task :work => :environment do
    Delayed::Worker.new(:min_priority => 0).start
  end

end
