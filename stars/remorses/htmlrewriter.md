---
repo: remorses/htmlrewriter
url: 'https://github.com/remorses/htmlrewriter'
homepage: ''
starredAt: '2023-08-02T14:53:16Z'
createdAt: '2023-07-27T11:35:53Z'
updatedAt: '2025-02-12T01:21:10Z'
language: Rust
license: NA
branch: master
stars: 37
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T19:59:47.436Z'
description: HTMLRewriter packaged to work everywhere
tags: []
---

<div align='center'>
    <br/>
    <br/>
    <br/>
    <h3>htmlrewriter</h3>
    <p></p>
    <br/>
    <br/>
</div>

Cloudflare `HTMLRewriter` packaged to work with

-   Node.js (reading the wasm from file system)
-   Next.js (appending `?module` to wasm imports)
-   browser (fetching the wasm file at runtime)
-   Deno (fetching the wasm file at runtime with file:// protocol)
-   Bun & Cloudflare (simply using the global `HTMLRewriter` object)

## Install

```
npm i htmlrewriter
```

## Usage

```ts
import { HTMLRewriter } from 'htmlrewriter'

const rewriter = new HTMLRewriter()

rewriter.on('a', {
    element(element) {
        element.setAttribute('href', 'https://www.baidu.com')
    },
})
const res = rewriter.transform(
    new Response('<a href="https://www.google.com">google</a>'),
)
console.log(await res.text())
```

## License

`html-rewriter-wasm` uses [lol-html](https://github.com/cloudflare/lol-html/)
which is BSD 3-Clause licensed:

```
Copyright (C) 2019, Cloudflare, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```
