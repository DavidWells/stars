---
repo: chenfan0/filetoc
url: 'https://github.com/chenfan0/filetoc'
homepage: null
starredAt: '2022-04-06T03:59:21Z'
createdAt: '2022-04-03T12:59:10Z'
updatedAt: '2025-02-11T15:51:38Z'
language: TypeScript
license: NA
branch: main
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:49.676Z'
description: a generates toc based on the directory
tags: []
---

# FileToc

<div align=center>

[中文](https://github.com/chenfan0/filetoc/blob/main/README.zh.md)

<div align=left>
Generates table of contents for markdown files inside local git repository. Link to file address.

**Table of Contents generated with FileToc**

<!--filetoc-start-->
- [.vscode](https://github.com/chenfan0/filetoc/tree/main/.vscode)
  - [settings.json](https://github.com/chenfan0/filetoc/tree/main/.vscode/settings.json)
- [dist](https://github.com/chenfan0/filetoc/tree/main/dist)
  - [bundle.js](https://github.com/chenfan0/filetoc/tree/main/dist/bundle.js)
- [lib](https://github.com/chenfan0/filetoc/tree/main/lib)
  - [config.ts](https://github.com/chenfan0/filetoc/tree/main/lib/config.ts)
  - [constant.ts](https://github.com/chenfan0/filetoc/tree/main/lib/constant.ts)
  - [createToc.ts](https://github.com/chenfan0/filetoc/tree/main/lib/createToc.ts)
  - [index.ts](https://github.com/chenfan0/filetoc/tree/main/lib/index.ts)
  - [utilis.ts](https://github.com/chenfan0/filetoc/tree/main/lib/utilis.ts)
- [.editorconfig](https://github.com/chenfan0/filetoc/blob/main/.editorconfig)
- [.gitignore](https://github.com/chenfan0/filetoc/blob/main/.gitignore)
- [.npmignore](https://github.com/chenfan0/filetoc/blob/main/.npmignore)
- [.prettierignore](https://github.com/chenfan0/filetoc/blob/main/.prettierignore)
- [.prettierrc](https://github.com/chenfan0/filetoc/blob/main/.prettierrc)
- [filetoc.config.js](https://github.com/chenfan0/filetoc/blob/main/filetoc.config.js)
- [index.js](https://github.com/chenfan0/filetoc/blob/main/index.js)
- [package.json](https://github.com/chenfan0/filetoc/blob/main/package.json)
- [pnpm-lock.yaml](https://github.com/chenfan0/filetoc/blob/main/pnpm-lock.yaml)
- [README.md](https://github.com/chenfan0/filetoc/blob/main/README.md)
- [README.zh.md](https://github.com/chenfan0/filetoc/blob/main/README.zh.md)
- [rollup.config.js](https://github.com/chenfan0/filetoc/blob/main/rollup.config.js)
- [tsconfig.json](https://github.com/chenfan0/filetoc/blob/main/tsconfig.json)
<!--filetoc-end-->

## Installation

```shell
npm install filetoc -g
```

## Usage

### Create a config File(filetoc.config.js)

#### Examples

```js
// filetoc.config.js
module.exports = {
  remoteUrl: 'https://github.com/chenfan0/dirtoc', // your repo address
  mainBranch: 'main', // your default branch. default 'main'
  dirPath: '.', //  the dir where you want to gengerate the toc. default '.'
  mdPath: ['./README.md', './README.zh.md'], // the markdown files path, when there is only one path, it also can be a string.  default ['README.md']
  excludes: ['.git'] // the excludes file name or dir name
}
```

### Specifying location of toc

**You should specify where to insert the TOC in your markdown file.**

#### Example

```
<!--filetoc-start-->
toc will insert here
<!--filetoc-end-->
```

### Run filetoc

Go into the directory that contains you local git project and type:

```
filetoc
```
## Use with git hooks
If you want to automatically modify the markdown for you before each commit.You can use [husky](https://github.com/typicode/husky) to achieve this effect.

Go into the directory that contains you local git project and type:
```shell
npx husky-init && npm install
```
Find the **pre-commit** file under the generated husky folder and write in the file:
```
filetoc
git add .
```
