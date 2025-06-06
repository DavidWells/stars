---
repo: jonschlinkert/dry
url: 'https://github.com/jonschlinkert/dry'
homepage: 'https://github.com/jonschlinkert'
starredAt: '2021-10-04T17:31:50Z'
createdAt: '2016-08-06T15:51:06Z'
updatedAt: '2025-02-13T17:27:33Z'
language: JavaScript
license: MIT
branch: master
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:43.738Z'
description: >-
  Dry is a new template engine and language, and is a superset of Shopify's
  Liquid, with first-class support for advanced inheritance features, and more.
  From the creators of Enquirer, Assemble, Remarkable, and Micromatch.
tags:
  - blog
  - cms
  - email
  - engine
  - headless
  - jekyll
  - liquid
  - liquid-templating-engine
  - render
  - rendering-engine
  - shopify
  - static-site
  - template
  - template-engine
  - templates
  - templating
---

# dry [![NPM version](https://img.shields.io/npm/v/dry.svg?style=flat)](https://www.npmjs.com/package/dry) [![NPM monthly downloads](https://img.shields.io/npm/dm/dry.svg?style=flat)](https://npmjs.org/package/dry) [![NPM total downloads](https://img.shields.io/npm/dt/dry.svg?style=flat)](https://npmjs.org/package/dry)

> Dry is superset of the Liquid templating language, with first-class support for advanced inheritance features, and more.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/) (requires [Node.js](https://nodejs.org/en/) >=14):

```sh
$ npm install --save dry
```

<br>

## Getting started

The simplest way to get started is with the `render` method, which takes a template string and a data object (the "context").

```js
const { render } = require('dry'); // render is async
console.log(await render('Hello, {{ name }}!', { name: 'Brian' })); //=> Hello, Brian!
```

Using the code above, you can do almost everything you need to do with Dry.

**Tags, Filters, Variables, and more!**

See the docs for [Shopify's Liquid](https://shopify.github.io/liquid/basics/introduction/) to learn about all of the features in the Liquid templating language. If you can do it with Liquid, you should be able to do it with Dry. _(and if you can't do it with Dry, it's a bug, and we kindly ask that you please create an issue, thanks!)_

<br>

## Full Documentation

Docs are on the way. In the meantime, you can use [this Liquid docs](https://shopify.github.io/liquid/basics/introduction/) to learn about all language features, and use the code snippet above to render your templates!

<br>

## 2.0 Notes

🎉  This release took a while. Here are some highlights!

**First things first**

I'm back! I know I haven't been around a lot lately, but all of that is about to change! Thank you to @doowb all of my sponsors and friends on GitHub who have provided the encouragement and support I needed to begin making this comeback.

Please consider following me and this repository to receive updates, and consider contributing to Dry so we can make this the most powerful templating library in Node.js!

**Why Dry? Aren't React and Vue the future?**

Yes, yes they are. Dry doesn't compete with them. We use Dry the same way Shopify and Jekyll use Liquid, many end-users don't know how to write JavaScript, and many developers would prefer not to write JavaScript - I love writing JavaScript, and I enjoy Vue and React, but there is something satisfying about deploying a site in 5 minutes using plain text html templates. We also use Dry to design and render email templates, configuration-based system messages, and so on.

**What's different about Dry?**

Dry is A Superset of Shopify's Liquid with first-class support for template inheritance (ahem... so you don't have to repeat yourself. So it's "dry". I know... it's all I have at the moment).

**Highlights of this PR**

* Ported directly from [Shopify/liquid](https://github.com/Shopify/liquid) - Wherever possible, and practical, I attempted to retain the same structure and code decisions as Shopify's Liquid. Since Ruby has a number of language features that aren't available in JavaScript, I had to find arounds or do things differently in a few places.
* Powerful template inheritance: layouts, extends, blocks, macros, embed, imports, and even complex reassignments like `{% from 'fields' import input as input_field, textarea %}`
* More than 750 unit tests so far
* Filters: >70 filters, including **all Liquid filters** and more
* Tags: >30 Tags, including **all Liquid tags** and a several new ones! See the list below!
* More powerful comparisons and conditionals (more about this soon!)

Lots more!

<br>

## Tags

The tags with leading `+` were added to Dry:

_(We'll be adding more tags soon! Like `section` and other tags used by Shopify)_

```diff
+Apply
Assign
+Block
Break
Capture
Case
Comment
+Content
Continue
Cycle
Decrement
Echo
+Embed
+Extends
For
+From
If
Ifchanged
+Import
Include
Increment
+Layout
Liquid
+Macro
+Paginate
Raw
Render
+Set
+Switch
TableRow
Unless
+Verbatim
+With
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2021, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on July 20, 2021._
