---
repo: azu/kindle-highlight-to-markdown
url: 'https://github.com/azu/kindle-highlight-to-markdown'
homepage: null
starredAt: '2022-02-03T01:26:35Z'
createdAt: '2022-01-15T09:00:34Z'
updatedAt: '2024-04-26T13:14:47Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.845Z'
description: Convert Your Kindle highlight & Note to Markdown/JSON
tags: []
---

# kindle-highlight-to-markdown

Convert Your Kindle highlight &amp; Note to Markdown/JSON

## Install

Install with [npm](https://www.npmjs.com/):

    npm install kindle-highlight-to-markdown

## Usage

Using Console script

```js
const { parsePage, toMarkdown } = await import('https://cdn.skypack.dev/kindle-highlight-to-markdown');
const result = parsePage(window); // JSON Object
const markdown = toMarkdown(result); // Markdown
copy(markdown);
```

Using Bookmarklet

```
javascript:(function()%7B(async%20function()%7B%0Aconst%20%7B%20parsePage%2C%20toMarkdown%20%7D%20%3D%20await%20import('https%3A%2F%2Fcdn.skypack.dev%2Fkindle-highlight-to-markdown')%3B%0Aconst%20result%20%3D%20parsePage(window)%3B%20%2F%2F%20JSON%20Object%0Aconst%20markdown%20%3D%20toMarkdown(result)%3B%20%2F%2F%20Markdown%0Aawait%20navigator.clipboard.writeText(markdown)%3B%0A%7D)()%3B%7D)()%3B
```

Using Greasemonkey script

```js
// ==UserScript==
// @name        Kindle Hightlight to Markdown- amazon.co.jp
// @namespace   My highlight to markdown
// @match       https://read.amazon.co.jp/notebook
// @grant       GM_setClipboard
// @version     1.0
// @author      azu
// ==/UserScript==


const h1 = document.querySelector("h1.kp-notebook-title");
h1.addEventListener("click", async () => {
  const { parsePage, toMarkdown } = await import('https://cdn.skypack.dev/kindle-highlight-to-markdown');
  const result = parsePage(window);
  console.log(result);
  const markdown = toMarkdown(result);
  console.log(markdown);
  GM_setClipboard(markdown);
});
```

## Changelog

See [Releases page](https://github.com/azu/kindle-highlight-to-markdown/releases).

## Running tests

Add Cookie to `.cookie` file

and Edit test/node.ts and Run tests

    npm run debug


## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/kindle-highlight-to-markdown/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
