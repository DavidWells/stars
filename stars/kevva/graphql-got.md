---
repo: kevva/graphql-got
url: 'https://github.com/kevva/graphql-got'
homepage: null
starredAt: '2020-10-04T00:50:42Z'
createdAt: '2017-09-12T17:35:13Z'
updatedAt: '2025-01-17T21:24:01Z'
language: JavaScript
license: MIT
branch: master
stars: 104
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:28.600Z'
description: Convenience wrapper for got to interact with GraphQL
tags: []
---

# graphql-got [![Build Status](https://travis-ci.org/kevva/graphql-got.svg?branch=master)](https://travis-ci.org/kevva/graphql-got)

> Convenience wrapper for `got` to interact with [GraphQL](http://graphql.org/)

A lightweight alternative to [`apollo-client`](https://github.com/apollographql/apollo-client) and [`relay`](https://github.com/facebook/relay).


## Install

```
$ npm install graphql-got
```


## Usage

```js
const graphqlGot = require('graphql-got');

const query = `{
	unicorn(name: "Foo Bar") {
		id
		name
	}
}`;

graphqlGot('api.graphql.unicorn', {query}).then(response => {
	console.log(response.body);
	/*
	{
		unicorn: {
			id: 0,
			name: 'Foo Bar'
		}
	}
	*/
});
```


## API

Same as [`got`](https://github.com/sindresorhus/got), but with some additional options below. URLs without protocol will be prepended with `https://`.

### query

*Required*<br>
Type: `string`

The `query` to send to [GraphQL](http://graphql.org/).

### variables

Type: `Object`

Variables to be used in your `query`. Read more [here](http://graphql.org/learn/queries/#variables).

### operationName

Type: `string`

If your `query` contains multiple operations, this option is required to decide which operation to run.

### token

Type: `string`

If defined, an `Authorization` header with `bearer ${TOKEN}` will be sent.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
