---
repo: gtanner/qrcode-terminal
url: 'https://github.com/gtanner/qrcode-terminal'
homepage: null
starredAt: '2020-05-19T18:37:30Z'
createdAt: '2013-02-28T01:28:19Z'
updatedAt: '2025-02-16T03:09:09Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 1292
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:51.716Z'
description: 'QRCodes in your terminal, cause thats hot.'
tags: []
---

# QRCode Terminal Edition [![Build Status][travis-ci-img]][travis-ci-url]

> Going where no QRCode has gone before.

![Basic Example][basic-example-img]

# Node Library

## Install

Can be installed with:

    $ npm install qrcode-terminal

and used:

    var qrcode = require('qrcode-terminal');

## Usage

To display some data to the terminal just call:

    qrcode.generate('This will be a QRCode, eh!');

You can even specify the error level (default is 'L'):
    
    qrcode.setErrorLevel('Q');
    qrcode.generate('This will be a QRCode with error level Q!');

If you don't want to display to the terminal but just want to string you can provide a callback:

    qrcode.generate('http://github.com', function (qrcode) {
        console.log(qrcode);
    });

If you want to display small output, provide `opts` with `small`:

    qrcode.generate('This will be a small QRCode, eh!', {small: true});

    qrcode.generate('This will be a small QRCode, eh!', {small: true}, function (qrcode) {
        console.log(qrcode)
    });

# Command-Line

## Install

    $ npm install -g qrcode-terminal

## Usage

    $ qrcode-terminal --help
    $ qrcode-terminal 'http://github.com'
    $ echo 'http://github.com' | qrcode-terminal

# Support

- OS X
- Linux
- Windows

# Server-side

[node-qrcode][node-qrcode-url] is a popular server-side QRCode generator that
renders to a `canvas` object.

# Developing

To setup the development envrionment run `npm install`

To run tests run `npm test`

# Contributers

    Gord Tanner <gtanner@gmail.com>
    Micheal Brooks <michael@michaelbrooks.ca>

[travis-ci-img]: https://travis-ci.org/gtanner/qrcode-terminal.png
[travis-ci-url]: https://travis-ci.org/gtanner/qrcode-terminal
[basic-example-img]: https://raw.github.com/gtanner/qrcode-terminal/master/example/basic.png
[node-qrcode-url]: https://github.com/soldair/node-qrcode

