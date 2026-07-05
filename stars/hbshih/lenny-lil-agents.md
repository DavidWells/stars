---
repo: hbshih/lenny-lil-agents
url: 'https://github.com/hbshih/lenny-lil-agents'
homepage: null
starredAt: '2026-04-28T03:13:01Z'
createdAt: '2026-03-25T21:12:46Z'
updatedAt: '2026-06-21T06:43:34Z'
language: Swift
license: MIT
branch: main
stars: 53
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2026-07-05T01:53:42.892Z'
description: tiny AI companions that live on your macOS dock
tags: []
---

# Lil-Lenny

[![Watch the demo on YouTube](LennyDemo.gif)](https://youtu.be/RT_v6hCTKsQ?si=FymFHXf_Y3pQI2pE)

Watch the demo on YouTube: [youtu.be/RT_v6hCTKsQ](https://youtu.be/RT_v6hCTKsQ?si=FymFHXf_Y3pQI2pE)

Download Lil-Lenny and play around with it here: [Lil-Lenny.dmg](https://github.com/hbshih/lenny-lil-agents/releases/download/release/Lil-Lenny.dmg)

Lil-Lenny is a tiny macOS companion that lives above your Dock and lets you chat with Lenny Rachitsky's archive without switching contexts.

Click Lenny to open a terminal-style popover, ask a question about product, growth, pricing, leadership, startups, or AI, and get an answer grounded in either the bundled Starter Pack or the full LennyData archive. When it helps, Lil-Lenny can hand the mic to specific archive guests so the answer reads more like advice from Elena Verna, Jeanne Grosser, Molly Graham, Dr. Becky, and other operators in the archive.

## What it does

- Renders animated dock-side characters from transparent video assets
- Opens a native macOS popover chat instead of a browser tab
- Grounds responses in Lenny archive content instead of generic model output
- Supports both a local Starter Pack and the full official LennyData archive
- Auto-detects Claude Code and Codex when they are installed and logged in
- Streams assistant output live while tools are still running
- Shows archive-native prompt chips to help users start with realistic questions
- Lets Lil-Lenny orchestrate expert-style follow-ups as separate speakers

## Answer sources

Lil-Lenny supports two archive modes:

- `Starter Pack`
  Local, fast, and bundled with the app.
  Today that means the public Lenny starter dataset: 10 newsletters and 50 podcast transcripts.

- `Full LennyData`
  Uses the official Lenny archive when available.
  This requires either native MCP configuration in Claude Code or Codex, or a saved bearer token in Settings.

The app will automatically use the full archive when it detects native MCP config, unless the user explicitly chose Starter Pack in Settings.

## Model providers

Lil-Lenny does not run a model locally. You need one provider connected in Settings:

- `Claude Code`
- `Codex / ChatGPT`
- `OpenAI API`

Runtime selection works like this:

1. If the user explicitly chose a provider in Settings, use that.
2. Otherwise behave like `automatic`.
3. Prefer a native Claude Code or Codex setup when available.
4. Fall back to the direct OpenAI Responses API when `OPENAI_API_KEY` is present.

This means a fresh install can start on one provider and later auto-upgrade to Claude Code or Codex after you install and log into them, without forcing users back through Settings unless they made an explicit choice.

## First-run behavior

On first launch, Lil-Lenny checks:

- whether Claude Code or Codex is installed
- whether either one is already logged in
- whether native Lenny MCP config already exists
- whether `OPENAI_API_KEY` or a saved Settings key is available
- whether a LennyData bearer token is available from Settings or `LENNYSDATA_MCP_AUTH_TOKEN`

If nothing is connected yet, the app nudges the user to open Settings and connect a provider first. It does not present the MCP connector flow until there is a realistic path to use it.

## Prompt examples

The built-in chips are intentionally grounded in what the app can actually answer. Examples include:

- `Tell me more about Duolingo's growth strategy`
- `Tell me more about Notion's growth strategy`
- `B2B GTM playbook for 2026`
- `Framework for evaluating an AI feature`
- `Claude Code takeaways for PMs`
- `Pricing playbook for a B2B product`

Starter Pack chips stay closer to the public bundled archive. Full-archive chips can be broader, but they are still phrased to help retrieval stay pointed instead of vague.

## Requirements

- macOS 14.0+
- Xcode 16+ to build locally
- At least one connected AI provider:
  `Claude Code`, `Codex`, or `OpenAI API`

For full archive access you also need one of:

- native Lenny MCP config in Claude Code
- native Lenny MCP config in Codex
- a saved LennyData bearer token in Settings
- `LENNYSDATA_MCP_AUTH_TOKEN` in your shell environment

## Building

Open `lil-agents.xcodeproj` in Xcode and run the `LilAgents` scheme.

Or build from the command line:

```bash
xcodebuild -project lil-agents.xcodeproj -scheme LilAgents -configuration Debug build
```

## Project structure

- `LilAgents/App/`
  App lifecycle, settings, provider detection, and MCP install flows.
- `LilAgents/Character/`
  Dock avatar rendering, movement, popover orchestration, and session wiring.
- `LilAgents/Session/`
  Backend resolution, CLI/OpenAI transport, archive routing, and transcript parsing.
- `LilAgents/Terminal/`
  Terminal-style UI, welcome state, transcript rendering, live status, and prompt chips.
- `LilAgents/StarterArchive/`
  Bundled subset of the public Lenny archive used for local Starter Pack mode.

## Privacy

Lil-Lenny is intentionally simple. It does not run its own backend and does not maintain a user account system.

- `Local UI state`
  Character placement, onboarding state, settings, and saved local preferences live on the Mac.

- `Provider traffic`
  Messages are sent only through the provider the user selected or that automatic mode resolved to. That means Claude Code, Codex, or OpenAI, depending on configuration.

- `Archive auth`
  A LennyData token saved in Settings is stored locally and can also be used to configure detected CLI tools. Environment tokens are respected when present.

- `No app analytics`
  There is no separate telemetry pipeline or hosted app database in Lil-Lenny itself.

- `Updates`
  Sparkle is used for app updates.

## Credits

This project builds on the original `lil agents` work by Ryan Stephen. See [LICENSE](LICENSE) for attribution and licensing details.

## License

MIT. See [LICENSE](LICENSE).
