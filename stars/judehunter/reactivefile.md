---
repo: judehunter/reactivefile
url: 'https://github.com/judehunter/reactivefile'
homepage: ''
starredAt: '2022-12-11T22:49:15Z'
createdAt: '2020-07-23T04:04:53Z'
updatedAt: '2024-09-25T19:20:37Z'
language: TypeScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:03.970Z'
description: >-
  Parse and reactively auto-save JSON, TOML, YAML and any other data file with
  ease.
tags:
  - data
  - data-structures
  - file
  - filesystem
  - javascript
  - reactive
  - reactive-programming
  - typescript
  - typescript-definitions
---

<h1 align="center">
    <img alt="reactivefile logo" src="https://i.imgur.com/80tlZOU.png" width="150px"/>
	<br>
    ReactiveFile<br>
    <a href="https://www.npmjs.com/package/reactivefile"><img alt="npm-badge" src="https://img.shields.io/npm/v/reactivefile.svg?colorB=32CD32" height="20"></a>
    <a href="https://bundlephobia.com/result?p=reactivefile"><img src='https://img.shields.io/bundlephobia/minzip/reactivefile.svg'/></a>
    <a href="https://github.com/judehunter/reactivefile/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license-badge" height="20"></a>
</h1>
<h4 align="center">
    A lightweight library for creating a reactive ⚡️ binding between a JS object and a file.<br>
    <br>
</h4>

## Description
ReactiveFile is a library which handles parsing a data file and then auto-saving it reactively whenever you change the object.

Most popular filetypes (`JSON`, `TOML`, `YAML`, `XML`) are handled automatically. The API provides a set of tools that let you easily implement parsers and serializers for other languages.

The reactivity of a ReactiveFile object is deep by default.

Currently only supports `Node.js` (browser implementation is on the way)

----
A simple example of a `JSON` file with a counter:
```jsonc
// data.json
{"counter": 0}
```
You can create a reactive binding with a few lines of code:
```ts
import * as ReactiveFile from 'reactivefile'

const data = await ReactiveFile.load('data.json')
data.$.counter++
```
The counter in `data.json` now has a value of 1.

## Setup
Just run:
```bash
yarn add reactivefile
```
or:
```bash
npm install reactivefile
```

## Usage
### Import the package
```ts
import * as ReactiveFile from 'reactivefile'
// or
const ReactiveFile = require('reactivefile')
```
### Create a reactive binding
```ts
const data = await ReactiveFile.load('data.json', options)
// use .loadSync(...) for synchronous loading instead
```
You can also create a `ReactiveFile` from an existing object and set a destination file
```ts
const data = ReactiveFile.from(response, {saveTo: 'destination.toml'})
```
### Alter your data
```ts
data.$.lastAccess = new Date()
// data.$ is an alias for data.val
```
Adding new keys to your objects requires you to refresh your object's reactivity
```ts
data.$.newKey = 100
data.react()
data.$.newKey = 200
```
### Create parsing and serializing functions for any data type and file extension
The implementation of the built-in `toml` type:
```ts
ReactiveFile.registerType('toml', str => toml.parse(str), obj => toml.stringify(obj))
```
You can also copy these functions from one type to another
```ts
ReactiveFile.assignType('yaml', 'yml')
// creates a yaml type with the same parser and serializer as yml
```
These types are also the file extensions — files with the `json` extension will be automatically handled by the `json` parser. You can override this behaviour by specifying the data type.
```ts
const data = await ReactiveFile.load('data.json', {type: 'toml'})
// reads toml from the data.json file (and saves in toml as well)
```
----
### Options
#### encoding
The encoding of the file. One of: `'ascii', 'base64', 'binary', 'hex', 'latin1', 'ucs-2', 'ucs2', 'utf-8', 'utf16le', 'utf8'`.
#### type
The type/language of the file. Defaults to the file's extension.
#### saveTo
The destination file path. If set, saves your data to another file instead. Otherwise overwrites the original file.
#### reactive
Turns on/off the reactive binding. The object can be then saved with `.save()` or `.saveSync()` instead. Defaults to `true`.
#### deep
Turns on/off deep reactivity. Defaults to `true`.
#### asyncSave
Turns on/off asynchronous saving (instead of synchronous). Defaults to `true`.

----
### License
MIT
