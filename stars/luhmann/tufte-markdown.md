---
repo: luhmann/tufte-markdown
url: 'https://github.com/luhmann/tufte-markdown'
homepage: ''
starredAt: '2022-10-28T06:58:53Z'
createdAt: '2017-11-19T19:22:06Z'
updatedAt: '2023-04-14T19:37:35Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:16.084Z'
description: Markdown Parser which targets tufte-css written with remark
tags:
  - markdown
  - react
  - remark
  - tufte-css
---

# Tufte-Markdown

> This project is still in a very early stage and has not been tested
> extensively with a wide-range of documents use at your own risk

This project aims to convert markdown to HTML (or React) in a way that it can be
used with [tufte-css](https://github.com/edwardtufte/tufte-css) - a set of
stylesheets that aim to emulate the Style of the Handouts of
[Edward Tufte](https://de.wikipedia.org/wiki/Edward_Tufte).

In the end it looks like this: https://edwardtufte.github.io/tufte-css/

The markdown-syntax is taken from the great
[tufte-pandoc-css](https://github.com/jez/tufte-pandoc-css)-project, but not yet
fully implemented. This project will aim to emulate the syntax there as much as
possible.

Markdown-Parsing and -Conversion is done
using[`remark`](https://github.com/wooorm/remark)

## Installation

`$ npm install @tufte-markdown/parser`

## Usage

```js
import configureParser from '@tufte-markdown/parser'

const options = {
  react: false,
}

const parse = configureParser(options)
const result = parse('## Heading **strong** *emphasis*')

console.dir(result)

// Output:
// <section><h2 id="heading-strong-emphasis">Heading <strong>strong</strong> <em>emphasis</em></h2></section>\n'
```

**🖐 Note:** The parser currently only outputs document fragment to make it look
right you will have to wrap it in an `article`-tag

### Options

`options.react` (Default: `false`) - Output a react-syntax-tree instead of HTML
using [remark-react](https://github.com/mapbox/remark-react)

## Syntax

You can get an overview of the possible syntax in the
[base file for the full example](./examples/md/tufte.md)

## Limitations/Differences to `tufte-pandoc-css`

* Currently cannot parse markdown in the `footer` of a blockquote
* `tufte-pandoc-css` uses `^[{-} Text]` for inline-sidenotes which would need
  custom parsing in remark. This project uses `[^{-} Text]` which seems to be
  more inline with how the other side-/marginnotes are defined

Example:

_tufte-pandoc-css_

```md
<figure>
^[{-} From Edward Tufte, *Visual Display of Quantitative Information*, page 92.]
![Exports and Imports to and from Denmark & Norway from 1700 to 1780](img/exports-imports.png)
</figure>
```

_tufte-markdown_

```md
<figure>
[^{-} From Edward Tufte, *Visual Display of Quantitative Information*, page 92.]
![Exports and Imports to and from Denmark & Norway from 1700 to 1780](img/exports-imports.png)
</figure>
```

## Motivation

To provide an alternative to
[tufte-pandoc-css](https://github.com/jez/tufte-pandoc-css) within the
node-ecosystem to make it easier to integrate with libraries like React
