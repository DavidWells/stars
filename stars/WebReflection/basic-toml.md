---
repo: WebReflection/basic-toml
url: 'https://github.com/WebReflection/basic-toml'
homepage: ''
starredAt: '2025-02-27T01:53:50Z'
createdAt: '2023-05-13T14:04:08Z'
updatedAt: '2025-02-27T01:53:51Z'
language: JavaScript
license: ISC
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:46.941Z'
description: A simple TOML subset parser.
tags: []
---

# basic-toml

[![build](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/basic-toml/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/basic-toml?branch=main)

A simple TOML subset parser. ~540 bytes minified with brotli.

**[Live Demo](https://webreflection.github.io/basic-toml/test/)**

## TOML Subset

  * [key / value pairs](https://toml.io/en/v1.0.0#keyvalue-pair)
    * quoted or non-quoted, optionally dotted (within tables and arrays of tables), keys such as `key` or `key.sub` or `"my-key.same"`
    * **no** spaces around dots in keys
  * [strings](https://toml.io/en/v1.0.0#string)
    * prefer double quotes but it works with single quotes too
    * **no** multiline
  * [integers](https://toml.io/en/v1.0.0#integer) and [floats](https://toml.io/en/v1.0.0#float)
    * must be compatible with JSON
  * [boleans](https://toml.io/en/v1.0.0#boolean)
  * all JSON compatible [dates](https://toml.io/en/v1.0.0#offset-date-time)
  * [arrays](https://toml.io/en/v1.0.0#array)
    * also multiline arrays
  * [tables](https://toml.io/en/v1.0.0#table)
  * [inline tables](https://toml.io/en/v1.0.0#inline-table)
  * [arrays of tables](https://toml.io/en/v1.0.0#array-of-tables)

```toml
# any single line comment
packages = ['a', 'b'] # or end comment

# any propety as object (or nested objects)
[field]
simple = true
version = 0 # any JSON compatible value ... and ...
# ... dates are returned as Date instance
when = 1979-05-27T07:32:00-08:00

# quoted keys
"inline" = { OK = true, key = "value" }

# array of JSON compatible entries
[[externals]]
src = 'https://cdn.spot.on'
name = 'spot-on'

[[externals."special.case"]]
ok = true

[[preload]]
files = [
  './3rd-party.js',
  './other.js'
]
```

### Benchmark

The benchmark has been borrowed from [@iarna/toml](https://github.com/iarna/iarna-toml#benchmarks) and compared against *iarna* and *fast-toml*.

|   | @iarna/<wbr>toml | basic-toml | fast-toml |
| - | :---------: | :--------: | :-------: |
| **Overall** | 26MB/sec<br><small>1.66%</small> | - | - |
| **01-small-doc-mixed-type-inline-array** | 4.7MB/sec<br><small>1.29%</small> | 7.1MB/sec<br><small>0.29%</small> | 14MB/sec<br><small>0.72%</small> |
| **Spec Example: v0.4.0** | 26MB/sec<br><small>0.80%</small> | - | - |
| **Spec Example: Hard Unicode** | 60MB/sec<br><small>1.30%</small> | - | 90MB/sec<br><small>0.23%</small> |
| **Types: Array, Inline** | 6.4MB/sec<br><small>1.00%</small> | 7.1MB/sec<br><small>0.40%</small> | 8.9MB/sec<br><small>0.63%</small> |
| **Types: Array** | 6.2MB/sec<br><small>0.65%</small> | 10MB/sec<br><small>0.63%</small> | 25MB/sec<br><small>0.71%</small> |
| **Types: Boolean,** | 22MB/sec<br><small>0.78%</small> | 9.2MB/sec<br><small>0.54%</small> | 8.7MB/sec<br><small>0.49%</small> |
| **Types: Datetime** | 17MB/sec<br><small>0.72%</small> | - | 6.8MB/sec<br><small>0.68%</small> |
| **Types: Float** | 8.2MB/sec<br><small>0.63%</small> | 9.2MB/sec<br><small>0.41%</small> | 8.5MB/sec<br><small>0.44%</small> |
| **Types: Int** | 5.2MB/sec<br><small>0.73%</small> | 7.7MB/sec<br><small>0.71%</small> | 8.3MB/sec<br><small>0.45%</small> |
| **Types: Literal String, 7 char** | 28MB/sec<br><small>0.65%</small> | 9.2MB/sec<br><small>0.53%</small> | 13MB/sec<br><small>0.40%</small> |
| **Types: Literal String, 92 char** | 39MB/sec<br><small>0.70%</small> | 38MB/sec<br><small>0.81%</small> | 75MB/sec<br><small>0.26%</small> |
| **Types: Literal String, Multiline, 1079 char** | 17MB/sec<br><small>2.17%</small> | - | 648MB/sec<br><small>0.72%</small> |
| **Types: Basic String, 7 char** | 28MB/sec<br><small>0.60%</small> | 9.3MB/sec<br><small>0.33%</small> | 13MB/sec<br><small>0.37%</small> |
| **Types: Basic String, 92 char** | 38MB/sec<br><small>0.74%</small> | 39MB/sec<br><small>0.50%</small> | 75MB/sec<br><small>0.28%</small> |
| **Types: Basic String, 1079 char** | 17MB/sec<br><small>1.99%</small> | - | 647MB/sec<br><small>0.45%</small> |
| **Types: Table, Inline** | 9MB/sec<br><small>0.64%</small> | 7MB/sec<br><small>0.54%</small> | 8.8MB/sec<br><small>0.44%</small> |
| **Types: Table** | 6.1MB/sec<br><small>0.39%</small> | 10MB/sec<br><small>0.63%</small> | 18MB/sec<br><small>0.29%</small> |
| **Scaling: Array, Inline, 1000 elements** | 37MB/sec<br><small>1.04%</small> | 12MB/sec<br><small>0.53%</small> | 42MB/sec<br><small>0.21%</small> |
| **Scaling: Array, Nested, 1000 deep** | 1.4MB/sec<br><small>1.09%</small> | 0.9MB/sec<br><small>0.36%</small> | 12MB/sec<br><small>0.63%</small> |
| **Scaling: Literal String, 40kb** | 57MB/sec<br><small>0.60%</small> | 136MB/sec<br><small>0.30%</small> | 19kMB/sec<br><small>0.31%</small> |
| **Scaling: Literal String, Multiline, 40kb** | 57MB/sec<br><small>0.49%</small> | - | 19kMB/sec<br><small>0.37%</small> |
| **Scaling: Basic String, Multiline, 40kb** | 58MB/sec<br><small>0.38%</small> | - | 23kMB/sec<br><small>0.47%</small> |
| **Scaling: Basic String, 40kb** | 55MB/sec<br><small>0.47%</small> | 132MB/sec<br><small>0.74%</small> | 16kMB/sec<br><small>0.28%</small> |
| **Scaling: Table, Inline, 1000 elements** | 29MB/sec<br><small>0.53%</small> | 17MB/sec<br><small>0.45%</small> | 12MB/sec<br><small>0.67%</small> |
| **Scaling: Table, Inline, Nested, 1000 deep** | 7MB/sec<br><small>0.69%</small> | - | 8.7MB/sec<br><small>0.38%</small> |
