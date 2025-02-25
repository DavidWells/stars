---
repo: sindresorhus/stringify-object
url: 'https://github.com/sindresorhus/stringify-object'
homepage: ''
starredAt: '2017-01-19T05:48:39Z'
createdAt: '2012-12-11T20:16:53Z'
updatedAt: '2025-02-14T06:00:29Z'
language: JavaScript
license: BSD-2-Clause
branch: main
stars: 313
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:49.039Z'
description: >-
  Stringify an object/array like JSON.stringify just without all the
  double-quotes
tags: []
---

# stringify-object

> Stringify an object/array like JSON.stringify just without all the double-quotes

Useful for when you want to get the string representation of an object in a formatted way.

It also handles circular references and lets you specify quote type.

## Install

```sh
npm install stringify-object
```

## Usage

```js
import stringifyObject from 'stringify-object';

const object = {
	foo: 'bar',
	'arr': [1, 2, 3],
	nested: {
		hello: "world"
	}
};

const pretty = stringifyObject(object, {
	indent: '  ',
	singleQuotes: false
});

console.log(pretty);
/*
{
  foo: "bar",
  arr: [
    1,
    2,
    3
  ],
  nested: {
    hello: "world"
  }
}
*/
```

## API

### stringifyObject(input, options?)

Circular references will be replaced with `"[Circular]"`.

Object keys are only quoted when necessary, for example, `{'foo-bar': true}`.

#### input

Type: `object | Array`

#### options

Type: `object`

##### indent

Type: `string`\
Default: `\t`

Preferred indentation.

##### singleQuotes

Type: `boolean`\
Default: `true`

Set to false to get double-quoted strings.

##### filter(object, property)

Type: `Function`

Expected to return a `boolean` of whether to include the property `property` of the object `object` in the output.

##### transform(object, property, originalResult)

Type: `Function`\
Default: `undefined`

Expected to return a `string` that transforms the string that resulted from stringifying `object[property]`. This can be used to detect special types of objects that need to be stringified in a particular way. The `transform` function might return an alternate string in this case, otherwise returning the `originalResult`.

Here's an example that uses the `transform` option to mask fields named "password":

```js
import stringifyObject from 'stringify-object';

const object = {
	user: 'becky',
	password: 'secret'
};

const pretty = stringifyObject(object, {
	transform: (object, property, originalResult) => {
		if (property === 'password') {
			return originalResult.replace(/\w/g, '*');
		}

		return originalResult;
	}
});

console.log(pretty);
/*
{
	user: 'becky',
	password: '******'
}
*/
```

##### inlineCharacterLimit

Type: `number`

When set, will inline values up to `inlineCharacterLimit` length for the sake of more terse output.

For example, given the example at the top of the README:

```js
import stringifyObject from 'stringify-object';

const object = {
	foo: 'bar',
	'arr': [1, 2, 3],
	nested: {
		hello: "world"
	}
};

const pretty = stringifyObject(object, {
	indent: '  ',
	singleQuotes: false,
	inlineCharacterLimit: 12
});

console.log(pretty);
/*
{
  foo: "bar",
  arr: [1, 2, 3],
  nested: {
    hello: "world"
  }
}
*/
```

As you can see, `arr` was printed as a one-liner because its string was shorter than 12 characters.
