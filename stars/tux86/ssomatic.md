---
repo: tux86/ssomatic
url: 'https://github.com/tux86/ssomatic'
homepage: null
starredAt: '2026-03-27T23:03:06Z'
createdAt: '2025-12-21T23:11:20Z'
updatedAt: '2026-03-27T23:03:07Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:31.415Z'
description: >-
  SSOmatic — Auto-discover, refresh, and manage your AWS SSO credentials from
  the terminal or browser. Built with Bun, React, and TypeScript.
tags:
  - aws
  - aws-sso
  - bun
  - cli
  - credentials
  - devtools
  - react
  - sso
  - typescript
  - web-ui
---

# SSOmatic

Interactive AWS SSO credential manager with CLI and web UI.

[![CI](https://github.com/tux86/ssomatic/actions/workflows/ci.yml/badge.svg)](https://github.com/tux86/ssomatic/actions/workflows/ci.yml)
[![Release](https://github.com/tux86/ssomatic/actions/workflows/release.yml/badge.svg)](https://github.com/tux86/ssomatic/actions/workflows/release.yml)
[![GitHub Release](https://img.shields.io/github/v/release/tux86/ssomatic)](https://github.com/tux86/ssomatic/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/tux86/ssomatic)](https://github.com/tux86/ssomatic)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Demo

### CLI

<p align="center">
  <img src="docs/screenshots/cli-demo.gif" alt="SSOmatic CLI Demo" width="720">
</p>

### Web UI

<p align="center">
  <img src="docs/screenshots/web-demo.gif" alt="SSOmatic Web UI Demo" width="720">
</p>

## Features

- **Auto-discovery** — Scans `~/.aws/config` for SSO profiles (legacy and sso_session)
- **Status dashboard** — View credential validity with expiry countdown
- **Multi-select refresh** — Refresh multiple profiles at once with SSO device auth
- **Auto-refresh daemon** — Background process to keep credentials fresh
- **Built-in web UI** — Toggle a web server from the CLI with `w` for a browser-based dashboard
- **Desktop notifications** — Alerts when credentials expire (macOS/Linux)
- **Persistent settings** — Notifications, favorites, web server, port — all saved across sessions

## Prerequisites

- [AWS CLI v2](https://aws.amazon.com/cli/) configured with SSO profiles in `~/.aws/config`

## Install

### Homebrew (macOS / Linux)

```bash
brew install tux86/tap/ssomatic
```

### Download binary

Grab the latest binary for your platform from [Releases](https://github.com/tux86/ssomatic/releases):

| Platform | Binary |
|----------|--------|
| macOS (Apple Silicon) | `ssomatic-darwin-arm64.bin` |
| Linux (x64) | `ssomatic-linux-x64.bin` |
| Linux (ARM64) | `ssomatic-linux-arm64.bin` |

```bash
chmod +x ssomatic-*.bin
mv ssomatic-*.bin /usr/local/bin/ssomatic
```

### From source

Requires [Bun](https://bun.sh) >= 1.0.

```bash
git clone https://github.com/tux86/ssomatic.git
cd ssomatic
bun install
bun run build
./dist/ssomatic
```

## Usage

```bash
ssomatic                # Launch the CLI
```

Press `w` to toggle the built-in web UI server. The URL is shown at the bottom of the terminal. Web server state and port are saved in settings.

## Development

```bash
bun run start         # Run from source
bun run dev           # Run with --watch (auto-restart on changes)
bun run build         # Build web assets + compiled binary
bun run lint          # Run ESLint
```

## Project Structure

```
ssomatic/
├── src/
│   ├── aws/           # Shared AWS credential logic (sso.ts, aws.ts, utils.ts)
│   ├── cli/           # Terminal UI (React/Ink) — entry point
│   │   ├── index.tsx   # Main app + web server toggle
│   │   ├── components/ # Ink UI components
│   │   └── hooks/      # useIdentity, useCopy
│   └── web/
│       ├── server.ts   # Bun HTTP server + RPC bridge
│       └── client/     # Web UI SPA (React/Vite/Tailwind)
├── dist/              # Build output (single binary, web assets embedded)
└── package.json
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↑/↓` or `j/k` | Navigate |
| `Enter` | Select |
| `Space` | Toggle selection |
| `a` | Select all / none |
| `w` | Toggle web server |
| `c` | Copy URL |
| `Escape` | Back |
| `q` | Quit |

## Contributing

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

Uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/).

## License

[MIT](LICENSE)

---

<p align="center">
  Made with &#10084; by <a href="https://github.com/tux86">tux86</a>
</p>
