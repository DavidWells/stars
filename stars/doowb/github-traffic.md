---
repo: doowb/github-traffic
url: 'https://github.com/doowb/github-traffic'
homepage: null
starredAt: '2019-10-06T03:52:29Z'
createdAt: '2016-09-16T15:14:38Z'
updatedAt: '2024-01-04T16:07:38Z'
language: JavaScript
license: MIT
branch: master
stars: 81
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:21.059Z'
description: Get the Github traffic for the specified repository
tags:
  - analytics
  - api
  - github
  - github-analytics
  - github-api
  - github-statistics
  - github-stats
  - github-traffic
  - statistics
  - stats
  - traffic
  - traffic-information
---

# github-traffic [![NPM version](https://img.shields.io/npm/v/github-traffic.svg?style=flat)](https://www.npmjs.com/package/github-traffic) [![NPM downloads](https://img.shields.io/npm/dm/github-traffic.svg?style=flat)](https://npmjs.org/package/github-traffic) [![Build Status](https://img.shields.io/travis/doowb/github-traffic.svg?style=flat)](https://travis-ci.org/doowb/github-traffic)

Get the Github traffic for the specified repository

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save github-traffic
```

## Usage

```js
var traffic = require('github-traffic');
```

## API

### [traffic](index.js#L57)

Get the last 14 days (this is Github's limitation) of Github traffic for the specified repository. The results will contain 4 keys (one for each of the traffic endpoints specified in the [api documentation](https://developer.github.com/v3/repos/traffic/)). See the [example results](/example-results.json) for the expanded results from the example. See the other methods below to get results for a specific endpoint.

**Params**

* `repo` **{String}**: Full repository to get traffic, formatted as `:owner/:repo`. If the repository is published to NPM, the NPM name may be used.
* `options` **{Object}**: Options containing the Github authentication information. This is required since user's must be administrators on the repository to retrieve traffic information.
* `options.username` **{String}**: Github username of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.password` **{String}**: Github user's password of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.token` **{String}**: Github oauth token for the repository administrator retrieving the traffic informatino. This is required if the `username/password` combination is not used.
* `cb` **{Function}**: Optional callback function that will be called with error information or the results. When omitted a Promise is returned.
* `returns` **{Promise}**: Promise with the traffic information when ready.

**Example**

```js
var options = {
  username: 'doowb',
  password: '**********'
};

traffic('assemble/assemble', options, function(err, results) {
  if (err) return console.error(err);
  console.log(results);
  //=> {
  //=>   referrers: [ ... ],
  //=>   paths: [ ... ],
  //=>   views: {
  //=>     count: 4043,
  //=>     uniques: 1155,
  //=>     views: [ ... ]
  //=>   },
  //=>   clones: {
  //=>     count: 47,
  //=>     uniques: 38,
  //=>     clones: [ ... ]
  //=>   }
  //=> }
});
```

### [.referrers](index.js#L116)

