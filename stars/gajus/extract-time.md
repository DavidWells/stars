---
repo: gajus/extract-time
url: 'https://github.com/gajus/extract-time'
homepage: null
starredAt: '2020-05-11T21:38:26Z'
createdAt: '2018-12-30T12:10:09Z'
updatedAt: '2025-01-12T04:19:35Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:53.507Z'
description: Extracts time from an arbitrary text input.
tags:
  - moment
  - parse
  - time
---

<a name="extract-time"></a>
# extract-time ⏰

[![Travis build status](http://img.shields.io/travis/gajus/extract-time/master.svg?style=flat-square)](https://travis-ci.org/gajus/extract-time)
[![Coveralls](https://img.shields.io/coveralls/gajus/extract-time.svg?style=flat-square)](https://coveralls.io/github/gajus/extract-time)
[![NPM version](http://img.shields.io/npm/v/extract-time.svg?style=flat-square)](https://www.npmjs.org/package/extract-time)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Extracts time from an arbitrary text input.

* [extract-time ⏰](#extract-time)
    * [Features](#extract-time-features)
    * [Usage](#extract-time-usage)
    * [Signature](#extract-time-signature)
    * [Related projects](#extract-time-related-projects)


<a name="extract-time-features"></a>
## Features

* Deterministic and unambiguous time parsing.

<a name="extract-time-usage"></a>
## Usage

```js
import extractTime from 'extract-time';

extractTime('extracts time from anywhere within the input 14:00');
// [{time: '14:00'}]

extractTime('extracts multiple times located anywhere within the input: 16:00, 18:00');
// [{time: '16:00'}, {time: '18:00'}]

extractTime('distinguish between the civilian 1:30 PM ...');
// [{time: '13:30'}]

extractTime('... and military time formats 13:30');
// [{time: '13:30'}]

extractTime('resolves ambiguous times using the provided time notation bias 1:30', 12);
// [{time: '13:30'}]

```

<a name="extract-time-signature"></a>
## Signature

```js
/**
 * Indicates if time format is 12-hour or 24-hour clock notation.
 */
export type TimeNotationType = 12 | 24;

/**
 * @property time 24-hour military time.
 */
type TimeMatchType = {|
  +time: string
|};

/**
 * @param subject Arbitrary text input.
 */
type extractTime = (
  subject: string,
  timeNotation: TimeNotationType,
) => $ReadOnlyArray<TimeMatchType>;

```

<a name="extract-time-related-projects"></a>
## Related projects

* [`extract-date`](https://github.com/gajus/extract-date) – Extracts date from an arbitrary text input.
* [`extract-price`](https://github.com/gajus/extract-price) – Extracts price from an arbitrary text input.
