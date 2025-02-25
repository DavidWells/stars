---
repo: leebyron/spec-md
url: 'https://github.com/leebyron/spec-md'
homepage: 'https://spec-md.com'
starredAt: '2019-07-04T17:51:55Z'
createdAt: '2015-04-01T23:39:09Z'
updatedAt: '2025-02-14T15:52:08Z'
language: HTML
license: MIT
branch: main
stars: 391
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:30.751Z'
description: "\U0001F4D6 Additions to Markdown for writing specification documents"
tags: []
---

# Spec Markdown

Renders Markdown with some additions into an HTML format commonly used for
writing technical specification documents. Markdown additions include code
syntax highlighting, edit annotations, and the definition of algorithms and
grammar productions.

**Philosophy**

Spec Markdown is first and foremost Markdown. As such, it follows Markdown's
philosophy of intending to be as easy to read and easy to write as is feasible.

In order to interoperate with other tools which use Markdown, Spec Markdown
tries to add as little additional syntax as possible, instead preferring
conventions. This means any documents written with Spec Markdown in mind should
render adequately by other Markdown renderers.

To support the rendering additions of Spec Markdown, some features of Markdown
may be limited or removed. As an example, Spec Markdown is strict about the
order and locations of headers in a document.

Note: This is not a normative spec for Spec Markdown, but just documentation of
this tool. Of course, written in Spec Markdown!


# Getting Started

To use Spec Markdown, just write Markdown files. There are some conventions used
by Spec Markdown which you can read about in [Spec additions](./spec/Spec%20Additions.md#Spec-Additions).

To convert your Markdown files into an HTML spec document, use the `spec-md`
utility.

```sh
npm install -g spec-md
spec-md ./path/to/markdown.md > ./path/to/output.html
```

You can also require `spec-md` as a node module.

```sh
npm install --save-dev spec-md
```

```js
const fs = require('fs');
const specMarkdown = require('spec-md');
specMarkdown.html('./path/to/markdown.md').then(html => {
  fs.writeFile('./path/to/output.html', html);
});
```

Spec Markdown also provides utilities for generating and operating on an
intermediate representation of the markdown, which you can explore in
[Using Spec Markdown](./spec/Usage.md#Using-Spec-Markdown).


# [Markdown](./spec/Markdown.md)

# [Spec additions](./spec/Spec%20Additions.md)

# [Using Spec Markdown](./spec/Usage.md)

# [Contributing](./CONTRIBUTING.md)
