---
repo: javierbyte/get-video-screenshot
url: 'https://github.com/javierbyte/get-video-screenshot'
homepage: ''
starredAt: '2021-05-21T01:38:24Z'
createdAt: '2019-07-07T07:53:06Z'
updatedAt: '2025-01-28T16:27:07Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:39.313Z'
description: >-
  Library to capture screnshots / thumbnails as images from a videos. Only works
  in the browser.
tags:
  - frame
  - js
  - screenshot
  - thumbnail
  - video
---

# Get Video Screenshot

Library to get screenshots of a video at any given time.
Dependency free (other than the browser itself, does not work on node).

## Usage

```
import GetVideoScreenshot from "get-video-screenshot";

const videoScreenshotGetter = GetVideoScreenshot(<Video Source>);
* Returns a `videoScreenshotGetter` object.

videoScreenshotGetter.get({time: <Int, Seconds>})
* Returns a promise with the image source as payload.
```

## Example Usage.

```js
import GetVideoScreenshot from "get-video-screenshot";

const videoScreenshotGetter = GetVideoScreenshot("./video.mp4");

const videoThumbnailSrc = await videoScreenshotGetter.get({ time: 1 });

// render to image to an <img /> tag
document.querySelector("img[data-thumbnail-render]").src = videoThumbnailSrc;
```
