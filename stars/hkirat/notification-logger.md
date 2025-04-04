---
repo: hkirat/notification-logger
url: 'https://github.com/hkirat/notification-logger'
homepage: 'http://hkirat.github.io/notification-logger'
starredAt: '2016-10-12T18:46:41Z'
createdAt: '2016-10-12T11:53:30Z'
updatedAt: '2025-02-11T08:18:37Z'
language: JavaScript
license: NA
branch: master
stars: 1029
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:18.533Z'
description: Desktop notification for your console Logs
tags: []
---

# Notification Logger [![npm version](https://badge.fury.io/js/notification-logger.svg)](https://badge.fury.io/js/notification-logger)

Ever wondered why you have to open the console every time you want to want to log a variable?

Notification Logger helps provide desktop notification for your console messages.

During development, You have to check the browser's inspector periodically to see what your console.log()'s are saying.

With [notification-logger](https://github.com/hkirat/notification-logger/), you can develop and debug web apps and see console messages as Desktop Notifications.

And it only adds ~50 lines to your project.

[Demo](http://singhharkirat.com/notification-logger)

Initial repo forked from [chinchang](https://github.com/chinchang)'s project [screenlog.js](https://github.com/chinchang/screenlog.js).
Check out his awesomeness over [here](https://kushagragour.in/)

## Screenshot

![notification-logger](./images/image.png)

## Installing
 - Use `npm` or `git clone` to download the module.
   - `npm install notification-logger`
   - `git clone https://github.com/hkirat/notification-logger.git`
 - include `notification-logger.js` or `notification-logger.min.js`
 - Initialise with `logger.init()`

## Methods
-----
* `logger.init` - Initialises the logger
* `logger.log` - Logs the message via a Desktop Notification only
* `console.log` - Logs the message via a Desktop Notification and in the browser console
* `logger.destroy` - Reverts console.log to original functionality

## Browser Support

Works best on latest versions of Google Chrome, Firefox and Safari.

## To Do
 - Add Custom Icon to Notifications
 - Unwrap Objects while Logging them as Desktop Notification

## Credits
 - Icons Made by [http://www.flaticon.com/authors/roundicons](roundicons).
