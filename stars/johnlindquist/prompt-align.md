---
repo: johnlindquist/prompt-align
url: 'https://github.com/johnlindquist/prompt-align'
homepage: null
starredAt: '2026-08-09T02:12:48Z'
createdAt: '2026-08-01T19:43:19Z'
updatedAt: '2026-08-09T02:12:49Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-08-15T22:33:23.163Z'
description: >-
  Keyboard-centric brief editor for human-AI alignment: ghost suggestions, //
  comment steering via local AI CLIs, JSON in / JSON out
tags: []
---

# prompt-align

A keyboard-centric brief editor for aligning humans and AI agents — the
**Comment Driver**: your brief looks like a source file, ghost suggestions sit
under the focused line like dim code, and you steer the AI by typing a
`// comment` directly in the text.

An agent (or script) POSTs a **job** (a brief split into sentence slots with
alternatives), a human refines it in the browser, and the **result** persists
as JSON for the agent to consume. JSON in, JSON out — the UI never has to be
rebuilt.

```
┌─ brief.prompt ──────────────────────────────── ● live ─┐
│ 1  Add an Export CSV button to the reports toolbar…    │
│    WHAT · OPT 1/3                                      │
│ ·  1 ⇢ Add a right-click 'Export selection' action…    │
│ ·  2 ⇢ Add a shareable /export URL that mirrors…       │
│ ·  // type an instruction and press ↵ to steer the AI  │
│ 2  Cover the obvious edge cases — nothing more.        │
└────────────────────────────────────────────────────────┘
  ↑↓ move · 1-3 take ghost · type = edit · ⌘G more · // ↵ steer · ⌘↵ send
```

## Requirements

