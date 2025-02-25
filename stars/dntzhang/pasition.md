---
repo: dntzhang/pasition
url: 'https://github.com/dntzhang/pasition'
homepage: 'https://dntzhang.github.io/pasition/'
starredAt: '2017-10-29T06:31:01Z'
createdAt: '2017-06-14T04:51:25Z'
updatedAt: '2025-02-19T02:44:20Z'
language: JavaScript
license: NA
branch: master
stars: 1216
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:36.749Z'
description: 'Path Transition with little JS code, render to anywhere - 轻量级 Path 过渡库，渲染到任何地方'
tags:
  - canvas
  - pasition
  - path
  - svg
---


<p align="center">
  <a href ="##"><img alt="pasition" src="http://images2015.cnblogs.com/blog/105416/201706/105416-20170620094820476-131210795.gif"></a><a href ="##"><img alt="pasition" src="http://images2015.cnblogs.com/blog/105416/201706/105416-20170620094817554-48316107.gif"></a>
</p>
<h3 align="center">
Pasition - Path Transition with little JS code, render to anywhere.
</h3>

---

## [中文 README](https://github.com/dntzhang/pasition/blob/master/docs/release.md)

## DEMO

* [https://dntzhang.github.io/pasition/](https://dntzhang.github.io/pasition/)

## Install

```
npm install pasition
```

or get js by the cdn address:

[https://unpkg.com/pasition](https://unpkg.com/pasition)

## Usage

```js
pasition.animate({
    from : fromPath,
    to : toPath,
    time : time,
    easing : function(){ },
    begin : function(shapes){ },
    progress : function(shapes, percent){ },
    end : function(shapes){ }
})
```

you can get the path from attr d of svg path element.

Supported All the svg path commands:

```
M/m = moveto
L/l = lineto
H/h = horizontal lineto
V/v = vertical lineto
C/c = curveto
S/s = smooth curveto
A/a = elliptical Arc
Z/z = closepath
Q/q = quadratic Belzier curve
T/t = smooth quadratic Belzier curveto
```

Example:

```js
pasition.animate({
    from: 'M 40 40 Q 60 80 80 40T 120 40 T 160 40 z',
    to: 'M32,0C14.4,0,0,14.4,0,32s14.3,32,32,32 s32-14.3,32-32S49.7,0,32,0z',
    time: 1000,
    easing : function(){ },
    begin:function(shapes){ },
    progress : function(shapes, percent){
        //render you shape to svg or canvas or webgl
    },
    end : function(shapes){ }
});
```

you can get the progressing shapes by `pasition.lerp`:

```js
var shapes  = pasition.lerp(pathA, pathB, 0.5)
//render shapes in canvas ,svg or anywhere you want
...
```

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
