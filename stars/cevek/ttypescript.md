---
repo: cevek/ttypescript
url: 'https://github.com/cevek/ttypescript'
homepage: null
starredAt: '2022-10-22T06:01:29Z'
createdAt: '2017-11-29T14:52:43Z'
updatedAt: '2025-02-06T06:21:17Z'
language: TypeScript
license: NA
branch: master
stars: 1536
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:18.631Z'
description: Over TypeScript tool to use custom transformers in the tsconfig.json
tags:
  - custom-transformer
  - transformer-typescript
  - transformers
  - typescript
---

# Deprecation Notice

> **`ttypescript` is deprecated**. It currently works with TS below 5.0, but it will not be updated.
 
For TypeScript 5+, please use [ts-patch](https://github.com/nonara/ts-patch).

---

[![npm version](https://badge.fury.io/js/ttypescript.svg)](https://badge.fury.io/js/ttypescript) [![Build Status](https://travis-ci.org/cevek/ttypescript.svg?branch=master)](https://travis-ci.org/cevek/ttypescript)

# ttypescript

## What it is
Currently TypeScript doesn't support custom transformers in the tsconfig.json, but supports it programmatically.

And there is no way to compile your files using custom transformers using `tsc` command.

TTypescript (Transformer TypeScript) solves this problem by patching on the fly the compile module to use transformers from `tsconfig.json`.

<!---
TTypescript is a drop-in replacement for all typescript modules, located in ``` node_modules/typescript/lib ``` directory:

```ts
import * as ts from 'ttypescript'
import * as tsServer from 'ttypescript/lib/tsserver'
import * as watchGuard from 'ttypescript/lib/watchGuard'
```
--->
Instead of tsc and tsserver, use ttsc and ttsserver wrappers. This wrappers try to use locally installed typescript first.

No version lock-ins - typescript used as peer dependency.

## How to install

```
npm i ttypescript -D
```

ttypescript uses your installed `typescript` in your `node_modules`

## How to use

### tsconfig.json

Set a transformer path to the `tsconfig.json` in `compilerOptions` section `plugin` array:
```
{
    "compilerOptions": {
        "plugins": [
            { "transform": "transformer-module" },
        ]
    }
}
```

plugin entries described in `PluginConfig`:

```ts
export interface PluginConfig {
    /**
     * Path to transformer or transformer module name
     */
    transform?: string;

    /**
     * The optional name of the exported transform plugin in the transform module.
     */
    import?: string;

    /**
     * Plugin entry point format type, default is program
     */
    type?: 'program' | 'config' | 'checker' | 'raw' | 'compilerOptions';

    /**
     * Should transformer applied after all ones
     */
    after?: boolean;

    /**
     * Should transformer applied for d.ts files, supports from TS2.9
     */
    afterDeclarations?: boolean;
    /**
     * any other properties provided to the transformer as config argument
     * */
    [options: string]: any;
}
```

You just need to add the `transform` block with optional `import`, `type`, `after`, `afterDeclarations` and plugin-related options.

`transform` can accept npm module or local file path (.ts or .js) related to `tsconfig.json`

### PluginConfig.type
Because currently transformers can run only programmatically, most of them use factory wrapper with different signatures.
For the possible to work with any of them you can specify `type` in the plugin config.

By default will be used a `program` type.
<!---

Most of transformers exports ``` ts.TransformerFactory<ts.SourceFile> ```. 
But better to export TransformerBasePlugin, described below. In most cases it's a plugin responsibility to when run a transformer.

```ts
export interface TransformerBasePlugin {
    before?: ts.TransformerFactory<ts.SourceFile>;
    after?: ts.TransformerFactory<ts.SourceFile>;
    afterDeclarations?: ts.TransformerFactory<ts.SourceFile>;
}

export type TransformerPlugin = TransformerBasePlugin | ts.TransformerFactory<ts.SourceFile>;
```
--->
#### program 
If the transformer has a factory signature using `program` as first argument: 
```ts
(program: ts.Program, config?: PluginConfig) => ts.TransformerFactory
where 
ts.TransformerFactory = (context: ts.TransformationContext) => (sourceFile: ts.SourceFile) => ts.SourceFile
```
Plugin config entry: `{ "transform": "transformer-module" }`.


#### config
For the signature with transformer's config:
```ts
(config: PluginConfig) => ts.TransformerFactory
```
Plugin config entry: `{ "transform": "transformer-module", type: "config" }`.

#### checker
For the signature with ts.TypeChecker:
```ts
(checker: ts.TypeChecker, config?: PluginConfig) => ts.TransformerFactory
```
Plugin config entry: `{ "transform": "transformer-module", type: "checker" }`.

#### raw
For the signature without factory wrapper:
```ts
ts.TransformerFactory
```
Plugin config entry: `{ "transform": "transformer-module", type: "raw" }`.

#### compilerOptions
```ts
(compilerOpts: ts.CompilerOptions, config?: PluginConfig) => ts.TransformerFactory
```
Plugin config entry: `{ "transform": "transformer-module", type: "compilerOptions" }`.

```json
{
    "compilerOptions": {
        "plugins": [
            { "transform": "transformer-module", "someOption1": 123, "someOption2": 321 },
            { "transform": "./transformers/my-transformer.ts" },
            { "transform": "transformer-module", "after": true },
            { "transform": "transformer-module", "afterDeclarations": true },
            { "transform": "transformer-module", "type": "ls" }
        ]
    },
}
```

### Command line

Like usual `tsc`, all arguments work the same way.
```
ttsc
```

### ts-node

```
ts-node --compiler ttypescript index.ts
or
ts-node -C ttypescript index.ts
```

### Parcel

Just install a parcel plugin
```
npm i parcel-plugin-ttypescript
```


### Webpack
```js
    {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('awesome-typescript-loader'),
        // or
        loader: require.resolve('ts-loader'),
        options: {
            compiler: 'ttypescript'
        }
    }
```

### Rollup
```js
// rollup.config.js
import ttypescript from 'ttypescript'
import tsPlugin from 'rollup-plugin-typescript2'

export default {
    // ...
    plugins: [
        // ...
        tsPlugin({
            typescript: ttypescript
        })
    ]
}
```

### VS Code
If you want to compile your project with VS Code task runner you need to overwrite the config `typescript.tsdk` to path of the installed `ttypescript`: 
```
"typescript.tsdk": "/usr/local/lib/node_modules/ttypescript/lib",
or 
"typescript.tsdk": "node_modules/ttypescript/lib",
```

### Jest, ts-jest
```js
module.exports = {
  // [...]
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  }
};
```
or in `package.json`
```json
{
  "jest": {
    "globals": {
      "ts-jest": {
        "compiler": "ttypescript"
      }
    }
  }
}
```

## Transformers

You can use transformers written in ts or js

```ts
// transformer1-module
import * as ts from 'typescript';
export default function(program: ts.Program, pluginOptions: {}) {
    return (ctx: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            function visitor(node: ts.Node): ts.Node {
                // if (ts.isCallExpression(node)) {
                //     return ts.createLiteral('call');
                // }
                return ts.visitEachChild(node, visitor, ctx);
            }
            return ts.visitEachChild(sourceFile, visitor, ctx);
        };
    };
}

```

Examples of transformers:

[`{ "transform": "ts-nameof", type: "raw"}`](https://github.com/dsherret/ts-nameof) 

[`{ "transform": "ts-optchain/transform" }`](https://github.com/rimeto/ts-optchain) 

[`{ "transform": "ts-transform-asset" }`](https://github.com/slune-org/ts-transform-asset) 

[`{ "transform": "ts-transform-auto-require" }`](https://github.com/slune-org/ts-transform-auto-require) 

[`{ "transform": "ts-transform-css-modules/dist/transform", type: "config" }`](https://github.com/longlho/ts-transform-css-modules) 

[`{ "transform": "ts-transform-graphql-tag/dist/transformer" }`](https://github.com/firede/ts-transform-graphql-tag) 

[`{ "transform": "ts-transform-img/dist/transform", type: "config" }`](https://github.com/longlho/ts-transform-img) 

[`{ "transform": "ts-transform-react-intl/dist/transform", import: "transform", type: "config" }`](https://github.com/longlho/ts-transform-react-intl) 

[`{ "transform": "ts-transformer-enumerate/transformer" }`](https://github.com/kimamula/ts-transformer-enumerate)

[`{ "transform": "ts-transformer-keys/transformer" }`](https://github.com/kimamula/ts-transformer-keys) 

[`{ "transform": "ts-transformer-minify-privates" }`](https://github.com/timocov/ts-transformer-minify-privates) 

[`{ "transform": "typescript-is/lib/transform-inline/transformer" }`](https://github.com/woutervh-/typescript-is) 

[`{ "transform": "typescript-plugin-styled-components", type: "config" }`](https://github.com/Igorbek/typescript-plugin-styled-components#ttypescript-compiler)

[`{ "transform": "typescript-transform-jsx" }`](https://github.com/LeDDGroup/typescript-transform-jsx) 

[`{ "transform": "typescript-transform-macros" }`](https://github.com/LeDDGroup/typescript-transform-macros) 

[`{ "transform": "typescript-transform-paths" }`](https://github.com/LeDDGroup/typescript-transform-paths) 

[`{ "transform": "@zerollup/ts-transform-paths" }`](https://github.com/zerkalica/zerollup/tree/master/packages/ts-transform-paths)

[`{ "transform": "@zoltu/typescript-transformer-append-js-extension" }`](https://github.com/Zoltu/typescript-transformer-append-js-extension)

[`{ "transform": "@magic-works/ttypescript-browser-like-import-transformer" }`](https://github.com/Jack-Works/ttypescript-browser-like-import-transformer)

[`{ "transform": "typescript-transform-react-jsx-source" }`](https://github.com/alexgorbatchev/typescript-transform-react-jsx-source)

[`{ "transform": "ts-transformer-remove-named-export" }`](https://github.com/dominguezcelada/ts-transformer-remove-named-export)

[`{ "transform": "ts-transformer-export-default-name" }`](https://github.com/jirutka/ts-transformer-export-default-name)

[`{ "transform": "ts-transformer-inline-file/transformer" }`](https://github.com/jirutka/ts-transformer-inline-file)

[`{ "transform": "ts-transformer-strip-const-enums", "entrySourceFiles": ["./src/index.ts" }`](https://github.com/timocov/ts-transformer-strip-const-enums)

[`{ "transform": "ts-transformer-properties-rename", "entrySourceFiles": ["./src/index.ts"] }`](https://github.com/timocov/ts-transformer-properties-rename)

[`{ "transform": "tsc-progress", "name": "TSC", "color": "green" }`](https://github.com/JiangWeixian/tsc-progress)

[Tutorial how to write a typescript transformer](https://dev.doctorevidence.com/how-to-write-a-typescript-transform-plugin-fc5308fdd943)

- [Tutorial how to write a typescript transformer](https://dev.doctorevidence.com/how-to-write-a-typescript-transform-plugin-fc5308fdd943)
- [Transformer framework](https://github.com/slune-org/simple-ts-transform)
- [Unit testing transformer compiler](https://github.com/slune-org/ts-transform-test-compiler)

## Example
An example project is in the [example](./packages/ttypescript-examples) directory

## License
MIT License
