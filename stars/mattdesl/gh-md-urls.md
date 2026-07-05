---
repo: mattdesl/gh-md-urls
url: 'https://github.com/mattdesl/gh-md-urls'
homepage: ''
starredAt: '2019-09-13T23:26:18Z'
createdAt: '2015-07-11T17:29:40Z'
updatedAt: '2021-07-28T21:29:43Z'
language: JavaScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.308Z'
description: find and resolve URLs in GitHub Markdown
tags: []
---

# gh-md-urls

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Finds image and link URLs from a GitHub markdown source and optionally resolves relative paths to an absolute GitHub URL.

## Install

```sh
npm install gh-md-urls --save
```

## Example

Take the following `readme.md` file:

```md
## header

![image](images/image.png)

Hello [google](http://google.com)!
A [section](#relative) link.
```

Now running the this on the above source:

```js
var getUrls = require('gh-md-urls')
var fs = require('fs')
var src = fs.readFileSync(__dirname + '/readme.md', 'utf8')

var urls = getUrls(src, {
  repository: 'https://github.com/mattdesl/gh-md-urls'
})
```

Result of `urls`:

```js
[ 
  { type: 'image',
    url: 'https://raw.githubusercontent.com/mattdesl/gh-md-urls/master/images/image.png', 
    alt: 'image' 
  }, { 
    type: 'link', 
    url: 'http://google.com', 
    text: 'google' 
  }, { 
    type: 'link',
    url: 'https://github.com/mattdesl/gh-md-urls#relative',
    text: 'section' 
  } 
]
```

## Usage

[![NPM](https://nodei.co/npm/gh-md-urls.png)](https://www.npmjs.com/package/gh-md-urls)

#### `urls = getUrls(markdown, [opt])`

Returns a list of URL nodes representing all Markdown links in the source String or File `markdown`. Options:

- `repository` (String) if set, resolves all relative paths to absolute paths based on this repository URL
- `raw` (Boolean) if true, all links are resolved to their `raw.githubusercontent.com/` link instead of a blob
- `branch` (String) the branch to resolve to, default master
- `baseUrl` (String) if set, prepends hash fragments like `#some-section` with the given base URL (non-string values default to `repository` option)

HTML image/anchors are not parsed.

### Nodes

##### `"image"`

The node is an image: `![image](foo/image.png)`

```js
{
  type: 'image',
  url: 'foo/image.png',
  alt: 'image'
}
```

##### `"link"` (text)

The node is a text link: `[foo](#blah)`

```js
{
  type: 'link',
  text: 'foo',
  url: '#blah'
}
```

##### `"link"` (image)

The node is a link containing an image node: `[![title](image.png)](#foo)`

```js
{
  type: 'link',
  url: '#foo',
  image: {
    type: 'image'
    url: 'image.png',
    alt: 'title'
  }
}
```

##### `"reference"`

The node is a reference/definition/footer: 

```md
[Some text][1] and stuff.

[1]: http://google.com/
```

```js
{
  type: 'reference',
  text: 'Some text',
  identifier: '1',
  url: 'http://google.com/'
}
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/gh-md-urls/blob/master/LICENSE.md) for details.
