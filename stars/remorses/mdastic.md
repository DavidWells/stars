---
repo: remorses/mdastic
url: 'https://github.com/remorses/mdastic'
homepage: null
starredAt: '2026-10-14T17:22:58Z'
createdAt: '2026-10-14T16:03:39Z'
updatedAt: '2026-10-17T00:12:03Z'
language: TypeScript
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-10-18T00:06:19.150Z'
description: >-
  Markdown and MDX parser in TypeScript. Exact remark mdast output, 17 to 28x
  faster.
tags:
  - commonmark
  - gfm
  - markdown
  - mdast
  - mdx
  - parser
  - remark
  - typescript
---

<div align='center' class='hidden'>
    <br/>
    <br/>
    <h3>mdastic</h3>
    <p>Markdown and MDX parser that outputs the exact remark mdast, 17 to 28x faster.</p>
    <br/>
    <br/>
</div>

mdastic is **one package** for parsing and serializing markdown. It gives the **same mdast as remark**, byte for byte: positions, `data.estree` and MDX errors included. MDX, GFM and frontmatter are built in. It is written in plain TypeScript, so it runs in Node, Bun, Workers and the browser.

```ts
import { parse, stringify, visit } from 'mdastic'
import { mdx } from 'mdastic/mdx'
import { gfm } from 'mdastic/gfm'
import { frontmatter } from 'mdastic/frontmatter'

const syntax = [mdx(), gfm(), frontmatter(['yaml'])]

const tree = parse(source, { syntax }) // Root | MdxParseError, never throws
if (tree instanceof Error) throw tree

visit(tree, 'heading', (node) => {
  node.depth // node is typed as Heading
})

const markdown = stringify(tree, { syntax }) // same string as remark-stringify
```

## Features

- **Exact remark output.** 9,854 of 9,854 conformance fixtures match the real remark stack, including positions and estree.
- **Fast.** 28x faster than remark on markdown, 17x on MDX, 6x on stringify. Faster than markdown-it, close to native Rust.
- **One syntax list.** The same `syntax` array drives `parse` and `stringify`. No separate micromark, from-markdown and to-markdown extension arrays.
- **MDX built in.** JSX, ESM and `{expressions}` with `data.estree`. Only `mdastic/mdx` imports Acorn, so plain markdown bundles stay small.
- **Errors as values.** `parse` returns `MdxParseError` instead of throwing. It has the same fields as micromark's `VFileMessage`.
- **Typed helpers.** `visit` narrows the node type from the filter. `NodeOf<'heading'>` replaces `Extract<RootContent, { type: 'heading' }>`.
- **Small dependency tree.** Only `acorn` and `acorn-jsx` at runtime, both for MDX. No unified, micromark or vfile.

## Install

```bash
npm install mdastic
```

> [!WARNING]
> mdastic is **experimental and unstable**. It is on version 0.x, and any release can break the API. Pin the exact version.

## Benchmarks

Real documents, each parsed on its own, like a docs site build. 342 markdown docs (2.6 MB of READMEs and Mintlify docs) and 523 MDX docs (1 MB of Holocron docs). Median of 15 runs after warmup.

![mdastic vs remark: parse, stringify and round trip](docs/figures/bench-vs-remark.png)

| Task | remark | mdastic | Faster |
| --- | ---: | ---: | ---: |
| Parse markdown + GFM | 703 ms | **24.7 ms** | 28.5x |
| Parse MDX with estree | 289 ms | **16.8 ms** | 17.2x |
| Stringify markdown + GFM | 253 ms | **42.7 ms** | 5.9x |
| Stringify MDX | 101 ms | **16.7 ms** | 6.0x |
| Round trip MDX | 402 ms | **33.9 ms** | 11.9x |

### Against other fast parsers

mdastic is **faster than markdown-it**, which only emits a token list and builds no tree. It is **1.2x behind Sätteri** on markdown. Sätteri is a native Rust addon and gives no `data.estree` for MDX.

![mdastic vs markdown-it and Sätteri parse time](docs/figures/bench-vs-native.png)

| Parser | Markdown + GFM | MDX | Output |
| --- | ---: | ---: | --- |
| markdown-it 14 | 36.7 ms | not supported | tokens |
| **mdastic** | **24.7 ms** | **16.8 ms** | mdast with estree |
| Sätteri 0.10.5 (Rust, napi) | 20.5 ms | 10.6 ms | mdast, no estree |

