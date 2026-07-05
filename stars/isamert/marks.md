---
repo: isamert/marks
url: 'https://github.com/isamert/marks'
homepage: null
starredAt: '2022-11-04T22:22:05Z'
createdAt: '2020-12-06T22:20:29Z'
updatedAt: '2025-02-07T20:40:29Z'
language: Rust
license: GPL-3.0
branch: main
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:13.024Z'
description: A reasonably fast markup semantic search tool
tags: []
---

# marks

A simple and fast search-engine like tool for org/markdown files. WIP.

## Installation

Right now you need to either clone the repository and build it yourself or install it from `crates.io` using `cargo`.

### crates.io

Install `cargo` through your package manager. Then:

```bash
cargo install marks
```

This will install `marks` binary under `~/.cargo/bin`.

### Cloning and installing

```bash
git clone https://github.com/isamert/marks.git
cd marks
cargo install --path .
```

This will install `marks` binary under `~/.cargo/bin`.

## Usage

`marks` is pretty intuitive, it's similar to Google. Observe the following query:

```
marks 'marks can "search" `(org|markdown)` files -folders'
```

This query requires

- the word `search` to be either in the title hierarchy or in the line.
- regex `(org|markdown)` to match either in the title hierarchy or in the line.
- the word `folders` not to be present in the title hierarchy or the line itself.

Rest of the characters are matched in fuzzy fashion. Output is similar to how grep outputs the results with only difference being title hierarchy is also added to results: `filename:line-no:title/hierarchy/here:matched-line-contents`. This command will search for all the markdown and org-mode files under given path. This is configurable.

You can always do `marks --help` to get more detailed information.
