---
repo: MauriceButler/keyboard-code
url: 'https://github.com/MauriceButler/keyboard-code'
homepage: ''
starredAt: '2014-12-27T03:22:38Z'
createdAt: '2014-03-10T13:23:48Z'
updatedAt: '2014-12-27T03:22:38Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:59.908Z'
description: Watches for a defined set of keyboard inputs then fires a callback
tags: []
---

#keyboard-code

Watches for a defined set of keyboard inputs then fires a callback


##Installation

    npm install keyboard-code


##Usage

    var KeyboardCode = require('keyboard-code');

    new KeyboardCode([13, 13, 13], function(){
        alert('Enter 3 times!');
    });
