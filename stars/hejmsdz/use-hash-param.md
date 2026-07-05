---
repo: hejmsdz/use-hash-param
url: 'https://github.com/hejmsdz/use-hash-param'
homepage: 'https://www.npmjs.com/package/use-hash-param'
starredAt: '2020-03-30T01:58:04Z'
createdAt: '2019-09-03T20:42:06Z'
updatedAt: '2024-12-10T11:06:37Z'
language: TypeScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:59.830Z'
description: React hook for handling parameters in URL fragment
tags: []
---

# useHashParam

[![Package version on NPM](https://img.shields.io/npm/v/use-hash-param)](https://npmjs.com/package/use-hash-param)
[![Build status](https://img.shields.io/travis/com/hejmsdz/use-hash-param)](https://travis-ci.com/hejmsdz/use-hash-param)
[![Bundle size](https://img.shields.io/bundlephobia/min/use-hash-param)](https://bundlephobia.com/result?p=use-hash-param)

React hook that allows to keep your state in sync with URL parameters.

## Installation

```sh
npm install --save use-hash-param
```

## Usage

```jsx
import React from "react";
import useHashParam from "use-hash-param";

function ControlledInput() {
  const [name, setName] = useHashParam("name");

  return <input value={name || ""} onChange={(e) => setName(e.target.value)} />;
}
```

Anything you type into the input will be reflected in the address bar
(e.g. `http://localhost:3000/#?name=Peter`).
And if you open a link with such a parameter, the field will be populated automatically!

## Example

- [https://codesandbox.io/s/usehashparam-011-example-h8mol](https://codesandbox.io/s/usehashparam-011-example-h8mol)
