---
repo: azu/safe-marked
url: 'https://github.com/azu/safe-marked'
homepage: ''
starredAt: '2021-11-21T19:32:16Z'
createdAt: '2019-07-10T11:03:14Z'
updatedAt: '2025-01-23T12:23:59Z'
language: TypeScript
license: MIT
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.291Z'
description: Markdown to HTML using marked and DOMPurify. Safe by default.
tags:
  - converter
  - html
  - markdown
  - safe
  - sanitize
  - xss
---

# safe-marked [![Actions Status: test](https://github.com/azu/safe-marked/workflows/test/badge.svg)](https://github.com/azu/safe-marked/actions?query=workflow%3A"test")

Convert Markdown to HTML using [marked](https://marked.js.org) and [DOMPurify](https://github.com/cure53/DOMPurify).

## Motivation

[marked](https://marked.js.org) does not sanitized by default.
Also, [marked](https://marked.js.org) will remove `sanitize` option in the future.

We want to get safe and easy library that convert Markdown to HTML.

## Features

- Convert Markdown to HTML using [marked](https://marked.js.org)
- Safe by default
    - The output is sanitized by [DOMPurify](https://github.com/cure53/DOMPurify)
- Type Safe by default
    - This library is written by TypeScript
- Work on Browser and Node.js

## Size

      package           size      minified  gzipped
      safe-marked       90.15 KB  39.36 KB  13.82 KB (browser bundle size)
      marked@0.7.0      45.05 KB  23.87 KB  7.87 KB
      dompurify@1.0.11  45.21 KB  15.3 KB   5.99 KB
      
      # Other Markdown library  
      markdown-it@9.0.0  325.52 KB  92.69 KB  32.77 KB
      showdown@1.9.0     157.28 KB  71.06 KB  23.55 KB

## Install

Install with [npm](https://www.npmjs.com/):

    npm install safe-marked

## Usage

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown();
const html = markdown(`# Header

This is [CommonMark](https://commonmark.org/) text.
`);
console.log(html); 
/* <h1 id="header">Header</h1>
   <p>This is <a href="https://commonmark.org/">CommonMark</a> text.</p>
*/
```

The output is sanitized by default.

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown();
const html = markdown(`<script>alert(1)</script>
<iframe src="https://example.com"></iframe>

This is [XSS](javascript:alert(1))`);
// sanitized by default
assert.strictEqual(html, `

<p>This is <a>XSS</a></p>
`);
```

### Options

You can pass options for these library.

- `marked`: See [marked](https://marked.js.org/#/USING_ADVANCED.md)'s options
  - `onInit(marked: Marked): unknown`: You can use `onInit` to customize `marked` instance.
  - It is useful to add a plugin to `marked`.
- `dompurify`: See [DOMPurify](https://github.com/cure53/DOMPurify)'s options

An example for options:

```js
import { createMarkdown } from "safe-marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
const markdown = createMarkdown({
    marked: {
        // Add plugin to marked
        onInit(marked) {
            // add plugin
            marked.use(gfmHeadingId());
        },
        // same options for https://marked.js.org/#/USING_ADVANCED.md
        gfm: false
    },
    // same options for https://github.com/cure53/DOMPurify
    dompurify: {
        ADD_TAGS: ["iframe"]
    }
});
const html = markdown(`# Header

<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
assert.strictEqual(html, `<h1>Header</h1>
<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
```

## FAQ

### Does safe-marked always include jsdom?

No. safe-marked has two type of entry point.

- Node.js
- Browser

Browser entrypoint does not includes jsdom. (just use marked + dompurify)

- [Automatically include jsdom? · Issue #5 · azu/safe-marked](https://github.com/azu/safe-marked/issues/5)

Browser demo: <https://stackblitz.com/edit/js-pquqgx?file=index.js,package.json>

## Changelog

See [Releases page](https://github.com/azu/safe-marked/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/safe-marked/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © azu
