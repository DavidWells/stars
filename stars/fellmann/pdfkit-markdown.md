---
repo: fellmann/pdfkit-markdown
url: 'https://github.com/fellmann/pdfkit-markdown'
homepage: null
starredAt: '2024-08-03T23:08:44Z'
createdAt: '2023-04-02T15:56:59Z'
updatedAt: '2024-08-29T13:59:00Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:27.254Z'
description: A markdown renderer for PDFKit using mdast syntax tree.
tags: []
---

# PDFKit Markdown Renderer &middot; [![npm version](https://img.shields.io/npm/v/pdfkit-markdown?style=flat)](https://www.npmjs.com/package/pdfkit-markdown)

This package provides basic markdown rendering capabilites for [PDFKit](https://pdfkit.org/).

Given a mdast syntax tree as input, content is rendered to a given PDFDocument.

See the output for this README.md at [README.pdf](README.pdf).

## Usage

To render a given markdown string, install:

```bash
yarn add pdfkit-markdown mdast unified remark-parse 
```

```typescript
import { MarkdownRenderer } from "pdfkit-markdown";
import remarkParse from "remark-parse";
import { unified } from "unified";
import PDFDocument from "pdfkit";

...

const tree = unified()
      .use(remarkParse)
      .parse("Markdown **Text**")

const doc = new PDFDocument()

new MarkdownRenderer(doc, { /* optional settings */ }).render(tree);
```

## Supported elements

Currently supported elements:

- Headings
- Paragraphs and line breaks according to CommonMark specification
- Bold and italic text
- List (unordered and ordered)
- Links
- Horizontal Rules
- Code Blocks
- Inline Code
- Blockquotes (basic support)

Unsupported elements:
- Tables
- Images
- HTML
- ...

## Configuration

Fonts, sizes, indents etc. are configurable, see documentation on constructor.

## Similar packages

[pdfkit-commonmark](https://github.com/maiers/pdfkit-commonmark) provides similar functionality, but does not support TypeScript and uses the less maintained CommonMark parser.
