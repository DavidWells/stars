---
repo: m10rten/i4n
url: 'https://github.com/m10rten/i4n'
homepage: 'https://www.npmjs.com/i4n/'
starredAt: '2024-08-16T16:42:00Z'
createdAt: '2024-08-16T11:40:52Z'
updatedAt: '2024-08-25T10:47:53Z'
language: TypeScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:25.963Z'
description: "\U0001F310\U0001FAB6  Lightweight, Zero dependencies, Typesafe and Simple to use translations for TypeScript."
tags: []
---

[![NPM Version](https://img.shields.io/npm/v/i4n?style=flat-square&color=indigo)](https://npmjs.com/i4n/)
[![NPM Downloads](https://img.shields.io/npm/d18m/i4n?style=flat-square&color=indigo)](https://npmjs.com/i4n/)
[![NPM License](https://img.shields.io/npm/l/i4n?style=flat-square&color=indigo)](https://npmjs.com/i4n/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/i4n?style=flat-square&color=indigo)](https://npmjs.com/i4n/)
[![NPM Type Definitions](https://img.shields.io/npm/types/i4n?style=flat-square&color=indigo)](https://npmjs.com/i4n/)

# i4n

🌐🪶 Lightweight, Zero dependencies, Typesafe and Simple to use translations for TypeScript.

## Installation

To use this package, install with npm:

```bash
npm install i4n
```

## Contents

- [i4n](#i4n)
- [Installation](#installation)
- [Usage](#usage)
- [Init](#init)
- [Functions](#functions)
  - [`t`](#tkey-string--string-args-any)
    - [Fallback keys](#fallback-keys)
    - [Fallback language](#fallback-language)
  - [`switch`](#switchanguage-string)
  - [`lazy`](#lazydata-recordstring-any-loader---promiserecordstring-any--recordstring-any)
  - [Templates](#templates)
  - [Loader](#loader)
- [`I4nException`](#i4nexception)
- [Examples](#examples)

## Features

- `t` typed function for getting translations.
- `switch` to change the language the `t` function uses.
- `lazy` to load data and use it in the `t` function after loading.
- fallback keys and fallback language.
- templates for easy control.
- custom data loader (for eg. JSON files)

## Usage

To get started with translating, import the I4n class:

```ts
import { I4n } from "i4n";
```

Then create a set of translations:

```ts
const translations = {
  en: {
    hi: "Hello",
    earth: "World",
    what: {
      happened: "What happened?",
    },
  },
  es: {
    hi: "Ola",
    earth: "Mundo",
    what: {
      happened: "¿Qué pasó?",
    },
  },
} as const;
```

> This package will not validate this structure or types inbetween translations(!), but having an object with languages is required for this module to work.

This will **not** work:

```ts
// BAD:
const translations = {
  hi: "Hello",
  earth: "World",
  what: {
    happened: "What happened?",
  },
} as const;
```

> ⚠️ Warning:
> Watch out when making bulk translations, in that case be sure to type it yourself as this may cause the `i4n` package to not work as intended or expected.

For example:

```ts
const translations = {
  en: {
    earth: "World",
  },
  es: {
    aerth: "Mundo",
  },
} as const;
```

This does not raise typescript errors because it is a valid object.

To overcome this, implement your own types:

```ts
type TranslationData = {
  earth: string;
};
type Language = "en" | "es" | "fr";
type TranslationSet = {
  [lang in Language]?: LanguageData;
};

const translations: TranslationSet = {
  en: {
    earth: "world",
  },
  es: {
    aerth: "Mundo",
    // ^ Typescript error
  },
};
```

## Init

Then initialize the class with your translations and default language:

```ts
const i4n = new I4n({ ... });

i4n.t;
i4n.switch;
```

### I4n Constructor

```ts
new I4n(config: {
  translations?: Record<string, any>;
  loader?: Promise<Record<string, any>> | Record<string, any>;
  language: string;
  fallbackLanguage?: string;
});
```

- **translations**: An object containing the translation data, organized by language codes.
- **language**: The default language to use.
- **fallbackLanguage**: (Optional) The language to fall back to if a translation is missing.
- **loader**: A loader to, for example, load json data from a `.json` file.

> The types are configured to have the `translations` or `loader` present in the arguments, leaving both out or putting both in will result in an `I4nException`.

## Functions

To use it there are 3 functions: `t`, `switch` and `lazy`.

### `t(key: string | string[], ...args: any[])`

The `t` function allows you to call your translations with a `dot.notation` so you may get nested fields.

```ts
console.log(i4n.t("hi")); // "Hello"
```

Calling the `t` method for just an object (not the nested key), will result in the object being returned.

```ts
console.log(i4n.t("what")); // { happened: "What happened?" }
```

#### Fallback keys

When using `i4n` with an API, you might have different translations for different error codes, but you do not want to type out all the HTTP error codes in your translations. Introducing: fallbacks.

With fallbacks, you can give a second key that should be used instead if the first key does not return a value.

This looks like this:

```ts
const translations = {
  en: {
    errors: {
      "404": "Not found error",
      "500": "Server error",
      unspecified: "unspecified",
    },
  },
};
const i4n = new I4n({ translations, language });

// your api call for example ...
// you get an error code from the `fetch`, e.g:  code: 401
const text = i4n.t([`errors.${code}`, "errors.unspecified"]); // "unspecified"
```

This will make development easier for not having to check if you have all the expected translations present.

#### Fallback Language

You might forget to translate something, this config option makes sure you will have a language to fall back to.

```ts
// ... translations
const i4n = new I4n({ fallbackLanguage: "en" });
i4n.switch("es");

i4n.t("say-hi"); // does not exist in 'es' -> "Hello" from 'en'
```

### `switch(;anguage: string)`

The `switch` method enables the application to switch languages at runtime, making it very useful for web translations.

```ts
i4n.switch("es");

console.log(i4n.t("hi")); // "Ola"
```

### `lazy({data?: Record<string, any>, loader?: () => Promise<Record<string, any>> | Record<string, any>})`

Enables the user to load in translations after initialization of the `I4n` class.

```ts
const i4n = new I4n({...}); // {en, es}
i4n.ready; // true

i4n.t("french-key"); // undefined

i4n.lazy({ loader: myCustomLoader }); // {fr}
i4n.ready; // false

await i4n.loaded({lang: "fr"})
i4n.ready; //true

i4n.t("french-key"); // "mon-key".
```

### Templates

When working with `i4n`, you might find that you want to modify the output.

With templates, there are a few small steps required to get started:

**Step 1**: Edit your translations to include a template function.

This can be any function, I chose for it to look like this:

```ts
const translations: TranslationSet = {
  en: {
    sayHiTo: (name: string) => `Hello ${name}`,
  },
  es: {
    sayHiTo: (name: string) => `Ola ${name}`,
  },
};
```

**Step 2**: Call your new template with custom parameters.

You will then call the function `t` the same way, but with the parameters you defined:

```ts
i4n.t("sayHiTo", "John"); // "Hello John"
```

> 💡 As mentioned, this works with the parameters **you** defined. Objects and custom classes will also work!

This may seem small, but this is fully typed, making it very easy to define and use your templates in your code.

### Loader

To use json files, it is recommended to use a custom `loader`.

```ts
async function myJsonLoader(): Promise<TranslationSet> {
  return await import("./file-to-translations.json");
}

const i4n = new I4n<TranslationSet>({
  loader: myJsonLoader,
});
```

The types you pass in the `I4n` class should be the same as the loader.

> 💡 Since you cannot ensure type safety on JSON files, it is recommended to use a tool like [zod](https://zod.dev/) to ensure type safety.

#### `.loaded`

You can then wait for the data to be loaded using the `.loaded` function:

```ts
await i4n.loaded();
```

#### `.ready`

When you do not wish to block the process, you can check with the .ready if the loader has completed and the translations can be accessed.

```ts
const i4n = new I4n({...}); // with loader;

// later in the program:
i4n.ready;// boolean;
```

## `I4nException`

When using this package, be sure not to force types.

The `translations` prop in the `I4n` class can only accept objects, no `Map`, `Set` or `Array`.

In that case, the module will throw a `I4nException` error.

The same error is thrown when (also forced) switching to a language that is not in the translations.

These errors will need to be catched if you need to force some functionality, but this is strongly discouraged because it may break any end-user experience.

## Examples

To showcase the `i4n` package, there have been made several examples.

The following examples are present in this repository:

<!-- - [**Nextjs.org**](https://nextjs.org/) - [examples/i4n-next](../examples/i4n-next/README.md) -->
<!-- - [**Hono.dev**](https://hono.dev/) - [examples/i4n-hono](../examples/i4n-hono/README.md) -->

- [**React.dev**](https://react.dev/) - [examples/i4n-react](../examples/i4n-react/README.md)
- [**Node.js**](https://nodejs.org/) - [examples/i4n-node](../examples/i4n-node/README.md)
- **JSON** - [examples/i4n-json](../examples/i4n-json/README.md)

<hr />

[back to top](#i4n)
