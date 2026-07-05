---
repo: sindresorhus/get-emails
url: 'https://github.com/sindresorhus/get-emails'
homepage: null
starredAt: '2015-05-28T23:13:31Z'
createdAt: '2014-09-07T10:22:04Z'
updatedAt: '2025-01-07T20:11:01Z'
language: JavaScript
license: MIT
branch: main
stars: 58
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:42.446Z'
description: Get all email addresses in a string
tags: []
---

# get-emails

> Get all email addresses in a string

## Install

```
$ npm install get-emails
```

## Usage

```js
import getEmails from 'get-emails';

const text = 'Lorem ipsum dolor, sindresorhus@gmail.com consectetuer unicorn@rainbow.cake elit.';

getEmails(text);
//=> Set {'sindresorhus@gmail.com', 'unicorn@rainbow.cake'}
```

If the string comes from user input, it's up to you to limit it to some reasonable length to prevent abuse.

## Related

- [get-emails-cli](https://github.com/sindresorhus/get-emails-cli) - CLI for this module
