---
repo: minuukang/rescript-relay-next-ssr-template
url: 'https://github.com/minuukang/rescript-relay-next-ssr-template'
homepage: ''
starredAt: '2022-12-03T20:05:01Z'
createdAt: '2022-12-03T17:49:37Z'
updatedAt: '2023-11-05T23:35:25Z'
language: ReScript
license: NA
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:07.760Z'
description: Rescript + Relay + Next.js + SSR example!
tags:
  - nextjs
  - relay
  - rescript
  - rescript-relay
  - ssr
---

# Rescript + Relay + Next.js + SSR example!

* using graphql example by [GraphQL-Pokemon](https://graphql-pokemon.vercel.app/)

## Concept

1. Make feature component by using relay fragment (like [PokemonDetail.res](./src/features/pokemon/PokemonDetail.res))
2. Write page by rescript. (Warning; rescript file name should be unique by your project) ([/pages/pokemon/[pokemonEnum].res](./src/pages/pokemon/[pokemonEnum].res))
3. In page, make query and connect using feature fragments 
4. Make environment and execute query and return dehydrate store data at `getServerSideProps` (This process is configure by [RelayEnv.SSR.make](./src/relay/RelayEnv.res) function and [hydrateRelayStore.ts](./src/relay/hydrateRelayStore.ts))
5. Execute query at page renderer, pass the `fragmentRefs` to feature component
6. complete!
