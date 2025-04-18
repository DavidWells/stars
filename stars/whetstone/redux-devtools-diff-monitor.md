---
repo: whetstone/redux-devtools-diff-monitor
url: 'https://github.com/whetstone/redux-devtools-diff-monitor'
homepage: 'https://www.npmjs.com/redux-devtools-diff-monitor'
starredAt: '2015-08-06T22:39:37Z'
createdAt: '2015-08-03T17:43:15Z'
updatedAt: '2022-02-21T12:11:53Z'
language: JavaScript
license: NA
branch: master
stars: 176
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:38.863Z'
description: null
tags: []
---

# Redux DevTools – Diff Monitor

[![build status](https://img.shields.io/travis/whetstone/redux-devtools-diff-monitor.svg?style=flat-square)](http://travis-ci.org/whetstone/redux-devtools-diff-monitor)
[![npm version](https://img.shields.io/npm/v/redux-devtools-diff-monitor.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools-diff-monitor)
[![npm downloads](https://img.shields.io/npm/dm/redux-devtools-diff-monitor.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools-diff-monitor)

5.0 has been released with support for React 15. It contains other improvements to performance (such as calculating diff only when an action is expanded) and some cosmetic changes.

This project provides an alternate monitor for Redux DevTools. The primary goal of this monitor is to highlight the 
changes to an application's state from action to action. This tool includes the main features from the default DevTools 
monitor (rollback, commit, reset and individual action toggles).

![Imgur](http://i.imgur.com/rvCR9OQ.png)

### Installation Examples

See the Redux Devtools [documentation](https://github.com/gaearon/redux-devtools#create-a-devtools-component)
for full details about how to use monitors.

#### Standalone Monitor

To use Diff Monitor by itself along with Redux Devtools, simply pass it to the `createDevTools` function directly.

Install from npm: `npm install --save-dev redux-devtools redux-devtools-diff-monitor`

```javascript
import React from 'react';
import { createDevTools } from 'redux-devtools';
import DiffMonitor from 'redux-devtools-diff-monitor';

export default createDevTools(
  <DiffMonitor />
);
```

#### Using DockMonitor

The [DockMonitor](https://github.com/gaearon/redux-devtools-dock-monitor) component provides common docking
functionality that makes monitors easier to work with. See the 
[documentation](https://github.com/gaearon/redux-devtools-dock-monitor#readme) for additional details.

Install from npm: `npm install --save-dev redux-devtools-dock-monitor redux-devtools-diff-monitor`

```javascript
import React from 'react';
import { createDevTools } from 'redux-devtools';
import DiffMonitor from 'redux-devtools-diff-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
    >
        <DiffMonitor theme='tomorrow' />
    </DockMonitor>
);
```

### Usage

- New actions appear at the top of the monitor as they occur.
- Actions will be minimized by default; actions shown in green are causing a state mutation.
- Click an action name to expand its pane to view the state mutations the action caused.
- Click "disable" next to any action name to ignore that action and roll back the state mutations that action caused.
- As in the default Redux DevTools, click 'Commit' to reset the monitor and set the current app state as the rollback 
point. If you click rollback after clicking commit, actions will be replayed through the commit point.
