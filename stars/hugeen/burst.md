---
repo: hugeen/burst
url: 'https://github.com/hugeen/burst'
homepage: 'http://hugeen.github.io/burst/'
starredAt: '2018-10-12T02:36:38Z'
createdAt: '2014-11-21T17:20:30Z'
updatedAt: '2024-01-28T08:05:55Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:11.489Z'
description: ES6 Toolbox - Simplicity & Minimalism
tags: []
---

[![Build](https://api.travis-ci.org/hugeen/burst.svg)](https://travis-ci.org/hugeen/burst)
[![Join the chat at https://gitter.im/hugeen/Burst](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hugeen/Burst?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Burst](logo.png?1)

Attempt to harmonize the different components of modern JavaScript environments (using **ES6**).

**burst** is a collection of libraries to build bigger things, such as applications or games.

Each library is designed to be usable stand-alone or with few dependencies.


## Quick start

Installation

````
npm install --save burstem
````


Usage

````
import {on, emit} from 'burstem/core/event'
````


Test

````
npm run gulp build:tests
npm run testem
````


Test (CI)

````
npm run gulp
````


## Main themes

* **DOM** (Manipulation, Traversing, Events, Utils)
* **Timers** (Request Animation Frame, Timeout, Interval)
* **Data Transports** (HTTP, WebSockets, WebRTC, DOM)
* **Inputs** (Mouse, Keyboard, Mobile, Gamepad)
* **Storage** (LocalStorage, IndexedDB)
* **Rendering** (HTML/CSS, Canvas2D, WebGL, SVG)
* **Parallelization** (WebWorker)
* **Media** (Img, Audio, Video)
* **File Manipulation** (File API)
* **Device APIs** (Ambient Light Sensor, Battery Status, Geolocation, Pointer Lock, Proximity, Device Orientation, Screen Orientation, Vibration)
