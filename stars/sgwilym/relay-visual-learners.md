---
repo: sgwilym/relay-visual-learners
url: 'https://github.com/sgwilym/relay-visual-learners'
homepage: 'http://sgwilym.github.io/relay-visual-learners/'
starredAt: '2016-10-22T21:19:57Z'
createdAt: '2015-08-22T11:16:11Z'
updatedAt: '2024-01-12T21:34:17Z'
language: JavaScript
license: MIT
branch: master
stars: 167
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:17.920Z'
description: An interactive diagram of Relay Classic.
tags:
  - diagram
  - react
  - relay
---

relay-visual-learners
=====================

Relay is a new framework from Facebook that promises to simplify a problem complex enough that the simplification is rather complex in itself.

I tend to learn things better when I can see how things fit together, so I made this interactive diagram that attempts to explain how Relay’s various parts fit together.

This diagram itself is a small react app using css-modules and webpack. You can clone this repo and run `npm start` to load up a hot loading dev environment.

# Todo

- The diagram is constructed from fragments of a single SVG illustration broken up into separate XML files and linked to each separate topic. While this works well enough, it means changing the diagram is a bit of a brittle process that usually requires changing most of the other diagram files. If you know a better way to component-ise a SVG, please feel free to make an issue or PR!
- Think one of the explanations for one of the topics is inaccurate or could be more succinctly expressed? Contributions are more than welcome.
