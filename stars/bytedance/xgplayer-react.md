---
repo: bytedance/xgplayer-react
url: 'https://github.com/bytedance/xgplayer-react'
homepage: null
starredAt: '2022-01-22T22:12:35Z'
createdAt: '2018-10-11T03:23:36Z'
updatedAt: '2025-02-17T06:02:38Z'
language: JavaScript
license: MIT
branch: master
stars: 91
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:19.049Z'
description: >-
  React component for xgplayer, a HTML5 video player with a parser that saves
  traffic
tags: []
---

<div align="center">
    <img src="https://raw.githubusercontent.com/bytedance/xgplayer/master/xgplayer.png" width="384" height="96">
</div>
<div align="center">
    <a href="https://www.npmjs.com/package/xgplayer-react" target="_blank">
        <img src="https://img.shields.io/npm/v/xgplayer-react.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/xgplayer-react" target="_blank">
        <img src="https://img.shields.io/npm/l/xgplayer-react.svg" alt="license">
    </a>
    <a href="http://commitizen.github.io/cz-cli/">
        <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen">
    </a>
</div>

### Introduction

xgplayer is a web video player library. It has designed a separate, detachable UI component based on the principle that everything is componentized. More importantly, it is not only flexible in the UI layer, but also bold in its functionality: it gets rid of video loading, buffering, and format support for video dependence. Especially on mp4
it can be staged loading for that does not support streaming mp4. This means seamless switching with clarity, load control, and video savings. It also integrates on-demand and live support for FLV, HLS, and dash. [Document](http://h5player.bytedance.com/en/)

xgplayer-react is the React component which encapsulating the xgplayer.

### Start

1. Install

    ```
    $ npm install xgplayer-react@latest
    ```

2. Usage

    Step 1. Add xgplayer-react component
    ```js
    import Xgplayer from 'xgplayer-react';
    ```

    Step 2. Use in template
    ```html
    <Xgplayer config={config} playerInit={(player)=>{ Player = player; }} />
    ```

    Step 3. Config for xgplayer
    ```js
    let config = {
      id: 'mse',
      url: '/xgplayer-demo.mp4'
    };
    let Player = null;
    ```
    You can use 'config' object to pre-config xgplayer, such as size, volume, autoplay and so on. [More config](http://h5player.bytedance.com/en/config/)

    'mp4', 'hls', 'flv', 'dash' are supported to play and you should add the plugin you want to use. [Functional Plugins List](http://h5player.bytedance.com/en/plugins/#functional-plugins-list).

    'Player' is the xgplayer instance which exposed from the component. You can use 'Player' to access the API of xgplayer as follows.


### API

#### Attributes

```js
console.log(Player.currentTime)
```
[More attributes](http://h5player.bytedance.com/en/api/#attributes)

#### Method

```js
Player.pause();
```
[More methods](http://h5player.bytedance.com/en/api/#method)

#### Event

```js
Player.on('play', ()=>{console.log('play')})
```
[More events](http://h5player.bytedance.com/en/api/#event)

#### Life Cycle

```js
Player.once('ready', ()=>{console.log('ready')})
```
[More events](http://h5player.bytedance.com/en/api/#life-cycle)


### Plugins

xgplayer supports your custom plugins for more content viewing [plugins](http://h5player.bytedance.com/en/plugins/)

```js
import Xgplayer from 'xgplayer-react';
import 'xgplayer-custom';
```

### Demo

```
$ git clone git@github.com:bytedance/xgplayer-react.git
$ cd xgplayer-react
$ npm install
$ npm start
```

please visit [http://localhost:9090/index.html](http://localhost:9090/index.html)


### License

[MIT](http://opensource.org/licenses/MIT)
