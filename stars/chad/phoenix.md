---
repo: chad/phoenix
url: 'https://github.com/chad/phoenix'
homepage: null
starredAt: '2026-04-28T15:38:43Z'
createdAt: '2026-02-19T15:53:58Z'
updatedAt: '2026-07-03T18:58:17Z'
language: TypeScript
license: NA
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:42.701Z'
description: >-
  Regenerative version control — compile specs to working software with full
  traceability
tags:
  - ai-code-generation
  - code-generation
  - llm
  - specification
  - typescript
  - version-control
---

# Phoenix VCS

**Regenerative version control that compiles intent to working software.**

Phoenix takes a specification written in plain language, extracts structured requirements, and generates a working application — database, API, validation, and UI — with full traceability from every line of spec to every line of generated code.

```
spec/todos.md (40 lines)  →  phoenix bootstrap  →  working app
```

## What it does

Write what you want in a markdown spec:

```markdown
## Tasks

- A task has a title, a priority (urgent, high, normal, low), and an optional due date
- Users can create tasks by providing at least a title
- Users can mark a task as complete or reopen a completed task
- Users can filter tasks by status, project, or priority
- Overdue tasks must be visually highlighted
```

Phoenix compiles this through a pipeline:

```
Spec → Clauses → Canonical Requirements → Implementation Units → Generated Code
```

Each transformation is tracked. Change one line in the spec and Phoenix knows exactly which code needs to regenerate — and which doesn't.

## Quick start

```bash
# Install
git clone https://github.com/chad/phoenix.git
cd phoenix
npm install
npm run build

# Create a project with the sqlite-web-api architecture
mkdir my-app && cd my-app
mkdir spec

# Write your spec
cat > spec/app.md << 'EOF'
# My App

## Items

- An item has a name and a quantity
- Users can create, view, update, and delete items
- Name must not be empty
EOF

# Generate
npx phoenix init --arch=sqlite-web-api
npx phoenix bootstrap

# Run
npm install
npm run dev
# → http://localhost:3000
```

## Architecture targets

Phoenix doesn't just generate code — it compiles to an **architecture**. The architecture target defines the runtime, frameworks, patterns, and conventions. The spec defines *what*, the architecture defines *how*.

The first built-in target is `sqlite-web-api`:
- **HTTP**: [Hono](https://hono.dev)
- **Database**: [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Validation**: [Zod](https://zod.dev)
- **Pattern**: Route modules with shared DB, migration system, Zod schemas

New architectures can be added by creating a single file in `src/architectures/`. The pipeline doesn't change — only the compilation target.

## The pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────┐    ┌───────────┐
│ Spec     │ →  │ Clauses  │ →  │ Canonical    │ →  │ IUs  │ →  │ Generated │
│ (markdown)│    │ (parsed) │    │ Requirements │    │      │    │ Code      │
└──────────┘    └──────────┘    └──────────────┘    └──────┘    └───────────┘
                                                                      │
     ◄──────────── Provenance edges track every transformation ───────┘
```

- **Spec ingestion**: Parses markdown into content-addressed clauses with semantic hashes
- **Canonicalization**: Extracts typed requirements (REQUIREMENT, CONSTRAINT, INVARIANT, DEFINITION, CONTEXT) with confidence scores and relationship edges
- **IU planning**: Groups requirements into Implementation Units with risk tiers, contracts, and boundary policies
- **Code generation**: LLM generates real implementations guided by architecture-specific prompts and few-shot examples, with typecheck-and-retry
- **Selective invalidation**: Change one spec line → only the dependent subtree regenerates

## Visualization

```bash
npx phoenix inspect
```

Opens an interactive pipeline visualizer in your browser. Click the **Spec** tab to see your spec text with hover highlighting — click any line to trace its path through clauses → canonical nodes → IUs → generated files.

## CLI

```bash
phoenix init [--arch=NAME]    # Initialize a project
phoenix bootstrap             # Full pipeline: ingest → canonicalize → plan → generate
phoenix ingest [--verbose]    # Ingest spec changes (shows diff before applying)
phoenix diff                  # Show clause-level diffs
phoenix canonicalize          # Extract canonical requirements
phoenix regen [--iu=ID]       # Regenerate code (all or specific IU)
phoenix status                # Trust dashboard
phoenix inspect               # Interactive pipeline visualization
```

## Examples

### [todo-app](examples/todo-app/)

A Todoist-style task manager generated from a [user-centric spec](examples/todo-app/spec/todos.md). Features:
- Tasks with priorities, due dates, projects, completion tracking
- Projects with colors and active task counts
- Filtering by status, priority, and project
- Stats summary with completion percentage
- Full web UI with sidebar, forms, filters
- REST API for integration with external tools

All generated from ~40 lines of behavioral requirements.

### [phoenix-self](examples/phoenix-self/)

Phoenix specifying itself. The [PRD](PRD.md) decomposed into 6 specs covering ingestion, canonicalization, implementation, integrity, operations, and platform. Used to stress-test the canonicalization pipeline on real-world complexity.

### Other examples

- [settle-up](examples/settle-up/) — Expense splitting with debt simplification
- [pixel-wars](examples/pixel-wars/) — Real-time multiplayer territory game
- [tictactoe](examples/tictactoe/) — Multiplayer game with matchmaking
- [taskflow](examples/taskflow/) — Task management with analytics

## How it works under the hood

### Canonicalization

Every spec sentence is scored against 5 canonical types using a keyword rubric with configurable weights. The resolution engine deduplicates nodes via token Jaccard similarity, infers typed edges (constrains, refines, defines, invariant_of), and builds a hierarchical graph. The pipeline was optimized through 32 automated experiments (autoresearch-style) across 18 gold-standard specs.

### Code generation

The LLM receives a structured prompt with:
1. Canonical requirements, constraints, invariants, and definitions for the IU
2. Architecture-specific system prompt (import rules, patterns, conventions)
3. Few-shot code examples showing the exact patterns to follow
4. Related context from other spec sections
5. Sibling module mount paths (so the web UI knows where the API lives)

If generation fails or doesn't typecheck, the system retries with error feedback. If that fails, it falls back to architecture-aware stubs that still produce valid, mountable modules.

### Drift detection

Phoenix tracks a manifest of every generated file's content hash. `phoenix status` compares the working tree against the manifest and flags any unlabeled manual edits. This is how Phoenix knows if you've modified generated code and need to either promote the change to a spec requirement or add a waiver.

## Status

Alpha. The core pipeline works end-to-end — spec to working app with full traceability. The `sqlite-web-api` architecture target generates functional CRUD APIs with web UIs from behavioral specs.

What's next:
- More architecture targets (Express + Postgres, Cloudflare Workers + D1, CLI apps)
- Smarter IU planner (merge cross-cutting concerns into parent resources)
- Selective regeneration from spec edits (the pipeline supports it, the UX needs work)
- Test generation and evidence collection
- Multi-file spec projects with cross-references

## License

MIT
