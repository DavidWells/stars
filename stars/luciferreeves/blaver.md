---
repo: luciferreeves/blaver
url: 'https://github.com/luciferreeves/blaver'
homepage: 'https://blaver.dev'
starredAt: '2022-01-08T00:55:23Z'
createdAt: '2022-01-06T16:35:08Z'
updatedAt: '2025-02-11T15:51:32Z'
language: JavaScript
license: MIT
branch: master
stars: 111
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:22.742Z'
description: >-
  A JavaScript library built on top of the Faker.JS library. It generates
  massive amounts of fake data in the browser and node.js.
tags:
  - bluffmaster
  - faker
  - faker-generator
  - fakerjs
  - javascript
  - javascript-library
---

# Update: Project Moved to [`faker`](https://github.com/faker-js/faker)

For the best interest of the community, I am merging this project with [`faker`](https://github.com/faker-js/faker). [See Discussion](https://github.com/faker-js/faker/discussions/165) regarding this decision. The NPM package will be deprecated from now on and I will continue to contribute to [`faker`](https://github.com/faker-js/faker).

Thank you.

<p align="center">
  <img src="https://raw.githubusercontent.com/luciferreeves/blaver/master/logos/logo-96.png">
</p>

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/luciferreeves/blaver/Build) ![npm](https://img.shields.io/npm/v/blaver) ![NPM](https://img.shields.io/npm/l/blaver) ![GitHub issues](https://img.shields.io/github/issues-raw/luciferreeves/blaver) ![GitHub deployments](https://img.shields.io/github/deployments/luciferreeves/blaver/github-pages?label=JSDoc%20Deployment) [![Coverage Status](https://coveralls.io/repos/github/luciferreeves/blaver/badge.svg?branch=master)](https://coveralls.io/github/luciferreeves/blaver?branch=master) ![npm](https://img.shields.io/npm/dw/blaver)

# Blaver - generate massive amounts of fake data in the browser and node.js

Blaver is a JavaScript library built on top of the [Faker.JS](https://github.com/marak/Faker.js) library. It generates massive amounts of fake data in the browser and node.js. 

Fake data is useful when building and testing our application. Blaver can generate fake data for various areas, including address, commerce, company, date, finance, image, random, or name.

## What happened to the original faker.js?

This project was originally created and hosted at https://github.com/marak/Faker.js/ - however around 4th Jan, 2022 - the author decided to delete the repository along with the code, for unknown reasons.

Blaver is a fork of the original Faker.js library. The original library was created by [Marak Squires](https://github.com/marak/) in 2011. Blaver aims to maintain the original library's functionality and add new features. 

You can also access unofficial Faker.js documentation at [https://fakerjsdocs.netlify.com/](https://fakerjsdocs.netlify.com/)

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/blaver@6.6.7/dist/blaver.min.js"></script>
```

### Via NPM
```bash
npm i blaver
```

<!-- [![Build Status](https://travis-ci.org/Marak/faker.js.svg?branch=master)](https://travis-ci.org/Marak/faker.js) [![Coverage Status](https://coveralls.io/repos/github/Marak/faker.js/badge.svg?branch=master)](https://coveralls.io/github/Marak/faker.js?branch=master)

[![npm version](https://badge.fury.io/js/faker.svg)](http://badge.fury.io/js/faker)

[![OpenCollective](https://opencollective.com/fakerjs/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/fakerjs/sponsors/badge.svg)](#sponsors) -->

<!-- ## Demo

[https://rawgit.com/Marak/faker.js/master/examples/browser/index.html](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html) -->

## Usage

### Browser

```html
<script>
  var randomName = blaver.name.findName(); // Caitlyn Kerluke
  var randomEmail = blaver.internet.email(); // Rusty@arne.info
  var randomCard = blaver.helpers.createCard(); // random contact card containing many properties
</script>
```

### Node.js

```js
var blaver = require('blaver');

var randomName = blaver.name.findName(); // Rowan Nikolaus
var randomEmail = blaver.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = blaver.helpers.createCard(); // random contact card containing many properties
```

## API

### JSDoc API Browser

You can browse all API methods by going to the [JSDoc API Browser](http://thatcomputerscientist.com/blaver/).

### API Methods

* address
  * zipCode
  * zipCodeByState
  * city
  * cityPrefix
  * citySuffix
  * cityName
  * streetName
  * streetAddress
  * streetSuffix
  * streetPrefix
  * secondaryAddress
  * county
  * country
  * countryCode
  * state
  * stateAbbr
  * latitude
  * longitude
  * direction
  * cardinalDirection
  * ordinalDirection
  * nearbyGPSCoordinate
  * timeZone
* animal
  * dog
  * cat
  * snake
  * bear
  * lion
  * cetacean
  * horse
  * bird
  * cow
  * fish
  * crocodilia
  * insect
  * rabbit
  * type
* commerce
  * color
  * department
  * productName
  * price
  * productAdjective
  * productMaterial
  * product
  * productDescription
* company
  * suffixes
  * companyName
  * companySuffix
  * catchPhrase
  * bs
  * catchPhraseAdjective
  * catchPhraseDescriptor
  * catchPhraseNoun
  * bsAdjective
  * bsBuzz
  * bsNoun
* database
  * column
  * type
  * collation
  * engine
* datatype
  * number
  * float
  * datetime
  * string
  * uuid
  * boolean
  * hexaDecimal
  * json
  * array
  * bigInt
* date
  * past
  * future
  * between
  * betweens
  * recent
  * soon
  * month
  * weekday
* fake
* finance
  * account
  * accountName
  * routingNumber
  * mask
  * amount
  * transactionType
  * currencyCode
  * currencyName
  * currencySymbol
  * bitcoinAddress
  * litecoinAddress
  * creditCardNumber
  * creditCardCVV
  * ethereumAddress
  * iban
  * bic
  * transactionDescription
* git
  * branch
  * commitEntry
  * commitMessage
  * commitSha
  * shortSha
* hacker
  * abbreviation
  * adjective
  * noun
  * verb
  * ingverb
  * phrase
* helpers
  * randomize
  * slugify
  * replaceSymbolWithNumber
  * replaceSymbols
  * replaceCreditCardSymbols
  * repeatString
  * regexpStyleStringParse
  * shuffle
  * uniqueArray
  * mustache
  * createCard
  * contextualCard
  * userCard
  * createTransaction
* image
  * image
  * avatar
  * imageUrl
  * abstract
  * animals
  * business
  * cats
  * city
  * food
  * nightlife
  * fashion
  * people
  * nature
  * sports
  * technics
  * transport
  * dataUri
  * lorempixel
  * unsplash
  * lorempicsum
* internet
  * avatar
  * email
  * exampleEmail
  * userName
  * protocol
  * httpMethod
  * url
  * domainName
  * domainSuffix
  * domainWord
  * ip
  * ipv6
  * port
  * userAgent
  * color
  * mac
  * password
* lorem
  * word
  * words
  * sentence
  * slug
  * sentences
  * paragraph
  * paragraphs
  * text
  * lines
* mersenne
  * rand
  * seed
  * seed_array
* music
  * genre
* name
  * firstName
  * lastName
  * middleName
  * findName
  * jobTitle
  * gender
  * prefix
  * suffix
  * title
  * jobDescriptor
  * jobArea
  * jobType
* phone
  * phoneNumber
  * phoneNumberFormat
  * phoneFormats
* random
  * number
  * float
  * arrayElement
  * arrayElements
  * objectElement
  * uuid
  * boolean
  * word
  * words
  * image
  * locale
  * alpha
  * alphaNumeric
  * hexaDecimal
* system
  * fileName
  * commonFileName
  * mimeType
  * commonFileType
  * commonFileExt
  * fileType
  * fileExt
  * directoryPath
  * filePath
  * semver
* time
  * recent
* unique
* vehicle
  * vehicle
  * manufacturer
  * model
  * type
  * fuel
  * vin
  * color
  * vrm
  * bicycle
* word
  * adjective
  * adverb
  * conjunction
  * interjection
  * noun
  * preposition
  * verb


### Blaver.fake()

Blaver contains a super useful generator method `Blaver.fake` for combining faker API methods using a mustache string format.

**Example:**


``` js
console.log(blaver.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
// outputs: "Marks, Dean Sr."
```


This will interpolate the format string with the value of methods `name.lastName()`, `name.firstName()`, and `name.suffix()`

## Localization

Blaver has support for multiple localities – ported directly from the orginal faker.js library (version `v2.0.0`).

The default language locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
blaver.locale = "de";
```

 * az
 * ar
 * cz
 * de
 * de_AT
 * de_CH
 * en
 * en_AU
 * en_AU_ocker
 * en_BORK
 * en_CA
 * en_GB
 * en_IE
 * en_IND
 * en_US
 * en_ZA
 * es
 * es_MX
 * he
 * fa
 * fi
 * fr
 * fr_CA
 * fr_CH
 * ge
 * hy
 * hr
 * id_ID
 * it
 * ja
 * ko
 * mk
 * nb_NO
 * ne
 * nl
 * nl_BE
 * pl
 * pt_BR
 * pt_PT
 * ro
 * ru
 * sk
 * sv
 * tr
 * uk
 * vi
 * zh_CN
 * zh_TW


### Individual Localization Packages

Blaver supports incremental loading of locales.

By default, requiring `blaver` will include *all* locale data.

In a production environment, you may only want to include the locale data for a specific set of locales.

```js
// loads only de locale
var blaver = require('blaver/locale/de');
```

## Setting a randomness seed

If you want consistent results, you can set your own seed:

```js
blaver.seed(123);

var firstRandom = blaver.random.number();

// Setting the seed again resets the sequence.
blaver.seed(123);

var secondRandom = blaver.random.number();

console.log(firstRandom === secondRandom);
```

## Tests

```shell
npm install .
make test
```

You can view a code coverage report generated in coverage/lcov-report/index.html.

## Building Blaver

Blaver uses [gulp](http://gulpjs.com/) to automate its build process. Each build operation is a separate task which can be run independently.

### Browser Bundle

```shell
npm run browser
```

### Building JSDocs

[JSDOC](https://jsdoc.app/) v3 HTML API documentation

```shell
npm run jsdoc
```

### Building Readme

The `Readme.md` file for `blaver` is automatically generated and should not be modified directly. All updates to `Readme.md` should be performed in `./build/src/docs.md` and then the build script should be run.

```shell
npm run readme
```

## Maintainers

### Kumar Priyansh

Blaver - Copyright (c) 2022 - Present

https://github.com/luciferreeves/blaver

https://npmjs.com/package/blaver

### Marak Squires

faker.js - Copyright (c) 2011 - 2022

http://github.com/marak/faker.js/

faker.js was inspired by and has used data definitions from:

 * <https://github.com/stympy/faker/> - Copyright (c) 2007-2010 Benjamin Curtis
 * <http://search.cpan.org/~jasonk/Data-Faker-0.07/> - Copyright 2004-2005 by Jason Kohles



<!-- ## Version Release Schedule

faker.js is a popular project used by many organizations and individuals in production settings. Major and Minor version releases are generally on a monthly schedule. Bugs fixes are addressed by severity and fixed as soon as possible.

If you require the absolute latest version of `faker.js` the `master` branch @ <http://github.com/marak/faker.js/> should always be up to date and working. -->

<!--

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/fakerjs#backer)]

<a href="https://opencollective.com/fakerjs/backer/0/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/1/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/2/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/3/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/4/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/5/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/6/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/7/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/8/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/9/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/10/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/11/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/12/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/13/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/14/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/15/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/16/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/17/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/18/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/19/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/20/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/21/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/22/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/23/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/24/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/25/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/26/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/27/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/28/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/backer/29/website" target="_blank"><img src="https://opencollective.com/fakerjs/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/fakerjs#sponsor)]

<a href="https://opencollective.com/fakerjs/sponsor/0/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/1/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/2/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/3/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/4/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/5/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/6/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/7/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/8/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/9/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/10/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/11/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/12/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/13/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/14/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/15/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/16/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/17/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/18/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/19/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/20/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/21/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/22/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/23/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/24/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/25/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/26/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/27/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/28/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/fakerjs/sponsor/29/website" target="_blank"><img src="https://opencollective.com/fakerjs/sponsor/29/avatar.svg"></a> -->
