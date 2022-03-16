#!/usr/bin/env bash

npm test --run=test/fund-agent.mjs; npm run admin --run=resetAgentTESTNET
#for i in {1..9}; do
#  echo "- creating user ${i}..."
#  npm test --run=test/add-user.mjs
#  sleep 14
#done
#npm test --run=test/set-locations.mjs
