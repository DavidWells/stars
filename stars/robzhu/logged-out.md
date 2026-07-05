---
repo: robzhu/logged-out
url: 'https://github.com/robzhu/logged-out'
homepage: null
starredAt: '2020-06-09T01:18:13Z'
createdAt: '2020-05-10T22:09:07Z'
updatedAt: '2023-03-08T07:04:43Z'
language: JavaScript
license: NA
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:49.742Z'
description: Three ways to build real-time session invalidation
tags: []
---

# Real-time Session Invalidation

![alt text](/images/session_logged_out.gif)

Companion [blog post](https://updateloop.dev/lets-build-you-have-been-logged-out/)

## Clone & npm install

```
git clone https://github.com/robzhu/logged-out
cd logged-out
npm install
```

## Polling demo

```
npm run polling
# open polling/index.html in two browser tabs
```

## Push demo with Web Sockets

```
npm run push
# open push/index.html in two browser tabs
```

## Push demo with Web Sockets & Redis

For this demo, you'll need a redis instance. Add a `.env` file to the root of the project with the following contents:

```
REDIS_HOST=<Redis HOST IP Address>
```

```
npm run push-redis
# open push-redis/index.html in two browser tabs
```

## Native client (.net)

You will need .net core 3.1.

```
cd dotnet-client && dotnet restore
# make sure the server is running
dotnet run
```

See the [blog post](https://updateloop.dev/lets-build-you-have-been-logged-out/) for more a more detailed explanation.
