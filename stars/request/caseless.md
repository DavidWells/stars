---
repo: request/caseless
url: 'https://github.com/request/caseless'
homepage: null
starredAt: '2017-11-07T23:37:02Z'
createdAt: '2013-09-13T08:23:41Z'
updatedAt: '2024-11-06T09:52:36Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 96
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:35.620Z'
description: 'Caseless object set/get/has, very useful when working with HTTP headers.'
tags: []
---

## Caseless -- wrap an object to set and get property with caseless semantics but also preserve caseing.

This library is incredibly useful when working with HTTP headers. It allows you to get/set/check/delete headers in a caseless manner while also preserving the headers' case when they are first set.

## Usage

```javascript
var headers = {}
  , c = caseless(headers)
  ;
c.set('a-Header', 'asdf')
c.get('a-header') === 'asdf'
```

## has(key)

Has takes a name and if it finds a matching header will return that header name with the preserved caseing it was set with.

```javascript
c.has('a-header') === 'a-Header'
```

## set(key, value[, clobber=true])

Set is fairly straight forward except that if the header exists and clobber is disabled it will add `','+value` to the existing header.

```javascript
c.set('a-Header', 'fdas')
c.set('a-HEADER', 'more', false)
c.get('a-header') === 'fdsa,more'
```

## swap(key)

Swaps the casing of a header with the new one that is passed in.

```javascript
var headers = {}
  , c = caseless(headers)
  ;
c.set('a-Header', 'fdas')
c.swap('a-HEADER')
c.has('a-header') === 'a-HEADER'
headers === {'a-HEADER': 'fdas'}
```

## del(key)

Deletes a key and, if there's many instances of the key with multiple cases, all of them.

```javascript

var headers = {
  'a-Header': true,
  'content-length': 312,
  'Content-Length': 312
}
var c = caseless(headers);

c.del('Content-length');
headers === {
  'a-Header': true
};

```
