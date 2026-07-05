---
repo: arcafly/fuzemill
url: 'https://github.com/arcafly/fuzemill'
homepage: null
starredAt: '2026-01-15T17:38:50Z'
createdAt: '2026-01-10T17:28:23Z'
updatedAt: '2026-01-17T12:40:41Z'
language: Rust
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:31.468Z'
description: null
tags: []
---

# Fuzemill

## tldr

```bash
fuzemill start --agent claude "Fix the login bug" --agent claude
```

The above creates issue (example: ISSUE-123), worktree, branch, and tmux session with claude/gemini yolo mode, instructed to implement prompt and push PR.

Then, when done, on main worktree enter:

```bash
fuzemill merge ISSUE-123
```


---

A Git workflow automation CLI that orchestrates issue-driven development sessions with AI coding assistants. Fuzemill manages Git worktrees, issue tracking, and AI sessions in tmux to create isolated, focused development environments.

## Features

- Creates isolated Git worktrees per issue for clean development
- Integrates with Beads (`bd`) for Git-backed issue tracking, or falls back to GitHub Issues
- Launches AI coding sessions (Claude or Gemini) in tmux
- Handles PR merging and cleanup via GitHub CLI
- Automatic worktree cleanup on session exit

## Prerequisites

The following tools must be installed and available in your PATH:

| Tool | Required | Purpose |
|------|----------|---------|
| `git` | Yes | Version control with worktree support |
| `tmux` | Yes | Terminal multiplexer for AI sessions |
| `gh` (GitHub CLI) | Yes | PR operations and GitHub Issues fallback |
| `bd` (Beads CLI) | Optional | Git-backed issue tracking (falls back to GitHub Issues if not installed) |
| `claude` | For Claude agent | Claude Code CLI |
| `gemini` | For Gemini agent | Gemini CLI |
| `direnv` | Optional | Auto-runs `direnv allow` if `.envrc` exists |

### Issue Tracking Backend

Fuzemill automatically detects which issue tracking system to use:

- **If `bd` is installed**: Uses Beads for Git-backed issue tracking with custom statuses
- **If `bd` is not installed**: Falls back to GitHub Issues via `gh` CLI

When using GitHub Issues:
- Issue creation uses `gh issue create`
- Status updates use labels (e.g., `status:hooked`, `status:in_progress`)
- Issue closing uses `gh issue close`

### Installing Dependencies

```bash
# macOS (Homebrew)
brew install git tmux gh direnv

# Install Beads (bd) - see beads documentation
# Install Claude Code - see https://claude.ai/code
# Install Gemini CLI - see Google's documentation
```

## Installation

```bash
git clone https://github.com/arcafly/fuzemill.git
cd fuzemill
cargo install --path .
```

To uninstall:

```bash
cargo uninstall fuzemill
```

## Usage

### Start Working on an Issue

Create a worktree and launch an AI session for an existing issue:

```bash
fuzemill start --id ISSUE-123
```

Or create a new issue and start working on it:

```bash
fuzemill start "Fix the login bug" --priority high
```

Options:
- `--id <ID>`: Use an existing issue ID
- `--agent <claude|gemini>`: Choose AI agent (default: claude)
- `--model <MODEL>`: Specify the AI model to use
- `-v, --verbose`: Enable verbose output

The command will:
1. Create a Git worktree at `../<repo-name>-<issue-id>/`
2. Create a new branch named `<issue-id>`
3. Run `direnv allow` if `.envrc` exists
4. Launch the AI agent in a tmux session
5. Clean up the worktree when the session ends

### Stop Working on an Issue

Remove the worktree and branch without merging:

```bash
fuzemill unstart ISSUE-123
```

If run from within the worktree being removed, fuzemill will move you to the main repository.

### Merge a Completed PR

Merge the PR, delete the branch, and close the issue:

```bash
fuzemill merge ISSUE-123
```

This command must be run from the main repository (not a worktree). It will:
1. Remove the worktree (if it exists)
2. Run `gh pr merge --merge --delete-branch`
3. Pull the latest changes to main
4. Close the issue (via `bd close` or `gh issue close`)

### End an AI Session

From within a fuzemill tmux session:

```bash
fuzemill done
```

This kills the current tmux session and triggers worktree cleanup.

### Check Repository Status

Running fuzemill without arguments shows the current repository name:

```bash
fuzemill
# Output: myproject (in green if in a git repo)
```

## Workflow Example

```bash
# 1. (Optional) Initialize beads in your project if using bd for issue tracking
bd init

# 2. Create an issue and start working
fuzemill start "Add user authentication"

# 3. AI session opens in tmux - work with the AI to implement the feature
#    The AI will commit, push, and open a PR

# 4. When done, the AI runs 'fuzemill done' to close the session

# 5. Review the PR on GitHub, then merge when ready
fuzemill merge AUTH-001

# 6. Done! Main branch is updated and issue is closed
```

## Project Structure

Fuzemill creates worktrees as siblings to your main repository:

```
~/projects/
  myproject/           # Main repository
  myproject-ISSUE-1/   # Worktree for ISSUE-1
  myproject-ISSUE-2/   # Worktree for ISSUE-2
```

## Development

```bash
cargo build           # Debug build
cargo build --release # Release build
cargo run             # Run in development mode
```
