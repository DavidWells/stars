---
repo: kevva/credit-card-regex
url: 'https://github.com/kevva/credit-card-regex'
homepage: null
starredAt: '2016-10-21T02:46:09Z'
createdAt: '2014-11-22T19:25:04Z'
updatedAt: '2024-08-12T10:52:04Z'
language: JavaScript
license: MIT
branch: master
stars: 79
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:18.040Z'
description: Regular expression for matching credit card numbers
tags: []
---

# credit-card-regex [![Build Status](https://travis-ci.org/kevva/credit-card-regex.svg?branch=master)](https://travis-ci.org/kevva/credit-card-regex)

> Regular expression for matching credit card numbers


## Install

```
$ npm install credit-card-regex
```


## Usage

```js
const creditCardRegex = require('credit-card-regex');

creditCardRegex().test('6011881485017922 foo bar');
//=> true

creditCardRegex({exact: true}).test('6011881485017922 foo bar');
//=> false

creditCardRegex({exact: true}).test('6011881485017922');
//=> true

'foo 6011881485017922 bar 5441068611005540'.match(creditCardRegex());
//=> ['6011881485017922', '5441068611005540']
```


## API

### creditCardRegex(options)

Returns a regex for matching credit card numbers. It supports credit card numbers from the following vendors:

* American Express
* Diners Club
* Discover
* JCB
* Maestro
* MasterCard
* VISA

#### options

##### exact

Type: `Boolean`<br>
Default: `false` *(Matches any credit card number in a string)*

Only match an exact string. Useful with `RegExp#test` to check if a string is a credit card number.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
