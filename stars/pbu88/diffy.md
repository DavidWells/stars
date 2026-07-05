---
repo: pbu88/diffy
url: 'https://github.com/pbu88/diffy'
homepage: ''
starredAt: '2022-02-23T18:52:24Z'
createdAt: '2015-09-02T16:49:17Z'
updatedAt: '2025-02-24T13:50:17Z'
language: TypeScript
license: NA
branch: master
stars: 215
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:12.338Z'
description: 'Share diff output in the browser with https://diffy.org'
tags: []
---

# Diffy - A tool for sharing diff output online [![Build Status](https://travis-ci.org/pbu88/diffy.svg)](https://travis-ci.org/pbu88/diffy)

https://diffy.org

## How to contribute

Diffy is a Node.js application. Appart from Node.js, the only other
thing you'll need is mongodb. To get you started these are the steps:

1. Install Node.js and NPM
2. Install MongoDB and make it listen on localhost with default port
3. Clone the repo: `git clone https://github.com/pbu88/diffy.git`
4. Install and build frontend code (AngularJS app)
    * `cd diffy/frontend`
    * `npm install`
    * `ng build`
5. Install and build backend code (Typescript)
    * `cd diff/backend/`
    * `npm install`
    * `npm run build`
    * `npm test`
7. Run it: `DIFFY_GA_ANALYTICS_KEY=none npm run v2_start`

### Docker

If you want to run Diffy using Docker, you don't need to follow any of the above manual steps:

1. Install [docker](https://docs.docker.com/engine/installation/) and
           [docker-compose](https://docs.docker.com/compose/install/)
2. Run the tests: `docker-compose run web npm test`
3. Launch diffy: `docker-compose up`

The mongodb data will be stored on the `data/` folder.

That should get you with a basic working dev environment. Now, go ahead
and fill your pull request :)

Also, feel free to create an issue if you find a bug or if something isn't working as expected when
setting up the development environment.
