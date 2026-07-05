---
repo: egoist/update-bin
url: 'https://github.com/egoist/update-bin'
homepage: ''
starredAt: '2025-07-06T00:38:30Z'
createdAt: '2025-07-04T16:41:00Z'
updatedAt: '2025-07-07T19:46:11Z'
language: Rust
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:52.558Z'
description: >-
  Update a binary to its latest version by using the original package manager
  that was used to install it
tags: []
---

# update-bin

Update a binary to its latest version by using the original package manager that was used to install it.

## Installation

```bash
cargo install update-bin
```

Or download the binary for your platform from the [releases page](https://github.com/egoist/update-bin/releases/latest).

## Usage

```bash
update-bin <bin-name>

# Examples:
update-bin python
update-bin claude
```

## Supported package managers

- homebrew
- bun
- npm
- pnpm
- yarn
- cargo

## License

MIT
