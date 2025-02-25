---
repo: TrevorSundberg/puppeteer-in-electron
url: 'https://github.com/TrevorSundberg/puppeteer-in-electron'
homepage: ''
starredAt: '2020-03-03T04:01:20Z'
createdAt: '2019-08-03T19:28:29Z'
updatedAt: '2025-02-11T06:51:18Z'
language: TypeScript
license: MIT
branch: master
stars: 348
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:04.071Z'
description: Use puppeteer to test and control your electron application.
tags: []
---

# Introducing puppeteer-in-electron
Use puppeteer to test and control your electron application.
```
npm install puppeteer-in-electron puppeteer-core electron
```

See the [API documentation](/API.md).

# JavaScript
```javascript
const {BrowserWindow, app} = require("electron");
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");

const main = async () => {
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);
 
  const window = new BrowserWindow();
  const url = "https://example.com/";
  await window.loadURL(url);
 
  const page = await pie.getPage(browser, window);
  console.log(page.url());
  window.destroy();
};

main();
```

# TypeScript
```typescript
import {BrowserWindow, app} from "electron";
import pie from "puppeteer-in-electron";
import puppeteer from "puppeteer-core";

const main = async () => {
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow();
  const url = "https://example.com/";
  await window.loadURL(url);

  const page = await pie.getPage(browser, window);
  console.log(page.url());
  window.destroy();
};

main();
```
