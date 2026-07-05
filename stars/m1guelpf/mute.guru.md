---
repo: m1guelpf/mute.guru
url: 'https://github.com/m1guelpf/mute.guru'
homepage: 'https://mute.guru'
starredAt: '2022-09-01T18:23:37Z'
createdAt: '2022-08-31T13:39:54Z'
updatedAt: '2024-05-16T08:00:44Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:35.543Z'
description: 'Take back your twitter feed, by instantly muting all engagement farmers.'
tags:
  - mute
  - nextjs
  - twitter
  - twitter-api
---

# Take back your Twitter feed
> Obliterate all 🧵👇's from your feed with one-click, and go back to enjoying the content you actually care about.

mute.guru is a simple application displaying a crowdsourced list of the worst engagement farmers on Twitter, and allows users to mute all of them with a single click (and granularly mute/unmute each of them).

## Acknowledgments

The site's design is _heavily_ inspired by [mute.vc](https://mute.vc), a similar site to mute investors.

Also, the inspiration for building this came from [@jmduke's tweet](https://twitter.com/jmduke/status/1563910836355182592) requesting an app like this (and even suggesting the domain).

## Privacy

I had to use Twitters v1.1 API (v2 has the required methods, but much stricter rate-limits). Because of this, the tokens acquired have write access to everything but DMs (write tweets, follow users, etc.). To reduce risk, the tokens aren't saved on a database, and are instead only present on the user's device via an encrypted cookie.

## License

This app is open-source and licensed under the MIT license. For more details, check the [License](LICENSE) file.
