---
repo: serenity-kit/serenity-notes-clients
url: 'https://github.com/serenity-kit/serenity-notes-clients'
homepage: null
starredAt: '2021-03-24T15:48:39Z'
createdAt: '2021-02-05T23:32:20Z'
updatedAt: '2024-06-07T23:35:30Z'
language: HTML
license: AGPL-3.0
branch: main
stars: 184
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:57.120Z'
description: End-to-end encrypted collaborative notes app
tags: []
---

# Serenity Notes iOS/Android/macOS

End-to-end encrypted collaborative notes app

[https://www.serenity.re/en/notes](https://www.serenity.re/en/notes)

Security & technical details are documented at [https://www.serenity.re/en/notes/technical-documentation](https://www.serenity.re/en/notes/technical-documentation).

## Setup & Development

```sh
npm i -g expo-cli

cd editor
yarn
# builds a index.html and copies it to app and desktop assets
yarn dist
cd ..

cd yjs
yarn
yarn dist
cd ..

# iOS/Android
cd app
yarn
# replace the API_URL in package.json with https://api.serenity.re/graphql
yarn start

# macOS
cd desktop
cd macos
npx pod-install
cd ..
# replace the API_URL in .env.development with https://api.serenity.re/graphql
npx react-native run-macos
```

## Mobile Builds

Creating build for iOS & Android.

```sh
cd app
yarn build:ios
yarn build:android
```

Creating a preview build for internal distribution.

```sh
cd app
yarn build:ios:preview
```

## macOS Release

Bump version in app.json & in Xcode in Target `serenity-macOS`.

Change build configuration to release https://reactnative.dev/docs/publishing-to-app-store#2-configure-release-scheme

```sh
cd desktop
yarn build-macos
```

Locate the .app file in `~/Library/Developer/Xcode/DerivedData/<serenity>/Build/Products/Release` and package it as dmg: `yarn create-dmg Serenity\ Notes.app`

Update the app version on the backend and the website link.

## License

Copyright 2021 Nikolaus Graf

Licensed under the [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html)
