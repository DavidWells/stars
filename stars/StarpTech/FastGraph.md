---
repo: StarpTech/FastGraph
url: 'https://github.com/StarpTech/FastGraph'
homepage: ''
starredAt: '2021-11-22T04:45:49Z'
createdAt: '2021-07-28T15:59:44Z'
updatedAt: '2024-10-20T17:00:33Z'
language: TypeScript
license: MIT
branch: main
stars: 108
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:35.868Z'
description: Smart GraphQL CDN on Cloudflare edges with zero configuration
tags: []
---

<div align="center">
  <img src="logo-new.png" alt="fastgraph" />
</div>

<div align="center">
  <a href="https://github.com/StarpTech/FastGraph/actions?query=workflow%3Aci">
    <img src="https://github.com/StarpTech/FastGraph/actions/workflows/ci.yml/badge.svg?event=push" alt="CI" />
  </a>
</div>

<div align="center">Smart GraphQL CDN on Cloudflare edges with zero configuration</div>

## Features

- Cache POST GraphQL queries
- Works with [Apollo Cache Control Plugin](https://www.apollographql.com/docs/apollo-server/performance/caching)
- Set appropriate cache headers `age`, `x-cache`, `cache-control` or respect your origin header
- Cache authenticated data when specific GraphQL directive or types are used
- Cache can be invalidated programmatically with [cli-wrangler](https://developers.cloudflare.com/workers/cli-wrangler) or [REST API](https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair)
- Transparent [APQ](https://www.apollographql.com/docs/apollo-server/performance/apq/) proxy with CDN [caching](https://developers.cloudflare.com/workers/runtime-apis/cache) capabilities.

## Caching semantics

All GraphQL queries are cached by default with a TTL of 900 seconds (15min). You can set a custom TTL per request by responding with a different `max-age` value from your origin.

### Cache authenticated data

We provide different features to work with authenticated data:

1. `SCOPE=AUTHENTICATED` This will enforce to cache all requests in relation to the _Authorization_ header.
2. `AUTH_DIRECTIVE=auth` The request is validated for the presence of the `auth` GraphQL directive on `OBJECT | FIELD_DEFINITION`. When matched the request is handled as scope `AUTHENTICATED`.
3. `PRIVATE_TYPES=User,Profile` The request is validated for the presence of specific GraphQL types. When matched the request is handled as scope `AUTHENTICATED`.

In order to use option `2` and `3` you have to push your schema to cloudflare. The latency will increase with the schema size on the first request against every new V8 isolate instance (cloudworker primitive).

```sh
wrangler kv:key put --binding=SCHEMA "schema::latest" --path "$YOUR_SCHEMA_FILE"
```

> Don't forget to validate your schema before you push it!

> For `APQ` requests the _Authorization_ header is respected in the CDN [cache](https://developers.cloudflare.com/workers/runtime-apis/cache).

## Cache invalidation

With basic plan you can purge all or only by a single key. This is not practical because we work with hashes. You would need to upgrade your plan in order to purge by
by Cache-Tags, Host or Prefix.

- POST requests

  - Tags: `operationName` and `sha256Hash`
  - URL: `${pathname}/${operationName}/${queryHash + authHeader}`

- APQ
  - Tags: `operationName` and `sha256Hash`
  - URL: `${pathname}/${operationName}/${queryHash + authHeader}`

More info: https://api.cloudflare.com/#zone-purge-files-by-cache-tags,-host-or-prefix

## Getting Started

```sh
# Install project
npm install
# Install wrangler cli
npm i @cloudflare/wrangler -g
# Authenticate with your account
wrangler login
# Deploy your worker
npm run deploy
```

## Configuration

Set the variables in your `wrangler.toml`.

- **ORIGIN_URL**: The url of your production backend you want your service to proxy to.
- **DEFAULT_TTL**: The default TTL (minimum 60s) of cacheable responses (_Default:_ `900`)
- **APQ_TTL**: The default TTL (minimum 60s) of APQ queries (_Default:_ `900`)
- **SWR**: The default value for the `stale-while-revalidate` cache directive (_Default:_ `900`)
- **PRIVATE_TYPES**: The GraphQL types that indicates a private response (_Default:_ `""`, _Example:_ `"User,Profile"`)
- **AUTH_DIRECTIVE**: The GraphQL directive on object or field definition that marks the request as private (_Default:_ `""`)
- **SCOPE**: The default cache scope. Use `AUTHENTICATED` to enforce per-user cache based on `Authorization` header. (_Default:_ `"PUBLIC"`, _Options:_ `"PUBLIC","AUTHENTICATED"`)
- **IGNORE_ORIGIN_CACHE_HEADERS**: Should the origin `cache-control` headers be ignored? (_Default:_ `"1"`, _Options:_ `"","1"`)

## Example

### FastGraph cURL request

```sh
curl --request POST \
  -v --compressed \
  -o /dev/null -sS \
  --url https://gitlab.fastgraph.de/graphql \
  --header 'Accept-Encoding: gzip' \
  --header 'Content-Type: application/json' \
  --data '{"query":"{\n  projects {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"}' \
  -w "Timings\n------\ntotal:   %{time_total}\nconnect: %{time_connect}\ntls:     %{time_appconnect}\n"
```

### Source API cURL request

```sh
curl --request POST \
  -v --compressed \
  -o /dev/null -sS \
  --url https://gitlab.com/api/graphql \
  --header 'Accept-Encoding: gzip' \
  --header 'Content-Type: application/json' \
  --data '{"query":"{\n  projects {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"}' \
  -w "Timings\n------\ntotal:   %{time_total}\nconnect: %{time_connect}\ntls:     %{time_appconnect}\n"
```

## Latency Results

Here are some sample response times using FastGraph vs. making requests to the Gitlab GraphQL API directly:

| Request Method                               | Test 1 | Test 2 | Test 3 |
| -------------------------------------------- | ------ | ------ | ------ |
| [Gitlab API](https://gitlab.com/api/graphql) | 0.90s  | 1.01s  | 1.08s  |
| With FastGraph                               | 0.15s  | 0.13s  | 0.11s  |

## Performance & Security

Requests are cached with the Cloudflare [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). APQ queries are stored in the Key-value Store of cloudflare. All data is encrypted at rest with 256-bit AES-GCM.

Check [How KV works](https://developers.cloudflare.com/workers/learning/how-kv-works) to learn more about it.

## Pricing

You can use the [free tier](https://developers.cloudflare.com/workers/platform/limits#worker-limits).

## Development & Deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/StarpTech/FastGraph)

```sh
npm run dev
```

### Detailed logs

```sh
wrangler tail
```
