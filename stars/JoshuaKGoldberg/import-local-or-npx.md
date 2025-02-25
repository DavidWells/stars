---
repo: JoshuaKGoldberg/import-local-or-npx
url: 'https://github.com/JoshuaKGoldberg/import-local-or-npx'
homepage: null
starredAt: '2024-12-21T07:27:38Z'
createdAt: '2024-12-20T16:32:45Z'
updatedAt: '2025-01-22T16:17:25Z'
language: TypeScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:17.075Z'
description: "Imports a local package or one installed from npx. \U0001F69A"
tags: []
---

<h1 align="center">Import Local or npx</h1>

<p align="center">Imports a local package or one installed from npx. 🚚</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/import-local-or-npx/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/import-local-or-npx" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/import-local-or-npx?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/import-local-or-npx/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/import-local-or-npx"><img alt="📦 npm version" src="https://img.shields.io/npm/v/import-local-or-npx?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npm i import-local-or-npx
```

```ts
import { importLocalOrNpx } from "import-local-or-npx";

await importLocalOrNpx("create-typescript-app");
```

`importLocalOrNpx` allows you to import from a path to a CJS or ESM module, or a package name that will be installed with npx.
It's essentially a coordinating wrapper around:

1. [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve): Used with `await import()` to attempt to load the specifier from a local path if possible
2. [`npx-import`](https://github.com/geelen/npx-import): If the package can't be found locally, it will be installed to your global system npx cache

Use this project if you'd like to import a package that may or may not exist locally, and if it doesn't yet exist, should be installed in a global cache.

### Options

`importLocalOrNpx` takes in up two to arguments:

1. `specifier: string` (required): Where to import from, which can be either:
   - A local path to a package on disk, such as a relative `"../path/to/directory"`
   - A package name, such as `"create-typescript-app"`
2. `options` (optional): any of:
   - `importer`: an asynchronous function to use instead of `import()`
   - `logger`: a logger function to pass to [`npxImport`](https://github.com/geelen/npx-import#api)

```ts
import { importLocalOrNpx } from "import-local-or-npx";

await importLocalOrNpx("../create-typescript-app", {
	importer: async (specifier) => await import(specifier),
	logger: (message) => console.log(message),
});
```

### Returned Value

`importLocalOrNpx` returns a Promise for an object satisfying one of three possible types:

1. Local import `{ kind: "local", resolved: object }`: if importing the specifier with `await import()` and [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve) succeeded
2. npx import `{ kind: "npx", resolved: object }`: failing that, if importing the specifier with [`importNpx`](https://github.com/geelen/npx-import) succeeded
3. Failure `{ kind: "failure", local: Error; npx: Error }`: if both of those failed or were canceled

```ts
import { importLocalOrNpx } from "import-local-or-npx";

const imported = await importLocalOrNpx("../create-typescript-app");

if (imported.kind === "failure") {
	console.error("Could not import...");
	console.error(" - Error from local import", imported.local);
	console.error(" - Error from npx import", imported.npx);
} else {
	console.log("Yay! Imported from:", imported.kind);
	console.log(imported.resolved);
}
```

See [`src/types.ts`](./src/types.ts) for specifics.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/import-local-or-npx/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/import-local-or-npx/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [`create` engine](https://github.com/JoshuaKGoldberg/create).
