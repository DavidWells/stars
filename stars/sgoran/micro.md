---
repo: sgoran/micro
url: 'https://github.com/sgoran/micro'
homepage: 'http://micro-js.com'
starredAt: '2016-11-30T16:54:16Z'
createdAt: '2016-10-24T12:35:57Z'
updatedAt: '2023-02-25T12:22:59Z'
language: JavaScript
license: MIT
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:52.864Z'
description: Small client side router and tpl library
tags:
  - frontend
  - javascript
  - spa
---

Micro client side Single Page Library: http://micro-js.com
Goal is to use it fast to improve UX and fragment your application without need to learn Angular, React etc.

## Installing

    $ npm install micro-spa

    or by embedding directly on page

    <script src="https://unpkg.com/micro-spa@latest"></script>

## Running examples

  To run examples do the following to install dev dependencies and run the example express server:

    $ git clone https://github.com/sgoran/micro.git
    $ cd micro/examples/blog
    $ npm install
    $ cd micro/examples/blog
    $ npm start
    $ open http://localhost:8080

## Simple API

```javascript
  new Micro({
            config: {
                container: '#app',
                tplDir: '/tpl',
                enterAnimation: 'fadeIn'
            },
            router: [{
                match: '/',
                title: 'Home Page',
                src: "home.html"
            },{
                match: '/example',
                title: 'Example Page',
                src: "examples.html"
            }]
        });

    
