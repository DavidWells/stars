---
repo: forresst/markdown-magic-package-json
url: 'https://github.com/forresst/markdown-magic-package-json'
homepage: null
starredAt: '2018-02-15T16:22:37Z'
createdAt: '2017-08-28T15:25:44Z'
updatedAt: '2023-01-31T16:52:19Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:28.167Z'
description: Add the `package.json` properties to markdown files via markdown-magic
tags:
  - markdown
  - markdown-magic
  - package-json
---

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=# ${name}) -->
# markdown-magic-package-json
<!-- AUTO-GENERATED-CONTENT:END -->

[![Build Status](https://travis-ci.org/forresst/markdown-magic-package-json.svg?branch=master)](https://travis-ci.org/forresst/markdown-magic-package-json)
[![Build status](https://ci.appveyor.com/api/projects/status/wya3soypuahm6y6s?svg=true)](https://ci.appveyor.com/project/forresst/markdown-magic-package-json)
[![Coverage Status](https://coveralls.io/repos/github/forresst/markdown-magic-package-json/badge.svg)](https://coveralls.io/github/forresst/markdown-magic-package-json)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

> Add the `package.json` properties to markdown files via [markdown-magic](https://github.com/DavidWells/markdown-magic)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Install](#install)
- [Adding the plugin](#adding-the-plugin)
- [Options](#options)
- [Usage in markdown](#usage-in-markdown)
  * [Basic](#basic)
  * [With most options](#with-most-options)
  * [Unknown property](#unknown-property)
  * [Deep property](#deep-property)
  * [With news lines and tabulations](#with-news-lines-and-tabulations)
  * [Repeated properties](#repeated-properties)
- [License](#license)
<!-- AUTO-GENERATED-CONTENT:END -->

## Install

```console
npm i markdown-magic markdown-magic-package-json --save-dev
```

## Adding the plugin

See this example for usage.

```js
'use strict';

const path = require('path');
const markdownMagic = require('markdown-magic');

const config = {
	transforms: {
		PKGJSON: require('markdown-magic-package-json')
	}
};

const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config);
```

## Options

* **template** - string with placeholders like Template literals. These placeholders are indicated by the dollar sign and curly braces (`${property}`). For example, if we want to retrieve the `name` property in the package.json, we can write this: `${name}`. See more examples in the section [Usage in markdown](#usage-in-markdown).
* **pkg** (`package.json` in ancestor's dir by default) - `package.json` path. If the path is incorrect, the plugin find `package.json` in ancestor's dir
* **UnknownTxt** (undefined by default) - string to add if the `prop` is unknown

> **WARNING: The following options has been deprecated in favor of `template`. They are removed from version 2.0.0 and later**. See the [guide](docs/guide-switch-to-template-option.md) to use `template` instead :
>* **prop** - any property in package.json (like `name`, `version`, `scripts.test`, ...)
>* **before** (empty by default) - string to add **before** prop
>* **after** (empty by default) - string to add **after** prop

## Usage in markdown

### Basic

Here is a first example to display the `name` property inside `package.json`:

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=${name}) -->
markdown-magic-package-json
<!-- AUTO-GENERATED-CONTENT:END -->
```

### With most options

Here is an example with most options:

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=### ${name} is very useful !&pkg=tests) -->
### markdown-magic-package-json is very useful !
<!-- AUTO-GENERATED-CONTENT:END -->
```

### Unknown property

In this example, the property does not exist in `package.json`:

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=${foo}) -->
undefined
<!-- AUTO-GENERATED-CONTENT:END -->
```

Please note in this case the value unknown is replaced by `undefined`. You can change `undefined` by a value of your choice using the option `unknownTxt` as below:

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=${foo}&unknownTxt=##TODO##) -->
##TODO##
<!-- AUTO-GENERATED-CONTENT:END -->
```

### Deep property

To retrieve a deep property (for example `repository.type`):

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=${repository.type}) -->
git
<!-- AUTO-GENERATED-CONTENT:END -->
```

### With news lines and tabulations

To the layout, use characters for new line (`\n`) or tabulation (`\t`):

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=# Hello World\n\nThe package: ${name}\n\n\tIt is useful!\n\nVery useful!!!) -->
# Hello World

The package: markdown-magic-package-json

	It is useful!

Very useful!!!
<!-- AUTO-GENERATED-CONTENT:END -->
```

### Repeated properties

You can repeat the same property multiple times:

```markdown
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=Name: ${name}\nLicense: ${license}\n${name} has the ${license} license) -->
Name: markdown-magic-package-json
License: MIT
markdown-magic-package-json has the MIT license
<!-- AUTO-GENERATED-CONTENT:END -->
```

## License

MIT © [forresst](https://github.com/forresst)
