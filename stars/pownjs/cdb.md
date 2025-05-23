---
repo: pownjs/cdb
url: 'https://github.com/pownjs/cdb'
homepage: ''
starredAt: '2019-06-25T04:51:57Z'
createdAt: '2019-05-16T05:48:00Z'
updatedAt: '2024-08-12T19:48:57Z'
language: JavaScript
license: MIT
branch: master
stars: 73
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:34.671Z'
description: >-
  Automate common Chrome Debug Protocol tasks to help debug web applications
  from the command-line and actively monitor and intercept HTTP requests and
  responses.
tags: []
---

[![Follow on Twitter](https://img.shields.io/twitter/follow/pownjs.svg?logo=twitter)](https://twitter.com/pownjs)
[![NPM](https://img.shields.io/npm/v/@pown/cdb.svg)](https://www.npmjs.com/package/@pown/cdb)
[![Fury](https://img.shields.io/badge/version-2x%20Fury-red.svg)](https://github.com/pownjs/lobby)
[![SecApps](https://img.shields.io/badge/credits-SecApps-black.svg)](https://secapps.com)

# Pown CDB

Pown CDB is a Chrome Debug Protocol utility. The main goal of the tool is to automate common tasks to help debug web applications from the command-line and actively monitor and intercept HTTP requests and responses. This is particularly useful during penetration tests and other types of security assessments and investigations.

| ![screenshot](https://media.githubusercontent.com/media/pownjs/pown-cdb/master/screenshots/01.png) |
|-|

## Credits

This tool is part of [secapps.com](https://secapps.com) open-source initiative.

```
  ___ ___ ___   _   ___ ___  ___
 / __| __/ __| /_\ | _ \ _ \/ __|
 \__ \ _| (__ / _ \|  _/  _/\__ \
 |___/___\___/_/ \_\_| |_|  |___/
  https://secapps.com
```

### Authors

* [@pdp](https://twitter.com/pdp) - https://pdparchitect.github.io/www/

## Quickstart

This tool is meant to be used as part of [Pown.js](https://github.com/pownjs/pown) but it can be invoked separately as an independent tool.

Install Pown first as usual:

```sh
$ npm install -g pown@latest
```

Invoke directly from Pown:

```sh
$ pown cdb
```

### Library Use

Install this module locally from the root of your project:

```sh
$ npm install @pown/cdb --save
```

Once done, invoke pown cli:

```sh
$ POWN_ROOT=. ./node_modules/.bin/pown-cli cdb
```

You can also use the global pown to invoke the tool locally:

```sh
$ POWN_ROOT=. pown cdb
```

## Usage

> **WARNING**: This pown command is currently under development and as a result will be subject to breaking changes.

```
pown cdb <command>

Chrome Debug Protocol Tool

Commands:
  pown cdb launch             Launch server application such as chrome, firefox, opera and edge  [aliases: start]
  pown cdb navigate <url>     Go to the specified url  [aliases: goto, go]
  pown cdb network            Chrome Debug Protocol Network Monitor  [aliases: net, sniff, proxy, mon, monitor]
  pown cdb cookies            Dump current page cookies  [aliases: cookie]
  pown cdb screenshot <file>  Screenshot the current page  [aliases: capture, shoot, shot]

Options:
  --version  Show version number  [boolean]
  --help     Show help  [boolean]
```

### `pown cdb launch`

```
pown cdb launch

Launch server application such as chrome, firefox, opera and edge

Options:
  --version                 Show version number  [boolean]
  --help                    Show help  [boolean]
  --port, -p                Remote debugging port  [number] [default: 9222]
  --xss-auditor, -x         Turn on/off XSS auditor  [boolean] [default: true]
  --certificate-errors, -c  Turn on/off certificate errors  [boolean] [default: true]
  --pentest, -t             Start with prefered settings for pentesting  [boolean] [default: false]
```

### `pown cdb navigate`

```
pown cdb navigate <url>

Go to the specified url

Options:
  --version     Show version number  [boolean]
  --help        Show help  [boolean]
  --host, -H    Remote debugging host  [string] [default: "localhost"]
  --port, -p    Remote debugging port  [number] [default: 9222]
  --secure, -s  HTTPS/WSS frontend  [boolean] [default: false]
```

### `pown cdb network`

```
pown cdb network

Chrome Debug Protocol Network Monitor

Options:
  --version      Show version number  [boolean]
  --help         Show help  [boolean]
  --host, -H     Remote debugging host  [string] [default: "localhost"]
  --port, -p     Remote debugging port  [number] [default: 9222]
  --secure, -s   HTTPS/WSS frontend  [boolean] [default: false]
  --output, -o   Output directory/file  [array] [default: []]
  --blessed, -b  Start with blessed ui  [boolean] [default: false]
```

### `pown cdb cookies`

```
pown cdb cookies

Dump current page cookies

Options:
  --version     Show version number  [boolean]
  --help        Show help  [boolean]
  --host, -H    Remote debugging host  [string] [default: "localhost"]
  --port, -p    Remote debugging port  [number] [default: 9222]
  --secure, -s  HTTPS/WSS frontend  [boolean] [default: false]
```

### `pown cdb screenshot`

```
pown cdb screenshot <file>

Screenshot the current page

Options:
  --version     Show version number  [boolean]
  --help        Show help  [boolean]
  --host, -H    Remote debugging host  [string] [default: "localhost"]
  --port, -p    Remote debugging port  [number] [default: 9222]
  --secure, -s  HTTPS/WSS frontend  [boolean] [default: false]
```

## Tutorials

### Web Application Security Assessment

Let's explore how to use Pown CDB during a typical web app security engagments.

First, ensure that you have the latest pown installed:

```sh
$ npm install -g pown
```

If you have pown installed, make sure you have the latest version:

```sh
$ pown update
```

To get started with Pown CDB we need a Chrome browser instance (other browsers are also supported) with chrome debug remote interface enabled and listening on localhost:

```sh
$ pown cdb launch --port 9333
```

Once the chrome browser instance is running, hook it with pown cdb network utility:

```sh
$ pown cdb network --port 9333 -b
```

The `-b` flag is used to start Pown CDB with a curses-based user interface:

![screenshot](https://media.githubusercontent.com/media/pownjs/pown-cdb/master/screenshots/01.png)

Use key-combo `shift + ?` to get a list of available shortcuts:

![screenshot](https://media.githubusercontent.com/media/pownjs/pown-cdb/master/screenshots/02.png)

As soon as you start using the browser, Pown CDB will record and display the traffic in the user interface. To intercept requests use key-combo `ctrl + t`.

![screenshot](https://media.githubusercontent.com/media/pownjs/pown-cdb/master/screenshots/03.png)

Requests are captured and opened in your default shell editor (`$EDITOR`). Make the desired changes, save and quit. The original request will be replaced with your changes.
