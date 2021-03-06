# Defines our constants
RACK_ENV  = ENV["RACK_ENV"] ||= ENV["RACK_ENV"] ||= "development"  unless defined?(RACK_ENV)
PADRINO_ROOT = File.expand_path('../..', __FILE__) unless defined?(PADRINO_ROOT)
ENV["SINATRA_ACTIVESUPPORT_WARNING"] = "false"

# Load our dependencies
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
Bundler.require(:default, RACK_ENV)

Padrino::Logger::Config[:development] = { :log_level => :warn, :stream => :stdout }

Padrino.before_load do
  #I18n.locale = :de
end

Padrino.after_load do
end

Padrino.load!
