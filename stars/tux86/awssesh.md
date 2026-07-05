---
repo: tux86/awssesh
url: 'https://github.com/tux86/awssesh'
homepage: ''
starredAt: '2026-03-27T23:03:06Z'
createdAt: '2025-12-21T23:11:20Z'
updatedAt: '2026-06-13T19:21:59Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:44.057Z'
description: >-
  Keep your AWS SSO credentials fresh — automatically. A fast terminal dashboard
  that auto-refreshes your pinned profiles while it's open.
tags:
  - aws
  - aws-sso
  - devops
  - devtools
  - sso
---

# awssesh

Keep your AWS SSO credentials fresh — automatically. A fast terminal dashboard that auto-refreshes your pinned profiles while it's open.

[![npm version](https://img.shields.io/npm/v/awssesh)](https://www.npmjs.com/package/awssesh)
[![CI](https://github.com/tux86/awssesh/actions/workflows/ci.yml/badge.svg)](https://github.com/tux86/awssesh/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Why awssesh

- **k9s-style list-first dashboard** — all your SSO profiles at a glance with live expiry countdowns; navigate with j/k or arrow keys, no menus to dig through.
- **In-process auto-refresh for ⟳ pinned profiles** — pin a profile with `a` and expiry-aware refresh keeps its credentials ready before they expire, with no fixed-interval polling waste.
- **Notify-on-login, never surprise you** — when an interactive SSO login is required awssesh sends a desktop notification so you know to log in.
- **One-keystroke everything** — copy `export AWS_*` vars, open the AWS console, copy the profile name, or force a refresh — all from the dashboard without leaving your terminal.
- **Single process, clean exit** — quitting fully exits. No background processes to manage.

---

## Demo

<p align="center">
  <img src="docs/screenshots/cli-demo.gif" alt="awssesh CLI Demo" width="720">
</p>

---

## Install

```bash
# Run without installing
npx awssesh
bunx awssesh

# Or install globally
npm install -g awssesh
```

---

## Quick Start

```bash
# 1. Launch the dashboard
awssesh

# 2. Navigate to a profile and press 'a' to pin it for auto-refresh
# 3. awssesh auto-refreshes pinned profiles while the dashboard is open
# 4. Press 'q' to quit when done
```

While the dashboard is open, ⟳ pinned profiles are refreshed automatically when their credentials are close to expiry. When a browser login is required, you get a desktop notification and can log in directly from the TUI or with `awssesh refresh <profile>`.

---

## Commands

| Command | Description |
|---------|-------------|
| `awssesh` | Launch the interactive TUI |
| `awssesh status` | Print profile statuses and exit |
| `awssesh refresh [name]` | Refresh a profile (or all favorites) now |
| `awssesh export <name>` | Print `export AWS_*` lines for `eval $(...)` |
| `awssesh --version` | Print version and exit |

**Shell trick — inject credentials into your current shell:**

```bash
eval $(awssesh export prod)
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↑` / `↓` or `j` / `k` | Move cursor |
| `Enter` | Open profile details |
| `r` | Refresh the current profile |
| `a` | Toggle ⟳ auto-refresh (pin/unpin) |
| `c` | Copy `export AWS_*` to clipboard |
| `y` | Copy profile name to clipboard |
| `o` | Open AWS console in browser |
| `/` | Filter profiles by name |
| `s` | Open settings |
| `Esc` | Back |
| `q` | Quit |

---

## How Auto-Refresh Works

awssesh tracks the role-credential expiry for each ⟳ pinned profile and refreshes only when the credentials are within the lead window of expiring (default: 5 minutes before expiry). No fixed interval; no wasted refreshes.

When an interactive SSO login is needed, a desktop notification is sent (`awssesh: <profile> needs login`). You authorize by logging in from the TUI or with `awssesh refresh <profile>`.

---

## Prerequisites

- [AWS CLI v2](https://aws.amazon.com/cli/) configured with SSO profiles in `~/.aws/config`

---

## Development

Requires [Bun](https://bun.sh) >= 1.0.

```bash
git clone https://github.com/tux86/awssesh.git
cd awssesh
bun install

bun run start    # Run from source
bun run dev      # Run with --watch (auto-restart on changes)
bun run build    # Build the Node CLI bundle (dist/cli.js)
bun run lint     # Run ESLint
bun test         # Run unit tests
```

---

## Contributing

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

Uses [Conventional Commits](https://www.conventionalcommits.org/) and [release-please](https://github.com/googleapis/release-please).

## License

[MIT](LICENSE)

---

<p align="center">
  Made with &#10084; by <a href="https://github.com/tux86">tux86</a>
</p>
