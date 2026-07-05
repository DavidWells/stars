---
repo: kamyu1537/lz77-wasm
url: 'https://github.com/kamyu1537/lz77-wasm'
homepage: ''
starredAt: '2022-04-03T05:35:18Z'
createdAt: '2022-02-08T03:48:49Z'
updatedAt: '2024-12-08T19:27:12Z'
language: Rust
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:51.819Z'
description: konmai lz77 compression library
tags: []
---

# Lz77-wasm

rust lz77 library built with wasm to be usable in nodejs.

## Installation

```shell
npm i @kamyu/lz77
```

## Build

### Requirements

- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [rust](https://www.rust-lang.org/)

### Command

```shell
npm run build
```

## How to use?

> **parameter:** Buffer or Uint8Array  
> **return:** Uint8Array

### Javascript

```javascript
const fs = require('fs');
const lz77 = require('@kamyu/lz77');

lz77.compress(fs.readFileSync('test.txt'));
lz77.decompress(fs.readFileSync('test.txt.lz77'));
```

### Typescript

```typescript
import * as fs from 'fs';
import * as lz77 from '@kamyu/lz77';

lz77.compress(fs.readFileSync('test.txt'));
lz77.decompress(fs.readFileSync('test.txt.lz77'));
```
