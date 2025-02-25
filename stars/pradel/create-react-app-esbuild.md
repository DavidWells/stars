---
repo: pradel/create-react-app-esbuild
url: 'https://github.com/pradel/create-react-app-esbuild'
homepage: ''
starredAt: '2021-01-12T04:42:41Z'
createdAt: '2020-10-11T15:41:48Z'
updatedAt: '2025-02-08T00:00:22Z'
language: JavaScript
license: MIT
branch: main
stars: 564
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:07.729Z'
description: >-
  Use esbuild in your create-react-app for faster compilation, development and
  tests
tags:
  - craco
  - create-react-app
  - esbuild
---

# 🚀 create-react-app-esbuild 🚀

Use [esbuild](https://github.com/evanw/esbuild) in your [create-react-app](https://create-react-app.dev/) for faster compilation, development and tests.

## Features

- Replace babel-loader with esbuild during development
- Replace babel-loader with esbuild for faster build time
- Replace terser with esbuild for faster build time
- Replace OptimizeCssAssetsWebpackPlugin with esbuild for faster build time
- Use esbuild when running jest

## Getting started

Follow the [guide](https://github.com/pradel/create-react-app-esbuild/blob/main/packages/craco-esbuild/README.md) to setup your project.

## FAQ

### Why is it faster?

Internally create-react-app use babel to compile the javascript / typescript files of your application. By using craco-esbuild, you use the [esbuild](https://github.com/evanw/esbuild) compiler to compile your app instead of babel. esbuild is a super fast javascript / typescript bundler and minifier written in Go.

### What is craco and why do I need it?

[craco](https://github.com/gsoft-inc/craco) (**C**reate **R**eact **A**pp **C**onfiguration **O**verride) is an easy and comprehensible configuration layer for create-react-app. By using craco you can customise the create-react-app configuration without ejecting.

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
