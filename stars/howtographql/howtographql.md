---
repo: howtographql/howtographql
url: 'https://github.com/howtographql/howtographql'
homepage: 'https://www.howtographql.com/'
starredAt: '2018-08-10T19:41:08Z'
createdAt: '2017-06-06T21:30:25Z'
updatedAt: '2025-02-25T19:32:13Z'
language: TypeScript
license: MIT
branch: main
stars: 8707
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:16.795Z'
description: The Fullstack Tutorial for GraphQL
tags:
  - apollographql
  - graphql
  - prisma
  - tutorial
---

# How to GraphQL 🎓

[How to GraphQL](https://www.howtographql.com) is a fullstack tutorial website to learn all about GraphQL! It was built by [Prisma](https://www.prisma.io?utm_source=htg&utm_medium=readme) and many amazing contributors. All content on the site is completely free and open-source.

[![](http://i.imgur.com/67oYe9q.png)](https://www.howtographql.com)

> **Note**: This repository is currently mostly unmaintained. We are looking for maintainers who can help cleaning up issues and PRs opened by the community. If you are interested in helping out, please [reach out](mailto:burk@prisma.io)!

## Content

The content for all tutorials is located in the  [`/content`](https://github.com/howtographql/howtographql/tree/master/content) directory. Here is an overview of all the tutorials that are available at the moment:

#### GraphQL

- Fundamentals of GraphQL
- Advanced GraphQL

#### Frontend

- React & Apollo
- React & Relay (Out of date)
- Vue & Apollo (Out of date)
- Ember & Apollo (Out of date)

#### Backend

- javascript-apollo / JavaScript & Apollo
- typescript-apollo / Typescript & Apollo
- typescript-helix / Typescript & Helix
- graphql-elixir / Absinthe & Elixir
- graphql-ruby / Ruby and GraphQL Gem
- graphql-python / Python & Graphene
- graphql-go / Go & gqlgen
- graphql-scala / Scala & Sangria   
- graphql-java / Java (Out of date)



## Contributions / Fixes

As the whole project is open-source, you're more than welcome to fix typos and other small issues yourself and create a PR for the fix. If you want to contribute a whole tutorial track or update one of the out of date tutorials please [get in touch](mailto:burk@prisma.io).

## Installation & Running locally

The project has some native (gyp) dependencies. To get this running, please make sure your environment it set with the following:

1. Make sure to install a Node version manager (either [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm))
1. Point your environment to the version specified in `.nvmrc`.
1. Make sure to load `.env` to your environment variables (some shell loads it automatically, but if not, you can do: `source .env` to load it)

You can run a local instance of How to GraphQL by executing the following commands in a terminal:

```sh
git clone git@github.com:howtographql/howtographql.git
cd howtographql
yarn install
yarn start # http://localhost:8000/
```

> Note: If you're using Node 8, you might need to invoke `npm install -g node-gyp` before you're starting the app. More info [here](https://github.com/gatsbyjs/gatsby/issues/1754).

#### Troubleshooting

If you are having issues with `sharp` dependency, please make sure you have installed `>0.18.2` of it. Older versions have hardcoded dependency on a legacy artifactory. 

To check the version you have, run: `yarn why sharp`. 

If you are still having issues, please make sure that you have `SHARP_DIST_BASE_URL` environemnt variable set correctly (see `.env` file) and then run `yarn install` again.

