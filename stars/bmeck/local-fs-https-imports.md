---
repo: bmeck/local-fs-https-imports
url: 'https://github.com/bmeck/local-fs-https-imports'
homepage: null
starredAt: '2021-06-30T16:47:58Z'
createdAt: '2021-02-02T09:23:23Z'
updatedAt: '2021-07-01T02:49:35Z'
language: JavaScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:31.040Z'
description: null
tags: []
---

# Local FS HTTPS Imports

## Usage

```mjs
local-fs-https-imports app.js policy.json
node --experimental-policy policy.json app.js
```

Would allow an `app.js` with:

```mjs
import 'https://flavio-es-modules-example.glitch.me/script.js';
```

To run.

## What does it do?

It parses an entry module and crawls the source text looking for `import`s. When it finds an import it tries to resolve the URL it points to. If it finds a `https:` URL it saves it to disk under `node_modules/.https/`. After it is done crawling the entry module graph it creates a [Node.js Policy Manifest](https://nodejs.org/api/policy.html) to redirect requests to those URLs to the files on disk instead and prints it to STDOUT.

## Is this production ready?

Maybe? I am biased though. The resolver isn't as feature complete as the Node builtin resolver.

## I want feature X!

PR it, this is mostly a proof of concept to help get [HTTPS imports rolling in Node.js core](https://github.com/nodejs/node/discussions/36430) by showing a potential set of semantics we can experiment with.

## Support Matrix

Feature | Status | Notes
---- | ---- | ----
`content-type` header | working | only JavaScript MIMEs are supported, saves as .mjs files to disambiguate regardless of package "type"
CORS | missing | could be implemented, but really unclear given the same origin model on what the "base" origin should be. Node PR uses multiple origins to solve this, could do so here
`authorization` header | missing | no cookie jar implemented here currently to do so
`http:` | won't fix | use `https:`
cache-control | won't fix | this saves the state at the time of running the script, expiration won't break your program
`import.meta.url` | won't fix | this points to the local file, it won't point to a dynamic server URL. This means some asset management won't work such as using `fetch`. This however prevents potential problems with missing assets only working sometimes or being vulnerable to manipulation compared to the cache
