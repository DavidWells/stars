---
repo: cezary/react-diff
url: 'https://github.com/cezary/react-diff'
homepage: 'http://cezary.github.io/react-diff/'
starredAt: '2015-03-06T21:46:55Z'
createdAt: '2014-12-19T06:24:55Z'
updatedAt: '2023-06-19T00:35:59Z'
language: null
license: NA
branch: master
stars: 124
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.901Z'
description: 'Given two inputs, highlights the differences'
tags: []
---

# react-diff

Highlights differences between two strings, uses the [diff](https://www.npmjs.com/package/diff) module

## Installation

```
npm install react-diff
```

## Demo

http://cezary.github.io/react-diff/

## Example

```javascript
var React = require('react');
var Diff = require('react-diff');

var Component = React.createClass({
  render: function() {
    return (
      <Diff inputA="gogol" inputB="google" type="chars" />
    );
  }
});
```

## License

MIT
