---
repo: homer0/parserror
url: 'https://github.com/homer0/parserror'
homepage: ''
starredAt: '2021-11-14T06:28:27Z'
createdAt: '2019-09-04T21:57:25Z'
updatedAt: '2023-08-03T14:50:32Z'
language: JavaScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.320Z'
description: Parse errors and generate more human messages
tags:
  - hacktoberfest
---

# Parserror

[![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/homer0/parserror/test.yml?branch=main&style=flat-square)](https://github.com/homer0/parserror/actions/workflows/test.yml?query=branch%3Amain)
[![Coveralls GitHub](https://img.shields.io/coveralls/github/homer0/parserror.svg?style=flat-square)](https://coveralls.io/github/homer0/parserror?branch=main)

Parse errors and generate more human messages

## Introduction

> If you are wondering why I built this, go to the [Motivation](#motivation) section.

Parserror allows you parse errors from external resources by defining simple (or complex) cases in order to be able to use them in the context of your project:

```js
const Parserror = require('parserror');
// Or, if you are using modules...
// import ParserError from 'parserror/esm';

// Define the cases
const parserror = Parserror
.new()
.addCases([
  {
    // A simple name to use as reference.
    name: 'duplicatedEmail',
    // An expression the error message must match.
    condition: /email_address already exists/i,
    // A new, more human friendly, error message for your project to use.
    message: 'This email address is already in use, please choose another',
  }
]);

// Use the case

try {
  await registerUser();
} catch (error) {
  // Send the received error to the parser.
  const formatted = parserror.parse(error);
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

## Usage

### Cases

As demonstrated in the introduction's example, the way you match and parse your errors is by defining "cases".

You add new cases using the `addCases` method, and they can be as simple as the one we already saw, with a basic condition and a `string` message, or they can be a little more complex.

#### Using specific cases

The reason cases have a name is that when you call `parse`, you can specify a limited list of cases that you want to use for an error.

Keeping with the example from above:

```js
try {
  await registerUser();
} catch (error) {
  // Send the received error to the parser.
  const formatted = parserror.parse(error, {
    // You can the cases list on the options parameter.
    cases: ['duplicatedEmail'],
  });
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

Then, no matter how many cases you have, the error will validate only against the `duplicatedEmail` case.

#### Case parameters

Let's say you have an error that is triggered when you send a `string` with more than `300` characters, and this is what the message says:

```
Invalid message: the text exceeds the limit of 300
```

> Yes, I'm using pretty horrible errors to show my point.

You could extract the `300` from there so it can be used on the formatted message:

```js
{
  name: 'messageLimitValidation',
  condition: /Invalid message: the text exceeds the limit of (\d+)/i,
  message: (limit) => `Your message can't exceeds the ${limit} characters`,
}
```

You just need to use a group on your expression. If the library detects that you have groups, it will use `message` as a `function` and send the group as parameters in the order they were found.

#### Case parsers

But what if you want to transformed and extracted parameter before using it your message? Well, that's what the parsers are for.

Let's say you have a library that performs image optimization, it has a size limit of 1mb for the files it can handle and you send a ~3.5MB photo, you could get something like this:

```
Size Violation - The file is to large (3584KB)
```

You could use a parser to make that value into MB:

```js
{
  name: 'fileLimitValidation',
  condition: /Size Violation - The file is to large \((\d+)\w+\)/i,
  parse: [(size) => prettysize(size)],
  message: (size) => `Your image is too big (${size})`,
}
```

You can use the `parse` property to send functions that will allow you to transform the parameters before using them on the `message`. The order of the list is the same as the parameters.

And you can also use multiple parsers for the same parameters, just use and `array`:

```js
{
  name: 'fileLimitValidation',
  condition: /Size Violation - The file is to large \((\d+)\w+\)/i,
  parse: [Number, (size) => prettysize(size)],
  message: (size) => `Your image is too big (${size})`,
}
```

In this case, before getting to the `prettysize` parameter, `Number` will act as a parser and transform the value into a proper number (as values extracted from expressions are always `string`).

##### Reusable parsers

But that's not all parsers can do; Let's say the error also shows the limit:

```
Size Violation - The file is to large (3584KB) - limit is 1024KB
```

And you want to extract and format both sizes for your message, you can define reusable parsers:

```js
{
  name: 'fileLimitValidation',
  condition: /Size Violation - The file is to large \((\d+)\w+\) - limit is (\d+)\w+/i,
  parsers: {
    sizeParser: (size) => prettysize(Number(size)),
  },
  parse: ['sizeParser', 'sizeParser'],
  message: (size, limit) => `Your image is too big: ${size} - The limit size is ${limit}`,
}
```

You can define an object on the `parsers` property with named parsers, that you can later reference on the `parse` list.

##### Map parsers

Finally, the last "feature" here is that, instead of defining a function, you can also define an "object map" to match with the value of a parameter.

Everything is easier with an example!

Let's imagine a form to create products, with fields for name, description, price; and on the service you are using save the data, each field has specific rules to validate invalid characters: The name and the description can't have special symbols, just regular text, and the price can only have numbers.

Then, the fields on the service are called `product_name`, `product_description` and `product_price`, so it's not uncommon that you'll get errors like this:

```
Validation Error: product_description has invalid characters
```

Yes, if you paid attention, you could use a parameter for the name and parser function to map it to a name the end user will understand (like `product_description` to `description`).

Well, you could do that, or you can create a simple map parser:

```js
{
  name: 'charactersValidation',
  condition: /Validation Error: (\w+) has invalid characters/i,
  parsers: {
    fieldParser: {
      'product_name': {
        label: 'product\'s name',
        field: 'input_name',
      },
      'product_description': {
        label: 'product\'s description',
        field: 'input_description',
      },
      'product_price': {
        label: 'product\'s price',
        field: 'input_price',
      }
    }
  },
  parse: ['fieldParser'],
  message: (property) => `The ${property.label} has invalid characters`,
};
```

And if you are wondering what are the `field` properties for, there's a "sub feature" here: all parameters are saved on a `parameters` property, so you could use the map to store metadata that you can later use. For this case, imagine that `field` could be the name of the UI controller you want to highlight for the user to identify where the error is:

```js
try {
  await saveProduct();
} catch (error) {
  // Send the received error to the parser.
  const formatted = parserror.parse(error);
  // Get a new error with the formatted message.
  showNotification(formatted.message);

  // Extract the formatted parameter metadata.
  const [property] = formatted.parameters;
  highlightUIController(property.field);
}
```

### Scopes

By default, when you add cases, they are added to a "global scope", so they are all available every time you call `parse`. This "global scope" is automatically created when Parserror is instantiated.

Scopes are groups of cases and parsers that you can use to limit the number of cases that parse an error, and to share reusable parsers between different cases.

There are three ways you can create a scope:

1 - With `addScope`:

```js
const parserror = Parserror
.new()
.addScope('userValidationScope', [
  {
    name: 'duplicatedEmail',
    condition: /email_address already exists/i,
    message: 'This email address is already in use, please choose another',
  }
]);
```

2 - With `addCase`/`addCases`:

```js
const parserror = Parserror
.new()
.addCase(
  {
    name: 'duplicatedEmail',
    condition: /email_address already exists/i,
    message: 'This email address is already in use, please choose another',
  },
  'userValidationScope'
);
```

You just send it as a second parameter, and if the scope doesn't exist, it will be created.

3 - As a property of a case definition:

```js
const parserror = Parserror
.new()
.addCase({
  name: 'duplicatedEmail',
  condition: /email_address already exists/i,
  message: 'This email address is already in use, please choose another',
  scope: 'userValidationScope',
});
```

And yes, this works for both `addCase` and `addCases`.

#### Using scopes

Once you have your scopes defined, you can specify them when you call `parse`:

```js
try {
  await saveProduct();
} catch (error) {
  // Send the received error to the parser.
  const formatted = parserror.parse(error, {
    // You can the scopes list on the options parameter.
    scopes: ['userValidationScope'],
  });
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

In this case, Parserror will try to match against the cases of `userValidationScope` before trying with the global scope.

#### Scope parsers

On the parsers section we saw that we can define a reusable parser inside a case definition, but Parserror also allows you to define a parser on a scope and reuse it across multiple cases:

```js
const parserror = Parserror
.new()
.addParser('sizeParser', (size) => prettysize(Number(size))
.addCases([
  {
    name: 'fileLimitValidation',
    condition: /Size Violation - The file is to large \((\d+)\w+\) - limit is (\d+)\w+/i,
    parse: ['sizeParser', 'sizeParser'],
    message: (size, limit) => `Your image is too big: ${size} - The limit size is ${limit}`,
  },
  {
    name: 'compressionValidation',
    condition: /The file size is to big to be compressed, the limit is \(\d+)\w+/i,
    parse: ['sizeParser'],
    message: (limit) => `You can't compress a file over ${limit}`,
  },
]);
```

We first added the parser to the global scope and then we just referenced it from the cases, that's all.

A few things you should know:

- The example uses the global scope, but you can achieve the same for a custom scope by using the `scope` parameter on `addParser` and `addCase`/`addCases`.
- If you add the case to a custom scope, you can still reference parsers from the global scope, as Parserror automatically adds the global scope as the last item of the list of scopes to use.

### Wrappers

Wrappers are little helpers that allow you to create functions with scopes and/or cases already pre configured:

```js
const parserror = Parserror
.new()
.addCases([
  {
    name: 'duplicatedEmail',
    condition: /email_address already exists/i,
    message: 'This email address is already in use, please choose another',
  },
  ...
);

const formatUserErrors = parserror.wrap(['duplicatedEmail', ...]);

...

try {
  await saveProduct();
} catch (error) {
  // Send the received error to the wrapper.
  const formatted = formatUserErrors(error);
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

You can also create a wrapper for a scope or a list of them:

```js
const formatUserErrors = parserror.wrap([], ['userValidationScope']);
```

The only thing weird there is that if you are not using cases, having to define an empty array as first parameter doesn't look very nice... so you could just use `wrapForScopes`:

```js
const formatUserErrors = parserror.wrapForScopes(['userValidationScope']);
```

### Fallback

In the case you don't want the original message reaching the user even if no case matched it, maybe it's a 50x error or something like that, you can use a fallback message.

There are a few different ways to define fallback messages:

#### Add a fallback when parsing an error

You can send it as the `fallback` option on the `parse` method:

```js
try {
  await saveProduct();
} catch (error) {
  // Send the received error to the parser.
  const formatted = parserror.parse(error, {
    // Define the fallback message
    fallback: 'There was an error saving the product, please try again',
  });
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

#### Add a fallback when creating a wrapper

You can create wrappers with a defined fallback message so all the errors parsed can make use of.

```js
const formatUserErrors = parserror.wrap(
  ['duplicatedEmail', ...],
  [...],
  'There was an error saving the product, please try again'
);
```

Both `wrap` and `wrapForScopes` support the fallback message as their last parameter.

#### Add a fallback message for an specific error parsed by a wrapper

If you are using the same wrapper for multiple tasks and the fallback message should be different depending on the task that failed, instead of sending it as the last parameter of `wrap` or `wrapForScopes`, you can send it as the second parameter of the created wrapper:

```js
const parserror = Parserror
.new()
.addCases([
  {
    name: 'duplicatedEmail',
    condition: /email_address already exists/i,
    message: 'This email address is already in use, please choose another',
  },
  ...
);

const formatUserErrors = parserror.wrap(['duplicatedEmail', ...]);

...

try {
  await saveProduct();
} catch (error) {
  // Send the received error to the wrapper, and define a fallback message.
  const formatted = formatUserErrors(
    error,
    'There was an error saving the product, please try again'
  );
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

### Keep original messages

Let's say some of the errors you receive are actually useful, you don't want to create a case to just return the same message... and to make it worst, you want a fallback for some messages that still don't have a case for. The easiest way to solve this is to "allow the original" message to be matched but not parsed/formatted, and that's done with the `allowOriginal` method:

```js
const parserror = Parserror
.new()
.addCases([
  {
    name: 'duplicatedEmail',
    condition: /email_address already exists/i,
    message: 'This email address is already in use, please choose another',
  },
  ...
)
.allowOriginal(/a message that is actually useful/);

const formatUserErrors = parserror.wrap(['duplicatedEmail', ...]);

...

try {
  await saveProduct();
} catch (error) {
  // Send the received error to the parser.
  const formatted = parserror.parse(error, {
    // Define the fallback message
    fallback: 'There was an error saving the product, please try again',
  });
  // Get a new error with the formatted message.
  showNotification(formatted.message);
}
```

If the error matches the condition sent on `allowOriginal`, it will keep it as it is and avoid the fallback.

Internally, `allowOriginal` creates a new error case but with a flag to keep the original message, so instead of sending a regular expression (or a string), you can send a case definition and even give it a name, so it can be used on `parse` and `wrap`.

```js
const parserror = Parserror
.allowOriginal({
  condition: /a message that is actually useful/,
  name: 'thatUsefulMessage',
  scope: 'someCustomScope',
});
```

And just like `addCase` and `addCases`, you also have `allowOriginals` to define multiple conditions at once.

## ES Modules

All files are written using commonjs, as I targeted the oldest Node LTS and it doesn't support modules (without a flag) yet, but you can use it with ESM.

When the package gets published, an ESM version is generated on the path `/esm`. If you are using the latest version of Node, or a module bundler (like [projext](https://projextjs.com) :D), instead of requiring from the package's root path, you should do it from the `/esm` sub path:

```js
// commonjs
const Parserror = require('parserror');

// ESM
import Parserror from 'parserror/esm';
```

Since the next LTS to become "the oldest" is 12, which still uses the flag, I still have no plans on going with ESM by default.

## Development

### NPM tasks

| Task       | Description                         |
|------------|-------------------------------------|
| `test`     | Run the project unit tests.         |
| `lint`     | Lint the modified files.            |
| `lint:all` | Lint the entire project code.       |
| `docs`     | Generate the project documentation. |
| `todo`     | List all the pending to-do's.       |


### Repository hooks

I use [`husky`](https://www.npmjs.com/package/husky) to automatically install the repository hooks so...

1. The code will be formatted and linted before any commit.
2. The dependencies will be updated after every merge.
3. The tests will run before pushing.

#### Commits convention

I use [conventional commits](https://www.conventionalcommits.org) with [`commitlint`](https://commitlint.js.org) in order to support semantic releases. The one that sets it up is actually husky, that installs a script that runs `commitlint` on the `git commit` command.

The configuration is on the `commitlint` property of the `package.json`.

### Releases

I use [`semantic-release`](https://www.npmjs.com/package/semantic-release) and a GitHub action to automatically release on NPM everything that gets merged to main.

The configuration for `semantic-release` is on `./releaserc` and the workflow for the release is on `./.github/workflow/release.yml`.

### Testing

I use [Jest](https://facebook.github.io/jest/) to test the project.

The configuration file is on `./.jestrc.js`, the tests are on `./tests` and the script that runs it is on `./utils/scripts/test`.

### Linting && Formatting

I use [ESlint](https://eslint.org) with [my own custom configuration](https://www.npmjs.com/package/@homer0/eslint-plugin) to validate all the JS code. The configuration file for the project code is on `./.eslintrc` and the one for the tests is on `./tests/.eslintrc`. There's also an `./.eslintignore` to exclude some files on the process. The script that runs it is on `./utils/scripts/lint-all`.

For formatting I use [Prettier](https://prettier.io) with [my custom configuration](https://www.npmjs.com/package/@homer0/prettier-config). The configuration file for the project code is on `./.prettierrc`.

### Documentation

I use [JSDoc](https://jsdoc.app) to generate an HTML documentation site for the project.

The configuration file is on `./.jsdoc.js` and the script that runs it is on `./utils/scripts/docs`.

### To-Dos

I use `@todo` comments to write all the pending improvements and fixes, and [Leasot](https://www.npmjs.com/package/leasot) to generate a report. The script that runs it is on `./utils/scripts/todo`.

## Motivation

> I put this at the end because no one usually reads it :P.

Nowadays it's pretty common to be working with APIs/services/libraries (we'll call them "resources") external to your projects, and those resources are **almost never** aware of what kind of project you are building, so whenever they throw/emit errors, they lack context.

Errors without context are hard to handle, most of the times you just can't just show them to the end user, whether the resource is a library or an API, errors tend to be specific to the its own context.

For example:

Let's say you have a web app that connects to an API that manages users. You create a UI with a form to enter a new user and email address; on the other side, the API implements some sort of ORM with out-of-the-box validations and the email address is a unique field.

When the user submits the form with an email that is already being used, the API may respond with something like this:

```
The field 'email' must be unique
```

What do you do?

1. Do you show that error to the user?
2. Check if the error matches against a `RegExp` or a `string` in order to rewrite it for the user?
3. If you have control of the API, do you get rid of the validations in order to write better errors?

My answers are:

1. No
2. That won't scale if I have a lot of errors to parse.
3. Even if that were the case, "no, thanks".

> If you have other answers, this library may not be of interest to you.

Ok, so there weren't other alternatives, so I took the "possible solution" I could have more control over and created a library that would help me handle it on a more simple and organized way.
