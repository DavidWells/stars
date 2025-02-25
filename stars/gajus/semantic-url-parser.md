---
repo: gajus/semantic-url-parser
url: 'https://github.com/gajus/semantic-url-parser'
homepage: null
starredAt: '2023-04-02T17:49:09Z'
createdAt: '2023-03-29T01:01:43Z'
updatedAt: '2024-11-12T16:01:22Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:53.575Z'
description: Extracts content information from known URL patterns.
tags: []
---

# semantic-url-parser 🗂️

Extracts content information from known URL patterns.

```ts
import {
  extractContentInfoFromUrl,
} from 'semantic-url-parser';

extractContentInfoFromUrl('https://youtu.be/8Qn_spdM5Zg?t=5');

// {
//   contentType: 'VIDEO',
//   videoId: '8Qn_spdM5Zg',
//   site: 'YOUTUBE',
//   url: 'https://www.youtube.com/watch?v=8Qn_spdM5Zg'
// }

extractContentInfoFromUrl('https://soundcloud.com/strangehumman/kyoto-2?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');

// {
//   contentType: 'AUDIO_TRACK',
//   audioTrackId: 'kyoto-2',
//   username: 'strangehumman',
//   url: 'https://soundcloud.com/strangehumman/kyoto-2',
// }
```

## Formatting Content Info into URL

```ts
import { formatContentInfoIntoUrl } from 'semantic-url-parser';

formatContentInfoIntoUrl({
  contentType: 'VIDEO',
  site: 'YOUTUBE',
  urlVariant: 'DEFAULT',
  videoId: '8Qn_spdM5Zg',
});

// https://www.youtube.com/watch?v=8Qn_spdM5Zg
```

## Supported Sites

* https://apps.apple.com/
* https://behance.net/
* https://canva.com/
* https://codepen.io/
* https://docs.google.com/
* https://dribbble.com/
* https://drive.google.com/
* https://dropbox.com/
* https://figma.com/
* https://fiverr.com/
* https://github.com/
* https://instagram.com/
* https://linkedin.com/
* https://linktr.ee/
* https://loom.com/
* https://medium.com/
* https://music.apple.com/
* https://pinterest.com/
* https://play.google.com/
* https://soundcloud.com/
* https://spotify.com/
* https://tiktok.com/
* https://twitch.tv/
* https://twitter.com/
* https://upwork.com/
* https://vimeo.com/
* https://youtube.com/

## Adding New Sites

1. Update `SiteContentInfo`
1. Update `siteContentRules`
1. Update "Supported Sites" documentation
