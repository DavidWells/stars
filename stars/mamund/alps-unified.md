---
repo: mamund/alps-unified
url: 'https://github.com/mamund/alps-unified'
homepage: null
starredAt: '2021-08-08T23:38:19Z'
createdAt: '2020-11-21T18:48:22Z'
updatedAt: '2025-02-17T15:47:41Z'
language: JavaScript
license: NA
branch: main
stars: 41
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:48.466Z'
description: >-
  Utility for converting ALPS API description documents into API Definition
  documents (OpenAPI, Proto, etc.)
tags: []
---

#  ALPS Unified

Utility for converting ALPS API description documents (in YAML or JSON format) into target API definition documents (OpenAPI, SDL, Proto3, AsyncAPI, WSDL). Also converts alps YAML into alps JSON.


**NOTE**
> This utility is based on a presentation (and initial demo) here: https://github.com/mamund/2020-04-unified-api-design

### USAGE

```
-ws:~$unified -h
Usage: -f <alpsfile> -t <format type> -o <outfile>

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  -f, --file  Input file (alps.[yaml|JSON])                  [string] [required]
  -t, --type  Format Type
              ([j]son, [p]roto, [s]dl, [a]syncapi, [o]penapi, [w]sdl)   [string]
  -o, --out   Output file                                               [string]
```
### INSTALL

 * Requires NodeJS

```
npm install -g
```

