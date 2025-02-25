---
repo: deltreey/stopforumspam
url: 'https://github.com/deltreey/stopforumspam'
homepage: 'http://deltreey.github.io/stopforumspam/'
starredAt: '2020-10-05T18:25:06Z'
createdAt: '2015-06-17T03:44:12Z'
updatedAt: '2024-03-20T00:13:11Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:28.088Z'
description: nodejs wrapper for the StopForumSpam.com REST API
tags: []
---

# StopForumSpam

[![Join the chat at https://gitter.im/deltreey/stopforumspam](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/deltreey/stopforumspam?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eba160efc0ee46ff9fb6db8cbdf0fab2)](https://www.codacy.com/manual/deltreey/stopforumspam?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=deltreey/stopforumspam&amp;utm_campaign=Badge_Grade)
[![Code Climate](https://codeclimate.com/github/deltreey/stopforumspam/badges/gpa.svg)](https://codeclimate.com/github/deltreey/stopforumspam)
[![Test Coverage](https://codeclimate.com/github/deltreey/stopforumspam/badges/coverage.svg)](https://codeclimate.com/github/deltreey/stopforumspam/coverage)

> A nodejs wrapper for the [StopForumSpam.com][sfs] REST API


## Install

```sh
$ npm install --save stopforumspam
```


## Usage

```js
var stopforumspam = require('stopforumspam');
```

The simplest way to use this is to create a user like this
```js
var sfsUser = stopforumspam.User('127.0.0.1', 'test@test.com', 'testUserName');
```

Then you can check the stopforumspam.com database easily.
```js
sfsUser.isSpammer()
	 .then(function (result) {
			// result is false if not found

			// if true result looks something like this
			// result = {
			//   success: 1,
			//   username: {
			//     lastseen: '2015-03-09 15:22:49',
			//     frequency: 3830,
			//     appears: 1,
			//     confidence: 90.2 } }
});
```

You can easily submit them if they're spammers too.
```js
stopforumspam.Key('my-api-key');
sfsUser.submit('This text is an optional way to tell SFS why you submitted the user.');
// you can use .then() if you want to wait until after the submit, though I can't imagine why
```

If you would prefer to call things manually, that's fine too.  For example:
```js
stopforumspam.isSpammer({ ip: '123.456.789.100', email: 'test@test.com', username: 'Spammer!' })
	.then(function (result) {
		// result is just like above
	});
```

You don't need to search with every parameter.  You can search only for one or two if you like.
```js
stopforumspam.isSpammer({ ip: '123.456.789.100' })
	.then(function (result) {
		// result is just like above
	});
```

And if you're using ES6 and want synchronous code, then there's a Sync function for everything
```js
var spammer = stopforumspam.isSpammerSync({ ip: '123.456.789.100', email: 'test@test.com', username: 'Spammer!' });
if (spammer) {
	// do stuff
}
// User functions too!
var sfsUser = stopforumspam.User('127.0.0.1', 'test@test.com', 'testUserName');
if (sfsUser.isSpammerSync()) {
	// do stuff
}
```

These are [promises](https://github.com/kriskowal/q/tree/v1.4.1), so you can capture errors as well if you like.
```js
sfsUser.submit('This text is an optional way to tell SFS why you submitted the user.')
	.fail(function (error) {
		// deal with the error that occured while submitting
	});
```

## License

MIT © [Ted](https://github.com/deltreey)


[npm-image]: https://badge.fury.io/js/stopforumspam.svg
[npm-url]: https://npmjs.org/package/stopforumspam
[travis-image]: https://travis-ci.org/deltreey/stopforumspam.svg?branch=master
[travis-url]: https://travis-ci.org/deltreey/stopforumspam
[daviddm-image]: https://david-dm.org/deltreey/stopforumspam.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/deltreey/stopforumspam
[sfs]: http://stopforumspam.com
