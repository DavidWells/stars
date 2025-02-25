---
repo: lukeed/ava-http
url: 'https://github.com/lukeed/ava-http'
homepage: ''
starredAt: '2019-10-20T03:57:28Z'
createdAt: '2016-02-05T02:01:43Z'
updatedAt: '2025-02-11T15:48:28Z'
language: JavaScript
license: NA
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:15.046Z'
description: 'Async HTTP request wrapper :rocket:'
tags: []
---

# AVA-http
> Async HTTP requests.

[![Build Status](https://travis-ci.org/lukeed/ava-http.svg?branch=master)](https://travis-ci.org/lukeed/ava-http)
[![NPM version](https://img.shields.io/npm/v/ava-http.svg)](https://npmjs.org/package/ava-http)
[![NPM version](https://img.shields.io/npm/dm/ava-http.svg)](https://npmjs.org/package/ava-http)

AVA-http is a wrapper around the [Request-Promise](https://github.com/request/request-promise) library, making
it simpler to initiate HTTP requests.

It was made for succint API testing within [AVA](https://github.com/sindresorhus/ava), but it can be used anywhere.

## Installation
```
npm install --save-dev ava-http
```

## Usage

The generic HTTP methods are included: [`get`, `post`, `put`, `delete`].

Each of these, used within the context of an AVA test, will return a `Promise` that can be `await`ed, `yield`ed, or `then`/`catch`'d.

Erroneous responses will always return the *full* `Response` object and should be caught with `.catch()`.

Successful responses will return the `payload` (aka, `response.body`) by default.
If you would also like the full `Response` object, exchange your `method` for `methodResponse`:

* `http.get` ==> `http.getResponse`
* `http.post` ==> `http.postResponse`
* `http.put` ==> `http.putResponse`
* `http.del` ==> `http.delResponse`

## API
### get(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

On resolve success, returns `payload`. On error, returns full `Response` object.

### getResponse(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

Always returns full `Response` object.

### post(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

On resolve success, returns `payload`. On error, returns full `Response` object.

### postResponse(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

Always returns full `Response` object.

### put(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

On resolve success, returns `payload`. On error, returns full `Response` object.

### putResponse(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

Always returns full `Response` object.

### del(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

On resolve success, returns `payload`. On error, returns full `Response` object.

### delResponse(url[, options])

> `url`: `string`

> `options`: `object`

**Returns:** `Promise`

Always returns full `Response` object.

## Options
### form

> Type: `object`

> Default: `{}`

An object of `key:value` pairs of formdata that will be urlencoded before reaching the server.

The request's `headers` will automatically include `'content-type': 'application/x-www-form-urlencoded'`.

This simulates sending an HTML form via normal means.

### body

> Type: `object`

> Default: `{}`

The payload data to be sent to the server. Leave `json` as `true` to automatically stringify as JSON.

### headers

> Type: `object`

> Default: `{}`

The request headers to send.

### params

> Type: `object`

> Default: `{}`

An alias of `qs`.

### qs

> Type: `object`

> Default: `{}`

The query string to append to the URL. See [this example](#passing-query-string-parameters).

### json

> Type: `boolean`

> Default: `true`

Whether or not the response body should be parsed as JSON.

### transform

> Type: `function`

> Default: `null`

Transform the response into a custom value with which the promise is resolved. See [here](https://github.com/request/request-promise#the-transform-function) for info.


## AVA

### Setup
You must have AVA installed already.

```js
import test from 'ava';
import http from 'ava-http';

test('foo should succeed', async t => {
	const res = await http.get('http://localhost/posts');
	t.true(typeof res === 'object'); // json object by default
	t.deepEqual(res, {expected: 'output'}); // deepEqual comparison
});

test('bar should error', t => {
	http.post('http://localhost/posts').catch(err => {
		t.is(err.statusCode, 400);
		t.deepEqual(err.response.body, {error: 'message'});
	});
});
```

### Examples
#### Thennables
```js
test('thennable', async t => {
	http.get('http://localhost').then(res => {
		t.deepEqual(res, {expected: 'output'});
	});
});
```

#### Async Support
```js
test('async/await', async t => {
	t.deepEqual(await http.get('http://localhost'), {expected: 'output'});
});
```

#### Generator Support
```js
test('generator/yield', function * (t) {
	t.deepEqual(yield http.get('http://localhost'), {expected: 'output'});
});
```

#### Response Headers
By default, successful responses will only yield their payloads. If you need/want to test a status code, for example, this will suffice:

```js
test('response headers', async t => {
	const res = await http.getResponse('http://localhost');
	console.log('these are the headers: ', res.headers);
	t.is(res.statusCode, 200);
});
```

#### Expecting Errors

In order to successfully expect and catch a Response Error, the test must be asserted witin the Promise's `.catch()`.

For more information, please check out Request-Promise's [excellent documentation on the Promise API](https://github.com/request/request-promise#api-in-detail).

```js
test('404 error is thrown', async t => {
	http.get('http://localhost').catch(err => t.is(err.statusCode, 404));
});
```

#### Posting JSON
```js
test('post json object', async t => {
	const body = {some: 'data'};
	t.deepEqual(await http.post('http://localhost', {body}), {expected: 'output'});
});

// or, to also assert a statusCode...
test('post json object, assert status', async t => {
	const body = {some: 'data'};
	const res = await http.postResponse('http://localhost', {body});
	t.is(res.statusCode, 201);
	t.deepEqual(res.response.body, {expected: 'output'});
});
```

#### Posting as a HTML Form
All data within the `form` object will be `urlencoded`, just as any normal `<form>` would!

```js
test('post like a form', async t => {
	const form = {some: 'data'}; // will be urlencoded
	t.deepEqual(await http.post('http://localhost', {form}), {expected: 'output'});
});
```

#### Updating an Item
```js
test('update an item', async t => {
	const body = {some: 'data'};
	t.deepEqual(await http.put('http://localhost/items/2', {body}), {expected: 'output'});
});
```

#### Deleting an Item
```js
test('delete an item', async t => {
	const res = await http.delResponse('http://localhost/items/2');
	t.is(res.statusCode, 200);
});

// expecting an error...
test('delete is unauthorized', async t => {
	http.del('http://localhost/items/2').catch(err => t.is(err.statusCode, 401));
});
```

#### Pass an Authorization Token (eg, JWT)
```js
test('delete is authorized with token', async t => {
	const headers = {
        'Authorization': 'Bearer 1234567890'
	};
	t.deepEqual(await http.del('http://localhost/items/2', {headers}), {expected: 'output'});
});
```

#### Passing Query String Parameters
```js
test('get item with parameters', async t => {
	const params = {
		token: 'xxxxx xxxxx' // -> uri + '?token=xxxxx%20xxxxx'
	};
	t.deepEqual(await http.get('http://localhost', {params}), {expected: 'output'});
});
```

## Goals
Ideally, AVA-http is the asynchronous, node-equivalent of PHPUnit. This means that similar, custom assertions will be added into AVA's Test class (as opposed to exporting an `http` wrapper, as it currently stands). Methods will/should be as follows:

* `t.jsonEquals`
* `t.jsonContains`
* `t.jsonStructure`
* `t.responseOk`
* `t.responseNotOk`
* `t.responseCode`
* `t.responseType`
* `t.headersEqual`
* `t.headersContain`

An ideal test setup may look like this:

```js
test(async t => {
	t.responseOk(await get(url)); // no error
});

test(async t => {
	const body = {sent: 'data'};
	t.jsonContains(await post(url, {body}), {message: 'success'});
});

test(async t => {
	t.jsonEquals(await get(url), {exact: 'match'});
});

test(async => {
	t.responseCode(await get(url), 301);
});

test(async => {
	t.headersContain(await get(url), {'Cache-Control': 'max-age=21600'});
});
```

## TODOs
- [ ] Define a complete Micro test server, with routing
- [ ] Start-up test server on `test.before()`
- [ ] Cleanup/Remove all `const url = await ...` within tests

## License
MIT © [Luke Edwards](https://lukeed.com) et [al](https://github.com/lukeed/ava-http/graphs/contributors)
