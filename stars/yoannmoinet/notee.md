---
repo: yoannmoinet/notee
url: 'https://github.com/yoannmoinet/notee'
homepage: null
starredAt: '2020-02-22T23:39:02Z'
createdAt: '2020-02-02T19:41:38Z'
updatedAt: '2024-08-14T02:51:57Z'
language: JavaScript
license: NA
branch: master
stars: 51
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:04.476Z'
description: Get a notification after a long command.
tags: []
---

# Notee
Be notified at the end of long running commands.

[![npm](https://img.shields.io/npm/v/notee.svg)](https://npmjs.org/package/notee)
[![npm](https://img.shields.io/npm/dm/notee.svg)](https://npmjs.org/package/notee)

![Notee yarn install](/assets/notee.gif)

## How to install

- **Homebrew**
```bash
brew install yoannmoinet/brews/notee
```

- **Yarn v1**
```bash
yarn global add notee
```

- **NPM**
```bash
npm install -g notee
```

## How to use

Simply prefix your commands with `n` to get a notification once it completes.

```bash
n git clone git@github.com:yoannmoinet/notee.git
```

## Wishlist

Stuff that I don't know how to implement but would love to see in Notee.

- [ ] waiting for input

Being able to detect when the child process is waiting for an input, we could
proxy this input to the notification.
- [ ] out of focus

If we could detect when the terminal is out of focus, we could choose to show
or not the notification.
