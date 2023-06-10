#!/bin/bash
# reference: https://metamug.com/article/api-integration/postman-to-swagger.html
# take argument input the first argument is the old file and the second argument is the new file
# example: ./update-doc.sh renata-api-docs.v1 .api-docs/renata-api-docs.v1.1

p2o .api-docs/$2.json -f .api-docs/$2.yaml
sed -i "s~.api-docs/$1.yaml~.api-docs/$2.yaml~g" ./src/routes/api-docs/index.js
