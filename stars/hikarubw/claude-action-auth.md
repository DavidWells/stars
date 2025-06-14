---
repo: hikarubw/claude-action-auth
url: 'https://github.com/hikarubw/claude-action-auth'
homepage: ''
starredAt: '2025-06-13T06:51:05Z'
createdAt: '2025-06-03T10:04:36Z'
updatedAt: '2025-06-13T16:17:35Z'
language: Shell
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:09.924Z'
description: Simple authentication setup tool for Claude Code Action on GitHub
tags: []
---

# Claude Action Auth

> Simple authentication setup tool for Claude Code Action on GitHub

A streamlined CLI tool that configures authentication (OAuth or API Key) for Claude Code Action to interact with your GitHub repositories through Issues and Pull Requests.

## Features

- 🔐 **Dual Authentication**: OAuth (recommended) or API Key
- 🤖 Automated GitHub Actions setup
- 💬 @claude mentions in Issues and PRs
- 🔀 Auto-PR creation from Issues (OAuth only)
- 🏷️ Intelligent label and project management (OAuth only)

## Quick Start

```bash
# Install the CLI tool
curl -fsSL https://raw.githubusercontent.com/hikarubw/claude-action-auth/main/install.sh | bash

# Setup authentication in your project
cd your-project
claude-auth setup  # Interactive - choose OAuth or API Key

# That's it! Claude will now respond to @claude mentions
```

## Installation

### Option 1: Quick Install (Recommended)
```bash
curl -fsSL https://raw.githubusercontent.com/hikarubw/claude-action-auth/main/install.sh | bash
```

### Option 2: Manual Install
```bash
git clone https://github.com/hikarubw/claude-action-auth.git
cd claude-action-auth
./install.sh
```

### Option 3: Custom Directory
```bash
# Install to a custom directory (e.g., ~/bin)
curl -fsSL https://raw.githubusercontent.com/hikarubw/claude-action-auth/main/install.sh | bash -s -- ~/bin
```

### Default Installation Location

By default, the tool installs to `~/.local/bin` which is a safe user directory that doesn't require sudo permissions. Make sure this directory is in your PATH:

```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.local/bin:$PATH"
```

## Usage

### Setup Authentication
```bash
# Interactive setup (recommended)
claude-auth setup

# OAuth setup (uses Claude login)
claude-auth setup --auth-type=oauth

# API key setup (uses Anthropic API key)
claude-auth setup --auth-type=api

# Just install the workflow
claude-auth install
claude-auth install --auth-type=api

# Test your configuration
claude-auth test

# Remove setup
claude-auth uninstall
```

### Authentication Methods

#### OAuth (Recommended)
- Uses your existing `claude login` credentials
- Supports advanced features (auto-PR, labels, projects)
- Fully automated setup
- No API key needed

#### API Key
- Uses Anthropic API key from console
- Basic Claude Code features
- Requires manual secret configuration
- Simpler workflow file

## Requirements

- Git repository
- GitHub CLI (`gh`) authenticated
- `jq` installed
- For OAuth: Claude Code logged in (`claude login`)
- For API Key: Anthropic API key

## Security

- Credentials stored in macOS Keychain or Linux secure storage
- Never committed to repository
- OAuth tokens managed as GitHub secrets
- Workflow restricted to repository collaborators

## Advanced Features

The installed GitHub Action includes:

- **Issue Management**: Auto-labels, milestones, project boards
- **PR Automation**: Creates PRs from Issues with fixes
- **Security Checks**: Validates permissions before execution
- **Rich Context**: Provides Claude with full repository context

## Commands

| Command | Description |
|---------|-------------|
| `claude-auth setup` | Interactive authentication setup |
| `claude-auth setup --auth-type=oauth` | OAuth setup |
| `claude-auth setup --auth-type=api` | API key setup |
| `claude-auth install` | Install workflow only |
| `claude-auth test` | Verify configuration |
| `claude-auth uninstall` | Remove setup |
| `claude-auth help` | Show help message |

## Troubleshooting

### Missing Dependencies
```bash
# macOS
brew install gh jq

# Ubuntu/Debian
sudo apt install gh jq
```

### GitHub CLI Not Authenticated
```bash
gh auth login
```

### Claude Not Logged In
```bash
claude login
```

## License

MIT License - See [LICENSE](LICENSE) file for details.
