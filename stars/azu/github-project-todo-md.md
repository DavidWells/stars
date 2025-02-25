---
repo: azu/github-project-todo-md
url: 'https://github.com/azu/github-project-todo-md'
homepage: null
starredAt: '2021-11-21T19:34:43Z'
createdAt: '2020-12-23T11:42:36Z'
updatedAt: '2022-06-08T01:33:05Z'
language: TypeScript
license: MIT
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.227Z'
description: A Tool that sync between GitHub Project Board <-> Todo Markdown text.
tags:
  - board
  - github
  - markdown
  - project
  - sync
  - todo
---

# github-project-todo-md

A library that sync between GitHub Project Board &lt;-&gt; Markdown Todo text.

## Example

This library convert <https://github.com/azu/github-project-todo-md/projects/1> to following:

```markdown
## To do

- [ ] [TODO ISSUE](https://github.com/azu/github-project-todo-md/issues/4)


## In progress

- [ ] [PROGRESS ISSUE](https://github.com/azu/github-project-todo-md/issues/3)


## Done

- [x] [DONE ISSUE](https://github.com/azu/github-project-todo-md/issues/5)
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install github-project-todo-md

## Usage

### GitHub Project Board → Markdown

```ts
import { fetchProjectBoard, toMarkdown } from "github-project-todo-md";
const json = await fetchProjectBoard({
    owner: "azu",
    repo: "github-project-todo-md",
    projectNumber: 1,
    token: GITHUB_TOKEN
});
const markdown = toMarkdown(json);
assert.strictEqual(
    markdown,
    `## To do

- [ ] [TODO ISSUE](https://github.com/azu/github-project-todo-md/issues/4)


## In progress

- [ ] [PROGRESS ISSUE](https://github.com/azu/github-project-todo-md/issues/3)


## Done

- [x] [DONE ISSUE](https://github.com/azu/github-project-todo-md/issues/5)
`
);

```

### Markdown → GitHub Project Board

Sync Markdown's task status to GitHub Project Board's issue and pull request.

```ts
import { syncToProject } from "github-project-todo-md";
const CODE = `## To do

- [ ] [TODO ISSUE](https://github.com/azu/github-project-todo-md/issues/4)


## In progress

- [ ] [PROGRESS ISSUE](https://github.com/azu/github-project-todo-md/issues/3)


## Done

- [ ] [DONE ISSUE](https://github.com/azu/github-project-todo-md/issues/5)
`;
await syncToProject(CODE, {
    owner: "azu",
    repo: "github-project-todo-md",
    projectNumber: 1,
    token: TOKEN
});
```

## Options

- `includesNote: boolean`
  - Default: `false`

If you want to include notes card for syncing, set `includesNote` to `true`.

```markdown
- [ ] title
  - body
    text
```

→ 

```
title

- body
  text
```

**Current Limitation** append a node to first column

- [Append card to correct column · Issue #11 · azu/github-project-todo-md](https://github.com/azu/github-project-todo-md/issues/11)

## User's or Organization's project

User or Organization level project is supported.

You need to pass specific value to `owner` option.

- User: `owner: "users"`
- Organization: `owner: "orgs"`

```ts
import { syncToProject } from "github-project-todo-md";
const CODE = `## To do

- [ ] [TODO ISSUE](https://github.com/azu/github-project-todo-md/issues/4)


## In progress

- [ ] [PROGRESS ISSUE](https://github.com/azu/github-project-todo-md/issues/3)


## Done

- [ ] [DONE ISSUE](https://github.com/azu/github-project-todo-md/issues/5)
`;
await syncToProject(CODE, {
    owner: "users",
    repo: "azu", // user name
    projectNumber: 1,
    token: TOKEN
});
```

## UseCase

> Inkdrop note <-> GitHub Project

- https://github.com/azu/inkdrop-github-project-todo-md

## Changelog

See [Releases page](https://github.com/azu/github-project-todo-md/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/github-project-todo-md/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
