---
repo: gorangajic/react-render-to-json
url: 'https://github.com/gorangajic/react-render-to-json'
homepage: ''
starredAt: '2016-02-10T17:51:12Z'
createdAt: '2015-11-03T21:13:46Z'
updatedAt: '2024-02-23T19:57:22Z'
language: JavaScript
license: NA
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:32.310Z'
description: module to figure out what is passed to this.props.children in react
tags: []
---

# react-render-to-json

> module to figure out what is passed to this.props.children in react

[![Build Status](https://semaphoreci.com/api/v1/gorangajic/react-render-to-json/branches/master/badge.svg)](https://semaphoreci.com/gorangajic/react-render-to-json)

### install

```
npm install react-render-to-json --save
```

### usage example

```javascript
import React from 'react';
import renderToJson from 'react-render-to-json';

class Heart extends React.Component {
    render() {
        return (
            <svg width="24" fill="#00ea00" height="24" viewBox="0 0 24 24">
                <g><path d="M12 10.375c0-2.416-1.959-4.375-4.375-4.375s-4.375 1.959-4.375 4.375c0 1.127.159 2.784 1.75 4.375l7 5.25s5.409-3.659 7-5.25 1.75-3.248 1.75-4.375c0-2.416-1.959-4.375-4.375-4.375s-4.375 1.959-4.375 4.375"/></g>
            </svg>
        );
    }
}

console.log(renderToJSon(<Heart />));

```

```json
{
  "name": "Heart",
  "attributes": {},
  "children": [{
    "name": "svg",
    "attributes": {
      "width": "24",
      "fill": "#00ea00",
      "height": "24",
      "viewBox": "0 0 24 24"
    },
    "children": [{
      "name": "g",
      "attributes": {},
      "children": [{
        "name": "path",
        "attributes": {
          "d": "M12 10.375c0-2.416-1.959-4.375-4.375-4.375s-4.375 1.959-4.375 4.375c0 1.127.159 2.784 1.75 4.375l7 5.25s5.409-3.659 7-5.25 1.75-3.248 1.75-4.375c0-2.416-1.959-4.375-4.375-4.375s-4.375 1.959-4.375 4.375"
        }
      }]
    }]
  }]
}

```

Used by [react-svg-morph](https://github.com/gorangajic/react-svg-morph/)

### Licence

MIT
