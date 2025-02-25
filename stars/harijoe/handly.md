---
repo: harijoe/handly
url: 'https://github.com/harijoe/handly'
homepage: null
starredAt: '2018-12-02T04:56:55Z'
createdAt: '2018-11-19T17:00:27Z'
updatedAt: '2021-01-13T21:17:11Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:00.255Z'
description: A wrapper for serverless handlers to prevent silly mistakes
tags: []
---



# Handly
A wrapper for serverless handlers to prevent silly mistakes, based on [middy](https://github.com/middyjs/middy)

## How to use it ?
Simply wrap your serverless handler like this :
```
import handly from 'handly'

const handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: {
      message: {
        hello: 'world',
      },
    },
  };
};

export default handly(handler)
```

## How does it work ?
Handly wraps useful [middy](https://github.com/middyjs/middy) middlewares as well as other middlewares made by me.

### httpEventNormalizer
Adds `queryStringParameters` and `pathParameters` keys even though there are null to allow code such as to never throw :
```
event.pathParameters.userId
``` 

### httpHeaderNormalizer
Normalize http headers, for example `Content-type` becomes `Content-Type`

### jsonBodyParser
When `Content-Type` is set to `application/json`, this middleware parses the body automatically so that `event.body` becomes an object

### jsonBodyParser
When `Content-Type` is set to `application/json`, this middleware parses the body automatically so that `event.body` becomes an object

### urlEncodeBodyParser
Same as jsonBodyParser for `application/x-www-form-urlencoded`

### failsafe
This one is not a middy middleware but a wrapper which will return a 500 http response when an uncaught exception is thrown.
The default behavior is to return a 200 response…

### normalizedResponse
Not official middy middleware. It automatically calls JSON.stringify on every response body. This is something mandatory with aws.

## Author
Hello, I am [Julien vallini](https://twitter.com/julienvallini), an indie-maker. Follow me on twitter if you like my work.

## License
Handly is [MIT licensed](https://opensource.org/licenses/MIT).
