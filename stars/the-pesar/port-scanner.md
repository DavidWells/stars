---
repo: the-pesar/port-scanner
url: 'https://github.com/the-pesar/port-scanner'
homepage: ''
starredAt: '2022-02-22T01:40:09Z'
createdAt: '2022-01-29T14:32:31Z'
updatedAt: '2024-06-03T06:04:42Z'
language: JavaScript
license: NA
branch: main
stars: 44
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:15.956Z'
description: Minimal Port Scanner with Javascript (NodeJs)
tags:
  - javascript
  - js
  - nodejs
  - port
  - portscanner
---

# port-scanner

### Installation

```
npm install pscanner
```

example:

```javascript
const portScan = require("pscanner");

const main = async () => {
  const isOpen = await portScan({ host: "8.8.8.8", port: 443 });
  console.log(isOpen); // true
};

main();
```

support CallBack function:

```javascript
const portScan = require("pscanner");

portScan({
  host: "8.8.8.8",
  port: 100,
  callback: (isOpen, port) => {
    console.log(isOpen, port);
    // false 100
  },
});
```

set timeout connection (default 200ms):

```javascript
const portScan = require("pscanner");

const main = async () => {
  const isOpen = await portScan({
    host: "8.8.8.8",
    port: 443,
    timeout: 100,
  });
  console.log(isOpen); // true
};

main();
```
