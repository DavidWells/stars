---
repo: MaxLeiter/Drift
url: 'https://github.com/MaxLeiter/Drift'
homepage: 'https://drift.lol'
starredAt: '2022-05-10T17:28:54Z'
createdAt: '2022-03-07T00:47:12Z'
updatedAt: '2025-02-23T15:46:20Z'
language: TypeScript
license: MIT
branch: refactor
stars: 1360
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:46.965Z'
description: >-
  Drift is a self-hostable Gist and paste service. Built with Next.js 13 and
  React Server Components.
tags:
  - drift
  - gist
  - nextjs
  - nextjs13
  - nodejs
  - pastebin
  - pastebin-service
  - react
  - self-hosted
  - typescript
---

# <img src="src/public/assets/logo.png" height="32px" alt="" /> Drift

> **Note:** This branch is where all work is being done to refactor to the Next.js 13 app directory and React Server Components.

Drift is a self-hostable Gist clone. It's in beta, but is completely functional.

You can try a demo at https://drift.lol. The demo is built on main but has no database, so files and accounts can be wiped at any time.

If you want to contribute, need support, or want to stay updated, you can join the IRC channel at #drift on irc.libera.chat or [reach me on twitter](https://twitter.com/Max_Leiter). If you don't have an IRC client yet, you can use a webclient [here](https://demo.thelounge.chat/#/connect?join=%23drift&nick=drift-user&realname=Drift%20User).

Drift is built with Next.js 13, React Server Components, [shadcn/ui](https://github.com/shadcn/ui), and [Prisma](https://prisma.io/).

<hr />

**Contents:**

- [Setup](#setup)
  - [Development](#development)
  - [Production](#production)
- [Environment variables](#environment-variables)
- [Running with pm2](#running-with-pm2)
- [Running with Docker](#running-with-docker)
- [Current status](#current-status)

## Setup

### Development

In the root directory, run `pnpm i`. If you need `pnpm`, you can download it [here](https://pnpm.io/installation).
You can run `pnpm dev` in `client` for file watching and live reloading.

To work with [prisma](prisma.io/), you can use `pnpm prisma` or `pnpm exec prisma` to interact with the database.

### Production

`pnpm build` will produce production code. `pnpm start` will start the Next.js server.

### Environment Variables

You can change these to your liking.

`.env`:

- `DRIFT_URL`: the URL of the drift instance.
- `DATABASE_URL`: the URL to connect to your postgres instance. For example, `postgresql://user:password@localhost:5432/drift`.
- `WELCOME_CONTENT`: a markdown string that's rendered on the home page
- `WELCOME_TITLE`: the file title for the post on the homepage.
- `ENABLE_ADMIN`: the first account created is an administrator account
- `REGISTRATION_PASSWORD`: the password required to register an account. If not set, no password is required.
- `NODE_ENV`: defaults to development, can be `production`

#### Auth environment variables

**Note:** Only credential auth currently supports the registration password, so if you want to secure registration, you must use only credential auth.

- `GITHUB_CLIENT_ID`: the client ID for GitHub OAuth.
- `GITHUB_CLIENT_SECRET`: the client secret for GitHub OAuth.
- `NEXTAUTH_URL`: the URL of the drift instance. Not required if hosting on Vercel.
- `CREDENTIAL_AUTH`: whether to allow username/password authentication. Defaults to `true`.

## Running with pm2

It's easy to start Drift using [pm2](https://pm2.keymetrics.io/).
First, add the `.env` file with your values (see the above section for the required options).

Then, use the following command to start the server:

- `pnpm build && pm2 start pnpm --name drift --interpreter bash -- start`

Refer to pm2's docs or `pm2 help` for more information.

## Running with Docker

## Running with systemd

_**NOTE:** We assume that you know how to enable user lingering if you don't want to use the systemd unit as root_

- As root
  - Place the following systemd unit in ___/etc/systemd/system___ and name it _drift.service_
  - Replace any occurrence of ___`$USERNAME`___ with the shell username of the user that will be running the Drift server

  ```
  ##########
  # Drift Systemd Unit (Global)
  ##########
  [Unit]
  Description=Drift Server (Global)
  After=default.target
  
  [Service]
  User=$USERNAME
  Group=$USERNAME
  Type=simple
  WorkingDirectory=/home/$USERNAME/Drift
  ExecStart=/usr/bin/pnpm start
  Restart=on-failure
  
  [Install]
  WantedBy=default.target
  ```
- As a nomal user
  - Place the following systemd unit inside ___/home/user/.config/systemd/user___ and name it _drift_user.service_
  - Replace any occurrence of ___`$USERNAME`___ with the shell username of the user that will be running the Drift server

  ```
  ##########
  # Drift Systemd Unit (User)
  ##########
  [Unit]
  Description=Drift Server (User)
  After=default.target
  
  [Service]
  Type=simple
  WorkingDirectory=/home/$USERNAME/Drift
  ExecStart=/usr/bin/pnpm start
  Restart=on-failure
  
  [Install]
  WantedBy=default.target
  ```
  
## Current status

Drift is a work in progress. Below is a (rough) list of completed and envisioned features. If you want to help address any of them, please let me know regardless of your experience and I'll be happy to assist.

- [x] Next.js 13 `app` directory
- [x] creating and sharing private, public, password-protected, and unlisted posts
  - [x] syntax highlighting
  - [x] expiring posts
- [x] responsive UI
- [x] user auth
  - [ ] SSO via HTTP header (Issue: [#11](https://github.com/MaxLeiter/Drift/issues/11))
  - [x] SSO via GitHub OAuth
- [x] downloading files (individually and entire posts)
- [x] password protected posts
- [x] postgres database
- [x] administrator account / settings
- [x] docker-compose (PRs: [#13](https://github.com/MaxLeiter/Drift/pull/13), [#75](https://github.com/MaxLeiter/Drift/pull/75))
  - [ ] publish docker builds
- [ ] user settings
- [ ] works enough with JavaScript disabled
- [ ] in-depth documentation
- [x] customizable homepage, so the demo can exist as-is but other instances can be built from the same source. Environment variable for the file contents?
- [ ] fleshed out API
- [ ] Swappable database backends
- [ ] More OAuth providers
