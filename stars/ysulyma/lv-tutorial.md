---
repo: ysulyma/lv-tutorial
url: 'https://github.com/ysulyma/lv-tutorial'
homepage: ''
starredAt: '2022-03-16T02:19:29Z'
createdAt: '2021-01-19T06:59:17Z'
updatedAt: '2024-05-19T02:17:38Z'
language: JavaScript
license: NA
branch: main
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:58.491Z'
description: Tutorial for Liqvid
tags:
  - liqvid
---

To start server:

```
npm install
liqvid serve
```

Your browser should then open to http://localhost:3000. To run on a different port, you can use e.g. `liqvid serve -p 8080`.

To make production build:
```
liqvid build
```

To preview production build:
```
NODE_ENV=production liqvid serve
```

To compile Stylus to CSS:
```
npm run stylus
```
