---
repo: charliegerard/whereami.js
url: 'https://github.com/charliegerard/whereami.js'
homepage: ''
starredAt: '2022-02-18T06:21:14Z'
createdAt: '2021-01-23T22:30:23Z'
updatedAt: '2024-11-07T04:17:25Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 361
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:19.071Z'
description: "Node.js module to predict indoor location using machine learning and WiFi information \U0001F4F6"
tags:
  - javascript
  - machine-learning
  - nodejs
  - tensorflowjs
  - tfjs
  - wifi
---

# whereami.js

_(Side project not intended to be used in production applications)_

Node.js module to predict indoor location using machine learning and wifi information.

_Inspired by the Python module [whereami](https://github.com/kootenpv/whereami) by [kootenpv](https://github.com/kootenpv)_

Built using [node-wifi](https://github.com/friedrith/node-wifi) and [random-forest-classifier](https://www.npmjs.com/package/random-forest-classifier)

## How to use

### Install

```javascript
npm install whereami.js
```

### Record data

In each room you'd like to use, record data by using the command `whereamijs learn <room>`.

Example:

```javascript
whereamijs learn kitchen // or -l kitchen
```

The output of running this command will be a JSON file saved in a `whereamijs-data` folder with the wifi info.

**This command takes a few seconds to get wifi data and save it**

### Predict

After recording training data with the `learn` command, run the `predict` command to get the room predicted from live data.

```javascript
whereamijs predict // or -p
```

### List rooms

You can list the rooms you already have data for, using the `rooms` or `-r` command.

```javascript
whereamijs rooms // or -r
```

## Applications

Here are some ideas of what it could be used for:

- IoT: Turn on/off lights based on which room you're in.
- Pause TV when leaving a room.
- Block notifications when in the bedroom.

## Run/develop locally

Clone this repo, `cd` into it and run `node server.js learn <room>` or `node.js server predict`.