Node 24.21.0 on an Apple M5 Pro. Run it yourself:

```bash
pnpm install
pnpm --dir mdastic build
cd conformance && NODE_ENV=production pnpm exec tsx src/bench.ts
```

### Bundle size

Minified with `bun build --target browser`. Most of the MDX size is Acorn.

| Syntax | remark | mdastic |
| --- | ---: | ---: |
| Markdown + GFM + frontmatter | 157 KB (44.5 KB gzip) | **126 KB (43.7 KB gzip)** |
| Plus MDX | 448 KB (129 KB gzip) | **380 KB (118 KB gzip)** |

## API

### `parse(source, options)`

```ts
function parse(source: string, options?: {
  syntax?: Syntax[]     // [mdx(), gfm(), frontmatter()]
  positions?: boolean   // default true; false skips `position` on every node
}): Root | MdxParseError
```

Only MDX syntax can fail. The error is **returned**, so check it with `instanceof Error`:

```ts
const tree = parse('<Card title={1 +}>', { syntax: [mdx()] })
if (tree instanceof MdxParseError) {
  tree.reason // 'Could not parse expression with acorn'
  tree.line   // 1
  tree.ruleId // 'acorn'
}
```

### `stringify(tree, options)`

Gives the same string as `mdast-util-to-markdown` with the matching extensions. It takes the same options: `bullet`, `emphasis`, `strong`, `fence`, `rule`, `listItemIndent`, `setext`, `closeAtx`, `handlers`, `join`, `unsafe` and the rest.

```ts
stringify(tree, { syntax: [gfm()], bullet: '-', emphasis: '_' })
```

### Syntax

Each syntax is a subpath export. Pass the same list to `parse` and `stringify`.

| Import | Adds | Options |
| --- | --- | --- |
| `gfm()` from `mdastic/gfm` | tables, strikethrough, footnotes, task lists, autolink literals | `singleTilde` (default `true`) |
| `mdx()` from `mdastic/mdx` | JSX, ESM, `{expressions}` | `estree` (default `true`) attaches `data.estree` |
| `frontmatter()` from `mdastic/frontmatter` | `---` yaml and `+++` toml blocks | `['yaml', 'toml']` |
| `headingId()` from `mdastic/heading-id` | `{#custom-id}` text nodes, also outside headings | none |

```ts
import { headingId } from 'mdastic/heading-id'

parse('# Title {#custom-id}', { syntax: [headingId()] })
```

**Heading IDs** emit `idString` nodes. Their positions cover the value, not the `{#` and `}` markers.
With MDX, valid IDs win over text expressions. MDX flow expressions still take priority, so a
standalone `{#id}` line fails. A failed ID attempt falls back to the ordinary MDX expression parser.

**Stringify difference:** `mdast-heading-id` has no to-markdown handler, so remark-stringify throws
on `idString`. mdastic writes `{#value}`, with character references where needed for a round trip.

### `remarkTransform(plugin, ...options)`

Run an existing **tree-only remark plugin**, without unified:

```ts
import { remarkTransform } from 'mdastic/remark'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'

const transform = remarkTransform(remarkSqueezeParagraphs)
const tree = parse(source)
if (tree instanceof Error) throw tree
await transform(tree)
```

Attachment receives a minimal processor with `data()`. Transforms can be synchronous, return a
Promise, or use `next(error?)`. Pass your own file as the second argument, or use the default file
with `data`, `messages` and `message()`. Plugins that add parser or serializer extensions fail at
attachment. Use the built-in syntax descriptors instead.

### `visit(tree, filter?, visitor)`

Same semantics as `unist-util-visit`: depth first, preorder. The filter narrows the node type.

```ts
import { visit, SKIP, EXIT } from 'mdastic'

visit(tree, ['link', 'image'], (node, index, parent) => {
  node.url // Link | Image
})

visit(tree, (node, index, parent) => {
  if (node.type === 'blockquote') return SKIP // skip its children
  if (node.type === 'delete' && parent && index !== undefined) {
    parent.children.splice(index, 1, ...node.children)
    return index // visit the sibling now at this index
  }
  if (node.type === 'thematicBreak') return EXIT // stop the walk
})
```

