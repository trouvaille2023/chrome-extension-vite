#!/bin/bash

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat ../package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

zipPath="../zips/martin_${PACKAGE_VERSION}.zip"

echo $zipPath

npm run build

rm -rf zips/*

cd crx

zip -r -D $zipPath *
