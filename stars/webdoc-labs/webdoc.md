---
repo: webdoc-labs/webdoc
url: 'https://github.com/webdoc-labs/webdoc'
homepage: 'https://www.webdoclabs.com'
starredAt: '2022-10-24T17:20:00Z'
createdAt: '2020-04-19T01:49:01Z'
updatedAt: '2025-01-03T12:31:41Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 79
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:17.392Z'
description: Documentation generator for the web
tags:
  - documentation-generator
  - jsdoc-comments
  - nodejs
  - webdoc
---

© 2020-2022 webdoc Labs

<p align="center">
  <img src="https://i.ibb.co/ZHP9PD8/Logo-Frame-5.png" alt="Logo-Frame" border="0" width="256">
</p>

<p align="center">
  <a href="https://www.codetriage.com/webdoc-labs/webdoc"><img src="https://www.codetriage.com/webdoc-js/webdoc/badges/users.svg" /></a>
</p>

<table align="center">
  <tr>
  <th align="center">webdoc</th>
  <th align="center">Example documentation</th>
  </tr>
  <tbody align="center">
    <tr>
      <td>
        <a href="https://dev.azure.com/webdoc-labs/webdoc/_build/latest?definitionId=2&branchName=master">
          <img src="https://dev.azure.com/webdoc-labs/webdoc/_apis/build/status/Build%2C%20unit-test%2C%20type-check?repoName=webdoc-labs%2Fwebdoc&branchName=master"></img>
        </a>
      </td>
      <td>
        <a href="https://dev.azure.com/webdoc-labs/webdoc/_build/latest?definitionId=3&branchName=master">
          <img src="https://dev.azure.com/webdoc-labs/webdoc/_apis/build/status/webdoc-example%20documentation%20generator?repoName=webdoc-labs%2Fwebdoc&branchName=master"></img>
        </a>
      </td>
    </tr>
  </tbody>
</table>

webdoc is the next generation documentation generator for the family of web languages. It supports the JSDoc notation
and infers type data from TypeScript definitions.

You can checkout the documentation for `example/` [here](https://webdoc-labs.github.io/example-documentation/index.html)!

## Usage :newspaper_roll:

```shell
npm install --save-dev @webdoc/cli
```

To get started, create a `webdoc.conf.json` file in your project directory.

```json
{
  "source": {
    "include": "src/",
    "excludePattern": "(node_modules|lib|test)"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "opts": {
    "destination": "docs"
  },
  "template": {
    "repository": "<your_github_url>",
    "outputSourceFiles": false
  }
}
```

The only required field is `source.include` which tells webdoc where the source files are. [@webdoc/cli](packages/webdoc-cli)'s README details more configuration options

You can now run `webdoc` in your terminal and documentation will be generated. Be sure to serve the documentation from the folder it is generated in. If you need to serve from an ancestor directory, provide the documentation path relative to the root using the `--site-root` option, e.g. `webdoc --site-root docs`.

## Features :tada:

* Support for JavaScript, Flow, and TypeScript. The modular structure of @webdoc/parser allows you to integrate it with other languages as well.

* High-performance document tree that enforces proper relationships between symbols.

* Importing external APIs to integrate your documentation

Coming soon:

* Documentation coverage analysis

* Powerful default template that:
  * integrates with JSFiddle & CodePen for live examples of your API
  * provides a neat and clean navigation for users
  * makes it easy to write tutorials
