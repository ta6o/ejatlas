#!/bin/bash
echo "PGPASSWORD=***REMOVED***"
for entry in $(cat tables.txt)
do
antry='/Users/yakup/git/conflict/misc/dbtools/tables/'$(echo $entry)'.csv'
if [ -f $(echo $antry) ];
then
psql conflict -c "COPY "$(echo $entry)" FROM '"$antry"' DELIMITERS ',' CSV HEADER"
echo $entry
fi
done
