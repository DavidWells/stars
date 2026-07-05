---
repo: colshacol/storage-changed
url: 'https://github.com/colshacol/storage-changed'
homepage: 'https://www.npmjs.com/package/storage-changed'
starredAt: '2018-10-09T04:53:31Z'
createdAt: '2018-06-27T07:03:26Z'
updatedAt: '2024-07-30T01:04:37Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:12.281Z'
description: >-
  A tiny function that dispatches events in the same tab that localStorage and
  sessionStorage are changed in.
tags: []
---

# storage-changed

A tiny function that dispatches events in the same tab that `localStorage` and `sessionStorage` are changed in.

**No dependencies!**  
**Much blazing!**  
**Only ~800b!**

```sh
npm i storage-changed
# or, if u r cool...
yarn add storage-changed
```

## The Problem

When `localStorage` or `sessionStorage` are changed, a `storage` event is emitted, but it can only be picked up by other open tabs of the same origin. Sometimes you need access to that event in the tab that it was dispatched from, as well.

```js
// Does not work.
window.addEventListener('storage', doCoolShit)
localStorage.setItem('foo', 'bar')
```

## The Solution

The solution is `storage-changed`, obviously.

```js
import storageChanged from 'storage-changed'

storageChanged('local')

// Now this shit do work!
window.addEventListener('storageChanged', doCoolShit)
```

## The Options

The first argument must be a string, one of: `"local"` or `"session"` to determine which storage you wish to emit events for.

You can pass an options object as the second argument to `storageChanged`. This options object currently supports one property: `eventName`. Setting the `eventName` will allow you flexibility to have different names for different targets, such as `localStorage` and `sessionStorage`.

```js
storageChanged('session', {
  eventName: 'TonyDanza'
})

window.addEventListener('TonyDanza', doBadAssShit)
```

## The Event

As with any event listener, an event is provided to your callback. In this instance, I don't know what the fuck all is in the event, but I can guarantee you that `event.detail` will have two properties: `key`, and `value`. These values represent the storage key that changed and the new value that accompanies the change.

```js
storageChanged('local', {
  eventName: 'TonyDanza'
})

window.addEventListener('TonyDanza', (event) => {
  console.log(event)
})

localStorage.setItem('foo', 'bar')
// { key: 'foo', value: 'bar' }
```
