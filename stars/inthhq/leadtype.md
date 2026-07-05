---
repo: inthhq/leadtype
url: 'https://github.com/inthhq/leadtype'
homepage: 'https://leadtype.dev'
starredAt: '2026-07-02T21:01:26Z'
createdAt: '2026-04-17T09:21:11Z'
updatedAt: '2026-07-02T21:01:27Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:39.727Z'
description: Unified docs pipeline for humans & agents.
tags:
  - agents
  - ai
  - docs
  - llms-txt
  - typescript
---

# leadtype

A docs pipeline. Write MDX once. Get a website for humans, an `llms.txt` for HTTP agents, an `AGENTS.md`-fronted bundle for offline coding agents, and a static search index — all from a single source.

```mermaid
flowchart LR
  src["docs/*.mdx"]
  site_run["leadtype generate"]
  bundle_run["leadtype generate --bundle"]
  site_out["public/<br/>llms.txt · llms-full.txt<br/>docs/*.md · search-index.json"]
  bundle_out["packages/&lt;name&gt;/<br/>AGENTS.md · docs/*.md"]
  humans["humans (browser)"]
  http_agents["HTTP agents<br/>(/llms.txt or<br/>Accept: text/markdown)"]
  search["search UI · AI answers"]
  offline_agents["coding agents<br/>(Claude Code, Codex, Cursor,<br/>Copilot…) read<br/>node_modules/&lt;pkg&gt;/AGENTS.md"]
  src --> site_run
  src --> bundle_run
  site_run --> site_out
  bundle_run --> bundle_out
  site_out --> humans
  site_out --> http_agents
  site_out --> search
  bundle_out --> offline_agents
```

leadtype is **not a docs website framework**. Bring your own host and UI — a custom app, Next.js, TanStack Start, Astro, Nuxt, SvelteKit, Fumadocs, Vue, Svelte, anything — and let leadtype handle conversion, validation, search, and the agent-facing outputs it specializes in. Use it to power a custom docs app or layer it under a framework like Fumadocs or Starlight.

## Choose your path

- **[Build a docs site](https://leadtype.dev/docs/pipeline/build-a-docs-site)** — wire leadtype into your build to convert MDX, index search, and serve markdown to agents.
- **[Bundle docs into your package](https://leadtype.dev/docs/package-docs/bundle)** — ship `AGENTS.md` plus topic markdown inside the npm tarball so consumers can point agents at version-matched docs in `node_modules/<your-package>/`. Agents that install your package then spend **32–54% fewer tokens** and **stop confidently guessing wrong** about your API — the win is biggest for the small, cheap models most agents run, with a smaller accuracy bump for frontier models ([evals](./FINDINGS.md)).

## Install

```bash
# npm
npm install leadtype
# pnpm
pnpm add leadtype
# bun
bun add leadtype
```

## 30-second example

The fastest start in an existing app — scaffolds the docs source, route, config, and a first artifact set. The framework is auto-detected from `package.json`; pass `--framework` to be explicit:

```bash
npx leadtype init                    # auto-detect, or:
npx leadtype init --framework next   # next · astro · nuxt · sveltekit
```

Or wire the pipeline by hand. For a hosted docs site:

```bash
npx leadtype generate --src . --out public --base-url https://leadtype.dev
```

For an npm-bundled doc set:

```bash
npx leadtype generate --bundle --src . --out packages/acme
```

The first produces `public/llms.txt`, `public/llms-full.txt`, `public/docs/search-index.json`, and `public/docs/*.md`. The second produces `packages/acme/AGENTS.md` and `packages/acme/docs/*.md` with relative links that still work after npm install.

**Bundling is two steps, and the second is the one that matters.** Shipping `AGENTS.md` only pays off if consuming projects point their agent at it — left to discover it on their own, agents read the bundle only ~29% of the time; with a root-`AGENTS.md` pointer it's ~90–100% ([evals](./FINDINGS.md)). So tell consumers to add this to their own root `AGENTS.md`:

```md
When working with the `acme` library, read the bundled docs in
`node_modules/acme/AGENTS.md` first — they're version-matched to the
installed package and stay accurate as it updates.
```

`leadtype generate --bundle` prints this snippet, filled in with your package name, on success.

## Documentation

Full docs at [leadtype.dev](https://leadtype.dev/docs):

- [Quickstart](https://leadtype.dev/docs/quickstart)
- [How it works](https://leadtype.dev/docs/how-it-works)
- [Build a docs site](https://leadtype.dev/docs/pipeline/build-a-docs-site)
- [Bundle docs into your package](https://leadtype.dev/docs/package-docs/bundle)
- [Add search](https://leadtype.dev/docs/search/add-search)
- [Frontmatter](https://leadtype.dev/docs/writing/frontmatter)
- [CLI reference](https://leadtype.dev/docs/reference/cli)
- [Architecture](https://leadtype.dev/docs/concepts/architecture) — core package boundary and framework adapter rules
- [Methodology](https://leadtype.dev/docs/concepts/methodology) — how leadtype differs from Fumadocs, Starlight, and Mintlify

## Repo layout

- `packages/leadtype/` — the npm package (CLI + library entry points).
- `apps/tanstack/` — production docs site and reference template, on TanStack Start.
- `docs/` — the source MDX rendered by both this site and the package's bundled docs.

## Local workflow

```bash
bun install
bun run dev          # build the package, run the pipeline, start the TanStack app
```

Pipeline checks:

```bash
bun run --filter tanstack pipeline:build
bun run --filter tanstack pipeline:test
bun run --filter tanstack test:e2e
```

## License

MIT.
