---
repo: AnswerDotAI/web2md-ext
url: 'https://github.com/AnswerDotAI/web2md-ext'
homepage: ''
starredAt: '2025-01-27T06:44:26Z'
createdAt: '2024-11-09T06:48:37Z'
updatedAt: '2025-02-20T19:36:22Z'
language: JavaScript
license: NA
branch: main
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:09.550Z'
description: Get a markdown version of any webpage with a keyboard shortcut.
tags: []
---

<H1>Web2Md Chrome Extension <img src="icon.png" width="24" /></H1>

Get a markdown version of any webpage with a keyboard shortcut.[^1]

## Installation

Follow [these steps](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) to load an unpacked extension.  Select the root of this repository as the extension directory.

## Usage

1. Open a webpage
2. Press `Ctrl+Shift+O` (or `Cmd+Shift+O` on macOS) to trigger the extension
3. The contents of the page will be converted to markdown and copied to your clipboard

You will get a notification in the upper right corner of the screen that looks like this:

> <img src="notification.png" width="396" />

## Changing The Keyboard Shortcut

To change the keyboard shortcut, open Chrome's extensions page, click on the "Manage" button for this extension, click on "Keyboard shortcuts", and change the shortcut from "Ctrl+Shift+O" to whatever you'd like.

You can also modify the `manifest.json` file to change the shortcut.  Look for the `commands` section.

## Demo

This is a demo of the extension in action:

https://github.com/user-attachments/assets/ddf1e48b-30e0-4d6b-a77a-8354d1ddf9c9

[^1]: Uses [web2md.answer.ai](https://web2md.answer.ai) to convert the contents of the current page to markdown.
