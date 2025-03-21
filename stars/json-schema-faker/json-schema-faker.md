---
repo: json-schema-faker/json-schema-faker
url: 'https://github.com/json-schema-faker/json-schema-faker'
homepage: 'http://json-schema-faker.js.org/'
starredAt: '2022-01-13T06:51:33Z'
createdAt: '2014-10-07T22:23:13Z'
updatedAt: '2025-02-19T02:57:20Z'
language: JavaScript
license: MIT
branch: master
stars: 3333
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:21.601Z'
description: JSON-Schema + fake data generators
tags: []
---

[![JSON Schema Faker logo](logo/JSF_logo.png)](https://github.com/json-schema-faker/json-schema-faker)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8MXLRJ7QQXGYY)
[![OpenCollective](https://badgen.net/opencollective/backers/json-schema-faker)](https://opencollective.com/json-schema-faker)
[![Build status](https://github.com/json-schema-faker/json-schema-faker/actions/workflows/testing.yml/badge.svg)](https://github.com/json-schema-faker/json-schema-faker/actions)
[![NPM version](https://badge.fury.io/js/json-schema-faker.svg)](http://badge.fury.io/js/json-schema-faker)
[![Coverage Status](https://codecov.io/github/json-schema-faker/json-schema-faker/coverage.svg?branch=master)](https://codecov.io/github/json-schema-faker/json-schema-faker?branch=master)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/json-schema-faker/Lobby)

[![Inline docs](https://inch-ci.org/github/json-schema-faker/json-schema-faker.svg?branch=master)](https://inch-ci.org/github/json-schema-faker/json-schema-faker)
[![Typedoc](https://img.shields.io/badge/typedoc-provided-blue.svg)](http://json-schema-faker.github.io/json-schema-faker/)
[![Known Vulnerabilities](https://snyk.io/test/github/json-schema-faker/json-schema-faker/badge.svg)](https://snyk.io/test/github/json-schema-faker/json-schema-faker)

> Use [JSON Schema](http://json-schema.org/draft-04/json-schema-core.html) along with fake generators to provide consistent and meaningful fake data for your system.

## What's next?

Breaking-changes towards `v0.5.x` API:

- **deprecated** &mdash; You will not longer be able to call `jsf()` and get a fully-dereferenced result. It will just generate given refs and inline ones, nothing else.
  - `jsf.generate()` is the sync-version, with partial dereferencing through given refs, etc.
  - `jsf.resolve()` is the async-version, with full dereferencing, given refs are also supported.
- **deprecated** &mdash; TypeScript sources are not longer used, however `d.ts` definitions will be updated on time.

> Usage info from README.md was moved to `docs/`, [read more](docs/).

## Contributors

<a href="https://github.com/json-schema-faker/json-schema-faker/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=json-schema-faker/json-schema-faker" />
</a>

&mdash; **Artwork by [Ajay Karat](http://www.devilsgarage.com/)**

> We are more than happy to welcome new contributors, our project is still being developed, but we need more feedback!
>
> Please see our [contribution guide](.github/CONTRIBUTING.md) to learn how.

### We are looking for your help!

We have a [gitter room](https://gitter.im/json-schema-faker) for this project, if you want to contribute, talk about specific issues from the library, or you need help on json-schema topics just reach out to us!

Please take a look at [the technical documentation page](docs/).

> If you think `json-schema-faker` is adding value on what you're doing please consider [buying me a coffee](http://ko-fi.com/pateketrueke).
>
> Also, you can support the project via [Open Collective](https://opencollective.com/json-schema-faker/donate).
