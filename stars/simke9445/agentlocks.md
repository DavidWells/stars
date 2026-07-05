---
repo: simke9445/agentlocks
url: 'https://github.com/simke9445/agentlocks'
homepage: null
starredAt: '2026-06-05T06:54:22Z'
createdAt: '2026-05-09T16:54:18Z'
updatedAt: '2026-06-20T18:50:11Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:40.504Z'
description: Advisory file locks so multiple AI coding agents can share one Git worktree.
tags:
  - advisory-lock
  - agent-native
  - ai-agents
  - bun
  - claude-code
  - cli
  - codex
  - coding-agent
  - concurrency
  - file-locking
  - git
  - multi-agent
  - typescript
  - worktree
---

# Agentlocks

**Advisory file locks that let multiple AI coding agents share one Git worktree without clobbering each other.**

<p align="center">
  <img src="https://raw.githubusercontent.com/simke9445/agentlocks/main/assets/agentlocks-heading.png" alt="Agentlocks" width="960">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/agentlocks"><img src="https://img.shields.io/npm/v/agentlocks?color=blue&label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/agentlocks"><img src="https://img.shields.io/npm/dw/agentlocks" alt="npm weekly downloads"></a>
  <a href="https://github.com/simke9445/agentlocks/actions/workflows/ci.yml"><img src="https://github.com/simke9445/agentlocks/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/simke9445/agentlocks/actions/workflows/codeql.yml"><img src="https://github.com/simke9445/agentlocks/actions/workflows/codeql.yml/badge.svg" alt="CodeQL"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D22.18-339933" alt="Node >= 22.18">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT">
</p>

Run two coding agents in the same repository (or one agent with subagents) and they start
tripping over each other: two edit the same file and silently overwrite work, a "working on
`auth.ts`" note goes stale and never clears, and two `git add` runs race for the same index.
**Agentlocks turns those collision points into explicit, scriptable leases.**

<p align="center">
  <img src="https://raw.githubusercontent.com/simke9445/agentlocks/main/assets/agentlocks-demo-collision.gif" alt="Animated terminal demo showing Codex holding src/auth.ts and Claude Code receiving an Agentlocks lock conflict with owner, reason, and next command." width="640">
</p>

Agentlocks is advisory: it coordinates agents that check the lock before writing. It makes overlaps
visible and scriptable, but it does not stop a process that ignores the protocol.

It's **agent-native**: identity comes from the harness, so there are no ids to manage;
state-reporting commands speak JSON; errors name the exact fix; and the contract tells the agent
what to run next. No daemon, no database, no hosted service. Just files under `.agentlocks/locks/`.

## Install

```bash
npm install -g agentlocks      # or: bun install -g agentlocks
agentlocks --help
```

`npm install -g` works with no Bun on the machine: Agentlocks ships as one small Node bundle that
runs under your own Node — no per-platform binary, no embedded runtime. It needs Node >= 22.18, the
first release that loads a TypeScript `agentlocks.config.ts` natively. (Bun is only needed to build
from source.) Then run `agentlocks init` once inside each repo you want to coordinate.

The published npm package is a 5-file tarball with SLSA provenance attestations and no runtime
dependencies. Release automation publishes the exact tarball that passed Linux glibc, Linux musl,
macOS, Windows, and Node 22.18 / 22.22 / 24.16 conformance.

## See it in 20 seconds

```bash
# Inside Codex or Claude Code, the agent's identity is detected automatically.
lock=$(agentlocks acquire 'src/auth.ts' --reason "refactor login" --id-only)

# ... the agent edits src/auth.ts, runs tests ...

agentlocks release "$lock" --id-only
```

A second agent that tries to `acquire 'src/auth.ts'` while that lease is held gets a clean
conflict: the blocking owner, its reason, and the exact command to run next, instead of a
silent overwrite.

## Genuinely agent-native

Most CLIs are designed for humans and merely tolerated by agents. Agentlocks inverts that. Every
surface is held to an agent-ergonomics bar, and you can verify each claim yourself:

