---
repo: gpbl/react-locale-hot-switch
url: 'https://github.com/gpbl/react-locale-hot-switch'
homepage: null
starredAt: '2015-06-22T00:38:20Z'
createdAt: '2014-12-21T22:24:56Z'
updatedAt: '2023-04-10T20:59:03Z'
language: JavaScript
license: NA
branch: master
stars: 59
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:40.323Z'
description: >-
  Small React web app showing how to change the UI language without reloading
  the page.
tags: []
---

react-locale-hot-switch
=======================

This small React web app let the user change the UI language without reloading the page. 

The localized strings are loaded only when the user switches the language

* Implements [react-intl](https://github.com/yahoo/react-intl)
* Loads the required [intl](https://www.npmjs.com/package/intl) polyfills on Safari and IE < 10
* Uses [webpack](http://webpack.github.io) for splitting the localized data in chunks

Please note this is an EXPERIMENT: see also [this issue](https://github.com/gpbl/react-locale-hot-switch/issues/1).

```bash
git clone https://github.com/gpbl/react-locale-hot-switch.git
cd react-locale-hot-switch
npm install

# Run the app
npm start
```

Then visit [http://localhost:8080/](http://localhost:8080/)
