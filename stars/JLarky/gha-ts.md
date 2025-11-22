---
repo: JLarky/gha-ts
url: 'https://github.com/JLarky/gha-ts'
homepage: 'https://jsr.io/@jlarky/gha-ts'
starredAt: '2025-10-19T15:56:10Z'
createdAt: '2025-10-17T21:22:54Z'
updatedAt: '2025-11-20T15:28:52Z'
language: Pkl
license: MIT
branch: main
stars: 132
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-11-22T22:30:55.692Z'
description: Type-safe GitHub Action workflows
tags: []
---

[![GitHub Release](https://img.shields.io/github/v/release/JLarky/gha-ts?include_prereleases)](https://github.com/JLarky/gha-ts/releases/latest)
[![GitHub License](https://img.shields.io/github/license/JLarky/gha-ts)](https://github.com/JLarky/gha-ts/blob/main/LICENSE)

# <img src="https://raw.githubusercontent.com/JLarky/gha-ts/HEAD/icon.png" alt="gha-ts" width="55"/> gha-ts

A TypeScript library for writing GitHub Actions workflows and rendering them to YAML.

- Extremely lean core, gha-ts has 0 dependencies, you provide your own yaml serializer (or just use JSON.stringify, because any valid JSON is also valid YAML)
- No typescript overhead. Github will only use generated YAML files, so it won't see the difference. You use typescript just on your machine and heck, it doesn't even has to be typescript (see javascript example in Examples section)!
- For quicker onboarding [we provide CLI](https://github.com/JLarky/gha-ts-enterprise-node/blob/main/.github/workflows/utils/convert-cli.ts) to convert all of your existing workflows to TypeScript (or start with one file!).

It's easy to start with gha-ts, but for production-ready uses I would strongly recommend checking out [gha-ts-enterprise-node](https://github.com/JLarky/gha-ts-enterprise-node) example, that includes things like build/watch scripts, action version locking, linting of your workflows and an example of a [CI job](https://github.com/JLarky/gha-ts-enterprise-node/blob/main/.github/workflows/check-gha-ts-workflows-converted.main.ts) that checks that generated YAML files are in sync with the source.

## Install

If using Bun:

```bash
bunx jsr add -D @jlarky/gha-ts # or bun add -D @jlarky/gha-ts
```

If using Node.js:

```bash
npx nypm add -D @jlarky/gha-ts yaml # or npx jsr add -D @jlarky/gha-ts
```

Notes:
- Bun users will import YAML from bun and node users will use `yaml` from npm.
- This example is using Bun, but you can find other examples in the [examples](examples) directory.

## Quickstart

Create a workflow module at `.github/workflows/example-bun.main.ts` (when using Bun):

```ts
#!/usr/bin/env bun
import { YAML } from "bun";
import { workflow } from "@jlarky/gha-ts/workflow-types";
import { checkout } from "@jlarky/gha-ts/actions";
import { generateWorkflow } from "@jlarky/gha-ts/cli";

const wf = workflow({
  name: "Example workflow",
  on: {
    push: { branches: ["main"] },
    pull_request: {},
  },
  jobs: {
    exampleJob: {
      "runs-on": "ubuntu-latest",
      steps: [
        checkout({ "fetch-depth": 0 }),
        { name: "Test", run: "echo 'Hello, world!'" },
      ],
    },
  },
});

await generateWorkflow(wf, YAML.stringify, import.meta.url);
```

## Examples

- Look at the [.github/workflows](https://github.com/JLarky/gha-ts/tree/main/.github/workflows) directory for workflow examples.
- Additional usage examples: `examples/`.
- [Hello world (Bun)](https://github.com/JLarky/gha-ts/tree/main/examples/hello-world-bun/)
- [Hello world (Node.js)](https://github.com/JLarky/gha-ts/tree/main/examples/hello-world-node/)
- [Hello world (Javascript)](https://github.com/JLarky/gha-ts/tree/main/examples/hello-world-node-20/)
- [Hello world (Deno)](https://github.com/JLarky/gha-ts/tree/main/examples/hello-world-deno/)
- [Enterprise (Node.js)](https://github.com/JLarky/gha-ts-enterprise-node) - great example of using gha-ts "for real".

## License

MIT

## Alternatives

- [actions-toolkit](https://github.com/actions/toolkit)
- [ghats](https://github.com/koki-develop/ghats)
- [github-actions-typescript](https://github.com/thedjpetersen/github-actions-typescript)
- [github-actions-typing](https://github.com/typesafegithub/github-actions-typing)
- [github-actions-wac](https://github.com/webiny/github-actions-wac)
- [github-actions-workflow-ts](https://github.com/emmanuelnk/github-actions-workflow-ts)
- [workflow-ts](https://github.com/galabra/workflow-ts)

Non JavaScript/TypeScript:

- [dagger](https://docs.dagger.io/getting-started/quickstarts/ci/)
- [gh-workflow (Rust)](https://github.com/tailcallhq/gh-workflow)
- [github-workflows-kt (Kotlin)](https://github.com/typesafegithub/github-workflows-kt)
- [kotlin-github-actions-dsl (Kotlin)](https://github.com/nefilim/kotlin-github-actions-dsl)
- [pkl-gha (Pkl)](https://github.com/stefma/pkl-gha)
- [sbt-github-actions (Scala)](https://github.com/sbt/sbt-github-actions)
