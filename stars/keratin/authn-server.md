---
repo: keratin/authn-server
url: 'https://github.com/keratin/authn-server'
homepage: 'https://keratin.github.io'
starredAt: '2024-12-27T06:40:37Z'
createdAt: '2017-06-23T17:59:36Z'
updatedAt: '2025-02-21T14:58:58Z'
language: Go
license: LGPL-3.0
branch: main
stars: 1279
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:36.593Z'
description: >-
  Authentication service that keeps you in control without forcing you to be an
  expert in web security.
tags:
  - api-service
  - authentication-backend
  - authn
  - jwt-authentication
  - service
---

# Keratin AuthN

[![Keratin Pangolin](docs/assets/pangolin-logo-dark.gif)](https://keratin.github.io)
A modern authentication backend service. ([https://keratin.github.io](https://keratin.github.io))

[![Gitter](https://badges.gitter.im/keratin/authn-server.svg)](https://gitter.im/keratin/authn-server?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)[![Build Status](https://travis-ci.org/keratin/authn-server.svg?branch=master)](https://travis-ci.org/keratin/authn-server)[![Coverage Status](https://coveralls.io/repos/github/keratin/authn-server/badge.svg)](https://coveralls.io/github/keratin/authn-server)[![Go Report](https://goreportcard.com/badge/github.com/keratin/authn-server)](https://goreportcard.com/report/github.com/keratin/authn-server)

## Related

This repository builds a backend Go service that provides secured endpoints related to accounts and passwords. You must integrate it with your application's frontend(s) and backend(s).

Client libraries are currently available for:

* Backends: [Ruby](https://github.com/keratin/authn-rb) • [Go](https://github.com/keratin/authn-go) • [NodeJS](https://github.com/keratin/authn-node)
* Frontends: [JavaScript](https://github.com/keratin/authn-js)

If you are missing a client library, please [submit a request](https://github.com/keratin/authn-server/issues).

## Implementation

[Documentation](https://github.com/keratin/authn-server/blob/master/docs/README.md)

## Deployment

[Documentation](https://github.com/keratin/authn-server/blob/master/docs/README.md)

## Configuration

All configuration is through ENV variables.

[Documentation](https://github.com/keratin/authn-server/blob/master/docs/config.md)

## Contributing

Welcome! Please familiarize yourself with the [CONTRIBUTING](CONTRIBUTING.md) doc and the [CODE OF CONDUCT](CODE_OF_CONDUCT.md).

### Getting Started

1. `go get github.com/keratin/authn-server`
2. Install Docker and docker-compose.
3. Run `make test` to ensure a clean build

### Run a Dev Server

1. Create a `.env` file with desired configuration
2. Run `make migrate`
3. Run `make server`

## COPYRIGHT & LICENSE

Copyright (c) 2016-2022 Lance Ivy

Keratin AuthN is distributed under the terms of the LGPLv3. See [LICENSE-LGPLv3](LICENSE-LGPLv3) for details.
