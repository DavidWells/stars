---
repo: swiftxru/nuxt-utm-adder
url: 'https://github.com/swiftxru/nuxt-utm-adder'
homepage: ''
starredAt: '2022-03-11T02:53:25Z'
createdAt: '2022-03-09T14:24:18Z'
updatedAt: '2024-02-23T07:35:21Z'
language: JavaScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:01.279Z'
description: Plugin to add utm tags to all links on a page
tags:
  - nuxt
  - nuxt-module
  - nuxtjs
  - seo
  - utm
  - vue
---

# Nuxt UTM Adder
![Size](https://img.shields.io/bundlephobia/minzip/@norvikit/nuxt-utm-adder)
![Version](https://img.shields.io/npm/v/@norvikit/nuxt-utm-adder)
![Downloads](https://img.shields.io/npm/dt/@norvikit/nuxt-utm-adder)

## 📃 Description
Plugin to add utm tags to all links on a page

## 📦 Installation

### NPM

`npm install --save @norvikit/nuxt-utm-adder`

### Yarn

`yarn add @norvikit/nuxt-utm-adder`

## 🚀 Usage

```
// nuxt.config.js

buildModules: [
  '@norvikit/nuxt-utm-adder'
]
// or

buildModules: [
  ['@norvikit/nuxt-utm-adder', {
    // Your options
  }]
]
```

## 🔧 Options

```
// nuxt.config.js
// Default options

buildModules: [
  ['@norvikit/nuxt-utm-adder', {
    // Utm tags to track
    utmTags: [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ],
    // Save utm tags to cookies
    saveCookies: true,
  }]
]
```
