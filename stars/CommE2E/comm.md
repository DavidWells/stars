---
repo: CommE2E/comm
url: 'https://github.com/CommE2E/comm'
homepage: 'https://comm.app'
starredAt: '2024-02-14T01:07:04Z'
createdAt: '2015-12-02T05:12:05Z'
updatedAt: '2025-02-25T17:23:11Z'
language: JavaScript
license: BSD-3-Clause
branch: master
stars: 276
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:36.580Z'
description: 'Comm is an E2E-encrypted, open source messaging app for communities.'
tags:
  - flowtype
  - javascript
  - nodejs
  - react-native
  - rust
---

## Comm

Comm is an E2E-encrypted messaging app. You can think of it as Signal with an IRC-like federated community layer.

- DMs and group chats are E2EE between devices using pairwise Double Ratchet sessions initiated via X3DH.
- Communities, which consist of a tree structure of channels, are hosted on federated user-run backends that we call keyservers. Communication is encrypted via TLS.

Learn more at [comm.app](https://comm.app)!

## Repo structure

The client apps and keyserver layer are mostly written in Flow-typed Javascript. These projects are organized in a monorepo structure using Yarn Workspaces.

- `native` contains the code for the React Native app, which supports both iOS and Android.
- `keyserver` contains the code for the Node/Express server. This includes the application server for the communities layer (the "keyserver"), and can be configured to serve `web` and `landing` as well (see below).
- `web` contains the code for the React desktop website.
- `landing` contains the code for the [Comm landing page](https://comm.app).
- `lib` contains code that is shared across multiple other workspaces, including most of the Redux stack that is shared across native/web.

Comm's backend services are centralized and never touch plaintext data. They are written in Rust and deployed with Terraform to AWS. These projects are organized in a monorepo structure using Cargo Workspaces.

- `services` contains the various different backend services.
- `shared` contains gRPC and protobuf definitions, and shared Rust libraries.

## Dev environment

Note that it’s currently it’s only possible to contribute to this project from macOS. This is primarily due to iOS native development only being supported in macOS.

Check out our [doc on how to set up our dev environment](docs/nix_dev_env.md).
