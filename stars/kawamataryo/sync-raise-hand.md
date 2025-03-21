---
repo: kawamataryo/sync-raise-hand
url: 'https://github.com/kawamataryo/sync-raise-hand'
homepage: >-
  https://chrome.google.com/webstore/detail/sync-raise-a-hand/pimhkdcdgmedijjnjeagagnnddgbcnkm
starredAt: '2021-08-29T06:05:22Z'
createdAt: '2021-08-21T21:21:16Z'
updatedAt: '2024-08-09T03:19:14Z'
language: TypeScript
license: MIT
branch: main
stars: 78
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:46.913Z'
description: >-
  Your real raised hand will be synchronized with the action of the raise button
  in Google Meet.
tags:
  - chrome
  - chrome-extensions
---

<a href="https://chrome.google.com/webstore/detail/sync-raise-a-hand/pimhkdcdgmedijjnjeagagnnddgbcnkm"><img src="https://user-images.githubusercontent.com/11070996/130786978-6f0b821d-3da4-45b1-bae7-2b27644e2bc7.png" alt="Sync Raise hand"></a>

[Download in Chrome Web Store](https://chrome.google.com/webstore/detail/sync-raise-a-hand/pimhkdcdgmedijjnjeagagnnddgbcnkm)

## ✨ Feature

- ✋ Your real raised hand will be synchronized with the action of the raise button in Google Meet.
- 🔐 All processing is done within the browser. No image data will be sent to the any server.

Powerd by [handtrackjs](https://github.com/victordibia/handtrack.js/) and [vitesse-webext](https://github.com/antfu/vitesse-webext).

## 🎬 Demo

https://user-images.githubusercontent.com/11070996/130861858-00b7bb2d-ab87-457b-ade6-2bc42f6c71f7.mp4

## 📦 Install

[Download in Chrome Web Store](https://chrome.google.com/webstore/detail/sync-raise-a-hand/pimhkdcdgmedijjnjeagagnnddgbcnkm?hl=ja&authuser=1)

## 🔫 Troubleshooting
If Sync Raise Hand does not work for you, please check the following.

- Do you have Snap Camera running?
  - If Snap camera is running, no motion will be detected. Please stop Snap camera and then reload the page.
- Does the Google Meet settings in Chrome allow the camera to be controlled from JavaScript?
  - Since Sync Raise Hand uses a camera to detect raised hands, please make sure that JavaScript is available to control the camera.Check your camera settings at [chrome://settings/content#media-stream-mic](chrome://settings/content#media-stream-mic).(Related [#2](https://github.com/kawamataryo/sync-raise-hand/issues/2))


## 🖥 Contributing
Contributions are welcome 🎉
We accept contributions via Pull Requests.

### Development

```bash
$ git clone https://github.com/kawamataryo/sync-raise-hand.git
$ cd sync-raise-hand
$ pnpm i
$ pnpm build
```

