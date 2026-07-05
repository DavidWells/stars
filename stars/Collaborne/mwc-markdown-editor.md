---
repo: Collaborne/mwc-markdown-editor
url: 'https://github.com/Collaborne/mwc-markdown-editor'
homepage: ''
starredAt: '2024-09-17T17:35:07Z'
createdAt: '2020-06-14T10:41:14Z'
updatedAt: '2025-01-04T18:19:13Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:21.141Z'
description: A markdown editor following Material Design spec
tags: []
---

# \<mwc-markdown-editor>

A markdown editor following [Material Design spec](http://material.io/). The editor is based on [Prosemirror](https://prosemirror.net/).

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

![screenshot](doc/screenshot.png)

## Installation
```bash
npm i mwc-markdown-editor
```

## Usage
```html
<script type="module">
  import 'mwc-markdown-editor';
</script>

<mwc-markdown-editor></mwc-markdown-editor>
```

## Linting with ESLint, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint individually as well
```bash
npm run lint:eslint
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint individually as well
```bash
npm run format:eslint
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
