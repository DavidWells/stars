---
repo: thousandeyes/scrumretro
url: 'https://github.com/thousandeyes/scrumretro'
homepage: null
starredAt: '2025-01-14T20:41:29Z'
createdAt: '2021-06-21T06:10:37Z'
updatedAt: '2025-01-14T20:41:30Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:14.819Z'
description: null
tags:
  - engineering
---

# scrumretro

A retrospective tool

## Development

### Setup:

Note that if you are using the same machine you use for regular TE development, you will need to
connect to the Global Protect VPN for NPM to work correctly.

```
$ npm install -g serverless
$ npm ci
```

### Config:

`.settings/secrets.json`:

```
{
    "domainName": {
        "dev": "dev domain",
        "prod": "prod domain"
    },
    "wsApi": {
        "dev": "dev websocket endpoint",
        "prod": "prod websocket endpoint"
    }
}
```

### Run client locally against an existing endpoint

```
$ npm run dev:client
```