| What an agent needs | What Agentlocks gives it | Try it |
| --- | --- | --- |
| **Zero-config identity** | The harness supplies the agent id; you never pass `--agent-id` | `agentlocks identify --json` |
| **Machine-readable output** | `--json` / `--id-only` on every data surface; stdout is data, stderr is diagnostics | `agentlocks status --json` |
| **A self-describing contract** | Every command, flag, exit code, and follow-up, in one payload | `agentlocks capabilities --json` |
| **In-tool docs** | A paste-ready agent handbook, no external doc lookup needed | `agentlocks robot-docs guide` |
| **Errors that teach** | A wrong flag gets a "did you mean" plus the exact corrected command | `agentlocks status --jason` |
| **Next-step breadcrumbs** | The contract names the next command for every verb; conflicts and errors print a `next:` line | `agentlocks capabilities --json` |

A typo doesn't dead-end the agent. It teaches:

```text
$ agentlocks status --jason
agentlocks error: unknown option '--jason'
(Did you mean --json?)
next: agentlocks status --json
```

Identity just works, with no setup and no flags:

```text
$ agentlocks identify --json
{"kind":"identified","exit_code":0,"agent_id":"codex:0fd188d5-...","source":"harness:codex:CODEX_THREAD_ID","harness":"codex","harness_scope":"agent","reliable":true,"mine_supported":true}
```

Agentlocks even brings its own harness integration: `agentlocks init --harness claude-code`
installs a Claude Code `PreToolUse` hook (and `--harness codex` the Codex equivalent) that runs
an advisory `git verify` before a `git commit` tool-call, surfacing staged-but-unlocked paths
without ever blocking the commit or touching your git config.

## What it coordinates

Concurrent repository work fails in three predictable places. Agentlocks makes each one explicit,
owned, and parseable:

| Collision point | Agentlocks behavior | Proof surface |
| --- | --- | --- |
| Two workers edit the same file | `acquire`, `expand`, `refresh`, `release` over quoted repo-relative resources | `agentlocks capabilities --json` |
| A stale "I'm on this" note never clears | TTL leases, liveness classification, `prune --dry-run` then `prune` | `agentlocks prune --dry-run --json` |
| Two workers race the shared Git index | `git begin` takes the synthetic `@git/index` lock; `git end` releases it | `src/locks/types.ts`, `tests/locks.test.ts` |

Agentlocks is **advisory**: it coordinates agents that agree to use it. It does not stop an
editor, shell command, or Git operation that ignores the protocol, which is also why it needs
no daemon, no privileges, and no lock-holding background process.

## Why Agentlocks

| Approach | Works well for | Where it falls short for shared worktrees |
| --- | --- | --- |
| Manual notes in chat or issues | Informal coordination and intent | No lease, no owner check, no parseable status, easy to forget before staging |
| Shell scripts | Local conventions around one repo | Usually miss conflict semantics, stale sessions, JSON contracts, and Git-index locking |
| `flock` | Process-level critical sections on one machine | Not a repo resource registry; no resource inventory, owner metadata, install guidance, or agent docs |
| Git-native hooks (`pre-commit`) | Commit-time policy checks | Too late to prevent overlapping edits; hooks do not coordinate `git add` across workers, and a single `core.hooksPath` collides with husky/lefthook |
| Hosted lock service | Cross-machine coordination | Requires a service, credentials, network access, and operational ownership |
| Agentlocks | Local agents in one repository worktree | Advisory only; participants opt in. Ships `git verify` plus an opt-out PreToolUse backstop (Claude Code + Codex) that runs it *before* a `git commit` tool-call; installs no git hook and never reconfigures your git |

## Quick Demo

This demo runs inside Codex or Claude Code. The active harness identity is detected
automatically, including Claude Code subagents when `agentlocks init --harness claude-code` has
installed the project hook.

