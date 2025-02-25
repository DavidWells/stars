---
repo: netlify/netlify-oauth-example
url: 'https://github.com/netlify/netlify-oauth-example'
homepage: null
starredAt: '2018-10-10T23:56:34Z'
createdAt: '2016-09-22T05:14:31Z'
updatedAt: '2023-05-30T21:44:30Z'
language: JavaScript
license: NA
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:11.620Z'
description: null
tags: []
---

> See updated OAuth example [here](https://github.com/netlify-labs/oauth-example)


# Example of using Netlify's OAuth2 Provider

This demo will show how to ask a user to authorize your app with Netlify, and get
back and access token that you can use to do deploys, list sites, etc, etc, via
Netlify's API.

## Installation

Clone this repository and do a quick deploy to netlify:

```bash
npm install netlify-cli -g
netlify deploy --path example/
```

Then visit the URL of your new site and follow the instructions.

## Source Code

To follow along, just read the file [example/app.js](example/app.js) and see how
the flow is implemented.
