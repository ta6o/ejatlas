# Defines our constants
RACK_ENV  = ENV["RACK_ENV"] ||= ENV["RACK_ENV"] ||= "development"  unless defined?(RACK_ENV)
PADRINO_ROOT = File.expand_path('../..', __FILE__) unless defined?(PADRINO_ROOT)

# Load our dependencies
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
Bundler.require(:default, RACK_ENV)

Padrino::Logger::Config[:development] = { :log_level => :warn, :stream => :stdout }

#Mongoid.load!("config/mongoid.yml")

module Rails
  def self.root
    PADRINO_ROOT
  end
end
Delayed::Worker.destroy_failed_jobs = false

Padrino.before_load do
end

Padrino.after_load do
end

Padrino.load!