Get [referrers](https://developer.github.com/v3/repos/traffic/#list-referrers) for the specified repository from the Github traffic api.

**Params**

* `repo` **{String}**: Full repository to get traffic, formatted as `:owner/:repo`. If the repository is published to NPM, the NPM name may be used.
* `options` **{Object}**: Options containing the Github authentication information. This is required since user's must be administrators on the repository to retrieve traffic information.
* `options.username` **{String}**: Github username of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.password` **{String}**: Github user's password of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.token` **{String}**: Github oauth token for the repository administrator retrieving the traffic informatino. This is required if the `username/password` combination is not used.
* `cb` **{Function}**: Optional callback function that will be called with error information or the results. When omitted a Promise is returned.
* `returns` **{Promise}**: Promise with the traffic information when ready.

**Example**

```js
var options = {
  username: 'doowb',
  password: '**********'
};

traffic.referrers('assemble/assemble', options, function(err, results) {
  if (err) return console.error(err);
  console.log(results);
  //=> [
  //=>   { referrer: 'Google', count: 765, uniques: 377 },
  //=>   ...
  //=> ],
});
```

### [.paths](index.js#L153)

Get [paths](https://developer.github.com/v3/repos/traffic/#list-paths) for the specified repository from the Github traffic api.

**Params**

* `repo` **{String}**: Full repository to get traffic, formatted as `:owner/:repo`. If the repository is published to NPM, the NPM name may be used.
* `options` **{Object}**: Options containing the Github authentication information. This is required since user's must be administrators on the repository to retrieve traffic information.
* `options.username` **{String}**: Github username of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.password` **{String}**: Github user's password of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.token` **{String}**: Github oauth token for the repository administrator retrieving the traffic informatino. This is required if the `username/password` combination is not used.
* `cb` **{Function}**: Optional callback function that will be called with error information or the results. When omitted a Promise is returned.
* `returns` **{Promise}**: Promise with the traffic information when ready.

**Example**

```js
var options = {
  username: 'doowb',
  password: '**********'
};

traffic.paths('assemble/assemble', options, function(err, results) {
  if (err) return console.error(err);
  console.log(results);
  //=> [
  //=>   {
  //=>     path: '/assemble/assemble',
  //=>     title: 'GitHub - assemble/assemble: Static site generator and rapid prototyping frame...',
  //=>     count: 1551,
  //=>     uniques: 839
  //=>   },
  //=>   ...
  //=> ],
});
```

### [.views](index.js#L186)

Get [views](https://developer.github.com/v3/repos/traffic/#views) for the specified repository from the Github traffic api.

**Params**

* `repo` **{String}**: Full repository to get traffic, formatted as `:owner/:repo`. If the repository is published to NPM, the NPM name may be used.
* `options` **{Object}**: Options containing the Github authentication information. This is required since user's must be administrators on the repository to retrieve traffic information.
* `options.username` **{String}**: Github username of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.password` **{String}**: Github user's password of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.token` **{String}**: Github oauth token for the repository administrator retrieving the traffic informatino. This is required if the `username/password` combination is not used.
* `cb` **{Function}**: Optional callback function that will be called with error information or the results. When omitted a Promise is returned.
* `returns` **{Promise}**: Promise with the traffic information when ready.

**Example**

```js
var options = {
  username: 'doowb',
  password: '**********'
};

traffic.views('assemble/assemble', options, function(err, results) {
  if (err) return console.error(err);
  console.log(results);
  //=> {
  //=>   count: 4043,
  //=>   uniques: 1155,
  //=>   views: [ ... ]
  //=> }
});
```

### [.clones](index.js#L219)

Get [clones](https://developer.github.com/v3/repos/traffic/#clones) for the specified repository from the Github traffic api.

**Params**

* `repo` **{String}**: Full repository to get traffic, formatted as `:owner/:repo`. If the repository is published to NPM, the NPM name may be used.
* `options` **{Object}**: Options containing the Github authentication information. This is required since user's must be administrators on the repository to retrieve traffic information.
* `options.username` **{String}**: Github username of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.password` **{String}**: Github user's password of the repository administrator retrieving the traffic information. This is required if an oauth token is not used.
* `options.token` **{String}**: Github oauth token for the repository administrator retrieving the traffic informatino. This is required if the `username/password` combination is not used.
* `cb` **{Function}**: Optional callback function that will be called with error information or the results. When omitted a Promise is returned.
* `returns` **{Promise}**: Promise with the traffic information when ready.

**Example**

```js
var options = {
  username: 'doowb',
  password: '**********'
};

traffic.clones('assemble/assemble', options, function(err, results) {
  if (err) return console.error(err);
  console.log(results);
  //=> {
  //=>   count: 47,
  //=>   uniques: 38,
  //=>   clones: [ ... ]
  //=> }
});
```

## About

### Related projects

* [get-repository-url](https://www.npmjs.com/package/get-repository-url): Get the GitHub repository URL from a NPM package name. | [homepage](https://github.com/jonschlinkert/get-repository-url "Get the GitHub repository URL from a NPM package name.")
* [github-base](https://www.npmjs.com/package/github-base): JavaScript wrapper that greatly simplifies working with GitHub's API. | [homepage](https://github.com/jonschlinkert/github-base "JavaScript wrapper that greatly simplifies working with GitHub's API.")
* [parse-github-url](https://www.npmjs.com/package/parse-github-url): Parse a github URL into an object. | [homepage](https://github.com/jonschlinkert/parse-github-url "Parse a github URL into an object.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/doowb/github-traffic/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on September 16, 2016._
