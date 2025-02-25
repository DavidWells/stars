---
repo: tcasparro/react-render-visualizer
url: 'https://github.com/tcasparro/react-render-visualizer'
homepage: null
starredAt: '2015-04-18T15:08:34Z'
createdAt: '2015-02-20T21:40:34Z'
updatedAt: '2025-01-05T18:18:49Z'
language: JavaScript
license: MIT
branch: master
stars: 837
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:45.458Z'
description: Render visualizer for ReactJS
tags: []
---

React Render Visualizer
============
A visual way to see what is (re)rendering and why.  

Features
--------
- Shows when component is being mounted or updated by highlighting (red for mount, yellow for update)
- Shows render count for each component instance
- Shows individual render log for each component instance

Installation
------------

```sh
npm install react-render-visualizer
```

Usage
-----
This is a mixin so once you've included the source code, simply mix it in to any react component you want to start monitoring.

E.g.
```js
var ReactRenderVisualizer = require("react-render-visualizer");

app.TodoItem = React.createClass({
    mixins: [ReactRenderVisualizer],
```
Component will show up with a blue border box when being monitored


Demo
----
![demo](https://cloud.githubusercontent.com/assets/3999910/6566152/ba047a42-c673-11e4-9833-1e78de51abc1.gif)
