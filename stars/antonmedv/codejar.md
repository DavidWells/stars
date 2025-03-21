---
repo: antonmedv/codejar
url: 'https://github.com/antonmedv/codejar'
homepage: 'https://medv.io/codejar/'
starredAt: '2021-11-22T05:00:27Z'
createdAt: '2020-03-31T13:01:35Z'
updatedAt: '2025-02-24T12:49:53Z'
language: TypeScript
license: MIT
branch: master
stars: 1836
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:35.789Z'
description: "An embeddable code editor for the browser \U0001F36F"
tags:
  - code-editor
---

<p align="center"><a href="https://medv.io/codejar/"><img src="https://medv.io/assets/codejar.svg" width="72"></a></p>
<h3 align="center">CodeJar – an embeddable code editor for the browser</h3>
<p align="center"><a href="https://medv.io/codejar/"><img src="https://medv.io/assets/codejar/screenshot.png" width="709"></a></p>

[![npm](https://img.shields.io/npm/v/codejar?color=brightgreen)](https://www.npmjs.com/package/codejar)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/codejar?label=size)](https://bundlephobia.com/result?p=codejar)

## Features

* Lightweight (**2.45 kB** only)
* No dependencies
* Preserves indentation on a new line
* Adds closing brackets, quotes
* Indents line with the **Tab** key
* Supports **undo**/**redo** 

## Getting Started

Install CodeJar 🍯 &nbsp; via npm:

```bash
npm i codejar
```

Create an element and init the CodeJar 🍯:

```html
<div class="editor"></div>
<script>
  let jar = CodeJar(document.querySelector('.editor'), highlight)
</script>
```

Second argument to `CodeJar` is a highlighting function (like Prism.js, highlight.js):

```ts
const highlight = (editor: HTMLElement) => {
  const code = editor.textContent
  code = code.replace('foo', '<span style="color: red">foo</span>')
  editor.innerHTML = code
}

const jar = CodeJar(editor, highlight)
```

Third argument to `CodeJar` is options:
  - `tab: string` replaces "tabs" with given string. Default: `\t`.
    - Note: use css rule `tab-size` to customize size.
  - `indentOn: RegExp` allows auto indent rule to be customized. Default `/[({\[]$/`.
  - `moveToNewLine: RegExp` checks in extra newline character need to be added. Default `/^[)}\]]/`.
  - `spellcheck: boolean` enables spellchecking on the editor. Default `false`.
  - `catchTab: boolean` catches Tab keypress events and replaces it with `tab` string. Default: `true`.
  - `preserveIdent: boolean` keeps indent levels on new line. Default `true`.
  - `addClosing: boolean` automatically adds closing brackets, quotes. Default `true`.
  - `history` records history. Default `true`.
  - `window` window object. Default: `window`.
  - `autoclose` object
    - `open string` characters that triggers the autoclose function 
    - `close string` characters that correspond to the opening ones and close the object.


```js
const options = {
  tab: ' '.repeat(4), // default is '\t'
  indentOn: /[(\[]$/, // default is /{$/
  autoclose: { 
    open: `([{*`, // default is `([{'"`
    close: `)]}*` // default is `)]}'"`
  }
}

const jar = CodeJar(editor, highlight, options)
```

## API

#### `updateCode(string)`

Updates the code.

```js
jar.updateCode(`let foo = bar`)
```

#### `updateOptions(Partial<Options>)`

Updates the options.

```js
jar.updateOptions({tab: '\t'})
```


#### `onUpdate((code: string) => void)`

Calls callback on code updates.

```js
jar.onUpdate(code => {
  console.log(code)
})
```

#### `toString(): string`

Return current code.

```js
let code = jar.toString()
```

#### `save(): string`

Saves current cursor position.

```js
let pos = jar.save()
```

#### `restore(pos: Position)`

Restore cursor position.

```js
jar.restore(pos)
```

#### `recordHistory()`

Saves current editor state to history.

#### `destroy()`

Removes event listeners from editor.

## Related

* [react-codejar](https://github.com/guilhermelimak/react-codejar) - a React wrapper for CodeJar. 
* [ngx-codejar](https://github.com/julianpoemp/ngx-codejar) - an Angular wrapper for CodeJar. 
* [codejar-linenumbers](https://github.com/julianpoemp/codejar-linenumbers) - an JS library for line numbers.

## License

[MIT](LICENSE)
