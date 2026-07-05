---
repo: mb21/panwriter
url: 'https://github.com/mb21/panwriter'
homepage: 'https://PanWriter.com'
starredAt: '2022-01-27T01:44:42Z'
createdAt: '2018-11-03T14:42:43Z'
updatedAt: '2025-02-25T12:59:41Z'
language: TypeScript
license: GPL-3.0
branch: master
stars: 1101
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.652Z'
description: Markdown editor with pandoc integration and paginated preview.
tags:
  - editor
  - electron
  - markdown
  - markdown-converter
  - markdown-editor
  - pandoc
  - pandoc-ui
  - react
---

<img src="icons/icon.png" align="right" width="128">

# PanWriter

PanWriter is a distraction-free markdown editor with two unique features:

1. Tight integration with pandoc for import/export to/from plenty of file formats (including HTML, docx, LaTeX and EPUB).
2. Preview pane that can show pages – including page breaks etc. Layout adjustments are immediately reflected in the preview.

Read the **[MANUAL](https://www.panwriter.com/MANUAL.html)** for more info.

**[Download PanWriter](https://www.panwriter.com)**

- You also have to [install pandoc](https://pandoc.org/installing.html) to export to most formats.
- If you're on macOS, see this [thread on how to bypass the security warning](https://github.com/mb21/panwriter/issues/33#issuecomment-2354944902).

![](screenshot.png)

Feedback, suggestions and contributions very much welcome! Please open an issue to start a conversation.


## Develop

Install git (if you haven't already) and [install Volta](https://docs.volta.sh/guide/getting-started) (which will make the correct Node.js and npm versions availlable in the project directory), then:

    git clone git@github.com:mb21/panwriter.git
    cd panwriter
    npm ci

    ## To run the app in development mode:
    npm run electron:dev

    ## To build distributable app package (goes to ./dist):
    npm dist

Check out the `package.json` for more scripts to run.


## Powered by

PanWriter is powered by (amongst other open source libraries):

- [pandoc](http://pandoc.org) (import/export)
- [Electron](https://electronjs.org) (app framework)
- [CodeMirror](https://codemirror.net) (editor)
- For the preview pane:
    - [pagedjs](https://gitlab.pagedmedia.org/tools/pagedjs)
    - [markdown-it](https://github.com/markdown-it/markdown-it#markdown-it)
    - [KaTeX](https://katex.org)
