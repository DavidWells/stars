---
repo: KoryNunn/parcss
url: 'https://github.com/KoryNunn/parcss'
homepage: null
starredAt: '2014-12-27T03:02:28Z'
createdAt: '2014-07-31T07:10:59Z'
updatedAt: '2022-06-03T13:36:22Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:00.158Z'
description: simple css parser
tags: []
---

# parcss

A CSS parser that ACTUALLY works...

Removes unused selectors, properties. Combines selectors with duplicate definitions. (sometimes, nieve implementation for now)

## Usage

### CLI

    Usage: parcss [options]

    Options:

      -h, --help                     output usage information
      -v, --version                  output the version number
      -i, --input [file]             Input File
      -i, --output [file]            Output File
      -p, --pretty                   Pretty Print

### Module

Compress some CSS:

    var compressed = parcss.compress(css);

Or you can do each step yourself if you wish:

    var parcss = require('parcss'),
        tokens = parcss.lex(fs.readFileSync('myCoolFile.css')),
        ast = parcss.parse(tokens),
        optimisedDefinitions = parcss.optimise(ast),
        compressed = parcss.render(optimisedDefinitions);
