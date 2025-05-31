---
repo: johnlindquist/worktree-cli
url: 'https://github.com/johnlindquist/worktree-cli'
homepage: null
starredAt: '2025-05-08T19:33:29Z'
createdAt: '2025-03-20T04:11:05Z'
updatedAt: '2025-05-08T19:33:30Z'
language: JavaScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-10T22:30:18.283Z'
description: null
tags: []
---

# @johnlindquist/worktree

A CLI tool for managing Git worktrees with a focus on opening them in the Cursor editor.

## Installation

```bash
pnpm install -g @johnlindquist/worktree
```

## Usage

### Create a new worktree from Branch Name

```bash
wt new <branchName> [options]
```
Options:
- `-p, --path <path>`: Specify a custom path for the worktree
- `-c, --checkout`: Create new branch if it doesn't exist and checkout automatically
- `-i, --install <packageManager>`: Package manager to use for installing dependencies (npm, pnpm, bun, etc.)
- `-e, --editor <editor>`: Editor to use for opening the worktree (overrides default editor)

Example:
```bash
wt new feature/login
wt new feature/chat --checkout
wt new feature/auth -p ./auth-worktree
wt new feature/deps -i pnpm
wt new feature/vscode -e code
```

### Create a new worktree from Pull Request Number

```bash
wt pr <prNumber> [options]
```
Uses the GitHub CLI (`gh`) to check out the branch associated with the given Pull Request number, sets it up locally to track the correct remote branch (handling forks automatically), and then creates a worktree for it.

**Benefit:** Commits made in this worktree can be pushed directly using `git push` to update the Pull Request.

**Requires GitHub CLI (`gh`) to be installed and authenticated.**

Options:
- `-p, --path <path>`: Specify a custom path for the worktree (defaults to `<repoName>-<branchName>`)
- `-i, --install <packageManager>`: Package manager to use for installing dependencies (npm, pnpm, bun, etc.)
- `-e, --editor <editor>`: Editor to use for opening the worktree (overrides default editor)

Example:
```bash
# Create worktree for PR #123
wt pr 123

# Create worktree for PR #456, install deps with pnpm, open in vscode
wt pr 456 -i pnpm -e code
```

### Configure Default Editor

You can set a default editor to be used when creating new worktrees:

```bash
# Set default editor
wt config set editor <editorName>

# Examples:
wt config set editor code     # Use VS Code
wt config set editor webstorm # Use WebStorm
wt config set editor cursor   # Use Cursor (default)

# Get current default editor
wt config get editor

# Show config file location
wt config path
```

The default editor will be used when creating new worktrees unless overridden with the `-e` flag.

### List worktrees

```bash
wt list
```

### Remove a worktree

```bash
wt remove <pathOrBranch>
```

You can remove a worktree by either its path or branch name:
```bash
wt remove ./feature/login-worktree
wt remove feature/chat
```

## Requirements

- Git
- Node.js
- An editor installed and available in PATH (defaults to Cursor)
- **GitHub CLI (`gh`) installed and authenticated (for `wt pr` command)**

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run in development mode
pnpm dev
```

## License

MIT 
