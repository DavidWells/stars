---
repo: johnlindquist/lamarck
url: 'https://github.com/johnlindquist/lamarck'
homepage: null
starredAt: '2026-02-16T20:57:32Z'
createdAt: '2026-02-12T04:50:42Z'
updatedAt: '2026-03-11T10:38:57Z'
language: TypeScript
license: NA
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:33.174Z'
description: >-
  Analyze Claude Code sessions and extract high-signal learnings into MEMORY.md
  files
tags: []
---

# lamarck

<p align="center">
  <img src="./lamarck.png" alt="Lamarck" width="200" />
</p>

Automatically learns from your Claude Code conversation history and writes what it discovers into `MEMORY.md` files that get loaded into future sessions. Run it once, on a cron, or as a post-conversation hook — it tracks what it's already processed so it never re-scans the same sessions.

## Why "Lamarck"?

Jean-Baptiste Lamarck proposed that organisms pass on traits acquired during their lifetime to the next generation. A blacksmith's children inherit strong arms. That's exactly what this tool does — traits Claude acquires during a coding session (patterns, pitfalls, preferences) get inherited by future sessions through MEMORY.md. Darwinian evolution says only random mutations survive; Lamarckian evolution says experience matters. Your Claude gets smarter because of what it lived through.

## How it works

```
Claude Code sessions (.jsonl)
        │
        ▼
┌─────────────────────┐
│  Incremental scan   │  Reads only new lines from ~/.claude/history.jsonl
│  (byte-offset cursor)│  using inode + offset tracking
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Per-project queue   │  Discovered sessions queued for processing
│  with retry tracking │  Failed sessions retry on next run
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  LLM reflection      │  Claude extracts diary entries from transcripts:
│  (diary + deltas)    │  accomplishments, decisions, preferences, pitfalls
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Quality gates       │  Similarity dedup, content filtering,
│                      │  category quotas, minimum scores
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Playbook curation   │  Add, merge, deprecate, promote/demote bullets
│                      │  with conflict detection
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  MEMORY.md export    │  Writes to each project's memory/ directory
│                      │  + topic files (workflow, pitfalls, etc.)
└─────────────────────┘
```

Each "bullet" in the playbook has a maturity lifecycle: **candidate** → **established** → **proven** → **deprecated**. Feedback (helpful/harmful counts) decays exponentially over time (90-day half-life), so recent learnings matter more.

## Installation

```bash
npx lamarck
```

Or install globally:

```bash
npm install -g lamarck
```

Requires Node.js >= 18 and a working `claude` CLI (used for LLM reflection calls).

## Usage

### `lamarck` — Learn from sessions (default)

```bash
lamarck
```

On first run, bootstraps from the last 14 days of history, picks the highest-signal sessions, and processes them. On subsequent runs, only processes new conversations since the last run.

```bash
lamarck --dry-run --verbose
```

Preview what would change without writing anything.

```bash
lamarck --project ~/dev/my-app
```

Only process sessions for a specific project.

```bash
lamarck --session-id <uuid> --project ~/dev/my-app
```

Process a specific session immediately (hook mode). Designed for use as a post-conversation hook.

| Flag | Description | Default |
|------|-------------|---------|
| `--project <path>` | Process only this project | cwd |
| `--session-id <id>` | Process a specific session (hook mode) | — |
| `--dry-run` | Preview changes without writing | `false` |
| `--days <n>` | Lookback window in days | `7` |
| `--max-sessions <n>` | Max sessions to process | `25` |
| `--verbose` | Detailed progress logging | `false` |
| `--store-dir <path>` | Override storage directory | `~/.claude-improve` |

### `lamarck review` — Interactive review

```bash
lamarck review
```

Interactively review extracted learnings and choose where to route them. Requires a TTY — falls back to batch mode in non-interactive environments (CI, pipes).

| Flag | Description | Default |
|------|-------------|---------|
| `--local-path <path>` | Default local output path | `./LEARNINGS.md` |
| `--project <path>` | Process only this project | cwd |
| `--session-id <id>` | Process a specific session | — |
| `--days <n>` | Lookback window in days | `7` |
| `--max-sessions <n>` | Max sessions to process | `25` |
| `--verbose` | Detailed progress logging | `false` |
| `--store-dir <path>` | Override storage directory | `~/.claude-improve` |

