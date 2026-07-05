---
repo: carboneio/tiny-storage-client
url: 'https://github.com/carboneio/tiny-storage-client'
homepage: ''
starredAt: '2023-05-04T17:51:12Z'
createdAt: '2021-06-24T12:26:24Z'
updatedAt: '2024-11-14T06:33:08Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:50.823Z'
description: >-
  Tiny node client to request distributed AWS S3 or the OpenStack Swift Object
  Storage.
tags:
  - aws
  - aws4
  - client
  - distributed
  - file-storage
  - high-availability
  - http
  - node
  - nodejs
  - object-storage
  - openstack-swift
  - ovh-openstack
  - ovhcloud
  - s3
  - sdk
  - storage
---

# Tiny client for distributed S3/Swift storages

![GitHub release (latest by date)](https://img.shields.io/github/v/release/carboneio/tiny-storage-client?style=for-the-badge)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg?style=for-the-badge)](#api-usage)

> High availability, Performances, and Simplicity are the main focus of this tiny Node client to request AWS S3 API or the OpenStack Swift Object Storage API. It was initially made to request OVHCloud, but it can be used for any Server/Cloud provider.

## Highlights

* 🦄 **Simple to use** - Only 10 methods: `uploadFile`, `downloadFile`, `deleteFile`, `listFiles`, `listBuckets`, `headBucket`, `setFileMetadata`, `getFileMetadata`, `deleteFiles` and `request` for custom requests.
* 🚀 **Performances** - Vanilla JS + Only 2 dependencies [rock-req](https://github.com/carboneio/rock-req) as HTTP client and [aws4](https://github.com/mhart/aws4) for signing S3 requests.
* 🌎 **High availability** - Provide one or a list of storages credentials: the SDK will switch storage if something goes wrong (Server/DNS not responding, timeout, error 500, too many redirection, authentication error, and more...). As soon as the main storage is available, the SDK returns to the main storage
* ✨ **Reconnect automatically** - If a request fails due to an authentication token expiration, the SDK fetches a new authentication token and retry the initial request with it (Concerns only Swift Storage).
* ✅ **100% tested** - Production battle-tested against hundreds of TBs of file uploads, downloads and deletes
* 👉 **Convert XML/JSON responses to JS** - XML/JSON responses are automatically converted into `Objects`/`Arrays` (Concerns only: `listFiles`, `listBuckets` and `Errors`).
* 🚩 **Mixing S3 and Swift credentials is not supported** - When initialising the Tiny SDK client, provide only a list of S3 or a list of Swift credentials, switching from one storage system to another is not supported.

## Getting Start

Install and setup in less than 2 minutes:
- [AWS S3 API](./USAGE-S3.md)
- [Open Stack Swift Storage API](./USAGE-SWIFT.md)

## Supported Methods

| Swift API | S3 API | Method            | Description                                                            |
|-------------------------|------------|-------------------|------------------------------------------------------------------------|
| ✅ [example](./USAGE-SWIFT.md#upload-a-file)                    | ✅ [example](./USAGE-S3.md#upload-a-file)         | `uploadFile`      | Upload a file from a Buffer or file absolute path.                     |
| ✅ [example](./USAGE-SWIFT.md#download-a-file)                      | ✅ [example](./USAGE-S3.md#download-a-file)         | `downloadFile`    | Download a file as Buffer or Stream                                    |
| ✅ [example](./USAGE-SWIFT.md#delete-a-file)                      | ✅ [example](./USAGE-S3.md#delete-file)         | `deleteFile`      | Delete a file                                                          |
| ✅ [example](./USAGE-SWIFT.md#delete-files)                      | ✅ [example](./USAGE-S3.md#delete-files)         | `deleteFiles`     | Bulk delete files (1000 max/per request)                               |
| ✅ [example](./USAGE-SWIFT.md#list-objects-from-a-container)                      | ✅ [example](./USAGE-S3.md#list-files)         | `listFiles`       | List files (1000 max/per requests) use query parameters for pagination |
| ✅ [example](./USAGE-SWIFT.md#get-file-metadata)                      | ✅ [example](./USAGE-S3.md#get-file-metadata)         | `getFileMetadata` | Fetch custom metadatas                                                 |
| ✅ [example](./USAGE-SWIFT.md#set-file-metadata)                      | ✅ [example](./USAGE-S3.md#set-file-metadata)         | `setFileMetadata` | Set custom file metadatas                                              |
| ✅  [example](./USAGE-SWIFT.md#head-bucket)                     | ✅ [example](./USAGE-S3.md#head-bucket)         | `headBucket`      | Determine if a bucket exists and you have permission to access it      |
| ✅ [example](./USAGE-SWIFT.md#list-buckets)                      | ✅ [example](./USAGE-S3.md#list-buckets)         | `listBuckets`      | Returns a list of all buckets owned by the authenticated sender of the request. |
| ✅ [example](./USAGE-SWIFT.md#custom-request)                      | ✅  [example](./USAGE-S3.md#custom-requests)        | `request`         | Create custom requests                                                 |
| ✅ [example](./USAGE-SWIFT.md#connection)                      | ❌          | `connection`         | Connection is required only for Openstack Swift Object storage to get a unique auth token                                                 |
| ✅  [example](./USAGE-SWIFT.md#container-alias)                    |  ✅  [example](./USAGE-S3.md#bucket-alias)          | Bucket Alias  | Simplify requests by using bucket alias |


## S3 Example

The following exemple is an initialisation of the SDK client with a list of S3 credentials and a request to download a file.
If something goes wrong when downloading the file, the SDK will switch storage and retry to download with the second credentials.
As soon as the first storage is available, the SDK returns to the main storage

```js
const storageClient = require('tiny-storage-client');

const s3storage = storageClient([{
    accessKeyId    : 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    url            : 's3.gra.io.cloud.ovh.net',
    region         : 'gra'
  },
  {
    accessKeyId    : 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    url            : 's3.eu-west-3.amazonaws.com',
    region         : 'eu-west-3'
  }])

s3storage.downloadFile('bucketName', 'filename.pdf', (err, resp) => {
  if (err) {
    return console.log("Error on download: ", err);
  }
  /**
   * Request reponse:
   * - resp.body => downloaded file as Buffer
   * - resp.headers
   * - resp.statusCode
   */
})
```

## Run tests

Install

```bash
$ npm install
```

To run all the tests:

```bash
$ npm run test
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/carboneio/tiny-storage-client/issues).

## Show your support

Give a ⭐️ if this project helped you!

# Supporters

This packaged in maintained by Carbone:

<p>
  <a href="https://carbone.io" target="_blank" alt="Supporter Carbone.io - Automate the generation of documents with a templating and nocode service">
    <img src="https://raw.githubusercontent.com/carboneio/rock-req/master/doc/carbone-logo.svg" alt="Carbone.io logo" height="60"/>
  </a>
</p>
