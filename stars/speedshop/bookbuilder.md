---
repo: speedshop/bookbuilder
url: 'https://github.com/speedshop/bookbuilder'
homepage: null
starredAt: '2022-02-13T23:32:37Z'
createdAt: '2021-01-13T20:29:15Z'
updatedAt: '2024-04-25T08:28:44Z'
language: CSS
license: MIT
branch: master
stars: 44
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:24.107Z'
description: A simple template and workflow for publishing books with Pandoc
tags: []
---

# A Simple Book Build Pipeline with Pandoc 

This repository is a simple build process for making books with Pandoc. It was used 
to publish [The Complete Guide to Rails Performance and The Ruby on Rails Performance Apocrypha.](https://gumroad.com/nateberk)

This configuration creates PDF, EPUB, TXT, and HTML build artifacts.

## Usage 

Put contents (I use Markdown, but because it's Pandoc, you can use [almost any format](https://pandoc.org/MANUAL.html) for input) inside the `/content` directory. They will be concatenated in alphabetical order to form the book, so I typically use something like the following structure:

```
content/00_introduction.md 
content/01_first_chapter.md 
content/02_second_chapter.md
...
```

`h1` and `h2` will cause a page break, using the CSS I have in the `pandoc` folder. I like to have "sub sections" in my books, so I use `h1` for the section headers and `h2` for chapter headers. `h3` and below can be used for emphasis but do not appear in the table of contents. 

Images go in the `img` folder. 

The `pandoc/epub_metadata.md` file is a special place for putting epub-specific metadata.

`$ make` and `$ make clean` build and delete the build artifacts, respectively. 

`$ make wordcount` will count the words in the content folder.

