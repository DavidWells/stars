---
repo: nhoizey/Better500px-WebExtension
url: 'https://github.com/nhoizey/Better500px-WebExtension'
homepage: null
starredAt: '2016-06-07T21:24:57Z'
createdAt: '2016-05-06T16:44:16Z'
updatedAt: '2023-08-27T08:42:49Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:24.231Z'
description: Enhances 500px.com with a few useful shortcuts for better navigation
tags:
  - chrome-extension
  - extension
  - firefox-addon
  - firefox-extension
  - opera-extension
  - webextension
---

<img src="https://raw.githubusercontent.com/nhoizey/Better500px-WebExtension/master/src/icons/better500px-128px.png" alt="Better500px" width="128" height="128" align="right" />

# Better500px

[![Known Vulnerabilities](https://snyk.io/test/github/nhoizey/better500px-webextension/badge.svg)](https://snyk.io/test/github/nhoizey/better500px-webextension)

This is an extension for Firefox, Chrome and Opera that enhances [500px.com](https://500px.com/) with a few useful shortcuts for better navigation.

## Download/install

- [Firefox add-on](https://addons.mozilla.org/fr/firefox/addon/better500px/)
- [Chrome extension](https://chrome.google.com/webstore/detail/better500px/ibiamkipmkkignmechblpbdahngkjpam)
- [Opera extension](https://addons.opera.com/en/extensions/details/better500px/)

## 500px enhancements

### Menu items

- "Pulse" item in the menu that links to the search for current photographer, sorted by pulse. It might show several photographers if the name is common.
- "Favorites" item in the menu that links directly to the favorites, if such a gallery exists and contains at least one photo.

<img src="https://raw.githubusercontent.com/nhoizey/Better500px-WebExtension/master/screenshots/better500px-tchebotarev-menu.png" alt="Better500px on Evgeny Tchebotarev's gallery" width="90%" height="auto" />

### Visual hints

- White hearts shown in galleries on photos already liked.

<img src="https://raw.githubusercontent.com/nhoizey/Better500px-WebExtension/master/screenshots/better500px-tchebotarev-favs.png" alt="Better500px on Evgeny Tchebotarev's gallery" width="90%" height="auto" />

## How it is built

This extension is built using [the WebExtensions standard](https://developer.mozilla.org/en-US/Add-ons/WebExtensions), sharing the exact same source code for Firefox, Chrome and Opera.

The Chrome (and Opera) extension is built using [@oncletom](https://github.com/oncletom)'s [crx](https://github.com/oncletom/crx) Node.js command line app.
