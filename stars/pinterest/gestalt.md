---
repo: pinterest/gestalt
url: 'https://github.com/pinterest/gestalt'
homepage: 'https://gestalt.pinterest.systems/'
starredAt: '2018-08-24T04:43:00Z'
createdAt: '2018-02-16T22:17:51Z'
updatedAt: '2025-02-25T19:51:52Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 4280
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:15.395Z'
description: A set of React UI components that supports Pinterest’s design language
tags:
  - design-system
  - javascript
  - react
---

# [Gestalt](https://gestalt.pinterest.systems/) &middot; [![NPM Version](https://img.shields.io/npm/v/gestalt.svg)](https://www.npmjs.com/package/gestalt) [![License](https://img.shields.io/npm/l/gestalt?style=flat)](https://github.com/pinterest/gestalt/blob/master/LICENSE)

Gestalt is Pinterest’s design system. Our system includes a React component library with comprehensive guidelines, best practices, tools, and resources to support designers and engineers delivering a high-quality product.

[Visit the official Gestalt Documentation](https://gestalt.pinterest.systems/)

## Installation

The package can be installed via npm:

```bash
npm i gestalt --save
npm i gestalt-charts --save
npm i gestalt-datepicker --save
```

Or via yarn:

```bash
yarn add gestalt
yarn add gestalt-charts
yarn add gestalt-datepicker
```

## Usage

Gestalt exports each component as ES6 modules and a single, precompiled CSS file:

```js
import { Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import 'gestalt/dist/gestalt-datepicker.css';
```

That syntax is Webpack specific (and will work with Create React App), but you can use Gestalt anywhere that supports ES6 module bundling and global CSS.

## Development

Gestalt is a [multi-project monorepo](https://yarnpkg.com/lang/en/docs/workspaces/). The docs and components are all organized as separate packages that share similar tooling.

Install project dependencies and run tests:

```bash
yarn
yarn test
```

Build and watch Gestalt & run the docs server:

```bash
yarn start
```

Visit [http://localhost:8888/](http://localhost:8888) and click on a component to view the docs.

## Codemods

When a release will cause breaking changes — in usage or in typing — we provide a codemod to ease the upgrade process. Codemods are organized by release in `/packages/gestalt-codemods`.

### Codemod Usage

Clone the Gestalt repo locally if you haven't already. Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt repo): anywhere the component to be updated is used. Example usage for a codebase using TypeScript:

```bash
yarn codemod --parser=tsx -t={relative/path/to/codemod} relative/path/to/your/code.tsx
```

For a dry run to see what the changes will be, add the `-d` (dry run) and `-p` (print output) flags (pipe stdout to a file for easier inspection if you like).

## Releasing

Every commit to master performs a release. As a reviewer, ensure the correct label is attached to every PR. Please follow [semantic versioning](https://semver.org/).

- `patch release`: documentation updates / spelling mistakes in code / internal scripts
- `minor release`: add component / add component props / API change with codemod
- `major release`: backwards incompatible API change without codemod

Example PR title: `Avatar: Add outline prop`

## Typescript Support

Gestalt officiallty supports and maintains Typescript declarations files.

### Issues

Gestalt is Pinterest's open-sourced design system. However, Gestalt's web component library is almost exclusively developed by a 5 engineer team within Pinterest, and our primary customers are Pinterest engineers who use Gestalt. The team’s priority is the needs of our internal Pinterest customers.

We do not have resources to work on features or issues requested only by external developers. We also handle a very large amount of internal support requests, so we do not have the resources to respond to external Github issues.

Pinterest is staying open source, as it's a great resource for the design and engineering community, but we don't provide support to external developers. If you need to get in touch, send us an [email](mailto:designsystems@pinterest.com?subject=Github%20Request%3A).

### Troubleshooting

Take a look at our [FAQ](https://gestalt.pinterest.systems/get_started/faq) section if you run into any development problems.
