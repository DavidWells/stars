---
repo: pmndrs/use-cannon
url: 'https://github.com/pmndrs/use-cannon'
homepage: 'https://cannon.pmnd.rs'
starredAt: '2020-03-04T16:22:36Z'
createdAt: '2020-03-03T12:57:37Z'
updatedAt: '2025-02-25T08:09:46Z'
language: TypeScript
license: NA
branch: master
stars: 2837
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:03.818Z'
description: "\U0001F44B\U0001F4A3 physics based hooks for @react-three/fiber"
tags:
  - cannon-js
  - physics
  - react
  - reactjs
---

[![Build Status](https://img.shields.io/github/actions/workflow/status/pmndrs/use-cannon/nodejs.yml?branch=master&style=flat&colorA=000000&logo=github)](https://github.com/pmndrs/use-cannon/actions/workflows/nodejs.yml)
[![Discord Shield](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff)](https://discord.gg/poimandres)

![Imgur](https://imgur.com/FpBsJPL.jpg)

Monorepo for [cannon-es](https://github.com/pmndrs/cannon-es) web worker packages.

| Package                                                                  | Description                                                                                                                                                      |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@react-three/cannon`](./packages/react-three-cannon)                   | React hooks for [cannon-es](https://github.com/pmndrs/cannon-es). Use this in combination with [react-three-fiber](https://github.com/pmndrs/react-three-fiber). |
| [`@pmndrs/cannon-worker-api`](./packages/cannon-worker-api)              | Web worker api for [cannon-es](https://github.com/pmndrs/cannon-es). Used by `@react-three/cannon`.                                                              |
| [`@react-three/cannon-examples`](./packages/react-three-cannon-examples) | Examples for `@react-three/cannon`                                                                                                                               |

## `use-cannon` Documentation

Please see the [`@react-three/cannon` README](./packages/react-three-cannon/README.md) documentation and getting started guide for using the react hooks and jsx interface.

## Demos

Check out all of our `@react-three/cannon` examples at https://cannon.pmnd.rs

The code for the examples lives in [./packages/react-three-cannon-examples](./packages/react-three-cannon-examples)