- [Bun](https://bun.sh)
- Optional, for real AI generation: the [`claude`](https://claude.com/claude-code)
  and/or [`codex`](https://github.com/openai/codex) CLIs installed **and
  authenticated with your own account**. Without them, a `demo` engine returns
  canned suggestions so the UI still works.

prompt-align never reads, stores, or transmits API keys. Generation shells out
to CLIs on your machine, using whatever auth those CLIs already have.

## Quickstart

```bash
git clone https://github.com/johnlindquist/prompt-align
cd prompt-align

bun src/server.ts serve                 # prints URL + data dir; token in ~/.prompt-align/token
bun src/server.ts push examples/job.json    # prints a tokenized URL — open it, edit, ⌘↵
bun src/server.ts wait csv-export-demo      # blocks until the human submits, prints result JSON
```

`serve` binds `127.0.0.1` only. Every other endpoint requires the token
(`?t=…`), which lives at `<data-dir>/token` (chmod 600, never in the repo).

## The job (JSON in)

```jsonc
{
  "jobId": "csv-export-demo",          // optional slug; generated if missing
  "title": "Align: add CSV export",
  "seed": "One-sentence summary shown above the editor",   // optional
  "context": "Background the human may want. Shown collapsed.", // optional
  "slots": [                            // 1-12 sentence slots
    {
      "key": "what",                    // slug, unique
      "name": "WHAT",                   // ≤24 chars, shown under the line
      "detail": "optional hint",
      "alternatives": [                 // 1-9, first is the default
        "Add an Export CSV button to the reports toolbar…",
        "Add a right-click 'Export selection' action…"
      ]
    }
  ]
}
```

## The result (JSON out)

Written to `<data-dir>/jobs/<jobId>/result.json` on submit:

```jsonc
{
  "jobId": "csv-export-demo",
  "submittedAt": "…",
  "brief": "the assembled sentences, joined",
  "sentences": [
    {
      "key": "what", "name": "WHAT",
      "text": "Add a right-click 'Export selection' action…",
      "source": "alternative",          // default | alternative | generated | edited
      "pickedIndex": 1,                 // null when edited by hand
      "steeringUsed": ["make it stricter"]  // instructions sent for this slot
    }
  ],
  "generated": { "what": ["every AI-generated alternative, kept for audit"] },
  "history": [ { "at": "…", "type": "pick|generate", "…": "…" } ]
}
```

`submit` refuses to overwrite an existing result (409) unless `?replace=1`.

## HTTP API

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/health` | none | liveness + detected engines |
| `POST /api/jobs` | token | validate + store a job, returns tokenized page URL |
| `GET /j/:jobId` | token | the editor page |
| `GET /api/jobs/:jobId` | token | job JSON |
| `POST /api/generate` | token | `{engine, instruction, slotName, brief, current, n}` → `{alternatives, ms}` |
| `POST /api/jobs/:jobId/submit` | token | persist the result |
| `GET /api/jobs/:jobId/result` | token | read the result (404 until submitted) |

## Engines

Detected at startup:

- `claude` — `claude -p --model haiku` (fast; uses your Claude Code login)
- `xo` — `claude -p` plus your own system-prompt file; enable with
  `PROMPT_ALIGN_XO_INSTRUCTIONS=/path/to/instructions.md`
- `codex` — `codex exec` (uses your Codex login)
- `demo` — canned output, always available, no AI

### Conversation grounding (optional)

When generating, the server looks for the newest Claude Code transcript for
the project (`~/.claude*/projects/<cwd-slug>/*.jsonl`, read-only) and includes
the last few messages in the prompt so suggestions match what you were just
talking about. Point it elsewhere with `serve --project-dir DIR`, or disable
entirely with `PROMPT_ALIGN_NO_TRANSCRIPT=1`. Transcript text goes only into
prompts for your **local** CLIs — never anywhere else.

## The bundled `/align` skill

This repo ships an agent skill — [`skills/align/SKILL.md`](skills/align/SKILL.md) —
that turns any task prompt into a prompt-align brief: the agent inspects your
repo, phrases the genuine decisions (reading, scope, done-means, cadence) as
editable sentences, waits for your saved brief, then implements from it.

Install it with the [`skills`](https://www.npmjs.com/package/skills) CLI:

```bash
npx skills add johnlindquist/prompt-align --skill align -g   # user-level
npx skills add johnlindquist/prompt-align --skill align      # project-level
```

Or manually — a skill is just a directory:

```bash
git clone https://github.com/johnlindquist/prompt-align
cp -r prompt-align/skills/align ~/.claude/skills/align   # or your agent's skills dir
```

Then in your agent: `/align add CSV export to the reports page`.

## Using it from any agent or script

```bash
bun src/server.ts serve --port auto             # once, kept alive (tmux etc.)
bun src/server.ts push my-job.json              # → { jobId, url }
open "<url>"                                    # hand the URL to the human
bun src/server.ts wait <jobId> --timeout 4h     # blocks; prints result JSON
```

The `wait` command exits 0 with the result on stdout the moment the human hits
send — ideal as a background task that re-invokes your agent.

## Development

```bash
bun test        # 24 tests: validation, auth, round-trip, edge cases
```

## Security notes & limits

- Server binds loopback only; no remote exposure. Every non-health route needs
  the token (constant-time compared).
- All state (jobs, results, token) lives in the data dir (default
  `~/.prompt-align`), which is never part of this repo.
- Engine CLIs run with your local user and their own credentials; prompt-align
  passes prompts on argv (always prefixed with a fixed sentence, so
  user-controlled text can never be flag-injected) and reads stdout, nothing more.
- Hardened limits, all chaos-tested (`test/chaos.test.ts`):
  - request bodies capped at 256 KB (413 beyond);
  - result submits are atomic — concurrent first-submits race safely, exactly
    one wins (409 for the rest; `?replace=1` after a confirm in the UI);
  - submitted results can never spoof `jobId`/`submittedAt`; sentence shapes
    validated;
  - concurrent generations capped (`PROMPT_ALIGN_MAX_CONCURRENT`, default 3 →
    429 when saturated); total jobs capped (`PROMPT_ALIGN_MAX_JOBS`, default
    500 → 429);
  - transcripts larger than 512 KB are tail-read, never loaded whole;
  - the CLI reports dead/unreachable servers with clear errors (no stack
    traces), and `wait` survives server restarts by re-reading `server.json`
    each poll;
  - the UI discards corrupted/stale localStorage drafts instead of crashing.

## Provenance

This design won a tournament: ~40 ranking interfaces, then 9 brief-editor
concepts, then 7 keyboard grammars — each round decomposed, weighted, and
blended with the very mechanic that became this app. MIT licensed.
