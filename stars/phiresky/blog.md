---
repo: phiresky/blog
url: 'https://github.com/phiresky/blog'
homepage: 'https://phiresky.github.io/blog/'
starredAt: '2022-12-02T05:15:18Z'
createdAt: '2019-06-13T14:56:15Z'
updatedAt: '2025-02-09T13:22:25Z'
language: TypeScript
license: NOASSERTION
branch: master
stars: 343
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:08.681Z'
description: Source code of my personal blog
tags: []
---

## Source code of my blog

https://phiresky.github.io/blog/

The posts are written in Markdown that is parsed by Pandoc, with the Pandoc AST rendered with React. This is done so the React renderer can have a few custom components, especially code blocks with specific tags are interpreted as e.g. interactive demos or charts. All the React stuff is rendered server-side with next.js to static HTML files. So most of the blog should work without JS.

It also generates an RSS feed for people that are into that.

Run `yarn posts` to generate the posts, then `yarn dev` for the hot-reloading dev server (navigate to http://localhost:3000/blog/ )

Run `yarn build` to run all the build steps, or `yarn commit` to commit a new blog version ready for pushing.
