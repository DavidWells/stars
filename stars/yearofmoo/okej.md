---
repo: yearofmoo/okej
url: 'https://github.com/yearofmoo/okej'
homepage: null
starredAt: '2023-05-30T00:45:28Z'
createdAt: '2023-05-27T21:17:02Z'
updatedAt: '2024-09-08T21:10:27Z'
language: TypeScript
license: NA
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:48.287Z'
description: a bare-metal Result object implementation for TypeScript/JavaScript
tags: []
---

# okej

`okej` a bare-metal implemention of `Result` types in JavaScript.

This library introduces some super simple helper functions so that data and
errors can easily be passed throughout an application without the need to
add try/catch statements everywhere.

See for yourself:

```ts
const result = doSomething(); // returns ok() or err()
if (result.ok) {
  // yes we have an Ok value. Let's examine the data
  console.log(result.data);
} else {
  // no looks like we have an Err value
  console.log(result.errMessage); // something went wrong
  console.log(result.errCode); // figure out what to do based on the code value
}
```

## What are Result objects?

A `Result` object is simply an object that wraps itself around
data as well as error information. Result objects exist in Rust,
Elm, Kotlin, etc..., but not in JavaScript.

Here's an example of how they work:

```ts
import { err, ok } from "okej";

// Ok result (when something is valid)
const goodResult = ok("data");

// Err result (when something invalid or fails)
const badResult = err("something failed", "ERROR_500");
```

Now for any code that deals with a result object, it must deal with the result object
and explicity deal with it's success and failure (ok/err) states.

```ts
// result is either `goodResult` or `badResult`
if (result.ok) {
  // valid state (continue along with the happy path)
} else {
  // invalid state (deal with the error)
}
```

Result objects are useful for the following reasons:

- They force the developer to plan out each error and figure out how to handle them
- Result objects can be returned up the chain to other functions
- All Result objects have an error code as well as an error message
- They clearly separate system/runtime errors from logic errors
- try/catch statements can be used for truly unexpected situations (i.e. network errors or actual code issues)

