---
repo: daniel7grant/dvali
url: 'https://github.com/daniel7grant/dvali'
homepage: ''
starredAt: '2021-12-26T02:51:07Z'
createdAt: '2021-08-31T13:32:37Z'
updatedAt: '2024-05-24T13:38:57Z'
language: TypeScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:25.558Z'
description: 'Simple, extensible, functional validation library written in TypeScript'
tags: []
---

# Dvali

[![npm](https://img.shields.io/npm/v/dvali)](https://www.npmjs.com/package/dvali)
[![MIT](https://img.shields.io/github/license/daniel7grant/dvali)](https://github.com/daniel7grant/dvali/LICENSE)
[![tests](https://github.com/daniel7grant/dvali/actions/workflows/test.yml/badge.svg)](https://github.com/daniel7grant/dvali/actions/workflows/test.yml)
[![coverage](https://img.shields.io/coveralls/github/daniel7grant/dvali)](https://coveralls.io/github/daniel7grant/dvali)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/dvali)](https://bundlephobia.com/package/dvali)

Simple, extensible, functional validation library written in TypeScript

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Why another validation library](#why-another-validation-library)
- [Get started](#get-started)
  - [Validation functions](#validation-functions)
  - [Bring your own validator](#bring-your-own-validator)
  - [Sanitize and transform](#sanitize-and-transform)
  - [Higher-order validators](#higher-order-validators)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- TOC -->

## Why another validation library

In most modern JavaScript validation libraries, chaining is used to define your rules. You usually have to import every validator altogether in a god object, and define shapes and types from there. This is not only very cumbersome to use, but very hard to extend with your own rules, even more in a TypeScript-friendly way.

In Dvali, instead of the usual chaining API, composition is used: every validation is evaluated one-by-one and the errors are collected at the end. This helps creating modular and reusable validators, makes it easy to group them and reuse them for more complex array or object validations.

Other cool parts:
* **Immutable**: at the end of the validation, a brand new object is returned
* **Extensible**: write common checks and transformations at the validation level (keep it simple and testable!)
* **Small**: the core function weighs <1kB gzipped (ensured by [size-limit](https://github.com/ai/size-limit))
* **Only pay for what you need**: you can import every validator one-by-one, so the bundle size only raised when you use them (all validators are still <5kB)
* **TypeScript-first**: TypeScript types are inferred from the validation object statically

## Get started

To get started, install the `dvali` package with npm:

```
npm install dvali
```

### Validation functions

In the heart of Dvali **validation functions** lie. A validation function is any async function that returns when the given data is valid and throws an error when it isn't. You can use the exported functions as-is, but you usually will want to use it with the `validate` function. This can take one validator, an array of validators or most importantly, plain objects of validators:

```js
import validate, { isString, isEmail, minLength } from 'dvali';

const validatePassword = validate([isString(), minLength(8)]); // this will only return if all of them succeeds, and collects all failures

const validateUser = validate({
    email: [isString(), isEmail()], // use them
    password: validatePassword, // compose them
    address: {
        city: isString(), // to any depth
        street: isString(),
    },
});

const validatedUser = await validateUser({
    email: 'jdoe@example.net',
    password: 'asdasd69',
    address: {
        city: 'Washington DC',
        street: 'Pennsylvania Avenue',
    },
    additionalProperties: 'stripped',
}); // => return { email: "jdoe@example.net", password: "asdasd69", address:  { city: "Washington DC", street: "Pennsylvania Avenue" } }

// ...and you get the correct TypeScript types too!
// typeof validatedUser => { email: string; password: string; address: { city: string; street: string; } }
```

What you have to notice is that the `validate` function returns the validated object with all additional keys stripped out. Otherwise, when the object is invalid, it returns a list of errors.

There is a list of validation functions in the core library for the most common use-cases. Since validation functions are independent and pure, these can be imported one by one, not increasing your bundle sizes dramatically.

### Bring your own validator

What makes validation functions very cool is that it is extremely easy to write one. You simply have to create an async function (or any Promise-returning function) and return undefined or the value if it is valid, and throw a string error if anything is wrong.

Let's see this in action! For example, let's write a function that checks if a user with the given email already exists.

```js
import validate, { isString } from 'dvali';
import db from 'mycooldbpackage';

const isUniqueEmail = () =>
    async function (email, conf) {
        const exists = await db.users.find({ email }); // User | null
        if (!exists) {
            return;
        }
        throw 'This email already in use. Try your alternate address.';
    };

const validateRegistration = validate({
    email: [isString(), isUniqueEmail()],
});
```

What you might notice is the extra parentheses before the async part: in Dvali it is customary to wrap the validator in an extra function. This allows to be consistent with other validation functions that need parameters (`minLength` for example).

To make this `isUniqueEmail` validation function more expressive, we can use the `Success`, `Failure` and `Ignore` macros, exported from the library:

```js
import validate, { Success, Failure, Ignore } from 'dvali';

const isUniqueEmail = () =>
    async function (email, conf) {
        if (typeof email !== 'string') {
            return Ignore();
        }
        const exists = await db.users.find({ email });
        if (!exists) {
            return Success();
        }
        return Failure('This email already in use. Try your alternate address.');
    };
```

Why use this `Ignore` call? Composability is very important in Dvali, one function should only do one thing (but do that thing well). In this case, we let the `isString` function handle whether the email is a string, and our function only proceeds if it's valid. This is useful in cases like optional fields, when we want to the validation to pass, even if the tested value is undefined.

To make writing validation functions easier, there are several helpers in the core library for example `validateCondition` for testing simple conditions, or `validateRegex` for testing against a regular expression. Before writing your own validation function for everything, check these out!

### Sanitize and transform

For now we only returned undefined when our validation passed, but an important detail is that you can change your value if you return something else. These functions usually called **sanitization** or **transform functions**.

To go forth with our registration theme, check this feature out with a sanitization function that hashes the password:

```js
import bcrypt from 'bcrypt';
import validate, { isString, minLength, Ignore, Success } from 'dvali';

const hash = () =>
    async function (password, conf) {
        if (typeof password !== 'string') {
            return Ignore();
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        return Success(hashedPassword);
        // ... or just return the Promise:
        // return bcrypt.hash(password, 8);
    };

const validateRegistration = validate({
    email: [isString(), isUniqueEmail()],
    password: [isString(), minLength(8), hash()],
});

await validateRegistration({
    email: 'asd2@asd.asd',
    password: 'asdasd69',
}); // => { email: "asd2@asd.asd", password: "$2b$08$4S0b.0ut..." }
```

One thing you have to note is that validation and sanitization functions are applied serially: so make sure to figure out a correct order first. For example if the `minLength` and `hash` functions are swapped, the `minLength` will validate the hashed string's length, and therefore will always succeed. Failed validations does not change the value, so in that case the previous value willl be used.

The great part about these validation functions is you can achieve complex checks and modifications, while remain reusable, composable and easily testable.

### Higher-order validators

Let's finish our registration validation task with one last usual suspect: the password confirmation. These are usually hard to do in most validation libraries, since these require some form of relationship between two separate fields. Luckily we have **higher-order validators** to the rescue.

Higher-order validators is a concept borrowed from functional programming, and it means a validator that takes another validator as its parameter. Higher-order validators usually call their inner validators with the `validate` function, and do some checks before or after this call. For example, this password confirmation validator might check the confirmation field against the password field and then pass the validation to the inner validator, like nothing happened.

See the `confirmPassword` higher-order validator in action:

```js
const confirmPassword = (validators) =>
    async function (user, conf) {
        if (user?.password_confirm === undefined) {
            return Failure('You should confirm your password.');
        }
        if (user.password_confirm !== user.password) {
            return Failure('The two passwords do not match.');
        }
        return validate(validators)(user);
    };

const validateRegistration = validate(
    confirmPassword({
        email: [isString(), isUniqueEmail()],
        password: [isString(), minLength(8), hash()],
    })
);

await validateRegistration({
    email: 'asd@asd.asd',
    password: 'asdasd69',
    password_confirm: 'asdasd69',
}); // => { email: 'asd@asd.asd', password: '$2b$08$4S0b.0ut...' }
```

Basically the `confirmPassword` validator takes the whole user object and runs the confirmation test on it, and then gives the user to the inner tests. This is pretty useful, as it decouples the confirmation from the shape of the user object. So if in the end we don't need the `password_confirm` field (which we most likely won't), we can just miss it from the inner validator.

This idea might need some read-through, but it is extremely useful for a vast variety of use-cases - library functions, like `arrayOf` or `bail` is implemented in a similar way.
