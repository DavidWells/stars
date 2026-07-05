---
repo: imtaotao/super-fast-md5
url: 'https://github.com/imtaotao/super-fast-md5'
homepage: null
starredAt: '2022-03-10T04:17:37Z'
createdAt: '2022-03-09T09:17:36Z'
updatedAt: '2024-07-12T16:05:48Z'
language: TypeScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:01.625Z'
description: md5
tags: []
---

<div align="center">
<h2>super-fast-md5</h2>

[![NPM version](https://img.shields.io/npm/v/super-fast-md5.svg?color=a1b858&label=)](https://www.npmjs.com/package/super-fast-md5)

</div>

Super fast and super small (`7kb`) `wasm` version of `md5` algorithm, able to use in `browser` and `nodejs`. The implementation comes from [hash-wasm](https://github.com/Daninet/hash-wasm), We simplify the asynchronous syntax to synchronous syntax.


[Online test platform](https://imtaotao.github.io/super-fast-md5/)


### CDN

```html
<script src="https://unpkg.com/super-fast-md5/dist/md5.umd.js"></script>
<script>
  const hash = FastMD5.md5('code');
  console.log(hash);
</script>
```

### NPM

```js
import { md5 } from 'super-fast-md5';

// code -> `string | ArrayBuffer`
const hash = md5('code');
console.log(hash);
```

### Performance

```js
const code = 'abcde'.repeat(200000);

console.time('string');
FastMD5.md5(code);
console.timeEnd('string'); // 10ms

const buffer = new TextEncoder().encode(code);
console.time('buffer');
FastMD5.md5(buffer);
console.timeEnd('buffer'); // 6ms
```

```
./a.js [string] (1024 KiB)
> 10ms

./a.js [buffer] (1024 KiB)
> 6ms
```
