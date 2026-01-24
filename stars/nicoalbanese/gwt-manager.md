---
repo: nicoalbanese/gwt-manager
url: 'https://github.com/nicoalbanese/gwt-manager'
homepage: null
starredAt: '2026-01-15T18:08:09Z'
createdAt: '2026-01-15T14:37:41Z'
updatedAt: '2026-01-15T21:31:36Z'
language: Shell
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:31.320Z'
description: null
tags: []
---

# GWT - Git Worktree Manager

A CLI tool for managing Git worktrees with ease. Create, switch between, and archive worktrees without remembering complex git commands.

Inspired by [Conductor](https://conductor.build), but designed to be lightweight, live in the terminal, and allow you to use any coding agent you want.

## Features

- **Quick worktree creation** with auto-generated city-based branch names
- **Interactive worktree switching** with fzf preview (shows uncommitted changes, unpushed commits, and scratchpad notes)
- **Per-worktree scratchpad** for notes that stay with the worktree
- **Setup scripts** to automate environment setup for new worktrees
- **Rename support** that handles all git references

## Requirements

- zsh
- git
- [fzf](https://github.com/junegunn/fzf) (for interactive worktree selection)

## Installation

1. Install [fzf](https://github.com/junegunn/fzf) if you haven't already: `brew install fzf`
2. Clone this repository
3. Add the following to your `~/.zshrc`:

```bash
source ~/path/to/gwt-manager/gwt
```

3. Reload your shell or run `source ~/.zshrc`

## Commands

| Command | Description |
|---------|-------------|
| `gwt list` | Browse and switch between worktrees using fzf |
| `gwt new [name]` | Create a new worktree (uses random city name if no name provided) |
| `gwt archive` | Remove current worktree, return to main, and pull latest changes |
| `gwt main` | Switch to main worktree |
| `gwt info` | Show current worktree info (repo, branch, created date, last commit) |
| `gwt rename <old> <new>` | Rename repo and worktrees directory, updating all git references |
| `gwt add-setup-script` | Create a `.worktree-setup` template in repo root |
| `gwt help` | Show help message |

## Usage Examples

### Create a new worktree

```bash
# With a custom branch name
gwt new feature-auth

# With an auto-generated city name (e.g., "tokyo-250115")
gwt new
```

### Browse and switch worktrees

```bash
gwt list
```

This opens an fzf picker showing all worktrees sorted by last modified time. The preview pane shows:
- Scratchpad notes (if any)
- Commits not yet pushed to origin/main
- Uncommitted changes

### Archive a worktree

```bash
# Run from within the worktree you want to remove
gwt archive
```

This removes the worktree, switches back to main, and pulls latest changes.

### Setup scripts

Create a `.worktree-setup` file in your repo root to automate setup for new worktrees:

```bash
gwt add-setup-script
```

This creates a template that runs `pnpm install` and copies `.env.local` from the main repo. Customize it for your project needs.

Example `.worktree-setup`:

```bash
#!/bin/zsh

pnpm install
cp "$GWT_MAIN_PATH/.env.local" .env.local
```

The `$GWT_MAIN_PATH` variable contains the path to the main repo.

## How It Works

GWT creates worktrees in a sibling directory named `{repo}-worktrees/`. For example:

```
~/code/my-project/           # main repo
~/code/my-project-worktrees/ # worktrees directory
  ├── tokyo-250115/
  ├── feature-auth/
  └── bugfix-login/
```

Each worktree can have a `.scratchpad` file for notes (automatically excluded from git).

## License

MIT
