---
repo: eknuth/redux-devtools-bubbles-monitor
url: 'https://github.com/eknuth/redux-devtools-bubbles-monitor'
homepage: 'http://eknuth.github.io/redux-devtools-bubbles-monitor/'
starredAt: '2016-10-07T21:46:13Z'
createdAt: '2015-11-04T07:21:12Z'
updatedAt: '2021-01-28T10:01:31Z'
language: JavaScript
license: MIT
branch: master
stars: 39
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:18.688Z'
description: An unobtrusive monitor for Redux DevTools.
tags: []
---

Redux DevTools Log Monitor
=========================

An unobtrusive monitor for [Redux DevTools](https://github.com/gaearon/redux-devtools). Depends on toastr and jquery (sorry, it was easy!)

[Monitor Demo](http://eknuth.github.io/redux-devtools-bubbles-monitor/)

## Behavior
Redux actions are displayed as they are dispacted. The type of the action is shown along with the payload and other properties of the action. If an object is nested, only the top level keys are shown.

### Types of notifications
[Error actions](https://github.com/acdlite/flux-standard-action#errors-as-a-first-class-concept) are shown as red alert notifications. Redux internal actions, including those from [redux router](https://github.com/rackt/redux-router) are shown as blue info notifications.

### Flux standard actions
A warning is shown if the action does not match the [flux standard action](https://github.com/acdlite/flux-standard-action) specification.

![](http://imgur.com/KSxngwN.gif)

## Setup
### NPM
Install the npm module.
```
npm install --save-dev redux-devtools-bubbles-monitor
```
Include the component with the usual DevTools setup.
### JSX
The monitor respects the state of visibleOnLoad from the DevTools component props. If visibleOnLoad is true, notifications will appear when the DebugPanel component is mounted. <strong>Ctrl-h</strong> will toggle the notification state of the monitor.
```javascript
import BubblesMonitor from 'redux-devtools-bubbles-monitor'
// requires webpack css loader or just include from cdn
require('redux-devtools-bubbles-monitor/lib/toastr.min.css')
<DebugPanel top right bottom>
  <DevTools store={store}
            monitor={BubblesMonitor}
            visibleOnLoad={true} />
</DebugPanel>

```
### CSS
If you aren't using the webpack css loader you can include the css for toastr from cdn.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
```
### License

MIT