```bash
HOST="$(mktemp -d)"
cd "$HOST"
git init -q

printf 'console.log("hello")\n' > app.ts
printf '# Demo host repo\n' > AGENTS.md
printf '{"scripts":{}}\n' > package.json

# Expected to exit 1 when init drift is found; it does not write files.
agentlocks init --check --json || true
agentlocks init

agentlocks identify --json
file_lock="$(agentlocks acquire 'app.ts' --reason "edit app" --id-only)"
agentlocks expand 'README.md' --lock "$file_lock" --id-only
agentlocks refresh "$file_lock" --id-only

# git begin --id-only prints two lines: the lock id, then a fence token. Read both.
{ read git_lock; read git_token; } < <(agentlocks git begin --refresh-lock "$file_lock" --reason "commit demo" --id-only)
agentlocks status --json
agentlocks git end "$git_lock" --git-token "$git_token" --release-lock "$file_lock" --id-only

agentlocks prune --dry-run --json
agentlocks doctor --json
```

Expected shape:

```text
identify shows a harness source such as CLAUDE_CODE_SESSION_ID, CODEX_THREAD_ID, or AGENTLOCKS_HARNESS_AGENT_ID.
status shows two locks while the file lock and @git/index lock are held.
git end prints the released git lock id and file lock id.
prune --dry-run reports pruned_count 0 in a fresh repo.
doctor reports ok true after init completes.
```

## Host Setup

`agentlocks init` is idempotent and writes the host-repo support files. Run it once per repo;
add `--harness claude-code` (or `--harness codex`) to also install the PreToolUse hooks.

```bash
agentlocks init --check --json || true     # preview changes; exits 1 on drift, writes nothing
agentlocks init

# Claude Code: also install the .claude PreToolUse hooks.
agentlocks init --check --harness claude-code --json || true
agentlocks init --harness claude-code
```

`init` can create or update:

| Path | Behavior |
| --- | --- |
| `.agentlocks/locks/active/` | Local active lock records |
| `agentlocks.config.ts` | Default config when missing; existing config is preserved |
| `AGENTS.md` | Marked Agentlocks instructions block (read by Codex and Claude Code) |
| `.claude/settings.json` | Adds a Claude Code `PreToolUse` hook when `--harness claude-code` is used |
| `.claude/hooks/agentlocks-agent-env.mjs` | Per-Bash-call agent id hook; **by default also runs `git verify` before a `git commit` tool-call** (one script, advisory; pass `--no-commit-hook` for the id-injection-only body) |
| `.codex/hooks.json` + `.codex/hooks/agentlocks-git-verify.mjs` | Codex `PreToolUse` commit-hook backstop when `--harness codex` is used (project-local hooks need trust before they run) |
| `.gitignore` | Adds `.agentlocks/` |

The commit-hook backstop is advisory: it surfaces staged-but-unlocked paths before a `git commit`
tool-call and **never blocks the commit**. It is installed by default; `agentlocks init
--no-commit-hook` keeps the original id-injection-only Claude hook and skips the Codex hook.

## Quick Start

The steps below assume the global install above and a supported agent harness. Codex and Claude
Code identity is automatic.

1. Initialize the host repo (writes the `AGENTS.md` instructions block).

   ```bash
   agentlocks init --check --json || true
   agentlocks init

   # Claude Code: also install the .claude PreToolUse hooks.
   agentlocks init --check --harness claude-code --json || true
   agentlocks init --harness claude-code
   ```

2. Inspect the detected agent id.

   ```bash
   agentlocks identify --json
   ```

3. Acquire the narrowest lock before editing.

   ```bash
   agentlocks acquire 'src/index.ts' 'tests/cli.test.ts' --reason "change CLI dispatch" --id-only
   ```

4. Expand before touching another file.

   ```bash
   agentlocks expand 'src/config.ts' --lock <lock_id> --id-only
   ```

5. Refresh before long edit batches, after tests, and before staging.

   ```bash
   agentlocks refresh <lock_id> --id-only
   ```

