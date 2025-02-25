---
repo: SocialGouv/anonymify
url: 'https://github.com/SocialGouv/anonymify'
homepage: 'https://socialgouv.github.io/anonymify'
starredAt: '2022-11-16T17:04:40Z'
createdAt: '2022-01-03T08:56:26Z'
updatedAt: '2024-12-09T04:35:12Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:09.175Z'
description: >-
  Outils TypeScript pour l'anonymisation des données en langue Française,
  compatible Node.js et dans les browsers.
tags:
  - anonymization
  - csv
---

# @socialgouv/anonymify

Outils TypeScript pour l'anonymisation des données en langue Française.

Compatible Node.js et dans les navigateurs

Démo : https://socialgouv.github.io/anonymify

## Packages

| package                                     | description                                |
| ------------------------------------------- | ------------------------------------------ |
| [match-entities](./packages/match-entities) | detection du type d'entité                 |
| [csv-sample](./packages/csv-sample)         | detection des types de données dans un CSV |
| [csv-anonymify](./packages/csv-anonymify)   | anonymise un CSV                           |

## Apps

| app                 | description                     |
| ------------------- | ------------------------------- |
| apps/match-entities | démo web de match-entities      |
| apps/csv            | démo web d'anonymisation de CSV |

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all packages, run the following command:

```
yarn run dev
```

Also run the web demo separately : `cd apps/csv && yarn dev`

### The Secret Sauce

- [React.js](https://reactjs.org/)
- [MiniSearch](https://lucaong.github.io/minisearch/)
- [faker.js](https://github.com/marak/Faker.js/)
- [turborepo](https://turborepo.org/)
- [datagouv](https://data.gouv.fr)

### Todo

- export CSV progress


