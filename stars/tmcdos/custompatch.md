---
repo: tmcdos/custompatch
url: 'https://github.com/tmcdos/custompatch'
homepage: ''
starredAt: '2025-02-26T22:07:23Z'
createdAt: '2018-11-20T18:58:51Z'
updatedAt: '2025-02-26T22:07:24Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:47.882Z'
description: Tool for patching buggy NPM packages without forking them
tags:
  - buggy
  - npm-package
  - patching
---

# CustomPatch

Patch a buggy NPM package without forking it.

Based on the handy [diff](https://github.com/kpdecker/jsdiff) package (there is a `jsdiff` published on the NPM registry but it is a bogus one)

## WHY

This tool does what [patch-package](https://www.npmjs.com/package/patch-package) does (or more accurately - should be doing) but without the related issues:

- it works faster, especially when creating the patch
- it never chokes on its own patches
- it does not break if you try to apply a patch more than once (but shows a warning)
- it does not require/depend on GIT
- it does not require a lockfile present when creating patches
 
When you have made a bugfix for one of your dependencies but the author/maintainers refuse to accept your PR - you do not need to fork the package.  
Create a patch and seamlessly apply it locally for all your builds.

## Installation
```bash
npm install custompatch -g
```

## Setup

It operates in exactly the same way as [patch-package](https://www.npmjs.com/package/patch-package) so you can use the same setup if you have it already.
Add the following to your `package.json`

```json
"scripts": 
{
  "prepare": "custompatch"
}
```

## Usage

### Making patches

Open your IDE and make the required changes for the bugfix inside your dependency in `node_modules`. After that run

```bash
custompatch "name-of-the-buggy-package"
```

This will create a folder called `patches` inside your project and a file called `name-of-the-buggy-package#version.patch` in this folder.  
This file will be a unified diff between your fixed version of the dependency and its original code.

You can specify more than 1 package on the command-line - but no command-line options are accepted.

### Updating patches

The process is exactly the same as for creating a patch for the first time.

### Applying patches

Run `custompatch` without arguments inside your project folder - it will apply all the patches from `patches` folder.  
If you want to target specific patches you can use the `--patch (-p)` flag like so:

```bash
custompatch --patch [name-of-the-buggy-package]
```

### Reversing patches

To reverse all patches you can use the `--reverse (-r)` flag like so:

```bash
custompatch --reverse
```

To reverse specific patches you can use the `--reverse (-r)` flag like so:

```bash
custompatch --reverse [name-of-the-buggy-package]
```

## Benefits of patching over forking

- Forks often require extra build steps - and even more often you do not need this overhead
- CustomPatch warns you when a patch was not applied cleanly - so that you can check that your fix is still valid for the new version of dependency
- Keep your patches colocated with the code that depends on them
- Patches can be reviewed as part of your normal review process, forks probably can't

## Patch filenames format

The filename of a patch will be composed as `packageName`, followed by the `#` symbol, followed by `packageSemVer` (and the extension is `.patch`)  
If the `packageName` contains a symbol which collides with the directory separator of the current filesystem - these symbols will be replaced with `+`

## License

Software License Agreement (BSD License)

Copyright (c) 2018, TMCDOS

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of TMCDOS nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
