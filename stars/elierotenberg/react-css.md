---
repo: elierotenberg/react-css
url: 'https://github.com/elierotenberg/react-css'
homepage: null
starredAt: '2015-02-09T22:37:39Z'
createdAt: '2014-08-01T09:04:32Z'
updatedAt: '2023-07-15T06:47:55Z'
language: JavaScript
license: MIT
branch: master
stars: 35
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:52.660Z'
description: Converts plain CSS into (optionally auto-prefixed) React-style properties map.
tags: []
---

react-css
=========
Converts plain CSS into (optionally auto-prefixed) React-style properties map.

Usage
=====
```js
/** @jsx React.DOM */
var React = require("react");
var fromCSS = require("react-css").fromCSS;

/* Pre-compute the CSS to avoid lengthy calculations at each render cycle */
var myComponentStyle = fromCSS("{ opacity: 0.5; }");

var MyComponent = React.createClass({
	render: function() {
		return (
			<div style={myComponentStyle}>
				/* ... */
			</div>
		);
	},
});
/* ... */
```
