---
repo: gr2m/create-user-to-server-token
url: 'https://github.com/gr2m/create-user-to-server-token'
homepage: 'https://create-user-to-server-token.netlify.app/'
starredAt: '2021-05-20T22:38:17Z'
createdAt: '2021-05-20T18:23:49Z'
updatedAt: '2024-03-21T18:27:43Z'
language: HTML
license: ISC
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:39.505Z'
description: >-
  Static website to generate user-to-server tokens scoped to a GitHub App's
  installations and permissions
tags: []
---

# create-user-to-server-token

> static website to generate user-to-server tokens scoped to a GitHub App's installations and permissions

Open the static HTML form at: [create-user-to-server-token.netlify.app](https://create-user-to-server-token.netlify.app).

The Login flow is using one static function ([`netlify/functions/oauth.js`](netlify/functions/oauth.js)) because GitHub's API to exchange an OAuth code for an access token is not CORS enabled.

## License

[ISC](LICENSE.md)
