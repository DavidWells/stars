---
repo: funkjunky/mdvariables
url: 'https://github.com/funkjunky/mdvariables'
homepage: null
starredAt: '2016-04-01T00:20:56Z'
createdAt: '2015-09-04T21:43:51Z'
updatedAt: '2019-02-06T17:36:04Z'
language: JavaScript
license: GPL-2.0
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:29.653Z'
description: Allows the addition of variables in your markdown
tags: []
---

# mdvariables
Allows the addition of variables in your markdown

npm install --save mdvariables

Usage:

````javascript
    var MdVariables = require('mdvariables');

    md.use(MdVariables(function() {
        return {title: $('title').val()};
    });
    //In your mark up add "@title" to replicate what is in your title input.
````

I personally use this so I only have to write the title of my blog once in the title, and reuse that value in the header markdown
