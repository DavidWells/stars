---
repo: deejayy/ts-depgraph
url: 'https://github.com/deejayy/ts-depgraph'
homepage: ''
starredAt: '2020-12-12T01:09:37Z'
createdAt: '2020-12-05T16:13:21Z'
updatedAt: '2024-10-15T20:09:05Z'
language: JavaScript
license: NA
branch: master
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:17.906Z'
description: >-
  Generate a visually stunning dependency graph from your Angular or Typescript
  project
tags:
  - angular
  - dependency
  - graph
  - typescript
  - visjs
---

# Typescript (Angular) Dependency Graph drawer

Uses vis.js, check it out, it's pretty cool.

# Usage

```sh
npm install -g ts-depgraph
```

## Customize ```depgraph.config.js``` if you want

You can check the example in the package directory (```depgraph.config.js.example```) or you can leave it out completely, default starting folder is the current.

```projectDirectory```: this is the directory where your ```src``` directory is. Without trailing slash.  
```tsconfig```: if you have path aliases defined in tsconfig, you can refer it here. Otherwise ```projectDirectory/tsconfig.json``` is used.  

## Run graph generator

```bash
ts-depgraph
```

## Open depgraph.html

![](https://github.com/deejayy/ts-depgraph/raw/master/screenshot/shot-01.png)

Dark mode, yay!

![](https://github.com/deejayy/ts-depgraph/raw/master/screenshot/shot-02.png)
