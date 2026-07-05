---
repo: nodejs/node-addon-examples
url: 'https://github.com/nodejs/node-addon-examples'
homepage: null
starredAt: '2022-02-27T07:26:34Z'
createdAt: '2013-01-23T05:05:51Z'
updatedAt: '2025-02-21T16:16:14Z'
language: C++
license: NOASSERTION
branch: main
stars: 2524
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:05.006Z'
description: 'Node.js C++ addon examples from http://nodejs.org/docs/latest/api/addons.html'
tags:
  - node
  - nodejs
---

Node.js Addon Examples
=========================================

**A repository of [Node.js Addons](https://nodejs.org/api/addons.html#addons_c_addons) examples.**

Implementations of examples are named either after Node.js versions (`node_0.10`,
`node_0.12`, etc), or Node.js addon implementation APIs:

- [`nan`](https://github.com/nodejs/nan): C++-based abstraction between Node and direct V8 APIs.
- [`Node-API`](https://nodejs.org/api/n-api.html): C-based API guaranteeing [ABI stability](https://nodejs.org/en/docs/guides/abi-stability/) across different node versions as well as JavaScript engines. (Node-API was previously known as N-API.)
- [`node-addon-api`](https://github.com/nodejs/node-addon-api): header-only C++ wrapper classes which simplify the use of the C-based Node-API.
- [`node-addon-api-addon-class`](https://github.com/nodejs/node-addon-api/tree/main/doc/addon.md): Similar to `node-addon-api`, but deriving from the `Napi::Addon` class. [1_hello_world](./src/1-getting-started/1_hello_world) provides an example.

Implementations against unsupported versions of Node.js are provided for
completeness and historical context. They are not maintained.

The examples are primarily maintained for Node-API and node-addon-api and as outlined in
the Node.js [documentation](https://nodejs.org/dist/latest/docs/api/addons.html),
unless there is a need for direct access to functionality which
is not exposed by Node-API, use Node-API.

The [Node-API Resource](http://nodejs.github.io/node-addon-examples/) offers an
excellent orientation and tips for developers just getting started with Node-API
and `node-addon-api`.

## Usage

The directory structure is as follows:

```sh
REPO_ROOT
├── test_all.js
├── package.json
├── README.md
└── src
    ├── 1-getting-started
    │   ├── example1
    │   │   ├── nan
    │   │   ├── node-addon-api
    │   │   └── napi
    │   ├── example2
    │   └── example3
    ├── 2-js-to-native-conversion
    ├── 3-context-awareness
    ├── 4-references-and-handle-scope
    ├── 5-async-work
    ├── 6-threadsafe-function
    ├── 7-events
    └── 8-tooling
```

In each example's implementation subdirectory, run

```text
npm install
node ./
```

to see the example in action.
