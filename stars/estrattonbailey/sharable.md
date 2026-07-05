---
repo: estrattonbailey/sharable
url: 'https://github.com/estrattonbailey/sharable'
homepage: ''
starredAt: '2023-11-25T20:37:06Z'
createdAt: '2016-05-18T22:10:40Z'
updatedAt: '2023-11-25T23:36:06Z'
language: JavaScript
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.531Z'
description: >-
  An easily configurable social share library that uses the social data in your
  document's head by default.
tags: []
---

# Sharable [![npm](https://img.shields.io/npm/v/sharable.svg?maxAge=2592000)](https://www.npmjs.com/package/sharable)
An easily configurable social share libary that uses the social data in your document's `head` by default.

**1.6kb gzipped**

## Install
```bash
npm i sharable --save
```

## Usage
Add social data to your `head` as normal.
```html
<html>
<head>
  <meta prefix="og: http://ogp.me/ns#" property="og:description" content="A javascript sandbox, by Eric Bailey."/>
  <meta prefix="og: http://ogp.me/ns#" property="og:site_name" content="Sandbox"/>
  <meta prefix="og: http://ogp.me/ns#" property="og:title" content="Sandbox" />
  <meta prefix="og: http://ogp.me/ns#" property="og:image" content="https://s3.amazonaws.com/StartupStockPhotos/uploads/20160503/3.jpg" />
  <meta prefix="og: http://ogp.me/ns#" property="og:url" content="http://estrattonbailey.com" />

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Sandbox">
  <meta name="twitter:description" content="A javascript sandbox, by Eric Bailey.">
  <meta name="twitter:image" content="https://s3.amazonaws.com/StartupStockPhotos/uploads/20160503/3.jpg">
</head>
<body>

  <a href="#0" data-social="twitter">Twitter</a>
  <a href="#0" data-social="facebook">Facebook</a>
  <a href="#0" data-social="pinterest">Pinterest</a>
  <a href="#0" data-social="email">Email</a>
  <a href="#0" data-social="tumblr">Tumblr</a>

</body>
</html>
```
```javascript
import sharable from 'sharable'

const share = sharable()

// ES5
var sharable = require('sharable/browser')
var share = sharable()
```

## Options
#### options.selector
Change the **attribute** you want to bind with Sharable. Default: `data-social`.
```javascript
const share = sharable({
  selector: 'data-social-link'
})
```

#### locals
You can also pass data to individual links via data attributes to override the default data from the `head`.
```html
<a href="#0"
  data-social="tumblr"
  data-description="Description for the tumblr post."
  data-url="http://estrattonbailey.tumblr.com"
  >
  Tumblr
</a>
```

## Supported Networks and Attributes

#### Twitter
- `data-url`
- `data-description`
- `data-hashtags` - comma separated list
- `data-via` - appends `via @handle` to the end of the tweet

#### Facebook
- `data-url`

#### Tumblr
- `data-url`
- `data-title`
- `data-description`
- `data-image`

#### Pinterest
- `data-url`
- `data-image`
- `data-description`

#### Email
- `data-url`
- `data-title`

## API

#### sharable.update()
Binds any new links and fetches fresh meta data from the `head`.
```javascript
share.update()
```

#### sharable.getMeta()
Scrape the `document.head` for all social related meta tags. Returns an object with the shape `propertyName: propertyValue` i.e. `image: 'https://urltomyawesomeimage/image.jpg'`.
```javascript
share.getMeta()
```

## TODO
1. More networks (anyone care to contribute?)
2. Tests

* * *

MIT License
