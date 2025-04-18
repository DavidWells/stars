---
repo: 2fd/graphdoc
url: 'https://github.com/2fd/graphdoc'
homepage: 'https://2fd.github.io/graphdoc'
starredAt: '2020-08-09T19:34:21Z'
createdAt: '2016-08-09T01:33:28Z'
updatedAt: '2025-02-12T21:26:27Z'
language: TypeScript
license: MIT
branch: master
stars: 1560
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:40.650Z'
description: Static page generator for documenting GraphQL Schema
tags:
  - documentation
  - documentation-generator
  - documentation-tool
  - graphql
---

# Static page generator for documenting GraphQL Schema

[![build](https://github.com/2fd/graphdoc/workflows/build/badge.svg?branch=master)](https://github.com/2fd/graphdoc/actions?query=workflow%3Abuild+branch%3Amaster+)
[![coverage](https://coveralls.io/repos/github/2fd/graphdoc/badge.svg?branch=master)](https://coveralls.io/github/2fd/graphdoc?branch=master)
![npm](https://img.shields.io/npm/v/@2fd/graphdoc.svg)
![tag](https://img.shields.io/github/tag/2fd/graphdoc.svg)

- [demos](#demos)
- [install](#install)
- [use](#use)
- [plugin](#plugin)
- [template](#template)
- [contributors](#contributors)

## Demos

- Facebook Test [Star Wars](https://2fd.github.io/graphdoc/star-wars)
- [Github V4 API](https://2fd.github.io/graphdoc/github)
- [Shopify API](https://2fd.github.io/graphdoc/shopify/)
- [Pokemon GraphQL](https://2fd.github.io/graphdoc/pokemon)

## Install

```bash
  npm install -g @2fd/graphdoc
```

## Use

### Generate documentation from live endpoint

```bash
  > graphdoc -e http://localhost:8080/graphql -o ./doc/schema
```

### Generate documentation from IDL file

```bash
  > graphdoc -s ./schema.graphql -o ./doc/schema
```

### Generate documentation from for the ["modularized schema"](http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing) of graphql-tools

```bash
  > graphdoc -s ./schema.js -o ./doc/schema
```

> [`./schema.graphql`](https://github.com/2fd/graphdoc/blob/master/test/starwars.graphql) must be able to be interpreted
> with [graphql-js/utilities#buildSchema](http://graphql.org/graphql-js/utilities/#buildschema)

### Generate documentation from json file

```bash
  > graphdoc -s ./schema.json -o ./doc/schema
```

> `./schema.json` contains the result of [GraphQL introspection
> query](https://github.com/2fd/graphdoc/blob/gh-pages/introspection.graphql)

### Puts the options in your `package.json`

```javascript
  // package.json

  {
    "name": "project",
    "graphdoc": {
      "endpoint": "http://localhost:8080/graphql",
      "output": "./doc/schema",
    }
  }
```

And execute

```bash
  > graphdoc
```

### Help

```bash

  > graphdoc -h
  
    Static page generator for documenting GraphQL Schema v2.4.0

    Usage: node bin/graphdoc.js [OPTIONS] 

    
    [OPTIONS]:
    -c, --config                   Configuration file [./package.json].
    -e, --endpoint                 Graphql http endpoint ["https://domain.com/graphql"].
    -x, --header                   HTTP header for request (use with --endpoint). ["Authorization: Token cb8795e7"].
    -q, --query                    HTTP querystring for request (use with --endpoint) ["token=cb8795e7"].
    -s, --schema, --schema-file    Graphql Schema file ["./schema.json"].
    -p, --plugin                   Use plugins [default=graphdoc/plugins/default].
    -t, --template                 Use template [default=graphdoc/template/slds].
    -o, --output                   Output directory.
    -d, --data                     Inject custom data.
    -b, --base-url                 Base url for templates.
    -f, --force                    Delete outputDirectory if exists.
    -v, --verbose                  Output more information.
    -V, --version                  Show graphdoc version.
    -h, --help                     Print this help


```

## Plugin

In graphdoc a plugin is simply an object that controls the content that is displayed
on every page of your document.

This object should only implement the
[`PluginInterface`](https://github.com/2fd/graphdoc/blob/master/lib/interface.d.ts#L12-L117).

### Make a Plugin

To create your own plugin you should only create it as a `plain object`
or a `constructor` and export it as `default`

If you export your plugin as a constructor, when going to be initialized,
will receive three parameters

- `schema`: The full the result of [GraphQL introspection query](https://github.com/2fd/graphdoc/blob/gh-pages/introspection.graphql)
- `projectPackage`: The content of `package.json` of current project (or the content of file defined with `--config`
flag).
- `graphdocPackage`: The content of `package.json` of graphdoc.

> For performance reasons all plugins receive the reference to the same object
> and therefore should not modify them directly as it could affect the behavior
> of other plugins (unless of course that is your intention)

#### Examples

```typescript
  // es2015 export constructor

  export default class MyPlugin {

    constructor(schema, projectPackage, graphdocPackage) {}

    getAssets() {
      /* ... */
    }
  }
```

```typescript
  // es2015 export plain object

  export default cost myPlugin = {
    getAssets() {
      /* ... */
    },
  }
```

```javascript
  // export constructor

  function MyPlugin(schema, projectPackage, graphdocPackage) {
    /* ... */
  }

  MyPlugin.prototype.getAssets = function() {
    /* ... */
  };

  exports.default = MyPlugin;
```

```javascript
  // export plain object

  exports.default = {
    getAssets: function() {
      /* ... */
    }
  };
```

### Use plugin

You can use the plugins in 2 ways.

#### Use plugins with command line

```bash
  > graphdoc -p graphdoc/plugins/default \
  -p some-dependencies/plugin \
  -p ./lib/plugin/my-own-plugin \
  -s ./schema.json -o ./doc/schema
```

#### Use plugins with `package.json`

```javascript
  // package.json

  {
    "name": "project",
    "graphdoc": {
      "endpoint": "http://localhost:8080/graphql",
      "output": "./doc/schema",
      "plugins": [
        "graphdoc/plugins/default",
        "some-dependencie/plugin",
        "./lib/plugin/my-own-plugin"
      ]
    }
  }
```

### Build-in plugin

> TODO

## Template

> TODO

## Contributors

- [<img src="https://avatars3.githubusercontent.com/in/2141?v=4" width="40"> dependabot-preview[bot]](https://github.com/apps/dependabot-preview)
- [<img src="https://avatars2.githubusercontent.com/u/1301838?v=4" width="40"> bitliner](https://github.com/bitliner)
- [<img src="https://avatars0.githubusercontent.com/u/605742?v=4" width="40"> kbariotis](https://github.com/kbariotis)
- [<img src="https://avatars3.githubusercontent.com/u/26602940?v=4" width="40"> 0xflotus](https://github.com/0xflotus)
- [<img src="https://avatars1.githubusercontent.com/u/1648214?v=4" width="40"> Joatin](https://github.com/Joatin)
- [<img src="https://avatars0.githubusercontent.com/u/226612?v=4" width="40"> shiroyuki](https://github.com/shiroyuki)
- [<img src="https://avatars3.githubusercontent.com/u/35507645?v=4" width="40"> kristiehowboutdat](https://github.com/kristiehowboutdat)
- [<img src="https://avatars0.githubusercontent.com/u/26336?v=4" width="40"> tony](https://github.com/tony)
- [<img src="https://avatars1.githubusercontent.com/u/2903325?v=4" width="40"> dnalborczyk](https://github.com/dnalborczyk)
