---
repo: kjda/ReactJs-Phonegap
url: 'https://github.com/kjda/ReactJs-Phonegap'
homepage: ''
starredAt: '2014-11-24T01:38:28Z'
createdAt: '2014-07-16T21:05:09Z'
updatedAt: '2023-06-13T01:12:59Z'
language: JavaScript
license: MIT
branch: master
stars: 261
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:01.612Z'
description: A boilerplate ReactJS-Phonegap/Cordova App + Flux data flow
tags:
  - javascript
  - phonegap
  - react
  - reactjs-phonegap
---

ReactJs-Phonegap
================

A boilerplate ReactJS-Phonegap App (+With [ReactFlux][1])

UI using [React-TopcoatUI][2]


Demo
====
http://kjda.github.io/ReactJs-Phonegap/

How to use?
===========

* Install Phonegap 
```
$ sudo npm install phonegap -g
```

* clone this repo
```
$ git clone https://github.com/kjda/ReactJs-Phonegap.git
```

* Set it up
```
$ cd ReactJs-Phonegap/app
$  npm install
$  bower install
$  gulp create
$  gulp build-app
```

* Run it
```
$ gulp serve
```

* Point your [Phonegap Developer App][3] to the suggested URL

That's it!

* While developing:
```
$ cd ReactJs-Phonegap/app
$ webpack -w
```

this will rebuild the app automatically every time you edit the source code

Build configurations are located in app/build.configs.js

[1]: //github.com/kjda/ReactFlux
[2]: //github.com/kjda/react-topui
[3]: //github.com/phonegap/phonegap-app-developer
