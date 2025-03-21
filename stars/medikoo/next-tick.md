---
repo: medikoo/next-tick
url: 'https://github.com/medikoo/next-tick'
homepage: ''
starredAt: '2018-11-02T18:09:25Z'
createdAt: '2012-08-29T19:56:10Z'
updatedAt: '2025-01-08T05:37:49Z'
language: JavaScript
license: ISC
branch: master
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:07.114Z'
description: Environment agnostic nextTick polyfill
tags: []
---

# next-tick
## Environment agnostic nextTick polyfill

To be used in environment agnostic modules that need nextTick functionality.

- When run in Node.js `process.nextTick` is used
- In modern engines, microtask resolution is guaranteed by `queueMicrotask`
- In older browsers, `MutationObserver` is used as a fallback 
- In other engines `setImmediate` or `setTimeout(fn, 0)` is used as fallback.
- If none of the above is supported module resolves to `null`

## Installation
### NPM

In your project path:

	$ npm install next-tick

#### Browser

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

## Tests [![Build Status](https://api.travis-ci.org/medikoo/next-tick.png?branch=master)](https://travis-ci.org/medikoo/next-tick)

	$ npm test

## Security contact information

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-next-tick?utm_source=npm-next-tick&utm_medium=referral&utm_campaign=readme">Get professional support for d with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
