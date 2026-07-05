---
repo: luwes/playerx
url: 'https://github.com/luwes/playerx'
homepage: 'https://dev.playerx.io'
starredAt: '2023-04-12T22:20:13Z'
createdAt: '2020-02-12T15:01:12Z'
updatedAt: '2025-02-05T03:14:17Z'
language: JavaScript
license: NA
branch: main
stars: 112
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:52.302Z'
description: >-
  Media Player Web Component - Uniform Player API - Supports HLS, Dash, Mux,
  Vimeo, YouTube, JW Player, Wistia
tags:
  - dash
  - hls
  - jwplayer
  - mux
  - video
  - vimeo
  - wistia
  - youtube
---

# <a href="https://github.com/luwes/playerx"><img src="https://dev.playerx.io/images/playerx-logo.svg?sanitize=true" height="36" alt="playerx" /></a>

[![NPM Version](https://img.shields.io/npm/v/playerx?style=flat-square&color=informational)](https://www.npmjs.com/package/playerx) 
[![NPM Downloads](https://img.shields.io/npm/dm/playerx?style=flat-square&color=informational&label=npm)](https://www.npmjs.com/package/playerx) 
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/playerx?style=flat-square&color=%23FF5627)](https://www.jsdelivr.com/package/npm/playerx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/playerx?style=flat-square&color=success&label=gzip)](https://bundlephobia.com/result?p=playerx) 

**npm**: `npm i playerx`  
**cdn**: https://cdn.jsdelivr.net/npm/playerx/+esm  

## Features

- 🏄‍♂️ Compatible [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) API
- 🕺 Seamlessly integrates with [Media Chrome](https://github.com/muxinc/media-chrome)


## Usage ([Codesandbox](https://codesandbox.io/s/hello-playerx-22ku4))

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/playerx/+esm"></script>
<player-x src="https://vimeo.com/638369396" controls></player-x>
```

Demo page: [dev.playerx.io/demo](https://dev.playerx.io/demo/)


## Supported media

* Mux videos use the [Mux Player API](https://github.com/muxinc/elements/blob/main/packages/mux-player/REFERENCE.md)
* YouTube videos use the [YouTube iFrame Player API](https://developers.google.com/youtube/iframe_api_reference)
* Vimeo videos use the [Vimeo Player API](https://developer.vimeo.com/player/sdk)
* Wistia videos use the [Wistia Player API](https://wistia.com/doc/player-api)
* JW Player videos use the [JW Player API](https://developer.jwplayer.com/jwplayer/docs/jw8-javascript-api-reference)
* [Supported file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats) are playing using [`<video>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/video) or [`<audio>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) elements
  * HLS streams are played using [`hls.js`](https://github.com/video-dev/hls.js)
  * DASH streams are played using [`dash.js`](https://github.com/Dash-Industry-Forum/dash.js)


## Related

- [Media Chrome](https://github.com/muxinc/media-chrome) Your media player's dancing suit. 🕺
- [`media-group`](https://github.com/luwes/media-group) Sync and control multiple audio and/or video elements.
- [`castable-video`](https://github.com/muxinc/castable-video) Cast your video element to the big screen with ease!
- [`<youtube-video>`](https://github.com/muxinc/youtube-video-element) A web component for the YouTube player.
- [`<videojs-video>`](https://github.com/luwes/videojs-video-element) A web component for Video.js.
- [`<wistia-video>`](https://github.com/luwes/wistia-video-element) A web component for the Wistia player.
- [`<vimeo-video>`](https://github.com/luwes/vimeo-video-element) A web component for the Vimeo player.
- [`<jwplayer-video>`](https://github.com/luwes/jwplayer-video-element) A web component for the JW player.
- [`<hls-video>`](https://github.com/muxinc/hls-video-element) A web component for playing HTTP Live Streaming (HLS) videos.
- [`<mux-player>`](https://github.com/muxinc/elements/tree/main/packages/mux-player) The official Mux-flavored video player web component.
- [`<mux-video>`](https://github.com/muxinc/elements/tree/main/packages/mux-video) A Mux-flavored HTML5 video element w/ hls.js and Mux data builtin.


## Big Thanks

To all the services that offered free plans for building, testing and measuring!

- [Mux](https://mux.com/)
- [Cloudflare](https://www.cloudflare.com/)
- [JW Player](https://www.jwplayer.com/)
- [Github](https://github.com/)
