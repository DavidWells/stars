---
repo: Kikobeats/use-query-state
url: 'https://github.com/Kikobeats/use-query-state'
homepage: null
starredAt: '2021-04-23T17:30:28Z'
createdAt: '2021-01-16T20:30:40Z'
updatedAt: '2022-10-19T12:27:31Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:47.832Z'
description: React hook to set/retrieve state from URL query string.
tags: []
---

# use-query-state

> React hook for sharing state via URL.

## Installation

```bash
$ npm install @Kikobeats/use-query-state --save
```

## Usage

### Get query state

Just get it from `window.location.search`

```jsx
const [query, setQuery] = useQueryState()
```

### Pass a initial query state

This is especially useful for Server-side Rendering (SSR), when the initial query state will depends on the incoming request.

```jsx
const [query, setQuery] = useQueryState(ssrQuery)
```

### Transform the query state

Sometimes you want to modify the `window.location.search` for anything you need for.

```jsx
const safeDecode = value => {
  try {
    return decodeURIComponent(value)
  } catch (_) {
    return value
  }
}

const [query, setQuery] = useQueryState(undefined, parsedQuery =>
  Object.entries(parsedQuery).reduce((acc, [key, value]) => {
    acc[key] = safeDecode(value)
    return acc
  }, {})
)
```

## Considerations

### for Gatsby

Gatsby uses [`navigate`](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#navigate-api-surface-area) instead of `window.history.pushState`, so you you need to load `@kikobeats/use-query-state/gatsby` instead.


## License

**use-query-state** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/use-query-state/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/use-query-state/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
