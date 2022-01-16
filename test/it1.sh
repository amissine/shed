#!/usr/bin/env bash

TEST_DIR=$(dirname $0)
ENV_FILE=$TEST_DIR/$(basename $0 | sed -e "s/\.sh/\.env/g")

#. $ENV_FILE
#. turrets/utils.sh

echo "- running $0 with $ENV_FILE..."; echo

# Setup
#cd $SSC_DIR
#$0 $CREATOR1_DIR
#cd - > /dev/null
#npx ttab -w -d $PWD/turrets exec npm run www

# Run the integration test
npm test --run=test/it1-favor-producer1.mjs
npm test --run=test/it1-favor-requestor1.mjs
npm test --run=test/it1-favor-producer2.mjs

# TODO Teardown
