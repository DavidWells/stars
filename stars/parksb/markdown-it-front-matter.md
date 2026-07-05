---
repo: parksb/markdown-it-front-matter
url: 'https://github.com/parksb/markdown-it-front-matter'
homepage: 'https://www.npmjs.com/package/markdown-it-front-matter'
starredAt: '2022-02-22T03:26:17Z'
createdAt: '2016-05-07T05:29:19Z'
updatedAt: '2025-01-01T15:28:58Z'
language: JavaScript
license: MIT
branch: master
stars: 57
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:15.496Z'
description: Plugin to process front matter container for markdown-it parser
tags:
  - front-matter
  - markdown-it
  - markdown-parser
  - plugin
---

# markdown-it-front-matter
 
[![npm](https://badge.fury.io/js/markdown-it-front-matter.svg)](https://badge.fury.io/js/markdown-it-front-matter)
[![master-ci](https://github.com/ParkSB/markdown-it-front-matter/workflows/master-ci/badge.svg)](https://github.com/ParkSB/markdown-it-front-matter/actions?query=workflow%3Amaster-ci)

> Plugin for processing front matter for markdown-it markdown parser.

## Install

```sh
$ npm install markdown-it-front-matter --save
```

## Valid Front Matter

Essentially, valid front matter is a fenced block:

* Indicated by **three** or **more** dashes: `---`
* Opening and closing fences must be the same number of *dash* characters
* Opening fence must begin on the first line of the markdown string/file
* Opening fence must not be indented

```yaml
---
valid-front-matter: true
---
```

> The example above uses YAML but YAML is not required

> (bring your own front matter parser)


## Example

* Front Matter is not rendered.
* Any markup inside the block is passed to the **required** callback function.

```javascript
const md = require('markdown-it')()
  .use(require('markdown-it-front-matter'), function(fm) {
    console.log(fm)
  });

let result = md.render('---\ntitle: This is the Title\n---\n# Heading\n----\nsome text');

// > title: This is the Title
```

## References / Thanks

Code heavily borrowed from [markdown-it-container](https://github.com/markdown-it/markdown-it-container)

* Alex Kocharin [github/rlidwka](https://github.com/rlidwka)
* Vitaly Puzrin [github/puzrin](https://github.com/puzrin)

## License

_markdown-it-front-matter_ is distributed under the MIT License - see the [LICENSE](LICENSE) file for details.