### `lamarck skill <name>` — Analyze a skill

Analyze how well a Claude Code skill (SKILL.md) is performing across real conversations. Reads session transcripts where the skill was invoked, evaluates adherence to the skill's guidance, and produces actionable feedback.

```bash
# Quick suggestions for improving a skill
lamarck skill oracle-packx

# Find gaps in coverage
lamarck skill oracle-packx --mode gaps

# Full per-session report
lamarck skill oracle-packx --mode report

# Auto-generate an improved SKILL.md
lamarck skill oracle-packx --mode auto-improve

# Auto-improve and overwrite the original (with confirmation prompt)
lamarck skill oracle-packx --mode auto-improve --apply

# Thorough search including grepping session files
lamarck skill oracle-packx --deep

# Use a different model
lamarck skill oracle-packx --model sonnet
```

#### Modes

| Mode | Description |
|------|-------------|
| `suggest` | **(default)** Strengths, weaknesses, gaps, and prioritized suggestions for improvement |
| `gaps` | Focused view of what the skill doesn't cover — recurring gaps and one-off misses |
| `report` | Full detailed report with per-session breakdowns (adherence scores, failures, user frustrations) |
| `auto-improve` | All of the above, plus generates a rewritten SKILL.md with the improvements applied |

#### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--mode <mode>` | Analysis mode: `suggest`, `gaps`, `report`, `auto-improve` | `suggest` |
| `--deep` | Also grep session files for skill invocations (slower, more thorough) | `false` |
| `--force` | Ignore cached state and reprocess all sessions | `false` |
| `--max-sessions <n>` | Max sessions to analyze | `15` |
| `--model <model>` | Claude model to use: `opus`, `sonnet`, `haiku` | `opus` |
| `--apply` | With `auto-improve`: overwrite SKILL.md after confirmation | `false` |
| `--verbose` | Detailed progress logging | `false` |
| `--store-dir <path>` | Override storage directory | `~/.claude-improve` |

Without `--apply`, auto-improve writes to `SKILL.md.improved` alongside the original. With `--apply`, it prompts for confirmation before overwriting. Sessions already analyzed are cached — use `--force` to reprocess them.

## What it produces

### MEMORY.md (per project)

Written to `~/.claude/projects/<encoded-project>/memory/MEMORY.md` — this is the file Claude Code automatically loads into context for each session.

```markdown
<!-- BEGIN CM AUTO-GENERATED -->
# Claude Memory

## Working Agreement
- None yet.

## Gotchas
- AVOID: When using claude --json-schema, extract from structured_output field, not result field.

## Repo Conventions
- When adding new shape types, update both draw logic and CURSOR_CLASS_BY_TOOL mapping.

## Debug & Tool Recipes
- When npm package pages block WebFetch, use npm view, GitHub API, or DeepWiki as fallbacks.

## Topic files
- [Workflow](./workflow.md)
- [Tooling](./tooling.md)
- [Preferences](./preferences.md)
- [Pitfalls](./pitfalls.md)
<!-- END CM AUTO-GENERATED -->
```

### Topic files

Each category gets its own file (`workflow.md`, `tooling.md`, `preferences.md`, `pitfalls.md`, `debugging.md`, `repo_conventions.md`) with the full detail for that category. MEMORY.md stays under 200 lines; topic files hold the overflow.

### Playbook (YAML)

The internal knowledge store at `~/.lamarck/projects/<encoded-project>/playbook.yaml`. Contains all bullets with metadata:

```yaml
schema_version: 2
bullets:
  - id: b_abc123
    scope: workspace
    category: pitfalls
    content: "When using claude --json-schema, extract from structured_output field"
    source: learned
    state: active
    maturity: candidate
    helpfulCount: 1
    harmfulCount: 0
    feedbackEvents:
      - type: helpful
        timestamp: "2026-02-10T23:26:00.000Z"
        sessionPath: claude-cli
    createdAt: "2026-02-10T23:26:00.000Z"
    updatedAt: "2026-02-10T23:26:00.000Z"
```

## Invocation modes

