---
repo: cristiantela/iframessa
url: 'https://github.com/cristiantela/iframessa'
homepage: 'https://www.npmjs.com/package/iframessa'
starredAt: '2021-12-01T06:50:35Z'
createdAt: '2021-10-28T03:20:47Z'
updatedAt: '2024-05-17T14:13:16Z'
language: JavaScript
license: NA
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:32.374Z'
description: Communicate between iframes and application
tags:
  - communication-with-iframe
  - iframes
  - micro-frontend
  - postmessage
---

# iframessa

Package to communicate between iframes and application.

## Install

```
npm install iframessa
```

## Usage examples

### Case 1: You would like to receive the logged user name from your web application into your iframe.

#### 1. Create a getter on your parent window

```html
<iframe src="about.html" name="about"></iframe>
```

```javascript
const iframessa = require('iframessa');

iframessa.getter('userName', ({ data, sender }) => {
  return 'Matheus Cristian';
});
```

#### 2. Call the getter on your child window

```javascript
const iframessa = require('iframessa');

iframessa.register('about');

iframessa.get('userName').then(({ data, sender }) => {
  console.log(data); // Matheus Cristian
  console.log(sender); // parent object
}, data);
```

### Case 2: You would like to emit an event with a data from your child window to your parent

#### 1. Emit a message to your parent window from your iframe

```javascript
const iframessa = require('iframessa');

iframessa.emit('action', 'logout');
```

This will emit a `'action'` event to your parent with the data `'logout'`.
Note that the data can be an object as well.

#### 2. Make your parent watch the `'action'` event

```javascript
const iframessa = require('iframessa');

iframessa.on('action', ({ data, sender }) => {
  console.log(data); // logout
});
```

You can emit something to a specific child window with `iframessa.modules.about.emit(event, data);`
