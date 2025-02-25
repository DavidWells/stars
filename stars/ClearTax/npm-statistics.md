---
repo: ClearTax/npm-statistics
url: 'https://github.com/ClearTax/npm-statistics'
homepage: null
starredAt: '2020-02-03T05:16:47Z'
createdAt: '2020-01-20T02:12:58Z'
updatedAt: '2023-11-25T11:06:58Z'
language: JavaScript
license: NA
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:05.939Z'
description: NPM Download Statistics for ClearTax Open Source Projects
tags:
  - cleartax
  - npm
  - npm-stats
  - stats
---

# npm-statistics

![NPM Stats](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FClearTax%2Fnpm-statistics%2Fmaster%2Fstats.json)

NPM Download Statistics for ClearTax Open Source Projects. Updated Daily.

## Downloads

<!-- Please do not modify this auto generated content -->
<!-- AUTO-GENERATED-CONTENT:START (PACKAGES) -->
| Name                                                                                                                                 | Downloads  |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| [post-merge-install](https://www.npmjs.com/package/post-merge-install)                                                               | 94345      |
| [@cleartax/apollo-server-plugin-introspection-auth](https://www.npmjs.com/package/@cleartax/apollo-server-plugin-introspection-auth) | 84090      |
| [@cleartax/zoids](https://www.npmjs.com/package/@cleartax/zoids)                                                                     | 44032      |
| [install-types](https://www.npmjs.com/package/install-types)                                                                         | 19554      |
| [engines-ok](https://www.npmjs.com/package/engines-ok)                                                                               | 18586      |
| [@cleartax/eslint-config](https://www.npmjs.com/package/@cleartax/eslint-config)                                                     | 15367      |
| [props-validator](https://www.npmjs.com/package/props-validator)                                                                     | 5274       |
| [pivotal-flow](https://www.npmjs.com/package/pivotal-flow)                                                                           | 4981       |
| **Sum**                                                                                                                              | **286229** |
<!-- AUTO-GENERATED-CONTENT:END -->

### Wanna use `npm-statistics`?

1. `Fork` this repository.
2. Add your npm username/author or list of packages in `package.json` as `npm-stats` key.
   for author

```js
{
  "npm-stats": "cleartax"
}
```

or for packages

```js
{
  "npm-stats": [
    "post-merge-install",
    "engines-ok"
  ]
}
```

3. Run `npm i` and then `npm start` to generate the Downloads.
4. The repo comes with a daily CRON job that updates the Downloads.
5. For updating the badge replace `ClearTax` in badge endpoint to your github username/orgname.
   https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2F`username`%2Fnpm-statistics%2Fmaster%2Fstats.json
6. Enable `GitHub Actions` for your forked repo, as it is disabled by default for forks.

## Ref

- [npmtotal](https://github.com/maddhruv/npmtotal) - Find you npm download statistics
