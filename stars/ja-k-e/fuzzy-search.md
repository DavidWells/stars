---
repo: ja-k-e/fuzzy-search
url: 'https://github.com/ja-k-e/fuzzy-search'
homepage: ''
starredAt: '2022-02-24T07:29:04Z'
createdAt: '2016-09-18T19:06:10Z'
updatedAt: '2024-12-08T09:19:12Z'
language: JavaScript
license: MIT
branch: main
stars: 71
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:08.889Z'
description: A JavaScript plugin to find exact and fuzzy matches in a library of strings.
tags: []
---

# Fuzzy Search
A JavaScript plugin to find exact and fuzzy matches in a library of strings.

[![Dependency Status](https://david-dm.org/jakealbaugh/fuzzy-search.svg)](https://david-dm.org/jakealbaugh/fuzzy-search)
[![devDependency Status](https://david-dm.org/jakealbaugh/fuzzy-search/dev-status.svg)](https://david-dm.org/jakealbaugh/fuzzy-search#info=devDependencies)

Using [Generator Babel Boilerplate](https://github.com/babel/generator-babel-boilerplate).

# Example
[codepen.io/jakealbaugh/pen/wzzrmX](http://codepen.io/jakealbaugh/pen/wzzrmX/)

# Overview
Fuzzy Search provides search results from a search term (`term`) and an array of strings or objects (`library`). `FS.search('lo', ['hello', 'lingo'])`.

# Exact / Fuzzy
So that you can prioritize types of matches, fuzzy search returns two arrays of matches, `exact` and `fuzzy`. `exact` matches contain the exact search term, ordered by proximity to the beginning of the string in which it was found. `fuzzy` matches contain the search term even if there are characters in between.

For example, if I search for `'jake'` and have two strings to search, `['jakealbaugh', 'jackeagle']`, there is an exact match '**jake**albaugh' and fuzzy match '**ja**c**ke**agle'.

# Basic Usage
In its most basic form, `FS.search` uses a search term and a simple array of strings.

## Input
```js
FS.search('lo', ['hello', 'lingo']);
```

## Output
```js
{
  success: true,
  count: 2,
  term: 'lo',
  exact: [
    {
      id: 1,
      string: 'hello',
      _matchType: 'exact',
      _substrings: [
        { match: false, str: 'hel' },
        { match: true,  str: 'lo' }
      ],
      _score: 0
    }
  ],
  fuzzy: [
    {
      id: 2,
      string: 'lingo',
      _matchType: 'fuzzy',
      _substrings: [
        { match: true,  str: 'l' },
        { match: false, str: 'ing' },
        { match: true,  str: 'o' }
      ],
      _score: 1
    }
  ],
  _regex: {
    exact: '(.+)?(lo)(.+)?$',
    fuzzy: '(.+)?(l)(.+)?(o)(.+)?$'
  }
}
```

## Substrings
As you can see, a match has a handful of properties returned with it as well. The most important of these properties is the `_substrings` array. What good is a match if you have no way of displaying it? You can use this value to display the match in a UI by highlighting the `substrings` with a `match` value of `true`. 

Match `_score` is relative to the match type, so the score of a `fuzzy` match has no relation to the score of an `exact` one.


# Usage with Objects
Chances are your library requires some sort of identification or has other properties. `FS` will create basic `ids` for you if you pass in a plain array of strings, but you can use objects if you want to preserve your own data.

The base schema for a fuzzy object is an `id` and `string` value. You can leave out `id` if you don't care or want to handle identification yourself, but a `string` value is required and must be the term that `FS` searches. You can pass around any other attributes you want with the `fuzzySearch` object, but the result will overwrite reserved attributes (denoted by an `_`).

## Input
```js
var string_lib = [
  { id: 123, string: 'hello', YOUR_ATTR: false },
  { id: 456, string: 'lingo', YOUR_ATTR: false }
];
FS.search('lo', string_lib);
```

The output maintains the fluff and adds the rest of the report:

## Output
```js
{
  success: true,
  count: 2,
  term: 'lo',
  exact: [
    {
      id: 123,
      string: 'hello',
      YOUR_ATTR: false,
      _matchType: 'exact',
      _substrings: [
        { match: false, str: 'hel' },
        { match: true,  str: 'lo' }
      ],
      _score: 0
    }
  ],
  fuzzy: [
    {
      id: 456,
      string: 'lingo',
      YOUR_ATTR: false,
      _matchType: 'fuzzy',
      _substrings: [
        { match: true,  str: 'l' },
        { match: false, str: 'ing' },
        { match: true,  str: 'o' }
      ],
      _score: 1
    }
  ],
  _regex: {
    exact: '(.+)?(lo)(.+)?$',
    fuzzy: '(.+)?(l)(.+)?(o)(.+)?$'
  }
}
```
