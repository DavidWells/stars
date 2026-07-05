---
repo: Akryum/vue-typegen
url: 'https://github.com/Akryum/vue-typegen'
homepage: null
starredAt: '2022-02-23T06:17:14Z'
createdAt: '2022-01-03T23:27:30Z'
updatedAt: '2024-02-23T02:15:25Z'
language: TypeScript
license: NA
branch: main
stars: 37
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:14.721Z'
description: Generate types for TypeScript Vue components libraries
tags: []
---

# vue-typegen

Generate types for your Vue components library!

What is does:

- Scan the `source` folder for `.vue` files
- Generate a corresponding `.vue.ts` file with all the scripts of the Vue component
- Emits the corresponding `.vue.d.ts` file in the `output` folder
- Removes the `.vue.ts` files

So for example if you have an `src/index.ts` file like so:

```ts
export { default as Mentionable } from './Mentionable.vue'
```

You will end up with:

```
- dist
|- index.d.ts
|- Mentionable.vue.d.ts
|- vue-mention.es.js
'- vue-mention.umd.js
```

## Installation

```bash
pnpm i -D vue-typegen
npm i -D vue-typegen
yarn add -D vue-typegen
```

## Usage

To prevent compilation errors, create a `vue-shim.d.ts` file in your source directory if you didn't already:

```ts
/* eslint-disable */
declare module '*.vue' {
  const component: any
  export default component
}
```

Create a `gen-types` script:

```json
{
  "scripts": {
    "gen-types": "tsc -d --emitDeclarationOnly && vue-typegen gen -s src -o dist"
  }
}
```

If your scripts already emit declarations files, you can skip the `tsc` call:

```json
{
  "scripts": {
    "gen-types": "vue-typegen gen -s src -o dist"
  }
}
```

## Vite example

`package.json`:

```json
{
  "name": "vue-mention",
  "description": "Mention popper for input and textarea",
  "version": "1.1.0",
  "license": "MIT",
  "main": "dist/vue-mention.umd.js",
  "module": "dist/vue-mention.es.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/vue-mention.es.js",
      "require": "./dist/vue-mention.umd.js"
    }
  },
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build && tsc -d --emitDeclarationOnly && vue-typegen gen -s src -o dist",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "vue": "^3.2"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.0.1",
    "typescript": "^4.5.4",
    "vite": "^2.7.10",
    "vue": "^3.2.26",
    "vue-typegen": "^0.1.1"
  }
}
```

`vite.config.ts`:

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'VueMention',
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```
