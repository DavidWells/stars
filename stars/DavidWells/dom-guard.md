---
repo: DavidWells/dom-guard
url: 'https://github.com/DavidWells/dom-guard'
homepage: 'https://dom-guard.netlify.app'
starredAt: '2022-03-22T21:43:13Z'
createdAt: '2021-03-27T23:20:29Z'
updatedAt: '2024-10-26T06:46:49Z'
language: HTML
license: NA
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:55.636Z'
description: "\U0001F510 Lock DOM node contents to protect people against scammers using browser devtools"
tags:
  - dom-manipulation
  - security
---

# DOM Guard

Stop scammers from the manipulating DOM. [See demo](https://dom-guard.netlify.app)

## About

Scammers are using dev tools to manipulate values in pages to trick unsuspecting victims into sending them money. These victims are typically the elderly. 😢

They connect to their victim's machines via remote desktop software under the guise of tech support or some other well known company.

The scammer then attempts to convince the victim they have received a larger than expected "refund" by manipulating the victim's bank user interface via chrome dev tools with the goal of getting the victim to mail them cash.

See this video for [how the refund scams work](https://www.youtube.com/watch?v=J4mkZU2Y0as).

DOMGuard is a small javascript library (~130 lines of code) & proof of concept to help put an end to these criminals.

## How does this work?

Any changes attempted via Javascript are detected by MutationObserver.

Additionally, guarded DOM nodes are checked via a "hearbeat" every `500ms` to ensure the values are what they should be.

View the <a href="https://github.com/DavidWells/dom-guard/blob/master/index.js">source code</a>.

## Install

```bash
npm install dom-guard
```

## Usage

```js
import DOMGuard from 'dom-guard'

const guard = new DOMGuard({
  selector: '#protected', // DOM Selector to protect
  heartbeat: 1000 // Check for manipulation every 1 second
})

// Initialize DOMGuard on the #protected selector
guard.init()

// Turn off guard
guard.disable()
```

## Running the demo

```bash
npm install
npm run build
npm run serve
```

## Caveats

Please note, there isn't a foolproof solution for stopping social engineering attacks against your users.

Please educate your users on the dangers of these scams & add 2FA etc into your apps.
