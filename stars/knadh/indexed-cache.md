---
repo: knadh/indexed-cache
url: 'https://github.com/knadh/indexed-cache'
homepage: ''
starredAt: '2021-09-04T05:47:54Z'
createdAt: '2021-08-28T09:24:37Z'
updatedAt: '2024-12-18T14:47:54Z'
language: JavaScript
license: MIT
branch: master
stars: 81
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:46.404Z'
description: >-
  A tiny Javsacript library for sideloading static assets on pages and caching
  them in the browser's IndexedDB for longer-term storage.
tags:
  - bandwidth-saver
  - browser-cache
  - caching
  - cdn
  - css-loader
  - script-loader
---

<a href="https://zerodha.tech"><img src="https://zerodha.tech/static/images/github-badge.svg" align="right" /></a>

# indexed-cache.js

indexed-cache is a tiny Javascript library that "sideloads" static assets (script, link, and img tags) on webpages using the fetch() API and caches them in an IndexedDB store to eliminate the dependency on the standard browser static asset cache, and to eliminate HTTP requests on subsequent page loads. Javascript, CSS, and image assets are stored in IndexedDB as Blob()s.

### For very specific scenarios only

This library is only meant to be used in very specific scenarios.

Unlike the browser's asset cache, IndexedDB is not cleared automatically, providing a longer term static file storage on the client side. The lib uses ES6 (and IndexedDB) and is only expected to work on recent versions of modern browsers. Ideally, this should have been handled with ServiceWorkers, but they don't work in mobile webviews.

Use if at least a few of these are true:

- There are large static files (JS, CSS) that rarely change.
- High traffic from a large number of returning users who access web pages with the same assets regularly and frequently.
- The pages are mostly inside mobile webviews where browser cache gets evicted  (OS pressure) causing the same assets to be fetched afresh over and over wasting bandwidth.
- Bandwidth is a concern.

### Features

- Supports script, img, link tags.
- Respects `defer / async` on script tags.
- Can invalidate cached items with a TTL per tag.
- Can invalidate cached items with a simple random hash per tag.

### Gotchas

- CORS.
- First-paint "flash" (needs to be handled manually) as scripts and styles only load after HTML is fetched and rendered by the browser.
- Browser compatibility.
- Empty space or line breaks between the opening and closing `<script data-src="remote.js"></script>` tags will be executed as an inline script by the browser, after which the browser will not load the remote script when applied. Ensure that the opening and closing script tags have nothing between then.
- Scripts that rely on the `document.onload` event will need the event to be triggered for them manually once indexed-cache loads with a `document.dispatchEvent(new Event("load"));`

## Usage

To cache and sideload static assets:

- Change the original `src` (`href` for CSS) attribute on tags to `data-src`.
- Give tags a unique ID with `data-key`. The cached items are stored in the database with this key. The actual filenames of the assets can change freely, like in the case of JS build systems.
- Load and invoke indexed-cache at the end.

#### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>indexed-cache</title>
    <meta charset="utf-8" />

    <script data-key="bundle" data-src="bundle_file1234.js"></script>

    <link rel="stylesheet" type="text/css"
        data-key="style.css"
        data-src="style.css" />
</head>
<body>
    <h1>indexed-cache</h1>

    <script src="normal-non-side-loaded.js"></script>

    <!--
        Whenever the value of data-hash changes (eg: from a build system)
        or the expiry (optional) is crossed, the file is re-fetched
        and re-cached.
    //-->
    <script data-src="sideloaded.js"
        data-key="mybigsideloadedscript"
        data-hash="randomhash"
        data-expiry="2029-03-25T12:00:00-06:30">
    </script>

    <img data-src="thumb.png"
        data-key="thumb.png"
        data-hash="randomhash" />

    <!--
        Always include and invoke indexed-cache at the end, right before </body>.
        Use the unpkg CDN or download and host the script locally (dist/indexed-cache.min.js).
    !-->
    <script src="https://unpkg.com/@knadh/indexed-cache@0.4.3/dist/indexed-cache.min.js" nomodule></script>

    <!-- Use this if you are supporting old browsers which doesn't support ES6. -->
    <!-- <script src="https://unpkg.com/@knadh/indexed-cache@0.4.3/dist/indexed-cache.legacy.min.js" nomodule></script> -->

    <script>
        const ic = new IndexedCache();
        ic.init().then(function() {
            ic.load();
        }).catch(function(err) {
            console.log("error loading indexed-cache", err)
        })
    </script>
</body>
</html>
```

#### Load modern and legacy bundle conditionally

Here is an example on how to load modern(ESM) bundle and legacy bundle conditionally based on browser support.

```html
    <!-- Only modern browsers understand type=module and legacy browsers will skip this script -->
    <script type="module">
        // Use ESM bundle.
        import IndexedCache from "https://unpkg.com/@knadh/indexed-cache@0.4.3/dist/indexed-cache.esm.min.js";
        const ic = new IndexedCache();
        ic.init().then(function() {
            ic.load();
        }).catch(function(err) {
            console.log("error loading indexed-cache", err)
        })
    </script>

    <!-- This will only be executed on legacy browsers which doesn't support ES6 modules.
    Modern browsers ignore the script if its tagged `nomodule`. -->
    <script src="https://unpkg.com/@knadh/indexed-cache@0.4.4/dist/indexed-cache.legacy.min.js" nomodule></script>
    <script nomodule>
        const ic = new IndexedCache();
        ic.init().then(function() {
            ic.load();

            // Optionally trigger `onload` if there are scripts that depend on it.
            // document.dispatchEvent(new Event("load"))
        }).catch(function(err) {
            console.log("error loading indexed-cache", err)
        })
    </script>
```

#### Optional configuration

One or more of these optional params can be passed during initialization. Default values are shown below.

```javascript
new IndexedCache({
    tags: ["script", "img", "link"],
    dbName: "indexed-cache",
    storeName: "objects",

    // If this is enabled, all objects in the cache with keys not
    // found on elements on the page (data-key) will be deleted.
    // This can be problematic in scenarios where there are multiple
    // pages on the same domain that have different assets, some on
    // certain pages and some on other.
    prune: false,

    // Enabling this skips IndexedDB caching entirely,
    // causing resources to be fetched over HTTP every time.
    // Useful in dev environments.
    skip: false,

    // Default expiry for an object in minutes (default 3 months).
    // Set to null for no expiry.
    expiry: 131400
}).load();
```

- `load()` can be called with a DOM Node or NodeList. When none are given, it scans the entire DOM.
- To manually prune all objects in the database except for a given list of keys, after `await init()`, call `.prune([list of keys])`.

Licensed under the MIT license.
