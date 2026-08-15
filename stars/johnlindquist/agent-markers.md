---
repo: johnlindquist/agent-markers
url: 'https://github.com/johnlindquist/agent-markers'
homepage: null
starredAt: '2026-08-09T02:02:08Z'
createdAt: '2026-06-26T00:58:22Z'
updatedAt: '2026-08-09T02:02:09Z'
language: TypeScript
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-08-15T22:33:23.173Z'
description: null
tags: []
---

# Agent Markers

Agent Markers is a workshop-friendly debugging pattern for web apps:

1. Mark the moment that matters.
2. Capture nearby runtime evidence.
3. Add the human explanation.
4. Review or export a compact debug artifact.

This spike includes a framework-neutral browser client and a Vite demo/viewer.
It is intentionally not a browser extension, server, replay tool, or AI product.

## Try It

```bash
npm install
npm run build
npm test
npm run dev
```

Then open the local Vite URL and create a few markers.

## Minimal App Usage

```ts
import { createAgentMarkers } from "@agent-markers/client";

const markers = createAgentMarkers({
  appName: "checkout-demo",
  exposeGlobal: true
});

markers.mark("Checkout button stayed disabled", {
  note: "Expected it to enable after selecting shipping.",
  tags: ["checkout", "regression"]
});
```

Test runners can read `window.__AGENT_MARKERS__.export()` when `exposeGlobal`
is enabled.

## Privacy Defaults

Agent Markers keeps data in memory until explicit export. Storage capture only
records key names and counts by default, not values. Fetch capture records
metadata only and never reads request or response bodies.

See [docs/WORKSHOP.md](docs/WORKSHOP.md) for the teaching guide.
