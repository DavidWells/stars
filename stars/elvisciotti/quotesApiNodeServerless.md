---
repo: elvisciotti/quotesApiNodeServerless
url: 'https://github.com/elvisciotti/quotesApiNodeServerless'
homepage: ''
starredAt: '2024-02-20T01:41:52Z'
createdAt: '2020-09-06T10:42:07Z'
updatedAt: '2024-02-20T01:41:52Z'
language: JavaScript
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:35.502Z'
description: 'AWS lambda + SQLITE3 endpoint returning quotes from CSV files '
tags: []
---

# Quotes Api - Node.JS + SQLite on AWS lambda

RESTful endpoint to get quotes

Tech stack
* Node.js 12, Express.js
* SQLIte 3
* AWS lambda (Serverless)
* Docker

See the [detailed article](https://medium.com/@elvisciotti/how-to-create-a-serverless-microservice-node-js-sqlite-44888abb3847) I wrote on medium.com 

# Endpoints

    curl -s "http://localhost:3001/tags" | python -m json.tool
    [
        "age",
        "alone",
        "amazing",
        ...
    ]    
    
    curl -s "/quotes?limit=2&tag=age" | python -m json.tool
    [
        {
            "author": "Clive Owen",
            "quote": "If you explode onto the scene at a very young age, there are so many people pulling you in different directions. It takes time to recalibrate and see what's important.",
            "tag": "age"
        },
        {
            "author": "Cindy Crawford",
            "quote": "The face you have at age 25 is the face God gave you, but the face you have after 50 is the face you earned.",
            "tag": "age"
        }
    ]

# Local run
    docker-compose up --build

`db/quotes.db` will be created based on CSV files

test with
 
    `curl http://localhost:3001/tags`

# tests

    npm test
 

# Deploy (AWS)

    sls deploy

# Troubleshooting
 * internal server error:
   [invoke](https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1) from Amazon, and the error log will show the details
