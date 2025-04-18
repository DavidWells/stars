---
repo: philschatz/octokat.js
url: 'https://github.com/philschatz/octokat.js'
homepage: 'http://philschatz.com/2014/05/25/octokat/'
starredAt: '2016-10-27T17:58:50Z'
createdAt: '2014-05-22T01:49:45Z'
updatedAt: '2025-02-23T12:06:12Z'
language: JavaScript
license: MIT
branch: master
stars: 422
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:17.456Z'
description: >-
  :octocat: Github API Client using Promises or callbacks. Intended for the
  browser or NodeJS.
tags:
  - github-api
  - javascript
  - promise
  - promise-support
---

# Octokat.js
[![gh-board][kanban-image]][kanban-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![build status][travis-image]][travis-url]
[![dependency status][dependency-image]][dependency-url]
[![dev dependency status][dev-dependency-image]][dev-dependency-url]
[![code coverage][coverage-image]][coverage-url]


[Try it out in your browser!](https://tonicdev.com/npm/octokat) (REPL)

Octokat.js provides a minimal higher-level wrapper around [GitHub's API](https://developer.github.com).
It is being developed in the context of an [EPUB3 Textbook editor for GitHub](https://github.com/oerpub/github-bookeditor)
 and a [simple serverless kanban board](https://github.com/philschatz/gh-board) ([demo](http://philschatz.com/gh-board)).

This package can be used in `nodejs` **or** in the browser as an AMD module or using browserify.

# Table of Contents

- [Install](#install)
- [Key Features](#key-features)
- [Overview](#overview)
- [Examples](#examples)
  - [Chaining](#chaining)
  - [Promises or Callbacks](#promises-or-callbacks)
  - [Read/Write/Remove a File](#readwriteremove-a-file)
- [Usage](#usage)
  - [In a Browser](#in-a-browser)
  - [In Node.js](#in-nodejs)
  - [Setup](#setup)
    - [Promises (Optional)](#promises-optional)
- [Advanced](#advanced-uses)
  - [Hypermedia](#hypermedia)
  - [Paged Results](#paged-results)
  - [Preview new APIs](#preview-new-apis)
  - [Enterprise APIs](#enterprise-apis)
  - [Using EcmaScript 6 Generators](#using-ecmascript-6-generators)
  - [Uploading Releases](#uploading-releases)
  - [Parsing JSON](#parsing-json)
  - [Using URLs Directly](#using-urls-directly)
  - [Development](#development)

# Install

Octokat runs in [node](https://nodejs.org) or a browser and is available in [npm](https://npmjs.com/package/octokat).

```sh
npm install --save octokat
```

# Key Features

- Works in `nodejs`, an AMD module in the browser, and as a [bower](https://github.com/bower/bower) library
- Handles text _and_ binary files
- Exposes everything available via the GitHub API (repos, teams, events, hooks, emojis, etc.)
- Supports `ETag` caching
- Paged results
- Node-style callbacks as well as optional Promises (to avoid those debates)
- 100% of the GitHub API
  - Starring and Following repositories, users, and organizations
  - Editing Team and Organization Membership
  - User/Org/Repo events and notifications
  - Listeners for rate limit changes
  - Public Keys
  - Hooks (commit, comment, etc.)
  - Uses native Promises if available
  - Markdown generation
  - Preview APIs (Deployments, Teams, Licenses, etc)
  - Enterprise APIs

For the full list of supported methods see [./src/grammar/](./src/grammar/), [./examples/](./examples/), [Travis tests](https://travis-ci.org/philschatz/octokat.js),
or the [./test](./test/) directory.

# Overview

This library closely mirrors the <https://developer.github.com/v3> documentation.

For example:

```js
// `GET /repos/:owner/:repo` in the docs becomes:
octo.repos(owner, repo).fetch()

// `POST /repos/:owner/:repo/issues/:number/comments` becomes:
octo.repos(owner, repo).issues(number).comments.create(params)
```

The last method should be a *verb method*.
The verb method makes the async call and should either have a callback as the last argument
or it returns a Promise (see [Promises or Callbacks](#promises-or-callbacks)).

The basic structure of the *verb method* is:

- `.foos.fetch({optionalStuff:...})` yields a list of items (possibly paginated)
- `.foos(id).fetch(...)` yields a single item (issue, repo, user)
- `.foos.create(...)` creates a new `foo`
- `.foos(id).update(...)` updates an existing `foo`
- `.foos(id).add()` adds an existing User/Repo (`id`) to the list
- `.foos(id).remove()` removes a member from a list or deletes the object and yields a boolean indicating success
- `.foos.contains(id)` tests membership in a list (yields true/false)
- `.foos(id).read()` is similar to `.fetch()` but yields the text contents without the wrapper JSON
- `.foos(id).readBinary()` is similar to `.read()` but yields binary data


# Examples

Below are some examples for using the library.
For a semi-autogenerated list of more examples see [./examples/](./examples/).


## Chaining

You construct the URL by chaining properties and methods together
and an async call is made once a verb method is called (see below).

```js
octo = new Octokat()
repo = octo.repos('philschatz', 'octokat.js')
// Check if the current user is a collaborator on a repo
repo.collaborators.contains(USER)
.then((isCollaborator) => {
  // If not, then star the Repo
  if (!isCollaborator) {
    repo.star.add()
    .then(() => {
      // Done!
    })
  }
})
```

Or, update a specific comment:

```js
octo = new Octokat({token: ...})
octo.repos('philschatz', 'octokat.js').issues(1).comments(123123).update({body: 'Hello'})
.then(() => {
  // Done!
})
```


## Promises or Callbacks

This library supports Node.js-style callbacks as well as Promises.

To use a callback, just specify it as the last argument to a method.
To use a Promise, do not specify a callback and the return value will be a Promise.

Example (get information on a repo):

```js
// Using callbacks
octo.repos('philschatz', 'octokat.js').fetch((err, repo) => {
  if (err) console.error(err)
  // Do fancy stuff...
})

// Using Promises
octo.repos('philschatz', 'octokat.js').fetch()
.then((repo) => {
  // Do fancy stuff
}).then(null, (err) => console.error(err))
```


## Read/Write/Remove a File

To read the contents of a file:

```js
var octo = new Octokat()
var repo = octo.repos('philschatz', 'octokat.js')
repo.contents('README.md').read() // Use `.read` to get the raw file.
.then((contents) => {        // `.fetch` is used for getting JSON
  console.log(contents)
});
```

To read the contents of a binary file:

```js
var octo = new Octokat()
var repo = octo.repos('philschatz', 'octokat.js')
repo.contents('README.md').readBinary() // Decodes the Base64-encoded content
.then((contents) => {
  console.log(contents)
})
```

To read the contents of a file and JSON metadata:

```js
var octo = new Octokat()
var repo = octo.repos('philschatz', 'octokat.js')
repo.contents('README.md').fetch()
.then((info) => {
  console.log(info.sha, info.content)
})
```

To update a file you need the **blob SHA** of the previous commit:

```js
var octo = new Octokat({token: 'API_TOKEN'})
var repo = octo.repos('philschatz', 'octokat.js')
var config = {
  message: 'Updating file',
  content: base64encode('New file contents'),
  sha: '123456789abcdef', // the blob SHA
  // branch: 'gh-pages'
}

repo.contents('README.md').add(config)
.then((info) => {
  console.log('File Updated. new sha is ', info.commit.sha)
})
```

Creating a new file is the same as updating a file but the `sha` field in the config is omitted.

To remove a file:

```js
var octo = new Octokat({token: 'API_TOKEN'})
var repo = octo.repos('philschatz', 'octokat.js')
var config = {
  message: 'Removing file',
  sha: '123456789abcdef',
  // branch: 'gh-pages'
}

repo.contents('README.md').remove(config)
.then(() => {
  console.log('File Updated')
});
```

# Usage

All asynchronous methods accept a Node.js-style callback
**and** return a [Common-JS Promise](http://wiki.commonjs.org/wiki/Promises/A).

## In a Browser

Create an Octokat instance.

```js
var octo = new Octokat({
  username: "USER_NAME",
  password: "PASSWORD"
})

var cb = function (err, val) { console.log(val) }

octo.zen.read(cb)
octo.repos('philschatz', 'octokat.js').fetch(cb) // Fetch repo info
octo.me.starred('philschatz', 'octokat.js').add(cb) // Star a repo
```

Or if you prefer OAuth:

```js
var octo = new Octokat({
  token: "OAUTH_TOKEN"
})
```

## In a browser using RequireJS

```js
define(['octokat'], (Octokat) => {
  var octo = new Octokat({
    username: "YOU_USER",
    password: "YOUR_PASSWORD"
  })
})
```

## In Node.js

Install instructions:

```sh
npm install octokat --save
```

```js
var Octokat = require('octokat')
var octo = new Octokat({
  username: "YOU_USER",
  password: "YOUR_PASSWORD"
})

// You can omit `cb` and use Promises instead
var cb = function (err, val) { console.log(val) }

octo.zen.read(cb)
octo.repos('philschatz', 'octokat.js').fetch(cb)    // Fetch repo info
octo.me.starred('philschatz', 'octokat.js').add(cb) // Star a repo
octo.me.starred('philschatz', 'octokat.js').remove(cb) // Un-Star a repo
```

## Using bower

This file can be included using the bower package manager:

```sh
bower install octokat --save
```

## Setup

This is all you need to get up and running:

```html
<script src="../dist/octokat.js"></script>
<script>
  var octo = new Octokat()
  octo.zen.read((err, message) => {
    if (err) { throw new Error(err) }
    alert(message)
  })
</script>
```


# Advanced Uses


## Hypermedia

GitHub provides URL patterns in its JSON responses. These are automatically converted into methods.
You can disable this by setting `disableHypermedia: true` in the options when creating a `new Octokat(...)`.

For example:

```js
octo.repos('philschatz', 'octokat.js').fetch()
.then((repo) => {
  // GitHub returns a JSON which contains something like compare_url: 'https://..../compare/{head}...{base}
  // This is converted to a method that accepts 2 arguments
  repo.compare(sha1, sha2).fetch()
  .then((comparison) => console.log('Done!'))
})
```

## Paged Results

If a `.fetch()` returns paged results then `nextPage()`, `previousPage()`, `firstPage()`
and `lastPage()` are added to the returned Object. For example:

```js
octo.repos('philschatz', 'octokat.js').commits.fetch()
.then((someCommits) => {
  someCommits.nextPage()
  .then((moreCommits) => {
    console.log('2nd page of results', moreCommits)
  })
})
```
As standard with the Github API, passing a `per_page` parameter allows you to control the number of results per page. For example:

```js
octo.repos('philschatz', 'octokat.js').issues.fetch({per_page: 100})
  .then(...)
```

## Preview new APIs

Octokat will send the Preview Accept header by default for several Preview APIs.

If you want to change this behavior you can force an `acceptHeader` when instantiating Octokat.

For example:

```js
var octo = new Octokat({
  token: 'API_TOKEN',
  acceptHeader: 'application/vnd.github.cannonball-preview+json'
})
```

## Enterprise APIs

To use the Enterprise APIs add the root URL when instantiating Octokat:

```js
var octo = new Octokat({
  token: 'API_TOKEN',
  rootURL: 'https://example.com/api/v3'
})
```

## Using EcmaScript 6 Generators

This requires Node.js 0.11 with the `--harmony-generators` flag:

```js
var Octokat = require('octokat')
var octo = new Octokat()

var zen  = yield octo.zen.read()
var info = yield octo.repos('philschatz', 'octokat.js').fetch()

console.log(zen)
console.log(info)
```

## Uploading Releases

Uploading release assets requires a slightly different syntax because it
involves setting a custom contentType and providing a possibly binary payload.

To upload (tested using nodejs) you can do the following:

```js
var contents = fs.readFileSync('./build.js')

repo.releases(123456).fetch()
.then((release) => {

  release.upload('build.js', 'application/javascript', contents)
    .then((resp) => {
      // Success!
    })
})
```

## Parsing JSON

If you are using webhooks, the JSON returned by GitHub can be parsed using
`octo.parse(json)` to yield a rich object with all the methods Octokat provides.

`octo.parse(json)` is asynchronous and can take either a callback or returns a promise.

## Using URLs Directly

Instead of using Octokat to construct URLs, you can construct them yourself and
still use Octokat for sending authentication information, caching, pagination,
and parsing Hypermedia.

```js
// Specify the entire URL
octo.fromUrl('https://api.github.com/repos/philschatz/octokat.js/issues/1').fetch(cb)

// Or, just the path
octo.fromUrl('/repos/philschatz/octokat.js/issues').fetch({state: 'open'}, cb)
```

If the URL is a Hypermedia Template then you can fill in the fields by passing them in as an additional argument.

```js
params = {
  owner: 'philschatz'
  repo: 'octokat.js'
  name: 'dist.js'
}
octo.fromUrl('https://uploads.github.com/repos/{owner}/{repo}/releases{/id}/assets{?name}', params)
// returns https://uploads.github.com/repos/philschatz/octokat.js/releases/assets?name=dist.js
```

## Development

- Run `npm install`
- Run `npm test` to run Mocha tests for Node.js and the browser
- Run `grunt dist` to generate the files in the `./dist` directory

The unit tests are named to illustrate examples of using the API.
See [Travis tests](https://travis-ci.org/philschatz/octokat.js) or run `npm test` to see them.

[fetch-vcr](https://github.com/philschatz/fetch-vcr) is used to generate recorded HTTP fixtures from GitHub.
If you are adding tests be sure to include the updated fixtures in the Pull Request.


## Todo
- Add Option for Two factor authentication
- Add option to pass header as cache control: no cache


[kanban-image]: https://img.shields.io/github/issues/philschatz/octokat.js.svg?label=kanban%20board%20%28gh-board%29
[kanban-url]: http://philschatz.com/gh-board/#/r/philschatz:octokat.js
[npm-image]: https://img.shields.io/npm/v/octokat.svg
[npm-url]: https://npmjs.org/package/octokat
[downloads-image]: http://img.shields.io/npm/dm/octokat.svg
[downloads-url]: https://npmjs.org/package/octokat
[travis-image]: https://img.shields.io/travis/philschatz/octokat.js.svg
[travis-url]: https://travis-ci.org/philschatz/octokat.js
[dependency-image]: https://img.shields.io/david/philschatz/octokat.js.svg
[dependency-url]: https://david-dm.org/philschatz/octokat.js
[dev-dependency-image]: https://img.shields.io/david/dev/philschatz/octokat.js.svg
[dev-dependency-url]: https://david-dm.org/philschatz/octokat.js#info=devDependencies
[coverage-image]: https://img.shields.io/codecov/c/github/philschatz/octokat.js.svg
[coverage-url]: https://codecov.io/gh/philschatz/octokat.js
