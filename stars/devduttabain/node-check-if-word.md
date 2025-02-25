---
repo: devduttabain/node-check-if-word
url: 'https://github.com/devduttabain/node-check-if-word'
homepage: null
starredAt: '2022-01-03T18:47:56Z'
createdAt: '2020-02-24T08:46:04Z'
updatedAt: '2023-05-23T07:24:35Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.616Z'
description: null
tags: []
---

# check-if-word

check if the word exist in the language configured, the language could be english or spanish. built on top of check-word by 
[s0c5]<david.barinas.dev@gmail.com>. 

### install

```bash
$ npm install check-if-word
```

### how to use?

```javascript
var checkWord = require('check-if-word'),
    words     = checkWord('en'); // setup the language for check, default is en
    
words.check('dog'); // true
words.check('perro'); // false
words.check('hi'); // true


words.getValidWords(["ajsk", "no", "object", "opal", "perl", "perlpali"]); // [ 'no', 'object', 'opal' ]

...

```

### credits

thanks to repository  [atebits/words](https://github.com/atebits/Words) and [s0c5]<david.barinas.dev@gmail.com>.




