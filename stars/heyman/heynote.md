---
repo: heyman/heynote
url: 'https://github.com/heyman/heynote'
homepage: 'https://heynote.com'
starredAt: '2025-01-07T06:07:32Z'
createdAt: '2022-12-28T11:49:43Z'
updatedAt: '2025-02-25T14:48:22Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 4273
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:19.808Z'
description: A dedicated scratchpad for developers
tags:
  - developer-tools
  - editor
  - note-taking
  - notes
  - notes-app
  - productivity-tools
  - scratchpad
---

# Heynote

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/heyman/heynote)](https://github.com/heyman/heynote/releases)
[![Build Status](https://github.com/heyman/heynote/workflows/Tests/badge.svg)](https://github.com/heyman/heynote/actions?query=workflow%3ATests)

<img src="https://heynote.com/img/logo.png" style="width:79px;">

## General Information

- Website: [heynote.com](https://heynote.com)
- Documentation: [heynote.com](https://heynote.com/docs/)
- Changelog: [heynote.com](https://heynote.com/docs/changelog/)

Heynote is a dedicated scratchpad for developers. It functions as a large persistent text buffer where you can write down anything you like. Works great for that Slack message you don't want to accidentally send, a JSON response from an API you're working with, notes from a meeting, your daily to-do list, etc. 

The Heynote buffer is divided into blocks, and each block can have its own Language set (e.g. JavaScript, JSON, Markdown, etc.). This gives you syntax highlighting and lets you auto-format that JSON response.

Available for Mac, Windows, and Linux.

## Features

-   Persistent text buffer
-   Block-based
-   Syntax highlighting:

    C++, C#, Clojure, CSS, Erlang, Dart, Go, Groovy, HTML, Java, JavaScript, JSX, Kotlin, TypeScript, TOML, TSX, JSON, Lezer, Markdown, PHP, Python, Ruby, Rust, Scala, Shell, SQL, Swift, Vue, XML, YAML
    
-   Language auto-detection
-   Auto-formatting
-   Math/Calculator mode
-   Currency conversion
-   Multi-cursor editing
-   Dark & Light themes
-   Option to set a global hotkey to show/hide the app
-   Default or Emacs-like key bindings


## Documentation

[Documentation](https://heynote.com/docs/) is available on the Heynote website.

## Development

To develop Heynote you need Node.js and you should (hopefully) just need to check out the code and then run:

```
> npm install
> npm run dev
```

### Run Tests

To run the tests:

```
> npm run test
```

To run the tests in the Playwright UI:

```
> npm run test:ui
```


### Contributions

I'm happy to merge contributions that fit my vision for the app. Bug fixes are always welcome. 


## FAQ

### Where is the buffer data stored?

See the [documentation](https://heynote.com/docs/#user-content-the-notes-library).

### Can you make a mobile app?

No, at the moment this is out of scope, sorry.

### What are the default keyboard shortcuts?

See the [documentation](https://heynote.com/docs/#user-content-default-key-bindings).

## Thanks!

Heynote is built upon [CodeMirror](https://codemirror.net/), [Vue](https://vuejs.org/), [Electron](https://www.electronjs.org/), [Math.js](https://mathjs.org/), [Prettier](https://prettier.io/) and other great open-source projects.

