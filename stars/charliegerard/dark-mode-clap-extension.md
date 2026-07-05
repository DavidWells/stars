---
repo: charliegerard/dark-mode-clap-extension
url: 'https://github.com/charliegerard/dark-mode-clap-extension'
homepage: 'https://charliegerard.dev/project/dark-mode-clap-extension'
starredAt: '2021-04-18T00:21:44Z'
createdAt: '2021-04-10T13:59:50Z'
updatedAt: '2025-01-14T05:23:10Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 86
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:50.389Z'
description: "Chrome extension to toggle dark mode on Netlify by clapping hands \U0001F44F"
tags:
  - chrome-extension
  - machine-learning
  - tensorflowjs
  - tfjs
---

# Dark mode clap extension for Netlify 👏

Experiment to toggle [Netlify](https://app.netlify.com/)'s dark mode by clapping your hands.

This Chrome extension uses [TensorFlow.js](https://www.tensorflow.org/js) to recognise the sound of clapping hands, and toggle the dark mode on/off.

If you'd like to know more about this experiment, check out [the blog post](https://charliegerard.dev/blog/toggle-dark-mode-clapping-hands-chrome-extension)!

## Install

- Clone the repo.
- Run `yarn install` to install the dependencies.
- Run `yarn build` to generate the `dist` folder.
- Visit `chrome://extensions` in your browser and make sure developer mode is toggled on.
- Click on "Load unpacked" and select the `dist` folder generated.
- Visit `https://app.netlify.com` and clap your hands to toggle dark mode.

_The first time you use the extension, you will probably be asked for permission to use the browser's microphone, so it might take a few seconds._
