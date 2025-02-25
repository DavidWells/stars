---
repo: JoshuaKGoldberg/github-sponsors-to-markdown
url: 'https://github.com/JoshuaKGoldberg/github-sponsors-to-markdown'
homepage: ''
starredAt: '2023-03-29T18:53:34Z'
createdAt: '2023-03-29T15:07:42Z'
updatedAt: '2025-02-25T18:00:08Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:53.722Z'
description: "Creates a Markdown table summarizing your GitHub sponsors. \U0001F4B0"
tags: []
---

<h1 align="center">GitHub Sponsors to Markdown</h1>

<p align="center">Creates a Markdown table summarizing your GitHub sponsors. 💰</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 1 👪" src="https://img.shields.io/badge/all_contributors-1_👪-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/github-sponsors-to-markdown" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/github-sponsors-to-markdown/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/github-sponsors-to-markdown/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/github-sponsors-to-markdown/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/github-sponsors-to-markdown?color=21bb42">
	</a>
	<a href="https://github.com/sponsors/JoshuaKGoldberg" target="_blank">
		<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
	<img alt="npm package version" src="https://img.shields.io/npm/v/github-sponsors-to-markdown?color=21bb42" />
</p>

## Usage

```shell
npm i github-sponsors-to-markdown
```

```ts
import { githubSponsorsToMarkdown } from "github-sponsors-to-markdown";

console.log(await githubSponsorsToMarkdown());
```

Note that you'll need a `GH_TOKEN` environment variable.
For example:

```shell
gh auth refresh --scopes read:user # Only necessary your first time
GH_TOKEN=$(gh auth token) node build.js
```

> See this in action on [github.com/JoshuaKGoldberg](https://github.com/JoshuaKGoldberg#thanks-to-my-sponsors)! ⚡️

### Options

`githubSponsorsToMarkdown` can be optionally be provided an options object.

```ts
await githubSponsorsToMarkdown({
	/* ... */
});
```

```ts
export interface GithubSponsorsToMarkdownOptions {
	auth: string;
	login?: string;
	tiers?: Record<string, SponsorshipTier>;
	verbose?: boolean;
}

export const defaultOptions = {
	tiers: {
		Bronze: {
			minimum: 5,
			size: 25,
		},
		Gold: {
			minimum: 25,
			size: 100,
		},
		Silver: {
			minimum: 10,
			size: 50,
		},
	},
} satisfies GithubSponsorsToMarkdownOptions;
```

#### `auth`

GitHub auth token, such as what's provided by `gh auth token`.

#### `login`

GitHub organization or username to query sponsorships for.
If not provided, defaults to querying [`viewer`](https://docs.github.com/en/graphql/reference/queries#viewer).

```ts
githubSponsorsToMarkdown({
	login: "JoshuaKGoldberg",
});
```

#### `tier`

Custom tiers to render instead of the defaults.

```ts
githubSponsorsToMarkdown({
	tiers: {
		"Also Awesome": {
			minimum: 10,
			size: 50,
		},
		Awesome: {
			label: "Best People Ever!",
			minimum: 100,
			size: 100,
		},
	},
});
```

```ts
export interface SponsorshipTier {
	label?: string;
	minimum: number;
	size: number;
}
```

#### `verbose`

Whether to `console.log` while executing.
Useful for debugging unexpected results.

```ts
githubSponsorsToMarkdown({
	verbose: true,
});
```

This will log:

- The `login` option
- The response from querying GitHub's GraphQL API
- Collected tiers from sponsorship groupings

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
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/github-sponsors-to-markdown/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/github-sponsors-to-markdown/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).
