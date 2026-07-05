---
repo: DavidWells/configorama
url: 'https://github.com/DavidWells/configorama'
homepage: ''
starredAt: '2023-04-11T19:43:05Z'
createdAt: '2018-09-18T03:36:08Z'
updatedAt: '2025-01-28T07:29:04Z'
language: JavaScript
license: NA
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:52.624Z'
description: '⚙️ ${variable} support for config files'
tags: []
---

# Configorama

Dynamic configuration values with variable support.

Works with `yml`, `json`, `toml` config formats and anything that parsed down to a plain ol' javascript object

## About

Configorama extends your configuration with a powerful variable system. It resolves configuration variables from:

- CLI options
- ENV variables
- File references
- Other Key/values in config
- Async/sync JS functions
- Any source you'd like...

See [tests](https://github.com/DavidWells/configorama/tree/master/tests) for more examples.

## Table of Contents
<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Click to expand</summary>

- [About](#about)
- [Usage](#usage)
- [Variable Sources](#variable-sources)
  * [Environment variables](#environment-variables)
  * [CLI option flags](#cli-option-flags)
  * [Self references](#self-references)
  * [File references](#file-references)
  * [Sync/Async file references](#syncasync-file-references)
  * [Git references](#git-references)
  * [Filters (experimental)](#filters-experimental)
  * [Functions (experimental)](#functions-experimental)
  * [More Examples](#more-examples)
- [Custom Variable Sources](#custom-variable-sources)
- [FAQ](#faq)
- [Whats new](#whats-new)
- [Inspiration](#inspiration)

</details>
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## Usage

Async API:

```js
const path = require('path')
const configorama = require('configorama')
const cliFlags = require('minimist')(process.argv.slice(2))

// Path to yaml/json/toml config
const myConfigFilePath = path.join(__dirname, 'config.yml')

const config = await configorama(myConfigFilePath, {
  options: args
})
```

Sync API:

```js
const path = require('path')
const configorama = require('configorama')
const cliFlags = require('minimist')(process.argv.slice(2))

// Path to yaml/json/toml config
const myConfigFilePath = path.join(__dirname, 'config.yml')

const config = configorama.sync(myConfigFilePath, {
  options: cliFlags
})
```

## Variable Sources

### Environment variables

```yml
apiKey: ${env:SECRET_KEY}
```

### CLI option flags

```yml
# CLI option. Example `cmd --stage dev` makes `bar: dev`
bar: ${opt:stage}

# Composed example makes `foo: dev-hello`
foo: ${opt:stage}-hello
```

### Self references

```yml
foo: bar

# Self file reference. Resolves to `bar`
one: ${self:foo}

# Shorthand self reference. Resolves to `bar`
two: ${foo}
```

### File references

```yml
# import full yml/json/toml file via relative path
yamlFileRef: ${file(./subFile.yml)}

# import sub values from files. This imports other-config.yml `topLevel:` value
yamlFileValue: ${file(./other-config.yml):topLevel}

# import sub values from files. This imports other-config.json `nested.value` value
yamlFileValueSubKey: ${file(./other-config.json):nested.value}

# fallback to default value if file not found
fallbackValueExample: ${file(./not-found.yml), 'fall back value'}
```

### Sync/Async file references

```yml
asyncJSValue: ${file(./async-value.js)}
# resolves to 'asyncval'
```

`${file(./asyncValue.js)}` will call into `async-value` and run/resolve the async function with values. These values can be strings, objects, arrays, whatever.

```js
/* async-value.js */
module.exports = (config) => {
  return fetchSecretsFromRemoteStore()
}

function fetchSecretsFromRemoteStore() {
  return delay(1000).then(() => {
    return Promise.resolve('asyncval')
  })
}

function delay(t, v) {
  return new Promise((resolve) => setTimeout(resolve.bind(null, v), t))
}
```

### Git references

Resolve values from `cwd` git data.

```yml
repository: ${git:repository}

describe: ${git:describe}

branch: ${git:branch}

commit: ${git:commit}

sha1: ${git:sha1}

message: ${git:message}

remote: ${git:remote}

remoteDefined: ${git:remote('origin')}

remoteDefinedNoQuotes: ${git:remote(origin)}

repoUrl: ${git:repoUrl}
```

### Filters (experimental)

Filters will transform the resolved variables

```yml
toUpperCaseString: ${'value' | toUpperCase }

toKebabCaseString: ${'valueHere' | toKebabCase }

key: lol_hi

keyTwo: lol_hi

toKebabCase: ${key | toKebabCase }

toCamelCase: ${keyTwo | toCamelCase }
```

### Functions (experimental)

Functions will convert resolved config values with various methods.

```yml
object:
  one: once
  two: twice

objectTwo:
  three: third
  four: fourth

mergeObjects: ${merge(${object}, ${objectTwo})}
```

### More Examples

See the [tests folder](./tests) for a bunch of examples!

## Custom Variable Sources

Configorama allows you to bring your own variable sources.

There are 2 ways to resolve variables from custom sources.

1. Use the baked in javascript method for [sync](https://github.com/DavidWells/configorama/blob/master/tests/syncValues/syncValue.yml) or [aysnc](https://github.com/DavidWells/configorama/blob/master/tests/asyncValues/asyncValue.yml) resolution.

2. Add your own variable syntax and resolver.

    ```js
    const config = configorama('path/to/configFile', {
      variableSources: [{
        // Match variables ${consul:xyz}
        match: RegExp(/^consul:/g),
        // Custom variable source. Must return a promise
        resolver: (varToProcess, opts, currentObject) => {
          // Make remote call to consul
          return Promise.resolve(varToProcess)
        }
      }]
    })
    console.log(config)
    ```

    This would match the following config:

    ```yml
    key: ${consul:xyz}
    ```

## FAQ

**Q: Why should I use this?**

Never rendering a stale configuration file again!

**Q: Does this work with `serverless.yml`**

Yes it does. Using `serverless.js` as your main entry point!

```js
/* serverless.js */
const path = require('path')
const configorama = require('configorama')
const args = require('minimist')(process.argv.slice(2))

// Path to serverless config to be parsed
const yamlFile = path.join(__dirname, 'serverless.config.yml')

module.exports = configorama.sync(yamlFile, { options: args })
```

## Whats new

How is this different than the serverless variable system?

1. You can use it with any other tool you'd like. Just include `configorama` and go nuts.

2. It's pluggable. Add whatever variable syntax/sources you wish.

3. Filters! You can filter values before they are resolved.

    ```yml
    key: ${opt:stage | toUpperCase}
    ```

4. Cleaner self references

    ```yml
    keyOne:
      subKey: hi

    # Before
    key: ${self:keyOne.subKey}

    # Now
    key: ${keyOne.subKey}
    ```

5. Numbers as defaults are supported

    ```yml
    key: ${env:whatever, 2}
    ```

6. TOML, YML, JSON, etc support

    Configorama will work on any configuration format that can be converted into a JS object.

    Parse any config format and pass it into configorama.


7. Configorama has a number of built-in functions.

    Build in functions can be used within expressions as another way to transform and combine values. These are similar to the operators but all follow a common syntax:

    ```
    <FUNCTION NAME>(<ARGUMENT 1>, <ARGUMENT 2>)
    ```

    example:

    ```
    ${merge('one', 'two')} => 'onetwo'
    ```

## Alt libs

- https://github.com/01alchemist/sls-yaml

## Inspiration

This is forked out of the [serverless framework](https://github.com/serverless/serverless/) variable system.

**Mad props to:**

[erikerikson](https://github.com/erikerikson), [eahefnawy](https://github.com/eahefnawy), [HyperBrain](https://github.com/HyperBrain), [ac360](https://github.com/ac360), [gcphost](https://github.com/gcphost), [pmuens](https://github.com/pmuens), [horike37](https://github.com/horike37), [lorengordon](https://github.com/lorengordon), [AndrewFarley](https://github.com/AndrewFarley), [tobyhede](https://github.com/tobyhede), [johncmckim](https://github.com/johncmckim), [mangas](https://github.com/mangas), [e-e-e](https://github.com/e-e-e), [BasileTrujillo](https://github.com/BasileTrujillo), [miltador](https://github.com/miltador), [sammarks](https://github.com/sammarks), [RafalWilinski](https://github.com/RafalWilinski), [indieisaconcept](https://github.com/indieisaconcept), [svdgraaf](https://github.com/svdgraaf), [infiniteluke](https://github.com/infiniteluke), [j0k3r](https://github.com/j0k3r), [craigw](https://github.com/craigw), [bsdkurt](https://github.com/bsdkurt), [aoskotsky-amplify](https://github.com/aoskotsky-amplify), and all the other folks who contributed to the variable system.

Additionally these tools were very helpful:

- [yaml-boost](https://github.com/blackflux/yaml-boost)
- [serverless-merge-config](https://github.com/CruGlobal/serverless-merge-config)
- [terraform variables](https://www.npmjs.com/package/serverless-terraform-variables)
