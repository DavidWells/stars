---
repo: tuananh/camaro
url: 'https://github.com/tuananh/camaro'
homepage: null
starredAt: '2021-03-23T22:06:03Z'
createdAt: '2017-06-01T09:19:01Z'
updatedAt: '2025-02-21T17:34:21Z'
language: JavaScript
license: MIT
branch: develop
stars: 557
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:57.108Z'
description: >-
  camaro is an utility to transform XML to JSON, using Node.js binding to native
  XML parser pugixml, one of the fastest XML parser around.
tags:
  - camaro
  - emscripten
  - json
  - pugixml
  - transform
  - wasm
  - webassembly
  - xml
  - xml-parser
  - xml2json
  - xpath
---

# camaro

> camaro is a utility to transform XML to JSON, using Node.js bindings to a native XML parser [pugixml](http://pugixml.org/) - one of the fastest XML parsers around.

[![npm](https://raster.shields.io/npm/v/camaro)](https://npm.im/camaro)
![Build status](https://github.com/tuananh/camaro/workflows/CI/badge.svg)
[![npm](https://raster.shields.io/npm/dt/camaro)](https://npm.im/camaro)
[![license](https://raster.shields.io/npm/l/camaro)](https://npm.im/camaro)

## 🤘 Features

* Transform XML to JSON.
    * Only take properties that you're interested in.
    * Output is ready to use JS object.
    * For those that need a complete document parser, checkout my other project [@tuananh/sax-parser](https://github.com/tuananh/sax-parser) - a pretty fast native module, XML-compliant SAX parser for Node.js.

* Written in C++ and compiled down to WebAssembly, so no re-compilation needed.
    * No need to build a binary whenever a new Node version is released.
    * Works on all major platforms (OS X, Linux and Windows). See Travis CI and AppVeyor build status for details.
    * AWS Lambda friendly (or serverless in general).

* It's pretty fast on large XML strings.
    * We're using [pugixml](http://pugixml.org/) under the hood. It's one of the fastest XML parsers around.
    * Scales well with multi-core processors by use of a `worker_threads` pool (Node >= 12).

* Pretty print XML.

## 🔥 Benchmark

300 KB XML file                      |  100 KB XML file
:-----------------------------------:|:-------------------------:
![](benchmark/fixtures/300kb.png)    |  ![](benchmark/fixtures/100kb.png)

60 KB XML file                       |  7 KB XML file
:-----------------------------------:|:-------------------------:
![](benchmark/fixtures/60kb.png)     |  ![](benchmark/fixtures/7kb.png)

The XML file is an actual XML response from the Expedia API. I just deleted some nodes to change its size for benchmarking.

For complete benchmark, see [benchmark/README.md](benchmark/README.md).

* Please note that **this is an unfair game for camaro** because it only transforms the fields specified in the template.
The whole reason for me creating this is because most of the time, I'm just interested in some of the data in the whole XML mess.
* I may expose another method to transform the whole XML tree so that the benchmark will better reflect the real performance.
* 🚧 Performance on small XML strings will probably be worse than pure JavaScript implementations. If your use cases consists of small XML strings only, you probably don't need this.
* Some other libraries that I used to use for benchmarks, like `rapidx2j` and `xml2json`, no longer work on Node 14, so I removed them from the benchmark.

![intro](intro.png)

## Installation

```sh
yarn add camaro
# npm install camaro
```

## Usage

You can use our custom template format powered by [XPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

We also introduce some custom syntax such as:

* if a path starts with `#`, that means it's a constant. E.g, `#1234` will return `1234`
* if a path is empty, return blank
* Some string manipulation functions which are not availble in XPath 1.0, such as `lower-case`, `upper-case`, `title-case`, `camel-case`, `snake-case`, `string-join` or `raw`. Eventually, I'm hoping to add all XPath 2.0 functions but these are all that I need for now. PRs are welcome.

The rest are pretty much vanilla XPath 1.0.

For complete API documentation, please see [API.md](API.md)

Additional examples can be found in the examples folder at https://github.com/tuananh/camaro/tree/develop/examples or this comprehensive [blog post](https://mdleom.com/blog/2020/01/20/how-to-use-camaro-xml/) by Ming Di Leom.

```js
const { transform, prettyPrint } = require('camaro')

const xml = `
    <players>
        <player jerseyNumber="10">
            <name>wayne rooney</name>
            <isRetired>false</isRetired>
            <yearOfBirth>1985</yearOfBirth>
        </player>
        <player jerseyNumber="7">
            <name>cristiano ronaldo</name>
            <isRetired>false</isRetired>
            <yearOfBirth>1985</yearOfBirth>
        </player>
        <player jerseyNumber="7">
            <name>eric cantona</name>
            <isRetired>true</isRetired>
            <yearOfBirth>1966</yearOfBirth>
        </player>
    </players>
`

/**
 * the template can be an object or an array depends on what output you want the XML to be transformed to.
 * 
 * ['players/player', {name, ...}] means that: Get all the nodes with this XPath expression `players/player`.
 *      - the first param is the XPath path to get all the XML nodes.
 *      - the second param is a string or an object that describe the shape of the array element and how to get it.
 * 
 * For each of those XML node
 *      - call the XPath function `title-case` on field `name` and assign it to `name` field of the output.
 *      - get the attribute `jerseyNumber` from XML node player
 *      - get the `yearOfBirth` attribute from `yearOfBirth` and cast it to number.
 *      - cast `isRetired` to true if its string value equals to "true", and false otherwise.
 */

const template = ['players/player', {
    name: 'title-case(name)',
    jerseyNumber: '@jerseyNumber',
    yearOfBirth: 'number(yearOfBirth)',
    isRetired: 'boolean(isRetired = "true")'
}]

;(async function () {
    const result = await transform(xml, template)
    console.log(result)

    const prettyStr = await prettyPrint(xml, { indentSize: 4})
    console.log(prettyStr)
})()
```

Output of `transform()`

```
[
    {
        name: 'Wayne Rooney',
        jerseyNumber: 10,
        yearOfBirth: 1985,
        isRetired: false,
    },
    {
        name: 'Cristiano Ronaldo',
        jerseyNumber: 7,
        yearOfBirth: 1985,
        isRetired: false,
    },
    {
        name: 'Eric Cantona',
        jerseyNumber: 7,
        yearOfBirth: 1966,
        isRetired: true,
    }
]
```

And output of `prettyPrint()`

```
<players>
    <player jerseyNumber="10">
        <name>Wayne Rooney</name>
        <isRetired>false</isRetired>
        <yearOfBirth>1985</yearOfBirth>
    </player>
    <player jerseyNumber="7">
        <name>Cristiano Ronaldo</name>
        <isRetired>false</isRetired>
        <yearOfBirth>1985</yearOfBirth>
    </player>
    <player jerseyNumber="7">
        <name>Eric Cantona</name>
        <isRetired>true</isRetired>
        <yearOfBirth>1966</yearOfBirth>
    </player>
</players>
```

## Similar projects

- [cruftless](https://github.com/wspringer/cruftless): I personally find this project very fascinating. Its template engine is more powerful than camaro's XPath-based perhaps. You should check it out.

## Used by

- https://github.com/dsifford/academic-bloggers-toolkit
- https://github.com/hexojs/hexo-generator-sitemap
- https://github.com/hexojs/hexo-generator-feed
- https://github.com/hexojs/hexo-migrator-wordpress
- https://github.com/fengkx/NodeRSSBot

...

## Stargazers over time

[![Stargazers over time](https://starchart.cc/tuananh/camaro.svg)](https://starchart.cc/tuananh/camaro)

## Licence

[The MIT License](LICENSE)
