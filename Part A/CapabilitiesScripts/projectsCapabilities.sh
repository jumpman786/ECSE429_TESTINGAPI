#!/usr/bin/env bash
set -e
BASE=http://localhost:4567
curl -s $BASE/projects | jq .
PID=$(curl -s -X POST $BASE/projects -H "Content-Type: application/json" \
  -d '{"title":"ECSE429 Project","completed":false}' | jq -r '.id')
curl -s -X PUT $BASE/projects/$PID -H "Content-Type: application/json" \
  -d '{"title":"ECSE429 Project (updated)","completed":true}' | jq .
curl -s -X DELETE $BASE/projects/$PID -i
