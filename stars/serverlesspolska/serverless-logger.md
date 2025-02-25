---
repo: serverlesspolska/serverless-logger
url: 'https://github.com/serverlesspolska/serverless-logger'
homepage: null
starredAt: '2021-05-21T17:26:01Z'
createdAt: '2021-04-26T15:00:56Z'
updatedAt: '2024-09-16T03:55:36Z'
language: JavaScript
license: MIT
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:38.844Z'
description: Simple logger for Lambda functions
tags: []
---

# serverless-logger
Simple logger for AWS Lambda functions that has two cool features:
* display filename as a prefix in each log message
* hide log messages when running tests but keep log messages when used in Lambda.

# Version 2.0.0 - breaking changes
Version 2.0.0 is using ES modules and introduces breaking changes!

It was tested with Node.js version 20.
## How to use?
Install it using `npm`:
```
npm i serverless-logger
```
Initialize it like that. Don't forget about `import.meta.url`. Always use `import.meta.url` as a parameter value. It provides the "file:" URL of your module (file).
```JavaScript
import { createLogger } from 'serverless-logger'

const log = createLogger(import.meta.url);
```
Next you can use the `log` function in your code in the same way as ordinary `console.log()`. Similarly, it takes one or more parameters.

For example you could use it in a Lambda function like that:
```JavaScript
import { createLogger } from 'serverless-logger'

const log = createLogger(import.meta.url);

export const handler = async (event) => {
  log('Starting Lambda function')
  /*   do your thing here  */
  log('Lambda function finished')
}
```

Your log messages (which are stored in Cloudwatch) will include name of the file from which they originate. For example, given that your code is divided to several files:
![](documentation/logs.png)
Underneath it uses regular `console.log()` and was tested with `jest`.
## DEBUG mode
If you want to see logs when running tests on your local machines just set environment variable `DEBUG` to value `ON`. For example:
```
DEBUG=ON npm run test
```
# Why use it?
This approach streamlines debugging and makes it easier to figure out how the code works.

At the same time when running tests locally logs don't clutter our console.



# Why no levels?
Usually there are different levels of logs i.e `debug`, `info`, `warn`, `error`. They make sense in huge code projects. 

However, after years of working with Lambda I found that for most projects that *don't handle huge volumes* of transactions they are pure *overkill*.

In order to constrain CloudWatch costs I prefer to set log retention period for several weeks instead of dealing with different log levels. This approach also makes code easier to read.
