---
repo: kbravh/ttm-service
url: 'https://github.com/kbravh/ttm-service'
homepage: null
starredAt: '2022-10-28T00:46:38Z'
createdAt: '2021-12-12T22:17:13Z'
updatedAt: '2024-07-13T04:10:51Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:16.226Z'
description: >-
  A server and site for users to get an API key to use Tweet to Markdown without
  needing a bearer token.
tags: []
---

# TTM Service

This site provides an easy way to obtain an API key to download tweets using the [Tweet to Markdown CLI](https://github.com/kbravh/tweet-to-markdown) or the [Tweet to Markdown obsidian plugin](https://github.com/kbravh/obsidian-tweet-to-markdown).

By acting as a proxy service between end users and the Twitter API, users can download tweets and tweet threads without needing to apply for a Twitter developer account.

## Getting started with development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

Nota bene: Without the correct secrets configured, you will be unable to authenticate and access an account page.

## Tech stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The backend is built with Next.js functions, with the database and authentication served by [Supabase](https://supabase.com/).

Styles are written with [Tailwind CSS](https://tailwindcss.com/). I was very hesitant to jump on the Tailwind wagon, and while it's not perfect, it definitely has its benefits!

Error monitoring is managed through [Sentry](https://sentry.io).
