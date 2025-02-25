---
repo: cortezcristian/s3-bucket-toolkit
url: 'https://github.com/cortezcristian/s3-bucket-toolkit'
homepage: 'https://www.npmjs.com/package/s3-bucket-toolkit'
starredAt: '2019-02-20T04:10:16Z'
createdAt: '2018-05-04T14:11:36Z'
updatedAt: '2023-03-08T04:28:44Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:44.684Z'
description: 's3-bucket-toolkit: S3 Bucket Listing and Versioning removal made easy'
tags: []
---

# s3-bucket-toolkit
[![CircleCI](https://circleci.com/gh/cortezcristian/s3-bucket-toolkit/tree/master.svg?style=svg)](https://circleci.com/gh/cortezcristian/s3-bucket-toolkit/tree/master)

S3 Bucket APIs calls made easy

- Provide Promisified AWS API methods
- Use recommended listObjectsV2
- Paginate or list all items from the bucket
- Upload multiple files
- Delete all Versions and Markers from a particular file

## Install

```bash
$ npm i s3-bucket-toolkit --save
```

## Configure

```js
const AWSBucket = require('s3-bucket-toolkit');

const bucket = new AWSBucket({
  accessKeyId: 'your-access-key-here',
  secretAccessKey: 'your-secret-here',
  region: 'us-east-1',
  bucketACL: 'public-read',
  bucketName: 'my-bucket',
  pagingDelay: 500, // (optional) set a global delay in between s3 api calls, default: 500ms
});

```

## Usage

### Get Upload URL

Get upload URL

```js
bucket.getUploadUrl({
  ContentType: 'application/javascript',
  Key: 'your-dir/test.js'
}).then(function(res){
  /* Signed URL => res.signedUrl */
}).catch(function(err){
  /* err */
});

/*
Result:
{
  signedUrl: 'https://your-bucket.s3.amazonaws.com/your-dir/test.js?AWSAccessKeyId=...'
}
*/
```

### Upload File

```js
bucket.uploadFile({
  filePath: './test/upload-test.txt',
  Key: 'upload-test.txt'
}).then(function(res){
  /* res.url => S3 upload url */
}).catch(function(err){
  /* err */
});

/*
 Result:
{ response: { ETag: '"abc.."' },
  url: 'https://my-bucket.s3.amazonaws.com/upload-test.txt' }
*/
```

### Copy File

`copyFile(Object, Boolean)` function can copy files between buckets or in the same bucket. Pass a second parameter as true when copying files inside the same bucket (will automatically append the bucket prefix). Otherwise pass the entire bucket URL.


```js
bucket.copyFile({
  CopySource: 'upload-test.txt',
  Key: 'upload-test-copied.txt'
}, true).then(function(res){
  /* res.url => S3 copy url */
}).catch(function(err){
  /* err */
});

/*
 Result:
{ response: { ETag: '"abc..."', CopySourceVersionId: 'def...', CopyObjectResult: { ... } },
  url: 'https://your-bucket-name.s3.amazonaws.com/upload-test-copied.txt' } }
*/
```

### Upload Multiple Files

```js
bucket.uploadMultipleFiles({
  files: [{
    filePath: './test/upload-test-1.txt',
    Key: 'upload-test-1.txt'
  }, {
    filePath: './test/upload-test-2.txt',
    Key: 'upload-test-2.txt'
  }]
}).then(function(res){
  /* res => Array of file upload status responses */
}).catch(function(err){
  /* err */
});

/*
 Result:
[ { response:
   { ETag: '"abc..."',
     VersionId: '123..' },
  url: 'https://your-bucket.s3.amazonaws.com/upload-test-1.txt' },
{ response:
   { ETag: '"def.."',
     VersionId: '456...' },
  url: 'https://your-bucket.s3.amazonaws.com/upload-test-2.txt' } ]
*/
```

### List Files

```js
bucket.listFiles({
  limit: 2, // items per page by default 1000 (optional)
  delay: 10, // delay between pages by default 500 (optional)
}).then(function(files){
  /* files => array containing all files from the bucket */
}).catch(function(err){
  /* err */
});

/*
Result:
[ { Key: 'upload-test-1.txt',
    LastModified: 2018-05-04T06:49:48.000Z,
    ETag: '"abc..."',
    Size: 44,
    StorageClass: 'STANDARD' },
  { Key: 'upload-test-2.txt',
    LastModified: 2018-05-04T06:49:49.000Z,
    ETag: '"def..."',
    Size: 44,
    StorageClass: 'STANDARD' },
    ...
]
*/
```

### List Paged Files

Pagination, see more parameters [listObjectsV2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property)

```js
bucket.listPagedFiles({
  limit: 2, // optional items per page is a custom implementation of MaxKeys by default 1000
bucket.listFiles().then(function(res){
  /* res.contents => bucket contents */
}).catch(function(err){
  /* err */
});

/*
Result:
{ IsTruncated: false,
  Contents:
   [ { Key: 'upload-test.txt',
       LastModified: 2018-04-15T22:48:27.000Z,
       ETag: '"abc..."',
       Size: 26,
       StorageClass: 'STANDARD' } ],
  Name: 'my-bucket',
  Prefix: '',
  MaxKeys: 1000,
  CommonPrefixes: [],
  KeyCount: 1 }
*/
```


### List File Versions

The param Key is being replaced internally in fovor of Prefix, see the docs [s3.listObjectVersions](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectVersions-property)

```js
bucket.listFileVersions({
  Key: 'upload-test-versioned.txt', // file versioned key or prefix (mandatory)
  limit: 2, // items per page by default 1000 (optional)
  delay: 10, // delay between pages by default 500 (optional)
}).then(function(res){
  /* res.Versions => Versions found */
}).catch(function(err){
  /* err */
});

/*
Result:
{
  Versions:
   [ { ETag: '"abc..."',
       Size: 44,
       StorageClass: 'STANDARD',
       Key: 'upload-test.txt',
       VersionId: 'null',
       IsLatest: true,
       LastModified: 2018-05-02T12:53:29.000Z,
       Owner: [Object] } ],
  DeleteMarkers: []
}
*/
```

### Delete Files

```js
bucket.deleteFiles({
    files: ['upload-test.txt']
  }).then(function(res){
  /* res.Deleted => Deleted contents */
  done();
}).catch(function(err){
  /* err */
});

/*
Result:
{ Deleted: [ { Key: 'upload-test.txt' } ], Errors: [] }
*/
```

### Delete All Versions from a Single File

Delete all versions for a given file

```js
bucket.deleteAllVersions({
  Key: 'upload-test.txt',
}).then(function(res){
  /* res.Deleted => Deleted versions of single file */
  done();
}).catch(function(err){
  /* err */
});

/*
Result:
{ Deleted:
   [ { Key: 'upload-test.txt',
       VersionId: 'abc...' } ],
  Errors: [] }
*/
```

### Delete All Markers from a Single File

Delete all Markers for a given file

```js
bucket.deleteAllMarkers({
  Key: 'upload-test.txt',
}).then(function(res){
  /* res.Deleted => Deleted markers of single file */
}).catch(function(err){
  /* err */
});
```

### Delete All Versions and Markers from a Single File

Delete all Versions and Markers for a given file

```js
bucket.deleteAllVersionsAndMarkers({
  Key: 'upload-test.txt',
}).then(function(res){
  /* res.Deleted => Deleted versions and markers of single file */
}).catch(function(err){
  /* err */
});
```

### Delete Specific Versions from files

```js
bucket.deleteFilesVersioned({
  files: [{
      Key: 'upload-test.txt',
      // 'null' means latest version
      VersionId: 'null'
    }, {
      // you can repeat the same file
      Key: 'upload-test.txt',
      VersionId: 'abc...'
    }, {
      // several times
      Key: 'upload-test.txt',
      VersionId: 'def...'
    }, {
      // OR you can mix passing multiple files and versions
      Key: 'other-file.txt',
      VersionId: 'ghi...'
  }]
}).then(function(res){
  /* res.Deleted => Deleted versions and files specified */
  done();
}).catch(function(err){
  /* err */
});

/*
Result:
{ Deleted:
   [ { Key: 'upload-test.txt',
       VersionId: 'abc...' } ],
  Errors: [] }
*/
```

### Get All buckets

Get All buckets for this account

```js
bucket.getAllBuckets().then(function(res) {
  /* Buckets => res.Buckets */
}).catch(function(err) {
  /* err */
});

/*
Result:
{
  Buckets:
   [ { Name: 'my-bucket',
       CreationDate: 2018-03-19T17:49:05.000Z } ],
  Owner:
   { DisplayName: 'cris',
     ID: '...' }
}
*/

```


## References

- [AWS Docs: listObjectVersions](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectVersions-property)
- [Delete all versions of all files in s3 versioned bucket using AWS CLI and jq.](https://gist.github.com/weavenet/f40b09847ac17dd99d16)

