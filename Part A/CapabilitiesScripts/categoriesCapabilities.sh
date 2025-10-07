#!/usr/bin/env bash
set -e
BASE=http://localhost:4567
curl -s $BASE/categories | jq .
CID=$(curl -s -X POST $BASE/categories -H "Content-Type: application/json" \
  -d '{"title":"School","description":"Assignments"}' | jq -r '.id')
curl -s -X PUT $BASE/categories/$CID -H "Content-Type: application/json" \
  -d '{"title":"School","description":"Updated assignments"}' | jq .
curl -s -X DELETE $BASE/categories/$CID -i
