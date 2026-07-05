---
repo: johnlindquist/orchestrator
url: 'https://github.com/johnlindquist/orchestrator'
homepage: null
starredAt: '2025-11-21T17:38:56Z'
createdAt: '2025-11-21T17:34:57Z'
updatedAt: '2025-11-22T06:26:37Z'
language: TypeScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:54.156Z'
description: null
tags: []
---

# tmux-ai

A Bun/TypeScript CLI that launches multiple AI CLIs in a tmux window with per-pane or global prompts. Works both inside and outside tmux and keeps panes open on exit.

## Prerequisites

- tmux 3.x+
- Bun 1.3+ (or Node if you swap the shebang)

## Setup

```bash
bun install          # for type hints only
chmod +x tmux-ai.ts  # make the script directly runnable
```

## Run it

```bash
./tmux-ai.ts [options]                 # run directly with Bun shebang
bun run tmux-ai.ts -- [options]        # or via Bun
bun run tmux-ai -- [options]           # package script helper
```

Key flags:

- `-t, --tool <spec>` repeatable tool command (`cmd` or `cmd=prompt`)
- `-p, --prompt <text>` global prompt applied to panes without their own
- `-s, --session <name>` tmux session (default `ai`)
- `-w, --window <name>` tmux window (default `bots`)
- `-l, --layout <layout>` tmux layout (default `tiled`)
- `--no-attach` or `--attach` control attaching when outside tmux
- `--debug` echo tmux commands

Initial prompts are passed in the tool invocations (not after launch): ca/claude/codex/droid use a positional prompt, copilot uses `-p <prompt>`, and gemini uses `--prompt-interactive <prompt>` so it continues interactively after the first turn.

Behavior:

- Inside tmux: creates a new window in the current session and never attaches.
- Outside tmux: reuses/creates the session, makes the window, and attaches unless `--no-attach`.
- Default tools if none are provided: `claude`, `gemini`, `ca`, `copilot`, `codex`, `droid`.

## Examples

Default toolset in session `ai`, window `bots`:

```bash
./tmux-ai.ts
```

Custom tools plus a global prompt:

```bash
./tmux-ai.ts -t claude -t "copilot --model gpt-5" -p "You are my coding assistant."
```

Per-pane prompts:

```bash
./tmux-ai.ts \
  -t "claude=You are a strict code reviewer." \
  -t "gemini=Research assistant; prioritize citations." \
  -t "copilot --model gpt-5=Help me write and refactor code."
```

Different layout:

```bash
./tmux-ai.ts -l main-vertical -t claude -t gemini -t copilot
```

## Per-tool git worktrees (comparison mode)

You can give each AI CLI its own git worktree of the current project and seed them with the same task to compare outputs side by side:

```bash
./tmux-ai.ts --worktrees \
  -t claude \
  -t gemini \
  -t "copilot --model gpt-5" \
  -p "Add a /users REST API with basic CRUD and tests"
```

When `--worktrees` (or `-T`) is set:

- `tmux-ai` must be run inside a git repository.
- It finds the repo root with `git rev-parse --show-toplevel`.
- It creates `<repo>/.worktrees/` (if missing) and ensures `.worktrees/` is in `.gitignore`.
- For each tool, it runs `git worktree add --detach .worktrees/<tool>-N` to create a detached worktree at the current commit.
- Each tmux pane runs its tool from its own worktree directory: `cd <repo>/.worktrees/claude-1 && claude "<prompt>"`.

Tips:

- Use `-p/--prompt` to give the same task to every CLI.
- If you like one agent's changes, you can `git diff` in that worktree and copy patches back, or branch there and merge.
- Clean up with `git worktree list` and `git worktree remove <path>` when you’re done.

Suggested alias to mirror your original `muxai` function:

```bash
alias muxai="$HOME/bin/tmux-ai.ts"   # adjust path as needed
```
