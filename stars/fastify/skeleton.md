---
repo: fastify/skeleton
url: 'https://github.com/fastify/skeleton'
homepage: ''
starredAt: '2022-01-22T18:39:34Z'
createdAt: '2020-09-21T13:19:35Z'
updatedAt: '2025-02-03T09:04:45Z'
language: null
license: NA
branch: main
stars: 35
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:19.405Z'
description: Template repository to create standardized Fastify plugins.
tags:
  - fastify
  - fastify-plugin
---

# skeleton

Template repository to create standardized Fastify plugins.

# Getting started

- Click on `Use this template` above to create a new repository based on this repository.

# What's included?

1. Github CI Actions for installing, testing your package.
2. Github CI Actions to validate different package managers.
3. Dependabot V2 config to automate dependency updates.
4. Template for the GitHub App [Stale](https://github.com/apps/stale) to mark issues as stale.
5. Template for the GitHub App [tests-checker](https://github.com/apps/tests-checker) to check if a PR contains tests.

# Repository structure

```
├── .github
│   ├── workflows
│   │   ├── ci.yml
│   │   └── package-manager-ci.yml
│   ├── .stale.yml
│   ├── dependabot.yml
│   └── tests_checker.yml
│
├── docs (Documentation)
│
├── examples (Code examples)
│
├── test (Application tests)
│
├── types (Typescript types)
│
└── README.md
```
