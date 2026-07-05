---
repo: alexanderop/claude-code-builder
url: 'https://github.com/alexanderop/claude-code-builder'
homepage: null
starredAt: '2025-11-21T22:27:56Z'
createdAt: '2025-11-08T12:18:45Z'
updatedAt: '2025-11-22T15:57:28Z'
language: null
license: MIT
branch: main
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:53.895Z'
description: null
tags: []
---

# Claude Code Builder

> Build **skills**, **subagents**, **hooks**, **slash commands**, and **plugins** for Claude Code — fast, consistently, and with best practices baked in.

[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-stable-success.svg)](#)
[![Works with](https://img.shields.io/badge/Claude%20Code-compatible-blue.svg)](#)

---

## Why this exists

Creating high-quality Claude Code customizations involves repetitive scaffolding and convention wrangling. **Claude Code Builder** gives you guided commands that generate the right files, structure, and docs — so you can focus on logic, not boilerplate.

---

## Local Development & Release Flow

For local development, contributors open a PR against this repo.  
When the PR is **merged into `main`**, the marketplace manifest already points to this repo, so **the plugin is live immediately** (no extra publish step). Reviews and approvals are handled by the maintainer.

**Summary**

1. Fork + branch  
2. Implement changes  
3. Open PR → review  
4. **Merge to `main` → live in marketplace**

---

## Installation

### Claude Code (via Plugin Marketplace)

**1) Register the marketplace in Claude Code:**
```bash
/plugin marketplace add alexanderop/claude-code-builder
````

**2) Install the plugin from this marketplace:**

```bash
/plugin install claude-code-builder@claude-code-builder
```

### Verify Installation

**Check that commands appear:**

```bash
/help
# Should see:
# /create-skill            - Create an auto-invoked Skill with best practices
# /create-agent            - Create a subagent with focused role/tools
# /create-command          - Generate a slash command (explicit invocation)
# /create-hook             - Configure event-driven hooks (pre/post tool use, etc.)
# /create-plugin           - Package a .claude/ setup into a plugin
# /create-md               - Generate CLAUDE.md files (project awareness)
# /create-output-style     - Create/activate custom Output Styles
```

> Tip: If commands don’t appear, run `/help` again or restart Claude Code, then re-run the install command.

---

## What you can generate

| Command                | Purpose (1-liner)                                                                 | Typical usage example                                                          |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `/create-skill`        | Scaffold a **model-invoked Skill** Claude auto-discovers from context.            | `/create-skill commit-helper "Generate helpful git commit messages"`           |
| `/create-agent`        | Create a **subagent** with a focused role and optional tool/model settings.       | `/create-agent reviewer "Expert code reviewer; use proactively after changes"` |
| `/create-command`      | Add a **slash command** for repeatable workflows you invoke explicitly.           | `/create-command analyze-deps "Analyze dependencies for outdated packages"`    |
| `/create-hook`         | Configure **event hooks** (pre/post tool use, prompt submit, etc.) with JSON/CLI. | `/create-hook PreToolUse "Bash" "jq -r '.tool_input.command' >> ~/.log"`       |
| `/create-plugin`       | Turn a `.claude/` setup into a **distributable plugin** with manifests.           | `/create-plugin`                                                               |
| `/create-md`           | Generate root & nested **CLAUDE.md** files that teach Claude your project.        | `/create-md medium`                                                            |
| `/create-output-style` | Create/activate **Output Styles** (stored system prompts) for different modes.    | `/create-output-style "Teaching Assistant" --project --description "..."`      |

> Each command opens a guided flow and prints the exact files/paths it creates.

---

## Usage cheatsheet

```bash
# Skill (auto-invoked by Claude)
#/create-skill [skill-name] "[what it does and when to use it]"
/create-skill commit-helper "Generate clear commit messages; use when committing or reviewing staged changes."

# Subagent (focused role)
#/create-agent [name] "[when to invoke]" [--tools ...] [--model ...]
/create-agent reviewer "Expert code reviewer; use proactively after code changes" --tools "Read,Grep,Glob"

# Slash command (explicit invocation)
/create-command analyze-deps "Analyze dependencies for outdated packages"

# Hook (automate on events)
/create-hook PreToolUse "Edit|Write" "python3 .scripts/block_sensitive_edits.py"

# Package your setup as a plugin
/create-plugin

# Project awareness docs for Claude
/create-md very-thorough

# Output style for non-default workflows
/create-output-style "Teaching Assistant" --project --description "Explains step by step with examples"
```

---

## Local development

```bash
# 1) Clone
git clone https://github.com/alexanderop/claude-code-builder.git
cd claude-code-builder

# 2) Start Claude Code
claude

# 3) Add a local marketplace and install
/plugin marketplace add .
/plugin install claude-code-builder@claude-code-builder-dev
```

You can iterate by editing files under `commands/` and re-installing. For multi-plugin testing, create a parent test marketplace (e.g., `dev-marketplace/`) and place this repo inside it — `/create-plugin` prints exact paths and next steps.

---

## Project structure

```
claude-code-builder/
├── .claude-plugin/
│   ├── plugin.json              # Plugin manifest (name, version, repo, license)
│   └── marketplace.json         # Local marketplace for dev/testing
├── commands/                    # All slash-command sources (Markdown with frontmatter)
│   ├── create-skill.md
│   ├── create-agent.md
│   ├── create-command.md
│   ├── create-hook.md
│   ├── create-plugin.md
│   ├── create-md.md
│   └── create-output-style.md
├── README.md
├── LICENSE
└── .gitignore
```

---

## Design principles

* **Convention over configuration** — consistent file names, frontmatter, and paths.
* **Safety rails** — hooks and commands promote least-privilege tools and reviewability.
* **Explainability** — generated files include commented templates and examples.
* **Distribution-ready** — manifests and marketplace layout support team sharing.

---

## Requirements

* Claude Code installed (CLI + UI)
* Shell environment with common tooling (`bash`, `jq`, `python3` for sample hooks)
* Git (for marketplace installs)

> The plugin itself is language-agnostic; your generated Skills/agents can target any stack.

---

## FAQs

**Where do files get created?**
User-level content goes under `~/.claude/...`; project-level content under `.claude/...`. Commands print exact paths.

**Can I block risky actions?**
Yes — use `PreToolUse` hooks that exit with code `2` to block operations (see `/create-hook` examples).

**How do I share with my team?**
Use `/create-plugin` to package your `.claude/` config and add it to a marketplace repo; teammates run the two install commands.

---

## Contributing

Issues and PRs are welcome 🎉

1. Check existing issues and discussions
2. Open a focused bug report or RFC
3. Submit a PR with clear description and before/after notes

---

## Versioning

* **1.0.0** – Initial release of all creation commands *(2025-01-08)*

See the repository for releases and change notes.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Author

**Alexander Opalic** · [https://github.com/alexanderop/claude-code-builder](https://github.com/alexanderop/claude-code-builder)

