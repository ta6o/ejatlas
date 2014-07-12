web: bundle exec thin start -p $PORT -e $RACK_ENV
job: bundle exec padrino rake jobs:work
clock: bundle exec clockwork lib/cron.rb
