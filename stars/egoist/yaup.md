---
repo: egoist/yaup
url: 'https://github.com/egoist/yaup'
homepage: ''
starredAt: '2021-06-28T05:31:41Z'
createdAt: '2021-06-23T05:49:20Z'
updatedAt: '2024-11-04T23:45:25Z'
language: TypeScript
license: MIT
branch: main
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:32.554Z'
description: unopinionated esbuild cli.
tags: []
---

**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# yaup

[![npm version](https://badgen.net/npm/v/yaup)](https://npm.im/yaup)

## Why this over other esbuild/rollup wrappers?

- Unopinionated: close to raw esbuild, flexible configration
- Minimal: minimal API interface so it's easier to maintain

## Install

```bash
npm i yaup -D
```

## Usage

It's common to publish dual CommonJS/ES module packages with an extra TypeScript declaration file, all you need is creating a `yaup.config.ts`:

```ts
import { defineConfig } from 'yaup'

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      format: 'esm',
      dir: 'dist/esm',
    },
    {
      format: 'cjs',
      dir: 'dist/cjs',
    },
    {
      format: 'dts',
      dir: 'dist/types',
    },
  ],
})
```

Run `yaup` in this directory, it will emit:

- `dist/esm/index.js`
- `dist/cjs/index.js`
- `dist/types/index.d.ts`

Then, configure `package.json` accordingly:

```json
{
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.js",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "default": "./dist/cjs/index.js"
    }
  }
}
```

## API

[Full config reference](./src/config.ts).

## Contributing

Bug fixes are welcome, I'm not accepting new features unless it's absolutely necessary.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
