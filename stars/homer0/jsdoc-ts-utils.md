---
repo: homer0/jsdoc-ts-utils
url: 'https://github.com/homer0/jsdoc-ts-utils'
homepage: 'https://homer0.github.io/jsdoc-ts-utils'
starredAt: '2021-11-14T00:44:01Z'
createdAt: '2020-07-14T07:26:37Z'
updatedAt: '2023-09-17T14:12:15Z'
language: JavaScript
license: NA
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.664Z'
description: A plugin with utilities to make your TypeScript-like docs JSDoc valid
tags:
  - hacktoberfest
  - jsdoc
  - jsdoc-plugin
  - typescript
---

# JSDoc TypeScript utils

[![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/homer0/jsdoc-ts-utils/test.yml?branch=main&style=flat-square)](https://github.com/homer0/jsdoc-ts-utils/actions/workflows/test.yml?query=branch%3Amain)
[![Coveralls GitHub](https://img.shields.io/coveralls/github/homer0/jsdoc-ts-utils.svg?style=flat-square)](https://coveralls.io/github/homer0/jsdoc-ts-utils?branch=main)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/jsdoc-ts-utils?style=flat-square)

A plugin with utilities to make your TypeScript-like docs JSDoc valid

## Introduction

This plugin allows you to take advantage of the [TypeScript](https://www.typescriptlang.org) language server on modern IDEs/editors to generate [intelligent code completion](https://en.wikipedia.org/wiki/Intelligent_code_completion) using your [JSDoc](https://jsdoc.app) comments, and at the same time, be able to generate a documentation site with JSDoc CLI.

The reason this plugin exists is that JSDoc comments as specified by its _convention_ are not 100% compatible with TypeScript, and they don't cover all the cases; sometimes, writing something that is JSDoc valid can end up killing the code completion, and other times, writing something for the code completion can cause invalid code for the JSDoc CLI.

The plugin counts with a few (toggleable) features you can use to write code valid for TypeScript that will also be valid for the JSDoc CLI.

There are also a few features that are designed to make the code compatible with the [ESLint plugin for JSDoc](https://npmjs.com/package/eslint-plugin-jsdoc), highly recommended if you are getting serious with JSDoc.

## Configuration

The first thing you need to do after installing the package, is to add it to the `plugins` array on your JSDoc configuration:

```js
{
  // ...
  "plugins": [
    "jsdoc-ts-utils",
    // ...
  ]
}
```

> It's important do add it first as it makes modifications to the code in order to make it valid. If a plugin that requires the code to be valid gets executed first, you may end up with unexpected errors.

Since JSDoc doesn't allow to add configuration options on the `plugins` list, if you need to change the settings, you'll need to create a `tsUtils` object:

```js
{
  // ...
  "plugins": [
    "jsdoc-ts-utils",
    // ...
  ],
  "tsUtils": {
    "typedefImports": true,
    "typeOfTypes": true,
    "extendTypes": true,
    "modulesOnMemberOf": true,
    "modulesTypesShortName": true,
    "parentTag": true,
    "removeTaggedBlocks": true,
    "removeTags": true,
    "typeScriptUtilityTypes": true,
    "tagsReplacement": {}
  }
}
```

| Option | Default | Description |
| ------ | ------- | ----------- |
| `typedefImports` | `true` | Whether or not to enable the feature that removes `typedef` statements that use `import`. |
| `typeOfTypes` | `true` | Whether or not to enable the feature that replaces `{typeof T}` with `{Class.<T>}`. |
| `extendTypes` | `true` | Whether or not to enable the feature that allows intersections to be reformatted. |
| `modulesOnMemberOf` | `true` | Whether or not to enable the feature that fixes modules' paths on `memeberof` so they can use dot notation. |
| `modulesTypesShortName` | `true` | Whether or not to register modules types without the module path too. |
| `parentTag` | `true` | Whether or not to transform all `parent` tags into `memberof`. |
| `removeTaggedBlocks` | `true` | Whether or not to remove all blocks that have a `@jsdoc-remove` tag. |
| `removeTags` | `true` | Whether or not to remove all tags that follow a `@jsdoc-remove-next-tag` tag. |
| `typeScriptUtilityTypes` | `true` | Whether or not to add the external utility types from TypeScript. |
| `tagsReplacement` | `null` | A dictionary of tags to replace, they keys are the tags being used and the values the tag that should be used. |

## Features

### Import type defintions

```js
/**
 * @typedef {import('./daughters').Rosario} Rosario
 */
```

This syntax can be used to import a type from another file without having to import a variable that you won't be using. It not only allows you to import the type of an existing object, but also a type defined with `@typedef`.

The feature will detect the block and replace it with empty lines (so it doesn't mess up the lines of other definitions on the generated site).

In case you want to import the type but show it as an external on the site, because it's the type of an installed library and you want to reference it or something, you could use the following syntax:

```js
/**
 * @typedef {import('family/daughters').Pilar} Pilar
 * @external Pilar
 * @see https://npmjs.com/package/family
 */
```

The feature will only replace the line for the `@typedef` and leave the rest.

This is enabled by default but you can disable it with the `typedefImports` option.

### Use `typeof` as a type

```js
/**
 * @typedef {typeof Rosario} ClassRosario
 */
```

One of the most "complicated" things you'll find when typing with JSDoc is how to type class constructors. Let's say a function receives a parameter that is not an instance of the class but its constructor, the `@param` can't be the type of the class: you won't get the autocomplete if you call `new` on it.

Using the previous feature you can define a `@typedef` with an `import` to the file and the brackets syntax (`import('...')['MyClass']`) to get the constructor reference... but what if you are on the same file as the class? that's when you use `{typeof MyClass}`.

The `typeof Class` inside a type is not valid JSDoc, so this feature will transform it in order to use the convention `Class.<MyClass>`:

```js
/**
 * @typedef {Class.<Rosario>} ClassRosario
 */
```

This is enabled by default but you can disable it with the `typeOfTypes` option.

### Extending existing types

```js
/**
 * @typedef {Object} Entity
 * @property {string} shape ...
 * @property {string} name  ...
 */

/**
 * @typedef {Entity & PersonProperties} Person
 */

/**
 * @typedef {Object} PersonProperties
 * @property {number} age    ...
 * @property {number} height ...
 * @augments Person
 */
```

You can extend an existing type by defining a new one with the new attributes/properties and another one that intersect it with the original.

The feature will find the one with the intersection, look if there's a type that `aguments`/`extends` it, remove the intersection, move the attributes/properties to its own definition and remove the extra definition:

```js
/**
 * @typedef {Object} Entity
 * @property {string} shape ...
 * @property {string} name  ...
 */

/**
 * @typedef {Entity} Person
 * @property {number} age    ...
 * @property {number} height ...
 */
```

If the feature can't find a type the `aguments`/`extends` the intersection, it will simply transform it into a union.

> **Note:** You should always define the attributes/properties type after the intersection type, so when the feature removes it, it won't mess up the lines of other definitions on the generated site.

This is enabled by default but you can disable it with the `extendTypes` option.

### Modules' paths on @memberof

```js
/**
 * @typedef {Object} Entity
 * @property {string} shape ...
 * @property {string} name  ...
 * @memberof module.services.utils
 */
```

This is meant to solve issues with the ESLint plugin: If the plugin is configured for TypeScript, you can't use the `module:` prefix on `@memberof`, as the parser doesn't support it.

Adding modules to definitions is something really useful to group parts of your project on the generated site, so this feature allows you to use dot notation: `module.[path]` instead of `module:[path]` and it will automatically transform it before the JSDoc CLI reads it.

This is enabled by default but you can disable it with the `modulesOnMemberOf` option.

### Modules' types short names

```js
/**
 * @typedef {Object} Entity
 * @property {string} shape ...
 * @property {string} name  ...
 * @memberof module.services.utils
 */

/**
 * @param {Entity} entity
 * ...
 */
```

When you add `@memberof` to a type definition, you cannot longer reference the type by its name alone, you have to use the `module:[path].[type]` format for the JSDoc CLI to properly link it... not great.

This features intercepts the creation of the links for types on the generated site and if the type has the `module:` prefix, it will also register it without the prefix as an alias.

Something similar happens with externals; when you want to reference an external, you need to use `externa:[type]`... yes, the feature takes care of that too.

This is enabled by default but you can disable it with the `modulesTypesShortName` option.

### @parent tag

```js
/**
 * @typedef {Object} Entity
 * @property {string} shape ...
 * @property {string} name  ...
 * @parent module:services/utils
 */
```

If you use special characters on your modules names, like `/`, then `modulesOnMemberOf` won't be enough to help you: the parser the ESLint plugin uses for TypeScript only allows dot notation.

This feature is simply an alias for `@memberof`: you put whatever you want in the `@parent` tag, and before generating the site, it will be converted to `@memberof`.

> If you are taking advantage of this feature and using the ESLint plugin, you should add `parent` to the `definedTags` option of the `jsdoc/check-tag-names` rule.

This is enabled by default but you can disable it with the `parentTag` option.

### Remove blocks

```js
/**
 * @typedef {JQuery.AjaxSettings['success']} JQueryOnSuccess
 * @jsdoc-remove
 */
```

Sometimes you have types that could make the site generation fail, and you can't fix them with any of the other features this plugin provides. For those cases, you can use the `@jsdoc-remove` tag to completely remove the block before it even gets processed by the JSDoc CLI.

This is enabled by default but you can disable it with the `removeTaggedBlocks` option.

### Remove tags

```js
/**
 * @jsdoc-remove-next-tag
 * @typedef {JQuery.AjaxSettings['success']} JQueryOnSuccess
 * @external JQueryOnSuccess
 * @see {@link http://api.jquery.com/jQuery.ajax/#success}
 */
```

While the `jsdoc-remove` tag may be util to get rid of those blocks that breaks the site generation, sometime you just want to remove one single tag, as separating in multiple blocks may make the code hard to read. For those cases, you can use the `@jsdoc-remove-next-tag` tag, and it will only remove the next tag.

You can even use it multiple times in a single block:

```js
/**
 * @jsdoc-remove-next-tag
 * @typedef {JQuery.AjaxSettings['success']} JQueryOnSuccess
 * @external JQueryOnSuccess
 * @see {@link http://api.jquery.com/jQuery.ajax/#success}
 * @jsdoc-remove-next-tag
 * @typedef {JQuery.AjaxSettings['error']} JQueryOnError
 * @external JQueryOnError
 * @see {@link http://api.jquery.com/jQuery.ajax/#error}
 */
```

This is enabled by default but you can disable it with the `removeTags` option.

### TypeScript utility types

```js
/**
 * @typedef {Object} Entity
 * @property {string} shape ...
 * @property {string} name  ...
 */

/**
 * @param {Partial<Entity>} entity
 * ...
 */
```

TypeScript already comes with a set of [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) that you can use on your code and that the code completion will understand.

This feature basically takes those types and define them as `@external`s, so they can have links on the generated site.

This is enabled by default but you can disable it with the `typeScriptUtilityTypes` option.

### Tags replacement

```js
/**
 * @parametro {string} name
 * @parametro {number} age
 * @retorno {Entity}
 */
```

This feature doesn't have a specific use case, it was built for the `@parent` tag and I decided to expose as maybe someone would have the need for it.

The feature allows you to replace tags before generating the site. You define a "replacement dictionary" on the plugin configuration:

```js
{
  // ...
  "plugins": [
    "jsdoc-ts-utils",
    // ...
  ],
  "tsUtils": {
    "tagsReplacement": {
      "parametro": "param",
      "retorno": "returns"
    }
  }
}
```

And before generating the site, the feature will replace the tags from the keys with the ones from the values.

No modification to the `tagsReplacement` option will affect the `@parent` tag feature, they use different instances.

## Development

### Scripts

| Task       | Description                          |
|------------|--------------------------------------|
| `docs`     | Generates the project documentation. |
| `lint`     | Lints the staged files.              |
| `lint:all` | Lints the entire project code.       |
| `test`     | Runs the project unit tests.         |
| `todo`     | Lists all the pending to-do's.       |

### Repository hooks

I use [`husky`](https://npmjs.com/package/husky) to automatically install the repository hooks so the code will be tested and linted before any commit, and the dependencies updated after every merge.

#### Commits convention

I use [conventional commits](https://www.conventionalcommits.org) with [`commitlint`](https://commitlint.js.org) in order to support semantic releases. The one that sets it up is actually husky, that installs a script that runs `commitlint` on the `git commit` command.

The configuration is on the `commitlint` property of the `package.json`.

### Releases

I use [`semantic-release`](https://npmjs.com/package/semantic-release) and a GitHub action to automatically release on NPM everything that gets merged to main.

The configuration for `semantic-release` is on `./releaserc` and the workflow for the release is on `./.github/workflow/release.yml`.

### Testing

I use [Jest](https://facebook.github.io/jest/) to test the project.

The configuration file is on `./.jestrc.js`, the tests are on `./tests` and the script that runs it is on `./utils/scripts/test`.

### Linting && Formatting

I use [ESlint](https://eslint.org) with [my own custom configuration](https://npmjs.com/package/@homer0/eslint-plugin) to validate all the JS code. The configuration file for the project code is on `./.eslintrc` and the one for the tests is on `./tests/.eslintrc`. There's also an `./.eslintignore` to exclude some files on the process. The script that runs it is on `./utils/scripts/lint-all`.

For formatting I use [Prettier](https://prettier.io) with [my custom configuration](https://npmjs.com/package/@homer0/prettier-config). The configuration file for the project code is on `./.prettierrc`.

### Documentation

I use [JSDoc](https://jsdoc.app) to generate an HTML documentation site for the project.

The configuration file is on `./.jsdoc.js` and the script that runs it is on `./utils/scripts/docs`.

### To-Dos

I use `@todo` comments to write all the pending improvements and fixes, and [Leasot](https://npmjs.com/package/leasot) to generate a report.

The script that runs it is on `./utils/scripts/todo`.
