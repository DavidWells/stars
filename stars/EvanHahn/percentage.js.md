---
repo: EvanHahn/percentage.js
url: 'https://github.com/EvanHahn/percentage.js'
homepage: 'https://git.sr.ht/~evanhahn/percentage.js'
starredAt: '2015-03-13T15:52:16Z'
createdAt: '2014-10-16T14:34:49Z'
updatedAt: '2024-12-08T11:50:13Z'
language: JavaScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:47.627Z'
description: 'Project is now at https://git.sr.ht/~evanhahn/percentage.js'
tags: []
---

# Percentage.js

A simple function to convert numbers to string percentages.

```javascript
import percentage from "percentage";

percentage(0.12); // "12%"
percentage(1); // "100%"
percentage(-0.1); // "-10%"
percentage(1 / 3); // "33%"

percentage(0.1234); // "12%"
percentage(0.1234, 0); // "12%"
percentage(0.1234, 1); // "12.3%"
percentage(0.1234, 2); // "12.34%"

percentage(Infinity); // "∞%"
```
