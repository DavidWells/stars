---
repo: jedireza/aqua
url: 'https://github.com/jedireza/aqua'
homepage: 'https://jedireza.github.io/aqua/'
starredAt: '2015-03-15T23:21:42Z'
createdAt: '2015-02-17T08:42:06Z'
updatedAt: '2025-02-22T09:20:02Z'
language: JavaScript
license: MIT
branch: master
stars: 1379
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:46.801Z'
description: ':bulb: A website and user system starter'
tags:
  - admin
  - boilerplate
  - hapi
  - javascript
  - mongodb
  - nodejs
  - react
  - starter-kit
  - user-manager
  - user-system
---

# No longer maintained

Boilerplates can be a huge time sink to maintain and I've decieded to archive
this project.

I started the work for upgrading to hapi v17 and using async/await instead of
callbacks, that work can be found in the `hapi-17-async-await` branch.

Thanks for your interest in my projects.

- - - - - - - - - -

# Aqua

A website and user system starter.

[![Build Status](https://travis-ci.org/jedireza/aqua.svg?branch=master)](https://travis-ci.org/jedireza/aqua)


## Features

 - Universal front-end website
   - Basic web pages ready to customize
   - Contact page with form to email
   - Account sign-up page
   - Login pages including forgot and reset password
 - My account area
   - Stub dashboard ready to customize
   - Settings screen to update contact info and login credentials
 - Admin back office
   - Stub dashboard ready to customize
   - Manage accounts, admins, groups and users
   - Use groups (like departments) for shared permissions
   - Granular permissions override group permissions


## Live demo

| url                            | username | password |
|:------------------------------ |:-------- |:-------- |
| https://getaqua.herokuapp.com/ | root     | root     |


## Technology

Server side, Aqua is built with the [hapi](https://hapijs.com/) framework.
We're using [MongoDB](http://www.mongodb.org/) as a data store.

The front-end is built with [React](https://github.com/facebook/react). We use
[Redux](https://github.com/reactjs/redux) as our state container. Client side
routing is done with [React Router](https://github.com/reactjs/react-router).
We're using [Gulp](http://gulpjs.com/) for the build system.

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing
secrets. If you have issues during installation related to `bcrypt` then [refer
to this wiki
page](https://github.com/jedireza/aqua/wiki/bcrypt-Installation-Trouble).


## API only

If you don't use React and/or would rather bring your own front-end, checkout
[Frame](https://github.com/jedireza/frame). It's just the HTTP API parts of Aqua.


## Installation

```bash
$ git clone git@github.com:jedireza/aqua.git
$ cd aqua
$ npm install
```


## Configuration

Simply edit `config.js`. The configuration uses
[`confidence`](https://github.com/hapijs/confidence) which makes it easy to
manage configuration settings across environments. __Don't store secrets in
this file or commit them to your repository.__

__Instead, access secrets via environment variables.__ We use
[`dotenv`](https://github.com/motdotla/dotenv) to help make setting local
environment variables easy (not to be used in production).

Simply copy `.env-sample` to `.env` and edit as needed. __Don't commit `.env`
to your repository.__


## First time setup

__WARNING__: This will clear all data in the following MongoDB collections if
they exist: `accounts`, `adminGroups`, `admins`, `authAttempts`, `sessions`,
`statuses`, and `users`.

```bash
$ npm run first-time-setup

# > aqua@0.0.0 first-time-setup /home/jedireza/projects/aqua
# > node first-time-setup.js

# MongoDB URL: (mongodb://localhost:27017/aqua)
# Root user email: jedireza@gmail.com
# Root user password:
# Setup complete.
```


## Running the app

```bash
$ npm start

# > aqua@0.0.0 start /Users/jedireza/projects/aqua
# > gulp react && gulp

# [23:41:44] Using gulpfile ~/projects/aqua/gulpfile.js
# ...
```

Now you should be able to point your browser to http://127.0.0.1:8000/ and see
the welcome page.

[`nodemon`](https://github.com/remy/nodemon) watches for changes in server code
and restarts the app automatically. [`gulp`](https://github.com/gulpjs/gulp) and
[`webpack`](https://github.com/webpack/webpack) watch the front-end files and
re-build those automatically too.

We also pass the `--inspect` flag to Node so you have a debugger available.
Watch the output of `$ npm start` and look for the debugging URL and open it in
Chrome. It looks something like this:

`chrome-devtools://devtools/remote/serve_file/@62cd277117e6f8ec53e31b1be58290a6f7ab42ef/inspector.html?experiments=true&v8only=true&ws=localhost:9229/node`


## Running in production

```bash
$ node server.js
```

Unlike `$ npm start` this doesn't watch for file changes. Also be sure to set
these environment variables in your production environment:

 - `NODE_ENV=production` - This is important for many different optimizations,
   both server-side and with the front-end build files.
 - `NPM_CONFIG_PRODUCTION=false` - This tells `$ npm install` to not skip
   installing `devDependencies`, which we need to build the front-end files.


## Have a question?

Any issues or questions (no matter how basic), open an issue. Please take the
initiative to read relevant documentation and be proactive with debugging.

 - There are some guides in [the wiki](https://github.com/jedireza/aqua/wiki)
 - Read through [previously asked
   questions](https://github.com/jedireza/aqua/issues?q=label%3Aquestion%20)


## Want to contribute?

Contributions are welcome. If you're changing something non-trivial, you may
want to submit an issue before creating a large pull request.


## Running tests

[Lab](https://github.com/hapijs/lab) is part of the hapi ecosystem and what we
use to write all of our tests.

```bash
$ npm test

# > aqua@0.0.0 test /Users/jedireza/projects/aqua
# > lab -t 100 -S -T ./test/lab/transform -L --lint-options '{"extensions":[".js",".jsx"]}' ./test/lab/client-before.js ./test/client/ ./test/lab/client-after.js ./test/server/ ./test/lab/server-after.js ./test/misc/

#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ...............

# 865 tests complete
# Test duration: 6382 ms
# No global variable leaks detected
# Coverage: 100.00%
# Linting results: No issues
```

### Targeted tests

If you'd like to run a specific test or subset of tests you can use the
`test-client` and `test-server` scripts included in the `package.json` file.

You specificy the path(s) via the `TEST_TARGET` environment variable like:

```bash
$ TEST_TARGET=test/server/web/main.js npm run test-server

# or

$ TEST_TARGET=test/client/actions/api.js npm run test-client
```


## License

MIT


## Don't forget

What you build with Aqua is more important than Aqua.
