---
repo: tolustar/curl-to-json-object
url: 'https://github.com/tolustar/curl-to-json-object'
homepage: null
starredAt: '2023-01-11T20:10:29Z'
createdAt: '2021-03-19T09:51:12Z'
updatedAt: '2023-07-15T19:59:14Z'
language: JavaScript
license: NA
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:59.011Z'
description: null
tags: []
---

## Curl to Json

**curl-to-json** converts **curl** requests to **JSON** requests

### Example

##### Curl

    curl -X POST -H "Content-Type: application/json" \
    -H 'Accept-Encoding: gzip, deflate' \
    -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \
    -d '{"name": "tolustar", "email": "info@tolustar.com", "message": "Hello I am Tolu"}' \
    https://tolustar/contact

##### Json

    {
      header: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.8,da;q=0.6'
      },
      method: 'POST',
      url: 'https://tolustar/contact',
      data: {
        name: 'tolustar',
        email: 'info@tolustar.com',
        message: 'Hello I am Tolu'
      }
    }

### Usage

```
npm install curl-to-json-object
```

    const curl_to_json = require('curl-to-json-object')

    const curl_request = 'curl -X POST -H "Content-Type: application/json" \ -H 'Accept-Encoding: gzip, deflate' \ -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \ -d '{"name": "tolustar", "email": "info@tolustar.com", "message": "Hello I am Tolu"}' \ https://tolustar/contact'

    console.log( curl_to_json(curl_request) )

<hr>

**Author**
https://tolustar.com
