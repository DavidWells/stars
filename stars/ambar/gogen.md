---
repo: ambar/gogen
url: 'https://github.com/ambar/gogen'
homepage: ''
starredAt: '2021-10-21T19:10:02Z'
createdAt: '2018-12-09T05:59:56Z'
updatedAt: '2022-11-10T08:22:35Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:42.171Z'
description: "Use stream API to scaffold projects or files \U0001F609"
tags:
  - generator
  - gogen
  - initializer
  - sao
  - scaffolding
  - yeoman
---

# gogen

Use stream API to scaffold projects or files.

[![Coverage Status](https://coveralls.io/repos/github/ambar/gogen/badge.svg?branch=main)](https://coveralls.io/github/ambar/gogen?branch=main)
[![npm version](https://badgen.net/npm/v/gogen)](https://www.npmjs.com/package/gogen)
![](https://badgen.net/npm/types/gogen)
[![install size](https://badgen.net/packagephobia/install/gogen)](https://packagephobia.now.sh/result?p=gogen)
[![minzipped size](https://badgen.net/bundlephobia/minzip/gogen?scale=1&cache=36000)](https://bundlephobia.com/result?p=gogen)

## Features

- Simple, easy to use
- Lightweight, single file bundled (<40K gzip size), no need to install globally, just run `npx`
- Automatically rename `gitignore` to `.gitignore`, due to [npm/issues/1862](https://github.com/npm/npm/issues/1862)
- Automatically set `name` field in `package.json`
- Automatically parse command line arguments with [mri](https://www.npmjs.com/package/mri)
- Add command line prompts with [prompts](https://github.com/terkelg/prompts#-usage)
- Render `*.t.foo` (or `*.foo.t`) to `*.foo` with lodash template
- Provide fast, in-memory testing API

## Usage

### Run existing generator

Run from any npm package (registry/GitHub/git/folder...), same as [npm install](https://docs.npmjs.com/cli/install#synopsis) or [yarn add](https://yarnpkg.com/lang/en/docs/cli/add/):

```bash
# install generator to directory
npx gogen <generator> <directory>
# eg.
npx gogen [<@scope>/]<name> <directory> # npm registry
npx gogen <user>/<repo> <directory>  # GitHub
npx gogen <host>:<name>/<repo> <directory>  # git
npx gogen <folder> <directory> # folder
```

### Examples

- Scaffold project
  - [examples/basic](./examples/basic/.gogenrc.js)
  - [examples/with-ejs](./examples/with-ejs/.gogenrc.js)
  - [examples/with-prompts](./examples/with-prompts/.gogenrc.js)
  - [gogen-pkg](./gogen-pkg/.gogenrc.js)
- npm initializer or starter kits
  - [create-gogen](./create-gogen)
  - [new-mina](https://github.com/ambar/new-mina/blob/main/packages/new-mina/.gogenrc.js) CRA-like initializer in 12 lines.

### Create generator

The default directory structure, used in [examples](./examples):

```bash
.
├── .gogenrc.js # optional, defaults to `lib/.gogenrc.default.js`
├── package.json
└── template
    ├── index.js
    └── package.json
```

Edit the `.gogenrc.js` file:

```js
/**
 * @type {import('gogen').Generator}
 */
module.exports = async ({src, dest, pipeline, install, gitInit}) => {
  await pipeline(src('template/**'), dest())
  await install()
  await gitInit()
}
```

Run the generator:

```bash
npx gogen <your-generator> <your-project>
```

### Create npm initializer

Add a bin file, eg. [examples/create-gogen/cli.js](./examples/create-gogen/cli.js).

```js
const {run} = require('gogen')
run(
  [__dirname, ...process.argv.slice(2)],
  'Usage: npm init gogen <my-generator>'
)
```

Run the initializer:

```bash
npm init <your-initializer> <your-project>
# or: yarn create <your-initializer> <your-project>
```

### Configuration file

`.gogenrc.js`:

- `run(api: Object, context: Object) => void`
  - `api` core stream and helper APIs
    - `src(glob: string | string[], options: fg.Options) => Stream` read files, support [fast-glob](https://github.com/mrmlnc/fast-glob#options-3) options
    - `dest(path?: string) => Stream` write files
    - `pipeline(...streams: Stream[]) => Promise` pipe a series of streams
    - `template(data: Object, {ext: RegExp, test: RegExp, render: Function}) => Stream` render `*.t` or `*.t.foo` files with [lodash template](https://lodash.com/docs/4.17.11#template)
    - `packages(content: Object | Function) => Stream` change `package.json`
    - `modify(match: RegExp | Function, transform: file => file) => Stream` change files
      - `modify.text(match: RegExp | Function, transform: (file, text: string) => text) => Stream` change text files
      - `modify.json(match: RegExp | Function, transform: (file, json: Object) => json) => Stream` change json files
      - `modify.rename(match: RegExp | Function, transform: (file, paths: Object) => paths) => Stream` rename files
    - `install(deps: string[], {dev: boolean, silent: boolean}) => Promise` install dependencies
    - `gitInit(message: string) => Promise` init git repository
    - `prompts(Array | Object) => Promise` see [prompts](https://github.com/terkelg/prompts#-usage)
  - `context` generator context
    - `path: string` new project's path (it's also a setter)
    - `name: string` new project's name (it's also a setter)
    - `argv: Object` command line arguments, parsed by [mri](https://www.npmjs.com/package/mri)

## Testing

Use the `mock` API:

- `mock(generator: string, directory: string, options: Object)`:
  - `generator` path to generator
  - `directory` path to output
  - `options`
    - `answers: Object` inject prompt values

```js
const {mock} = require('gogen')

it('generate correctly', async () => {
  const {files, readFile} = await mock('.', 'dist', {
    answers: {description: 'superb'},
  })
  expect(files).toMatchSnapshot()
  expect(readFile('package.json')).toMatch(/superb/)
})
```

## Comparison with alternatives

| Library                                 | Package Phobia                                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [gogen](https://github.com/ambar/gogen) | [![install size](https://badgen.net/packagephobia/install/gogen)](https://packagephobia.now.sh/result?p=gogen) |
| [sao](https://github.com/saojs/sao)     | [![install size](https://badgen.net/packagephobia/install/sao)](https://packagephobia.now.sh/result?p=sao)     |
| [yeoman](https://github.com/yeoman/yo)  | [![install size](https://badgen.net/packagephobia/install/yo)](https://packagephobia.now.sh/result?p=yo)       |
