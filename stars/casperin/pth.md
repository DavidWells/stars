---
repo: casperin/pth
url: 'https://github.com/casperin/pth'
homepage: ''
starredAt: '2022-04-04T14:58:05Z'
createdAt: '2017-08-07T20:40:22Z'
updatedAt: '2022-04-04T14:58:05Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:50.203Z'
description: Dotting into objects
tags: []
---

# pth - What

`pth` ("path") is a simple helper for selectors in a React Redux environment.
It simplifies the act of creating a function that pics out certain parts of
your state depending on the arguments passed in.

## Install

```sh
npm i pth
```

## How

At its simplest, you can compare these two functions:

```js
// raw js
const getNameById = (state, id) => {
    const user = state.users[id]
    return user && user.name
}

// pth
const getNameById = pth('$0.users.$1.name')
```

So `pth` returns a function that takes an arbitrary number of arguments and
attempts to access the property you are looking for. If it fails, it returns
`undefined`.

Of course you can also use it to create small utility functions for accessing
properties on objects:

```js
const getFirstName = pth('$0.firstName')
const getLastName = pth('$0.lastName')
// etc...
```

## options argument

`pth` also takes an `options` object as second parameter, where you can change
a few things:

```js
// If name isn't found, return 'Mr Nobody'
const getNameById = pth('$0.users.$1.name', {or: 'Mr Nobody'})

// Change the identifier from $ to %
const getNameById = pth('%0.users.%1.name', {identifier: '%'})

// Change the splitter from . to ->
const getNameById = pth('%0->users->%1->name', {splitter: '->'})
```

## pth.fromObject

There is a second version where the returned function only takes two arguments:

1. the object where we expect to find the data we are looking for, and
2. an object with the keys we need

The path string we pass to it also looks a little different (better if you ask
me).

These two are equevalent:

```js
// raw js
const getNameById = (state, {id}) => {
    const user = state.users[id]
    return user && user.name
}

// pth
const getNameById = pth.fromObject('users.$id.name')
```

This version takes the same `options` object as second parameter as the above.

## Because too much magic?

If giving `pth` a string is too much magic for you, then know that it also
takes an array.

```js
const getNameById = pth(['$0', 'users', '$1', 'name'])

const getNameById = pth.fromObject(['users', '$id', 'name'])
```

## Tiny caution

I don't recommend "building" the function every time you call it. That is, this
is probably not a great idea:

```js
const getName = user => pth('$0.name')(user)
```

The reason is performance. It's not that it is particularly slow; but it *is*
splitting up a string and looping through each of the sections every time; so
really it's better to just build the function ahead of time.
