---
repo: Lete114/page-load-progress
url: 'https://github.com/Lete114/page-load-progress'
homepage: 'https://lete114.github.io/page-load-progress/test/index.html'
starredAt: '2023-05-14T19:14:11Z'
createdAt: '2023-04-06T12:26:44Z'
updatedAt: '2024-04-18T13:35:26Z'
language: JavaScript
license: NA
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:49.893Z'
description: Listening to hyperlink loading progress
tags:
  - hyperlink
  - listen
  - load
  - loader
  - page
  - prefetch
  - preload
  - progress
  - progress-bar
---

# Page-Load-Progress

Let traditional ordinary websites have page loading progress when clicking a tag to jump pages

> [preview demo](https://lete114.github.io/page-load-progress/test/index.html)

## Installation

Add [page-load-progress.js](https://cdn.jsdelivr.net/npm/page-load-progress/page-load-progress.min.js) to your project.

```html
<script src="https://cdn.jsdelivr.net/npm/page-load-progress/page-load-progress.min.js"></script>
```

Or

```bash
npm install page-load-progress
```

## Basic usage

Just listen to `progress:start` and `progress:end` to control the progress

```js
// Triggered when the a tag on the page is clicked
document.addEventListener('progress:start', () => {
  console.log('start')
})

// Triggered when the html file for the a tag is loaded
document.addEventListener('progress:end', () => {
  console.log('end')
})

// Triggered when the html file of the a tag is loaded incorrectly
document.addEventListener('progress:error', () => {
  console.log('error')
})

// When you need to filter some links that don't need a progress bar
pageLoadProgress({ ignoreKeywords: ['/logout'] })

// default: 500ms
// Delay the execution of the page jump when the `progress:end` event is triggered (used to wait for the progress bar to reach 100% animation effect)
pageLoadProgress({ defer: 500 })
```

## Add progress bar

Use [NProgress.js](https://github.com/rstacruz/nprogress/)

```js
// Triggered when the a tag on the page is clicked
document.addEventListener('progress:start', () => {
  NProgress.start()
})

// Triggered when the html file for the a tag is loaded
document.addEventListener('progress:end', () => {
  NProgress.done()
})
```

Here's a simple example of a progress bar

```js
!(function () {
  var style = document.createElement('style')
  style.textContent = `
    .__progress__ {
        top: 0; 
        left: 0;
        position: fixed;
        width: 10%;
        height: 2px;
        z-index: 103;
        background-color: #e58a8a;
        transition: width 0.4s ease 0s;
    }`
  document.head.appendChild(style)

  var timer = null
  document.addEventListener('progress:start', () => {
    var progress = 10
    var div = document.createElement('div')
    div.className = '__progress__'
    document.body.prepend(div)
    var max = 10,
      mini = 3
    var result = max - mini
    timer = setInterval(function () {
      var num = parseInt(Math.random() * result)
      var randomResult = num + mini
      progress += randomResult
      if (progress > 95) progress = 95
      div.style.width = progress + '%'
    }, 500)
  })

  document.addEventListener('progress:end', () => {
    clearInterval(timer)
    var progress = document.querySelector('.__progress__')
    if (progress) progress.style.width = '100%'
    setTimeout(() => {
      progress.parentElement.removeChild(progress)
    }, 500)
  })
})()
```
