---
repo: JoviDeCroock/React-angler
url: 'https://github.com/JoviDeCroock/React-angler'
homepage: null
starredAt: '2019-01-23T18:30:26Z'
createdAt: '2018-10-27T21:54:01Z'
updatedAt: '2023-08-26T08:12:20Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:50.356Z'
description: >-
  POC to make functional components have a similar API to class components. This
  by using Hooks to our best use.
tags: []
---

# React-angler

[![npm version](https://badge.fury.io/js/react-angler.svg)](https://badge.fury.io/js/react-angler)
[![Build Status](https://travis-ci.org/JoviDeCroock/React-angler.svg?branch=master)](https://travis-ci.org/JoviDeCroock/React-angler)
[![Bundle size](https://badgen.net/bundlephobia/minzip/react-angler)](https://badgen.net/bundlephobia/minzip/react-angler)
[![codecov](https://codecov.io/gh/JoviDeCroock/React-angler/branch/master/graph/badge.svg)](https://codecov.io/gh/JoviDeCroock/React-angler)

Personally i love functionally approaching problems, that's why i challenged myself to make
this little library. This was a good introduction to TypeScript aswell.

Enjoy!

## Installation

**yarn**

```bash
  yarn add react-angler
```

**npm**

```bash
  npm i --save react-angler
```

**UMD**

_dev_:

```html
<script src="https://unpkg.com/react-angler@latest/dist/react-angler.umd.js"></script>
```

_prod_:

```html
<script src="https://unpkg.com/react-angler@latest/dist/prod/react-angler.umd.js"></script>
```

## The hooks

### component-hooks

| name  | input  | output  |
|---|---|---|
| useActive  | /  | [ref, isActive]  |
| useComponentSize  | /  | [ref, { width, height }]  |
| useFocus  |  / |  [ref, isFocussed] |
| useHover  | /  | [ref, isHovered]  |

Just put the received `ref` on a DOMNode and watch the magic happen.

### dom-hooks

| name  | input  | output  |
|---|---|---|
| useTitle  | title  |  / |
| useWindowSize  |   | { width, height}  |

useTitle sets the pageTitle in head.

### lifecycle-hooks

| name  | input  | output  |
|---|---|---|
| useDidMount  | function  | /  |
| useDidUnmount  | function  | /  |
| useDidUpdate | function, arrayOfWatchableProps  |  / |

`useDidUpdate` is good combined with usePreviousValue to see prevProps and current props.

### state-hooks

| name  | input  | output  |
|---|---|---|
| useArray  | initialValue  |   |
| useCounter  | initialValue  | { decrease, increase, setValue, value }  |
| useInput  | initialValue  |  { clear, setValue, onChange, value } |
| useMap  | initialValue | { get, getMultiple, remove, set, value }  |
| useState  | initialValue  | { setState, state }  |
| useToggle  | initialValue  | { toggle, setTrue, setFalse, value }  |

inputs here are optional and will default to a reasonable default.

#### Array-payload

- add: takes an element and adds it.
- clear: gives you a new empty array
- makeUnique: removes duplicate values (by refference)
- remove: given a function that returns a new array
- removeByElement: given an element removes it
- removeByIndex: given an index removes it
- setValue: manually set the array
- value: the array

### util-hooks

| name  | input  | output  |
|---|---|---|
| usePreviousValue  | any var  | previous value of that var  |
| useLocalStorage  | key, initial | { setValue, value }  |
| useNetworkStatus  |  / | currentNetworkStatus  |
