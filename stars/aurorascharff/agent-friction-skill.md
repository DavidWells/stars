---
repo: aurorascharff/agent-friction-skill
url: 'https://github.com/aurorascharff/agent-friction-skill'
homepage: 'https://agent-friction-skill.vercel.app'
starredAt: '2026-07-11T16:37:58Z'
createdAt: '2026-05-15T13:18:44Z'
updatedAt: '2026-07-11T16:37:58Z'
language: null
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-11T22:38:08.617Z'
description: >-
  A skill for AI agents to document agentic developer experience friction during
  a development flow.
tags: []
---

# friction-log SKILL

A pair of skills for **AI agents** to document agentic developer experience friction. Same vocabulary, opposite control flow:

- **`friction-log`** (active) — the user explicitly asks for a friction log. The agent does the task, narrates friction as it happens, and writes a markdown file in the workspace.
- **`friction-report`** (passive) — invoked at the end of a dev session. Scans the conversation for friction, drafts a report for human review. No buffer, no per-turn tracking — your conversation history is the source of truth. Silent exit if the session was clean.

## Install

Active skill (`friction-log`):

```bash
npx skills add aurorascharff/agent-friction-skill
```

Passive skill (`friction-report`):

```bash
npx skills add aurorascharff/agent-friction-skill/passive
```

## Active (`friction-log`) — explicit, on demand

### What it does

1. Agent attempts the task the user specifies
2. Logs friction in real time as it's encountered — what was tried, what happened, how it resolved
3. Folds any out-of-band user replies the harness surfaces mid-run (chat-thread messages, queued instructions) into the log as they arrive
4. Produces a structured friction log in markdown

### Example prompt

> Build a Next.js product grid and detail page. Clicking a thumbnail should morph into the detail image using React's <ViewTransition> component. Going back should reverse it. Use this skill: https://github.com/aurorascharff/agent-friction-skill

### Output format

- **Header** — date, model, harness, task description, repo link, output link, cumulative build time
- **Prompt** — the user's initial request verbatim, plus any clarifying exchanges
- **Tool Timeline** — chronological list of every tool call the agent made (terse one-liners); always written
- **Summary** — overall experience, biggest pain point, blast radius
- **Action Items** — split into three subsections:
  - **Docs** — 🔧-prefixed, friction fixable with better documentation, clearer callouts, or updated examples
  - **Framework** — 🔧-prefixed, friction requiring a code change (error messages, warnings, scaffold defaults, tooling)
  - **DX / Research** — 🔍-prefixed, open questions or investigations worth pursuing
- **Log** — chronological, severity-coded with 🟢 🟡 🔴
- **Skill Feedback** — 🔁-prefixed, added after user review; captures places where the skill itself caused the agent to behave incorrectly

### Viewing logs

Paste a finished friction log into **[agent-friction-skill.vercel.app](https://agent-friction-skill.vercel.app/)** to render it in a collapsible, severity-coded layout. Nothing leaves your browser — encoded logs travel as a URL fragment for shareable links. The viewer's source lives under [`agent-friction-skill-visualizer/`](https://github.com/aurorascharff/agent-friction-skill-visualizer).

## Passive (`friction-report`) — end-of-session

### What it does

1. At the end of a dev session, scans the conversation for friction: build failures, doc gaps, SDK surprises, misleading errors, training-data fallbacks
2. If anything was found, POSTs a structured draft to `https://agent-friction-skill.vercel.app/api/draft` and opens the review URL
3. The human reviews and clicks Submit — or closes the tab to discard
4. If the session was clean, exits silently

No buffer, no initialization, no per-turn tracking. The conversation history is the source of truth.

### When it runs

- When the user signals they're done: "done", "thanks", "that's it"
- When the user explicitly asks: "report your friction", "what friction did you hit?"
- When the harness invokes the skill by name

Defers to `friction-log` if that skill was explicitly invoked during the session.

## References

- `SKILL.md` — active `friction-log` skill instructions
- `passive/SKILL.md` — passive `friction-report` skill instructions
- `references/reading-the-log.md` — how a **human** should read the output (severity, action-item priority, source tags)
- `references/agent-behavior.md` — how the **agent** should behave while the active skill is running
- `references/template.md` — friction log output template
- `references/example.md` — real friction log from an actual agent run ([source repo](https://github.com/aurorascharff/fl-view-transition-morph))

