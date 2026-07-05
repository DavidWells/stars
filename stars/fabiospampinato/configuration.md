---
repo: fabiospampinato/configuration
url: 'https://github.com/fabiospampinato/configuration'
homepage: null
starredAt: '2023-12-29T19:35:39Z'
createdAt: '2019-10-07T00:08:10Z'
updatedAt: '2024-12-12T10:44:48Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:40.287Z'
description: Performant and feature rich library for managing configurations/settings.
tags:
  - configuration
  - managment
  - performant
  - preferences
  - settings
---

# Configuration

Performant and feature rich library for managing configurations/settings.

## Features

This library has been modeled after VSCode's settings system, and it can be used for implementing a similarly powerful system in your app.

- **Performant**: it's designed to be extremely fast.
- **Providers**: a provider reads and writes the actual data, many are built-in (memory, json, local storage etc.) and others can be written easily.
- **Universal**: it works in the browser too, just use a suitable provider.
- **Scopes**: a single configuration instance can have multiple providers, so for example a `global + local` setup can be implemented easily.
- **Filtering**: an arbitrary filter function can be provided, for example to make sure the settings are filtered by a schema.
- **Path props**: path props (e.g. `foo.bar`) are supported for retrieving/setting/deleting entries.
- **Flat objects**: flat objects (e.g. `{ 'foo.bar': true, 'foo.baz': false }`) are supported transparently too.

## Install

```sh
npm install --save configuration
```

## Usage

The following providers are built-in:

```ts
import ProviderAbstract from 'configuration/abstract'; // The most basic abstract provider
import ProviderAbstractFile from 'configuration/abstract-file'; // The most basic abstract file provider
import ProviderAbstractJSON from 'configuration/abstract-json'; // The most basic abstract JSON-backed file provider
import ProviderFile from 'configuration/file'; // A provider that reads/writes to a file
import ProviderJSON from 'configuration/json'; // A provider that reads/writes to a JSON file
import ProviderMemory from 'configuration/memory'; // A provider that reads/writes to memory
import ProviderStorage from 'configuration/storage'; // A provider that reads/writes to a general web storage object
import ProviderLocalStorage from 'configuration/local-storage'; // A provider that reads/writes to localStorage
import ProviderSessionStorage from 'configuration/session-storage'; // A provider that reads/writes to sessionStorage
```

This is how you'd create a multi-tier settings sytem:

```ts
import Configuration from 'configuration';
import ProviderMemory from 'configuration/memory';
import ProviderJSON from 'configuration/json';

// Let's initiate the configuration instance

const Window = new ProviderMemory ({ // A window-level tier, that overrides every other tier
  scope: 'window', // The name of the scope for this provider
  defaults: {}, // The default settings object for this provider
  defaultsRaw: '{\n\t// Write window-level settings here\n}' // The default settings object for this provider as a string
});

const Local = new ProviderJSON ({ // A local-level tier, that overrides every other tier except for "window"
  scope: 'local', // The name of the scope for this provider
  path: './myapp/local.json', // Path where to persist data
  watching: true, // Whether to watch the file for changes too or not
  defaults: {}, // The default settings object for this provider
  defaultsRaw: '{\n\t// Write local-level settings here\n}' // The default settings object for this provider as a string
});

const Global = new ProviderJSON ({ // A global-level tier, that overrides only the "defaults" tier
  scope: 'global', // The name of the scope for this provider
  path: '/Users/fabio/.config/myapp/global.json', // Path where to persist data
  watching: true, // Whether to watch the file for changes too or not
  defaults: {}, // The default settings object for this provider
  defaultsRaw: '{\n\t// Write global-level settings here\n}' // The default settings object for this provider as a string
});

const configuration = new Configuration ({
  providers: [Window, Local, Global], // List of custom providers used, ordered by priority
  defaults: { // The default settings object for the implicit "defaults" scope
    some: {
      default: {
        settings: true
      }
    }
  },
  filter: settings => { // Custom optional function for manipulating the raw settings object
    // Optionally filter down the passed "settings" object...
    return settings;
  }
});

// Using the #get method

configuration.get (); // Get the entire merged object
configuration.get ( '*' ); // Get the entire object for each scope
configuration.get ( '*', 'some.path' ); // Get the value at "some.path" for all scopes
configuration.get ( 'local', 'some.path' ); // Get the value at "some.path" from the "local" scope
configuration.get ( 'some.path' ); // Get the value at "some.path" from the first scope that has a value for it

// Using the #has method

configuration.has ( '*', 'some.path' ); // Check if a value exists at "some.path" in all scopes
configuration.has ( 'local', 'some.path' ); // Check if a value exists at "some.path" in the "local" scope
configuration.has ( 'some.path' ); // Check if a value exists at "some.path" in at least one scope

// Using the #remove method

configuration.remove ( '*', 'some.path' ); // Remove the "some.path" key from all scopes
configuration.remove ( 'local', 'some.path' ); // Remove the "some.path" key from the "local" scope
configuration.remove ( 'some.path' ); // Remove the "some.path" key from any scope that has a value for it

// Using the #reset method

configuration.reset (); // Reset the value of every scope to its default one
configuration.reset ( 'local' ); // Reset the value of the "local" scope

// Using the #set method

configuration.set ( '*', 'some.path', 123 ); // Set "123" as the value at "some.path" for every scope
configuration.set ( 'local', 'some.path', 123 ); // Set "123" as the value at "some.path" for the "local" scope
configuration.set ( 'some.path', 123 ); // Set "123" as the value at "some.path" in the first scope that has a value for that key

// Using the #update method

configuration.update ( '*', { something: {} } ); // Replacing the entire settings object for every scope
configuration.update ( 'local', { something: {} } ); // Replacing the entire settings object for the "local" scope

// Listening for changes

configuration.onChange ( () => {
  // Something changed anywhere in the object, but we don't know exactly where, but this makes this callback the cheapest
});

configuration.onChange ( 'local', 'some.path', ( value, valuePrev ) => {
  // The value of "some.path" in the "local" scope changed
});

configuration.onChange ( 'some.path', ( value, valuePrev ) => {
  // The value of "some.path" in the first scope that provides a value for it changed
});

// Let's dispose of the configuration object, stopping filesystem watching for example

configuration.dispose ();
```

## License

MIT © Fabio Spampinato
