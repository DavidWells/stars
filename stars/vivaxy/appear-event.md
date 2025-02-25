---
repo: vivaxy/appear-event
url: 'https://github.com/vivaxy/appear-event'
homepage: 'https://github.com/vivaxy/appear-event'
starredAt: '2019-10-06T23:12:02Z'
createdAt: '2019-07-26T06:12:56Z'
updatedAt: '2024-05-24T05:34:48Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:17.416Z'
description: "\U0001F440Element appear event."
tags:
  - add-event-listener
  - appear
  - appear-event
  - custom-event
  - custom-events
  - disappear
  - disappear-event
  - dom
  - event
  - events
  - html
  - intersection-observer
  - onappear
  - ondisappear
  - web-api
---

# appear-event

Element appear event.

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Standard Version][standard-version-image]][standard-version-url]
[![Codecov][codecov-image]][codecov-url]
[![DOI](https://zenodo.org/badge/198957393.svg)](https://zenodo.org/badge/latestdoi/198957393)

# Install

`yarn add appear-event` or `npm i appear-event --save`

# Usage

## `observe` and `unobserve`

```js
const { observe, unobserve } = require('appear-event');

const el = getElementSomehow();
const eventListenerOptions = getEventListenerOptions();
const intersectionObserverOptions = getIntersectionObserverOptions();

function onAppear(appearEvent) {
  // element appeared
}

function onDisappear(disappearEvent) {
  // element disappeared
}

observe(el, intersectionObserverOptions); // watch for appear and disappear event
el.addEventListener('appear', onAppear, eventListenerOptions);
el.addEventListener('disappear', onDisappear, eventListenerOptions);
el.removeEventListener('appear', onAppear, eventListenerOptions);
el.removeEventListener('disappear', onDisappear, eventListenerOptions);
unobserve(el, intersectionObserverOptions); // unwatch for appear and disappear event
```

### `eventListenerOptions`

[addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)

### `intersectionObserverOptions`

[IntersectionObserver Properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties)

### `appearEvent` and `disappearEvent`

[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

#### `detail`

`appearEvent.detail` and `disappearEvent.detail` is an [IntersectionObserveEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

## event-listeners

```js
const { addAppearListener, addDisappearListener, removeAppearListener, removeDisappearListener } = require('appear-event/lib/event-listener');

const el = getElementSomehow();
const eventListenerOptions = getEventListenerOptions();
const intersectionObserverOptions = getIntersectionObserverOptions();

function onAppear(appearEvent) {
  // element appeared
}

function onDisappear(disappearEvent) {
  // element disappeared
}

addAppearListener(el, onAppear, { ...eventListenerOptions, ...intersectionObserverOptions });
addDisappearListener(el, onDisappear, { ...eventListenerOptions, ...intersectionObserverOptions });
removeAppearListener(el, onAppear, { ...eventListenerOptions, ...intersectionObserverOptions });
removeDisappearListener(el, onDisappear, { ...eventListenerOptions, ...intersectionObserverOptions });
```

## In React

See [demo](./demo/src/App.js)
Also see [jsx-native-events](https://github.com/calebdwilliams/jsx-native-events)

## FAQ

**Q:** Does zero area elements appears when they are in the screen?

**A:** Yes. And if you'd like to tell if the element is a zero area element, use `event.detail.boundingClientRect` to get the element dimensions.

#

Project created by [create-n](https://github.com/vivaxy/create-n).

[travis-image]: https://img.shields.io/travis/vivaxy/appear-event.svg?style=flat-square
[travis-url]: https://travis-ci.org/vivaxy/appear-event
[npm-version-image]: https://img.shields.io/npm/v/appear-event.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/appear-event
[npm-downloads-image]: https://img.shields.io/npm/dt/appear-event.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/appear-event.svg?style=flat-square
[license-url]: LICENSE
[standard-version-image]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=flat-square
[standard-version-url]: https://github.com/conventional-changelog/standard-version
[codecov-image]: https://img.shields.io/codecov/c/github/vivaxy/appear-event.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/vivaxy/appear-event
