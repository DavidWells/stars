---
repo: boneskull/more-linked-issues-action
url: 'https://github.com/boneskull/more-linked-issues-action'
homepage: null
starredAt: '2022-10-19T06:35:52Z'
createdAt: '2020-10-13T21:09:56Z'
updatedAt: '2023-03-04T17:55:51Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:20.350Z'
description: Link pull requests to issues via commit messages and titles
tags: []
---

# more-linked-issues-action

> A GitHub Action to discover linked issues in PRs via commit messages, the PR title, or both

Read about [linked issues](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).

## Supported Events

- `pull_request`

## Inputs

Remember, _all inputs are strings._

### `github-token`

**Required** The GitHub secret token

### `use-commit-message`

If `'true'`, search all messages in all of the PR's commits for linked issues. If `'false'`, do not.

_Default:_ `'true'`

### `use-pr-title`

If `'true'`, search the PR's title for linked issues. If `'false'`, do not.

_Default:_ `'true'`

### `keywords`

A comma-delimited list of keywords to recognize linked issues. These will only affect _this_ GitHub action; GitHub itself has its [own list](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

_Default:_ `'close,closes,closed,fix,fixes,fixed,resolve,resolves,resolved'`

## Outputs

### `links`

A comma-delimited list of linked issues.

## Behavior

GitHub does not currently (as of October 15, 2020) offer an API to link issues to pull requests. To establish the links, `more-linked-issues-action` appends a short section of text to the end of the pull request body (its "description"). This text contains:

- a markdown separator
- a list of issue references, each preceded by a GitHub-approved keyword ("Resolves")
- an "updated on" timestamp and link to this action's homepage

The text uses a pair of HTML comments to declare its sandbox; these comments will be found upon re-run and the be removed and/or updated as appropriate.

> Warning: _Do not change the comments_, or you will likely get duplicated information. If this happens, delete all of it manually; if the `edited` type is enabled for the `pull_request` event (see [example below](#example-usage)), it will trigger the action again.

If `more-linked-issues-action` previously found links, but does _not_ find any upon re-run, it will remove the section. If it previosuly found multiple links, but some subset is _not_ found upon re-run, it will remove the stale links from the section.

## Example usage

The following uses the default settings and provides the required [`github-token`](#github-token) input:

```yml
# .github/workflows/more-issue-links.yml

on:
  pull_request:
    # we use the `edited` type to detect changes to the PR title
    types: [opened, edited, synchronize, reopened]

jobs:
  link-issues:
    runs-on: ubuntu-latest
    name: Link issues found in PR title and commit message(s)
    steps:
      - id: link-issues
        uses: boneskull/more-linked-issues-action@v0.2.1
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}'
    # you likely won't need the output for anything, but here it is.
    # - name: Get comma-delimited list of found links
    #  run: echo "${{ steps.link-issues.outputs.links }}"
```

## License

Copyright © 2020 Christopher Hiller. Licensed Apache-2.0
