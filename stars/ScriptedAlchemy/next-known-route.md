---
repo: ScriptedAlchemy/next-known-route
url: 'https://github.com/ScriptedAlchemy/next-known-route'
homepage: null
starredAt: '2022-06-17T19:53:50Z'
createdAt: '2022-05-19T17:05:31Z'
updatedAt: '2024-02-15T18:17:22Z'
language: JavaScript
license: MIT
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.863Z'
description: Check if a url is a known route to a next.js application ahead of time
tags: []
---

# next-known-route
Check if a url is a known route to a next.js application ahead of time.

https://www.npmjs.com/package/next-known-route

# Use Case
Why do you need this? Next does not offer a way to know if a url matches a known route with the application.
The only way to do it out the box is to try and preload the route, which is wasteful & only works on the client. 

- Understanding internal vs external links during render or elsewhere in your application (like utils)
- SEO - no follow links to external sources.
- Any feature that requires a page manifest lookup.
- Dynamic navigation and route expressions matching.

No third party dependencies, this is all made possible by using internal parts of next router.

# Usage:

In `_app` add the following and return it from `getInitialProps`

```js
import { getRouteManifest, isKnownRoute } from 'next-known-route'

const MyApp = ()=>{
    const internalRoute = isKnownRoute('/') // or whatever path you want to check aganst. Returns true|false
    return (<main/>)
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);

    const props = {
        ...appProps,
        knownRoutes: getRouteManifest()  // returns ['/_app','/','/[...slug]']
    };
    return props
}
```

## Features
- Works on server and client
- No external libraries needed, only 50 LOC
- `getRouteManifest` accepts an array of additional path expressions to match against. 

Contributions are welcome. 