Want more information? [Click here for more](#what-are-result-objects)

## License

MIT.

## Installation

First install it into your project.

```bash
# via NPM
npm install okej

# or Yarn
yarn add okej

# or PNPM
pnpm add okej
```

Then import it as needed:

```ts
// ESM / MJS
import { err, ok, Result } from "okej";

// CommonJS / old school Node
const { err, ok, Result } = require("okej");
```

## Usage

Below is a example of how data is processed

```ts
import { err, ok, Result } from "okej";

// let's imagine this function is calling some remote operation
// and will return either a Ok or Err result once complete.
async function okOrErr(): Promise<Result> {
  return (await operationSucceeds())
    ? ok({ message: "yes!" })
    : err("didn't work out today", 500);
}

// we can check the data that is returned
const result = await okOrErr();
if (result.ok) {
  console.log(result.data); // { message: "yes!" }
} else {
  console.log(result.errMessage); // didn\'t work out today
  console.log(result.errCode); // 500
}
```

## Docs

The main functions are `ok()` and `err()`, but there are also various helper
functions that can be used as well.

### ok()

When called, a `Result` object with `ok=true/err=false` will be returned.

```ts
import { ok } from "okej";

// with no data
let okResult = ok();
console.log(okResult.ok); // true
console.log(okResult.err); // false

// with data
okResult = ok({ id: "123", name: "foo" });
console.log(okResult.ok); // true
console.log(okResult.err); // false
console.log(okResult.data.id); // "123"
console.log(okResult.data.name); // "foo"
```

### err()

When called, a `Result` object with `ok=false/err=true` will be returned.

```ts
import { err } from "okej";

// with no data
let result = err();
console.log(result.ok); // false
console.log(result.err); // true

// with data
result = err({
  errCode: 123,
  errMessage: "something broke",
  context: { customDataRelatedToError: "cool" },
});
console.log(result.ok); // false
console.log(result.err); // true
console.log(result.errCode); // 123
console.log(result.errMessage); // "something broke"
console.log(result.errContext); // { customDataRelatedToError: "cool" }

// by other means...
result = err(10); // result.errCode is 10
result = err("something broke"); // result.errMessage is "something broke"
result = err("something broke", 10); // result.errMessage/result.errCode set
result = err("something broke", "BAD ERROR"); // yes string-based error codes work too
result = err("something broke", 10, { extraData: true }); // result.errMessage/result.errCode/result.errContext set
```

We can also pass in a JavaScript `Error` instance directly:

```ts
import { err } from "okej";

try {
  //...
} catch (e) {
  result = err(e, { errCode: 10 });
  console.log(result.ok); // false
  console.log(result.errCode); // 10 (default is 0)
  console.log(result.errMessage); // (will be inferred from the `e` param)
  console.log(result.errContext); // null
  console.log(result.errException); // the provided `e` value
}
```

When TypeScirpt is used, `err()` can be used to deal with error code enums:

```ts
const enum HttpError {
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
  Forbidden = 403,
}

interface ApiData {
  id: string;
  totalUsers: number;
  userNames: string[];
}

async function callApiUsersServer(
  url: string,
): Promise<Result<ApiData, HttpError>> {
  // call the api server and deal with the error
  try {
    const req = await fetch(url);
    if (response.status == 500)
      return err("server error", HttpError.ServerError);
    if (response.status == 403) return err("forbidden", HttpError.Forbidden);
    if (response.status == 404) return err("not found", HttpError.NotFound);

    const json = await req.json();
    if (!json || !isValidResponse(json)) {
      // this might be a 404 in the real world... This is just an example!
      return err("bad request", HttpError.BadRequest);
    }

    return ok(json);
  } catch (e) {
    return err("bad request", HttpError.BadRequest);
  }
}

const request = await callApiUsersServer();
if (request.err) {
  // deal with the error (TypeScript will know that `errCode` is an instance of HttpError)
  switch (request.errCode) {
    case HttpError.BadRequest:
      // handle the bad request error
      break;

    case HttpError.NotFound:
      // handle the not found error
      break;

    case HttpError.ServerError:
      // handle the not server error
      break;

    case HttpError.Forbidden:
      // handle the not forbidden error
      break;

    default:
      // just incase a new error was introduced later
      break;
  }
}
```

## Helper Functions

The helper functions below can be used to deal with collections
of result data.

```ts
import { allErr, allOk, isResult, merge } from "okej";

// true if all have ok=true/err=false (false if an empty array)
allOk(results);

// true if all have ok=false/err=true (false if an empty array)
allErr(results);

// true if some have ok=true/err=false
someOk(results);

// true if some have ok=false/err=true
someErr(results);
```

There also some functions that check to see if a result is indeed a result.
Note that each of the functions listed in the code example below adhere to
TypeScript type narrowing as well as assertions.

```ts
import { allErr, allOk, isResult, merge } from "okej";

// true if Ok or Err
isResult(someValue);

// true if Ok
isOkResult(someValue);

// true if Err
isErrResult(someValue);

// throws an error if not a Ok or Err value
assertIsResult(someValue);

// throws an error if not a Ok value
assertIsOkResult(someValue);

// throws an error if not a Err value
assertIsErrResult(someValue);
```

When dealing with a series of result values, the `from` function can be used
to combine everything together.

```ts
import { from } from "okej";

const results = [ok(1), ok("yes"), ok({ data: "exists" })];

// a Ok value will be returned if all input values are also Ok
const result = from(results);
console.log(result.ok); // true
console.log(result.err); // true
console.log(result.data); // [ 1 , "yes" , { data: "exists" } ]
```

However if there are any values that are an instance of Err then the `from` function
will return an Err response.

```ts
import { from } from "okej";

const results = [ok(1), err("noooo"), err(100)];

// a Ok value will be returned if all input values are also Ok
const result = from(results);
console.log(result.ok); // false
console.log(result.err); // false
console.log(result.errContext.results); // [ ok(1), err("noooo"), err(100) ]
```

## More on JavaScript's error handling issues

As mentioned at the start of the README, error handling in JavaScript is not so great.

### Why can't we use `try/catch` everywhere

Try/catch does the job in JavaScript to capture and deal with errors, but the actual integrity of Error objects
is a complete mess in the language.

Let's look at some custom form validation:

```ts
function validateForm(formData: { [key: string]: unknown }): boolean {
  if (!formData.username) {
    throw new Error("you didn't enter a username");
  }
  if (!formData.email) {
    throw new Error("you didn't enter an email");
  }

  // yes it looks good
  return true;
}
```

Now when the `validateForm` data is called, how does that look?

```ts
const myFormData = { ... }; // collected from some form
let isValid = false;
try {
  isValid = validateForm(myFormData);
} catch (e) {
  // `e` could be an error or even a string. How do we figure out what the error actually is?
  if (e instanceof Error) {
    if (/username/i.test(e.message)) {
      // show the error in the form for the username
      // what if there are various errors here?
    } else if (/email/i.test(e.message)) {
      // show the error in the form for the email
    } else {
      // what now?
    }
  } else {
    // oh crap... what now?
  }
}

if (isValid) {
  // finally.
} else {
  // wait there's another error case here too?
}
```

As made clear in the example code above, how does one deal with the error programmatically?
Well using a `Result` object we can clean this up quite a lot.

```ts
import {ok, err, Result} from "okej";

interface FormError {
  EmptyUsername,
  BadUsername,
  EmptyEmail,
  BadEmail,
}

function validateForm(formData: {[key: string]: unknown): Result {
  if (!formData.username) {
    return err("you didn't enter a username", FormError.EmptyUsername);
  }

  if (!formData.email) {
    return err("you didn't enter an email", FormError.EmptyEmail);
  }

  return ok();
}
```

And dealing with this error is just a matter of looking at the result response

```ts
const myFormData = { ... }; // collected from some form
const validationResponse = validateForm(myFormData);
if (validationResponse.ok) {
  // cool it works
} else {
  switch (validationResponse.errCode) {
    case FormError.EmptyUsername:
      // deal with the missing username
      break;

    case FormError.EmptyEmail:
      // deal with the missing email
      break;

    default:
      // catch all
      break;
  }
}
```

## Why does this library exist?

The `ts-results` library is the only other library out there in JS land that does something similar.
This library does the job, however it closely follow's Rust's Result implementation which means
that it brings in a lot of extra features that might not be necessary (i.e. `Option` values, `Some`/`None`
types, Rx and mapping support as well as unwrapping). These features are essential in Rust, but they
do introduce complexity and lead JS code into a direction that isn't common.

This library is just a small utility library that aims to stay lean and below the `2kb` mark.

There is also the NPM library called `results`, but the README says to consider other tools.

### It works with HTTP

Another good reason for this library is because it works with HTTP requests out of the box since no
special function/object code is added around result objects.

```ts
// somewhere in the backend
import express from "express";
import { err, ok } from "okej";

const app = express();
app.get("/users", (req, res) => {
  res.send(ok([{ username: "user123" }, { username: "user456" }]));
});

app.post("/users", (req, res) => {
  // Ok or Err depending on if the user was created
  const result = createUser(req.body.user);
  res.send(result);
});
```

And the front-end can just consume the `Ok` and `Err` `Result` values.
