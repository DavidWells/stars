---
repo: mohsen1/yawn-yaml
url: 'https://github.com/mohsen1/yawn-yaml'
homepage: 'https://azimi.me/yawn-yaml/demo/index.html'
starredAt: '2022-01-24T20:55:58Z'
createdAt: '2015-09-23T00:51:39Z'
updatedAt: '2024-12-30T21:00:48Z'
language: TypeScript
license: MIT
branch: master
stars: 104
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.743Z'
description: YAML parser that preserves comments and styling
tags: []
---

# YAWN YAML 🥱

YAML parser that preserves comments and styling

**[Live Demo](http://azimi.me/yawn-yaml/demo/index.html)**

## Usage

```ts
import YAWN from 'yawn-yaml';

let str = `
# my comment
value: 1 # the value is here!
`;

let yawn = new YAWN(str);

// update the `json` property
yawn.json = { value: 2 };

// value in `yawn.yaml` is now changed.
// with comments and styling preserved.
console.log(yawn.yaml); // =>
// # my comment
// value: 2 # the value is here!
```

## Installation

Use npm or yarn to install [`yawn-yaml`](https://www.npmjs.com/package/yawn-yaml) package

```bash
npm install --save yawn-yaml
```

```bash
yarn add yawn-yaml
```

## Development

To install dependencies run:

```bash
yarn install
```

To run tests continuously and watch for changes

```bash
yarn start
```

To run the test run:

```bash
yarn test
```

## License

[MIT](./LICENSE)
