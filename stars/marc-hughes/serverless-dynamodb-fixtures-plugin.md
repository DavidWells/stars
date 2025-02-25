---
repo: marc-hughes/serverless-dynamodb-fixtures-plugin
url: 'https://github.com/marc-hughes/serverless-dynamodb-fixtures-plugin'
homepage: ''
starredAt: '2016-12-03T21:21:25Z'
createdAt: '2016-06-24T01:14:16Z'
updatedAt: '2016-12-03T21:21:25Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:52.457Z'
description: Plugin for serverless to load custom static data into dynamodb
tags: []
---

# serverless-dynamodb-fixtures-plugin

This is a plugin for [Serverless](http://serverless.com/)

It will help you load up some static data into your DynamoDB tables.

Useful for either canned data or to provide consistent test-data across environments.

## Installation

> npm install serverless-dynamodb-fixtures-plugin --save

Then add serverless-dynamodb-fixtures-plugin to your plugins array in s-project.json

````
  "plugins": [
    "serverless-dynamodb-fixtures-plugin"
  ]

````


## Usage

Create a **fixtures** directory in the root of your project.  Populate it with json files of the format:

````
{
    "tableName": YOURTABLENAME, 
    "entries":[
        ENTRIES TO ADD
    ]
}
````


Here's an example with some data in it.


````
{
  "tableName": "${SERVERLESS_STAGE}-${SERVERLESS_PROJECT}-car", 
  "entries":[
    {"id":"test-car-1", "make":"Subaru Forrester", "mileage":32000, "year":2010},
    {
      "id":"test-car-2",
      "make":"Audi TT",
      "mileage":132000,
      "year":2004,
      "previous_owner": {
        "name": "Marc",
        "comments": [
          "Was fun to drive.",
          "Never in an accident"
        ]
      }

    },
    {"id":"test-car-3", "make":"Ford Mustang", "mileage":57021, "year":2016},
    {"id":"test-car-4", "make":"Delorean", "mileage":2000000, "year":1986},
    {"id":"test-car-5", "make":"Intentionally Missing Mileage", "year":2010},
    {"id":"test-car-${SERVERLESS_STAGE}", "make":"Intentionally Missing Mileage", "year":2010}
  ]
}
````

Then run:

> sls dynamoddb load

You should see something like this:

````
Serverless: Loading fixtures to stage "dev" in region "us-east-1"...  
Serverless: Loading fixtures/cars.json  
Serverless: Writing 6 entries  
Serverless: Loading fixtures/cars2.json  
Serverless: Writing 25 entries  
Serverless: Writing 21 entries  
````

If it starts taking a long time, you're probably hitting your write throughput limit, just wait and it should finish.

Optionally specify stage and/or region

**NOTE:** This uses a dynamoDB batch write operation which completely overwrites the items specified.  If you have records
with the same keys, they will be overwritten.  If you have properties in your existing data that don't exist in the 
JSON, they will be lost.


## Limitations

Right now, only the variables SERVERLESS_STAGE, SERVERLESS_REGION, and SERVERLESS_PROJECT can be used within the json.
