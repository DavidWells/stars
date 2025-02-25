---
repo: marques-work/shellwords
url: 'https://github.com/marques-work/shellwords'
homepage: ''
starredAt: '2021-09-11T05:08:20Z'
createdAt: '2019-04-30T20:43:39Z'
updatedAt: '2022-12-20T23:14:22Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:37:46.122Z'
description: >-
  Manipulate strings according to the word parsing rules of the UNIX Bourne
  shell.
tags: []
---

# Shellwords-TS

[![Build Status](https://github.com/marques-work/shellwords/actions/workflows/build-test.yaml/badge.svg)](https://github.com/marques-work/shellwords/actions/workflows/build-test.yaml)

A JavaScript port of the [Ruby module of the same name](https://ruby-doc.org/stdlib-3.1.2/libdoc/shellwords/rdoc/Shellwords.html), with TypeScript typings. Shellwords provides functions to manipulate strings according to the word parsing rules of the UNIX Bourne shell. Originally forked from [jimmycuadra/shellwords](https://github.com/jimmycuadra/shellwords), this package is updated to be at parity with a modern reference implementation (Ruby 3.1.2 at the time of writing) and implements `Shellwords.join()`, which was missing from the original package. The goal of this is to maintain parity with the Ruby `Shellwords` module, so if there is a discrepancy, please file a [bug](https://github.com/marques-work/shellwords/issues/new) (or even better, a [PR](https://github.com/marques-work/shellwords/pull/new/master)).

## Installation

Add "shellwords-ts" to your `package.json` file and run `npm install`.

## Example

```javascript
import Shellwords from "shellwords-ts";

Shellwords.split("foo 'bar baz'"); // ["foo", "bar baz"]
Shellwords.escape("What's up?"); // "What\\'s\\ up\\?"
Shellwords.join(["find", "~/Library/Application Support", "-name", "*.plist"]); // "find \\~/Library/Application\\ Support -name \\*.plist"

Shellwords.split("foo 'bar baz' quu", (rawPart) => {
  // have access to the chunks of the raw string as it is scanned
});
```

## Breaking changes as of 3.0.0:

- `Shellwords.escape()` no longer escapes `+`; see [this commit in the GitHub Ruby repo](https://github.com/ruby/ruby/commit/43a16c98df392e726040f0331a3e09d00c53d513).
