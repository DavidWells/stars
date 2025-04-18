---
repo: vercel/server-components-notes-demo
url: 'https://github.com/vercel/server-components-notes-demo'
homepage: 'https://next-rsc-notes.vercel.app'
starredAt: '2021-01-02T02:11:59Z'
createdAt: '2020-12-25T17:02:43Z'
updatedAt: '2025-01-31T13:30:22Z'
language: TypeScript
license: MIT
branch: main
stars: 746
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:11.900Z'
description: Demo of React Server Components with Next.js. Deployed on Vercel.
tags:
  - nextjs
  - react
  - react-server-components
  - serverless
  - vercel
---

# Next.js App Router + Server Components Notes Demo

> Try the demo live here: [**next-rsc-notes.vercel.app**](https://next-rsc-notes.vercel.app).

This demo was originally [built by the React team](https://github.com/reactjs/server-components-demo). This version has been forked and modified for use with the Next.js App Router.

## Introduction

This is a demo app of a notes application, which shows the Next.js App Router with support for React Server Components. [Learn more](https://nextjs.org/docs/getting-started/react-essentials).

### Environment Variables

These environment variables are required to start this application (you can create a `.env` file for Next.js to use):

```bash
KV_URL='redis://:<password>@<url>:<port>' # vercel.com/kv
SESSION_KEY='your session key'
OAUTH_CLIENT_KEY='github oauth app id'
OAUTH_CLIENT_SECRET='github oauth app secret'
```

### Running Locally

1. `pnpm install`
2. `pnpm dev`

Go to `localhost:3000`.

### Deploy

You can quickly deploy the demo to Vercel by clicking this link:

[![Deploy with Vercel](https://vercel.com/button)](<https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fserver-components-notes-demo&env=REDIS_URL,SESSION_KEY,OAUTH_CLIENT_KEY,OAUTH_CLIENT_SECRET&project-name=next-rsc-notes&repo-name=next-rsc-notes&demo-title=React%20Server%20Components%20(Experimental%20Demo)&demo-description=Experimental%20demo%20of%20React%20Server%20Components%20with%20Next.js.%20&demo-url=https%3A%2F%2Fnext-rsc-notes.vercel.app&demo-image=https%3A%2F%2Fnext-rsc-notes.vercel.app%2Fog.png>)

## License

This demo is MIT licensed. Originally [built by the React team](https://github.com/reactjs/server-components-demo)
