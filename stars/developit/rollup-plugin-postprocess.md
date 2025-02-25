---
repo: developit/rollup-plugin-postprocess
url: 'https://github.com/developit/rollup-plugin-postprocess'
homepage: 'https://npm.im/rollup-plugin-postprocess'
starredAt: '2018-01-14T19:15:40Z'
createdAt: '2018-01-14T16:14:16Z'
updatedAt: '2020-12-18T15:17:50Z'
language: JavaScript
license: NA
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:30.430Z'
description: "\U0001F39E Find & replace postprocessing for Rollup output"
tags: []
---

# rollup-plugin-postprocess [![npm](https://img.shields.io/npm/v/rollup-plugin-postprocess.svg?style=flat)](https://www.npmjs.org/package/rollup-plugin-postprocess) [![travis](https://travis-ci.org/developit/rollup-plugin-postprocess.svg?branch=master)](https://travis-ci.org/developit/rollup-plugin-postprocess)

Apply regex find-and-replace postprocessing to your Rollup bundle.


## Installation

`npm i -D rollup-plugin-postprocess`


## Usage

Works just like a [JavaScript String replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), including the funtion callback option.

`postprocess()` expects an Array of `[(RexExp) find, (String|Function) replace]` pairs. Alternatively, if a function is provided, it will be invoked for each bundle and can return said pairs.


## Example

```js
import postprocess from 'rollup-plugin-postprocess';

export default {
    plugins: [
        postprocess([
            [/\b(module\.exports=|export default )([a-zA-Z])/, '$1$2']
        ])
    ]
}
```


## Complex Example

This example is more practical. Rollup places exports at the end of your bundle, which can often create single-use variables that Uglify does not collapse.  Let's implement a find & replace that "moves" the export inline to save some bytes.

In this example, we'll make use of the fact that find/replacement pairs are executed in sequence. The first pair is used both to remove the existing export statement _and_ to find the export type & identifier. By the time the second find/replace pair is processed, it can make use of the values found in the first pass.

```js
import postprocess from 'rollup-plugin-postprocess';

let name, exportPrefix;
export default {
    plugins: [
        postprocess([
            [
                /(module\.exports\s*=\s*|export\s*default\s*)([a-zA-Z$_][a-zA-Z0-9$_]*)[;,]?/,
                (str, prefix, id) => {
                    name = id;
                    exportPrefix = prefix;
                    // returning nothing is the same as an empty string
                }
            ],
            [
                /^function\s([a-zA-Z$_][a-zA-Z0-9$_]*)/,
                (str, id) => id==name ? `${exportPrefix} function` : str
            ]
        ])
    ]
};
```


## License

[MIT](https://oss.ninja/mit/developit)