6. Coordinate the shared Git index. `git begin --id-only` prints two lines: the git lock id, then a
   fence token that `git end` re-checks (it aborts with exit 3 if the lease was reclaimed mid-commit).

   ```bash
   { read git_lock; read git_token; } < <(agentlocks git begin --refresh-lock <lock_id> --reason "commit Agentlocks change" --id-only)
   git add <locked_paths>
   git commit
   agentlocks git end "$git_lock" --git-token "$git_token" --release-lock <lock_id> --id-only
   ```

   Or let `agentlocks commit` do all of it (lock, stage, commit, fence, release) in one command.

7. Before a *raw* `git commit`, sanity-check coverage (advisory; never blocks):

   ```bash
   agentlocks git verify --json     # lists any staged-but-unlocked paths
   ```

   This is what the opt-out PreToolUse commit-hook backstop runs automatically. If you ever lose
   your lock ids (e.g. after context compaction), recover with `agentlocks status --mine` and
   `agentlocks release --mine` / `agentlocks refresh --mine`.

## Command Reference

`agentlocks capabilities --json` is the source of truth for command metadata, positionals, JSON
shape refs, `--id-only` line contracts, flags, exit codes, default TTLs, agent identity detection,
and next commands.

Quote every resource so the shell passes it to Agentlocks literally. Exact paths and glob patterns
share the same positional list. The CLI treats those quoted arguments as raw resource specs; JSON
lock records use `resources` for the normalized `{kind,value}` entries stored in each lease.

```bash
agentlocks acquire 'a.ts' 'b.ts' 'src/**/*.ts' --reason "edit files"
agentlocks acquire 'analyses/trending-baseline/**' --reason "create Phase 0 artifacts"
```

| Command | Purpose | Key flags | Output notes |
| --- | --- | --- | --- |
| `acquire [resources...]` | Acquire locks for quoted repo-relative paths or glob patterns | `--reason`, `--ttl-ms`, `--reclaim`, `--agent-id`, `--json`, `--id-only`, `--verbose` | `--reason` and at least one resource are required; glob-like resources are inferred from `*`, `?`, or bracket classes |
| `expand [resources...] --lock <id>` | Add quoted repo-relative resources to an existing lock atomically | `--lock`, `--reason`, `--ttl-ms`, `--agent-id`, `--json`, `--id-only`, `--verbose` | Requires the owning agent id |
| `refresh [locks...]` | Extend held lock leases, or all of yours with `--mine` | `--mine`, `--ttl-ms`, `--agent-id`, `--json`, `--id-only`, `--verbose` | Pass lock ids positionally; `--mine` refreshes every lock you hold and needs a stable identity |
| `release [locks...]` | Release held locks, or all of yours with `--mine` | `--mine`, `--agent-id`, `--json`, `--id-only`, `--verbose` | Pass lock ids positionally; `--mine` drops every lock you hold and rejects an unstable identity with exit 2 |
| `status [resources...]` | List active locks, filtered by resources or `--mine` | `--mine`, `--json`, `--id-only`, `--verbose` | `--mine` shows only your locks; compact JSON includes normalized resources, owner, reason, status, reclaimability, and next action |
| `board [resources...]` | Who/What/Where overview grouped by agent, with each lease's state | `--mine`, `--json`, `--id-only`, `--verbose` | Read-only and mutex-free; grouped compact JSON uses the same lock summary shape as `status` |
| `prune` | Remove reclaimable expired locks | `--dry-run`, `--json`, `--id-only`, `--verbose` | Use `--dry-run` before deleting |
| `identify` | Show detected agent identity | `--agent-id`, `--json`, `--verbose` | `--id-only` is rejected; JSON reports whether `refresh --mine` / `release --mine` are supported |
| `git begin` | Acquire the synthetic `@git/index` lock | `--reason`, `--refresh-lock`, `--ttl-ms`, `--agent-id`, `--json`, `--id-only`, `--verbose` | Can refresh held file locks first; `--id-only` prints two lines: the lock id, then a fence token |
| `git end [locks...]` | Release the synthetic Git-index lock | `--release-lock`, `--git-token`, `--agent-id`, `--json`, `--id-only`, `--verbose` | Pass Git-index lock ids positionally; `--git-token` re-checks the fence before releasing; can release file locks after |
| `git verify` | Advisory check: are staged paths covered by a held lock? | `--staged`, `--include-unstaged`, `--pathspec`, `--pathspec-mode`, `--json`, `--verbose` | Read-only, never blocks, always exits 0; the engine behind the commit-hook backstop |
| `run [resources...] -- <cmd>` | Acquire locks, run the command after `--`, then release | `--reason`, `--ttl-ms`, `--agent-id` | The wrapped command runs outside the registry mutex; exit code is the command's |
| `edit [resources...] -- <cmd>` | Acquire locks, run the command after `--`, and keep the lock | `--reason`, `--ttl-ms`, `--agent-id` | Prints the lock id so you can refresh or release it across turns |
| `commit [resources...]` | Lock the resources and the Git index, stage and commit only those resources, then release | `--reason`, `--message`, `--keep`, `--ttl-ms`, `--agent-id` | Pathspec-scoped `git add`/`git commit`; `--keep` retains the file lock |
| `init` | Initialize or check host support files | `--check`, `--harness auto\|codex\|claude-code`, `--no-commit-hook`, `--json`, `--verbose` | Installs the PreToolUse commit-hook backstop by default; `--no-commit-hook` skips it; `--check` exits 1 on drift |
| `capabilities` | Print the CLI contract | `--json` | Compact single-line JSON with command positionals, JSON schema refs, examples, and `--id-only` line shapes |
| `robot-docs guide` | Print an in-tool agent workflow guide | none | Human text, deterministic golden-tested output |
| `doctor` | Run read-only health checks | `--json`, `--verbose` | Exits 1 when warnings or errors are present |

