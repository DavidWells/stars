---
repo: DavidWells/advanced-markdown
url: 'https://github.com/DavidWells/advanced-markdown'
homepage: null
starredAt: '2021-12-15T19:55:20Z'
createdAt: '2017-02-21T18:55:51Z'
updatedAt: '2025-02-25T07:21:47Z'
language: JavaScript
license: NA
branch: master
stars: 454
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.191Z'
description: Learn about advanced markdown techniques
tags: []
---

# Advanced Markdown Guide

[Slides -> github.com/DavidWells/advanced-markdown](https://github.com/DavidWells/advanced-markdown/)

## Table of Contents
<!-- AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText="Click to expand") -->
<details>
<summary>"Click to expand"</summary>

- [Why markdown?](#why-markdown)
- [Markdown basics](#markdown-basics)
- [Advanced Formatting tips](#advanced-formatting-tips)
  - [`left` alignment](#left-alignment)
  - [`right` alignment](#right-alignment)
  - [`center` alignment example](#center-alignment-example)
  - [`collapse` Sections](#collapse-sections)
  - [`additional links`](#additional-links)
  - [Badges](#badges)
- [Useful packages](#useful-packages)
- [Useful utilities](#useful-utilities)
- [How Serverless uses markdown](#how-serverless-uses-markdown)
  - [DEMO](#demo)
- [Other Markdown Resources](#other-markdown-resources)

</details>
<!-- AUTO-GENERATED-CONTENT:END -->

## Why markdown?

Markdown is a universal doc format that is easy to write and easy to add to a version control system.

- **Open** - Anyone can submit content, fix typos & update anything via pull requests
- **Version control** - Roll back & see the history of any given post
- **No CMS lock in** - We can easily port to any static site generator
- **It's just simple** - No user accounts to manage, no CMS software to upgrade, no plugins to install.

---

## Markdown basics

The basics of markdown can be found [here](https://guides.github.com/features/mastering-markdown/) & [here](https://daringfireball.net/projects/markdown/). Super easy!

### Image with alt & title

```
![Alt text](/path/to/img.jpg "image title")
```

## Advanced Formatting tips

### `left` alignment

<img align="left" width="100" height="100" src="https://picsum.photos/100/100">

This is the code you need to align images to the left:
```
<img align="left" width="100" height="100" src="https://picsum.photos/100/100">
```

---

### `right` alignment

<img align="right" width="100" height="100" src="https://picsum.photos/100/100">

This is the code you need to align images to the right:
```
<img align="right" width="100" height="100" src="https://picsum.photos/100/100">
```

---

### `center` alignment example

<p align="center">
  <img width="460" height="300" src="https://picsum.photos/460/300">
</p>

```
<p align="center">
  <img width="460" height="300" src="https://picsum.photos/460/300">
</p>
```

---

### Horizontal images no gap

via [comment](https://gist.github.com/DavidWells/7d2e0e1bc78f4ac59a123ddf8b74932d?permalink_comment_id=4536101#gistcomment-4536101)

```html
<p>
    <img src="https://picsum.photos/100/100" >
    <img src="https://picsum.photos/100/100" >
</p>
```

<p>
    <img src="https://picsum.photos/100/100" >
    <img src="https://picsum.photos/100/100" >
</p>

---

### Horizontal images with gap

With `hspace` property you can set horizontal (left and right) padding for an image

```html
<p>
    <img src="https://picsum.photos/100/100" hspace="10" >
    <img src="https://picsum.photos/100/100" hspace="10" >
</p>
```

<p>
    <img src="https://picsum.photos/100/100" hspace="10" >
    <img src="https://picsum.photos/100/100" hspace="10" >
</p>

---

###  Vertical images with gap

We also have a property "vspace", which does what it sounds like, add vertical spacing. But it doesn't seem to work on GitHub, unlike VSCode's buit in markdown viewer. So probably just add a `<p>` tag in between. 

```html
<p>
    <img src="https://picsum.photos/500/100" >
    <p>
    <img src="https://picsum.photos/500/100" >
    <p>
    <img src="https://picsum.photos/500/100" >
</p>
```

<p>
    <img src="https://picsum.photos/500/100"  >
    <p>
    <img src="https://picsum.photos/500/100" >
    <p>
    <img src="https://picsum.photos/500/100" >
</p>

---

### Adding video

To add video you need to upload your video file and reference it inline

```
https://user-images.githubusercontent.com/1702215/158075475-c23004ab-827a-45ad-bdba-aee29ac5b582.mp4
```

Example:

https://user-images.githubusercontent.com/1702215/158075475-c23004ab-827a-45ad-bdba-aee29ac5b582.mp4

### light/dark mode images

Tip via this [tweet](https://twitter.com/stefanjudis/status/1465775940034781186). Swap out images based on theme settings

```
![Logo](./dark.png#gh-dark-mode-only)
![Logo](./light.png#gh-light-mode-only)
```

### Using [footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)

Here is a simple footnote[^example]. With some additional text after it.

[^example]: Example footnote

```
Here is a simple footnote[^1]. With some additional text after it.

[^1]: My reference.
````

### Strikethru text in markdown

~~text with line through it~~

```
~~text with line through it~~
```

### Tiny text in markdown

Normal text here.

<sup><sub>Tiny text is here. Awwwww its so cuteeeeeeeeeee</sub></sup>

**How?**

```
<sup><sub>Add your tiny text</sub></sup>
```

### Text box

Add a box with contents to markdown

<div align="center">
<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>
<sub>This is text in the box. Much wow</sub><br>
<img width="2000" height="0">
</td>
</tbody>
</table>
</div>

```
<div align="center">
<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>
<sub>This is text in the box. Much wow</sub><br>
<img width="2000" height="0">
</td>
</tbody>
</table>
</div>
```

### `collapse` Sections

Collapsing large blocks of text can make your markdown much easier to digest

<details>
<summary>"Click to expand"</summary>
this is hidden block
</details>

```
<details>
<summary>"Click to expand"</summary>
this is hidden
</details>
```

Collapsing large blocks of Markdown text

<details>
<summary>To make sure markdown is rendered correctly in the collapsed section...</summary>

 1. Put an **empty line** after the `<summary>` block.
 2. *Insert your markdown syntax*
 3. Put an **empty line** before the `</details>` tag
 
</details>

```
<details>
<summary>To make sure markdown is rendered correctly in the collapsed section...</summary>

 1. Put an **empty line** after the `<summary>` block.
 2. *Insert your markdown syntax*
 3. Put an **empty line** before the `</details>` tag
 
</details>
```

---

## Mermaid Charts

You can add fancy zoomable charts

```mermaid
%%{ init: { "er" : { "layoutDirection" : "LR" } } }%%
erDiagram
    User ||--o{ Vote : submits
    Vote o{--|| Link : on
    Link o{--|| Score : has
```

Here's another cool example of a [sequence diagram](https://github.com/tom-barone/discontent/blob/431a6bd39216fd1f3018804a1dbe0967e22adfc5/docs/architecture.md#sequence-diagrams)

```mermaid
sequenceDiagram
    actor Extension
    participant API
    participant Database
    Extension->>API: POST /vote {link, vote, user_id}`
		activate API
		API->>API: Validate parameters
    alt Invalid parameters
        API->>Extension: Error: Invalid parameters
    end
		API->>Database: Check user history & settings. GetBatchItems(___________)
		Note over API,Database: Voting disabled? GetItem(PK=settings, SK=settings)
		Note over API,Database: Too many votes? GetItem(PK=date, SK=user_id)
		Note over API,Database: User exists? User banned? GetItem(PK=user_id, SK=user_id)
		Note over API,Database: Already voted? GetItem(PK=link, SK=user_id)
		activate Database
    alt Database Error
        Database->>API: Database Error (connection / server...)
        API->>Extension: Server Error
    end
		Database->>API: Return UserHistory & Settings
		deactivate Database
		API->>API: Check user history & Settings
    alt Failed
        API->>Extension: 403 Forbidden: Too many votes / banned / voting disabled
    end
		activate Database
		API->>Database: Submit vote. BatchWriteItems(_________________)
    alt If user does not exist
		Note over API,Database: Put(PK=user_id, SK=user_id | not_banned,created_at)
		Note over API,Database: <run [First time user voting on link]>
		else First time user voting on link
		Note over API,Database: Put(PK=link, SK=user_id | vote)
		Note over API,Database: Update(PK=link, SK=link | count_of_votes++, sum_of_votes+=vote)
		Note over API,Database: -- Add history
		Note over API,Database: Update(PK=day, SK=link | count++, sum+=vote)
		Note over API,Database: Update(PK=day, SK=user | count++, sum+=vote)
    else If user already voted on link
		Note over API,Database: Put(PK=link, SK=user_id | vote)
		Note over API,Database: Update(PK=link, SK=link | sum_of_votes+=(-old_vote+new_vote))
		Note over API,Database: -- Undo old history
		Note over API,Database: Update(PK=old_day, SK=link | count--, sum-=old_vote)
		Note over API,Database: Update(PK=old_day, SK=user | count--, sum-=old_vote)
		Note over API,Database: -- Add history
		Note over API,Database: Update(PK=day, SK=link | count++, sum+=vote)
		Note over API,Database: Update(PK=day, SK=user | count++, sum+=vote)
		end
		activate Database
    alt Database Error
        Database->>API: Database Error (connection / server...)
        API->>Extension: Server Error
    end
		Database->>API: Return success
		API->>Extension: Return success
    deactivate Database
    deactivate API
```

---

### Call outs

Add call outs in [markdown](https://github.com/community/community/discussions/16925)

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

```
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

### `additional links`

[Website](http://www.serverless.com) • [Email Updates](http://eepurl.com/b8dv4P) • [Gitter](https://gitter.im/serverless/serverless) • [Forum](http://forum.serverless.com) • [Meetups](https://github.com/serverless-meetups/main) • [Twitter](https://twitter.com/goserverless) • [Facebook](https://www.facebook.com/serverless) • [Contact Us](mailto:hello@serverless.com)

```
[Website](http://www.serverless.com) • [Email Updates](http://eepurl.com/b8dv4P) • [Gitter](https://gitter.im/serverless/serverless) • [Forum](http://forum.serverless.com) • [Meetups](https://github.com/serverless-meetups/main) • [Twitter](https://twitter.com/goserverless) • [Facebook](https://www.facebook.com/serverless) • [Contact Us](mailto:hello@serverless.com)
```

---

### Badges

<div align="center">

[![CI](https://github.com/fastify/fastify/workflows/ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/ci.yml)
[![Package Manager CI](https://github.com/fastify/fastify/workflows/package-manager-ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/package-manager-ci.yml)
[![Web SIte](https://github.com/fastify/fastify/workflows/website/badge.svg)](https://github.com/fastify/fastify/actions/workflows/website.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/fastify/fastify/badge.svg)](https://snyk.io/test/github/fastify/fastify)
[![Coverage Status](https://coveralls.io/repos/github/fastify/fastify/badge.svg?branch=main)](https://coveralls.io/github/fastify/fastify?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

</div>

```
<div align="center">

[![CI](https://github.com/fastify/fastify/workflows/ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/ci.yml)
[![Package Manager CI](https://github.com/fastify/fastify/workflows/package-manager-ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/package-manager-ci.yml)
[![Web SIte](https://github.com/fastify/fastify/workflows/website/badge.svg)](https://github.com/fastify/fastify/actions/workflows/website.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/fastify/fastify/badge.svg)](https://snyk.io/test/github/fastify/fastify)
[![Coverage Status](https://coveralls.io/repos/github/fastify/fastify/badge.svg?branch=main)](https://coveralls.io/github/fastify/fastify?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

</div>
```

---

### Nice looking file tree

For whatever [reason](https://twitter.com/alexdotjs/status/1421015442286596100) the `graphql` syntax will nicely highlight file trees like below:

```graphql
# Code & components for pages
./src/* 
  ├─ src/assets - # Minified images, fonts, icon files
  ├─ src/components - # Individual smaller components
  ├─ src/fragments - # Larger chunks of a page composed of multiple components
  ├─ src/layouts - # Page layouts used for different types of pages composed of components and fragments
  ├─ src/page - # Custom pages or pages composed of layouts with hardcoded data components, fragments, & layouts
  ├─ src/pages/* - # Next.js file based routing
  │  ├─ _app.js - # next.js app entry point
  │  ├─ _document.js - # next.js document wrapper
  │  ├─ global.css - #  Global CSS styles
  │  └─ Everything else... - # File based routing
  └─ src/utils - # Utility functions used in various places
```

### Using CSS in Readme

Use HTML/CSS in a readme via an SVG! [source](https://github.com/sindresorhus/css-in-readme-like-wat)

<div align="center">
  <br>
  <a href="https://github.com/DavidWells/advanced-markdown/blame/master/svg-with-css.svg">
     <img alt="Click to see the source" height="400" src="svg-with-css.svg" width="800" />
  </a>
  <br>
</div>

The above image is embedded like so:

```html
<div align="center">
  <br/>
  <a href="https://github.com/DavidWells/advanced-markdown/blame/master/svg-with-css.svg">
    <img alt="Click to see the source" height="400" src="svg-with-css.svg" width="800" />
  </a>
  <br/>
</div>
```

---

## Useful packages

1. [gray-matter](https://www.npmjs.com/package/gray-matter)

  YAML front-matter is your friend. You can keep metadata in markdown files

  ```
  title: Serverless Framework Documentation
  description: "Great F'in docs!"
  menuText: Docs
  layout: Doc
  ```

2. [Remark](https://www.npmjs.com/package/remark)

  Useful for rendering markdown in HTML/React

3. [Markdown Magic](https://github.com/DavidWells/markdown-magic)

  - [Repo](https://github.com/DavidWells/markdown-magic)
  - [Plugins](https://github.com/DavidWells/markdown-magic#plugins)
  - Show automatic doc generation. [Example 1](https://github.com/DavidWells/markdown-magic/blob/master/examples/generate-readme.js#L15-L23)   | [Example 2](https://github.com/serverless/examples/blob/master/generate-readme.js#L71-L87)

---

## Useful utilities

1. [Schedule Posts](https://github.com/serverless/post-scheduler) - Post scheduler for static sites

  Show DEMO

2. [Zero friction inline content editing](https://jekyll-anon.surge.sh/gods/2015/02/18/vesta.html)

  Show DEMO

3. [Byword](https://bywordapp.com/) & [Typora](https://typora.io/) - Good Editors

4. [Monodraw](https://monodraw.helftone.com/) - Flow charts for days

6. [Kap](https://getkap.co/) - Make gifs

4. [IDE markdown preview](https://atom.io/packages/markdown-preview)

5. Stuck on WordPress? Try [easy-markdown plugin](https://github.com/DavidWells/easy-markdown)

---

## How Serverless uses markdown

Serverless.com is comprised of 3 separate repositories

- https://github.com/serverless/blog
- https://github.com/serverless/serverless | Shoutout to [Phenomic.io](https://phenomic.io/)
- https://github.com/serverless/site

**Why multiple repos?**

1. We wanted documentation about the framework to live in the serverless github repo for easy access
2. We wanted our blog content to be easily portable to any static site generator separate from the implementation (site)
3. `prebuild` npm script pulls the content together & processes them for site build

A single repo is easier to manage but harder for people to find/edit/PR content.

---

### DEMO

- Site structure
- Serverless build process
- [Validation](https://github.com/serverless/blog/blob/master/.travis.yml#L10)
- [Editing Flow](https://serverless.com/framework/docs/providers/aws/cli-reference/deploy/)
- Github optimizations
  - [Link from top of each doc to live link on site](https://github.com/serverless/serverless/blob/master/docs/providers/aws/events/schedule.md)
  - use markdown magic =) to [auto generate tables](https://github.com/serverless/examples) etc
  - [Hide yaml frontmatter from github folks](https://github.com/serverless/serverless/blame/master/docs/providers/aws/events/schedule.md#L1-L7)
  - consider linking everything to site

## Other Markdown Resources

- [Extended markdown syntax](https://www.markdownguide.org/extended-syntax/)
- [Markdown snippets](https://github.com/markdown-templates/markdown-snippets)
- [Verb](https://www.npmjs.com/package/verb) - Documentation generator for GitHub projects
- [ACSII docs](http://asciidoctor.org/) - Markdown alternative
- [Markdown parser performance comparison](https://github.com/Expensify/App/issues/3983#issue-942245008)
- [Handy markdown templates](https://github.com/G3root/readme-generator/blob/9219c5ee638f3b8ff429c5b514d4d211661ae136/src/data/project-block-list.ts)
