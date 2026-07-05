---
repo: thespicyweb/vanilla_breeze
url: 'https://github.com/thespicyweb/vanilla_breeze'
homepage: 'https://www.vanillabreeze.dev'
starredAt: '2022-09-01T00:51:46Z'
createdAt: '2022-08-18T18:33:13Z'
updatedAt: '2024-12-20T15:15:45Z'
language: JavaScript
license: NA
branch: main
stars: 157
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:35.748Z'
description: Convert Tailwind CSS to Semantic CSS
tags: []
---

# Vanilla Breeze

## A Tailwind to Vanilla CSS Converter

Available publicly at [vanillabreeze.dev](https://www.vanillabreeze.dev).

Or to run this application locally, all you need is [Node](https://nodejs.org/en/) v18+.

First, install dependencies:

```shell
$ npm i
```

Then, run the esbuild processes & web server in separate terminals:

```shell
$ npm run build -- --watch
```

```shell
$ npm run dev
```

Or in a production environment, you can kick off a one-time esbuild build and then start the server:

```shell
npm run deploy
```

Vanilla Breeze is currently in "early beta" so if you encounter any bugs or in particular if any standard-ish Tailwind markup doesn't convert well or at all, please file an issue so we can make improvements. Or better yet, submit a PR! 😃👍

----

**NOTE:** currently this repo includes a Plausible analytics tag in the HTML head. If you decide to run the app yourself, please remove the tag so it won't interfere with our [production site](https://www.vanillabreeze.dev). Thank you!

(Why is this even an issue, you may ask? It's because with the exception of the client-side JavaScript, the website is entirely "buildless". This was an intentional choice. Cool in some ways, but one way it's not is that there's no ability to inject ENV vars and add templating logic accordingly. Oh well!)
