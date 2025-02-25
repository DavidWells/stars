---
repo: joeyvandijk/asana-rest-api
url: 'https://github.com/joeyvandijk/asana-rest-api'
homepage: 'https://joeyvandijk.github.io/asana-rest-api/'
starredAt: '2016-01-20T00:40:00Z'
createdAt: '2014-09-01T21:32:31Z'
updatedAt: '2023-01-28T17:52:58Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:33.679Z'
description: '[DEPRECATED] A Node.js implementation for the Asana REST API.'
tags: []
---

# REMARK
Due to the arrival of the **[official](https://github.com/Asana/node-asana/)** Node.JS library for the [Asana](https://www.asana.com) REST API, I have decided ***not*** to proceed finishing this library. This repository is only ment for reference and will ***not be supported*** any more.

&nbsp;
&nbsp;
&nbsp;
&nbsp;

# LEGACY

This is a [NPM](https://npmjs.org) module which can be used with [NodeJS](https://www.nodejs.org) as a tool for:

* calling the [Asana](https://www.asana.com) REST API.

## ROADMAP

* ```0.7.0``` export
  * your tasks into a ```json```-file
  * update ```npm test``` with mock-server
* ```0.8.0``` import
  * your ```json```-file into Asana
  * transfer/copy data from 1 workspace into another
* ```0.9.0``` OAuth support
* ```1.0.0``` bugfixes

## DOCUMENTATION

How to use this [NPM](https://npmjs.org) module can be found at [joeyvandijk.github.io/asana-rest-api](https://joeyvandijk.github.io/asana-rest-api) or use the ```test/``` directory for test examples.

## EXAMPLE

To get started this module supports streaming (*streams2*) and callbacks, but to get an idea about the way the API is set up see the example below or have a look at the [documentation](https://joeyvandijk.github.io/asana-rest-api).

```javascript
var asana = require('asana-rest-api');
var api = new asana('key-you-have-copied');
api.workspaces.list().on('readable',function(){
    console.log('A workspace object:',this.read());
}).on('end',function(){
    console.log('All workspaces received.');
}).on('error',function(err){
    console.log('An API error: ',err);
});
```
