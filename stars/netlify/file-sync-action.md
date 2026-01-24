---
repo: netlify/file-sync-action
url: 'https://github.com/netlify/file-sync-action'
homepage: null
starredAt: '2026-01-08T18:51:13Z'
createdAt: '2022-03-12T19:29:27Z'
updatedAt: '2026-01-19T07:37:17Z'
language: JavaScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:32.033Z'
description: A GitHub Action for syncing files across repositories
tags: []
---

# File Sync Action

A GitHub Action for syncing files across repositories.

## The basics

This GitHub Action allows you to hold a file in a central repository and propagate it to other repositories automatically on every update. When the file changes in the source repository, File Sync Action will create a pull request on each configured mirror to propagate the update.

## Configuration

The action supports the following inputs:

| Name          | Description                                | Default              |
| ------------- | ------------------------------------------ | -------------------- |
| `files`       | A JSON string containing the file mapping  | `{}`                 |
| `token`       | GitHub access token                        |                      |

The `files` input is a JSON string containing a mapping of remote files to local paths in your repository.

For example, if you'd like the file `from.md` in the `netlify/foobar` repository to map to the `to.md` path in your repository, the `files` should be:

```
{"netlify/foobar#from.md": "to.md"}
```

## Usage

Add the File Sync Action to a GitHub workflow:

   ```yaml
    on:
      schedule:
        - cron: '* * * * *'

    jobs:
      sync_files:
        runs-on: ubuntu-latest
        steps:
          - name: Git checkout
            uses: actions/checkout@v3
          - name: File Sync
            uses: netlify/file-sync-action@v1
            with:
              files: '{"netlify/foobar#from.md": "to.md"}'
              token: ${{ secrets.GITHUB_TOKEN }}
   ```

## Contributors

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on how to set up and work on this repository. Thanks
for contributing!
