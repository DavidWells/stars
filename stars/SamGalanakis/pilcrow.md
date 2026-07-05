---
repo: SamGalanakis/pilcrow
url: 'https://github.com/SamGalanakis/pilcrow'
homepage: 'https://pilcrow.ink/'
starredAt: '2026-05-15T16:53:08Z'
createdAt: '2026-05-14T11:51:34Z'
updatedAt: '2026-06-25T00:22:56Z'
language: JavaScript
license: MIT
branch: main
stars: 47
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:41.796Z'
description: A skill suite for writing
tags: []
---

# pilcrow ¶

**pilcrow** turns the LLM in your AI harness into the editor it should be. A prose linter and harness skill anchored in classical style guides (Strunk, Williams, Zinsser, Pinker, Orwell, King): mechanical checks for what regex catches, LLM-judged ones for what it can't. Docs and catalog: [pilcrow.ink](https://pilcrow.ink).

Catches AI tells as one feature among many. Works for prose you wrote, prose the model wrote, and everything in between.

Inspired by [impeccable.style](https://impeccable.style/): same idea, applied to writing. Detection-only. Findings carry line, column, excerpt, and an optional suggestion. The engine never edits.

**Bare invocation triages.** Run `/pilcrow` with no arguments. The skill finds the prose in scope, runs lint, identifies the genre, and proposes an ordered sequence of editor commands tuned to the piece. The plan gates on confirmation.

Every editor command applies three meta-disciplines: a reflex-rewrite catalog, a proposal ritual that surfaces and rejects LLM defaults, and a slop self-test on the editor's own output.

The full rule catalog lists 50 deterministic and 22 LLM-judged base rules at [pilcrow.ink/rules.html](https://pilcrow.ink/rules.html). Per-genre extras add 76 more LLM rules across 39 leaves at [pilcrow.ink/genres.html](https://pilcrow.ink/genres.html).

## Install

Global, recommended:

```
npm install -g pilcrow-ink
```

The package on npm is `pilcrow-ink`; the binary it installs is `pilcrow`.

Or per-project without installing:

```
npx pilcrow-ink audit drafts/
```

Add the skill to your AI harness (Claude Code, Cursor, Gemini CLI, Codex/Agents, OpenCode, Kiro, Pi, Qoder, Trae, GitHub Copilot):

```
cd your-project
pilcrow skills install            # auto-detects which harness dirs exist
pilcrow skills install --all      # install into every supported provider
pilcrow skills update             # re-sync after `npm update -g pilcrow-ink`
pilcrow skills check              # show installed version + content-hash status
pilcrow skills cleanup            # remove pilcrow installs under deprecated names
```

`install` and `update` use a content hash, not just the version string, so they detect a copy that's already on the current version but was edited locally. Modified installs are skipped with a notice; pass `--force` to overwrite. `cleanup` removes orphan skill folders left behind when pilcrow renames a sub-skill (verifies each is pilcrow-owned before deleting).

### Without the npm package

The skill is committed at `skills/pilcrow/`, so you can pull it straight from GitHub without installing `pilcrow-ink` first:

```
npx skills add SamGalanakis/pilcrow          # via skills.sh (skills.sh/SamGalanakis/pilcrow)
```

Or add it as a Claude Code plugin marketplace:

```
/plugin marketplace add SamGalanakis/pilcrow
/plugin install pilcrow@pilcrow
```

Both routes copy the skill as-is. The deterministic linter still needs the `pilcrow` binary on PATH (`npm i -g pilcrow-ink` or `npx pilcrow-ink`); without it the interpretive lenses fall back to manual reads. The Cowork zip below bundles the binary.

### Claude Cowork

Cowork installs plugins from a zip, not from npm. Every [release](https://github.com/SamGalanakis/pilcrow/releases/latest) ships a `pilcrow-cowork.zip` asset. Download it, then in Cowork: Customize : Plugins : Install : upload the zip. Invoke with `/pilcrow audit`, `/pilcrow polish`, and the rest.

The zip bundles the compiled CLI (it has no npm dependencies), so the 50-rule deterministic linter runs inside Cowork's sandbox; only `node` need be present. To build the zip yourself: `npm run build:cowork` writes it to `dist/pilcrow-cowork.zip`.

## CLI

Five engine commands:

```
pilcrow audit [paths...] [--ignore-quoted]   Human-readable findings (default)
pilcrow lint  [paths...] [--ignore-quoted]   JSON output for LLM consumption
pilcrow critique [path] [--genre slug]       Print the LLM-critique prompt
pilcrow rules [--json]                       List all rules
pilcrow skills <subcommand>                  Install or update the skill in your AI harness
```

Reads stdin if no paths. Recurses directories, scanning `.md`, `.mdx`, `.markdown`, `.txt`, `.html`, `.htm`.

HTML support strips `<script>`, `<style>`, `<pre>`, and `<code>` content; decodes common entities; treats closing block tags as sentence breaks. Pass `--ignore-quoted` to skip phrases inside straight or curly double quotes; useful when prose discusses AI tells without quoting them in backticks.

## Editor commands

Editor commands sit on top of the engine. Each loads its own reference file with a methodology drawn from a classical style guide. They're invoked through the skill, not the CLI binary: `/pilcrow <command> <target>` in any AI harness with the skill installed.

| Command | Anchor | What it does |
|---|---|---|
| `polish` | Strunk & White, Zinsser | Final pre-ship pass; triages findings into ship-blockers, worth-fixing, taste-calls |
| `humanize` | Wikipedia *Signs of AI writing* | Strip AI tells while preserving voice; classifies findings into vocabulary, cadence, template, fossil |
| `tighten` | Williams *Style* | Cut zombie nouns and weak verbs; per-sentence rewrites with the buried action surfaced |
| `clarify` | Pinker *Sense of Style*, Orwell | Reduce reader's working-memory load; per-passage rewrites with mental-model commentary |
| `pace` | King *On Writing*, Strunk | Restore rhythm; cadence histogram plus split/merge proposals |
| `lead` | Zinsser on leads | Sharpen openings; finds the buried lede, proposes three alternative first sentences |
| `verify` | journalism fact-check tradition | Surface load-bearing claims; classify each as unsupported / vague / hedged / unchecked |
| `aloud` | aural reading tradition | Play the prose back via OpenAI TTS in an interactive session; gates on writer response |
| `argue` | Toulmin / IBIS / Argdown | Map the argument structure; surface supports, objections, and load-bearing unstated premises; generate the strongest counter and check coverage |

An editor command is not a rule filter. Each defines its own procedure, rubric, and output. See `skills/pilcrow/reference/<command>.md` for the playbooks.

## Project commands

Project commands act on the repo, not on a single passage. They capture the writer's voice so editor proposals sound like the writer.

| Command | What it does |
|---|---|
| `document` | Scan existing prose. Find recurring moves: phrases, cadences, punctuation tics. Draft `VOICE.md` with citations and open questions |
| `teach` | Interview the writer. Refine an existing `VOICE.md` by answering open questions, confirming Signatures, and editing Taboos; or create one from scratch |
| `craft` | End-to-end essay writing with gates: shape → draft → critique → polish; respects `VOICE.md` |

Each writes to disk only after explicit confirmation. Once `VOICE.md` exists, every editor command reads it on invocation and weights findings accordingly.

`teach` captures four axes for editor commands:

- **genre**: a slug from the taxonomy. Common ones: `essay`, `tutorial`, `readme`, `postmortem`, `cv`, `fiction`. Full tree at [pilcrow.ink/genres.html](https://pilcrow.ink/genres.html).
- **audience**: a concrete reader, optionally one of the built-in personas
- **stance**: `claim` / `explain` / `persuade` / `narrate`
- **method**: `outliner` / `discovery` / `iterative` / `model-drafter`

`craft` reads `method:` and runs one of four phase-2 variants: outline-first for outliners, free first pass for discovery, paragraph-gated for iterative, rewrite-the-model for model-drafter.

Each genre leaf adds 1–2 LLM lint targets specific to that genre (e.g., `postmortem-counterfactual` flags `should have` / `could have` framing; `cv-vague-impact` flags `drove growth` without a number; `error-message-blame-user` flags `You entered an invalid X`). Pass `--genre <slug>` to `critique` and the prompt merges the base 22 rules with the active leaf's additions, walking the parent chain.

## Cross-cutting references

The skill's `reference/` folder contains underscore-prefixed files loaded by multiple commands:

| File | Content |
|---|---|
| `_ai-tell-catalog.md` | Exhaustive AI-tell catalog organized by class (vocabulary, cadence, template, fossil) |
| `_readers.md` | Reader personas (skeptical engineer, busy executive, casual blog reader, fellow expert, undergraduate) |
| `_cadence-theory.md` | King and Strunk on rhythm: sentence-length variation, fragment use, parallel triplets in moderation |
| `_genres.md` | Genre taxonomy: 12 families, parent rules, path inference |
| `genres/<slug>.md` | Per-leaf Demands / Forbids / Tolerates / AI tells / LLM lint additions (one file per leaf, ≤ 50 lines) |

Universal writing laws, the editor reflex catalog, the proposal ritual, and the editor slop test are inlined in the parent `SKILL.md`; they apply to every command without an explicit load. The four files above carry content the command references load explicitly when they need it.

## Pin / unpin

Turn `/pilcrow polish` into `/polish` (and back) for commands you repeat on every piece:

```
node skills/pilcrow/scripts/pin.mjs pin polish
node skills/pilcrow/scripts/pin.mjs unpin polish
```

The script writes a redirect skill into every harness directory where pilcrow is installed. Pinned shortcuts carry a marker comment, so `unpin` only deletes shortcuts it created, never user-owned skills with the same name.

## aloud and TTS

`aloud` plays prose back to you via OpenAI TTS in an interactive session: walkthrough, full read, targeted (only the paragraphs `pace` flagged), or compare two passages. It depends on the [OpenAI speech skill](https://github.com/openai/skills/tree/main/skills/.curated/speech) (Apache 2.0).

Set up:

```
export OPENAI_API_KEY=...
# python3 + the openai package (install once)
python3 -m pip install openai
```

The lens auto-resolves the speech skill. If it's installed in your harness (`.claude/skills/speech/`, `.cursor/skills/speech/`, etc.) it uses that; otherwise it fetches a pinned snapshot into `/tmp/pilcrow/skills/speech/`.

Audio is cached in `/tmp/pilcrow/aloud/<sha256>.mp3`. Replays across sessions are free. A 14-day mtime GC sweep runs on every `aloud` invocation. Per-piece voice and speed live in `VOICE.md` (`aloud-voice:`, `aloud-speed:`, `default-aloud-mode:`).

## Rules

**50 deterministic** (regex + fuzzy stem matching, no LLM):

| Group | Rules |
|---|---|
| AI phrasebank | `ai-tell-phrasebank`, `overused-words`, `antithesis-cadence`, `throat-clearing-openers`, `cliche-closers`, `meta-discourse`, `copula-dodge` |
| AI fossils | `signoff-chatbot`, `sycophant-opener`, `disclaimer-tail`, `citation-artifact`, `placeholder-leak` |
| Phrase | `corporate-cliche`, `cliche-list`, `wordy-phrases`, `redundant-pairs`, `weasel-hedges`, `vague-quantifiers` |
| Density | `em-dash-density`, `adverb-density`, `nominalization-density`, `boosters`, `passive-voice`, `pronoun-density-low`, `parenthetical-aside-density`, `inline-bold-emphasis` |
| Cadence | `sentence-length-monotony`, `sentence-too-long`, `paragraph-monotony`, `parallel-triplet-density`, `transition-stacking`, `repeated-words-window`, `noun-stacking`, `anaphora-cadence`, `fragment-cadence`, `hero-tagline-imperative`, `from-x-to-y`, `present-participle-tail` |
| Consistency | `dash-style-inconsistency`, `quote-style-inconsistency`, `oxford-comma-inconsistency` |
| Weak constructions | `there-is-there-are`, `expletives`, `negation-of-negation`, `pronoun-it-vague` |
| Markdown shape | `bullet-bold-lead`, `title-case-headers`, `colon-headline`, `decorative-emoji`, `false-precision-headline` |

**22 LLM-judged base rules** (surfaced as a prompt the model evaluates):
`buried-lede`, `voice-consistency`, `mixed-metaphor`, `claim-without-support`, `missing-stakes`, `distinctive-vs-generic`, `abstract-without-concrete`, `showing-vs-telling`, `transition-coherence`, `register-mismatch`, `excessive-balance`, `redundant-thesis`, `marketing-template-cadence`, `sycophantic-tone`, `stakes-inflation`, `false-reframe`, `invented-concept-label`, `listicle-disguise`, `one-point-dilution`, `unsupported-claim`, `feature-tally`, `instruction-as-copy`.

**76 genre-specific LLM rules** across 39 leaves, merged into the prompt when `critique --genre <slug>` is set. Browse the full taxonomy at [pilcrow.ink/genres.html](https://pilcrow.ink/genres.html).

Deterministic rules cover patterns regex can pin down with low false positives. LLM rules cover semantic and rhetorical judgments: was the move empty, were the stakes inflated, is the passage a list pretending to be prose. Genre rules cover patterns that fire usefully only in one context; `postmortem-counterfactual` is meaningless in fiction, and `cv-vague-impact` would over-fire in an essay.

## Fuzzy matching

Phrase rules tokenize and stem before comparing, so `delve` / `delves` / `delving` / `delved` all match one phrase entry. One inserted word is allowed between phrase tokens (`delve deeply into` matches `delve into`). Apostrophes are stripped (`Let's` matches `lets`).

## Layout

```
engine/         the rules engine: 50 deterministic + 22 LLM base rules + per-genre extras (generated)
cli/            the pilcrow binary and the skills subcommand
skills/pilcrow/ the skill, shipped verbatim — what skills.sh, the plugin, and `pilcrow skills install` all copy
docs/           the GitHub Pages site
```

## Develop

```
npm install
npm run build
npm test
node cli/dist/index.js audit README.md
```

## Release

Trunk-based. Everything ships from `main`. To cut a release:

```
npm run release -- --bump patch --dry-run    # rehearse
npm run release -- --bump patch              # bump + tag + GitHub release
npm publish                                  # separate, manual
```

The script bumps `package.json`, syncs `skills/pilcrow/SKILL.md` and `docs/index.html`, commits, pushes, tags `v<version>`, and creates a GitHub release with auto-extracted commit notes. The Pages workflow redeploys `pilcrow.ink` from the bump commit. `npm publish` stays manual so npm credentials never leave your machine.

Use `--bump major|minor|patch` to bump in one step, or omit `--bump` if you already edited the version yourself.

## License

MIT. See [LICENSE](./LICENSE).
