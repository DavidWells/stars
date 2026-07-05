---
repo: suchipi/cypress-style-async
url: 'https://github.com/suchipi/cypress-style-async'
homepage: null
starredAt: '2022-02-24T04:51:33Z'
createdAt: '2019-12-05T14:16:09Z'
updatedAt: '2023-10-31T03:39:22Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:11.611Z'
description: >-
  Make a queue-backed sync-feeling async chainable (like Cypress's cy) for
  anything
tags: []
---

# Cypress-Style Async

This library helps you create a chainable, queue-backed async API similar to the `cy` global used in [Cypress](cypress.io).

The way it works, is you register a bunch of commands that can be performed, and then the consumer of your API uses synchronous methods to queue those commands up, and then they are run asynchronously and serially in the background.

Please read [This page from Cypress's docs](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html) to get a better idea of how this sync-feeling-but-actually-async queue-backed API pattern works.

## Usage

```js
const CypressStyleAsync = require("cypress-style-async");

const mySystem = new CypressStyleAsync({
  onError(error) {
    console.error(error);
  }
});

// mySystem.api is an object that behaves like the `cy` object in Cypress.

// registerCommand adds a method to mySystem.api.
mySystem.registerCommand("example", async (command, api) => {
  // command is an object with the shape { name, args }.
  command.name; // "example"
  command.args; // An array of arguments that `mySystem.api.example` was called with

  // api is an object.
  api.context; // An object that persists throughout the lifetime of mySystem. You can add properties to it with api.writeContext, and then read them again later in any command.

  api.writeContext({ something: 4 }); // Adds the property `something` with value `4` to the api.context object.

  api.clearContext(); // clears all the properties in the context object.

  await api.sleep(100); // uses setTimeout to wait 100ms.

  api.retry({ error: new Error("everything is bad"), maxRetries: 10 });
  // api.retry tells the system that an error occurred, and to re-run this command, unless
  // we have already retried this command the number of times specified in `maxRetries`, in which
  // case the error will bubble out to the `onError` function that was passed in when `mySystem` was
  // constructed, and `mySystem` won't execute any other commands in its queue.
});

// Now you can call `example`:
mySystem.api.example("bla", "bla");

// Here's a more concrete/realistic example of a command.
mySystem.registerCommand("fetchBlob", async (command, api) => {
  const url = command.args[0]; // User must pass url as first argument
  const options = command.args[1];

  let response;
  try {
    response = await window.fetch(url, options);
  } catch (error) {
    // If the fetch failed, we retry this command up to 10 times
    api.retry({ error, maxRetries: 10 });
    return;
  }

  const blob = await response.blob();

  api.writeContext({ fetchedBlob: blob });
};

// Once you have all your commands registered, you expose only `mySystem.api` to your users.
module.exports = mySystem.api;
```

## License

MIT
