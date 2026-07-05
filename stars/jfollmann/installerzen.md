---
repo: jfollmann/installerzen
url: 'https://github.com/jfollmann/installerzen'
homepage: ''
starredAt: '2022-03-11T22:43:34Z'
createdAt: '2020-05-07T22:37:13Z'
updatedAt: '2022-05-05T15:23:39Z'
language: Shell
license: NA
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:00.712Z'
description: "\U0001F468‍\U0001F4BB Install applications on linux with one command in less than 30 seconds."
tags: []
---

# Welcome to installerzen CLI 👑

<!-- AUTO-GENERATED-CONTENT:START (versionBadge:color=blue) -->
[![npm](https://img.shields.io/badge/npm-v1.0.17-blue.svg)](https://www.npmjs.com/package/installerzen)
<!-- AUTO-GENERATED-CONTENT:END -->
![CI](https://github.com/jfollmann/installerzen/workflows/CI/badge.svg)

With `installerzen` you can perfom the installation of many of main applications in just one simple and easy-to-use program!

Install applications on linux with one command in less than 30 seconds..

## Table of Contents
<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Install CLI](#install-cli)
- [Usage](#usage)
- [CLI in action](#cli-in-action)
- [Supported apps (by now)](#supported-apps-by-now)
- [Contribute](#contribute)
- [List of dependencies](#list-of-dependencies)
- [Show your support](#show-your-support)
<!-- AUTO-GENERATED-CONTENT:END -->

## Install CLI
```sh
npm i -g installerzen
```

## Usage
Commands supported:
```
Usage: installerzen [options]

Options:
  -t, --interactive               Interactive mode (default: false)
  -l, --list                      List applications
  -g, --generate <appsToInstall>  Install applications - separate by comma and
                                  without spaces. (eg: -f wget,curl)
  -f, --filename <filename>       File name to generate script (default:
                                  "install.sh")
  -v, --version                   Application version
  -h, --help                      display help for command
```
## CLI in action
![Use](https://github.com/jfollmann/installerzen/blob/main/docs/installerzen-demo.gif?raw=true)

## Supported apps (by now)
<!-- AUTO-GENERATED-CONTENT:START (dirTree:dir=./src/apps/sh&depth=1) -->
```
sh/
├── 7zip.sh
├── atom.sh
├── authy.sh
├── aws-cli.sh
├── az-cli.sh
├── beekeeperstudio.sh
├── beyond-compare.sh
├── bitwarden.sh
├── brackets.sh
├── brave.sh
├── cheese.sh
├── chrome.sh
├── chromium.sh
├── ctop.sh
├── curl.sh
├── dbeaver.sh
├── discord.sh
├── docker-compose.sh
├── docker.sh
├── dropbox.sh
├── figma.sh
├── firefox-dev.sh
├── fonts-firacode.sh
├── fonts-hack.sh
├── gimp.sh
├── git-lfs.sh
├── git.sh
├── gitkraken.sh
├── go.sh
├── googledriver.sh
├── helm.sh
├── heroku-cli.sh
├── hub-cli.sh
├── insomnia.sh
├── libre-office.sh
├── notepad++.sh
├── notion.sh
├── nvm.sh
├── obs-studio.sh
├── ohmyzsh.sh
├── peek.sh
├── postgresql.sh
├── postman.sh
├── redis-desktop-manager.sh
├── remmina.sh
├── robo3t.sh
├── skype.sh
├── slack.sh
├── spotify.sh
├── sublime.sh
├── terminator.sh
├── tmux.sh
├── transmission.sh
├── tree.sh
├── twitch.sh
├── vim.sh
├── vlc.sh
├── vscode.sh
├── wget.sh
└── yarn.sh
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Contribute
If your programs are not supported, it would be great if you sent me a pull request with implementation.

## List of dependencies
<!-- AUTO-GENERATED-CONTENT:START (dependencyTable:dev=false&production=true) -->
| **Dependency** | **Description** | **Version** | **License** | **Type** |
| -------------- | --------------- | ----------- | ----------- | -------- |
 | [chalk@^4.0.0](https://github.com/chalk/chalk) | Terminal string styling done right | 4.1.2 | MIT | production | 
 | [commander@^5.1.0](https://github.com/tj/commander.js) | the complete solution for node.js command-line programs | 5.1.0 | MIT | production | 
 | [figlet@^1.3.0](https://github.com/patorjk/figlet.js) | Creates ASCII Art from text. A full implementation of the FIGfont spec. | 1.5.2 | MIT | production | 
 | [inquirer@~7.1.0](https://github.com/SBoudrias/Inquirer.js) | A collection of common interactive command line user interfaces. | 7.1.0 | MIT | production | 
<!-- AUTO-GENERATED-CONTENT:END -->

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
