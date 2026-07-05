---
repo: sindresorhus/urls-md
url: 'https://github.com/sindresorhus/urls-md'
homepage: null
starredAt: '2025-09-11T20:20:24Z'
createdAt: '2014-02-14T20:34:57Z'
updatedAt: '2025-10-06T09:14:54Z'
language: JavaScript
license: MIT
branch: main
stars: 86
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-10-18T22:29:47.792Z'
description: >-
  Convert URLs to Markdown links: Extracts URLs from text → Gets their article
  title → Creates Markdown links
tags: []
---

# urls-md

> Convert URLs to Markdown links and images

[Extracts URLs from text](https://github.com/sindresorhus/get-urls) → [Gets their article title](https://github.com/sindresorhus/article-title) → Creates Markdown links and images

Useful for when you have a linkdump and want them in Markdown.

###### From

```
Lorem ipsum dolor sit amet
http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling
Magnis dis parturient montes.
Lorem http://codelittle.com/tag/yeoman/
https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png
```

###### To

```
[Yo Polymer – A Whirlwind Tour Of Web Component Tooling](http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling)

[How To Use Yeoman](http://codelittle.com/tag/yeoman/)

![](https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png)
```

## Install

```sh
npm install urls-md
```

## Usage

```js
import urlsMd from 'urls-md';

const urls = await urlsMd('Lorem ipsum http://codelittle.com/tag/yeoman/');

console.log(urls);
//=>  ['[How To Use Yeoman](http://codelittle.com/tag/yeoman/)']
```

## API

### urlsMd(text)

#### text

Type: `string`

Text containing URLs to convert to Markdown links and images.

Returns a `Promise<string[]>` with an array of Markdown formatted links and images.

## CLI

```sh
npm install --global urls-md
```

```sh
urls-md --help

  Usage
    urls-md <file>
    cat <file> | urls-md
```

You can also easily run through multiple files using shell scripting. In this example using ZSH syntax:

```sh
# Loops through all .txt files in the current directory and outputs the converted files with .md extension
for f (*.txt) { urls-md $f > $f.md }
```