The system infers the right mode from context — no configuration needed:

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Bootstrap** | First run (no state file) | Scan last 14 days, pick top sessions by score, set cursor to EOF |
| **Normal** | State exists, small gap | Scan new history lines, process up to 25 queued sessions |
| **Catch-up** | Queue > 50 sessions | Same as normal but budget raised to 50 |
| **Hook** | `--session-id` provided | Process targeted session + 2 more from queue |

## State management

State lives at `~/.lamarck/state.json` (separate from the playbook — operational state vs knowledge content). It tracks:

- **History cursor**: byte offset + inode into `~/.claude/history.jsonl` so only new lines are read
- **Per-project queues**: sessions discovered but not yet processed, with retry counts
- **Per-project stats**: processed/failed/skipped counts

The existing `processed.jsonl` per-project ledger (append-only) serves as the canonical "already learned from this session" truth.

```
~/.lamarck/
├── state.json                              # Global cursor + queues
└── projects/
    ├── -Users-you-dev-my-app/
    │   ├── playbook.yaml                   # Curated knowledge
    │   └── processed.jsonl                 # Session ledger
    └── -Users-you-dev-other-project/
        ├── playbook.yaml
        └── processed.jsonl
```

## Idempotency

Safe to run multiple times on the same sessions:

- `processed.jsonl` prevents re-extracting diaries from already-learned sessions
- Feedback events in `curate.ts` deduplicate by `sessionPath` — reprocessing the same session won't inflate helpful/harmful counts
- Crash recovery: sessions marked `"processing"` in the queue reset to `"queued"` on next run

## Safety

- **Secret redaction**: AWS keys, GitHub PATs, Slack tokens, private keys, database credentials are automatically stripped before LLM reflection
- **File locking**: Atomic `mkdir`-based locks prevent concurrent writes to the same playbook
- **Dry-run**: State is never persisted in dry-run mode
- **Quality gates**: Low-quality deltas (absolute paths, commit hashes, duplicates) are filtered before curation

## Architecture

```
src/
├── cli.ts              CLI entry point (commander)
├── orchestrator.ts     Main pipeline coordinator
├── state.ts            Cursor + queue persistence (Zod schemas)
├── history.ts          History parsing, scoring, incremental scanning
├── session.ts          Session transcript loading + rendering
├── llm.ts              LLM prompts and batch reflection
├── llm-cli.ts          Claude CLI subprocess adapter
├── quality.ts          Delta quality filtering
├── curate.ts           Playbook delta application + conflict detection
├── scoring.ts          Decay calculations + maturity promotion
├── playbook.ts         Playbook YAML I/O
├── export.ts           MEMORY.md + topic file generation
├── sanitize.ts         Secret/credential redaction
├── lock.ts             File-based locking
├── types.ts            Zod schemas for all data structures
├── paths.ts            Claude path resolution
├── reflect.ts          LLM output schema generation
├── utils.ts            Utilities (hashing, tokenization, I/O)
└── config.ts           Configuration schema
```

## Configuration

All configuration has sensible defaults. Override via `loadConfig()` in code or environment:

| Setting | Default | Description |
|---------|---------|-------------|
| `claudeHomeDir` | `~/.claude` | Claude Code home directory |
| `claudeHistoryPath` | `~/.claude/history.jsonl` | Global history file |
| `storeDir` | `~/.lamarck` | Where playbooks and state live |
| `maxMemoryLines` | 200 | Max lines in MEMORY.md |
| `decayHalfLifeDays` | 90 | Feedback confidence half-life |
| `harmfulMultiplier` | 4 | Weight harmful feedback higher |
| `dedupSimilarityThreshold` | 0.85 | Jaccard threshold for dedup |
| `sanitizationEnabled` | true | Redact secrets from transcripts |

## Development

```bash
npm run dev -- --dry-run --verbose       # Run from source
npm run build                             # Build to dist/
npm run typecheck                         # Type-check
npm test                                  # Run tests
npm run test:watch                        # Watch mode
```

## Example: cron job

```bash
# Run every 6 hours
0 */6 * * * npx lamarck >> /tmp/lamarck.log 2>&1
```

## Example: post-conversation hook

Add to your shell profile or Claude Code hooks:

```bash
# After each Claude session, process that session
lamarck --session-id "$SESSION_ID" --project "$PROJECT_PATH"
```

## License

MIT
