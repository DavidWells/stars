---
repo: transitive-bullshit/warm-social-images
url: 'https://github.com/transitive-bullshit/warm-social-images'
homepage: null
starredAt: '2022-06-07T19:29:38Z'
createdAt: '2022-04-09T20:00:44Z'
updatedAt: '2022-07-07T22:16:09Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:43.233Z'
description: Simple CLI to warm the cache of social images in all pages from a sitemap.
tags: []
---

# warm-social-images

> Simple CLI to warm the cache of social images in all pages from a sitemap.

[![NPM](https://img.shields.io/npm/v/warm-social-images.svg)](https://www.npmjs.com/package/warm-social-images) [![Build Status](https://github.com/transitive-bullshit/warm-social-images/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/warm-social-images/actions/workflows/test.yml) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Why

Using serverless functions to generate images for social media is pretty common.

If you're caching them with a CDN like Vercel or Cloudflare, then they will resolve quickly after the first GET.

But after fresh deploys, all of these social images will resolve very slowly, which may impact how your site is viewed on social media.

## Usage

```
Usage:
  $ warm-social-images <sitemap-url>

Commands:
  <sitemap-url>  Fetches social images from all of the pages in a given sitemap

For more info, run any command with the `--help` flag:
  $ warm-social-images --help

Options:
  --concurrency <concurrency>  Sets the concurrency for processing pages (default: 8)
  --silent                     Silences logging (default: false)
  -h, --help                   Display this message
  -v, --version                Display version number
```

## Example

```
npx warm-social-images https://transitivebullsh.it/sitemap.xml
```

which outputs:

```
processing 98 pages
2: 21.5 kB https://transitivebullsh.it/api/social-image?id=9a7ddf29-7344-4067-bbc5-ce0a4e0e0058
3: 66 kB https://transitivebullsh.it/api/social-image?id=076e0ecd-03dd-42db-a525-d67f18501500
0: 24.3 kB https://transitivebullsh.it/api/social-image?id=78fc5a4b88d74b0e824e29407e9f1ec1
1: 24.3 kB https://transitivebullsh.it/api/social-image?id=78fc5a4b-88d7-4b0e-824e-29407e9f1ec1
...
97: 24.1 kB https://transitivebullsh.it/api/social-image?id=3aab2f4a-9ead-4952-8efa-71fdc5141d54
93: 22.5 kB https://transitivebullsh.it/api/social-image?id=0c0dc729-b961-4998-8611-c42fa6744276
{ numSuccess: 98, numError: 0, numNotFound: 0 }
```

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