Do not pass `--agent-id` in normal Codex or Claude Code use. That flag exists for unsupported
harness integrations and recovery from outside the original harness agent.

### Exit Codes

| Code | Name | Meaning |
| --- | --- | --- |
| 0 | `success` | Command completed successfully |
| 1 | `cli_or_check_error` | CLI parse error, init check drift, or `doctor` warning/error result |
| 2 | `lock_usage_error` | Invalid lock input, missing lock id, or missing lock resource |
| 3 | `lock_conflict` | Lock conflict or ownership failure |

When `--json` is present, parse and runtime errors use compact payloads shaped like:

```json
{"ok":false,"exit_code":1,"code":"commander.unknownOption","message":"unknown option '--jason'\n(Did you mean --json?)","details":{"suggestion":{"replace":"--jason","with":"--json","command":"agentlocks status --json"}}}
```

## Configuration

Host repositories may add `agentlocks.config.ts` at the repository root. Defaults stay generic.

```ts
export default {
  // Display name used in generated instruction text. Defaults to the repo directory name.
  projectName: "example",

  // Local lock state root. Active records live under active/, events under events.jsonl,
  // and registry serialization uses a .mutex directory.
  lockRoot: ".agentlocks/locks",

  command: {
    // Command rendered into the generated AGENTS.md instructions.
    executable: "agentlocks",

    // Use prefix instead when the command should render through a project script or wrapper.
    // prefix: ["env", "AGENTLOCKS_PROFILE=team"],

    // Or render through a package script.
    // packageRunner: "bun",
    // packageScript: "agentlocks",
  },

  defaults: {
    // Default lease length for new locks and refreshes.
    ttlMs: 600_000,

    // Upper bound accepted by --ttl-ms.
    maxTtlMs: 1_800_000,

    // Grace after expiry when liveness cannot be proven. Short by default so a
    // dead, un-probeable lock reclaims soon after its lease lapses. May be 0.
    unknownLivenessGraceMs: 90_000,

    // When true, acquire takes over a conflict whose locks are all reclaimable
    // in one command. The `acquire --reclaim` flag always does this regardless.
    autoReclaimOnConflict: false,

    // When true, an agent's own acquire/expand/refresh extends its other held
    // leases, so a busy agent rarely needs a dedicated refresh.
    keepAliveOnMutation: true,
  },

  owner: {
    // Fallback lookup for unsupported harness integrations.
    // Codex and Claude Code use harness detection automatically.
    envKeys: ["AGENTLOCKS_AGENT_ID"],

    // Runtime harnesses checked first.
    harnesses: ["codex", "claude-code"],

    // Generic fallback prefix when no harness, explicit id, or env id is available.
    fallbackPrefix: "agentlocks",
  },

  liveness: {
    // "auto" (default) probes by the owner's detected harness: the Codex
    // session index or the Claude Code session transcript, falling back to the
    // grace window for un-probeable owners. "unknown" disables probing;
    // "codex" or "claude-code" force a single adapter.
    adapter: "auto",
  },

  agents: {
    enabled: true,
    heading: "Agentlocks coordination",
  },

  init: {
    updateAgents: true,
    updateGitignore: true,
  },
};
```

