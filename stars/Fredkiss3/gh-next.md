---
repo: Fredkiss3/gh-next
url: 'https://github.com/Fredkiss3/gh-next'
homepage: 'https://gh.fredkiss.dev/'
starredAt: '2023-11-26T19:53:14Z'
createdAt: '2023-06-24T19:44:10Z'
updatedAt: '2025-02-22T03:15:50Z'
language: TypeScript
license: MIT
branch: main
stars: 455
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.026Z'
description: A minimal Github clone built on nextjs app router.
tags:
  - app-directory
  - nextjs
  - react
  - typescript
---

# A simple clone of github in Next.JS

A simple github alternative open source on github (ironic right ?), it aims is to be fully functionnal with some of the core features of github working.

See [#84](https://github.com/Fredkiss3/gh-next/issues/84) for more info on the supported features.

## ⚠️ THIS PROJECT IS IN ACTIVE DEVELOPMENT ⚠️

Expect stuff to break.

## Roadmap

<details>
<summary>Click to see more</summary>

- [x] Login/Logout
- [x] HomePage (README content)
- [x] Responsive Layout
- [x] Settings page for toggling theme
- [x] Stargazers Page
- [x] See Profile informations
  - [x] Update username
  - [x] Change theme
  - [ ] User detail page
- [x] Issues List page
  - [x] Search & filter issues by author, label, assignee, closed/open, title, mentions, etc. (Inspiration: https://github.com/openstatusHQ/openstatus, https://docs.github.com/en/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests)
- [ ] New issue page
  - [ ] Issue CRUD (by the author only)
  - [ ] Comments CRUD
  - [ ] Mentions
  - [ ] Issue Popovers (for previewing issues)
  - [ ] Linking between issues
  - [ ] Assign & self assign issues
- [ ] OpenGraph
  - [ ] landing (inspiration: https://github.com/trpc/trpc/blob/main/www/og-image/pages/api/landing.tsx)
  - [ ] Per repository
  - [ ] Per user
  - [ ] Per Issue (inspiration: https://opengraph.githubassets.com/101e5bdeef8e959c800fab2aef88eef0b01b15d883e3e17c990bde8dfd67d6b3/trpc/trpc/issues/4306)
- [ ] Labels CRUD (can only add or update labels, no deleting)
- [ ] Notifications page
  - [ ] Notifications badge (Inspiration: https://gist.github.com/Fredkiss3/ab918aee3977d681f0508537a44838c0, https://github.com/Fredkiss3/bunrest)
  - [ ] Notifications for issues subscriptions
  - [ ] Notifications for mentions
  - [ ] Notifications for issue statuses
  - [ ] Filter notifications by status, title, closed, etc.
  - [ ] Mark as done, unsubscribe
- [ ] files hosting for repos (with a storage limit)
  - [ ] file browsing UI
  - [ ] file searching
- [ ] Repository list
  - [ ] list of repos
  - [ ] search for repos
- [ ] Git web UI
  - [ ] commit history
  - [ ] time travel
  - [ ] support `git push` and `git remote` commands
- [ ] issue kanban board (like github projects), to close an issue either with a commit or from the UI
- [ ] CI/CD
  - [ ] running CI with docker, we can take inspiration from gitlab

</details>

## Stack

- [Next App Router](https://nextjs.org/docs/app)
- [drizzle](https://orm.drizzle.team/) + local Postgres database
- Hosted to a custom VPS, see [the CI/CD workflow](./.github/workflows/deploy-to-vps.yaml) for how it is all deployed
- [tailwindCSS](https://tailwindcss.com/) for the styling

## Requirements

- Node >= v18.x
- [pnpm](https://pnpm.io/installation) >= v8.x
- [docker](https://docs.docker.com/engine/install/) installed for local development
- A registered [github app](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) for authenticating users

## 🚀 How to work on the project ?

1. First you have to clone the repository

   ```bash
   git clone https://github.com/Fredkiss3/gh-next.git
   ```

2. **Start the docker compose instance to start the DB + redis instance :**

   ```bash
   docker-compose up -d --remove-orphans
   ```

3. **Install the dependencies :**

   ```bash
   pnpm install
   ```

4. Rename `.env.example` to `.env.local` And change the file to your needs,

5. **And launch the project :**

   ```bash
   pnpm run dev
   ```

   The app will show at <http://localhost:3000>.

6. **Open the source code and start rocking ! 😎**

## 🧐 Project structure

A quick look at the top-level files and directories you will see in this project.

```plaintext
  .
  ├── src/
  │    ├── app
  │    ├── actions
  │    ├── components
  │    ├── models
  │    └── lib/
  │         ├── client
  │         ├── server
  │         └── shared
  ├── biome.json
  ├── pnpm-lock.yaml
  └── tsconfig.json
```

1. `src/app/`: this folder contains all the routes & pages of our app.

2. `src/actions` : this folder contains all the logic of our app.

3. `src/components` : this folder contains all the components of our app.

4. `src/models` : this folder contains all the DB models of our app.

5. `src/lib/`: this folder contains utils & helpers used throughout our app :

   1. `client` : this folder contains all the utilities that are client-only, usually used by client components. It contains mainly hooks

   2. `server` : this folder contains all the utilities that are server-only, for use within server components and server actions. It also contains the DB schemas inside `db/schema`

   3. `shared` : this folder contains all the utilities that are shared between the server & client, these can be used anywhere in the app. 

6. `biome.json`: this file contains the configuration for biome to enable autoformatting.

7. `pnpm-lock.yaml`: this file contains the dependencies lock for the repo.

8. `tsconfig.json`: this file contains the configuration for typescript, that are used by the all the underlying packages

## 🍳 ENV VARIABLES USED

| Nom                            | role                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `SESSION_SECRET`               | random 32 chars length string used to encode the session id                      |
| `REDIS_HTTP_URL`               | The URL to the connect to redis HTTP for a key/value store                       |
| `DATABASE_URL`                 | The URL to the connect to the Postres Database                                   |
| `REDIS_HTTP_USERNAME`          | LOCAL file server URL for storing key values                                     |
| `REDIS_HTTP_PASSWORD`          | LOCAL file server URL for storing key values                                     |
| `GITHUB_CLIENT_ID`             | github client id stored for our app used for authenticating users with github    |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | github client token stored for our app used for authenticating users with github |
| `GITHUB_REDIRECT_URI`          | URL to redirect when a user has been authenticated                               |
| `GITHUB_SECRET`                | github secret stored for our app                                                 |
