---
repo: brenbuilds1/copilot-ralph
url: 'https://github.com/brenbuilds1/copilot-ralph'
homepage: null
starredAt: '2026-01-14T03:59:40Z'
createdAt: '2026-01-12T17:02:22Z'
updatedAt: '2026-01-23T11:44:14Z'
language: Shell
license: MIT
branch: main
stars: 44
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:31.555Z'
description: >-
  Copilot ralph is an autonomous AI agent loop that runs repeatedly until all
  PRD items are complete.
tags: []
---

# Ralph for GitHub Copilot CLI

An autonomous AI agent loop that runs [GitHub Copilot CLI](https://github.com/github/copilot-cli) repeatedly until all PRD items are complete. Each iteration is a fresh Copilot instance with clean context. Memory persists via git history, `progress.txt`, and `prd.json`.

Based on [Geoffrey Huntley's Ralph pattern](https://ghuntley.com/ralph/) and adapted from [Ryan Carson's Amp implementation](https://github.com/snarktank/ralph).

## Prerequisites

- [GitHub Copilot CLI](https://github.com/github/copilot-cli) installed and authenticated (`npm install -g @github/copilot`)
- Active Copilot subscription (Pro, Pro+, Business, or Enterprise)
- `jq` installed (`apt-get install jq` on Linux, `brew install jq` on macOS)
- A git repository (Ralph commits progress and uses git history for memory)

## Quick Start

Copy files to your project, then run:

```bash
# In your project directory
cp /path/to/copilot-ralph/ralph.sh ./
cp /path/to/copilot-ralph/prompt.md ./
cp /path/to/copilot-ralph/prd.json.example ./prd.json

# Edit prd.json with your user stories
./ralph.sh
```

Ralph runs in the current directory and commits to the current git repo.

## PRD Format

Create a `prd.json` file with your user stories:

```json
{
  "projectName": "Landing Page",
  "branchName": "ralph/landing-page",
  "userStories": [
    {
      "id": "US-001",
      "title": "Create hero section",
      "priority": 1,
      "description": "Build hero with headline and CTA",
      "acceptanceCriteria": ["Full viewport height", "CTA scrolls to signup"],
      "passes": false
    }
  ]
}
```

See `prd.json.example` for a complete example.

## What Ralph Does

```bash
./ralph.sh [max_iterations]
```

Default is 10 iterations. Each iteration:

1. Picks the highest priority story where `passes: false`
2. Implements that single story
3. Runs quality checks
4. Commits if checks pass
5. Marks story as `passes: true`
6. Appends learnings to `progress.txt`
7. Repeats until all stories pass

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   prd.json ─────┬───────── progress.txt ─────── git history │
│                 │                                           │
│                 ▼                                           │
│        copilot -p "$PROMPT" --allow-all-tools               │
│                 │                                           │
│                 ▼                                           │
│        Check for <promise>COMPLETE</promise>                │
│                 │                                           │
│         ┌──────┴──────┐                                     │
│         ▼             ▼                                     │
│      Complete     Continue                                  │
│      Exit 0       Next iteration                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Files

| File | Purpose |
|------|---------|
| `ralph.sh` | Bash loop that spawns Copilot CLI instances |
| `prompt.md` | Instructions for each iteration |
| `prd.json` | Your user stories (create from example) |
| `progress.txt` | Learnings from previous iterations (auto-created) |
| `skills/prd/SKILL.md` | PRD generator skill for creating prd.json |

## Critical Concepts

### Fresh Context Each Iteration

Each iteration spawns a new Copilot CLI instance. Memory persists only via:
- Git history
- `progress.txt`
- `prd.json`

### Small Tasks

Stories should be small enough to complete in one context window.

**Good:** Add a form component, Create an API endpoint, Add validation

**Too big:** Build the dashboard, Add authentication, Refactor the API

### Stop Condition

When all stories have `passes: true`, Ralph outputs `<promise>COMPLETE</promise>` and exits.

## Models

GitHub Copilot CLI uses **Claude Sonnet 4.5** by default.

Available models: Claude Sonnet 4.5, Claude Sonnet 4, GPT-5

```bash
# Change model via environment variable
export COPILOT_MODEL=gpt-5
./ralph.sh
```

## Debugging

```bash
# Check story status
cat prd.json | jq '.userStories[] | {id, title, passes}'

# View learnings
cat progress.txt

# Check commits
git log --oneline -10
```

## Generating PRDs

Use the PRD skill to generate `prd.json` files through a guided process:

```bash
# Ask Copilot to generate a PRD
copilot "Generate a PRD for a user authentication system"
```

The skill will:
1. Ask 3-5 clarifying questions with A/B/C/D options
2. Generate a properly structured `prd.json`
3. Create small, implementable user stories with verifiable acceptance criteria

See `skills/prd/SKILL.md` for the full specification.

## Customizing

Edit `prompt.md` to add:
- Project-specific quality check commands
- Codebase conventions
- Common gotchas for your stack

## References

- [Geoffrey Huntley's Ralph](https://ghuntley.com/ralph/)
- [Ryan Carson's Amp implementation](https://github.com/snarktank/ralph)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Copilot CLI Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
