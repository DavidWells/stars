---
repo: pnpm/only-allow
url: 'https://github.com/pnpm/only-allow'
homepage: null
starredAt: '2021-08-10T21:43:59Z'
createdAt: '2020-05-01T11:22:57Z'
updatedAt: '2025-02-12T09:07:30Z'
language: JavaScript
license: MIT
branch: master
stars: 600
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:48.220Z'
description: Force a specific package manager to be used on a project
tags: []
---

# only-allow

> Force a specific package manager to be used on a project

## Usage

Add a `preinstall` script to your project's `package.json`.

If you want to force [npm](https://docs.npmjs.com/cli/npm), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow npm"
  }
}
```

If you want to force [cnpm](https://npmmirror.com/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow cnpm"
  }
}
```

If you want to force [pnpm](https://pnpm.js.org/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

If you want to force [yarn](https://yarnpkg.com/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow yarn"
  }
}
```

If you want to force [bun](https://bun.sh/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow bun"
  }
}
```

## License

[MIT](LICENSE)
