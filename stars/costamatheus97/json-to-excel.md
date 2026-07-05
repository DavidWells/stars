---
repo: costamatheus97/json-to-excel
url: 'https://github.com/costamatheus97/json-to-excel'
homepage: null
starredAt: '2022-06-30T19:32:26Z'
createdAt: '2022-06-29T18:55:33Z'
updatedAt: '2022-07-04T16:40:31Z'
language: JavaScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:39.462Z'
description: null
tags: []
---

<h1 align="center">Welcome to @costamatheus97/json-to-excel 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@costamatheus97/json-to-excel" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@costamatheus97/json-to-excel.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/txpsss" target="_blank">
    <img alt="Twitter: txpsss" src="https://img.shields.io/twitter/follow/txpsss.svg?style=social" />
  </a>
</p>

> Generate an excel file or workbook from your json data

## Install

```sh
yarn install @costamatheus97/json-to-excel
```

## Usage

- Generating an Excel file

```js
const { createLocalFile } = require("@costamatheus97/json-to-excel");

await createLocalFile("path/to/folder", "workbook-name", [
  {
    name: "Matheus",
    age: 25,
  },
  {
    name: "Joseph",
    age: 54,
  },
]);
```

- Generating an Excel Workbook

```js
const { createWorkbook } = require("@costamatheus97/json-to-excel");

const workbook = await createWorkbook("workbook-name", [
  {
    name: "Matheus",
    age: 25,
  },
  {
    name: "Joseph",
    age: 54,
  },
]);
```

## Author

👤 **Matheus Costa**

- Website: https://dev.to/costamatheus97
- Twitter: [@txpsss](https://twitter.com/txpsss)
- Github: [@costamatheus97](https://github.com/costamatheus97)
- LinkedIn: [@costamatheus97](https://linkedin.com/in/costamatheus97)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/costamatheus97/json-to-excel/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
