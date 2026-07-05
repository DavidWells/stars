---
repo: spencermountain/garbage-patch
url: 'https://github.com/spencermountain/garbage-patch'
homepage: null
starredAt: '2021-05-22T23:37:18Z'
createdAt: '2021-05-22T16:46:46Z'
updatedAt: '2021-10-31T19:52:10Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:38.784Z'
description: not the smartest json-patch implementation
tags: []
---

<!-- spacer -->
<img height="45px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>tiny json-pointer and json-patch implementation</div>
  <div><code>npm install garbage-patch</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://spencermounta.in/">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<div align="center">
  <div>
    <a href="https://npmjs.org/package/garbage-patch">
     <img src="https://img.shields.io/npm/v/garbage-patch.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/result?p=garbage-patch">
      <img src="https://badge-size.herokuapp.com/spencermountain/garbage-patch/master/builds/garbage-patch.min.js" />
    </a>
  </div>
</div>
<!-- spacer -->
<img height="45px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

**[JSON Patch](http://jsonpatch.com/)** is a neat idea for describing changes to JSON -

... the idea is that you can clean-up muddled parts of a codebase, by making data-things explicit.

it is pretty simple, and sort of beautiful.

<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Does the world need another json-patch implementation? no.

did I make one, and is it crappy? **yes.**

<div align="center">garbage-patch</div>

```js
import { get, make, apply } = from 'garbage-patch'

let json = {
  foo: ['bar', 'baz'],
}

// apply clean changes to the json
let patch = { op: 'add', path: '/foo/-', value: 'bob' }
apply(patch, json)
/* {
  foo: ['bar', 'baz', 'bob'],
} */

// make a valid json pointer
let ptr = make(['foo', 1])
// '/foo/1'

// use it to get some data
let result = get(ptr, json)
// 'baz'
```

there is nothing too-clever going on. the min.js build is **_2.5kb_**.

<!-- spacer -->
<img height="45px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

---

these methods _take inspiration_ from the [pointer spec](https://datatracker.ietf.org/doc/html/rfc6901)
and the [patch-spec](https://datatracker.ietf.org/doc/html/rfc6902) but have some differences:

1. **get()** is more-forgiving<br/>
   if you give it a path '/foo/typo/9/wrong' that doesn't exist,<br/>
   it will just say - '_haha! no problem! **undefined**! ✌_'

   also, a trailing slash is allowed - `/foo/`

   also, a leading slash is optional - `foo/1`

   if you prefer, you can use an array as a pointer, too:

```js
let json = { foo: [null, 'found'] }
let found = get(['foo', 1], json) 
// 'found'
```

2. **apply()** changes in-place (mutable)<br/>
   -and before you think _'hey this guy has never seen that Rich Hickey talk'_ - I have seen that one.<br/>
   most javascript implementations call **.clone()** over and over.<br/>

3. **- sneaky-append -** an **_'add'_** patch on an array doesn't need an index, and assumes a push on an array:

```js
let json = { foo: [1] }
// according to the spec, this must be '/foo/[index]', which seemed annoying
let patch = { op: 'add', path: '/foo', value: 2 }
json = apply(patch, json) //normally this would be an arror
// {foo: [1, 2]}
```

4. **- sneaky-splat -** an **_'add'_** patch on an object doesn't need an key, if the value is also an object:

```js
let json = { foo: { bar: true } }
let patch = { op: 'add', path: '/foo', value: { baz: true } }
apply(patch, json) //this would normally be an error, i think.
// { foo: { bar: true, baz: true } }
```

<img height="45px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### API

- **make(props)** - create a JSON pointer from a list of properties
- **get(pntr,json)** - use a pointer to get data out of JSON
- **apply(patch, json)** - make modifications to a JSON object (in place)

all the different build formats are in `./builds` <br/>
there's a **get** only build, that is < 1kb:

```js
import { get } from 'garbage-patch'
```

```js
const get = require('garbage-patch/get')
```

<img height="45px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### See Also

- [json-patch](https://github.com/dharmafly/jsonpatch.js) - 7kb
- [fast-json-patch](https://github.com/Starcounter-Jack/JSON-Patch/blob/master/dist/fast-json-patch.min.js) - 12kb
- [json-8](https://github.com/sonnyp/JSON8/tree/master/packages/patch) - 11kb
- [jiff](https://github.com/cujojs/jiff) - 12kb

<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

MIT
