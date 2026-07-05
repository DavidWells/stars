---
repo: dancrumb/fallback-plan
url: 'https://github.com/dancrumb/fallback-plan'
homepage: null
starredAt: '2022-11-03T01:27:42Z'
createdAt: '2017-01-21T03:27:02Z'
updatedAt: '2024-01-12T18:04:08Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:13.785Z'
description: A module for supporting fallbacks for promises
tags: []
---

# Fallback Plan

[![NPM](https://nodei.co/npm/@dancrumb/fallback-plan.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@dancrumb/fallback-plan/)

[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/dancrumb/fallback-plan?style=for-the-badge)](https://codeclimate.com/github/dancrumb/fallback-plan)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/dancrumb/fallback-plan?style=for-the-badge)](https://codeclimate.com/github/dancrumb/fallback-plan/coverage)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dancrumb/fallback-plan/Build%20and%20Test?style=for-the-badge)


Wouldn't it be nice if everything went smoothly?

Sure it would, but networks are unreliable and sources aren't always present.

As a result, a lot of the code we write is dealing with things when they go wrong.

This module is designed to help you with that.

## Dealing with failure

Let's say you're trying to do the following: You want to access an online resource and, if that's 
not available or corrupted, you'll try a different one and, if that's not available or corrupted, 
you'll try a local file and, if that's not available or corrupted, you'll just resort to something default.

Something like this might ensue:

```
getRemoteResource('foo')
    .catch(() => getRemoteResource('foo2'))
    .catch(() => getLocalResource('foo3'))
    .catch(() => getDefault())
    .then(handleResource);
```

That's not the worse code in the world, but it's not very dynamic.

It _could_ be built with:

```
[
    () => getRemoteResource('foo'),
    () => getRemoteResource('foo2'),
    () => getLocalResource('foo3'),
    () => getDefault()
].reduce((chain, resourceGetter) => {
    if(chain) {
        return chain.catch(resourceGetter);
    }
    return resourceGetter();
}).then(handleResource);
```
This solves the non-dynamic problem, but we've now got a hulking great reducer in your code
whose purpose is not exactly obvious.

In addition, this all assumes that your sources return promises. Some of them may be accessed
synchronously. It may not really be warranted to convert them into promises.

Enter `fallback-plan`

# Installation

```
npm i @dancrumb/fallback-plan
```

or

```
yarn add @dancrumb/fallback-plan
```

# API

For more examples, please visit our [Github Page](https://fallback-plan.dancrumb.com/)

# FAQs
Here are some answers to questions you may have.
## Can I nest plans within plans?

Since all of the fallback plan options ultimately return a Promise, you can nest them:

```
fallback([
    cycle([
        'foo',
        'foo2'
    ], getRemoteResource),
    () => getLocalResource('foo3'),
    getDefault
]).then(useResource);
```

## Why not just use Promise.race or Promise.any?
These types of methods are pretty cool, but they execute *all* of the Promises in order to determine
which finishes first.

If you have a fallback plan with numerous possible options and some of these are costly, the last thing
you want to do is to fire them off unnecessarily. `fallback-plan` only calls a function
that returns a Promise if it needs to.

## Why use functions that return Promises rather than Promises themselves?
Same reason as given in the examples above. If you did:

```
fallback([
    getRemoteResource('foo'),
    getRemoteResource('foo2'),
    getLocalResource('foo3'),
    getDefault
]).then(useResource);
```

then you would have requested `'foo'`, `'foo2'` and `'foo3'`... even if `'foo'` comes back 
without a problem!

# License
This module is provided under the [MIT License](MIT).

[MIT]: https://spdx.org/licenses/MIT
[iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable
