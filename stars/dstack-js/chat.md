---
repo: dstack-js/chat
url: 'https://github.com/dstack-js/chat'
homepage: 'https://dstack.dev/blog/peerchat/'
starredAt: '2022-03-23T02:50:04Z'
createdAt: '2022-01-28T02:01:56Z'
updatedAt: '2024-05-30T11:58:29Z'
language: TypeScript
license: GPL-3.0
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:54.341Z'
description: >-
  Zero configuration peer-to-peer terminal chat with built-in end-to-end
  encryption working on DStack
tags:
  - blessed
  - chat
  - cli
  - dstack
  - ipfs
  - libp2p
  - peer-to-peer
  - terminal
---

Peerchat
===============

Zero configuration peer-to-peer terminal chat with built-in end-to-end encryption working on [DStack](https://github.com/dstack-js/dstack)

[Checkout blog post for more info](https://dstack.dev/blog/peerchat)

[![asciicast](https://asciinema.org/a/465056.svg)](https://asciinema.org/a/465056)
[![dstack](https://dstack.dev/img/badge.svg)](https://dstack.dev)
[![Version](https://img.shields.io/npm/v/peerchat.svg)](https://npmjs.org/package/peerchat)
[![Downloads/week](https://img.shields.io/npm/dw/peerchat.svg)](https://npmjs.org/package/peerchat)
[![License](https://img.shields.io/npm/l/peerchat.svg)](https://github.com/dstack-js/chat/blob/master/package.json)

# Installing

```console
npm i -g peerchat
yarn global add peerchat
```

---

<!-- toc -->
* [Installing](#installing)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g peerchat
$ peerchat COMMAND
running command...
$ peerchat (-v|--version|version)
peerchat/0.1.5 darwin-arm64 node-v17.7.2
$ peerchat --help [COMMAND]
USAGE
  $ peerchat COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`peerchat [ROOM] [NICKNAME]`](#peerchat-room-nickname)
* [`peerchat discord [ROOM]`](#peerchat-discord-room)
* [`peerchat help [COMMAND]`](#peerchat-help-command)

## `peerchat [ROOM] [NICKNAME]`

Peer-to-peer terminal chat running on DStack

```
USAGE
  $ peerchat [ROOM] [NICKNAME]

ARGUMENTS
  ROOM      [default: dstack] chat room
  NICKNAME  your nickname

OPTIONS
  -v, --version  show CLI version

EXAMPLES
  $ peerchat
  $ peerchat [ROOM] [NICKNAME]
  $ peerchat dstack myCoolNickname
```

_See code: [src/commands/index.ts](https://github.com/dstack-js/chat/blob/v0.1.5/src/commands/index.ts)_

## `peerchat discord [ROOM]`

Peerchat/Discord relay

```
USAGE
  $ peerchat discord [ROOM]

ARGUMENTS
  ROOM  [default: dstack] chat room

OPTIONS
  -v, --version  show CLI version

EXAMPLES
  $ CHANNEL_ID="<discord channel id>" DISCORD_KEY="<discord bot token>" peerchat discord
  $ CHANNEL_ID="<discord channel id>" DISCORD_KEY="<discord bot token>" peerchat discord [ROOM]
  $ CHANNEL_ID="<discord channel id>" DISCORD_KEY="<discord bot token>" peerchat discord dstack
```

_See code: [src/commands/discord/index.ts](https://github.com/dstack-js/chat/blob/v0.1.5/src/commands/discord/index.ts)_

## `peerchat help [COMMAND]`

Display help for peerchat.

```
USAGE
  $ peerchat help [COMMAND]

ARGUMENTS
  COMMAND  Command to show help for.

OPTIONS
  -n, --nested-commands  Include all nested commands in the output.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_
<!-- commandsstop -->
