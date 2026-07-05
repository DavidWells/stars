---
repo: yankouskia/is-incognito-mode
url: 'https://github.com/yankouskia/is-incognito-mode'
homepage: 'https://yankouskia.github.io/is-incognito-mode/example/index.html'
starredAt: '2019-06-02T03:00:12Z'
createdAt: '2019-05-20T20:10:37Z'
updatedAt: '2024-02-27T23:55:08Z'
language: JavaScript
license: MIT
branch: master
stars: 129
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:36.400Z'
description: "\U0001F464Function to identify whether browser is in incognito mode \U0001F440"
tags:
  - browser
  - incognito
  - incognito-mode
  - javascript
  - private-api
  - private-mode
  - tricky
---

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yankouskia/is-incognito-mode/pulls) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yankouskia/is-incognito-mode/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/is-incognito-mode.png?downloads=true)](https://www.npmjs.com/package/is-incognito-mode)

# is-incognito-mode

👤Function to identify whether browser is in incognito mode 👀

## How to use

To install library:

```sh
# yarn
yarn add is-incognito-mode

# npm
npm install is-incognito-mode --save
```

```js
// ES6 modules
import isIncognito from 'is-incognito-mode';

// CommonJS modules
const isIncognito = require('is-incognito-mode').default;

/*
  Function returns Promise, which could be:
  - resolved with true, if Incognito mode is opened
  - resolved with false, if regular window is opened
  - rejected if no possibility to identify
*/
isIncognito()
  .then(isPrivate => {
    if (isPrivate) {
      alert('There is no porn! Why are you using Incognito mode?');
    } else {
      console.log('Incognito mode is NOT activated')
    }
  })
  .catch(e => {
    console.log(e.message);
  })
```


## Demo

[DEMO can be found here](https://yankouskia.github.io/is-incognito-mode/example/index.html)


Incognito Window            |  Regular Window
:-------------------------:|:-------------------------:
<img src="./resources/private.png" data-canonical-src="./resources/private.png" width="300" />  |  <img src="./resources/public.png" data-canonical-src="./resources/public.png" width="300" />


## API

`isIncognito: Promise<boolean>`

Result `Promise` is
  - resolved with `true`, if Incognito mode is opened.
  - resolved with `false`, if regular window is opened
  - rejected if no possibility to identify


## Contributing

`is-incognito-mode` is open-source library, opened for contributions


### License

`is-incognito-mode` is [MIT licensed](https://github.com/yankouskia/is-incognito-mode/blob/master/LICENSE)
