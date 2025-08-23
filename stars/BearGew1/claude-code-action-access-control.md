---
repo: BearGew1/claude-code-action-access-control
url: 'https://github.com/BearGew1/claude-code-action-access-control'
homepage: ''
starredAt: '2025-08-05T18:49:39Z'
createdAt: '2025-08-01T16:41:05Z'
updatedAt: '2025-08-05T18:49:40Z'
language: Shell
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-08-23T22:30:27.298Z'
description: >-
  Access control wrapper for anthropics/claude-code-action - restrict usage to
  specific users or teams. Perfect for public repositories that need to control
  who can trigger Claude AI assistance.
tags: []
---

# Claude Code Action Access Control

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Claude%20Code%20Action%20Access%20Control-blue?logo=github)](https://github.com/marketplace/actions/claude-code-action-access-control)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Access control wrapper for [Claude Code Action](https://github.com/anthropics/claude-code-action) - restrict usage to specific users or teams. Perfect for public repositories that need to control who can trigger Claude AI assistance.

## 🎯 Why Use This Action?

- **🔒 Security**: Prevent unauthorized users from triggering Claude in public repositories
- **💰 Cost Control**: Limit API usage to specific trusted users
- **👥 Team Management**: Allow specific team members while blocking external contributors
- **🎨 Flexible Configuration**: Support for user lists and team-based access control

## 🚀 Quick Start

### Basic Usage

```yaml
name: Claude PR Assistant
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs: 
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: kosukesaigusa/claude-code-action-access-control@v1
        with:
          # Access Control
          allowed_users: |
            kosukesaigusa
            teammate1
            trusted-contributor
          
          # Claude Configuration
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
```

## 📋 Configuration Options

### Access Control Parameters

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| `allowed_users` | Allowed GitHub usernames (newline-separated) | No | `""` |
| `allowed_teams` | Allowed teams in "org/team" format (newline-separated) | No | `""` |

### Claude Parameters

All parameters from the official Claude Code Action are supported:

| Parameter | Description | Required |
|-----------|-------------|----------|
| `claude_code_oauth_token` | OAuth token from `claude setup-token` | Yes* |
| `anthropic_api_key` | Anthropic API key (alternative to OAuth) | Yes* |
| `trigger_phrase` | Phrase that triggers Claude | No |
| `timeout_minutes` | Maximum execution time | No |
| `mode` | Execution mode (`tag` or `agent`) | No |

*One of `claude_code_oauth_token` or `anthropic_api_key` is required

## 🎨 Advanced Examples

### Team-based Access

```yaml
- uses: kosukesaigusa/claude-code-action-access-control@v1
  with:
    # Allow specific teams
    allowed_teams: |
      my-org/engineering
      my-org/ai-users
    
    # Also allow specific users
    allowed_users: |
      cto
      lead-developer
    
    claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
```

### Custom Claude Configuration

```yaml
- uses: kosukesaigusa/claude-code-action-access-control@v1
  with:
    allowed_users: |
      trusted-user1
      trusted-user2
    
    # Claude specific settings
    claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
    trigger_phrase: "@ai-assist"
    timeout_minutes: "60"
    mode: "agent"
```

## 🔧 Setup Guide

### 1. Generate Claude OAuth Token

```bash
# Install Claude CLI
npm install -g @anthropic-ai/claude-cli

# Generate token (valid for 1 year)
claude setup-token
```

### 2. Add Token to GitHub Secrets

#### For a Single Repository

1. Go to Settings → Secrets and variables → Actions
2. Add `CLAUDE_CODE_OAUTH_TOKEN` with your token

#### For Multiple Repositories

1. Set up the secret in each repository individually
2. Or use a shared approach with reusable workflows across your repositories

### 3. Create Workflow

Create `.github/workflows/claude.yml` in your repository with one of the examples above.

## 🛡️ Security Considerations

- **Token Security**: Never commit tokens directly. Always use GitHub Secrets
- **Permission Levels**: Start with a minimal allowed users list and expand as needed
- **Public Repositories**: This action is especially important for public repos to prevent abuse
- **Audit Trail**: Check GitHub Actions logs to see who has used Claude

## 📊 How It Works

1. When triggered, the action first checks if the current user (`github.actor`) is authorized
2. It checks against allowed users, teams, and organization membership
3. If authorized, it passes control to the official Claude Code Action
4. If not authorized, it exits with an error message and helpful guidance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of [Claude Code Action](https://github.com/anthropics/claude-code-action) by Anthropic
- Inspired by the need for better access control in public repositories

---

**Note**: This is an unofficial wrapper around the official Claude Code Action. For issues with Claude itself, please refer to the [official documentation](https://docs.anthropic.com/claude/docs/claude-code).
