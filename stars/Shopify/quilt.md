---
repo: Shopify/quilt
url: 'https://github.com/Shopify/quilt'
homepage: ''
starredAt: '2021-11-30T02:35:10Z'
createdAt: '2018-03-27T19:20:06Z'
updatedAt: '2025-02-24T02:20:56Z'
language: TypeScript
license: MIT
branch: main
stars: 1697
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.595Z'
description: >-
  [⚠️ Deprecated] A loosely related set of packages for JavaScript/TypeScript
  projects at Shopify
tags: []
---

[comment]: # (NOTE: This file is generated and should not be modify directly. Update `templates/ROOT_README.hbs.md` instead)

> [!CAUTION]
> Quilt is no longer maintained. The packages listed below are deprecated.
>
> Functionality can be replaced with more modern and maintained open source
> projects, or implemented in userland along side the latest versions of
> koa/react/etc.
>
> Shopifolk, see
> [Shopify/quilt-internal](https://github.com/shopify/quilt-internal) for
> information on the latest packages available for use internally.

# Quilt

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://github.com/Shopify/quilt/workflows/Node-CI/badge.svg?branch=main)](https://github.com/Shopify/quilt/actions?query=workflow%3ANode-CI)
[![Build Status](https://github.com/Shopify/quilt/workflows/Ruby-CI/badge.svg?branch=main)](https://github.com/Shopify/quilt/actions?query=workflow%3ARuby-CI)

A loosely related set of packages for JavaScript/TypeScript projects at Shopify.

These libraries compose together to help you create performant modern JS apps that you love to develop and test. These packages are developed primarily to be used on top of the stack we like best for our JS apps; Typescript for the flavor, Koa for the server, React for UI, Apollo for data fetching, and Jest for tests. That said, you can mix and match as you like.

⚠️ Over the past few years, this repo has become a dumping ground for a variety of packages unrelated to the core problems Quilt, and it's stewards - the Admin Web Foundation team - aims to solve. Before submitting a pull request, please speak with the Admin Web Platform team on guidance as to whether a package might belong in Quilt. The Admin Web Platform team's focus is on the `web` codebase. If you're proposing a package that has not already been widely used in the `web` codebase then it is unlikely that it would be merged into Quilt.

## Usage

The Quilt repo is managed as a monorepo that is composed of 67 npm packages and one Ruby gem.
Each package/gem has its own `README.md` and documentation describing usage.

### Package Index

| Package | Version | Status | Description |
| ------- | ------- | ------ | ----------- |
| [@shopify/address](packages/address) | <a href="https://badge.fury.io/js/%40shopify%2Faddress"><img src="https://badge.fury.io/js/%40shopify%2Faddress.svg" width="200px" /></a> | ⚠️ Deprecated | Address utilities for formatting addresses |
| [@shopify/address-consts](packages/address-consts) | <a href="https://badge.fury.io/js/%40shopify%2Faddress-consts"><img src="https://badge.fury.io/js/%40shopify%2Faddress-consts.svg" width="200px" /></a> | ⚠️ Deprecated | Constants and types relating to `@shopify/address` |
| [@shopify/address-mocks](packages/address-mocks) | <a href="https://badge.fury.io/js/%40shopify%2Faddress-mocks"><img src="https://badge.fury.io/js/%40shopify%2Faddress-mocks.svg" width="200px" /></a> | ⚠️ Deprecated | Address mocks for `@shopify/address` |
| [@shopify/admin-graphql-api-utilities](packages/admin-graphql-api-utilities) | <a href="https://badge.fury.io/js/%40shopify%2Fadmin-graphql-api-utilities"><img src="https://badge.fury.io/js/%40shopify%2Fadmin-graphql-api-utilities.svg" width="200px" /></a> | ⚠️ Deprecated | A set of utilities to use when consuming Shopify’s admin GraphQL API |
| [@shopify/async](packages/async) | <a href="https://badge.fury.io/js/%40shopify%2Fasync"><img src="https://badge.fury.io/js/%40shopify%2Fasync.svg" width="200px" /></a> | ⚠️ Deprecated | Primitives for loading parts of an application asynchronously |
| [@shopify/browser](packages/browser) | <a href="https://badge.fury.io/js/%40shopify%2Fbrowser"><img src="https://badge.fury.io/js/%40shopify%2Fbrowser.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities for extracting browser information from user-agents |
| [@shopify/csrf-token-fetcher](packages/csrf-token-fetcher) | <a href="https://badge.fury.io/js/%40shopify%2Fcsrf-token-fetcher"><img src="https://badge.fury.io/js/%40shopify%2Fcsrf-token-fetcher.svg" width="200px" /></a> | ⚠️ Deprecated | JavaScript utility function to fetch the CSRF token required to make requests to a Rails server |
| [@shopify/css-utilities](packages/css-utilities) | <a href="https://badge.fury.io/js/%40shopify%2Fcss-utilities"><img src="https://badge.fury.io/js/%40shopify%2Fcss-utilities.svg" width="200px" /></a> | ⚠️ Deprecated | A set of CSS styling-related utilities |
| [@shopify/dates](packages/dates) | <a href="https://badge.fury.io/js/%40shopify%2Fdates"><img src="https://badge.fury.io/js/%40shopify%2Fdates.svg" width="200px" /></a> | ⚠️ Deprecated | Lightweight date operations library |
| [@shopify/function-enhancers](packages/function-enhancers) | <a href="https://badge.fury.io/js/%40shopify%2Ffunction-enhancers"><img src="https://badge.fury.io/js/%40shopify%2Ffunction-enhancers.svg" width="200px" /></a> | ⚠️ Deprecated | A set of helpers to enhance functions |
| [graphql-config-utilities](packages/graphql-config-utilities) | <a href="https://badge.fury.io/js/graphql-config-utilities"><img src="https://badge.fury.io/js/graphql-config-utilities.svg" width="200px" /></a> | ⚠️ Deprecated | Common utilities for graphql-config |
| [graphql-fixtures](packages/graphql-fixtures) | <a href="https://badge.fury.io/js/graphql-fixtures"><img src="https://badge.fury.io/js/graphql-fixtures.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities for generating fixture objects from GraphQL documents. |
| [graphql-mini-transforms](packages/graphql-mini-transforms) | <a href="https://badge.fury.io/js/graphql-mini-transforms"><img src="https://badge.fury.io/js/graphql-mini-transforms.svg" width="200px" /></a> | ⚠️ Deprecated | Transformers for importing .graphql files in various build tools. |
| [@shopify/graphql-testing](packages/graphql-testing) | <a href="https://badge.fury.io/js/%40shopify%2Fgraphql-testing"><img src="https://badge.fury.io/js/%40shopify%2Fgraphql-testing.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities to create mock GraphQL factories |
| [graphql-tool-utilities](packages/graphql-tool-utilities) | <a href="https://badge.fury.io/js/graphql-tool-utilities"><img src="https://badge.fury.io/js/graphql-tool-utilities.svg" width="200px" /></a> | ⚠️ Deprecated | Common utilities for GraphQL developer tools |
| [graphql-typed](packages/graphql-typed) | <a href="https://badge.fury.io/js/graphql-typed"><img src="https://badge.fury.io/js/graphql-typed.svg" width="200px" /></a> | ⚠️ Deprecated | A more strongly typed version of GraphQL's DocumentNode. |
| [graphql-typescript-definitions](packages/graphql-typescript-definitions) | <a href="https://badge.fury.io/js/graphql-typescript-definitions"><img src="https://badge.fury.io/js/graphql-typescript-definitions.svg" width="200px" /></a> | ⚠️ Deprecated | Generate TypeScript definition files from .graphql documents |
| [@shopify/i18n](packages/i18n) | <a href="https://badge.fury.io/js/%40shopify%2Fi18n"><img src="https://badge.fury.io/js/%40shopify%2Fi18n.svg" width="200px" /></a> | ⚠️ Deprecated | Generic i18n-related utilities |
| [@shopify/jest-dom-mocks](packages/jest-dom-mocks) | <a href="https://badge.fury.io/js/%40shopify%2Fjest-dom-mocks"><img src="https://badge.fury.io/js/%40shopify%2Fjest-dom-mocks.svg" width="200px" /></a> | ⚠️ Deprecated | Jest mocking utilities for working with the DOM |
| [@shopify/jest-koa-mocks](packages/jest-koa-mocks) | <a href="https://badge.fury.io/js/%40shopify%2Fjest-koa-mocks"><img src="https://badge.fury.io/js/%40shopify%2Fjest-koa-mocks.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities to easily stub Koa context and cookies |
| [@shopify/koa-liveness-ping](packages/koa-liveness-ping) | <a href="https://badge.fury.io/js/%40shopify%2Fkoa-liveness-ping"><img src="https://badge.fury.io/js/%40shopify%2Fkoa-liveness-ping.svg" width="200px" /></a> | ⚠️ Deprecated | A package for creating liveness ping middleware for use with Koa |
| [@shopify/koa-metrics](packages/koa-metrics) | <a href="https://badge.fury.io/js/%40shopify%2Fkoa-metrics"><img src="https://badge.fury.io/js/%40shopify%2Fkoa-metrics.svg" width="200px" /></a> | ⚠️ Deprecated | Aims to provide standard middleware and instrumentation tooling for metrics in Koa |
| [@shopify/koa-performance](packages/koa-performance) | <a href="https://badge.fury.io/js/%40shopify%2Fkoa-performance"><img src="https://badge.fury.io/js/%40shopify%2Fkoa-performance.svg" width="200px" /></a> | ⚠️ Deprecated | Creating middleware that sends performance-related data through StatsD |
| [@shopify/koa-shopify-graphql-proxy](packages/koa-shopify-graphql-proxy) | <a href="https://badge.fury.io/js/%40shopify%2Fkoa-shopify-graphql-proxy"><img src="https://badge.fury.io/js/%40shopify%2Fkoa-shopify-graphql-proxy.svg" width="200px" /></a> | ⚠️ Deprecated | A wrapper around `koa-better-http-proxy` which allows easy proxying of GraphQL requests from an embedded Shopify app |
| [@shopify/koa-shopify-webhooks](packages/koa-shopify-webhooks) | <a href="https://badge.fury.io/js/%40shopify%2Fkoa-shopify-webhooks"><img src="https://badge.fury.io/js/%40shopify%2Fkoa-shopify-webhooks.svg" width="200px" /></a> | ⚠️ Deprecated | Receive webhooks from Shopify with ease |
| [@shopify/mime-types](packages/mime-types) | <a href="https://badge.fury.io/js/%40shopify%2Fmime-types"><img src="https://badge.fury.io/js/%40shopify%2Fmime-types.svg" width="200px" /></a> | ⚠️ Deprecated | MIME type consistency |
| [@shopify/name](packages/name) | <a href="https://badge.fury.io/js/%40shopify%2Fname"><img src="https://badge.fury.io/js/%40shopify%2Fname.svg" width="200px" /></a> | ⚠️ Deprecated | Name-related utilities |
| [@shopify/network](packages/network) | <a href="https://badge.fury.io/js/%40shopify%2Fnetwork"><img src="https://badge.fury.io/js/%40shopify%2Fnetwork.svg" width="200px" /></a> | ⚠️ Deprecated | Common values related to dealing with the network |
| [@shopify/performance](packages/performance) | <a href="https://badge.fury.io/js/%40shopify%2Fperformance"><img src="https://badge.fury.io/js/%40shopify%2Fperformance.svg" width="200px" /></a> | ⚠️ Deprecated | Primitives for collecting browser performance metrics |
| [@shopify/phone](packages/phone) | <a href="https://badge.fury.io/js/%40shopify%2Fphone"><img src="https://badge.fury.io/js/%40shopify%2Fphone.svg" width="200px" /></a> | ⚠️ Deprecated | Phone number utilities for formatting phone numbers |
| [@shopify/polyfills](packages/polyfills) | <a href="https://badge.fury.io/js/%40shopify%2Fpolyfills"><img src="https://badge.fury.io/js/%40shopify%2Fpolyfills.svg" width="200px" /></a> | ⚠️ Deprecated | Blessed polyfills for web platform features |
| [@shopify/predicates](packages/predicates) | <a href="https://badge.fury.io/js/%40shopify%2Fpredicates"><img src="https://badge.fury.io/js/%40shopify%2Fpredicates.svg" width="200px" /></a> | ⚠️ Deprecated | A set of common JavaScript predicates |
| [@shopify/react-async](packages/react-async) | <a href="https://badge.fury.io/js/%40shopify%2Freact-async"><img src="https://badge.fury.io/js/%40shopify%2Freact-async.svg" width="200px" /></a> | ⚠️ Deprecated | Tools for creating powerful, asynchronously-loaded React components |
| [@shopify/react-bugsnag](packages/react-bugsnag) | <a href="https://badge.fury.io/js/%40shopify%2Freact-bugsnag"><img src="https://badge.fury.io/js/%40shopify%2Freact-bugsnag.svg" width="200px" /></a> | ⚠️ Deprecated | An opinionated wrapper for Bugsnag's React plugin |
| [@shopify/react-compose](packages/react-compose) | <a href="https://badge.fury.io/js/%40shopify%2Freact-compose"><img src="https://badge.fury.io/js/%40shopify%2Freact-compose.svg" width="200px" /></a> | ⚠️ Deprecated | Cleanly compose multiple component enhancers together with minimal fuss |
| [@shopify/react-cookie](packages/react-cookie) | <a href="https://badge.fury.io/js/%40shopify%2Freact-cookie"><img src="https://badge.fury.io/js/%40shopify%2Freact-cookie.svg" width="200px" /></a> | ⚠️ Deprecated | Cookies in React for the server and client |
| [@shopify/react-csrf](packages/react-csrf) | <a href="https://badge.fury.io/js/%40shopify%2Freact-csrf"><img src="https://badge.fury.io/js/%40shopify%2Freact-csrf.svg" width="200px" /></a> | ⚠️ Deprecated | Share CSRF tokens throughout a React application |
| [@shopify/react-csrf-universal-provider](packages/react-csrf-universal-provider) | <a href="https://badge.fury.io/js/%40shopify%2Freact-csrf-universal-provider"><img src="https://badge.fury.io/js/%40shopify%2Freact-csrf-universal-provider.svg" width="200px" /></a> | ⚠️ Deprecated | A self-serializing/deserializing CSRF token provider that works for isomorphic applications |
| [@shopify/react-effect](packages/react-effect) | <a href="https://badge.fury.io/js/%40shopify%2Freact-effect"><img src="https://badge.fury.io/js/%40shopify%2Freact-effect.svg" width="200px" /></a> | ⚠️ Deprecated | A component and set of utilities for performing effects within a universal React app |
| [@shopify/react-form](packages/react-form) | <a href="https://badge.fury.io/js/%40shopify%2Freact-form"><img src="https://badge.fury.io/js/%40shopify%2Freact-form.svg" width="200px" /></a> | ⚠️ Deprecated | Manage React forms tersely and safely-typed with no magic using React hooks |
| [@shopify/react-form-state](packages/react-form-state) | <a href="https://badge.fury.io/js/%40shopify%2Freact-form-state"><img src="https://badge.fury.io/js/%40shopify%2Freact-form-state.svg" width="200px" /></a> | ⚠️ Deprecated | Manage React forms tersely and type-safely with no magic |
| [@shopify/react-google-analytics](packages/react-google-analytics) | <a href="https://badge.fury.io/js/%40shopify%2Freact-google-analytics"><img src="https://badge.fury.io/js/%40shopify%2Freact-google-analytics.svg" width="200px" /></a> | ⚠️ Deprecated | Allows React apps to easily embed Google Analytics scripts |
| [@shopify/react-graphql](packages/react-graphql) | <a href="https://badge.fury.io/js/%40shopify%2Freact-graphql"><img src="https://badge.fury.io/js/%40shopify%2Freact-graphql.svg" width="200px" /></a> | ⚠️ Deprecated | Tools for creating type-safe and asynchronous GraphQL components for React |
| [@shopify/react-graphql-universal-provider](packages/react-graphql-universal-provider) | <a href="https://badge.fury.io/js/%40shopify%2Freact-graphql-universal-provider"><img src="https://badge.fury.io/js/%40shopify%2Freact-graphql-universal-provider.svg" width="200px" /></a> | ⚠️ Deprecated | A self-serializing/deserializing GraphQL provider that works for isomorphic applications |
| [@shopify/react-hooks](packages/react-hooks) | <a href="https://badge.fury.io/js/%40shopify%2Freact-hooks"><img src="https://badge.fury.io/js/%40shopify%2Freact-hooks.svg" width="200px" /></a> | ⚠️ Deprecated | A collection of primitive React hooks |
| [@shopify/react-html](packages/react-html) | <a href="https://badge.fury.io/js/%40shopify%2Freact-html"><img src="https://badge.fury.io/js/%40shopify%2Freact-html.svg" width="200px" /></a> | ⚠️ Deprecated | A component to render your React app with no static HTML |
| [@shopify/react-hydrate](packages/react-hydrate) | <a href="https://badge.fury.io/js/%40shopify%2Freact-hydrate"><img src="https://badge.fury.io/js/%40shopify%2Freact-hydrate.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities for hydrating server-rendered React apps |
| [@shopify/react-i18n](packages/react-i18n) | <a href="https://badge.fury.io/js/%40shopify%2Freact-i18n"><img src="https://badge.fury.io/js/%40shopify%2Freact-i18n.svg" width="200px" /></a> | ⚠️ Deprecated | i18n utilities for React handling translations, formatting, and more |
| [@shopify/react-i18n-universal-provider](packages/react-i18n-universal-provider) | <a href="https://badge.fury.io/js/%40shopify%2Freact-i18n-universal-provider"><img src="https://badge.fury.io/js/%40shopify%2Freact-i18n-universal-provider.svg" width="200px" /></a> | ⚠️ Deprecated | A self-serializing/deserializing i18n provider that works for isomorphic applications |
| [@shopify/react-idle](packages/react-idle) | <a href="https://badge.fury.io/js/%40shopify%2Freact-idle"><img src="https://badge.fury.io/js/%40shopify%2Freact-idle.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities for working with idle callbacks in React |
| [@shopify/react-import-remote](packages/react-import-remote) | <a href="https://badge.fury.io/js/%40shopify%2Freact-import-remote"><img src="https://badge.fury.io/js/%40shopify%2Freact-import-remote.svg" width="200px" /></a> | ⚠️ Deprecated | Asynchronous script loading for React |
| [@shopify/react-intersection-observer](packages/react-intersection-observer) | <a href="https://badge.fury.io/js/%40shopify%2Freact-intersection-observer"><img src="https://badge.fury.io/js/%40shopify%2Freact-intersection-observer.svg" width="200px" /></a> | ⚠️ Deprecated | A React wrapper around the Intersection Observer API |
| [@shopify/react-network](packages/react-network) | <a href="https://badge.fury.io/js/%40shopify%2Freact-network"><img src="https://badge.fury.io/js/%40shopify%2Freact-network.svg" width="200px" /></a> | ⚠️ Deprecated | A collection of components that allow you to set common HTTP headers from within your React application |
| [@shopify/react-performance](packages/react-performance) | <a href="https://badge.fury.io/js/%40shopify%2Freact-performance"><img src="https://badge.fury.io/js/%40shopify%2Freact-performance.svg" width="200px" /></a> | ⚠️ Deprecated | Primitives to measure your React application's performance using `@shopify/performance` |
| [@shopify/react-router](packages/react-router) | <a href="https://badge.fury.io/js/%40shopify%2Freact-router"><img src="https://badge.fury.io/js/%40shopify%2Freact-router.svg" width="200px" /></a> | ⚠️ Deprecated | A universal router for React |
| [@shopify/react-server](packages/react-server) | <a href="https://badge.fury.io/js/%40shopify%2Freact-server"><img src="https://badge.fury.io/js/%40shopify%2Freact-server.svg" width="200px" /></a> | ⚠️ Deprecated | Utilities for React server-side rendering |
| [@shopify/react-shortcuts](packages/react-shortcuts) | <a href="https://badge.fury.io/js/%40shopify%2Freact-shortcuts"><img src="https://badge.fury.io/js/%40shopify%2Freact-shortcuts.svg" width="200px" /></a> | ⚠️ Deprecated | Declaratively and efficiently match shortcut combinations in your React application |
| [@shopify/react-testing](packages/react-testing) | <a href="https://badge.fury.io/js/%40shopify%2Freact-testing"><img src="https://badge.fury.io/js/%40shopify%2Freact-testing.svg" width="200px" /></a> | ⚠️ Deprecated | A library for testing React components according to our conventions |
| [@shopify/react-universal-provider](packages/react-universal-provider) | <a href="https://badge.fury.io/js/%40shopify%2Freact-universal-provider"><img src="https://badge.fury.io/js/%40shopify%2Freact-universal-provider.svg" width="200px" /></a> | ⚠️ Deprecated | Factory function and utilities to create self-serializing/deserializing providers that work for isomorphic applications |
| [@shopify/react-web-worker](packages/react-web-worker) | <a href="https://badge.fury.io/js/%40shopify%2Freact-web-worker"><img src="https://badge.fury.io/js/%40shopify%2Freact-web-worker.svg" width="200px" /></a> | ⚠️ Deprecated | A hook for using web workers in React applications |
| [@shopify/semaphore](packages/semaphore) | <a href="https://badge.fury.io/js/%40shopify%2Fsemaphore"><img src="https://badge.fury.io/js/%40shopify%2Fsemaphore.svg" width="200px" /></a> | ⚠️ Deprecated | Counting semaphore |
| [@shopify/sewing-kit-koa](packages/sewing-kit-koa) | <a href="https://badge.fury.io/js/%40shopify%2Fsewing-kit-koa"><img src="https://badge.fury.io/js/%40shopify%2Fsewing-kit-koa.svg" width="200px" /></a> | ⚠️ Deprecated | Easily access Sewing Kit assets from a Koa server |
| [@shopify/statsd](packages/statsd) | <a href="https://badge.fury.io/js/%40shopify%2Fstatsd"><img src="https://badge.fury.io/js/%40shopify%2Fstatsd.svg" width="200px" /></a> | ⚠️ Deprecated | An opinionated StatsD client for Shopify Node.js servers and other StatsD utilities |
| [@shopify/storybook-a11y-test](packages/storybook-a11y-test) | <a href="https://badge.fury.io/js/%40shopify%2Fstorybook-a11y-test"><img src="https://badge.fury.io/js/%40shopify%2Fstorybook-a11y-test.svg" width="200px" /></a> | ⚠️ Deprecated | Test storybook pages with axe and puppeteer |
| [@shopify/useful-types](packages/useful-types) | <a href="https://badge.fury.io/js/%40shopify%2Fuseful-types"><img src="https://badge.fury.io/js/%40shopify%2Fuseful-types.svg" width="200px" /></a> | ⚠️ Deprecated | A few handy TypeScript types |
| [@shopify/web-worker](packages/web-worker) | <a href="https://badge.fury.io/js/%40shopify%2Fweb-worker"><img src="https://badge.fury.io/js/%40shopify%2Fweb-worker.svg" width="200px" /></a> | ⚠️ Deprecated | Tools for making web workers fun to use |
| [@shopify/with-env](packages/with-env) | <a href="https://badge.fury.io/js/%40shopify%2Fwith-env"><img src="https://badge.fury.io/js/%40shopify%2Fwith-env.svg" width="200px" /></a> | ⚠️ Deprecated | A utility for executing code under a specific `NODE_ENV` |

### Gem Index

| Gem | Version | Status | Description |
| --- | ------- | ------ | ----------- |
| [quilt_rails](gems/quilt_rails) | <a href="https://badge.fury.io/rb/quilt_rails"><img src="https://badge.fury.io/rb/quilt_rails.svg" width="200px" /></a> | ⚠️ Deprecated | A turn-key solution for integrating server-rendered React into your Rails app using Quilt libraries. |

## Want to contribute?

Check out our [Contributing Guide](./.github/CONTRIBUTING.md)

## Questions?

For Shopifolk, you can reach out to us in Slack in the `#help-admin-web-platform` channel. For external inquiries, we welcome bug reports, enhancements, and feature requests via GitHub issues.

## License

MIT &copy; [Shopify](https://shopify.com/), see [LICENSE.md](LICENSE.md) for details.

[<img src="images/shopify.svg" alt="Shopify" width="200" />](https://www.shopify.com/)
