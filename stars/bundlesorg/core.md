---
repo: bundlesorg/core
url: 'https://github.com/bundlesorg/core'
homepage: ''
starredAt: '2020-12-31T04:01:16Z'
createdAt: '2019-01-15T22:49:33Z'
updatedAt: '2020-12-31T07:29:11Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:13.115Z'
description: Bundles is a file bundler for anything.
tags: []
---

# Bundles Core

<!-- Shields. -->
<p>
    <!-- NPM version. -->
    <a href="https://www.npmjs.com/package/@bundles/core"><img alt="NPM version" src="https://img.shields.io/npm/v/@bundles/core.svg?style=flat-square"></a>
    <!-- NPM downloads/month. -->
    <a href="https://www.npmjs.com/package/@bundles/core"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@bundles/core.svg?style=flat-square"></a>
    <!-- Travis branch. -->
    <a href="https://github.com/brikcss/bundles-core/tree/master"><img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master"></a>
    <!-- Codacy. -->
    <a href="https://www.codacy.com/app/thezimmee/bundles-core"><img alt="Codacy code grade" src="https://img.shields.io/codacy/grade/35aeb04393844d258ed971189c18bf48/master.svg?style=flat-square"></a>
    <a href="https://www.codacy.com/app/thezimmee/bundles-core"><img alt="Codacy code coverage" src="https://img.shields.io/codacy/coverage/35aeb04393844d258ed971189c18bf48/master.svg?style=flat-square"></a>
    <!-- Coveralls -->
    <a href='https://coveralls.io/github/brikcss/bundles-core?branch=master'><img src='https://img.shields.io/coveralls/github/brikcss/bundles-core/master.svg?style=flat-square' alt='Coverage Status' /></a>
    <!-- JS Standard style. -->
    <a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square"></a>
    <!-- Prettier code style. -->
    <a href="https://prettier.io/"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
    <!-- Semantic release. -->
    <a href="https://github.com/semantic-release/semantic-release"><img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square"></a>
    <!-- Commitizen friendly. -->
    <a href="http://commitizen.github.io/cz-cli/"><img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square"></a>
    <!-- MIT License. -->
    <a href="https://choosealicense.com/licenses/mit/"><img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square"></a>
    <!-- Greenkeeper. -->
    <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/brikcss/bundles-core.svg?style=flat-square" alt="Greenkeeper badge"></a>
</p>

