---
repo: nikolasburk/livestore-tanstack-cloudflare-auth-example
url: 'https://github.com/nikolasburk/livestore-tanstack-cloudflare-auth-example'
homepage: 'https://livestore-todo-auth-app.nikolas-burk.workers.dev'
starredAt: '2025-11-20T04:29:31Z'
createdAt: '2025-11-18T11:00:09Z'
updatedAt: '2025-11-21T06:14:13Z'
language: TypeScript
license: NA
branch: main
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:54.586Z'
description: null
tags: []
---

# LiveStore Auth Example with TanStack Start, BetterAuth & Cloudflare

This repo contains an example todo app that showcases how to implement authentication in a local-first app using the following technologies:

- Fullstack React: [TanStack Start](https://tanstack.com/start)
- Data layer: [LiveStore](https://livestore.dev/)
- Authentication: [BetterAuth](https://www.better-auth.com/) & [BetterAuth Cloudflare Plugin](https://github.com/zpg6/better-auth-cloudflare)
- User credential storage: [Cloudflare D1](https://developers.cloudflare.com/d1/)
- Backend syncing: [Cloudflare Workers](https://developers.cloudflare.com/workers/) & [Durable Objects](https://developers.cloudflare.com/durable-objects/)

After authentication, every user of the app receives their own local instance of a LiveStore DB that they can use locally on their machine, ensuring full isolation as well as offline access. 

<details><summary>Expand for a badly drawn diagram</summary>

![](./flow-diagram.png)

</details>

## Usage

### 1. Clone repo

```
git clone git@github.com:nikolasburk/livestore-tanstack-cloudflare-auth-example.git
cd livestore-tanstack-cloudflare-auth-example
pnpm install
```

### 2. Set env vars

Rename `.env.example` to `.env` and update the env vars in that file as follows.

#### 2.1. D1 database configutation

Create a [D1 database](https://developers.cloudflare.com/d1/) and set the env vars in `.env` as described [here](https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit). Here are some real-looking sample values:

```bash
# replace these values with your own
CLOUDFLARE_ACCOUNT_ID=6cfd2fa210ebf08b224c0f39248e1c05
CLOUDFLARE_DATABASE_ID=d5b3d994-1a05-43cb-8cd5-b668b73d0d53
CLOUDFLARE_D1_TOKEN=XDPhgV57Tr-zljPhXdsyiuAG4V_gjFq1b8FNiZoJ
```

#### 2.2. Better Auth configuration

Set the `BETTER_AUTH_SECRET` to a value of your choice. You can also generate a secret [here](https://www.better-auth.com/docs/installation#set-environment-variables) by clicking on the **Generate Secret** button. Here are some real-looking sample values:

```bash
# replace these values with your own
BETTER_AUTH_SECRET=i2zaoTAZz0yXjfHlTXIhAxWlERrXoCCn
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
```

### 3. Run the app

Now you can run the app with:

```
pnpm dev
```

### 4. Test the app

Here are some things you can do to test the app:

1. Sign up with a new user 
1. Open a new browser window -> the same user should be logged in automatically in both windows now
1. Create a todo in one window -> the second window should update instantly and show the same todo
1. Open an incognito window and sign up with a different user
1. Open another incognito window -> the second user should be logged in automatically in both incognito windows now
1. Create a todo in one incognito window -> the second incognito window should update instantly and show the same todo

### 5. Deploy to Cloudflare

To deploy the app, you can run:

```
pnpm run deploy
```


## TODOs

### Add auth token exchange to syncing

The auth mechanism currently isn't fully safe:

- Anyone could connect to another user's sync endpoint if they knew/guessed the `storeId` (which is not too difficult)
- No verification that sync operations (`onPush`/`onPull`) are from an authenticated user

The solution will be to add an auth token to the WebSockets that are doing the syncing, something similar to this:

1. Extract the auth token from the WebSocket connection (headers or query params)
1. Verify the token using BetterAuth in the sync handlers
1. Ensure the authenticated user matches the `storeId`/`userId` associated with the sync operation
