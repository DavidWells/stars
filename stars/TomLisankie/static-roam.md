---
repo: TomLisankie/static-roam
url: 'https://github.com/TomLisankie/static-roam'
homepage: ''
starredAt: '2020-06-18T02:50:03Z'
createdAt: '2020-03-19T22:37:56Z'
updatedAt: '2024-04-19T16:09:46Z'
language: Clojure
license: EPL-1.0
branch: master
stars: 60
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:48.894Z'
description: A static-site generator for Roam Research
tags:
  - roam
  - roamresearch
  - static-site-generator
---

# Static-Roam
## A static-site generator for [Roam Research](https://roamresearch.com/)
[![Clojars Project](https://clojars.org/static-roam/static-roam/latest-version.svg)](https://clojars.org/static-roam)

Usage: `lein run /path/to/export/zip /path/to/output/dir degree`. You must use the JSON export from Roam, not the Markdown export.

## Background

With Roam, there are no limits on how you can connect notes. This is one of Roam's greatest strengths. However, it's its greatest weakness when it comes to sharing notes publicly. Since any note can be connected to any other block, things you'd be alright with being publicly known get connected with ideas that you'd like to keep private. Personally, I think there are great benefits that can be seen from sharing notes publicly that are structured in the ways Roam allows. Static-Roam is an early attempt at solving this.

The basic goal is to allow a user to share notes they are fine with being seen publicly while minimizing private information exposure. It works by having the user specify **entry points**. Entry points are simply where you want Static-Roam to *start* including pages/blocks from your Roam database. You then specify a **degree** which is how far away from the entry points you are alright with Static-Roam going. The name comes from "degree of separation" as in how everyone on Earth is 6 degrees of separation from one another. The reasoning behind the degree approach is that the farther away you get from entry points (which, remember, you *explicitly* said you're alright with being public), the less likely it is that those pages contain only information you'd be alright with being public. You can also specify "all" as the degree to just include every block and page in your Roam graph.

There is also the concepts of the **explicit exclude** and the **explicit include**. Explicit exclude is used for pages/blocks that are within the specified degree but you still don't want to include them. Explicit include is used if there is a page outside of the degree range but you still want to include (say you want to send someone a link to just that page). I began to implement these but never finished (and probably won't)

## How To Use

So the basic flow goes like this:

1. You specify the entry points for your graph. You do this by having `#EntryPoint` as the text of the *first* child block of the page/block you want to use as an entry point.
2. Run `lein run /path/to/export/zip /path/to/output/dir degree` from within the directory of this project. `degree` is of course how far away from the entry points you want to be included in the generated static site.

## Future Development

Static-Roam is used in production at [Roaman Pub](https://roaman.pub/) currently. However, I have basically put Static-Roam aside in favor of working on a revamped, much prettier, much more user friendly version of Roaman Pub that will likely be open source. So this project is basically just in maintenance mode until the new Roaman Pub is done. Once it's done, Static-Roam will likely receive no further development from me.

