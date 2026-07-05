---
repo: DavidWells/claude-dev-container
url: 'https://github.com/DavidWells/claude-dev-container'
homepage: ''
starredAt: '2025-11-21T18:41:25Z'
createdAt: '2025-07-15T02:52:31Z'
updatedAt: '2025-11-21T22:45:32Z'
language: Shell
license: NA
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:54.004Z'
description: Run Claude Code in isolated dev container and remotely connect via vibetunnel
tags: []
---

# Claude Dev Container

A comprehensive development container setup with Node.js, Deno, Bun.js, Playwright, Tailscale, and VibeTunnel for Claude Code development.

## Features

- **Node.js v24** - Latest Node.js runtime
- **Deno v1.46.3** - Modern JavaScript/TypeScript runtime
- **Bun.js** - Fast JavaScript runtime and package manager
- **Playwright** - Browser automation with Chromium pre-installed
- **Tailscale** - Secure network connectivity
- **VibeTunnel** - Local development tunneling
- **GitHub CLI** - Command-line GitHub integration
- **Claude Code** - Anthropic's CLI tool pre-installed
- **Git Profile Management** - Automated Git configuration
- **VS Code Extensions** - ESLint, Prettier, GitLens pre-configured

## Quick Start

1. Open in VS Code with Dev Containers extension (from Cursor "Anysphere")
2. Container will automatically build and configure
3. Git will be auto-configured based on your environment

## Container Architecture

The setup uses Docker Compose with two services:

### Tailscale Service
- Provides secure networking capabilities
- Requires `TS_AUTHKEY` environment variable
- Hostname: `claude-code-dev`

### Development Container
- Based on Ubuntu 22.04
- Network shares with Tailscale service
- User: `node` with sudo privileges
- Working directory: `/workspace`

## Pre-installed Tools

- **Runtime**: Node.js v24, Deno v1.46.3, Bun.js, Python3
- **CLI Tools**: GitHub CLI, Claude Code, Gemini CLI, VibeTunnel
- **Development**: git, curl, wget, vim, fzf
- **Browser Testing**: Playwright with Chromium, X11 support
- **Package Managers**: npm, pnpm, bun

## Environment Variables

Create a `.env` file in the `.devcontainer` directory:

```bash
# Required for Tailscale
TS_AUTHKEY=your_tailscale_auth_key

# Optional Git configuration
GIT_USER_NAME="Your Name"
GIT_USER_EMAIL="your.email@example.com"
GIT_GITHUB_USER="yourusername"
GIT_PROFILE_NAME="work"

# Optional timezone
TZ=America/Los_Angeles
```

## Git Configuration

The container automatically sets up Git using multiple methods (in priority order):

1. **Environment Variables** - Set `GIT_USER_NAME`, `GIT_USER_EMAIL`, etc.
2. **Host Git Config** - Copies your `~/.gitconfig` if available
3. **Default Profile** - Uses existing "default" profile
4. **Manual Setup** - Use `git-profile` command

### Git Profile Commands

```bash
git-profile create work    # Create new profile
git-profile use work      # Switch to profile
git-profile list          # List all profiles
git-profile delete work   # Delete profile
```

## VS Code Configuration

Pre-configured with:
- **Default Formatter**: Prettier
- **Linting**: ESLint with auto-fix on save
- **Git Integration**: GitLens extension
- **Terminal**: zsh with Oh My Zsh (robbyrussell theme)
- **Port Forwarding**: Port 5173 for Vite development

## Aliases

The container includes helpful aliases:
- `yolo` - Claude with skip permissions
- `gyolo` - Gemini with yolo mode
- `tailscale` - Execute Tailscale commands in container

## Volume Mounts

- **Workspace**: `..:/workspace:cached`
- **Command History**: Persistent zsh history
- **Claude Config**: `~/.claude` directory mounted
- **Git Config**: Host `.gitconfig` mounted read-only

## Development Workflow

1. **Start Container**: Open in VS Code or run `docker-compose up`
2. **Install Dependencies**: `npm install` (runs automatically)
3. **Start Development**: Use pre-configured tools and extensions
4. **Browser Testing**: Playwright ready with Chromium
5. **Secure Access**: Tailscale for remote connectivity

## Networking

The container uses Tailscale for secure networking, allowing:
- Remote access to development environment
- Secure tunneling with VibeTunnel
- Connection to private networks

## Troubleshooting

- **Tailscale**: Verify `TS_AUTHKEY` is set and valid
- **Git**: Check environment variables or use `git-profile` commands
- **Playwright**: Run `npx playwright install` if browsers missing
- **Permissions**: User `node` has sudo access with password `nodepassword`

For VibeTunnel and Tailscale verification:
```bash
tailscale status          # Check Tailscale connection
vibetunnel --help        # Verify VibeTunnel installation
```
