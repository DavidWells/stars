---
repo: marutypes/typed-css-modules
url: 'https://github.com/marutypes/typed-css-modules'
homepage: null
starredAt: '2021-11-13T04:47:20Z'
createdAt: '2017-02-03T15:32:07Z'
updatedAt: '2021-11-13T04:47:20Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.221Z'
description: Creates .d.ts files from css-modules .css files
tags: []
---

# friendly-typed-css-modules [![Build Status](https://travis-ci.org/TheMallen/typed-css-modules.svg?branch=master)](https://travis-ci.org/TheMallen/typed-css-modules)
This is a fork of [Typed-CSS-Modules](https://github.com/Quramy/typed-css-modules), aimed at providing some *friendlier* functionality
for using programmatic class names against your typed css, as well as scss parsing support.

Creates TypeScript definition files from [CSS Modules](https://github.com/css-modules/css-modules) .css files.

If you have the following css,

```css
/* styles.css */

@value primary: red;

.myClass {
  color: primary;
}
```

typed-css-modules creates the following .d.ts files from the above css:

```ts
/* styles.css.d.ts */
interface Styles {
  myClass: string,
}
const styles: Styles;
export = styles;
```

So, you can import CSS modules' class or variable into your TypeScript sources:

```ts
/* app.ts */
import * as styles from './styles.css';
console.log(`<div class="${styles.myClass}"></div>`);
console.log(`<div style="color: ${styles.primary}"></div>`);
```

You can also still programmatically generate accessors without getting errors.

```
console.log(`<div class="${styles[doSomethingProgrammatic()]}"></div>`);
```

## CLI

```sh
npm install -g friendly-typed-css-modules
```

And exec `ftcm <input directory>` command.
For example, if you have .css files under `src` directory, exec the following:

```sh
ftcm src
```

this creates `*.css.d.ts` files under the directory which has original .css file.

```text
(your project root)
- src/
    | myStyle.css
    | myStyle.css.d.ts [created]
```

#### output directory
Use `-o` or `--outDir` option.

For example:

```sh
ftcm -o dist src
```

```text
(your project root)
- src/
    | myStyle.css
- dist/
    | myStyle.css.d.ts [created]
```

#### file name pattern

By the default, this tool searches `**/*.css` files under `<input directory>`.
If you need to customize glob pattern, you use `--pattern` or `-p` option.

```sh
ftcm -p src/**/*.icss
```

#### watch
With `-w` or `--watch`, this CLI watches files in the input directory.

#### camelize CSS token
With `-c` or `--camelCase`, kebab-cased CSS classes(such as `.my-class {...}`) are exported as camelized TypeScript varibale name(`export const myClass: string`).
See also [webpack css-loader's camelCase option](https://github.com/webpack/css-loader#camel-case).

## API

```sh
npm install typed-css-modules
```

```js
import DtsCreator from 'typed-css-modules';
let creator = new DtsCreator();
creator.create('src/style.css').then(content => {
  console.log(content.tokens);          // ['myClass']
  console.log(content.formatted);       // 'class Styles...'
  content.writeFile();                  // writes this content to "src/style.css.d.ts"
});
```

### class DtsCreator
DtsCreator instances process CSS and create TypeScript definitions.

#### `new DtsCreator(option)`
You can set the following options:

* `option.rootDir`: Project root directory(default: `process.cwd()`). 
* `option.searchDir`: Directory which includes target `*.css` files(default: `'./'`).
* `option.outDir`: Output directory(default: `option.searchDir`).
* `option.camelCase`: Camelize CSS class tokens.
* `option.allowGenericStringAccess`: Allow access to the styles object via generic string accessors (eg. `styles[someVariable];`)

#### `create(filepath, contents) => Promise(dtsContent)`
Returns `DtsContent` instance.

* `filepath`: path of target .css file.
* `contents`(optional): the CSS content of the `filepath`. If set, DtsCreator uses the contents instead of the original contents of the `filepath`.

### class DtsContent
DtsContent instances contain `*.d.ts` content, the final output path, and a function to write to file.

#### `writeFile() => Promise(dtsContent)`
Writes the DtsContent instance's content to a file.

* `dtsContent`: the DtsContent instance itself.

#### `tokens`
An array of tokens retrieved from input CSS file.
e.g. `['myClass']`

#### `contents`
An array of members of the styles class for this module.
e.g. `['myClass: string;']`.

#### `formatted`
A string containing TypeScript definitions.

e.g.

```ts
export const myClass: string;
```

#### `messageList`
An array of messages containing invalid token information.
e.g. `['my-class is not valid TypeScript variable name.']`.

#### `outputFilePath`
Final output file path.

## Remarks
If your input CSS file has any of the following class names, these invalid tokens are not output to `.d.ts` files.

```css
/* TypeScript reserved word */
.while {
  color: red;
}

/* invalid TypeScript variable */
/* If camelCase option is set, this token will be converted to 'myClass' */
.my-class{
  color: red;
}

/* it's ok */
.myClass {
  color: red;
}
```

## Example
There is a minimum example in this repository `example` folder. Clone this repository and run `cd example; npm i; npm start`.

## License
This software is released under the MIT License, see LICENSE.txt.
