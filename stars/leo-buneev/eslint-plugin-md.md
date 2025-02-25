---
repo: leo-buneev/eslint-plugin-md
url: 'https://github.com/leo-buneev/eslint-plugin-md'
homepage: ''
starredAt: '2021-01-21T23:43:23Z'
createdAt: '2020-03-14T15:55:31Z'
updatedAt: '2023-06-19T19:01:56Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:05.522Z'
description: Allows you to lint markdown code in your *.md files.
tags:
  - eslint
  - eslint-plugin
  - eslintplugin
  - markdown
  - md
  - remark
  - remark-lint
---

# eslint-plugin-md

An ESLint plugin to lint and fix markdown files. It uses amazing [remark-lint](https://github.com/remarkjs/remark-lint)
under the hood. Also enables using `prettier` to automatically format your markdown files right from `eslint`!

## Motivation

ESLint is a tool for linting Javascript. There is another plugin called `eslint-plugin-markdown`, however it is still
only linting Javascript parts inside `*.md` files, and leaves Markdown itself untouched.

Wouldn't it be cool, if we could use ESLint to enforce style of Markdown itself? That is what this plugin is for!

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
$ npm i eslint --save-dev
# or
$ yarn add -D eslint
```

Next, install `eslint-plugin-md`:

```bash
$ npm install eslint-plugin-md --save-dev
# or
$ yarn add -D eslint-plugin-md
```

**Note:** If you installed ESLint globally (using the `npm -g` or `yarn global`) then you must also install
`eslint-plugin-md` globally.

## Usage

Add `plugin:md/recommended` config to `extends` section of your your `.eslintrc` configuration file

```js
// .eslintrc.js
module.exports = {
  extends: ['plugin:md/recommended'],
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
    },
  ],
}
```

And this is it! By default it will apply all rules from
[Markdown style guide](https://github.com/remarkjs/remark-lint/tree/master/packages/remark-preset-lint-markdown-style-guide).

**Note:** By default ESLint won't lint \*.md files. So:

- If you use ESLint from CLI, use `--ext` parameter (e.g. `eslint . --ext js,md`)
- If you use VSCode with ESLint plugin, add `"eslint.validate": ["markdown"]` in your VSCode preferences

## Usage with eslint-plugin-prettier

[Prettier](https://prettier.io/) is an amazing code formatter that supports many languages, including markdown. It is
common to use prettier as a rule in ESLint via amazing
[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).

This plugin can play nicely together with `eslint-plugin-prettier` (meaning that first code will be formatted via
prettier, and then remark rules will be applied). Typical eslint configuration will look like this:

```bash
yarn add -D eslint eslint-plugin-prettier eslint-plugin-md
```

```js
// .eslintrc.js
module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:md/recommended'],
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
      rules: {
        'prettier/prettier': [
          'error',
          // Important to force prettier to use "markdown" parser - otherwise it wouldn't be able to parse *.md files.
          // You also can configure other options supported by prettier here - "prose-wrap" is
          // particularly useful for *.md files
          { parser: 'markdown' },
        ],
      },
    },
  ],
}
```

## Modifying eslint setup for js code inside \*.md files

By default, code inside fenced code block marked as js language (` ```js `) will be linted against your default eslint
configuration for js files. However, that may be undesirable - usually you will want less strict rules for JS code in
\*.md files.

To modify setup, you can use "overrides" section in your eslintrc in this way:

```js
// .eslintrc.js
module.exports = {
  extends: ['plugin:md/recommended'],
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
    },
    {
      files: ['*.md.js'], // Will match js code inside *.md files
      rules: {
        // Example - disable 2 core eslint rules 'no-unused-vars' and 'no-undef'
        'no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],
}
```

## Supported Rules

This plugin exposes only one eslint rule - `md/remark`. However, you can customize remark configuration however you
wish.

```js
// .eslintrc.js
module.exports = {
  extends: ['plugin:md/recommended'],
  rules: {
    'md/remark': [
      'error',
      {
        // This object corresponds to object you would export in .remarkrc file
        plugins: ['preset-lint-markdown-style-guide', 'frontmatter', ['lint-maximum-line-length', false]],
      },
    ],
  },
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
    },
  ],
}
```

"Plugin" in remark can mean many things, but for our purposes it can be either remark rule or remark preset. See list of
available rules [here](https://github.com/remarkjs/remark-lint/blob/master/doc/rules.md), and list of available presets
(=set of rules) [here](https://github.com/remarkjs/remark-lint#list-of-presets).

Remark also supports [External rules](https://github.com/remarkjs/remark-lint#list-of-external-rules). You can use those
as well, just make sure to install corresponding package first. For example, if you want to use
[alphabetize-lists](https://github.com/vhf/remark-lint-alphabetize-lists) external rule:

```bash
yarn add -D remark-lint-alphabetize-lists
```

```js
// .eslintrc.js
module.exports = {
  extends: ['plugin:md/recommended'],
  rules: {
    'md/remark': [
      'error',
      {
        // This object corresponds to object you would export in .remarkrc file
        plugins: ['preset-lint-markdown-style-guide', 'frontmatter', 'remark-lint-alphabetize-lists'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
    },
  ],
}
```
