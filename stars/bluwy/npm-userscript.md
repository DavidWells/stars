---
repo: bluwy/npm-userscript
url: 'https://github.com/bluwy/npm-userscript'
homepage: ''
starredAt: '2025-12-26T15:30:34Z'
createdAt: '2025-12-16T17:31:01Z'
updatedAt: '2025-12-26T15:30:35Z'
language: TypeScript
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-12-27T22:31:47.738Z'
description: Various improvements and fixes for npmjs.com
tags: []
---

# Npm Userscript

[Install on Greasyfork](https://greasyfork.org/en/scripts/559139-npm-userscript)

[Video demo on Bluesky](https://bsky.app/profile/bluwy.me/post/3ma4pgto2rs2x)

Various improvements and fixes for npmjs.com.

## Features

<!-- features-table-start -->

| Feature              | Description                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `better-versions`    | Improved package versions tab with compact table view, cumulated versions table, show tags next to versions, and fix provenance icon alignment.                                          |
| `fix-issue-pr-count` | Show "Issue" and "Pull Requests" counts in the package sidebar. At the time of writing, npm's own implementation is broken for large numbers for some reason. This temporarily fixes it. |
| `fix-styles`         | Fix various style issues on the npm site (mostly the package page at the moment).                                                                                                        |
| `helpful-links`      | Add helpful links beside the package name title for convenience.                                                                                                                         |
| `move-funding`       | Move the "Fund this package" button to the bottom of the sidebar.                                                                                                                        |
| `no-code-beta`       | Hide the "Beta" label in the package code tab because it has been working for around 3 years now.                                                                                        |
| `npm-create`         | If the package is named `create-*`, change the suggested install command in the sidebar as `npm create *` instead of `npm install create-*`.                                             |
| `remember-banner`    | Remember the banner at the top of the page when dismissed, so it doesn't keep showing up.                                                                                                |
| `remove-runkit`      | Remove the RunKit link as it's dead.                                                                                                                                                     |

<!-- features-table-end -->

## Sponsors

<p align="center">
  <a href="https://bjornlu.com/sponsors">
    <img src="https://bjornlu.com/sponsors.svg" alt="Sponsors" />
  </a>
</p>

## License

MIT
