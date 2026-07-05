---
repo: sindresorhus/array-union
url: 'https://github.com/sindresorhus/array-union'
homepage: ''
starredAt: '2017-02-03T19:49:56Z'
createdAt: '2014-06-19T15:34:45Z'
updatedAt: '2025-01-07T20:10:58Z'
language: TypeScript
license: MIT
branch: main
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:47.797Z'
description: 'Create an array of unique values, in order, from the input arrays'
tags: []
---

# array-union

> Create an array of unique values, in order, from the input arrays

## Install

```
$ npm install array-union
```

## Usage

```js
import arrayUnion from 'array-union';

arrayUnion([1, 1, 2, 3], [2, 3]);
//=> [1, 2, 3]

arrayUnion(['foo', 'foo', 'bar']);
//=> ['foo', 'bar']

arrayUnion(['🐱', '🦄', '🐻'], ['🦄', '🌈']);
//=> ['🐱', '🦄', '🐻', '🌈']

arrayUnion(['🐱', '🦄'], ['🐻', '🦄'], ['🐶', '🌈', '🌈']);
//=> ['🐱', '🦄', '🐻', '🐶', '🌈']
```

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-array-union?utm_source=npm-array-union&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
