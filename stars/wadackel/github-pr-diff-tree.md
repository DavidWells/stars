---
repo: wadackel/github-pr-diff-tree
url: 'https://github.com/wadackel/github-pr-diff-tree'
homepage: 'https://github.com/marketplace/actions/pr-diff-tree'
starredAt: '2021-12-05T23:57:16Z'
createdAt: '2021-11-30T16:23:56Z'
updatedAt: '2024-02-16T00:43:45Z'
language: TypeScript
license: MIT
branch: main
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:29.958Z'
description: >-
  :evergreen_tree: This action provide a comment that displays the diff of the
  pull request in a tree format.
tags:
  - github-actions
  - productivity
  - pull-request
  - review-tools
  - tree
---

# github-pr-diff-tree [![CI](https://github.com/wadackel/github-pr-diff-tree/actions/workflows/ci.yml/badge.svg)](https://github.com/wadackel/github-pr-diff-tree/actions/workflows/ci.yml)

![Screenshot](./screenshot.png)

:evergreen_tree: This action provide a comment that displays the diff of the pull request in a tree format.

## Motivation

When we develop a product, we make various changes to the code base. For example, add, remove, edit, and rename files.

The code diffs can be seen on GitHub's excellent review page. However, the directory structure of the changed files is sometimes overlooked by reviewers.

Therefore, this Action was created with the goal of improving the accuracy of the review by visualizing the directory structure of diffs included in a pull request in a Human-Readable format.

## Usage

See [action.yml](./action.yml)

**Basic:**

```yaml
# .github/workflows/pr-diff-tree.yml
name: 'PR Diff Tree'

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  dump:
    runs-on: ubuntu-latest
    steps:
      - uses: wadackel/github-pr-diff-tree@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Contributing

We are always welcoming your contribution :clap:

1. Fork (https://github.com/wadackel/github-pr-diff-tree) :tada:
1. Create a feature branch :coffee:
1. Run test suite with the `$ npm test` command and confirm that it passes :zap:
1. Commit your changes :memo:
1. Rebase your local changes against the `main` branch :bulb:
1. Create new Pull Request :love_letter:

Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/wadackel/github-pr-diff-tree/issues).

## License

[MIT © wadackel](./LICENSE)
