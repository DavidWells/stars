---
repo: suchipi/pypress
url: 'https://github.com/suchipi/pypress'
homepage: null
starredAt: '2022-02-24T04:46:55Z'
createdAt: '2019-12-05T16:52:24Z'
updatedAt: '2023-04-18T09:51:33Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:11.687Z'
description: 'Cypress-like API on top of puppeteer, for non-testing'
tags: []
---

# pypress

Pypress provides an API similar to [Cypress](http://cypress.io)'s `cy`, but uses `puppeteer` instead.

It's useful for writing non-test code using `cy`-like syntax.

## Usage

```js
// Pypress exports a `makePypress` function that you use to make a Pypress instance.
const makePypress = require("pypress");

const py = makePypress({
  // Optional: You can log every time pypress runs a command, or when an error occurs
  log: (message) => console.log(message);
});

// Use py like Cypress's cy
py.goto("https://google.com");

py.get("input").type("test");

// Once you've queued up a bunch of stuff to do, you'll want to use `py.asPromise()` to handle errors.
// py.asPromise() returns a Promise that resolves when all the work you've queued up so far is completed,
// and rejects if any of the work you've queued up fails.
py.asPromise().catch((err) => {
  console.error(err);
});
```

For more information, run `npx pypress` to run a node repl with pypress loaded and with a browser window visible. You can use Tab to autocomplete the properties on the `py` object, to see what commands are available.

## License

MIT
