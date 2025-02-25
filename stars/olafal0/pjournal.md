---
repo: olafal0/pjournal
url: 'https://github.com/olafal0/pjournal'
homepage: null
starredAt: '2020-09-14T19:42:07Z'
createdAt: '2020-03-21T19:58:04Z'
updatedAt: '2022-04-21T15:22:50Z'
language: Svelte
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:31.521Z'
description: >-
  Have you ever wanted to self-host a web application just to replace something
  you could do with a notebook and a pencil?
tags:
  - journal
  - self-hosted
---

# pjournal

Have you ever wanted to self-host a web application just to replace something you could do with a notebook and a pencil? So have I.

pjournal is a web app for keeping a personal journal—like a blog that only you can see. It supports multiple users, full GitHub-flavored markdown, editing, and client-side encryption. Set a local encryption password, and all new or updated posts from that point forward will be encrypted before they're sent to the server!

You can try it out here: https://journal.olafalo.net

![pjournal screenshot](/screenshots/pjournal-2020-09-30.png?raw=true)

pjournal is made using [dispatch](https://github.com/flick-web/dispatch), [Parcel](https://parceljs.org), [Svelte](https://svelte.dev), and [Marked.js](https://marked.js.org).

## Deploying

Prerequisites:

- An AWS account
- Correctly configured `awscli` (or `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` set if running from GitLab CI)
- `jq` installed
- (Optional) Somewhere to host a static website (GitHub/GitLab pages, Netlify, etc)

Once everything is set up, just clone this repository, `cd` into it, and run:

```sh
./scripts/deploy.sh # Deploy the backend on AWS
./scripts/generate-config.sh # Generate website configuration from the deployed backend
cd web # Change to the frontend directory
npm install # Install dependencies
npm install --global parcel-bundler # Install the parcel CLI tool
parcel index.html # Run the site locally for testing
```

You can then view the website locally (on http://localhost:1234 by default). The website will automatically be configured to use the your backend stack on AWS, so you can register and start using it! To host the site somewhere, you'll just need to build the site with parcel and upload the resulting files to any kind of static site host.
