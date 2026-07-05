---
repo: jwalton/gh-find-current-pr
url: 'https://github.com/jwalton/gh-find-current-pr'
homepage: null
starredAt: '2025-06-20T20:58:13Z'
createdAt: '2019-09-10T20:12:59Z'
updatedAt: '2025-06-20T20:58:13Z'
language: TypeScript
license: MIT
branch: master
stars: 187
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-28T22:31:13.398Z'
description: >-
  Github Action for finding the Pull Request (PR) associated with the current
  SHA.
tags: []
---

# gh-find-current-pr

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This action tries to figure out the current PR.

If the event is a `pull_request`, it's very easy to get the current PR number
from the context via `${{ github.event.number }}`, but unfortunately this
information does not seem to be readily available for a `push` event. This
action sends a request to GitHub to find the PR associated with the current SHA,
and returns its number in the `number` output. `number` will be an empty string if there is no
PR.

Additionally, `title` and `body` outputs are available as well to get the respective title and body of the PR.

By default, `gh-find-current-pr` will only return open PRs. You can pass in a
`state` parameter to pick "open", "closed", or "all" PRs.

## Usage

```yaml
steps:
  - uses: actions/checkout@v4
  # Find the PR associated with this push, if there is one.
  - uses: jwalton/gh-find-current-pr@master
    id: findPr
    with:
      # Can be "open", "closed", or "all".  Defaults to "open".
      state: open
  # This will echo "Your PR is 7", or be skipped if there is no current PR.
  - run: echo "Your PR is ${PR}"
    if: success() && steps.findPr.outputs.number
    env:
      PR: ${{ steps.findPr.outputs.pr }}
```
