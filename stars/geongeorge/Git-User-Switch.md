---
repo: geongeorge/Git-User-Switch
url: 'https://github.com/geongeorge/Git-User-Switch'
homepage: ''
starredAt: '2020-11-18T23:27:19Z'
createdAt: '2020-11-12T09:48:25Z'
updatedAt: '2025-02-06T14:36:17Z'
language: JavaScript
license: MIT
branch: master
stars: 639
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:22.938Z'
description: Switch git user and email with ease
tags: []
---

# Git User Switch

Switch git user, email and signingKey at ease.

<img src="https://thumbs.gfycat.com/OfficialLiveImago-size_restricted.gif">


### Install

```
npm i -g git-user-switch
```

### Usage

```
Usage: git-user [options]

Switch git users quickly. Switches locally by default

Options:
  -V, --version  output the version number
  -g, --global   Switch global git user
  -d, --delete   Delete a git user from the listing
  -r, --reset    Deletes all data and resets
  -h, --help     display help for command
```


### Troubleshoot

In case this messes up any of your git configs because of bad input.
Just edit:

*Global* : `~/.gitconfig`
*Local Project* : `project/.git/config`

```
[user]
	email = geongeorgexyz@gmail.com
	name = Geon George
```

You can additionally reset the cli data store by running:

```sh
git-user -r
```
