---
repo: domenic/opener
url: 'https://github.com/domenic/opener'
homepage: null
starredAt: '2021-03-08T22:49:44Z'
createdAt: '2012-08-06T10:40:30Z'
updatedAt: '2024-05-30T02:58:09Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 304
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:59.638Z'
description: 'Opens stuff, like webpages and files and executables, cross-platform'
tags: []
---

# It Opens Stuff

That is, in your desktop environment. This will make *actual windows pop up*, with stuff in them:

```bash
npm install opener -g

opener http://google.com
opener ./my-file.txt
opener firefox
opener npm run lint
```

Also if you want to use it programmatically you can do that too:

```js
var opener = require("opener");

opener("http://google.com");
opener("./my-file.txt");
opener("firefox");
opener("npm run lint");
```

Plus, it returns the child process created, so you can do things like let your script exit while the window stays open:

```js
var editor = opener("documentation.odt");
editor.unref();
// These other unrefs may be necessary if your OS's opener process
// exits before the process it started is complete.
editor.stdin.unref();
editor.stdout.unref();
editor.stderr.unref();
```

## Use It for Good

Like opening the user's browser with a test harness in your package's test script:

```json
{
    "scripts": {
        "test": "opener ./test/runner.html"
    },
    "devDependencies": {
        "opener": "*"
    }
}
```

## Why

Because Windows has `start`, Macs have `open`, and *nix has `xdg-open`. At least [according to some person on StackOverflow](http://stackoverflow.com/q/1480971/3191). And I like things that work on all three. Like Node.js. And Opener.
