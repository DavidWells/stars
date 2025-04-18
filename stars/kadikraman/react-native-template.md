---
repo: kadikraman/react-native-template
url: 'https://github.com/kadikraman/react-native-template'
homepage: null
starredAt: '2021-08-10T15:21:22Z'
createdAt: '2021-05-15T15:09:07Z'
updatedAt: '2025-01-22T16:59:24Z'
language: Java
license: NA
branch: main
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:48.323Z'
description: A template for a new React Native project
tags: []
---

# React Native Template

To initialise a new React Native project using this template, run:

```sh
npx react-native init MyApp --template https://github.com/kadikraman/react-native-template.git
```

<div style="display:flex">  
  <img src="https://user-images.githubusercontent.com/6534400/118372223-7828b900-b5a8-11eb-81ab-6ef1948f4c6c.png" width="45%" />
  <img src="https://user-images.githubusercontent.com/6534400/118372260-af976580-b5a8-11eb-941d-a4e90ab5189f.png" width="49%" />
</div>

## Why?

I wanted a custom template for starting a new React Native project since I kept doing the same steps (folder layout, styles, types, navigation) over and over again for new project so I decided to condense these into a project template.

Probably most notably, this template comes with a basic bottom + stack + modal navigation setup using [React Navigation v6](https://reactnavigation.org/docs/6.x/getting-started).

![navigation](https://user-images.githubusercontent.com/6534400/118393314-6f7ec400-b636-11eb-8c9d-c7ccec924931.png)

## What's included

Building on top of the default React Native TypeScript template, with some modifications.

- [TypeScript v4](https://www.typescriptlang.org/)
- [React Navigation v6](https://reactnavigation.org/docs/6.x/getting-started)

## Notable modifications:

- basic navigation:
  - 2 bottom tabs
  - one full screen modal
  - one stack navigator
- TypeScript module alias to `~src`
