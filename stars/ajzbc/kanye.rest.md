---
repo: ajzbc/kanye.rest
url: 'https://github.com/ajzbc/kanye.rest'
homepage: 'https://kanye.rest'
starredAt: '2019-03-16T18:02:16Z'
createdAt: '2019-02-12T06:10:07Z'
updatedAt: '2025-02-20T13:45:37Z'
language: TypeScript
license: MIT
branch: master
stars: 904
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:42.236Z'
description: "\U0001F30A A free REST API for random Kanye West quotes (Kanye as a Service) "
tags:
  - api
  - cloudflare
  - cloudflare-worker
  - kanye
  - kanye-west
  - quote
  - quote-generator
  - quotes
  - random
  - worker
  - workers
---

# [kanye.rest](https://kanye.rest)

A free REST API for random Kanye West quotes (Kanye as a Service).

Built with [Cloudflare Workers](https://workers.cloudflare.com/).

## Usage

### `GET` [https://api.kanye.rest](https://api.kanye.rest)

```json
{
  "quote": "I feel like I'm too busy writing history to read it."
}
```

### `GET` [https://api.kanye.rest/text](https://api.kanye.rest/text)

```text
The world is our office
```

### `GET` [https://api.kanye.rest/quotes](https://api.kanye.rest/quotes)

> [!WARNING]  
> This response format may change.

```ts
[
    ...,
    "I leave my emojis bart Simpson color",
    "I love sleep; it's my favorite.",
    ...,
]
```

## Development

```shell
pnpm dev
```

## License

MIT
