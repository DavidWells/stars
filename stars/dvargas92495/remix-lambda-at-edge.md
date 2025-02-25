---
repo: dvargas92495/remix-lambda-at-edge
url: 'https://github.com/dvargas92495/remix-lambda-at-edge'
homepage: null
starredAt: '2022-03-17T01:34:48Z'
createdAt: '2022-01-27T00:44:03Z'
updatedAt: '2023-12-15T07:45:30Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: true
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:21:58.104Z'
description: null
tags: []
---

# Remix Adapter for CloudFront Lambda@Edge

_Package was originally forked from https://github.com/ajhaining/remix-lambda-at-edge but deployed to npm as its own package after failing to get in contact with the original author_

This adapter transforms [CloudFront Origin Request Events](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#example-origin-request) into [Web Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) Request and Response objects using the [adapter convention](https://remix.run/docs/en/v1/other-api/adapter) set out in the Remix Docs.

## Usage

```ts
import { createRequestHandler } from "remix-lambda-at-edge";

export const handler = createRequestHandler({
  getBuild: () => require("./build"),
  getLoadContext: event => {
    // access to raw CloudFront event to provide context to loaders
  },
  // mode?: string; development or production, defaulted to NODE_ENV 
  // originPaths?: (string | RegExp)[]; set of paths returned to cloudfront to lookup in S3 instead
  // onError?: (e: Error) => void; method called if remix fails to handle the request for any reason
  // debug?: boolean; add extra logging to cloudfront, defaults to false
});
```
