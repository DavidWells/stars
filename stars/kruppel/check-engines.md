---
repo: kruppel/check-engines
url: 'https://github.com/kruppel/check-engines'
homepage: ''
starredAt: '2021-11-09T18:52:53Z'
createdAt: '2015-06-16T21:56:04Z'
updatedAt: '2024-09-23T00:45:22Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.878Z'
description: >-
  Utility to verify that engine versions (node, npm, iojs, yarn, dotnet) satisfy
  semver constraints specified in package.json.
tags: []
---

# check-engines [![Build Status](https://secure.travis-ci.org/kruppel/check-engines.svg?branch=master)](https://travis-ci.org/kruppel/check-engines)

Utility to verify that engine versions (node, npm, iojs, yarn, dotnet, etc.) satisfy semver
constraints specified in `package.json`.

## Usage

### CLI

```sh
⫸  check-engines
# Errors will return exit code 1, otherwise 0.
```

### Programmatic

```javascript
const checkEngines = require('check-engines');

checkEngines(err => {
  if (err) {
    console.error(err);
  }
});
```

## License

Copyright 2015-2022 Kurt Ruppel and contributors

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this work except in compliance with the License.

You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
