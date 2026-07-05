---
repo: artdecocode/rexml
url: 'https://github.com/artdecocode/rexml'
homepage: null
starredAt: '2021-11-14T00:30:22Z'
createdAt: '2018-07-18T20:42:49Z'
updatedAt: '2021-11-14T00:30:22Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.707Z'
description: Simple XML parsing with a regular expression.
tags: []
---

# rexml

[![npm version](https://badge.fury.io/js/rexml.svg)](https://npmjs.org/package/rexml)

`rexml` is a Node.JS package for simple XML parsing with a regular expression. It's been tested to work for simple use cases (does work on nested tags).

```sh
yarn add rexml
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`extractTags(tag, string): Return`](#extracttagstag-stringarraystringstring-string-return)
    * [`Return`](#type-return)
    * [Extracting Multiple Tags](#extracting-multiple-tags)
  * [`extractProps(string: string, parseValue?: boolean): Object<string,(boolean|string|number)>`](#extractpropsstring-stringparsevalue-boolean-objectstringbooleanstringnumber)
  * [`extractTagsSpec(tag: string, string: string): {content, props}[]`](#extracttagsspectag-stringstring-string-content-props)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default and named functions:

```js
import rexml, { extractProps, extractTagsSpec, extractPropSpec } from 'rexml'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true" width="25">
</a></p>

### <code><ins>extractTags</ins>(</code><sub><br/>&nbsp;&nbsp;`tag: string|!Array<string>,`<br/>&nbsp;&nbsp;`string: string,`<br/></sub><code>): <i>Return</i></code>
Extract member elements from an XML string. Numbers and booleans will be parsed into their JS types.

 - <kbd><strong>tag*</strong></kbd> <em><code>(string \| !Array&lt;string&gt;)</code></em>: Which tag to extract, e.g., `div`. Can also pass an array of tags, in which case the name of the tag will also be returned.
 - <kbd><strong>string*</strong></kbd> <em>`string`</em>: The XML string.

The tags are returned as an array with objects containing `content` and `props` properties. The content is the inner content of the tag, and `props` is the attributes specified inside the tag.

<table>
<tr><th><a href="example/index.js">Source</a></th><th>Output</th></tr>
<tr><td>

```js
import extractTags from 'rexml'

const xml = `
<html>
  <div id="d1"
    class="example"
    contenteditable />
  <div id="d2" class="example">Hello World</div>
</html>
`

const res = extractTags('div', xml)
```
</td>
<td>

```js
[ { content: '',
    props: 
     { id: 'd1',
       class: 'example',
       contenteditable: true },
    tag: 'div' },
  { content: 'Hello World',
    props: { id: 'd2', class: 'example' },
    tag: 'div' } ]
```
</td></tr>
</table>

__<a name="type-return">`Return`</a>__: The return type.


|     Name     |            Type             |                      Description                       |
| ------------ | --------------------------- | ------------------------------------------------------ |
| __content*__ | <em>string</em>             | The content of the tag, including possible whitespace. |
| __props*__   | <em>!Object<string, ?></em> | The properties of the element.                         |
| __tag*__     | <em>string</em>             | The name of the extracted element.                     |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true" width="15">
</a></p>

#### Extracting Multiple Tags

It's possible to give an array of tags which should be extracted from the _XML_ string.

<table>
<tr><th><a href="example/array.js">Source</a></th><th>Output</th></tr>
<tr><td>

```js
import extractTags from 'rexml'

const xml = `<html>
  <div id="d1"/>
  <div id="d2" class="example">Hello World</div>
  <footer>Art Deco, 2019</footer>
</html>
`

const res = extractTags(['div', 'footer'], xml)
```
</td>
<td>

```js
[ { content: '',
    props: { id: 'd1' },
    tag: 'div' },
  { content: 'Hello World',
    props: { id: 'd2', class: 'example' },
    tag: 'div' },
  { content: 'Art Deco, 2019',
    props: {},
    tag: 'footer' } ]
```
</td></tr>
</table>


<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true" width="25">
</a></p>

### <code><ins>extractProps</ins>(</code><sub><br/>&nbsp;&nbsp;`string: string,`<br/>&nbsp;&nbsp;`parseValue?: boolean,`<br/></sub><code>): <i>Object<string,(boolean|string|number)></i></code>

Extracts the properties from the attributes part of the tag and returns them as an object. It will parse values if not specified otherwise.

<table>
<tr><th><a href="example/extract-props.js">Source</a></th><th>Output</th></tr>
<tr><td>

```js
import { extractProps, extractPropsSpec } from 'rexml'

const s = `id="d2"
class="example"
value="123"
parsable="true"
ignore="false"
2-non-spec
required`

const res = extractProps(s)
console.log(JSON.stringify(res, null, 2))

// don't parse booleans and integers
const res2 = extractProps(s, false)
console.log(JSON.stringify(res2, null, 2))

// conform to the spec
const res3 = extractPropsSpec(s)
console.log(JSON.stringify(res3, null, 2))
```
</td>
<td>

```json
{
  "id": "d2",
  "class": "example",
  "value": 123,
  "parsable": true,
  "ignore": false,
  "2-non-spec": true,
  "required": true
}
{
  "id": "d2",
  "class": "example",
  "value": "123",
  "parsable": "true",
  "ignore": "false",
  "2-non-spec": true,
  "required": true
}
{
  "id": "d2",
  "class": "example",
  "value": 123,
  "parsable": true,
  "ignore": false,
  "required": true
}
```
</td></tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/5.svg?sanitize=true" width="25">
</a></p>

### <code><ins>extractTagsSpec</ins>(</code><sub><br/>&nbsp;&nbsp;`tag: string,`<br/>&nbsp;&nbsp;`string: string,`<br/></sub><code>): <i>{content, props}[]</i></code>

Same as the default method, but confirms to the XML specification in defining attributes.

```javascript
import { extractTagsSpec } from 'rexml'

const xml = `
<html>
  <div id="d1" class="example" contenteditable />
  <div 5-non-spec>Attributes cannot start with a number.</div>
</html>`

const res = extractTagsSpec('div', xml)

console.log(JSON.stringify(res, null, 2))
```
```json
[
  {
    "props": {
      "id": "d1",
      "class": "example",
      "contenteditable": true
    },
    "content": ""
  }
]
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/6.svg?sanitize=true">
</a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>
