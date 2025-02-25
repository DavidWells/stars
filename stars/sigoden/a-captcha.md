---
repo: sigoden/a-captcha
url: 'https://github.com/sigoden/a-captcha'
homepage: null
starredAt: '2022-02-27T06:48:06Z'
createdAt: '2020-12-13T15:37:24Z'
updatedAt: '2025-02-21T15:53:18Z'
language: TypeScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:05.259Z'
description: A Lightweight Pure JavaScript Captcha for Node.js
tags: []
---

# a-captcha

A Lightweight Pure JavaScript Captcha for Node.js. Inspired By [trek-captcha](https://github.com/trekjs/captcha).

## Installation

```
$ npm install a-captcha --save
```

## Examples

![captcha](https://github.com/sigoden/a-captcha/raw/master/examples/captcha.png)

```js
const fs = require("fs");
const { captcha } = require("a-captcha");

async function main() {
  const { text, buffer } = await captcha({ length: 5 });
  fs.writeFileSync("captcha.png", buffer);
  console.log(text);
}

main();
```
