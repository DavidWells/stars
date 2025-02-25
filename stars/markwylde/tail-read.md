---
repo: markwylde/tail-read
url: 'https://github.com/markwylde/tail-read'
homepage: ''
starredAt: '2022-11-12T20:26:26Z'
createdAt: '2020-05-19T12:18:43Z'
updatedAt: '2024-06-29T19:26:15Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:10.698Z'
description: >-
  Continuously read a file and emit an event when a new line (or custom
  delimiter) is found
tags: []
---

# Tail Read
Read the contents of a file and keep it open, streaming changes.

```javascript
import tailRead from 'tail-read';

const tail = tailRead('./test.txt');

tail.on('line', function(data, lineNumber, bufferPosition) {
  console.log('Appended data: ', data)
  console.log('Line number: ', lineNumber)
  console.log('Buffer position: ', bufferPosition)
});

setTimeout(function () {
  tail.close()
  console.log('closed')
}, 5000)
```