### `toString(node)`

Plain text of a node, the same as `mdast-util-to-string`. Image `alt` and html values are included.

### Types

Every node type is exported from `mdastic`: core mdast, GFM, MDX and frontmatter nodes.

```ts
import type { Root, Nodes, Parents, NodeOf, MdxJsxFlowElement } from 'mdastic'

type Heading = NodeOf<'heading'>
```

## How it works

remark is slow because micromark runs each character through a state closure, creates an event object per token, backtracks failed attempts and builds the tree in a second pass. MDX calls Acorn at every `}` until a parse succeeds.

mdastic keeps the same rules and changes the data layout.

![mdastic parse and stringify pipeline](docs/figures/architecture.png)

```
source ──► scan.ts ──► block.ts ──► deferred inline.ts ──► autolink.ts ──► tree.ts ──► mdast
              │            │                     ▲                            ▲
              │            └─► definitions ──────┘                            │
              └─► line index (Int32Array), UTF-16 positions ──────────────────┘
```

- **Typed-array arena.** Node kinds, offsets and links live in reused typed arrays. The mdast objects are built once at the end, in one pass.
- **Deferred inline parsing.** Inline content is parsed after all blocks, so link references can come before their definitions.
- **Native search, few regexes.** The scanner jumps between syntax candidates with native string search instead of testing every character.
- **One Acorn parse per expression.** A JS-aware scanner predicts the closing `}`. Acorn parses once. If the guess is wrong, it falls back to micromark's method, so boundaries and errors stay the same.
- **Escape tables for stringify.** Escaping rules are compiled once per syntax set and applied in one pass over each text.

## Conformance

The **real remark stack is the oracle.** `conformance/` pins `remark`, `micromark`, `mdast-util-*` and their extensions. Every fixture is parsed by both, and the full JSON trees are compared.

```
 upstream test suites ──► 9,854 inputs ──┬──► remark (pinned) ──► mdast JSON ──┐
                                         │                                     ├──► deep equal
                                         └──► mdastic ──────────► mdast JSON ──┘
                                                                  positions, estree, errors
```

| Source | Fixtures |
| --- | ---: |
| CommonMark spec | 652 |
| GFM spec | 671 |
| markdown-rs tests | 1,693 |
| remark, micromark and mdast-util suites | 1,617 |
| Sätteri tests and fuzz regressions | 3,816 |
| mdx-js and mdxjs-rs tests | 243 |
| Real documents (READMEs, Mintlify, Holocron) | 992 |
| Smoke and regressions | 12 |
| Heading IDs, upstream and edge cases | 158 |
| **Total, all pass** | **9,854** |

Stringify is checked with **838 tree-to-markdown cases** from mdast-util-to-markdown, every parse fixture the oracle can serialize, and 20,000 random trees. Heading IDs use separate round-trip tests. Full results per fixture file are in [docs/parser-conformance.md](docs/parser-conformance.md).

```bash
cd conformance
pnpm exec tsx src/report.ts parse   # pass rate per fixture file
pnpm exec vitest run                # full differential suite
```

## Limits

- **Not reentrant.** The parser reuses module-level buffers. Do not call `parse` from inside a parse hook.
- **Deep nesting** can hit the JavaScript call stack limit, because containers and links still recurse.
- **No HTML output.** mdastic stops at mdast. Use `mdast-util-to-hast` for HTML.
- **No syntax plugins.** Only GFM, MDX, frontmatter and heading IDs. Math, directives and other micromark extensions are not supported.
- **Limited remark adapter.** Tree mutation plugins only. No processor `use()`, parsing, compilation or full vfile implementation.
- **Empty heading IDs.** The pinned micromark-heading-id oracle hangs on `{#}` outside MDX flow. mdastic emits an empty `idString`; this case is tested separately, not counted as oracle conformance.

## Repository layout

| Folder | What |
| --- | --- |
| `mdastic/` | The npm package |
| `conformance/` | Pinned remark oracle, fixtures, differential tests, benchmark |
| `scripts/` | Fixture extraction from upstream suites, table generators, parse benchmarks |
| `docs/` | Parser notes, conformance results, README figures |

## License

MIT. The generated entity and punctuation tables keep their upstream licenses.