Bundles is a file bundler _for anything_. Bundles works similar to [WebPack](https://webpack.js.org/), [RollupJS](http://rollupjs.org), [Parcel](https://parceljs.org/), [PostCSS](https://postcss.org/) **except that while other bundlers are designed to compile to a specific output type (like JS, CSS, etc.), Bundles can compile _from anything, to anything!_** Bundles has no assumptions and places no limitations on the type of input it accepts and outputs to; it processes your data however you tell it to. Use Bundles to compile anything your heart desires (and can dream up).

## Environment support

| Node | CLI | ES Module | Browser | UMD |
| :--: | :-: | :-------: | :-----: | :-: |
|  ✓   |  ✓  |     x     |    x    |  x  |

## Terminology

For clarity's sake, the following terms are used as follows:

-   **Bundles** _(capitalized)_: The core package / tool for Bundles. Or the global `Bundles` Object, which is parsed from user configuration and then becomes the compiled result.
-   **bundles**: Configured and/or compiled bundles. More specifically, the `bundles` property of the global `Bundles` configuration Object.
-   **bundle** _(noun)_: A single or specific bundle in `Bundles.bundles`.
-   **bundle** _(verb)_: The process of taking one or more user-configured bundles and compiling them -- through a series of `bundlers` -- to achieve a desired output.
-   **bundler**: Plugins that make Bundles work. Each `bundler` is a simple JavaScript plugin or function that compiles/processes Bundles input however you like. Without `bundlers`, all Bundles does is outputs source input. With `bundlers`, Bundles can output just about anything you want.
-   **config**: The global `Bundles` configuration Object, which consists of `Bundles.options`, `Bundles.data`, and `Bundles.bundles`.
-   **options**: The `options` Object, which can be set on the global (`Bundles.options`) or regional (`bundle.options`) level. Bundles merges global `Bundles.options` with each `bundle.options`.
-   **data**: The `data` Object, which can be be set on the global (`Bundles.data`), regional (`bundle.data`), or local (`file.data`, or front matter) levels. Bundles merges global `data` with each `bundle.data`, which are each merged with each `file.data` (front matter).

## Install

Install globally:

```sh
npm install @bundles/core -g
```

or locally:

```sh
npm install @bundles/core -D
```

## Basic usage

### CLI

See [the full list of configuration options](#configuration-options) for configuring Bundles.

```bash
# With --config:
bundles --config=<path/to/config.js> [options]
# Or with <input> and --bundlers:
bundle <input>... --bundlers='[...]' [options]
```

_Note: `bundle` is an alias to the `bundles` command. Either may be use interchangeably._

### NodeJS

See [the `Bundles` Node API](#node-api) for a full list of Bundles' methods.

```js
const Bundles = require('@bundles/core');
Bundles.run(config);
```

## Configuring Bundles

### Using a config file

A config file is the recommended way to configure Bundles. There are many ways to structure a Bundles config file.

#### Single bundle

If you only have a single bundle to configure, you may export a single bundle Object (just make sure it has `input` and `bundlers` properties).

```js
module.exports = {
    id: 'my-bundle',
    input: [...],
    bundlers: [...],
    options: {...},
    data: {...}
}
```

#### Multiple bundles

For multiple bundles, you may export an Array of bundle Objects.

```js
module.exports = [{...}, {...}, {...}]
```

Or you may export an Object dictionary of bundles. In this case each key will become the `bundle.id`.

```js
module.exports = {
    'bundle1': {...},
    'bundle2': {...},
    'bundle3': {...},
}
```

#### Global config Object

To easily share global `data` and/or `options` between bundles, you may export a global config Object, which has `bundles` (required), `options`, `on`, and `data` properties. The `options` and `data` Objects will be merged with each bundle in `bundles` (Existing `bundle.options` and `bundle.data` will override global configuration). The `bundles` property can be an Object or Array.

```js
module.exports = {
    bundles: [{...}, {...}, {...}],
    // bundles: {...},
    options: {},
    data: {},
    on: {}
}
```

### Configuring individual bundles

Individual bundles can be configured [in a config file/Object as outlined above](#using-a-config-file). Configured bundles become `Bundles.bundles`, which is an Array of bundle Objects. Each bundle should be configured as follows:

-   **`id`** \{String\} The ID of the bundle, which can be used in [other options](#configuration-options). If this is not set, it will be the index value (as a String) of the order the bundle was configured.
-   **`input`** {String|[String]|Object|[Object]} _(required)_ Source input files. Each entry can be a String or Object. Strings are file or directory paths, globs accepted. An Object is a single file where `file.content` is a String or Buffer that represent the file's content, useful for passing a file's content directly. File Objects should also have `file.path`, the file's source path, which will likely be used when compiled by bundlers.
-   **`bundlers`** {[String]|[Function]|[Object]} _(required)_ Array of bundlers. A String is a path to a node module, whereas a Function is the bundler function itself. An Object allows you to pass configuration to each bundler. `bundler.run` is the only required property, and can also be a String or Function. [Learn about authoring bundlers](#authoring-a-bundler).
-   **`options`** {Object} Options for this individual bundle. See [configuring options](#configuration-options).
-   **`on`** \{Object\} _[{}]_ Dictionary of hooks (callbacks) which allow you to tie into Bundles. [See Bundles hooks](#configuring-hooks).
-   **`data`** {Object} Data for this individual bundle. This will be merged with each output file in the bundle. See [configuring data](#configuring-data).

### Configuration options

Options can be configured in the [global config Object](#global-config-object), as well as in [individual bundles](#configuring-individual-bundles). With the [command line interface](#cli), options can also be passed as parameters. The following options are available for configuration.

-   **`run`** | **`--run`** \{Boolean|String|[String]\} _[true]_ Determines which bundles -- using `bundle.id` -- will be compiled at runtime. A `true` or `falsy` value will run all bundles. A comma-separated String or an Array of bundle IDs will only run a bundle if its ID is listed. Bundles CLI only accepts a comma-separated String value.
-   **`watch`** | **`--watch`** \{Boolean|String|[String]\} _[false]_ Determines which bundles -- using `bundle.id` -- will be watched at runtime. A `true` value will watch all bundles. A comma-separated String or an Array of bundle IDs will only watch a bundle if its ID is listed. Bundles CLI only accepts a comma-separated String value.
-   **`watchFiles`** \{String|[String]\} An Array or String (globs accepted) of additional files to watch, when the bundle is being watched. These files do not get compiled, they are only added to the watcher and simply kick off a rebundle if/when any of them change. This is useful, for example, for template partials that are depended on by other source input files in the bundle.
-   **`cwd`** | **`--cwd`** \{String\} _[`process.cwd()`]_ The root or current working directory for input source paths.
-   **`loglevel`** | **`--loglevel`** \{String\} _['info']_ Level of logging. Can be `trace`, `debug`, `info`, `warn`, `error`, or `silent`.
-   **`glob`** | **`--glob`** {Object} Options passed to [globby](https://github.com/sindresorhus/globby). Bundles CLI only accepts a JSON Object.
-   **`frontMatter`** | **`--frontMatter`** {Object} Options passed to [gray matter](https://github.com/jonschlinkert/gray-matter#options). Bundles CLI only accepts a JSON Object.
-   **`chokidar`** | **`--chokidar`** {Object} Options passed to [chokidar](https://github.com/paulmillr/chokidar). Bundles CLI only accepts a JSON Object.

#### Additional CLI-only options

In addition to the config options listed above, Bundles CLI has the following configuration options available.

-   **`--config`** {String|JSON Object} Global Bundles config Object. Can be a String filepath to the config file or a JSON Object. When `--config` exists, `<input>` files and the `--bundlers` flag are ignored.
-   **`<input>...`** {String} Input files. Must be used in combination with `--bundlers`, but will be overridden if `--config` exists. Example: `bundles file.txt dir/**/* my/other/dir --bundlers='[...]' [options]`.
-   **`--bundlers`** {String|JSON Array} Bundlers. Can be a comma-separated String of node modules or a JSON Array. Must be used in combination with `<input>` files, but will be overridden if `--config` exists.
-   **`--data`** {String|JSON Object} Global data. Can be a String filepath to a node module or a JSON Object.

### Configuring hooks

Bundles hooks allow you to tie into the Bundles workflow. Like other global properties, hooks can be configured globally via `Bundles.on` or per bundle via `bundles.on`. The following hooks are available.

-   **`afterBundle`** \{Function\} `(Bundles) => {}` Called each time after all bundles are completed. Does not require a return value. This allows you to do things such as run/reload a development server, etc.

### Configuring data

Data can be configured in the [global config Object](#global-config-object), in [individual bundles](#configuring-individual-bundles), or locally in file content using front matter. Front matter is parsed with [gray matter](https://github.com/jonschlinkert/gray-matter), which means front matter can exist in many languages (i.e., YAML, JSON, JS, etc.). All data is merged as follows:

```js
// Local file/front matter data is merged on top of bundle.data,
// which is merged on top of global Bundles.data.
file.data = merge(frontMatter, bundle.data, Bundles.data);
```

## `Bundles` global Object

The `Bundles` global Object is returned by all `Bundles` methods, and is formed as follows.

-   **`success`** \{Boolean\} `true` if all bundles ran successfully.
-   **`configFile`** \{String|null\} Path to config file, or `null` if a config file was not used.
-   **`dataFiles`** \{[String]\} Input source paths to the `configFile` and its children data files, if a config file was used.
-   **`watchingData`** \{Boolean\} `true` if `Bundles` is watching config/data files.
-   **`watcher`** \{Object\} If `watchingData` is true, this contains the [chokidar](https://github.com/paulmillr/chokidar) watcher.
-   **`options`** \{Object\} Original [global configuration options](#configuration-options).
-   **`on`** \{Object\} _[{}]_ Dictionary of hooks (callbacks) which allow you to tie into Bundles. [See Bundles hooks](#configuring-hooks).
-   **`data`** \{Object\} Original [global data](#configuring-data).
-   **`bundles`** \{[Object]\} [Compiled bundle Objects](#compiled-bundle-objects).

### Compiled bundle Objects

`Bundles.bundles` is an Array of individual bundle Objects. Each bundle contains the following combination of original user configuration and internally created data properties.

-   **`id`** \{String\} The bundle's ID. If this was not configured by the user it will default to the bundle's index (from the order all bundles were run).
-   **`input`** {Map} Map which contains each user-configured input source path as the key, and resolved source paths as its value.
-   **`output`** \{Map\} Map of [output files](#compiled-output-file-objects), containing compiled source input. The key for each file is its source path.
-   **`changed`** \{Map\} Map of [output files](#compiled-output-file-objects) that have been _changed_ or modified since last bundle. The key for each file is its source path.
-   **`removed`** \{Map\} Map of [output files](#compiled-output-file-objects) that have been _removed_ since last bundle. The key for each file is its source path.
-   **`bundlers`** {[Object]} Objects Array of [configured bundlers](#configuring-individual-bundles) which compiled the source input.
-   **`options`** {Object} Original user-configured [global options](#configuration-options), merged with `bundle.options`.
-   **`data`** {Object} User-configured [global data](#configuring-data), merged with `bundle.data`, merged with `file.data` (front matter).
-   **`success`** {Boolean} Whether all `bundle.bundlers` completed successfully.
-   **`valid`** \{Boolean\} Whether the bundle is a valid/appropriately configured bundle.
-   **`watching`** \{Boolean\} Whether the bundle is watching files. When `true`, the source input will be rebundled when any of the source files change.
-   **`watcher`** \{Object\} When `bundle.watching` is `true`, this will contain the [chokidar](https://github.com/paulmillr/chokidar) watcher.

### Compiled output file Objects

An Array of output file Objects is returned in `Bundles.bundles[n].output`. Each output file is a compiled source input file, and is formed as follows.

-   **`content`** \{String|Buffer\} The file's compiled content, which can be a String or Buffer.
-   **`data`** \{Object\} File data, which is the merged result of `merge( {}, file.source.data, bundle.data, Bundles.data )`.
-   **`encoding`** \{String\} _['utf8']_ The file's encoding, either `utf8` (default) or `binary`.
-   **`isBuffer`** \{Boolean\} Whether the file is a Buffer (`true`) or String (`false`).
-   **`source`** \{Object\} Information about the input source, containing the following properties:
    -   **`path`** \{String\} Input source file path, relative to `options.cwd`.
    -   **`cwd`** \{String\} The configured root directory, copied from `options.cwd`. The file path is resolved as `path.join(cwd, path)`.
    -   **`content`** \{String|Buffer\} Input source content, which can be a String or node Buffer. For `utf8` content, front matter and excerpts are removed and assigned to other properties below.
    -   **`data`** \{Object\} Local front matter data, parsed by [gray matter](https://github.com/jonschlinkert/gray-matter). Gray matter is flexible enough to understand many types of front matter ([see details](https://github.com/jonschlinkert/gray-matter#optionslanguage)).

## Node API

### **`Bundles.run(config)`** <a name="bundles-run"></a>

-   `config` {String|Object|[Object]} User configuration. Accepts anything a [config file](#configuring-bundles) will accept. Also accepts a String path to a config file, or `config.bundles` can be a String path to a config file.
-   _@return_ {Object} The [global `Bundles` Object](#bundles-global-object).

Run/compile bundles from [user configuration](#configuring-bundles). Likely the only method you will need to use.

### **`Bundles.create(config)`**

-   `config` {String|Object|[Object]} User configuration. Accepts anything a [config file](#configuring-bundles) will accept. Also accepts a String path to a config file, or `config.bundles` can be a String path to a config file.
-   _@return_ {Object} The [global `Bundles` Object](#bundles-global-object).

Parse [user configuration](#configuring-bundles) and "refresh" the global `Bundles` Object. This means if configuration already exists in `Bundles`, it is merged with the new user configuration, leaving in tact the original configuration Objects.

### **`Bundles.bundle(idsToRun)`**

-   **`idsToRun`** {String|String[]} Comma-separated String or Array of bundle IDs to run. A `true` or `falsy` value will run all bundles.
-   _@return_ {Object} The [global `Bundles` Object](#bundles-global-object).

Runs bundles configured in `Bundles.bundles`.

### **`Bundles.reset()`**

-   _@return_ {Object} The [global `Bundles` Object](#bundles-global-object).

Resets global `Bundles` Object to its original state. Useful in a long-running process when you need a fresh state.

## Authoring a `bundler`

You want to create your own bundler? Great, it's very easy!! A `bundler` is a simple Function, wrapped in a Node module, with very little boilerplate.

Here's a simple bundler which appends a new line at the end of each file:

```js
module.exports = (bundle, bundler) => {
    bundle.output.forEach((file) => {
        file.content += '\n';
    });
    // Always return the bundle.
    return bundle;
};
```

You may return a Promise:

```js
const fs = require('fs');
module.exports = (bundle = {}, bundler = {}) => {
    // Return a promise...
    return new Promise((resolve) => {
        bundle.output.forEach((file) => {
            file.content += '\n';
        });
        // In a Promise, always resolve to the bundle Object.
        return resolve(bundle);
    });
};
```

### Guidelines for authoring bundlers

1. A `bundler` must return a Function -- synchronous or asynchronous -- which returns the `bundle` Object. As illustrated above, the `bundle` and `bundler` Objects are passed to this Function. [See how these Objects are configured](#configuring-bundles).

2. Become familiar with [file Objects](#compiled-output-file-objects). These contain all the data you typically need to modify. A bundler typically will iterate through the files they wish to modify and _always returns the `bundle`_.

3. The purpose of most bundlers are typically to 1) select the files they wish to modify, and 2) modify them according to its goals. Bundles provides the following Map "sets" of files which can be iterated over:

    - `bundle.output`: Contains all files.
    - `bundle.changed`: Only files that have changed since last compile.
    - `bundle.removed`: Only files that were removed since alst compile.

4. Each file set above is a [JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), so you can iterate over them with [`Map.forEach()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach), or lookup and interact with specific files with [`Map.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get), [`Map.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set), or any of the other useful [Map methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

5. When iterating over files, _it is strongly recommended to iterate over `bundle.changed`, not `bundle.output`._ This will give you better performance as it takes advantage of Bundles' incremental bundle feature to only rebundle files that have changed.
