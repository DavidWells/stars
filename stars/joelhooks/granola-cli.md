---
repo: joelhooks/granola-cli
url: 'https://github.com/joelhooks/granola-cli'
homepage: null
starredAt: '2026-02-25T04:59:25Z'
createdAt: '2026-02-19T15:39:30Z'
updatedAt: '2026-03-31T00:52:15Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:32.414Z'
description: "\U0001F963 Agent-first CLI for Granola meeting notes via MCP"
tags: []
---

# 🥣 granola-cli

Agent-first CLI for [Granola](https://granola.ai) meeting notes. Search, list, and retrieve your meetings from the terminal. Built for AI agents — every command returns structured HATEOAS JSON.

## Install

```sh
curl -fsSL https://raw.githubusercontent.com/joelhooks/granola-cli/main/install.sh | sh
```

Or build from source:

```sh
git clone https://github.com/joelhooks/granola-cli.git
cd granola-cli
bun install
bun run build
cp granola ~/.local/bin/
```

### Prerequisites

- [mcporter](https://github.com/steipete/mcporter) — handles Granola's MCP OAuth flow
- [Bun](https://bun.sh) (build only — compiled binary has no runtime deps)

## Setup

```sh
# Install mcporter
npm install -g mcporter

# Authenticate with Granola (opens browser)
granola auth
```

> **Remote machines**: If you're SSH'd in, tunnel the callback port first:
> ```sh
> ssh -L 61200:127.0.0.1:61200 user@host -N
> ```
> Then run `granola auth` and open the URL in your local browser.

## Usage

```sh
# Self-documenting command tree
granola

# List meetings
granola meetings
granola meetings --range last_30_days
granola meetings --range custom --start 2026-01-01 --end 2026-02-01

# Get meeting details
granola meeting <uuid>
granola meeting <uuid> --transcript

# Natural language search across all notes
granola search "what were the action items from last week"
granola search "decisions about pricing"
```

## Output Format

Every command returns a JSON envelope — no plain text, no tables:

```json
{
  "ok": true,
  "command": "granola meetings",
  "result": {
    "range": "last_30_days",
    "meetings": [
      {
        "id": "abb60eae-...",
        "title": "Quarterly planning session",
        "date": "Feb 10, 2026 4:00 PM",
        "participants": ["Joel Hooks"]
      }
    ],
    "count": 5
  },
  "next_actions": [
    { "command": "granola meeting abb60eae-...", "description": "Get details" },
    { "command": "granola search \"action items\"", "description": "Search across all notes" }
  ]
}
```

Errors include a `fix` field telling the agent (or you) what to do:

```json
{
  "ok": false,
  "command": "granola meetings",
  "error": { "message": "OAuth session expired", "code": "AUTH_EXPIRED" },
  "fix": "Re-authenticate: granola auth"
}
```

## Architecture

```
granola-cli ──→ mcporter ──→ Granola MCP (https://mcp.granola.ai/mcp)
   (CLI)        (OAuth +       (4 tools: query, list, get, transcript)
                 transport)
```

- **Transport**: Granola exposes an MCP server with OAuth. [mcporter](https://github.com/steipete/mcporter) handles the OAuth flow and MCP transport.
- **Auth**: Browser-based OAuth, tokens cached in `~/.mcporter/credentials.json`.
- **Config**: `~/.config/granola-cli/mcporter.json` — auto-created on first run.
- **No API key needed** — uses OAuth via MCP, not the Enterprise API.

## MCP Tools

The CLI wraps these Granola MCP tools:

| Command | MCP Tool | Description |
|---------|----------|-------------|
| `search` | `query_granola_meetings` | Natural language search with citations |
| `meetings` | `list_meetings` | List by time range |
| `meeting <id>` | `get_meetings` | Full details, summary, attendees |
| `meeting <id> --transcript` | `get_meeting_transcript` | Verbatim transcript |

## Release

Tag a version to trigger the GitHub Actions release build:

```sh
git tag v0.1.0
git push origin v0.1.0
```

Builds compiled binaries for macOS (arm64/x64) and Linux (arm64/x64).

## License

MIT
