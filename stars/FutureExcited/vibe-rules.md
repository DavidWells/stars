---
repo: FutureExcited/vibe-rules
url: 'https://github.com/FutureExcited/vibe-rules'
homepage: ''
starredAt: '2025-07-01T18:52:37Z'
createdAt: '2025-04-22T17:24:09Z'
updatedAt: '2025-07-12T20:34:25Z'
language: TypeScript
license: MIT
branch: main
stars: 207
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:52.991Z'
description: 'Save, load, distribute your AI rules'
tags:
  - ai
  - artificial-intelligence
  - cursor-ai
  - windsurf
  - zed-editor
---

# vibe-rules

[![npm downloads](https://img.shields.io/npm/dm/vibe-rules?style=flat)](https://www.npmjs.com/package/vibe-rules)

A powerful CLI tool for managing and sharing AI rules (prompts, configurations) across different editors and tools.

✨ **Supercharge your workflow!** ✨

## Quick Context Guide

This guide highlights the essential parts of the codebase and how you can quickly start working with **vibe-rules**.

[![View context.json](https://img.shields.io/badge/View-context.json-blue?logo=JSON)](https://contextjson.com/futureexcited/vibe-rules)

# Guide

Quickly save your favorite prompts and apply them to any supported editor:

```bash
# 1. Save your prompt locally
vibe-rules save my-react-helper -f ./prompts/react-helper.md

# 2. Apply it to Cursor
vibe-rules load my-react-helper cursor
```

Or, automatically install shared prompts from your project's NPM packages:

```bash
# Find packages with 'llms' exports in node_modules and install for Cursor
vibe-rules install cursor
```

(See full command details below.)

## Installation

```bash
# Install globally (bun recommended, npm/yarn also work)
bun i -g vibe-rules
```

## Usage

`vibe-rules` helps you save, list, load, and install AI rules.

### Save a Rule Locally

Store a rule for later use in the common `vibe-rules` store (`~/.vibe-rules/rules/`).

```bash
# Save from a file (e.g., .mdc, .md, or plain text)
vibe-rules save my-rule-name -f ./path/to/rule-content.md

# Save directly from content string
vibe-rules save another-rule -c "This is the rule content."

# Add/update a description
vibe-rules save my-rule-name -d "A concise description of what this rule does."
```

Options:

- `-f, --file <file>`: Path to the file containing the rule content.
- `-c, --content <content>`: Rule content provided as a string. (One of `-f` or `-c` is required).
- `-d, --description <desc>`: An optional description for the rule.

### List Saved Rules

See all the rules you've saved to the common local store.

```bash
vibe-rules list
```

### Load (Apply) a Saved Rule to an Editor

Apply a rule _from your local store_ (`~/.vibe-rules/rules/`) to a specific editor's configuration file. `vibe-rules` handles the formatting.

```bash
# Load 'my-rule-name' for Cursor (creates/updates .cursor/rules/my-rule-name.mdc)
vibe-rules load my-rule-name cursor
# Alias: vibe-rules add my-rule-name cursor

# Load 'my-rule-name' for Claude Code IDE globally (updates ~/.claude/CLAUDE.md)
vibe-rules load my-rule-name claude-code --global
# Alias: vibe-rules add my-rule-name claude-code -g

# Load 'my-rule-name' for Windsurf (appends to ./.windsurfrules)
vibe-rules load my-rule-name windsurf

# Load into the project's unified .rules file
vibe-rules load unified my-unified-rule

# Load into a specific custom target path
vibe-rules load my-rule-name cursor -t ./my-project/.cursor-rules/custom-rule.mdc
```

Arguments:

- `<name>`: The name of the rule saved in the local store (`~/.vibe-rules/rules/`).
- `<editor>`: The target editor/tool type. Supported: `cursor`, `windsurf`, `claude-code`, `gemini`, `codex`, `clinerules`, `roo`, `vscode`.

Options:

- `-g, --global`: Apply to the editor's global configuration path (if supported, e.g., `claude-code`, `gemini`, `codex`). Defaults to project-local.
- `-t, --target <path>`: Specify a custom target file path or directory, overriding default/global paths.

### Sharing and Installing Rules via NPM

In the evolving AI landscape, prompts and context are becoming increasingly crucial components of development workflows. Just like code libraries, reusable AI rules and prompts are emerging as shareable assets.

We anticipate more NPM packages will begin exporting standardized AI configurations, often via a `llms` entry point (e.g., `my-package/llms`). `vibe-rules` embraces this trend with the `install` command.

### Install Rules from NPM Packages

⚡ **The easiest way to integrate shared rule sets!** ⚡

Install rules _directly from NPM packages_ into an editor's configuration. `vibe-rules` automatically scans your project's dependencies or a specified package for compatible rule exports.

```bash
# Most common: Install rules from ALL dependencies/devDependencies for Cursor
# Scans package.json, finds packages with 'llms' export, applies rules.
vibe-rules install cursor

# Install rules from a specific package for Cursor
# (Assumes 'my-rule-package' is in node_modules)
vibe-rules install cursor my-rule-package

# Install rules from a specific package into a custom target dir for Roo/Cline
vibe-rules install roo my-rule-package -t ./custom-ruleset/

# Install rules into the project's unified .rules file
vibe-rules install unified my-awesome-prompts
```

Add the `--debug` global option to any `vibe-rules` command to enable detailed debug logging during execution. This can be helpful for troubleshooting installation issues.

Arguments:

- `<editor>`: The target editor/tool type (mandatory). Supported: `cursor`, `windsurf`, `claude-code`, `gemini`, `codex`, `clinerules`, `roo`, `vscode`.
- `[packageName]` (Optional): The specific NPM package name to install rules from. If omitted, `vibe-rules` scans all dependencies and devDependencies in your project's `package.json`.

Options:

- `-g, --global`: Apply to the editor's global configuration path (if supported).
- `-t, --target <path>`: Specify a custom target file path or directory.

**How `install` finds rules:**

1.  Looks for installed NPM packages (either the specified one or all dependencies based on whether `[packageName]` is provided).
2.  Attempts to dynamically import a module named `llms` from the package root (e.g., `require('my-rule-package/llms')` or `import('my-rule-package/llms')`). Handles both CommonJS and ESM.
3.  Examines the `default export` of the `llms` module:
    - **If it's a string:** Treats it as a single rule's content.
    - **If it's an array:** Expects an array of rule strings or rule objects.
      - Rule Object Shape: `{ name: string, rule: string, description?: string, alwaysApply?: boolean, globs?: string | string[] }` (Validated using Zod). Note the use of `rule` for content.
4.  Uses the appropriate editor provider (`cursor`, `windsurf`, etc.) to format and apply each found rule to the correct target path (respecting `-g` and `-t` options). Metadata like `alwaysApply` and `globs` is passed to the provider if present in a rule object.
5.  **Important:** Rules installed this way are applied _directly_ to the editor configuration; they are **not** saved to the common local store (`~/.vibe-rules/rules/`). Use `vibe-rules save` for that.

## Supported Editors & Formats

`vibe-rules` automatically handles formatting for:

- **Cursor (`cursor`)**:
  - Creates/updates individual `.mdc` files in `./.cursor/rules/` (local) or `~/.cursor/rules/` (global, if supported via `-t`).
  - Uses frontmatter for metadata (`description`, `alwaysApply`, `globs`).
- **Windsurf (`windsurf`)**:
  - Appends rules wrapped in `<rule-name>` tags to `./.windsurfrules` (local) or a target file specified by `-t`. Global (`-g`) is not typically used.
- **Claude Code (`claude-code`)**:
  - Appends/updates rules within XML-like tagged blocks in a `<!-- vibe-rules Integration -->` section in `./CLAUDE.md` (local) or `~/.claude/CLAUDE.md` (global).
  - Each rule is encapsulated in tags like `<rule-name>...</rule-name>` within the single markdown file.
  - Supports metadata formatting for `alwaysApply` and `globs` configurations.
- **Gemini (`gemini`)**:
  - Appends/updates rules within XML-like tagged blocks in a `<!-- vibe-rules Integration -->` section in `./GEMINI.md` (local) or `~/.gemini/GEMINI.md` (global).
  - Each rule is encapsulated in tags like `<rule-name>...</rule-name>` within the single markdown file.
  - Supports metadata formatting for `alwaysApply` and `globs` configurations.
- **Codex (`codex`)**:
  - Appends/updates rules within XML-like tagged blocks in a `<!-- vibe-rules Integration -->` section in `./AGENTS.md` (local) or `~/.codex/AGENTS.md` (global).
  - Each rule is encapsulated in tags like `<rule-name>...</rule-name>` within the single markdown file.
  - Supports metadata formatting for `alwaysApply` and `globs` configurations.
  - **Codex File Hierarchy**: Codex looks for `AGENTS.md` files in this order: `~/.codex/AGENTS.md` (global), `AGENTS.md` at repo root (default), and `AGENTS.md` in current working directory (use `--target` for subdirectories).
- **Amp (`amp`)**:
  - Manages rules within a single `AGENT.md` file in the project root using XML-like tagged blocks.
  - Each rule is encapsulated in tags like `<rule-name>...</rule-name>` without requiring wrapper blocks (similar to ZED).
  - **Local only**: Does not support global files or subdirectory configurations.
  - Supports metadata formatting for `alwaysApply` and `globs` configurations.
- **Cline/Roo (`clinerules`, `roo`)**:
  - Creates/updates individual `.md` files within `./.clinerules/` (local) or a target directory specified by `-t`. Global (`-g`) is not typically used.
- **ZED (`zed`)**:
  - Manages rules within a single `.rules` file in the project root using XML-like tagged blocks.
  - Each rule is encapsulated in tags like `<rule-name>...</rule-name>` without requiring wrapper blocks.
  - Follows the unified .rules convention and supports metadata formatting for `alwaysApply` and `globs` configurations.
- **VSCode (`vscode`)**:
  - Creates/updates individual `.instructions.md` files within `./.github/instructions/` (project-local).
  - Uses YAML frontmatter with `applyTo` field for file targeting.
  - Rule name and description are included in the markdown content, not frontmatter.
  - **Note:** Due to VSCode's limitations with multiple globs in the `applyTo` field, all rules use `applyTo: "**"` for universal application and better reliability.
- **Unified (`unified`)**:
  - Manages rules within a single `.rules` file in the project root.
  - Ideal for project-specific, centralized rule management.
  - See the [Unified .rules File Convention](./UNIFIED_RULES_CONVENTION.md) for detailed format and usage.

## Development

```bash
# Clone the repo
git clone https://github.com/your-username/vibe-rules.git
cd vibe-rules

# Install dependencies
bun install

# Run tests (if any)
bun test

# Build the project
bun run build

# Link for local development testing
bun link
# Now you can use 'vibe-rules' command locally
```

## License

MIT
