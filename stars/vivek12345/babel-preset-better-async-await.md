---
repo: vivek12345/babel-preset-better-async-await
url: 'https://github.com/vivek12345/babel-preset-better-async-await'
homepage: ''
starredAt: '2019-04-23T03:15:28Z'
createdAt: '2018-12-18T03:56:20Z'
updatedAt: '2022-08-07T12:20:02Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:39.866Z'
description: Babel preset for babel plugin better async await
tags:
  - babel
  - babel-plugin
  - babel-preset
  - better-async-await
---

# babel-preset-better-async-await

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> Babel preset for the babel-plugin-better-async-await plugin.
> [babel-plugin-better-async-await](https://github.com/vivek12345/babel-plugin-better-async-await).

## Install

```sh
$ npm install --save-dev babel-preset-better-async-await
```

or with `yarn`

```sh
$ yarn add babel-preset-better-async-await --dev
```

## ⭐ Usage

### Via `.babelrc` (Recommended) without options

**.babelrc**

```json
{
  "presets": ["better-async-await"]
}
```

> If you are using babel-preset-env or @babel/env or babel-plugin-transform-async-to-generator, then the order of presets matter

```json
{
  "presets": ["better-async-await", "@babel/env"]
}
```

### Via `.babelrc` (Recommended) with options

**.babelrc**

```json
{
  "presets": [
    [
      "better-async-await",
      {
        "mode": "strict"
      }
    ]
  ]
}
```

> If you are using babel-preset-env or @babel/env or babel-plugin-transform-async-to-generator, then the order of presets matter

```json
{
  "presets": [
    [
      "better-async-await",
      {
        "mode": "strict"
      }
    ],
    ["@babel/env"]
  ]
}
```

### Via CLI

```sh
babel --presets better-async-await script.js
```

> If you are using babel-preset-env or @babel/env or babel-plugin-transform-async-to-generator, then the order of presets matter

```sh
babel --presets better-async-await @babel/env script.js
```

### Via Node API

without options:

```js
require("babel-core").transform("code", {
  presets: ["better-async-await"]
});
```

with option:

```js
require("babel-core").transform("code", {
  presets: [
    [
      "better-async-await",
      {
        mode: "strict"
      }
    ]
  ]
});
```

> If you are using babel-preset-env or @babel/env or babel-plugin-transform-async-to-generator, then the order of presets matter

without options:

```js
require("babel-core").transform("code", {
  presets: ["better-async-await", "@babel/env"]
});
```

with option:

```js
require("babel-core").transform("code", {
  presets: [
    [
      "better-async-await",
      {
        mode: "strict"
      }
    ],
    ["@babel/env"]
  ]
});
```

## Options

### `mode`

- `strict`:
  In this mode variable names on the left of await statement should match the following rule:-

```js
const [err, resp] = await api.getData(5);
// ...
```

_In Strict Mode_

- Variable name on the left for error should be `err`
- Variable name on the left for response should be `resp`

_In non-strict mode_

- Variable names on the left can be `anything`

## Motivation and Idea

This babel plugin is inspired from the idea of this post https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/ written by - [Dima Grossman](https://twitter.com/dimagrossman)

> In async/await functions we often use try/catch blocks to catch errors.

For example:-

```javascript
async function completeApplicationFlow() {
  // wait for get session status api to check the status
  let response;
  try {
    response = await getSessionStatusApi();
  } catch (err) {
    // if error show a generic error message
    return handleError(err);
  }

  // wait for getting next set of questions api
  try {
    response = await getNextQuestionsApi();
  } catch (err) {
    // if error show a generic error message
    return handleError(err);
  }

  // finally submit application
  try {
    response = await submitApplication();
  } catch (err) {
    // if error show a generic error message
    return handleError(err);
  }
}
```

> Approach inspired from the blog and a different way of doing this could be:-

```javascript
async function completeApplicationFlow() {
  // wait for get session status api to check the status
  let err, response;
  // wait for get session status api to check the status
  [err, response] = await getSessionStatusApi();
  // if error show a generic error message
  if (err) return handleError(err);
  // call getNextQuestion Api
  [err, response] = await getNextQuestionsApi();
  // if error show a generic error message
  if (err) return handleError(err);
  // finally submit application
  [err, response] = this.submitApplication();
  if (err) return handleError(err);
}
```

## 📒 Examples of using it in your code

**Before**

```javascript
async function test() {
  let resp;
  try {
    resp = await api.getData(5);
  } catch(err)
    handleError();
  }
}
```

**After**

```javascript
async function test() {
  const [err, resp] = await api.getData(5);
  if (err) handleError();
  // else do something with the response
}
```

**Before**

```javascript
async function test() {
  let resp;
  try {
    resp = await getData;
  } catch(err)
    handleError();
  }
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
```

**After**

```javascript
async function test() {
  const [err, resp] = await getData;
  if (err) handleError();
  // else do something with the response
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
```

**Before**

```javascript
async function test() {
  let resp;
  try {
    resp = await fetch('http://some-rest-endpoint');
  } catch(err)
    handleError();
  }
}
```

**After**

```javascript
async function test() {
  const [err, resp] = await fetch("http://some-rest-endpoint");
  if (err) handleError();
  // else do something with the response
}
```

## 📒 Babel Tranformation

**In**

```javascript
async function test() {
  const [err, resp] = await fetch("http://some-rest-endpoint");
}
```

**Out**

```javascript
async function test() {
  const [err, resp] = await fetch("http://some-rest-endpoint")
    .then(resp => {
      return [null, resp];
    })
    .catch(error => {
      return [error];
    });
}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4931048?v=4" width="100px;"/><br /><sub><b>Vivek Nayyar</b></sub>](https://www.viveknayyar.in/)<br />[💬](#question-vivek12345 "Answering Questions") [🐛](https://github.com/vivek12345/babel-preset-better-async-await/issues?q=author%3Avivek12345 "Bug reports") [💻](https://github.com/vivek12345/babel-preset-better-async-await/commits?author=vivek12345 "Code") [🎨](#design-vivek12345 "Design") [📖](https://github.com/vivek12345/babel-preset-better-async-await/commits?author=vivek12345 "Documentation") [💡](#example-vivek12345 "Examples") [🤔](#ideas-vivek12345 "Ideas, Planning, & Feedback") [📦](#platform-vivek12345 "Packaging/porting to new platform") [🔌](#plugin-vivek12345 "Plugin/utility libraries") [👀](#review-vivek12345 "Reviewed Pull Requests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
