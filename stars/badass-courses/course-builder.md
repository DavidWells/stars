---
repo: badass-courses/course-builder
url: 'https://github.com/badass-courses/course-builder'
homepage: 'https://badass.dev/course-builder'
starredAt: '2025-12-12T19:43:32Z'
createdAt: '2023-11-05T17:37:51Z'
updatedAt: '2025-12-25T18:12:30Z'
language: TypeScript
license: MIT
branch: main
stars: 607
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-12-27T22:31:48.796Z'
description: "\U0001F344 platform for building Badass Courses"
tags:
  - inngest
  - nextjs
  - openai
  - react
  - tailwindcss
  - typescript
---

# Course Builder

Course Builder is a real-time multiplayer CMS for building and deploying the opinionated data structures of developer education products

The main Course Builder web application can be found in `apps/course-builder-web` and has further instructions in the readme.

This is a monorepo managed by [Turborepo](https://turborepo.com/)

## Getting Started

```bash
pnpm install
pnpm build
cd apps/course-builder-web
cp .env.example .env
pnpm dev
```

All of the environment variables for various services are the biggest obstacle to getting started. You can find the environment variables in the `apps/course-builder-web/.env` file. You can copy the `apps/course-builder-web/.env.example` file to `.env` and fill in the values for the environment variables. If you're a Skill Recordings team member, you can pull the `env` from Vercel. See the app project readme for more information.

`pnpm dev` from the root of the project will run all the packages in the monorepo in development watch mode. Very convenient.

It does not run the `apps`. Those need to be individually started.

Built by [Badass Courses 🍄🌈💀](https://badass.dev)
