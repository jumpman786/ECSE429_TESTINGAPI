#!/usr/bin/env bash
set -e
BASE=http://localhost:4567
curl -s $BASE/todos | jq .
ID=$(curl -s -X POST $BASE/todos -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","doneStatus":false,"description":"milk, eggs"}' | jq -r '.id')
curl -s $BASE/todos/$ID | jq .
curl -s -X PUT $BASE/todos/$ID -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries (updated)","doneStatus":true}' | jq .
curl -s -X DELETE $BASE/todos/$ID -i
