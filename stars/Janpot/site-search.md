---
repo: Janpot/site-search
url: 'https://github.com/Janpot/site-search'
homepage: null
starredAt: '2021-11-22T02:04:02Z'
createdAt: '2021-06-09T18:37:27Z'
updatedAt: '2024-03-26T08:25:11Z'
language: TypeScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.193Z'
description: null
tags: []
---

# site-search

> A lightweight self-hosted alternative to [DocSearch](https://docsearch.algolia.com/).

`site-search` will run your website locally, crawl its pages and index their content in a [`lunr`](https://www.npmjs.com/package/lunr) index. It also provides a node.js request handler that can be initialized with this index to provide a search endpoint for your website.

## How to use

1. Install the package

```
yarn add -D site-search
```

2. Add a `site-search.config.js` to the root of your project containing

```ts
module.exports = {
  siteStartCmd: `yarn start`,
  siteOrigin: 'http://localhost:3000',
  startUrl: '/',
  outputPath: './site-search-index.json',
  rules: [
    {
      hierarchy: [
        { selector: 'h1' },
        { selector: 'h2' },
        { selector: 'h3' },
        { selector: 'h4' },
      ],
      text: { selector: 'p' },
    },
  ],
};
```

3. Run `site-search`:

4. Add the search endpoint to your app:

```ts
const path = require('path');
const handler = require('site-search/handler');
// ...
app.use(
  '/search',
  handler({
    filename: path.resolve(__dirname, '../site-search-index.json'),
  })
);
```

5. Now you can use `/search?q=foo` to find documents matching "foo"

## Config

**`siteStartCmd`**: Command that should be run to start your website
**`siteOrigin`**: Url of where the running website can be reached
**`startUrl`**: Url where crawling should start
**`outputPath`**: Where to store the resulting index data
**`rules`**: Rules to extract hierarchy. A bit similar to [how Algolia does it](https://docsearch.algolia.com/docs/how-do-we-build-an-index)
