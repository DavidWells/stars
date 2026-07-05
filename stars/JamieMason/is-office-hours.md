---
repo: JamieMason/is-office-hours
url: 'https://github.com/JamieMason/is-office-hours'
homepage: 'https://www.npmjs.com/package/is-office-hours'
starredAt: '2021-01-02T05:05:32Z'
createdAt: '2019-03-08T16:31:05Z'
updatedAt: '2022-07-02T06:46:03Z'
language: TypeScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:11.225Z'
description: Determine whether a given date is within office hours
tags:
  - business-hours
  - business-time
  - date-time
  - dates
  - datetime
  - office-hours
  - times
  - working-day
  - working-hours
---

# is-office-hours

> Determine whether a given date is within office hours

[![NPM version](http://img.shields.io/npm/v/is-office-hours.svg?style=flat-square)](https://www.npmjs.com/package/is-office-hours) [![NPM downloads](http://img.shields.io/npm/dm/is-office-hours.svg?style=flat-square)](https://www.npmjs.com/package/is-office-hours) [![Build Status](http://img.shields.io/travis/JamieMason/is-office-hours/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/is-office-hours) [![Maintainability](https://api.codeclimate.com/v1/badges/bced12a42a2c6d08219c/maintainability)](https://codeclimate.com/github/JamieMason/is-office-hours/maintainability)

## Table of Contents

-   [🌩 Installation](#-installation)
-   [🕹 Usage](#-usage)
-   [🙋🏽‍♀️ Getting Help](#♀️-getting-help)
-   [👀 Other Projects](#-other-projects)
-   [🤓 Author](#-author)

## 🌩 Installation

    npm install --save is-office-hours

## 🕹 Usage

### isOfficeHours

Returns `true` if the provided `Date` falls within Monday to Friday 9:00am to 4:59pm.

```js
import { isOfficeHours } from "is-office-hours";

isOfficeHours(new Date("2019-03-04T08:59:59.000Z"));
// false
isOfficeHours(new Date("2019-03-04T09:00:00.000Z"));
// true
isOfficeHours(new Date("2019-03-04T09:01:00.000Z"));
// true
isOfficeHours(new Date("2019-03-04T16:59:59.000Z"));
// true
isOfficeHours(new Date("2019-03-04T17:00:00.000Z"));
// false
isOfficeHours(new Date("2019-03-04T17:01:00.000Z"));
// false
```

### outsideOfficeHours

If the provided date falls within Office Hours, a new date is returned with the time adjusted to fall outside Office Hours. If the provided date falls outside Office Hours, it is returned unchanged.

The provided date is never mutated.

```js
import { outsideOfficeHours } from "is-office-hours";

outsideOfficeHours(new Date("2019-03-04T09:00:00.000Z"));
// Date(2019-03-04T18:00:00.000Z)
outsideOfficeHours(new Date("2019-03-04T10:00:00.000Z"));
// Date(2019-03-04T18:37:29.000Z)
outsideOfficeHours(new Date("2019-03-04T11:00:00.000Z"));
// Date(2019-03-04T19:14:59.000Z)
outsideOfficeHours(new Date("2019-03-04T12:00:00.000Z"));
// Date(2019-03-04T19:52:29.000Z)
outsideOfficeHours(new Date("2019-03-04T13:00:00.000Z"));
// Date(2019-03-04T20:29:59.000Z)
outsideOfficeHours(new Date("2019-03-04T14:00:00.000Z"));
// Date(2019-03-04T21:07:29.000Z)
outsideOfficeHours(new Date("2019-03-04T15:00:00.000Z"));
// Date(2019-03-04T21:44:59.000Z)
outsideOfficeHours(new Date("2019-03-04T16:00:00.000Z"));
// Date(2019-03-04T22:22:29.000Z)
```

## 🙋🏽‍♀️ Getting Help

Get help with issues by creating a [Bug Report] or discuss ideas by opening a [Feature Request].

[bug report]: https://github.com/JamieMason/is-office-hours/issues/new?template=bug_report.md

[feature request]: https://github.com/JamieMason/is-office-hours/issues/new?template=feature_request.md

## 👀 Other Projects

If you find my Open Source projects useful, please share them ❤️

-   [**eslint-formatter-git-log**](https://github.com/JamieMason/eslint-formatter-git-log)<br>ESLint Formatter featuring Git Author, Date, and Hash
-   [**eslint-plugin-move-files**](https://github.com/JamieMason/eslint-plugin-move-files)<br>Move and rename files while keeping imports up to date
-   [**eslint-plugin-prefer-arrow-functions**](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions)<br>Convert functions to arrow functions
-   [**ImageOptim-CLI**](https://github.com/JamieMason/ImageOptim-CLI)<br>Automates ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimisation of images part of your automated build process.
-   [**Jasmine-Matchers**](https://github.com/JamieMason/Jasmine-Matchers)<br>Write Beautiful Specs with Custom Matchers
-   [**karma-benchmark**](https://github.com/JamieMason/karma-benchmark)<br>Run Benchmark.js over multiple Browsers, with CI compatible output
-   [**self-help**](https://github.com/JamieMason/self-help#readme)<br>Interactive Q&A Guides for Web and the Command Line
-   [**syncpack**](https://github.com/JamieMason/syncpack#readme)<br>Manage multiple package.json files, such as in Lerna Monorepos and Yarn Workspaces

## 🤓 Author

<img src="https://www.gravatar.com/avatar/acdf106ce071806278438d8c354adec8?s=100" align="left">

I'm [Jamie Mason] from [Leeds] in England, I began Web Design and Development in 1999 and have been Contracting and offering Consultancy as Fold Left Ltd since 2012. Who I've worked with includes [Sky Sports], [Sky Bet], [Sky Poker], The [Premier League], [William Hill], [Shell], [Betfair], and Football Clubs including [Leeds United], [Spurs], [West Ham], [Arsenal], and more.

<div align="center">

[![Follow JamieMason on GitHub][github badge]][github]      [![Follow fold_left on Twitter][twitter badge]][twitter]

</div>

<!-- images -->

[github badge]: https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow

[twitter badge]: https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow

<!-- links -->

[arsenal]: https://www.arsenal.com

[betfair]: https://www.betfair.com

[github]: https://github.com/JamieMason

[jamie mason]: https://www.linkedin.com/in/jamiemasonleeds

[leeds united]: https://www.leedsunited.com/

[leeds]: https://www.instagram.com/visitleeds

[premier league]: https://www.premierleague.com

[shell]: https://www.shell.com

[sky bet]: https://www.skybet.com

[sky poker]: https://www.skypoker.com

[sky sports]: https://www.skysports.com

[spurs]: https://www.tottenhamhotspur.com

[twitter]: https://twitter.com/fold_left

[west ham]: https://www.whufc.com

[william hill]: https://www.williamhill.com
