---
repo: lukeed/webpack-messages
url: 'https://github.com/lukeed/webpack-messages'
homepage: null
starredAt: '2018-02-05T15:20:48Z'
createdAt: '2017-07-28T20:08:48Z'
updatedAt: '2024-05-14T13:22:43Z'
language: JavaScript
license: MIT
branch: master
stars: 247
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:28.941Z'
description: Beautifully format Webpack messages throughout your bundle lifecycle(s)!
tags:
  - console
  - create-react-app
  - error-handling
  - formatter
  - messages
  - prettify
  - pretty-print
  - webpack
  - webpack-plugin
---

# webpack-messages

> Beautifully format Webpack messages throughout your bundle lifecycle(s)!


***Default***

<img src="shots/default.jpg" width="300" />

***Default Error***

<img src="shots/error_default.jpg" width="300" />

***Named Bundles***

<img src="shots/named.jpg" width="300" />

***Named Bundle Error***

<img src="shots/error_named.jpg" width="300" />

***Custom Logger***

<img src="shots/logger.jpg" width="300" />

***Named Bundle Error w/ Custom Logger***

<img src="shots/error_named_logger.jpg" width="300" />


## Install

```
$ npm install webpack-messages --save-dev
```


## Usage

```js
// webpack.config.js
const WebpackMessages = require('webpack-messages');

module.exports = {
  // ...
  plugins: [
    new WebpackMessages({
      name: 'client',
      logger: str => console.log(`>> ${str}`)
    })
  ]
}
```


## API

### WebpackMessages(options)

#### options.name

Type: `String`

Optionally provide a name for your bundle. Strongly recommended when compiling multiple bundles!

#### options.logger

Type: `Function`<br>
Default: `str => console.log(str)`

Replace the default function -- ideal for prepending a symbol or namespace to your messages.

Function receives a (colorized) message `string` as its only parameter.

#### options.onComplete

Type: `Function`

Run a custom function once a bundle has been compiled successfully. If provided, the default success handler will not run.

Function receives a formatted `name` string (or `''`) and the Webpack [`stats`](https://github.com/webpack/docs/wiki/node.js-api#stats) object.


## License

MIT © [Luke Edwards](https://lukeed.com)
