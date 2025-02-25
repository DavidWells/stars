---
repo: markdoc/next.js
url: 'https://github.com/markdoc/next.js'
homepage: 'https://markdoc.dev/docs/nextjs'
starredAt: '2022-06-07T19:36:40Z'
createdAt: '2022-05-09T18:02:04Z'
updatedAt: '2025-02-24T20:04:47Z'
language: JavaScript
license: MIT
branch: main
stars: 155
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:43.218Z'
description: Markdoc plugin for Next.js
tags:
  - loader
  - markdoc
  - markdown
  - nextjs
  - plugin
  - webpack
---

# `@markdoc/next.js`

> **Note**: this plugin will be treated as a beta version until `v1.0.0` is released.

Using the `@markdoc/next.js` plugin allows you to create custom `.md` and `.mdoc` pages in your Next.js apps, and automatically render them with [`markdoc`](https://github.com/markdoc/markdoc).

## Setup

The first thing you'll need to do is install `@markdoc/next.js` and add it to your project's config.

1. From your project, run this command to install `@markdoc/next.js`:
   ```sh
   npm install @markdoc/next.js @markdoc/markdoc
   ```
2. Open `next.config.js` and add the following code:

   ```js
   // next.config.js

   const withMarkdoc = require('@markdoc/next.js');

   module.exports = withMarkdoc(/* options */)({
     pageExtensions: ['js', 'md'],
   });
   ```

3. Create a new Markdoc file in `pages/docs` named `getting-started.md`.

   ```
   pages
   ├── _app.js
   ├── docs
   │   └── getting-started.md
   ├── index.js
   ```

4. Add some content to `getting-started.md`:

   ```md
   ---
   title: Get started with Markdoc
   description: How to get started with Markdoc
   ---

   # Get started with Markdoc
   ```

See [our docs](https://markdoc.dev/docs/nextjs) for more options.

## Contributing

Contributions and feedback are welcomed and encouraged. Feel free to open PRs here, or open issues in the [Markdoc core repo](https://github.com/markdoc/markdoc).

Follow these steps to set up the project:

1. Run `npm install`
1. Run `npm test`

## Code of conduct

This project has adopted the Stripe [Code of conduct](https://github.com/markdoc/markdoc/blob/main/.github/CODE_OF_CONDUCT.md).

## License

This project uses the [MIT license](LICENSE).
