---
repo: segmentio/daydream
url: 'https://github.com/segmentio/daydream'
homepage: 'https://open.segment.com'
starredAt: '2016-02-11T19:56:01Z'
createdAt: '2014-11-10T23:58:43Z'
updatedAt: '2025-01-18T12:41:43Z'
language: JavaScript
license: NA
branch: master
stars: 2770
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:32.053Z'
description: A chrome extension to record your actions into a nightmare or puppeteer script
tags:
  - paused
---

# Daydream

> [!NOTE]
> Segment has paused maintenance on this project, but may return it to an active status in the future. Issues and pull requests from external contributors are not being considered, although internal contributions may appear from time to time. The project remains available under its open source license for anyone to use.

A chrome extension to record your actions into a [Nightmare](https://github.com/segmentio/nightmare) or [Puppeteer](https://github.com/GoogleChrome/puppeteer) script.

## Example

![Demo](https://cldup.com/jSPoteXKJS.png)

## Installing

### Google Chrome

You can download Daydream from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/daydream/oajnmbophdhdobfpalhkfgahchpcoali).

### Opera

First enable Opera to install Chrome extensions [here](https://addons.opera.com/extensions/details/download-chrome-extension-9/); then you can download Daydream from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/daydream/oajnmbophdhdobfpalhkfgahchpcoali).

## Developing

1. Run `$ git clone https://github.com/segmentio/daydream.git && cd daydream && make`
2. Navigate to `chrome://extensions`
3. Ensure that 'Developer mode' is checked
4. Click `Load unpacked extension...`
5. Browse to `daydream/build` and click `Select`

## Usage

Just click the black daydream icon (it should turn green to indicate that it is actively recording), run all the tasks you wish to automate, and then click the green icon and open the popup.

## Notes

Daydream currently supports `.goto()`, `.click()`, `.type()`, `.screenshot()`, and `.refresh()`.

If you want daydream to capture typing, press <kbd>tab</kbd> after you finish typing in each `input` element.

## License

MIT
