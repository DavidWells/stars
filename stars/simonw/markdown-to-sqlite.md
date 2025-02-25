---
repo: simonw/markdown-to-sqlite
url: 'https://github.com/simonw/markdown-to-sqlite'
homepage: ''
starredAt: '2022-01-16T18:59:54Z'
createdAt: '2019-01-27T02:04:54Z'
updatedAt: '2025-01-24T02:07:01Z'
language: Python
license: Apache-2.0
branch: main
stars: 81
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:20.988Z'
description: CLI tool for loading markdown files into a SQLite database
tags:
  - datasette-io
  - datasette-tool
  - markdown
  - sqlite
  - yaml
---

# markdown-to-sqlite

[![PyPI](https://img.shields.io/pypi/v/markdown-to-sqlite.svg)](https://pypi.python.org/pypi/markdown-to-sqlite)
[![Changelog](https://img.shields.io/github/v/release/simonw/markdown-to-sqlite?include_prereleases&label=changelog)](https://github.com/simonw/markdown-to-sqlite/releases)
[![Tests](https://github.com/simonw/markdown-to-sqlite/workflows/Test/badge.svg)](https://github.com/simonw/markdown-to-sqlite/actions?query=workflow%3ATest)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/simonw/markdown-to-sqlite/blob/main/LICENSE)

CLI tool for loading markdown files into a SQLite database.

YAML embedded in the markdown files will be used to populate additional columns.

    Usage: markdown-to-sqlite [OPTIONS] DBNAME TABLE PATHS...

For example:

    $ markdown-to-sqlite docs.db documents file1.md file2.md

## Breaking change

Prior to version 1.0 this argument order was different - markdown files were listed before the database and table.
