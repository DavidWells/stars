---
repo: scopsy/await-to-js
url: 'https://github.com/scopsy/await-to-js'
homepage: >-
  http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
starredAt: '2018-07-29T18:30:52Z'
createdAt: '2016-12-19T20:42:45Z'
updatedAt: '2025-02-25T07:51:58Z'
language: TypeScript
license: MIT
branch: master
stars: 3299
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:17.762Z'
description: Async await wrapper for easy error handling without try-catch
tags:
  - async
  - async-await
  - es2017
  - try-catch
---

# await-to-js

[![NPM version][npm-image]][npm-url]
[![Downloads][download-badge]][npm-url]

> Async await wrapper for easy error handling


<div align="center">
	Supported by:
  </div><div align="center">
		<a href="https://github.com/novuhq/novu">
			<img src="https://user-images.githubusercontent.com/8872447/165779274-22a190da-3284-487e-bd1e-14983df12cbb.png" width="200">
		</a>
    </div>
    <div align="center">  <sup>The open-source notification infrastructure</sup>
</div>
    
## Pre-requisites
You need to use Node 7.6 (or later) or an ES7 transpiler in order to use async/await functionality.
You can use babel or typescript for that.

## Install

```sh
npm i await-to-js --save
```

## Usage

```js
import to from 'await-to-js';
// If you use CommonJS (i.e NodeJS environment), it should be:
// const to = require('await-to-js').default;

async function asyncTaskWithCb(cb) {
     let err, user, savedTask, notification;

     [ err, user ] = await to(UserModel.findById(1));
     if(!user) return cb('No user found');

     [ err, savedTask ] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) return cb('Error occurred while saving task');

    if(user.notificationsEnabled) {
       [ err ] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
       if(err) return cb('Error while sending notification');
    }

    if(savedTask.assignedUser.id !== user.id) {
       [ err, notification ] = await to(NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you'));
       if(err) return cb('Error while sending notification');
    }

    cb(null, savedTask);
}

async function asyncFunctionWithThrow() {
  const [err, user] = await to(UserModel.findById(1));
  if (!user) throw new Error('User not found');
  
}
```

## TypeScript usage
```javascript
interface ServerResponse {
  test: number;
}

const p = Promise.resolve({test: 123});

const [err, data] = await to<ServerResponse>(p);
console.log(data.test);
```


## License

MIT © [Dima Grossman](http://blog.grossman.io) && Tomer Barnea

[npm-url]: https://npmjs.org/package/await-to-js
[npm-image]: https://img.shields.io/npm/v/await-to-js.svg?style=flat-square

[travis-url]: https://travis-ci.org/scopsy/await-to-js
[travis-image]: https://img.shields.io/travis/scopsy/await-to-js.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/scopsy/await-to-js
[coveralls-image]: https://img.shields.io/coveralls/scopsy/await-to-js.svg?style=flat-square

[depstat-url]: https://david-dm.org/scopsy/await-to-js
[depstat-image]: https://david-dm.org/scopsy/await-to-js.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/await-to-js.svg?style=flat-square