The config is a plain object, validated when Agentlocks loads it (a bad key or wrong type fails with
an actionable error).

Config discovery starts at the current working directory, walks up to the nearest `.git`, then
loads `agentlocks.config.ts` if present. Without a config file, Agentlocks uses the defaults above.

## Architecture

```text
bin/agentlocks.ts
  -> src/index.ts
    -> cli/main
      -> Commander parser
        -> lock command handlers
          -> loadAgentlocksConfig
          -> FileLockRegistry
            -> normalize resource specs/@git/index
            -> .agentlocks/locks/.mutex
            -> .agentlocks/locks/active/<lock_id>.json
            -> .agentlocks/locks/events.jsonl
        -> init handler
          -> agentlocks.config.ts
          -> AGENTS.md marked block
          -> .gitignore
        -> capabilities / robot-docs / doctor
          -> stdout text or compact JSON
```

The registry writes lock records atomically through a temporary file and rename. Mutating registry
operations are serialized with a directory mutex that Agentlocks can reclaim after it becomes stale.

## Safety Model

Agentlocks is built for cooperative local coordination.

| Guarantee | Details |
| --- | --- |
| Advisory locking | Agentlocks reports and records conflicts; it does not patch editors, shells, or Git to enforce them |
| Owner-only changes | `expand`, `refresh`, and `release` require the agent id recorded on the lock |
| Short leases | Default TTL is 10 minutes; maximum default is 30 minutes |
| Stale recovery | Expired locks are classified by liveness and become reclaimable after the configured unknown-liveness grace |
| Safe inspection | `init --check --json`, `prune --dry-run --json`, `status --json`, `capabilities --json`, and `doctor --json` are the inspection surfaces |
| Git-index coordination | `git begin` locks only the synthetic `@git/index` resource; file locks are separate and should still cover staged paths |

Agentlocks does not provide a hosted coordinator, cross-machine consensus, authentication, encryption,
or a migration layer for old lock schemas. The lock record schema is current-version only.

## Troubleshooting

| Symptom | Meaning | Next command |
| --- | --- | --- |
| `lock conflict: <path>` | Another active or unreclaimable lock overlaps your requested resource | `agentlocks status <path> --json` |
| Conflict JSON has `suggested_action: "prune_then_retry"` | All overlapping locks are reclaimable; each conflict includes normalized resources, owner, reason, status, reclaimability, and next action | `agentlocks prune --dry-run --json`, then `agentlocks prune` |
| `Lock <id> is owned by <owner>; current owner is <caller>.` | The current agent id differs from the id that created the lock | Continue from the same harness agent, or use `--agent-id <owner>` for unsupported harness recovery |
| `At least one lock id is required for refresh.` | `refresh`, `release`, or `git end` needs a lock id | `agentlocks status --id-only` |
| `Lock resource must be repo-relative` | Absolute paths are rejected | `agentlocks acquire 'path/from/repo/root' --reason "<intent>"` |
| `Lock TTL must be <= 1800000.` | The requested lease exceeds the configured maximum | `agentlocks refresh <lock_id> --ttl-ms 600000` |
| `init --check --json` exits 1 | Init drift was found; no files were written | Review JSON changes, then run `agentlocks init` |
| `doctor --json` reports init drift | Support files are missing or stale | `agentlocks init --check --json` |
| Unknown flag or command prints `next:` | Agentlocks found a close match | Run the exact `next:` command |

