---
repo: streamich/json-joy
url: 'https://github.com/streamich/json-joy'
homepage: 'https://jsonjoy.com/libs/json-joy-js'
starredAt: '2022-10-16T06:53:06Z'
createdAt: '2020-09-02T18:05:03Z'
updatedAt: '2025-02-24T04:58:35Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 824
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:21.677Z'
description: >-
  json-joy is a library that implements cutting-edge real-time and collaborative
  editing algorithms and utilities for JSON data models, with a focus on
  developing the JSON CRDT (Conflict-free Replicated Data Type) specification
  and implementation.
tags:
  - cbor
  - collaboration
  - collaborative
  - collaborative-editing
  - crdt
  - json
  - json-crdt-patch
  - json-random
  - local-first
  - messagepack
  - multiplayer
  - offline
  - operational-transformation
  - p2p
  - patch
  - reactive
  - realtime
  - rpc
  - schema
  - ubjson
---

<div align="center">
  <br />
  <br />
  <a href="https://jsonjoy.com">
      <img src="https://appsets.jsonjoy.com/branding/avatars/avatar-256x256-fitted.svg" alt="json-joy - JSON tools for real-time and collaborative apps" target="_blank" />
  </a>
  <br />
  <br />
</div>

# json-joy

[![npm version](https://badge.fury.io/js/json-joy.svg)](https://badge.fury.io/js/json-joy)

[`json-joy`][json-joy] library implements cutting-edge real-time and
collaborative editing algorithms and other utilities for JSON data models.
Major focus of `json-joy` is development of the JSON CRDT protocol, a
Conflict-free Replicated Data Type that enables seamless
merging of changes in JSON data models, avoiding conflicts between replicas.

- [**Website**](https://jsonjoy.com)
- [**Documentation**](https://jsonjoy.com/libs/json-joy-js)
- [**Blog posts**](https://jsonjoy.com/blog)
  - [_Fuzz Testing RGA CRDT_](https://jsonjoy.com/blog/fuzz-testing-rga-crdt)
  - [_Benchmarking JSON Serialization Codecs_](https://jsonjoy.com/blog/json-codec-benchmarks)
  - [_List CRDT Benchmarks_](https://jsonjoy.com/blog/list-crdt-benchmarks)
  - [_Blazing Fast List CRDT_](https://jsonjoy.com/blog/performant-rga-list-crdt-algorithm)
- [**JSON CRDT**](https://jsonjoy.com/specs/json-crdt) `specification`
- [**JSON CRDT Patch**](https://jsonjoy.com/specs/json-crdt-patch) `specification`
- [**JSON Expression**](https://jsonjoy.com/specs/json-expression) `specification`
- [**JSON Reactive RPC**](https://jsonjoy.com/specs/json-rx) `specification`
- [**Compact JSON**](https://jsonjoy.com/specs/compact-json) `encoding`
- [**API Reference**](https://streamich.github.io/json-joy/)
- [**Test coverage**](https://streamich.github.io/json-joy/coverage/lcov-report/)

## Notable features

- Full JSON implementation as a CRDT (Conflict-free Replicated Datatype).
- The fastest list CRDT implementation in JavaScript.
- The fastest text OT (Operational Transformation) implementation in JavaScript.
- The fastest implementation of CBOR, DAG-CBOR, MessagePack, UBJSON, and JSON codecs in JavaScript.
- The fastest (HTTP) router implementation in JavaScript.
- The fastest JSON schema validation implementation in JavaScript.
- Very fast binary tree (Radix, AVL, Red-black\*, Splay) implementations in JavaScript.
- Very fast JSON Patch (and JSON Pointer) implementation in JavaScript, including many non-standard operations, and JSON Predicate implementation.
- Very fast JSON Expression implementation in JavaScript.

[json-joy]: https://jsonjoy.com
