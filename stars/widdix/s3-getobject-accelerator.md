---
repo: widdix/s3-getobject-accelerator
url: 'https://github.com/widdix/s3-getobject-accelerator'
homepage: ''
starredAt: '2023-04-28T21:52:50Z'
createdAt: '2023-03-21T07:58:41Z'
updatedAt: '2025-02-24T08:03:29Z'
language: JavaScript
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:51.621Z'
description: >-
  Get large objects from S3 by using parallel byte-rangefetches/parts to improve
  performance.
tags:
  - aws
  - aws-nodejs
  - aws-s3
---

# S3 GetObject Accelerator

Get large objects from S3 by using parallel byte-range fetches/parts without the AWS SDK to improve performance.

> We measured a troughoput of 6.5 Gbit/s on an m5zn.6xlarge in eu-west-1 using this lib with this settings: `{concurrency: 64}`.

## Installation

```bash
npm i s3-getobject-accelerator
```

## Examples

### Compact

```js
const {createWriteStream} = require('node:fs');
const {pipeline} = require('node:stream');
const {download} = require('s3-getobject-accelerator');

pipeline(
  download({bucket: 'bucket', key: 'key', version: 'optional version'}, {partSizeInMegabytes: 8, concurrency: 4}).readStream(),
  createWriteStream('/tmp/test'),
  (err) => {
    if (err) {
      console.error('something went wrong', err);
    } else {
      console.log('done');
    }
  }
);
```

### More verbose

Get insights into the part downloads and write to file directly without stream if it is smaller than 1 TiB:

```js
const {download} = require('s3-getobject-accelerator');

const d = download({bucket: 'bucket', key: 'key', version: 'optional version'}, {partSizeInMegabytes: 8, concurrency: 4});

d.on('part:downloading', ({partNo}) => {
  console.log('start downloading part', partNo);
});
d.on('part:downloaded', ({partNo}) => {
  console.log('part downloaded, write to disk next in correct order', partNo);
});
d.on('part:writing', ({partNo}) => {
  console.log('start writing part to disk', partNo);
});
d.on('part:done', ({partNo}) => {
  console.log('part written to disk', partNo);
});

d.meta((err, metadata) => {
  if (err) {
    console.error('something went wrong', err);
  } else {
    if (metadata.lengthInBytes > 1024 * 1024 * 1024 * 1024) {
      console.error('file is larger than 1 TiB');
    } else {
      d.file('/tmp/test', (err) => {
        if (err) {
          console.error('something went wrong', err);
        } else {
          console.log('done');
        }
      });
    }
  }
});
```

## API

### download(s3source, options)

* `s3source` `<Object>`
  * `bucket` `<string>`
  * `key` `<string>`
  * `version` `<string>` (optional)
* `options` `<Object>`
  * `partSizeInMegabytes` `<number>` (optional, defaults to uploaded part size)
  * `concurrency` `<number>`
  * `requestTimeoutInMilliseconds` `<number>` Maxium time for a request to complete from start to finish (optional, defaults to 300,000, 0 := no timeout)
  * `resolveTimeoutInMilliseconds` `<number>` Maximum time for a DNS query to resolve (optional, defaults to 3,000, 0 := no timeout)
  * `connectionTimeoutInMilliseconds` `<number>` Maximum time for a socket to connect (optional, defaults to 3,000, 0 := no timeout)
  * `readTimeoutInMilliseconds` `<number>` Maxium time to read the response body (optional, defaults to 300,000, 0 := no timeout)
  * `dataTimeoutInMilliseconds` `<number>` Maxium time between two data events while reading the response body (optional, defaults to 3,000, 0 := no timeout)
  * `writeTimeoutInMilliseconds` `<number>` Maxium time to write the request body (optional, defaults to 300,000, 0 := no timeout)
  * `v2AwsSdkCredentials` `<AWS.Credentials>` (optional)
  * `endpointHostname` `<string>` (optional, defaults to s3.${region}.amazonaws.com)
  * `agent` `<https.Agent>` (optional)
* Returns:
  * `meta(cb)` `<Function>` Get meta-data before starting the download (downloads the first part and keeps the body in memory until download starts)
    * `cb(err, metadata)` `<Function>`
      * `err` `<Error>`
      * `metadata` `<Object>`
        * `lengthInBytes` `<number>`
        * `parts` `<number>` Number of parts available (optional)
  * `readStream()` `<Function>` Start download
    * Returns: [ReadStream](https://nodejs.org/api/stream.html#class-streamreadable)
  * `file(path, cb)` `<Function>` Start download
    * `path` `<string>`
    * `cb(err)` `<Function>`
      * `err` `<Error>`
  * `abort([err])` `<Function>` Abort download
    * `err` `<Error>`
  * `partsDownloading()` `<Function>` Number of parts downloading at the moment
    * Returns `<number>`
  * `addListener(eventName, listener)` See https://nodejs.org/api/events.html#emitteraddlistenereventname-listener
  * `off(eventName, listener)` See https://nodejs.org/api/events.html#emitteroffeventname-listener
  * `on(eventName, listener)` See https://nodejs.org/api/events.html#emitteroneventname-listener
  * `once(eventName, listener)` See https://nodejs.org/api/events.html#emitteronceeventname-listener
  * `removeListener(eventName, listener)` See https://nodejs.org/api/events.html#emitterremovelistenereventname-listener 

## AWS credentials & region

AWS credentials are fetched in the following order:

1. `options.v2AwsSdkCredentials`
2. Environment variables
  * `AWS_ACCESS_KEY_ID`
  * `AWS_SECRET_ACCESS_KEY`
  * `AWS_SESSION_TOKEN` (optional)
3. IMDSv2

AWS region is fetched in the following order:

1. Environment variable `AWS_REGION`
2. IMDSv2

## Considerations

* Typical sizes `partSizeInMegabytes` are 8 MB or 16 MB. If objects are uploaded using a multipart upload, it’s a good practice to download them in the same part sizes ( do not specify `partSizeInMegabytes`), or at least aligned to part boundaries, for best performance (see https://docs.aws.amazon.com/whitepapers/latest/s3-optimizing-performance-best-practices/use-byte-range-fetches.html).
* Keep in mind that you pay per GET request to Amazon S3. The smaller the parts, the more expensive a download is.
