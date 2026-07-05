---
repo: WebReflection/is-proxy
url: 'https://github.com/WebReflection/is-proxy'
homepage: null
starredAt: '2025-05-16T17:53:35Z'
createdAt: '2025-05-16T09:47:22Z'
updatedAt: '2025-05-17T13:56:49Z'
language: JavaScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-17T22:30:16.275Z'
description: A `Proxy.isProxy(object)` utility.
tags: []
---

# @webreflection/is-proxy

A slightly different take at [is-proxy](https://www.npmjs.com/package/is-proxy) in a 100% ESM friendly way, with a `pony` export, a way to avoid multiple patches plus a default global patch export.

The patch is immutable and 100% secured:

  * no overrides of the original code are possible
  * no interception of the proxies are possible via `WeakSet` prototype pollution (include this module on top of your list of modules though)
  * designed to be unobtrusive for the original global *Proxy* but extremly handy when needed

### ... when or why would I need this?

It's a great question and if you ask to TC39 delegates they'll answer that:

> No, there can be no way for a Proxy to forced to be identified as a Proxy.

I would even agree if not for the fact everything I deal with daily is *Proxy* based and neither [TC39](https://es.discourse.group/t/symbol-clone-to-ease-out-structuredclone-implicit-conversion/2035) nor [WHATWG](https://github.com/whatwg/html/issues/7428) is providing a way to deal with proxies **when structuredClone is used**, so that all we are left with is user-land code that MUST be able to intercept proxies before throwing errors happen, do something with these proxies and/or do something else (eventually) once received on the other side ... so that after years of impossibility of keeping things simple I've just decided it's about the time somebody provides a `Proxy.isProxy(object)` utility that can work with proxies created both in your code or in 3rd party code and WASM runtime, or literally anywhere else that's needed/desired to survive `postMessage` dance and whatnot around this topic.

```js
// global patch
import '@webreflection/is-proxy';
// ... or ...
import Proxy from '@webreflection/is-proxy';

// ponyfill
import pony from '@webreflection/is-proxy';

const MyProxy = pony(Proxy);
// if it was already globally patched,
// you'll get the global proxy instead
```

**The End**.

- - -

#### ℹ️ This should not be needed ...

The day `Symbol.toStructuredClone` or any variant of it will be officially available is the day force-intercepting proxies will likely not be useful or desired anymore.

Until that day though, this module is here to help people building beyond *ECMAScript* and *WHATWG* standard capabilities so: keep hacking & keep having fun!
