---
repo: see-threepio/see-threepio-js
url: 'https://github.com/see-threepio/see-threepio-js'
homepage: null
starredAt: '2014-08-04T23:20:12Z'
createdAt: '2014-07-25T01:06:38Z'
updatedAt: '2014-09-02T05:18:43Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:03.121Z'
description: js implementation of see-threepio
tags: []
---

# See-Threepio-js

A JS implementation of See-Threepio

## Example

[see-threepio demo](http://see-threepio.github.io/see-threepio-js)

## Format

[see-threepio project](https://github.com/see-threepio/see-threepio)

## Usage

install

    npm install see-threepio

Require

``` javascript
var SeeThreepio = require('see-threepio');
```

Initialise:

``` javascript
var seeThreepio = new SeeThreepio([terms]);
```

Get strings:

``` javascript
seeThreepio.get(term[, array of arguments]);
```

Add terms: Adds terms to the previous set of terms

``` javascript
seeThreepio.addTerms(terms);
```

Replace terms: Replaces all terms with the new set

``` javascript
seeThreepio.addTerms(terms);
```

# Contributing

After any patches, run ```npm run build``` to make sure the example and standalone versions are up to date.
