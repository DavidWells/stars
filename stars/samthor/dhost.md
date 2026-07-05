---
repo: samthor/dhost
url: 'https://github.com/samthor/dhost'
homepage: ''
starredAt: '2021-06-04T18:42:15Z'
createdAt: '2019-03-10T06:39:26Z'
updatedAt: '2023-02-15T11:05:57Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:35.994Z'
description: Never-caching development Node webserver
tags: []
---

The never-caching development Node webserver for static files and ESM dev work.
This instructs browsers _never_ to cache any requested resources.
**If you've ever had to mash _Ctrl/Cmd-R_ to ensure your browser is seeing the latest version of a static site, you'll know this feeling.**

Install globally via `npm -g install dhost` or `yarn global add dhost`, then run `dhost`.

⚠️ This is just for development.
Don't use it in any sort of production.
It reqiures Node 14+.

# Running

Run `dhost -h` to list all flags flags.
By default, this hosts only on `localhost`, on the first available port 9000 or above, and copies the serving URL to your clipboard (works on macOS, _or_ if the optional `clipboardy` is found).

If you need to serve CORS requests, run with `-c`; if you need to rewrite ESM imports in JS files, run with `-m`.

# Magic

The goal of this server is not to surprise you, and to avoid magic where possible.
Its behavior will never intentionally match any particular hosting platform's semantics.

Here are the exceptions:

* We serve `index.html` if found, or generate a simple directory listing otherwise
* Symlinks generate a 302 to their target file if it's within the root (serve contents instead via `-l`)
* No data is served for other status codes (i.e., your browser will render its own 404 page)

## Modules

✨ New! ✨ Specify `-m` to rewrite your JS to include static ESM imports (e.g., "viz-observer" => "/node_modules/viz-observer/index.js").

This only works on static imports (e.g., `import 'foobar';'`), not dynamic ones (e.g., `import('foobar')`), as these can be any string (including ones generated at runtime).
If you need to dynamically import from node_modules, add an extra helper file which doesn't need to be rewritten:

```js
// your code
const foobarModule = await import('./foobar-wrapper.js');

// foobar-wrapper.js
export * from 'foobar';
```

Your build tools will compile this out, so the extra step won't effect a production build.

Note that this doesn't rewrite the modules _themselves_; you'll need to depend on packages that support ESM.
(But you should be doing that anyway, it's 2021.)

# Middleware

This can be used as middleware.
To serve the current directory—without caching—using [Polka](https://github.com/lukeed/polka):

```js
const polka = require('polka');
const dhost = require('dhost');  // or: import dhost from 'dhost';

polka()
  .use(dhost({ /* optional options */}))
  .listen(3000, (err) => {
    // ...
  });
```

# Dependencies

This package has a handful of dependencies, none of which have further dependencies.

Needed for the middleware only:

* `he` escapes names in generated directory listing
* `mime` guesses mime-types for the `Content-Type` header

Included for module rewriting support:

* `gumnut` for ESM rewriting support
* `esm-resolve` for resolving imports
* `async-transforms` for running rewriting in parallel on multiple threads

Included for the CLI:

* `bytes` displays nicely-formatted file sizes
* `colorette` for color output
* `mri` parses command-line arguments
