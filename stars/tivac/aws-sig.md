---
repo: tivac/aws-sig
url: 'https://github.com/tivac/aws-sig'
homepage: ''
starredAt: '2021-06-03T06:25:55Z'
createdAt: '2018-02-02T06:22:43Z'
updatedAt: '2025-01-14T01:13:38Z'
language: JavaScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:36.980Z'
description: "\U0001F50F AWS sigv4, optimized for size"
tags:
  - aws
  - sigv4
---

# 🔏 aws-sig [![NPM Version](https://img.shields.io/npm/v/aws-sig.svg)](https://www.npmjs.com/package/aws-sig) [![NPM License](https://img.shields.io/npm/l/aws-sig.svg)](https://www.npmjs.com/package/aws-sig) [![NPM Downloads](https://img.shields.io/npm/dm/aws-sig.svg)](https://www.npmjs.com/package/aws-sig) [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftivac%2Faws-sig%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/tivac/aws-sig/goto?ref=main)

Teeny-tiny library for signing requests to Amazon Web Services using the [signature v4 signing algorithm](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). Supports signing requests via `Authorization` header or query params.

No serious, it's really small!

![Bundle Size](http://img.badgesize.io/tivac/aws-sig/main/dist/aws-sig.umd.js?color=blue) ![Gzipped Bundle Size](http://img.badgesize.io/tivac/aws-sig/main/dist/aws-sig.umd.js?compression=gzip&color=blue&max=5000&softmax=4000)

## 🙋 Why?

I wanted something small. Really, really small. Couldn't find a small AWS v4 signing library that worked in a browser using rollup for bundling so... here we are. ¯\\_(ツ)\_/¯

## ⚙️ How?

```js
import { signedHeaders, signedQuery } from "aws-sig";

const config = {
    accessKeyId     : "AKIDEXAMPLE",
    secretAccessKey : "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",

    // sessionTokens are optional, but correctly supported
    sessionToken    : "..."
};

const request = {
    // These can be part of the config object or the request object
    region  : "us-east-1",
    service : "service",
    
    method : "GET",
    url    : "https://my.aws.url.that.i.need.to.hit/look/it-has/a-path-in-it-as-well",
    
    // Headers are optional
    headers : {
        // Single header value
        "X-Amz-Date" : "20150830T123600Z",
        
        // Multiple headers
        "X-Multiple" : [ "one", "two", "three" ]
    }
    // Body is optional, should be a string
    body : "..."
};

const signed = signedHeaders(request, config);

/**
 * signed : {
 *     url : "https://my.aws.url.that.i.need.to.hit/look/it-has/a-path-in-it-as-well"
 *     method : "GET",
 *     headers : {
 *         X-Amz-Date : "20150830T123600Z",
 *         "X-Multiple" : [ "one", "two", "three" ],
 *         Authorization : "...",
 *     },
 *     body : "...",
 * }
 */

// Signing queries is identical, just uses signedQuery() instead
const config = {
    accessKeyId     : "AKIDEXAMPLE",
    secretAccessKey : "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",

    // sessionTokens are optional, but correctly supported
    sessionToken    : "...",

    // These can be part of the config object or the request object
    region  : "us-east-1",
    service : "service",
};

const request = {
    url    : "https://my.aws.url.that.i.need.to.hit/look/it-has/a-path-in-it-as-well",
};

const signed = signedQuery(request, config);

/**
 * signed : {
 *     url : "https://my.aws.url.that.i.need.to.hit/look/it-has/a-path-in-it-as-well?X-Amz-Algorithm=...&X-Amz-Credential=..."
 *     method : "GET",
 *     headers : {},
 *     body : undefined,
 * }
 */
```

## 🛁 What?

Supports query params, date overrides via `X-Amz-Date` or `Date` headers, multiple header values, and probably some other features.

Tested against API Gateway so far. Your results may vary for other services, S3 seems especially fraught with peril. 💀
