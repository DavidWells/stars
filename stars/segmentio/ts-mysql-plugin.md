---
repo: segmentio/ts-mysql-plugin
url: 'https://github.com/segmentio/ts-mysql-plugin'
homepage: null
starredAt: '2022-09-01T19:43:10Z'
createdAt: '2020-01-03T18:59:11Z'
updatedAt: '2025-02-25T15:58:04Z'
language: TypeScript
license: MIT
branch: master
stars: 320
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:35.003Z'
description: >-
  A typescript language service plugin that gives superpowers to SQL tagged
  template literals.
tags: []
---

# ts-mysql-plugin

![Alt Text](https://github.com/segmentio/ts-mysql-plugin/workflows/CI/badge.svg)

A typescript language service plugin that gives superpowers to SQL tagged template literals. Specifically aimed at the MySQL syntax.

![Alt Text](https://github.com/segmentio/ts-mysql-plugin/raw/master/.github/demo.gif)

## Features

- Autocomplete for MySQL keywords
- Autocomplete for table names and column names (powered by your schema)
- Hover documentation for MySQL keywords
- Hover documentation for tables and columns (powered by your schema)
- Diagnostics for MySQL syntax errors
- Diagnostics for invalid table names and column names (powered by your schema)
- Diagnostics for invalid column types (powered by your schema)
- Works in all major editors (VSCode, Sublime Text, Atom, etc.)

## Installing

Step 1: Yarn.

```sh
yarn add --dev ts-mysql-plugin
```

Step 2: TS Config.

Add the plugin to your compiler options in `tsconfig.json`. Note that `databaseUri` is optional, but recommended.

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "ts-mysql-plugin",
        "databaseUri": "mysql://USER@HOST/DB_NAME"
      }
    ]
  }
}
```

You can also optionally configure the MySQL version for the plugin to use (defaults to 5.7.12) This will ensure that the MySQL parser correctly notifies you about syntax errors for your version.

```json
{
  "mySQLVersion": "5.7.12"
}
```

You can also optionally override the default tags ("SQL" and "sql") by adding a "tags" array to the config. For example, if you want the plugin to activate only on "Sql" tags:

```json
{
  "tags": ["Sql"]
}
```

If you add `@ts-mysql-plugin ignore` in a comment at the top of a file, then the plugin will skip the file.

## Developing

Run the following:

```shell
yarn install
yarn build
```

## Testing

Assuming you've run all the steps in the "Development" section, then run the following:

```shell
cd e2e
yarn install
docker-compose up -d
cd ..
yarn test
```

## Related

- [ts-mysql-parser](https://github.com/stevenmiller888/ts-mysql-parser) - A standalone, grammar-complete MySQL parser
- [ts-mysql-analyzer](https://github.com/stevenmiller888/ts-mysql-analyzer) - A MySQL query analyzer
- [ts-mysql-autocomplete](https://github.com/stevenmiller888/ts-mysql-autocomplete) - An autocomplete engine for MySQL queries

## License

[MIT](https://tldrlegal.com/license/mit-license)
