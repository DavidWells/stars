---
repo: terminal-junkies/npmx
url: 'https://github.com/terminal-junkies/npmx'
homepage: ''
starredAt: '2020-10-11T03:36:54Z'
createdAt: '2020-09-30T02:00:36Z'
updatedAt: '2025-02-04T09:41:28Z'
language: JavaScript
license: MIT
branch: master
stars: 122
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:27.277Z'
description: Advanced CLI for npm
tags:
  - blessed
  - cli
  - command-line
  - npm
  - terminal
---

# npmx

![Build and Deploy](https://github.com/terminal-junkies/npmx/workflows/Build%20and%20Deploy/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](http://img.shields.io/npm/v/@terminal-junkies/npmx.svg?style=flat)](https://npmjs.org/package/@terminal-junkies/npmx "View this project on npm")

An advanced CLI interface for [npm](npmjs.com)

Features:
- Search packages from the terminal
- Run your project tasks from
- Install a selected package with one keystroke
- Run other npm tasks within your project
- Mnemonic key-bindings for installing packages


## Install

```
npm install --global @terminal-junkies/npmx
```

## Usage

```
npmx
```

## Color Schemes
The CLI can use a different color scheme other than the default one. Please set the `theme` value to any 
one of the themes from [blessed-themes](https://github.com/blessedjs/blessed-themes) in your config file at `~/.config/.npmx.json`
The Default theme used is `Dracula`. The config file will be automatically created on the first time of invoking the CLI, if not you can also create manually in the below format.

```json
{
  "theme": "Dracula"
}
```

## Screenshots

[![asciicast](https://asciinema.org/a/7ajz46JAVDVR9nV5ZMwhLLzAT.svg)](https://asciinema.org/a/7ajz46JAVDVR9nV5ZMwhLLzAT)

### Home
![home page](screenshots/home.png)

### Dependency Info
![dep info ](screenshots/dep-info.png)

### Search
![search page](screenshots/search.png)

### Package
![package page](screenshots/package.png)

## FAQS

### How do I quit this thing?
You can press `q` to quit the program at any time.

### How do I scroll the package readme?
You can use `up` and `down` arrow keys to scroll. And you can also make use of vim navigation keys like `j,k,gg,G` to scroll.

### How do I close the Dependency Info popup?
Press `Esc` to close the popup.

### How can I see the keyboard shortcuts?
The keyboard shortcuts will be displayed at the bottom of the screen for each page.

### How do I close the project task terminal after the task is completed?
Press `Esc` to close the terminal window for project tasks.

### Does it support vi/vim navigation keys in the lists?
Yes. You can use j,k,gg,G,l and /
