---
repo: yuanyan/react-signals
url: 'https://github.com/yuanyan/react-signals'
homepage: null
starredAt: '2017-01-14T03:36:38Z'
createdAt: '2015-02-14T15:51:28Z'
updatedAt: '2023-03-19T09:34:14Z'
language: JavaScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:49.266Z'
description: Signals Component for React.
tags: []
---

React Signals
=============

Signals Component for React.

## Demo & Examples

Live demo: [yuanyan.github.io/react-signals](http://yuanyan.github.io/react-signals/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use `react-signals` is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/react-signals.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-signals --save
```

## Usage

### Register signal

```
<Signals onFirstSignalName={this.firstHandler} onSecondSignalName={this.secondHandler}/>
```

### Notify signal
By statics method:

```
var Signals = require('react-signals);
Signals.notify('firstHandler', data);
```

By DOM custom event:

```
var event = new CustomEvent('react-signal', {
    bubbles: false,
    detail: {
        name: 'secondHandler',
        data: data
    }
});
document.dispatchEvent(event);
```
