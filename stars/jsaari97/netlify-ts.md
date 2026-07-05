---
repo: jsaari97/netlify-ts
url: 'https://github.com/jsaari97/netlify-ts'
homepage: ''
starredAt: '2024-02-02T22:21:55Z'
createdAt: '2020-11-15T20:23:34Z'
updatedAt: '2024-02-02T22:21:56Z'
language: TypeScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:37.462Z'
description: Turn your Netlify CMS collections into TypeScript types!
tags:
  - netlify
  - typescript
---

# Netlify CMS Type Generator

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fjsaari97%2Fnetlify-ts%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/jsaari97/netlify-ts/goto?ref=master)
![Supported Node versions](https://img.shields.io/node/v/netlify-ts)
[![Code coverage](https://img.shields.io/codecov/c/gh/jsaari97/netlify-ts)](https://app.codecov.io/gh/jsaari97/netlify-ts/)
![Project license](https://img.shields.io/npm/l/netlify-ts)

**Turn your Netlify CMS collections into TypeScript types!**

<br />

This package generates a [TypeScript](https://www.typescriptlang.org/) schema of your [Netlify CMS](https://www.netlifycms.org/) content collections to be consumed by frontend apps for better type support.

# Features

- Primitive types, e.g. `string`, `number` and `boolean`
- Extract object widgets into own type interfaces
- Single and nested lists
- Multi-select and single option values
- Optional fields
- Unknown widgets resolve to `any` type
- Relation fields

# Installation

```bash
npm install -D netlify-ts
```

# Usage

## CLI

The main method of usage is through the command-line. Having installed the package either globally or in project's `devDependencies`, simply call `netlify-ts` with a parameter pointing to your Netlify CMS `config.yml` file.

```bash
npx netlify-ts path/to/config.yml
```

This generates a `netlify-types.ts` file in the project root containing types for your Netlify CMS collections.

### Custom output location

You can also specify a custom output location by providing a second optional parameter. Omitting the filename outputs a file in the given directory with the default filename (`netlify-types.ts`).

```bash
npx netlify-ts config.yml src/my-types.ts
```

## Programmatically

In case the CLI doesn't suit your workflow or you need to invoke the type generation inside your code, the project exposes a function that returns the generated types as a string.

### Config file

```javascript
const fs = require("fs");
const createNetlifyTypes = require("netlify-ts");

const types = createNetlifyTypes("config.yml");
fs.writeFileSync("cms-types.ts", types);
```

### Config object

```javascript
const fs = require("fs");
const createNetlifyTypes = require("netlify-ts");

const cmsConfig = { collections: [ ... ] };

const types = createNetlifyTypes(cmsConfig);
fs.writeFileSync("cms-types.ts", types);
```

# Options

| Option     | Default | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| label      | `true`  | Use 'label_singular' or 'label' as type name |
| capitalize | `false` | Capitalize type names                        |
| delimiter  | `_`     | Type name delimiter, e.g. 'Posts_Author'     |

## CLI example

```bash
npx netlify-ts config.yml --capitalize
```

### Code example

```javascript
createNetlifyTypes("config.yml", { capitalize: true });
```

# License

MIT
