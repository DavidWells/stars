---
repo: Doctave/doctave-markdown
url: 'https://github.com/Doctave/doctave-markdown'
homepage: null
starredAt: '2022-03-13T22:24:35Z'
createdAt: '2020-11-09T10:48:59Z'
updatedAt: '2024-01-02T09:42:40Z'
language: Rust
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:59.880Z'
description: Doctave-specific markdown parser
tags: []
---

# Doctave Markdown

This library encapsulates the logic for parsing a Markdown document into HTML in a way that has a
couple Doctave-specific additions.

Currently this means the following:

* A list of subheadings are returned with the generated HTML
* H-tags get associated IDs applied to them so that we can generate links to them
* MermaidJS code snippets get converted into `<div class="mermaid">`
