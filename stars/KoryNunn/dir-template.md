---
repo: KoryNunn/dir-template
url: 'https://github.com/KoryNunn/dir-template'
homepage: null
starredAt: '2025-04-07T20:18:55Z'
createdAt: '2014-07-02T07:53:35Z'
updatedAt: '2025-04-07T20:18:55Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:06.860Z'
description: create a directory structure based on a template
tags: []
---

# dir-template

create a directory structure based on a template

## Usage

    dirTemplate(structure[, relativePath, done])

## Example

    var dirTemplate = require('dir-template');

    dirTemplate({
        foo:{
            bar:null,
            things: null
        }
    });

will create the structure:

    foo/
      bar/
      things/
