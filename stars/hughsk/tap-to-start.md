---
repo: hughsk/tap-to-start
url: 'https://github.com/hughsk/tap-to-start'
homepage: 'http://hughsk.io/tap-to-start/'
starredAt: '2022-10-16T06:07:11Z'
createdAt: '2016-05-15T09:59:17Z'
updatedAt: '2023-10-11T16:21:58Z'
language: JavaScript
license: MIT
branch: gh-pages
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:22.542Z'
description: null
tags: []
---

# tap-to-start

A simple fullscreen button to prompt the user to tap/click. Useful for audio/video demos, where mobile devices require playback to be triggered in response to user input.

[![](http://i.imgur.com/Xex2wpJ.png)](http://hughsk.io/tap-to-start/)

[**view demo**](http://hughsk.io/tap-to-start/)

## Usage

### `tapToStart(options, done)`

Creates a new `tap-to-start` overlay. Accepts the following options:

* `foreground`: the color of the foreground circle. Defaults to `#000`.
* `background`: the color of the background. Defaults to `transparent`.
* `accent`: the color of the tap icon. Defaults to `background`, or `#fff` if not specified.
* `skip`: if truthy, skip the UI and call `done` in the next frame. Useful if you only want the UI to be visible if user input is required to continue.
* `parent`: optional, defaults to `document.body`. Set the element the button is attached to.
* `icon`: pass in a custom icon as an SVG element. Defaults to the one seen in the demo.

`done` is called when the UI is tapped/clicked and begins to transition out.

``` javascript
const tts = require('tap-to-start')
const audio = document.createElement('audio')

audio.src = 'song.mp3'
audio.load()

tts({
  background: '#000',
  foreground: '#fff'
}, function () {
  audio.play()
})
```

## License

MIT, see [LICENSE.md](LICENSE.md) for details.
