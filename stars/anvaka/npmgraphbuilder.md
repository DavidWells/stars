---
repo: anvaka/npmgraphbuilder
url: 'https://github.com/anvaka/npmgraphbuilder'
homepage: null
starredAt: '2022-05-09T17:24:23Z'
createdAt: '2014-02-22T03:38:36Z'
updatedAt: '2024-08-21T19:46:28Z'
language: JavaScript
license: MIT
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:47.342Z'
description: Builds graph of npm dependencies from npm registry
tags: []
---

# npmgraphbuilder

Builds graph of npm dependencies from npm registry. A graph is an instance of
[`ngraph.graph`](https://github.com/anvaka/ngraph.graph).

[![Build Status](https://travis-ci.org/anvaka/npmgraphbuilder.png)](https://travis-ci.org/anvaka/npmgraphbuilder)
# Demo

This library is not bound to any particular http client. It requires http client
to be injected into constructor:

``` js
var graph = require('ngraph.graph')();
var graphBuilder = require('npmgraphbuilder')(httpClient);

graphBuilder.createNpmDependenciesGraph(pkgName, graph)
  .then(function (graph) {
    console.log('Done.');
    console.log('Nodes count: ', graph.getNodesCount());
    console.log('Edges count: ', graph.getLinksCount());
  })
  .fail(function (err) {
    console.error('Failed to build graph: ', err);
  });
```

Here `httpClient` is a `function (url, data) {}`, which returns a promise.

A demo of `httpClient`, implemented in angular.js:

``` js
function httpClient(url, data) {
  // since we will be using from a web browser, make sure jsonp is enabled:
  data.callback = 'JSON_CALLBACK';
  return $http.jsonp(url, {params: data});
}
```

A demo of `httpClient` implemented in node.js:

``` js
var q = require('q');       // npm install q
var http = require('http'); // stadard http
var querystring = require('querystring'); // standard query string

function httpClient(url, data) {
  var defer = q.defer();
  http.get(url + '?' + querystring.stringify(data), function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    }).on('end', function () {
      defer.resolve({ data: JSON.parse(body) });
    });
  });

  return defer.promise;
}
```

To see working demo please refer to `demo` folder.

# install

With [npm](https://npmjs.org) do:

```
npm install npmgraphbuilder
```

# license

MIT
