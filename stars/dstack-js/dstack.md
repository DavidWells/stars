---
repo: dstack-js/dstack
url: 'https://github.com/dstack-js/dstack'
homepage: 'https://dstack.dev'
starredAt: '2022-03-23T02:49:58Z'
createdAt: '2021-09-20T19:07:04Z'
updatedAt: '2024-05-30T11:03:44Z'
language: TypeScript
license: GPL-3.0
branch: main
stars: 20
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:55.009Z'
description: Library for developing semi-decentralized web applications
tags:
  - dapp
  - decentralized
  - ipfs
  - libp2p
  - libp2p-transport
  - library
  - semi-decentralized
  - typescript
  - web
  - web3
---

# DStack

<p align="center">
  <img alt="logo" width="128" src="./docs/static/img/logo.svg" />
  <br />
  Technology stack as a library for developing semi-decentralized web applications
</p>

[![npm-badge]][npm] ![](https://badgen.net/npm/types/@dstack-js/lib)

[![license-badge]][license] [![FOSSA Status][fossa-badge]][fossa]

[![Discord][discord-badge]][discord] [![Gitter](https://badges.gitter.im/dstack-chat/community.svg)](https://gitter.im/dstack-chat/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

[![Known Vulnerabilities](https://snyk.io/test/github/dstack-js/dstack/badge.svg)](https://snyk.io/test/github/dstack-js/dstack)

[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/dstack)](https://opencollective.com/dstack)

![Maintenance](https://img.shields.io/maintenance/yes/2022) [![CodeClimate](https://api.codeclimate.com/v1/badges/79ea2d56c8d646635e7e/maintainability)](https://codeclimate.com/github/dstack-js/dstack/maintainability) [![issues-badge]][issues]

<a href="https://www.buymeacoffee.com/0x77dev"><img src="https://img.buymeacoffee.com/button-api/?text=Support Development&emoji=💸&slug=0x77dev&button_colour=000000&font_colour=ffffff&font_family=Lato&outline_colour=ffffff&coffee_colour=FFDD00" /></a>

Checkout [Peerchat](https://dstack.dev/blog/peerchat) demo

| [Explorer][explorer]                                   | [Docs][docs]                               | [CI][ci]                     |
| ------------------------------------------------------ | ------------------------------------------ | ---------------------------- |
| [![Explorer Status][explorer-badge]][explorer-deploys] | [![Docs Status][docs-badge]][docs-deploys] | [![CI Status][ci-badge]][ci] |

## Getting started

See [Tutorial](https://dstack.dev/docs/intro) to get started using DStack in your dapp

## Deprecation Notice

Version 0.2.x will be deprecated soon, majority of the development is moved to `next` branch.

This version will not receive any major upgrades or improvements, only minor security fixes and dependency upgrades.

## Introduction

DStack was created to bring together some of the popular libraries/technologies for the decentralized web (like [IPFS](https://ipfs.io)) into a single ecosystem to provide an easy way for developing decentralized web applications where your infrastructure is a single source of truth.

For example, you can use PubSub API to create real-time events client-side

or Shard API to share temporary/preview files or structured data between clients without the need to upload to your servers

For example, you can create a collaborative real-time WYSIWYG editor with file preview support where all events and file previews are handled without your server infrastructure.

[Demo](https://imgur.com/cKjBrge)

## What DStack offers

DStack simplifies IPFS JavaScript API for application development usage

DStack provides:

- [Store](./apps/docs/store.md)
- [Shard](./apps/docs/shard.md)
- [PubSub](./apps/docs/pubsub.md)
- [Relay](./packages/relay)
- [Transport](./packages/transport)

### Tell others that you use DStack

Badge:

[![dstack](https://dstack.dev/img/badge.svg)](https://dstack.dev)

```markdown
[![dstack](https://dstack.dev/img/badge.svg)](https://dstack.dev)
```

## Workspace

DStack workspace is managed by [nx.dev](https://nx.dev)

### Packages

- [lib](./packages/lib) - Core library
- [relay](./packages/relay) - Relay
- [transport](./packages/transport) - `libp2p-webrtc-star` fork for relay
- [ipfs](./packages/ipfs) - IPFS
- [docs](./docs) - Docs

### Commands

Build packages:

```console
yarn build
```

Lint packages:

```console
yarn lint
```

Start packages:

```console
yarn serve
```

Bump packages version:

```console
yarn release
```

## Stargazers over time

[![Stargazers over time](https://starchart.cc/dstack-js/dstack.svg)](https://starchart.cc/dstack-js/dstack)

## License

All packages are licensed under GPL-3.0, except [transport is licensed under MIT](./packages/transport/LICENSE).

See [LICENSE](../LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdstack-js%2Fdstack.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdstack-js%2Fdstack?ref=badge_large)

[license]: https://github.com/dstack-js/dstack/blob/main/LICENSE
[license-badge]: https://img.shields.io/github/license/dstack-js/dstack
[issues]: https://github.com/dstack-js/dstack/issues
[issues-badge]: https://img.shields.io/github/issues/dstack-js/dstack
[npm]: https://www.npmjs.com/package/@dstack-js/lib
[npm-badge]: https://img.shields.io/npm/v/@dstack-js/lib
[ci]: https://github.com/dstack-js/dstack/actions/workflows/nx.yaml
[ci-badge]: https://github.com/dstack-js/dstack/actions/workflows/nx.yaml/badge.svg
[fossa-badge]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdstack-js%2Fdstack.svg?type=shield
[fossa]: https://app.fossa.com/projects/git%2Bgithub.com%2Fdstack-js%2Fdstack
[discord-badge]: https://discordapp.com/api/guilds/890305580139446322/widget.png?style=shield
[discord]: https://discord.link/dstack
[changelog-badge]: https://img.shields.io/badge/DStack-changelog-blue
[changelog]: https://dstack.dev/changelog
[explorer]: https://explorer.dstack.dev
[explorer-badge]: https://api.netlify.com/api/v1/badges/995efbf9-cafc-4354-b597-44a13e872d34/deploy-status
[explorer-deploys]: https://app.netlify.com/sites/dstack-explorer/deploys
[docs]: https://dstack.dev
[docs-badge]: https://api.netlify.com/api/v1/badges/aa98407a-eb62-401d-a403-4ea91e55d37b/deploy-status
[docs-deploys]: https://app.netlify.com/sites/dstack-docs/deploys
