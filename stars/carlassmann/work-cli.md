---
repo: carlassmann/work-cli
url: 'https://github.com/carlassmann/work-cli'
homepage: null
starredAt: '2026-05-19T16:25:31Z'
createdAt: '2026-05-18T14:48:49Z'
updatedAt: '2026-05-29T15:00:38Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-18T22:38:18.316Z'
description: >-
  Parallel git worktree workflows: per-workspace commands, stable .localhost
  URLs, tmux-parged agents, one CLI.
tags: []
---

# work

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)
[![status](https://img.shields.io/badge/status-experimental-yellow.svg)](#install)
[![deps](https://img.shields.io/badge/runtime%20deps-0-brightgreen.svg)](package.json)

A workflow CLI for parallel git worktrees.

## The problem

You hit "new worktree" in Codex, or start Claude Code with `--worktree`. Now you want to actually _see_ what it built. So:

- install deps — easy
- get the env vars right — maybe
- get the supporting services (db, queue, sync server, …) isolated from the other worktrees — meh
- and now those isolated services need their own URLs and credentials threaded back into the env — urgh
- open a terminal for each long-running process — and another for the agent — times every worktree you're juggling

Your agent runs for 30+ minutes, so you'd like to spin up the next worktree in parallel. Instead you have a dozen terminals open per workspace and you've lost track of which one is which.

The individual pieces are already solved:

| Tool                   | Solves                                            |
| ---------------------- | ------------------------------------------------- |
| `git worktree`         | coexisting checkouts per branch                   |
| [`portless`][portless] | stable `*.localhost` URLs, no port collisions     |
| `tmux`                 | terminals that survive when you close the window  |

`work` is the glue: a per-workspace setup script, a config of long-running commands, a tiny supervisor, and a single CLI to drive it.

Zero runtime dependencies — just Node ≥ 20 stdlib. The full CLI ships as one ~30 KB JS file.

[portless]: https://github.com/ccssmnn/portless

## What you get

```sh
work create feature-x       # create a worktree without setup or processes
work up feature-x --create   # create worktree, run setup, start configured servers
work urls feature-x          # see where everything is reachable
work logs -f web             # tail one service
work start claude -- claude  # park an interactive command in tmux
work attach claude           # come back to it later
work down feature-x          # tear it all down
```

Routed commands get a stable URL of the form:

```
{command}-{workspace}-{project}.localhost
# e.g. web-feature-x-tilly.localhost, sync-feature-x-tilly.localhost
```

Logs and state live as plain files in `~/.work-cli/` so you can `cat`, `tail`, `jq` them.

## Install

Not on npm yet — clone and link locally with [Bun](https://bun.sh):

```sh
git clone https://github.com/ccssmnn/work-cli.git
cd work-cli
bun install
bun run build
bun link
```

Optional but recommended: install [`portless`][portless] (for `route: true` commands) and `tmux` (for ad-hoc interactive commands). Verify with `work doctor`.

Shell integration (completion + `work cd`) — add to `~/.zshrc` or `~/.bashrc`:

```sh
eval "$(work shell-init zsh)"    # or: bash
```

## Example: a real workflow

A real `work.config.js` from [tilly][tilly] — an Astro PWA with a [Jazz][jazz] sync server. Each workspace gets its own isolated sync server, and the web app is told which sync URL to talk to via env var:

```js
// tilly/work.config.js
export default {
  project: "tilly",
  worktrees: {
    dir: "../tilly.worktrees",
    setup: "bun scripts/work-setup.ts",
  },
  commands: {
    sync: {
      run: 'bunx jazz-run sync --port "$PORT" --host "$HOST"',
      autoStart: true,
      route: true,
    },
    web: {
      run: 'PUBLIC_JAZZ_SYNC_SERVER="wss://sync-${WORK_WORKSPACE}-tilly.localhost" astro dev --port "$PORT" --host "$HOST"',
      autoStart: true,
      route: true,
    },
  },
}
```

`scripts/work-setup.ts` does the per-worktree prep — copy `.env.local`, run codegen, whatever the workspace needs. It receives:

| Env var            | What it points to                                        |
| ------------------ | -------------------------------------------------------- |
| `WORK_ROOT`        | the workspace (worktree) being set up                    |
| `WORK_SOURCE_ROOT` | the **main repo** — useful for copying `.env.local` etc. |
| `WORK_WORKSPACE`   | slugified branch name                                    |
| `WORK_PROJECT`     | project slug from config                                 |
| `WORK_URL`         | primary routed URL (the `web` command, if routed)        |
| `WORK_WEB_URL`     | same as `WORK_URL`                                       |
| `WORK_SYNC_URL`    | full URL for the `sync` command, if routed               |
| `WORK_SYNC_WS_URL` | WebSocket URL for the `sync` command, if routed          |
| `WORK_URLS`        | JSON of all routed URLs, keyed by command id             |
| `WORK_WS_URLS`     | JSON of WebSocket URLs, keyed by command id              |

`WORK_SOURCE_ROOT` always resolves to the main worktree via `git worktree list`, so it works the same whether you ran `work` from the main repo or from another worktree.
Configured commands receive the same routed URL variables.

Day in the life:

```sh
# Codex finishes a worktree on the `chat-streaming` branch.
# Spin it up — creates ../tilly.worktrees/chat-streaming, runs setup, starts both servers.
work up chat-streaming --create

# Open the web app. Sync server is already wired up via the env var.
open https://web-chat-streaming-tilly.localhost

# Park Claude Code in a tmux window for this workspace.
work start --attach claude -- claude --dangerously-skip-permissions

# Meanwhile, the agent is grinding for 30 minutes. Start the next worktree in parallel.
work up image-uploads --create
work start -w image-uploads claude -- claude

# Or just create a clean worktree without setup or servers.
work create refactor-sidebar

# Need to debug? Tail the sync server logs.
work logs -f -w chat-streaming sync

# Come back to the first agent.
work attach -w chat-streaming claude

# Done with this branch — stop everything.
work down chat-streaming
```

At any moment:

```sh
work ps           # what's running here
work ps -a        # what's running everywhere
work watch        # live-refresh the ps table
work watch -a     # live-refresh everything
work urls         # routed URLs for the current workspace
work doctor       # diagnose anything broken
```

### Adopting a worktree created by another tool

If a worktree already exists — created by `git worktree add` directly, Codex, Claude Code, or anything else — `cd` into it and let `work` derive everything from the current branch:

```sh
cd /path/to/the/worktree
work setup        # run the per-workspace setup script against this worktree
work up           # start the configured servers (no --create needed)
```

The workspace name is the slugified branch name. The worktree root is `$PWD`. No path flag needed.

[tilly]: https://github.com/ccssmnn/tilly
[jazz]: https://jazz.tools

## Reference

## Reference

```sh
work --help              # all subcommands
work <command> --help    # one subcommand
work help run            # same help, command form
work docs                # list built-in topics (config, urls, daemon, tmux, …)
work docs config         # full config field reference
work docs setup          # setup-hook env vars
```

## Development

Requires [Bun](https://bun.sh) for the dev loop. Build targets Node ≥ 20 with zero runtime dependencies.

```sh
bun run dev -- doctor   # run the CLI from source
bun test                # node:test runner
bun run check           # typecheck + lint + knip
bun run build           # emit dist/
```

## License

[MIT](LICENSE) © Carl Assmann
