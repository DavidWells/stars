---
repo: phiresky/youtube-sponsorship-stats
url: 'https://github.com/phiresky/youtube-sponsorship-stats'
homepage: 'https://phiresky.github.io/youtube-sponsorship-stats/?uploader=Adam+Ragusea'
starredAt: '2023-10-30T20:30:18Z'
createdAt: '2021-04-13T16:05:58Z'
updatedAt: '2025-02-10T01:16:20Z'
language: TypeScript
license: NA
branch: master
stars: 123
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:45.100Z'
description: null
tags: []
---

# youtube-sponsorship-stats

![screenshot](screenshot.png)

This tool uses the [SponsorBlock](https://sponsor.ajay.app/) database to show a chart of how much time sponsorships take up in the videos of a specific YouTuber.

The data is stored in an SQLite database (150MB) and hosted on GitHub Pages. The SQLite engine is compiled as WASM and run directly in the browser. The database pages are fetched on demand from the remote URL by using a virtual filesystem that delegates to AJAX requests. This means that to get the data of one uploader, only around 300kB of data need to be fetched, not the whole database of 150MByte.

## Wait what? You are using GitHub Pages as a database engine? Also, I thought GitHub had a file size limit of 100MB?

Yes


## Building

1. Compile sqlite wasm: `cd sql.js && yarn && yarn build -j8 EMCC=/usr/lib/emscripten/emcc`
2. Create the database: `./create_db.sh` (note that you will need the videoData table which is not present in the normal sponsorblock dumps)
3. Build the website: `yarn dev` or `yarn build`
