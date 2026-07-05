---
repo: sebelga/promised-hooks
url: 'https://github.com/sebelga/promised-hooks'
homepage: ''
starredAt: '2020-07-03T21:11:34Z'
createdAt: '2016-11-06T15:33:36Z'
updatedAt: '2022-12-22T01:35:39Z'
language: JavaScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:45.805Z'
description: Middleware utility for your Promises
tags:
  - hooks
  - middleware
  - promise
  - promise-library
---

# Middleware utility for your Promises

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![coveralls-image]][coveralls-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]  

Add **pre** and **post** middleware hooks to any function returning a Promise.  
Read [the post](https://medium.com/@sebelga/simplify-your-code-adding-hooks-to-your-promises-9e1483662dfa) on Medium for some example.

<img title="code-example" src="code.png" width="85%">

## Install

```sh
yarn add promised-hooks
# or
npm install promised-hooks --save`
```

## Warp your Class/function/object

In order to add "pre" and "post" hooks to your promise you need to wrap their containing object (Class/function/object)

```js
const hooks = require('promised-hooks');

// Class
class User {
    // some method that returns a Promise
    someMethod() { ... }
}

// Function
function User() {
}
User.prototype.someMethod = function someMethod() { ... }

// Object
const api = {
    save: function() { ... }
};

// Wrap them to add "pre" and "post" hooks functionalities to their methods
hooks.wrap(User);
hooks.wrap(api);

```

## Add middleware

### pre() method

Adds a middelware to a promise that will be resolved or rejected **before** the method you are targetting. If the middelware rejects the Promise the original method is **not executed**.
All the parameters sent to the original methods are available in the arguments of your middleware.  


```js
const hooks = require('promised-hooks');

class User {
	// instance methods
    save() { ... }

	// works also with static methods
    static otherMethod() { ... }
}

hooks.wrap(User);

User.pre('save', doSometingBeforeSaving);

function doSometingBeforeSaving()  {
    // Access the arguments passed if needed
    const args = Array.prototype.slice.apply(arguments);

    // the scope (this) is the original Object wrapped

    // return a Promise
    return new Promise((resolve, reject) => {

        // ... do some async stuff

        // then resolve or reject
        resolve();
    });
}

```

#### Override
You can override the original arguments sent to the target method by resolving the middleware with an object containing an "__override" property.

```js
User.pre('save', doSometingBeforeSaving);

function doSometingBeforeSaving()  {
	return new Promise((resolve, reject) => {
        // ...

        resolve({ __override: 123 }); // single argument
        // or
        resolve({ __override: [ 123, 'arg2' ] }); // multi arguments
    });

    /**
     * With the above override, the User.save() method will
     * receive those arguments instead of the one originally provided
     */
}

```

### post() method
Adds a middelware to be executed **after** the method you are targetting has been **resolved**. If the post middleware fails and rejects the Promise, the original Promise still resolves and the "post" errors are added the response (see below).

If you resolve your post middelware with an object containing an "__override" property (same as with "pre" hook), it **will override** the original response.

```js
const hooks = require('promised-hooks');

class User {
	// instance methods
	save() { ... }

	// works also with static (prototype) methods
	static otherMethod() { ... }
}

hooks.wrap(User);

// Several middleware can be added at once with an Array
User.post('save', [postMiddleware1, postMiddleware2]);

function postMiddleware1(data) {
    // data is the resolved value from the original promised method
    // or previous "post" hooks with an __override property

    // do some async stuff ...

    // and resolve a Promise
    return Promise.resolve();

    // If needed, you can override the response
    return Promise.resolve({ __override: 'my new response' });
}

function postMiddleware2(data) {
    return new Promise((resolve, reject) => {
        // call async service...
        myApi.doSomething((err) => {
            if (err) {
                /* if the async fails you would then reject your promise.
                 * The original response is *not* overriden
                 * (see errors in "post" hook below)
                 */
                return reject(err);
            }

            // no error
            return resolve();
        });
    });
}

```

#### Errors in "post" hooks

If one of the "post" hook fails and rejects its Promise then a **Symbol** is added on the response containing an Array with the errors.
If the response is a primitive('string', 'number', boolean) then it is first **converted to an object** with a "result" property.

```js
// For example, if the response returned by the targeted method is:
'my response'

// in case there are "post" hooks error it will be converted to:
{
    result: 'my response'
}
```

You access the errors Array with the `hooks.ERRORS` Symbol.

```js
const hooks = require('promised-hooks');

class User {
	save() { ... }
}

hooks.wrap(User);

User.post('save', postMiddleware);

function postMiddleware() {
    return new Promise((resolve, reject) => {
    	// call async service...
    	myApi.doSomething((err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
    	});
    });
}

// Somewhere else in your code

const user = new User();

user.save().then((response) => {
    // The save occurred without issue but
    // let's check for any "post" hook error
    if (response[hooks.ERRORS]) {
        // deal with errors
    }
    ...
});

```

## Scope (this)

The scope (this) of the middelware is set by default on the "wrapped" object. If you need to change it at runtime, you can declare a `__scopeHook` function
on the object that will be called for each hook. This method, when called, receives 3 parameters: 

- the target method
- the arguments (array of arguments sent to the targeted method)
- the hook method name

```js
class User {
    save() {}

    __scopeHook(targetMethod, args, hookMethod) {
        console.log(targetMethod); // "save"
        console.log(args); // [123]
        console.log(hookMethod); // "hashPassword"

        // You can here return any object for the scope

        if (hookMethod === 'hashPassword') {
            return { x: 'abc' }; // set the scope
        }

        // If you return "undefined" the scope is not changed
        return undefined;
    }
}
hooks.wrap(User);

User.pre('save', function hashPassword() {
    // Check the scope
    console.log(this); // { x: 'abc' }
});

// ...

const user = new User();
user.save(123).then( ... );

```

## Example

```js
const hooks = require('promised-hooks');

class User {
    save(userData) {
        return new Promise((resolve, reject) {
            // ...your logic to save a user then
            resolve(response);
        });
    }

    // works also on static methods
    static otherMethod() { ... }
}

// Wrap the class to add hooks functionalities
hooks.wrap(User);

// Hash a user password before saving
User.pre('save', (userData) => {
    /**
     * INFO: If you need to access the User class from this middelware
     * you can not use an arrow function as the scope is lost.
     * Use a normal function and *this* will be your Class
    */

    if (typeof userData.password !== 'undefined') {
        userData.password = hashString(userData.password);
    }

    return Promise.resolve();

    // ----------

    function hashString(str) {
        // ... logic to hash a string
        return hashedString;
    }
});

// Let's email our newly created user
User.post('save', (response) => {
    // response is what the target method returns
    const email = response.email;

    // Return a method that returns a Promise
    return yourMailService.sendEmail(email);
});

// Create new user
const user = new User();

// Save user
user.save({ name: 'John', password: 'snow' })
    .then((response) => {
        // Save success

        // Check if there are any errors in our "post" middleware
        if (response.[hooks.ERRORS]) {
            // deal with Post hook error
        }

    }, (err) => {
        // Save failed
    });

```

## Credits
I have been inspired by the [hooks-fixed](https://github.com/vkarpov15/hooks-fixed) library from @vkarpov15 to write this small utility.

[npm-image]: https://img.shields.io/npm/v/promised-hooks.svg?style=flat-square
[npm-url]: https://npmjs.org/package/promised-hooks
[travis-image]: https://img.shields.io/travis/sebelga/promised-hooks/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/sebelga/promised-hooks
[coveralls-image]: https://img.shields.io/coveralls/github/sebelga/promised-hooks.svg
[coveralls-url]: https://coveralls.io/github/sebelga/promised-hooks?branch=master
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