## Limitations

- Agentlocks is pre-1.0: the lock-record schema and CLI contract can change between minor versions,
  with no migration layer (see [CHANGELOG.md](CHANGELOG.md)).
- Agentlocks coordinates one local worktree through files under `.agentlocks/locks`; it is not a
  networked lock server.
- Advisory locks work only when participants use Agentlocks before editing and staging.
- Liveness defaults to the `auto` adapter, which probes the owner's harness (the Codex session
  index or the Claude Code session transcript) and falls back to a short grace window when the
  owner cannot be probed.
- `init` writes a generic instruction block. It does not add prompt-optimization behavior,
  repository-specific defaults, or command aliases.
- There are no compatibility layers, deprecated command names, or migration tools for previous
  internal layouts or schemas.

## FAQ

### Is this only for agents?

Agentlocks is agent-native. A person can run the same commands for recovery or local debugging, but
the normal workflow assumes Codex, Claude Code, or another coding harness supplies a stable agent
id.

### How should agents identify themselves?

They normally should not. Agentlocks checks supported harness identity first. Claude Code hooks pass
`AGENTLOCKS_HARNESS_AGENT_ID`; Codex uses `CODEX_THREAD_ID`; Claude Code falls back to
`CLAUDE_CODE_SESSION_ID` when the hook is absent. `--agent-id` and `AGENTLOCKS_AGENT_ID` are only for
unsupported harness integrations or recovery from outside the original harness agent. Without any
stable source, Agentlocks falls back to a process-scoped id.

### How do users know when to update?

Interactive Agentlocks commands print a stderr notice on every run while a newer version is
available, checking npm at most once per hour:

```text
New Agentlocks version available: 0.9.2 -> 0.9.3
Update with: bun update -g --latest agentlocks
npm users: npm install -g agentlocks@latest
```

The update check is skipped for `--json`, `--id-only`, CI, and non-TTY runs so automation output
stays parseable. Set `AGENTLOCKS_DISABLE_UPDATE_CHECK=1` to disable it completely.

### What happens in CI?

Use `agentlocks status --json`, `agentlocks capabilities --json`, and `agentlocks doctor --json` for
read-only checks. Mutating lock commands can work in CI, but Agentlocks is primarily designed for
interactive shared worktrees.

### Does Agentlocks replace Git branches?

No. It coordinates local edits and shared index access inside a worktree. Branch strategy stays
outside Agentlocks.

### Does `@git/index` lock every file?

No. `@git/index` only coordinates staging and commit access. Acquire normal resource locks for the
paths or globs you intend to edit and stage.

### How does stale lock cleanup work?

Locks expire by TTL. If liveness is dead, or unknown beyond the configured grace period, `prune`
can remove the record. Use `prune --dry-run --json` first.

### Can I use it in a monorepo?

Yes, if every participant agrees on the same repository root and lock root. Use repo-relative
resources and configure `lockRoot` if the default `.agentlocks/locks` is not where you want local
state.

### Is the lock state safe to commit?

No. `init` adds `.agentlocks/` to `.gitignore`. The lock state is local coordination data.

## Development

```bash
bun install --frozen-lockfile
bun test
bun run typecheck
bun run lint
bun run check
```

The current tests cover CLI parsing and rendering, file-backed lock semantics, config loading,
init idempotency, doctor output, capabilities JSON, generated instruction text, and the
golden-tested robot guide.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines. Bug reports and issues are
welcome.

## License

MIT. See [LICENSE](LICENSE).
