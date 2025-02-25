---
repo: Vinzent03/obsidian-advanced-uri
url: 'https://github.com/Vinzent03/obsidian-advanced-uri'
homepage: ''
starredAt: '2023-06-07T04:21:42Z'
createdAt: '2021-03-31T17:39:25Z'
updatedAt: '2025-02-24T16:41:17Z'
language: TypeScript
license: MIT
branch: master
stars: 830
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:48.028Z'
description: Advanced modes for Obsidian URI
tags: []
---

# Advanced URI

A plugin for [Obsidian](https://obsidian.md)

[Documentation](https://publish.obsidian.md/advanced-uri-doc)

## Overview

[Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) allows you to control many different features in Obsidian just by opening some URIs. Because they are just text and don't require any mouse clicks or keyboard inputs, they are perfect to automate your Obsidian workflow.

You can for example 
- [open files](https://publish.obsidian.md/advanced-uri-doc/Actions/Navigation)
- [edit files](https://publish.obsidian.md/advanced-uri-doc/Actions/Writing)
- [create files](https://publish.obsidian.md/advanced-uri-doc/Actions/Writing)
- [open workspaces](https://publish.obsidian.md/advanced-uri-doc/Actions/Navigation)
- [open bookmarks](https://publish.obsidian.md/advanced-uri-doc/Actions/Bookmarks)
- [navigate to headings/blocks](https://publish.obsidian.md/advanced-uri-doc/Actions/Navigation)
- [automated search and replace in a file](https://publish.obsidian.md/advanced-uri-doc/Actions/Search)
- [call commands](https://publish.obsidian.md/advanced-uri-doc/Actions/Commands)
- [edit and read from frontmatter](https://publish.obsidian.md/advanced-uri-doc/actions/frontmatter)
- [canvas movement](https://publish.obsidian.md/advanced-uri-doc/actions/canvas)
- and much more

Please read the [documentation](https://publish.obsidian.md/advanced-uri-doc) for a detailed explanation.

## Examples

### Append content from the clipboard to today's daily note
```uri
obsidian://adv-uri?vault=<your-vault>&daily=true&clipboard=true&mode=append
```

### Export a file to PDF by calling the command "Export to PDF" via its command ID
```uri
obsidian://adv-uri?vault=<your-vault>&filepath=<your-file>&commandid=workspace%3Aexport-pdf
```

### Open heading in a file
```uri
obsidian://adv-uri?vault=<your-vault>&filepath=my-file&heading=Goal
```

If you find this plugin useful and would like to support its development, you can support me on [Ko-fi](https://Ko-fi.com/Vinzent).

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F195IQ5)
