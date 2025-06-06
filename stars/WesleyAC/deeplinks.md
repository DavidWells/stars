---
repo: WesleyAC/deeplinks
url: 'https://github.com/WesleyAC/deeplinks'
homepage: ''
starredAt: '2021-12-31T03:30:32Z'
createdAt: '2021-11-27T07:59:38Z'
updatedAt: '2025-02-22T01:19:53Z'
language: TypeScript
license: MIT
branch: main
stars: 520
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:24.870Z'
description: Simple deep links to any selection of text on your website.
tags:
  - es6
  - hypertext
  - javascript
  - library
  - links
  - typescript
  - web
---

# `deeplinks.js`

[![tests badge](https://img.shields.io/github/workflow/status/WesleyAC/deeplinks/tests?label=tests&logo=github)](https://github.com/WesleyAC/deeplinks/actions/workflows/tests.yml)
[![browser support: 94%](https://img.shields.io/badge/browser%20support-94%25-informational)](/docs/browser_support.md) <!-- as of: dec 2021 -->
[![license: MIT](https://img.shields.io/badge/license-MIT-informational)](/license)

`deeplinks.js` allows people to easily link directly to any text selection on your website. [Here's](https://notebook.wesleyac.com/what-hypertext-could-be/#1GHfGDDIwx:21:63) an example of what one of these links looks like. It's intended mostly for blogs and other such websites, but it's relatively agnostic to the environment it's running in.

People can select text on the site as the normally would, and when they do, the [fragment identifier](https://en.wikipedia.org/wiki/URI_fragment) (the thing that comes after the `#` in the URL) changes. If they want to share the text they have selected, they simply copy the URL and send it to someone. When that person visits the URL, the same text that was originally selected will be selected and scrolled into view.

This description might make it sound a little complicated, but it's actually pretty simple and intuitive once you play with it — go check it out! If you're interested in knowing the details of how it works under the hood, check out [`docs/design/`](/docs/design).

## Goals

* Plug-and-play. Copy the files, drop `<script type="module" src="/deeplinks/deeplinks.js"></script>` in your website, and it works.
* Robust. Updates will not break links to older URLs.
* Short links. Long URLs are ugly and frequently mangled by messaging apps. URLs should be short and not contain characters likely to be mangled by misbehaving apps.
* Subtle. It shouldn't get in the reader's way. It doesn't break normal fragment-identifier links.
* Reasonably small. It's around 1.7kb gzipped right now (1.6kb brotli), and shouldn't grow too much more.
* Fast. This isn't hard, but it's worth making explicit.

## Non-goals

* Handling frequently-changing content, such as wikis. It should be robust to occasional small edits, but if you want truly robust deep linking, you really need support from the authoring environment (CRDTs, etc).
* Working for every usecase. I have specific things that I want in a script like this, and other people will have other things they want. Those people should build their own similar scripts — diversity is good! For instance, this intentionally does not implement the [WICG Text Fragment](https://wicg.github.io/scroll-to-text-fragment/) interface, although it's possible it may in the future if that ends up standardized in a form that I like.

## Installation

First, consider whether you really want to do this. If you do, you are making new URLs, which will break if you ever remove the script from your site. Breaking URLs makes me sad, so you should think about whether you're really committed to this or not, and maybe play with it locally for a little while to see how it feels before you really deploy it.

Once you're sure:

* Download the most recent release from the [releases page](https://github.com/WesleyAC/deeplinks/releases).
* Extract the zip file somewhere in your website.
* Include the script anywhere in your html:
  ```html
  <script type="module" src="/deeplinks/deeplinks.js"></script>
  ```
  This assumes you extracted the release into a directory called `deeplinks` — you'll need to change the `src` if you put it somewhere else. Make sure you include the `type="module"`, it won't work otherwise! You should only include it on pages that won't change frequently — particularly, don't include it on pagination pages where the content changes as you publish new posts, for instance.
* Test that it works.
* If you're feeling nice, fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSdoQuU3GBhGD2z8lFhN8KtVqcBvKBX1XZ3BgOQv7h91PCgziA/viewform) with a link to your website! (Or just [email me](mailto:me@wesleyac.com), if you don't like Google Forms)
