#!/bin/bash
for entry in $(cat tables.txt)
do
antry='./tables/'$(echo $entry)'.csv'
psql conflict -c "COPY "$(echo $entry)" TO stdout DELIMITER ',' CSV HEADER" > $(echo $antry)
echo $entry
done
