---
repo: bcomnes/resolve-email
url: 'https://github.com/bcomnes/resolve-email'
homepage: null
starredAt: '2024-05-10T22:14:27Z'
createdAt: '2023-07-20T00:40:33Z'
updatedAt: '2025-02-25T16:46:39Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:30.427Z'
description: null
tags: []
---

# resolve-email
[![latest version](https://img.shields.io/npm/v/resolve-email.svg)](https://www.npmjs.com/package/resolve-email)
[![Actions Status](https://github.com/bcomnes/resolve-email/workflows/tests/badge.svg)](https://github.com/bcomnes/resolve-email/actions)
[![Coverage Status](https://coveralls.io/repos/github/bcomnes/resolve-email/badge.svg?branch=master)](https://coveralls.io/github/bcomnes/resolve-email?branch=master)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![downloads](https://img.shields.io/npm/dm/resolve-email.svg)](https://npmtrends.com/resolve-email)
[![Socket Badge](https://socket.dev/api/badge/npm/package/resolve-email)](https://socket.dev/npm/package/resolve-email)

Resolve the domain of a syntactically valid email address to see if there is even a chance of deliverability. Also checks against a large list of disposable email and other junk/unwated address domains and rejects those.

```
npm install resolve-email
```

## Usage

``` js
import { resolveEmail } from 'resolve-email'

// Validate the email address before passing it in here:
const results = await resolveEmail('person@gmailc.om')

console.log(results)
// results.emailResolves true/false
// results.mxRecords [array of mx records and priorities]
// results.error any errors that may have occurred.
```

## See also

This module was adapted from [nodemailer/nodemailer-direct-transport](https://github.com/nodemailer/nodemailer-direct-transport/blob/v3.3.2/lib/direct-transport.js#L438)

The disposable email domain list is generated from the following data sources:

- https://github.com/romainsimon/emailvalid
- https://github.com/disposable-email-domains/disposable-email-domains

## License

MIT
