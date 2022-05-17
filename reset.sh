#!/usr/bin/env bash

rm -f cli/admin.log
for i in {1..4}; do
  echo "- creating test user ${i}..."
  npm run admin --run=addTestUser --id="tu$i"
done

cd cli
mv admin.log aim-users.sh
./aim.sh
