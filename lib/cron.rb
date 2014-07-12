#require "/app/config/boot.rb"
#require 'clockwork'
#include Clockwork

#every(1.day, 'Storing backup of production DB', :at => '00:00') { Delayed::Job.enqueue BackupDb.new }
