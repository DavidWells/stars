---
repo: jerryjj/serverless-microblog
url: 'https://github.com/jerryjj/serverless-microblog'
homepage: null
starredAt: '2016-09-17T01:05:10Z'
createdAt: '2016-06-13T11:55:28Z'
updatedAt: '2019-12-19T13:15:30Z'
language: JavaScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:19.259Z'
description: Demo Project for serverless coding with Firebase
tags: []
---

# Serverless MicroBlog

This is an example project to demonstrate serverless coding with Firebase.
Demo: https://micro.totallyon.me/

## Local development

1. Clone the repo
2. Install dependencies
```sh
npm install && bower install
```
3. Insert your Firebase Database credentials here (in this README):

```
FIREBASE_PROJECT_ID: MY-PROJECT-ID
FIREBASE_API_KEY: MY-API-KEY
```

Or you can also export them as environment variables

```sh
export FIREBASE_PROJECT_ID=MY-PROJECT-ID
export FIREBASE_API_KEY=MY-API-KEY
```

4. Run the dev server with livereload
```sh
npm run dev
```

## Deployment

Requirements:
* Firebase CLI tool (npm install -g firebase-tools)

To deploy this under your own Firebase project,
create .firebaserc -file in the project directory
with following content:

```
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

Then build the assets and deploy to hosting:

```sh
npm run deploy
```

Also you can deploy better rules (database.rules.json) for the database (Recommended)

```sh
firebase deploy --only database
```

License: MIT
