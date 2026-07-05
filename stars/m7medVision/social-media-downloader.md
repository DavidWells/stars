---
repo: m7medVision/social-media-downloader
url: 'https://github.com/m7medVision/social-media-downloader'
homepage: 'https://www.npmjs.com/package/social_media_downloader'
starredAt: '2022-02-22T04:32:38Z'
createdAt: '2022-01-27T19:49:26Z'
updatedAt: '2024-01-14T06:48:54Z'
language: JavaScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:15.160Z'
description: >-
  This is simple Deno && Node Js packages that download form common social media
  sites
tags:
  - deno
  - deno-module
  - javascript
  - js
  - nodejs
  - twitter
  - youtube
---

# Social Media Downloader
This is a simple library in Node Js and Deno to download videos from social media websites. It supports TikTok, Twitter, Youtube, and SnapChat. if want any other social media website, please open an issue.<br><br>
<img src="https://img.shields.io/github/issues/majhcc/social-media-downloader">&nbsp;
<img src="https://img.shields.io/github/last-commit/majhcc/social-media-downloader">&nbsp;
<img src="https://tokei.rs/b1/github/majhcc/social-media-downloader">&nbsp;
<img src="https://img.shields.io/github/license/majhcc/social-media-downloader">&nbsp;
<img src="https://img.shields.io/bundlephobia/min/social_media_downloader">&nbsp;

## Installing
```sh
npm install social_media_downloader
```

## Importing in node js
```javascript
const dl = require("social_media_downloader");
```

## Using in node js

## Tiktok
```javascript
let link = "https://www.tiktok.com/@billieeilish/video/7014570556607433990"; // here put the link
(
    async () => {
        let result = await dl.tiktok(link); // The result is a json
        console.log(result);
    }
)();
```

## Twitter
```javascript
let link = "https://twitter.com/AJArabic/status/1476130879437037569"; // here put the link
(
    async () => {
        let result = await dl.twitter(link); // The result is a json
        console.log(result);
    }
)();
```

## Youtube
```javascript
let link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // here put the link
(
    async () => {
        let result = await dl.youtube(link); // The result is a json
        console.log(result);
    }
)();
```
## SnapChat
```javascript
let username = "hatanbado"; // here put the username
(
    async () => {
        const data = await dl.snapchat(username); // The result is a json
        console.log(data);
    }
)();
```

## Importing in Deno
```javascript
import * as dl from 'https://deno.land/x/social_media_downloader/mod.ts';
```

## Using in Deno

## Tiktok
```javascript
const result = await dl.tiktok("https://www.tiktok.com/@billieeilish/video/7014570556607433990");
console.log(result);
```

## Twitter
```javascript
const result = await dl.twitter('https://twitter.com/AJArabic/status/1476130879437037569');
console.log(result);
```

## Youtube
```javascript
const result = await dl.youtube('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
console.log(result);
```

## Snapchat
```javascript
const result = await dl.snapchat('username_HERE');
console.log(result);
```
