---
repo: alanclarke/positions
url: 'https://github.com/alanclarke/positions'
homepage: ''
starredAt: '2016-03-29T19:41:12Z'
createdAt: '2016-03-11T16:42:06Z'
updatedAt: '2023-07-26T14:26:15Z'
language: JavaScript
license: NA
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:29.958Z'
description: A small dom element positioning lib inspired by jquery-ui/position
tags:
  - ceh
  - cmh
  - implement
---

## <img width="350" alt="positions" src="https://cloud.githubusercontent.com/assets/640611/13756080/1928a892-ea16-11e5-9c36-51dafb47fad4.png">

A small dom element positioning lib inspired by jquery-ui/position

## installation
```js
npm install positions
```

## features
- no dependencies
- simple functional api
- well tested in ie9+
- tiny (871 B)

## usage
```js
var positions = require('positions')
```

```js
// positions els 'top left' at targets 'top left'
var css = positions(el, 'top left', target, 'top left')
```

<img width="40" alt="top-left-top-left" src="https://cloud.githubusercontent.com/assets/640611/13719721/07895ab2-e7f2-11e5-8bee-6e8c74abcc7e.png">

```js
// positions els 'center center' at targets 'center center'
var css = positions(el, 'center center', target, 'center center')
```

<img width="40" alt="center-center-center-center" src="https://cloud.githubusercontent.com/assets/640611/13719719/0788243a-e7f2-11e5-943c-fcc580dbcd3f.png">

```js
// positions els bottom left at targets top left
var css = positions(el, 'bottom left', target, 'top left')
```

<img width="40" alt="bottom-left-top-left" src="https://cloud.githubusercontent.com/assets/640611/13742253/c7cee7d8-e9d2-11e5-8cab-aa8b22c7eecc.png">

```js
// positions els bottom center at targets bottom center
var css = positions(el, 'bottom center', target, 'bottom center')
```

<img width="40" alt="bottom-center-bottom-center" src="https://cloud.githubusercontent.com/assets/640611/13719722/0789dc9e-e7f2-11e5-9353-6cba4cd5c7ab.png">


...etc.


## run tests
```js
npm test
```

## browser compatibility
works in all good browsers! (also in ie9+)


## Want to work on this for your day job?

This project was created by the Engineering team at Qubit. As we use open source libraries, we make our projects public where possible.

We’re currently looking to grow our team, so if you’re a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our Engineering site. Don’t have an up to date CV? Just link us your Github profile! Better yet, send us a pull request that improves this project.`
Contact GitHub API Training Shop Blog About
