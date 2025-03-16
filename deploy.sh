#!/bin/bash

current_date=$(date +"%Y-%m-%dT%H:%M:%S")
echo $current_date

filename=".env-$current_date"
echo "Backup env file : $filename"
cp .env $filename

function deploy {
  echo ""
  echo "Deploying $1 ..."
  OUTPUT="$(npm run $2)"
  HASH=`sed -n 's/^Contract address \(.*\)/\1/p' <<< $OUTPUT`
  echo "Address for $1 = $HASH"
  sed -i "s/$3=.*/$3=$HASH/" .env
}

deploy INBOX deploy:inbox SPEC_INBOX
deploy OUTBOX deploy:outbox SPEC_OUTBOX
deploy SEQUENCER_INBOX deploy:sequencer-inbox SPEC_SEQUENCER_INBOX
deploy BRIDGE deploy:bridge SPEC_BRIDGE
deploy ROLLUP_EVENT_INBOX deploy:rollup-event-inbox SPEC_ROLLUP_EVENT_INBOX
deploy ROLLUP_USER_LOGIC deploy:rollup-user-logic SPEC_ROLLUP_USER_LOGIC
deploy ROLLUP_ADMIN_LOGIC deploy:rollup-admin-logic SPEC_ROLLUP_ADMIN_LOGIC
deploy ROLLUP_PROXY deploy:rollup-proxy SPEC_ROLLUP_PROXY
deploy BRIDGE_CREATOR deploy:bridge-creator SPEC_BRIDGE_CREATOR

echo "SETTING DATA..."
echo ""
npm test tests/integration/deployment/01-initialize-bridge.js
npm test tests/integration/deployment/02-initialize-proxy.js
npm test tests/integration/deployment/03-sequencer-inbox.js

echo "DONE..."