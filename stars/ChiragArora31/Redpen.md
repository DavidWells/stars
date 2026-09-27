---
repo: ChiragArora31/Redpen
url: 'https://github.com/ChiragArora31/Redpen'
homepage: ''
starredAt: '2026-09-22T01:53:02Z'
createdAt: '2026-09-12T12:08:48Z'
updatedAt: '2026-09-24T07:55:02Z'
language: TypeScript
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-09-27T00:42:24.674Z'
description: Redpen makes coding agents prove they are actually done.
tags:
  - agent-harness
  - agentic-ai
  - ai-agents
  - ai-coding
  - cli
  - codex
  - coding-agents
  - developer-tools
  - testing
  - verification
---

<h1 align="center">
  <img src="https://raw.githubusercontent.com/ChiragArora31/Redpen/main/docs/redpen.svg" width="330" alt="Redpen" />
</h1>

<p align="center"><strong>“Done” is a claim. Evidence makes it true.</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/redpen-cli"><img src="https://img.shields.io/npm/v/redpen-cli?style=flat-square&color=cf222e" alt="npm version" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-1f2328?style=flat-square" alt="MIT license" /></a>
</p>

Your coding agent says:

```text
Done.
Fixed the bug.
Added regression coverage.
Everything passes.
No breaking changes.
```

Redpen checks the work.

```text
REDPEN

TASK
Fix pagination when cursor is null

DEFINITION OF DONE
────────────────────────────────

✓ Implementation changed
  2 files changed · +6 -2

✓ Regression coverage
  tests/pagination.test.mjs

✓ Tests pass
  npm run test · exit 0

✓ Build passes
  npm run build · exit 0

AGENT CLAIMS
────────────────────────────────

✓ "Updated src/pagination.mjs."
  src/pagination.mjs · +2 -2

✓ "Added regression coverage."
  tests/pagination.test.mjs

✓ "All tests pass."
  npm run test · exit 0

✓ "Build succeeds."
  npm run build · exit 0

? "No breaking changes."
  No deterministic verifier is available. Redpen doesn't guess.

────────────────────────────────
8 proven · 0 failed · 1 unverified

DONE

Definition of Done is proven.

1 additional claim remains unverified.
They may be correct. Redpen just can't prove them yet.
```

## Try it

Requires Node.js 18 or newer and Git.

```bash
npm install -g redpen-cli

redpen start "Fix pagination when cursor is null"

# work normally with Codex

redpen import codex
redpen check
```

No global install:

```bash
npx redpen-cli --help
```

## Why Redpen?

Coding agents rarely end with “I have no idea whether this works.”

They end with “Done.”

That one word can hide several claims: code changed, regression coverage was added, tests pass, the project builds, callers were not broken. Some of those claims are easy to prove. Some need a human. Redpen separates the two.

The agent's completion message is input—not truth.

## Three answers

Redpen does not turn uncertainty into a green checkmark.

- `PROVEN` — concrete evidence supports the claim.
- `FAILED` — an applicable check produced contrary evidence.
- `UNVERIFIED` — Redpen cannot prove or disprove it.

The third answer matters. `UNVERIFIED` does not mean a claim is false. It means Redpen does not have deterministic evidence capable of proving it.

The Definition of Done is the task contract. An extra unverified agent claim stays visible but does not expand that contract or block `DONE`; a claim contradicted by evidence does block it.

## What Redpen verifies today

- implementation changes since the task began
- added or changed test files
- Node.js test and build scripts
- Python tests through project metadata
- direct file-change claims
- claims imported from Codex or entered manually

Tests and builds run independently. A transcript saying “tests pass” is never accepted as proof that tests pass.

Redpen does not prove semantic correctness, API compatibility, or the absence of breaking changes. Those claims stay visible and unverified unless a deterministic verifier exists.

## This is not CI

CI asks:

> Did the checks we configured pass?

Redpen asks:

> What did this task require? What did the agent claim? What evidence supports each claim?

```text
Task
  ↓
Definition of Done
  ↓
Agent work and completion claims
  ↓
Independent repository evidence
  ↓
PROVEN · FAILED · UNVERIFIED
```

Redpen complements CI. It connects checks to a specific task and the claims made about it.

## How it works

`redpen start` records the task, current commit, and relevant Git working-tree state. This prevents work that existed before the task from being credited to the agent.

`redpen import codex` finds a completed local Codex session using session ID, repository path, and time. It stores the final message as untrusted claims. Ambiguous matches are refused rather than guessed.

`redpen check` collects fresh Git evidence and runs applicable tests and builds. Results are shown in the terminal and written to the versioned `.redpen/report.json` artifact.

```bash
redpen import codex --session <id>          # choose an ambiguous match
redpen import codex --file <session.jsonl>  # explicit fallback
redpen import codex --dry-run               # preview without writing
redpen claims "Added tests. Tests pass."    # manual claim input
redpen check --verbose --timeout 120        # detailed evidence
redpen status                               # never reruns checks
redpen reset --yes                          # clears state, not repo files
```

Exit code `0` means done, `1` means not done, and `2` means Redpen could not complete the check. `redpen check --json` also prints the machine-readable report.

## Current limits

| Capability | Status |
| --- | --- |
| Codex local session import | Supported |
| Manual claims for other agents | Supported |
| Node.js test and build discovery | Supported |
| Python test discovery | Supported |
| Claude Code and Cursor adapters | Not yet supported |
| Semantic correctness judging | Not supported |

Codex's local JSONL format is not a stable public API. Its assumptions are isolated behind an adapter, and `--file` remains the explicit fallback. Logged transcript commands are never executed or trusted as evidence.

`.redpen/session.json` and `.redpen/report.json` are ephemeral and should be ignored by Git. Reports redact repository, home, and transcript paths, but project command output can still contain sensitive data. Inspect reports before sharing them.

## Roadmap

- Claude Code and additional agent adapters
- custom project verifiers
- coverage and API-compatibility evidence
- more language and build ecosystems
- lightweight pull-request checks

No dates. Evidence first.

## Contributing

Want Redpen to understand another coding agent? Adapters live in [`src/agents`](./src/agents).

Want it to verify another kind of claim? Verifiers live in [`src/verifiers`](./src/verifiers).

Start with [CONTRIBUTING.md](./CONTRIBUTING.md). Security and trust-boundary details are in [SECURITY.md](./SECURITY.md).

For a disposable real-repository demonstration, run `npm run demo`. The exact recording sequence is in [docs/demo.md](./docs/demo.md).

MIT licensed.
