---
repo: byrichardpowell/prisma-schema-to-json-to-prisma-schema
url: 'https://github.com/byrichardpowell/prisma-schema-to-json-to-prisma-schema'
homepage: ''
starredAt: '2022-02-16T22:19:56Z'
createdAt: '2021-04-16T23:34:44Z'
updatedAt: '2022-12-28T09:13:00Z'
language: JavaScript
license: NA
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:22.867Z'
description: A proof of concept attempt
tags: []
---

# Readme

## What is this?

A proof of concept to convert a `schema.prisma` file to JSON and back. If the concept was proven, you could convert `schema.prisma` to `JSON`, then back to `schema.prisma` ending with output that matches the input.

## Why does this matter?

In theory, an application could provide a UI for creating and editing a `schema.prisma` file. The UI would deal with `JSON`. The Backend would parse that `JSON` to a `schema.prisma`, and then run `prisma generate` to create the database.

## How to run this

```
yarn install
yarn run prismaToJSON
yarn run JSONToPrisma
```

The output will be in `./output/`. `schema.js` is the JSON representation of the prisma schema. `schema.prisma` is the result of converting the JSON schema back to a prisma schema. Both files are missing some information (see next section).

## Known Limitations

To convert `schema.prisma` to `JSON` we use [pal schema](https://paljs.com/cli/schema). Unfortunately this skips default values. To illustrate:

1. For `@id`, `@default(autoincreent())` is not included. This might not be an issue because we can assume that every model would have an ID, and that the user has no need to customize this. Therefore we could automatically add it.
2. For `DateTime`, `@default(now())` is not included. Again, this might not be an issue, because we could assume that every model has `createdAt` fields, and automatically add them. Therefore we could automatically add it. The same could be said for `updatedAt`.
3. For `role` the defualt `ENUM` is not recorded. This is an issue, as loosing this information would signficantly change application behaviour.

The solution to this seem to be either:

1. forking, contributing, or replacing [pal schema](https://paljs.com/cli/schema).
2. Never converting from `schema.prisma` to `JSON`, and then extending the `JSON` information to include the missing pieces.
