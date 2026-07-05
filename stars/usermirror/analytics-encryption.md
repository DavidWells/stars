---
repo: usermirror/analytics-encryption
url: 'https://github.com/usermirror/analytics-encryption'
homepage: ''
starredAt: '2019-10-06T08:28:01Z'
createdAt: '2019-01-06T07:00:32Z'
updatedAt: '2019-10-06T08:28:01Z'
language: TypeScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.774Z'
description: Config-based encryption for analytics on the server and in the browser.
tags: []
---

<br/>
<p align="center">
  <strong><code>analytics-encryption</code></strong>
</p>

<p align="center">
  Config-based encryption for analytics <br/>
  on the server and in the browser.
</p>
<br/>

<p align="center">
  <a href="https://unpkg.com/analytics-encryption/lib/index.js">
    <img src="https://img.badgesize.io/https://unpkg.com/analytics-encryption/lib/index.js?compression=gzip&amp;label=analytics--encryption&cache=2">
  </a>
  <a href="https://www.npmjs.com/package/analytics-encryption">
    <img src="https://img.shields.io/npm/v/analytics-encryption.svg?maxAge=3600&label=analytics-encryption&colorB=007ec6">
  </a>
</p>
<br/>

### Getting Started

#### Installation

Install with npm:

```shell
npm install --save analytics-encryption
```

Or with yarn:

```shell
yarn add analytics-encryption
```

#### Examples

```javascript
import analyticsEncryption from 'analytics-encryption'

// Tries to find `window.analytics` and extend `.track/identify()`
const encryptedAnalytics = analyticsEncryption()

// Or you can pass in an analytics object
const analytics = analyticsEncryption({ analytics: trackingV1 })
```

### Usage

#### Node.js

```javascript
// ./analytics.js
import Analytics from 'analytics-node'
import EncryptionClient from '@ume/client'
import analyticsEncryption from 'analytics-encryption'

const apiHost = process.env.UME_API_HOST
const eclient = new EncryptionClient({ apiHost })
const originalAnalytics = new Analytics(process.env.WRITE_KEY)

const analytics = analyticsEncryption({
  analytics: originalAnalytics,
  local: { encrypt: eclient.encrypt.bind(eclient) }
})

const { track, identify } = analytics

export default analytics
export { track, identify }

// ./app.js
import { track } from './analytics'

track('Form Submitted', {
  email: 'name@example.com',
  name: 'Example Name',
  dob: '01-01-1999'
})

// turns into

originalAnalytics.track('Form Submitted', {
  email: 'r8Udt6Swa+Znk7CI5+9W/0xQ7PckBj3+H983fun8LEAtLFnzvJzeuq',
  name: 'ckBj3+H983ful8KUHuKglyawtfeKLVf4EAN3XEkKhmX',
  dob: 'xt5crfiZhr5M7IPcbb2q8f8uB/Et77q'
})
```

#### Browser

```javascript
// ./init.js
import EncryptionClient from '@ume/client'
import analyticsEncryption from 'analytics-encryption'

const apiHost = process.env.UME_API_HOST
const eclient = new EncryptionClient({ apiHost })

analyticsEncryption({
  replace: true,
  local: { encrypt: eclient.encrypt.bind(eclient) }
})

// ./app.js
window.analytics.track('Form Submitted', {
  email: 'name@example.com',
  name: 'Example Name',
  dob: '01-01-1999'
})

// turns into

window.analytics.original.track('Form Submitted', {
  email: 'r8Udt6Swa+Znk7CI5+9W/0xQ7PckBj3+H983fun8LEAtLFnzvJzeuq',
  name: 'ckBj3+H983ful8KUHuKglyawtfeKLVf4EAN3XEkKhmX',
  dob: 'xt5crfiZhr5M7IPcbb2q8f8uB/Et77q'
})
```

### Contributing

All contributions are welcome, `analytics-encryption` is [MIT-licensed](./license).
