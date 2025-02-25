---
repo: janryWang/react-stikky
url: 'https://github.com/janryWang/react-stikky'
homepage: ''
starredAt: '2018-12-20T02:08:19Z'
createdAt: '2018-05-06T01:37:25Z'
updatedAt: '2023-03-04T04:48:56Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:52.552Z'
description: It's very easy to sticky fixed target element.
tags:
  - react
  - react-sticky
  - sticky
---

# react-stikky

> It's very easy to sticky fixed target element.

### Usage

```jsx
import React from "react"
import ReactDOM from "react-dom"
import Stikky from "react-stikky"

ReactDOM.render(
   <Stikky edge="top" style={{background:"#fff"}}>
      <div>Hello world</div>
   </Stikky>
)

```



### Install

```
npm install --save react-stikky
```

### API

#### `edge : String`

> Choose where you want to sticky.("bottom" | "top")

#### `triggerDistance : Number`

> The distance to trigger the boundary.(default is 0)

#### `zIndex : Number | String`

#### `getStickyBoundary : Function`



### LICENSE

The MIT License (MIT)

Copyright (c) 2018 JanryWang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
