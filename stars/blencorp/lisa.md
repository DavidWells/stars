---
repo: blencorp/lisa
url: 'https://github.com/blencorp/lisa'
homepage: null
starredAt: '2026-01-16T18:49:44Z'
createdAt: '2026-01-08T17:39:50Z'
updatedAt: '2026-01-24T21:52:40Z'
language: TypeScript
license: NA
branch: main
stars: 93
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:31.302Z'
description: >-
  Lisa plans. Ralph does. Interactive specification interview workflow for
  Claude Code that conducts in-depth feature interviews and generates
  comprehensive specs.
tags: []
---

<img src="lisa-banner.png" alt="Lisa Logo" width="1000" />

# Lisa

**Lisa plans. Ralph does.**

Interactive specification interview workflow that conducts in-depth feature interviews and generates comprehensive specs. Available as both a Claude Code plugin and a standalone CLI that works with multiple AI providers.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Claude Code Plugin](#claude-code-plugin)
  - [Standalone CLI](#standalone-cli)
- [Quick Start](#quick-start)
- [Plugin Commands](#plugin-commands)
- [CLI Usage](#cli-usage)
- [Output Files](#output-files)
- [Interview Process](#interview-process)
- [First Principles Mode](#first-principles-mode)
- [Configuration](#configuration)
- [Programmatic Usage](#programmatic-usage)
- [Complete Workflow: Lisa + Ralph](#complete-workflow-lisa--ralph)
- [Development](#development)
- [License](#license)

## Overview

Based on the technique described by [@trq212](https://twitter.com/trq212):

> My favorite way to use Claude Code to build large features is spec based. Start with a minimal spec or prompt and ask Claude to interview you using the AskUserQuestion tool about literally anything: technical implementation, UI & UX, concerns, tradeoffs, etc. Then make a new session to execute the spec.

Lisa automates this workflow by:
- Conducting structured interviews about your feature
- Generating comprehensive PRDs in Markdown and JSON formats
- Supporting resume of interrupted sessions
- Optionally challenging assumptions with first-principles questioning

## Installation

### Claude Code Plugin

```bash
# Add the marketplace
/plugin marketplace add blencorp/lisa

# Install the plugin
/plugin install lisa
```

### Standalone CLI

The CLI works with multiple AI providers. Run it directly with npx:

```bash
npx @blen/lisa "user authentication"
```

**Prerequisites:** At least one AI CLI tool must be installed:

| Provider | CLI Command | Installation |
|----------|-------------|--------------|
| Claude Code | `claude` | [anthropic.com](https://anthropic.com) |
| OpenCode | `opencode` | [opencode.dev](https://opencode.dev) |
| Cursor | `cursor` or `agent` | [cursor.sh](https://cursor.sh) |
| Codex | `codex` | [codex.dev](https://codex.dev) |
| GitHub Copilot | `gh` with Copilot extension | [github.com/copilot](https://github.com/copilot) |

## Quick Start

**Plugin (Claude Code):**
```bash
/lisa:plan "user authentication"
```

**CLI:**
```bash
npx @blen/lisa "user authentication"
```

## Plugin Commands

### `/lisa:plan <FEATURE_NAME> [OPTIONS]`

Start a specification interview for a feature.

**Arguments:**
- `FEATURE_NAME` (required) - Name of the feature to spec out

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--context <file>` | Initial context file (PRD, requirements, etc.) | none |
| `--output-dir <dir>` | Output directory for generated specs | `docs/specs` |
| `--max-questions <n>` | Maximum question rounds (0 = unlimited) | `0` |
| `--first-principles` | Challenge assumptions before detailed spec gathering | `false` |
| `-h, --help` | Show help | - |

**Examples:**

```bash
# Basic interview
/lisa:plan "user authentication"

# With existing context
/lisa:plan "payment processing" --context docs/PRD.md

# Custom output location
/lisa:plan "search feature" --output-dir specs/features

# Limit to 15 questions
/lisa:plan "caching layer" --max-questions 15

# Challenge assumptions first
/lisa:plan "new dashboard" --first-principles

# Combined options
/lisa:plan "api gateway" --context docs/arch.md --first-principles --max-questions 20
```

### `/lisa:resume`

Resume an interrupted specification interview.

```bash
/lisa:resume
```

If you have interviews that were interrupted (session ended mid-interview), this command will:
1. List all in-progress interviews with feature names and timestamps
2. Let you select which interview to resume
3. Continue the interview from where you left off

### `/lisa:cleanup`

Clean up all Lisa interview state files.

```bash
/lisa:cleanup
```

Removes all interview state files from `.claude/lisa-*.md`. Use this to:
- Abandon all in-progress interviews
- Reset Lisa to a clean state

Note: This does NOT delete completed specs in `docs/specs/`.

### `/lisa:help`

Display help documentation about the Lisa workflow.

## CLI Usage

### Basic Usage

```bash
npx @blen/lisa "user authentication system"
```

### Command Reference

```
Usage: npx @blen/lisa [options] [feature]

Arguments:
  feature                          Feature description to plan

Options:
  -v, --version                    Display the current version
  -r, --resume                     Resume a previously interrupted interview
  -f, --first-principles           Begin with foundational questions
  -c, --context <files...>         Reference documents to include
  -p, --provider <name>            AI provider: claude, opencode, cursor, codex, copilot
  -h, --help                       Display help
```

### Examples

```bash
# With AI provider selection
npx @blen/lisa "feature description" --provider claude
npx @blen/lisa "feature description" --provider opencode
npx @blen/lisa "feature description" --provider cursor

# With context files
npx @blen/lisa "feature description" --context docs/spec.md
npx @blen/lisa "feature description" --context docs/spec.md docs/api.md

# First principles mode
npx @blen/lisa "feature description" --first-principles

# Resume an interrupted interview
npx @blen/lisa --resume
```

## Output Files

### Plugin Output

The plugin generates three files when the interview is finalized:

| File | Location | Description |
|------|----------|-------------|
| Markdown PRD | `{output-dir}/{feature-slug}.md` | Human-readable specification |
| Structured JSON | `{output-dir}/{feature-slug}.json` | Machine-readable spec for tooling |
| Progress File | `{output-dir}/{feature-slug}-progress.txt` | Empty file for Ralph to track learnings |

**Example:** For `/lisa:plan "user authentication"`:
- `docs/specs/user-authentication.md`
- `docs/specs/user-authentication.json`
- `docs/specs/user-authentication-progress.txt`

### CLI Output

The CLI generates PRD files in the `./lisa/` directory:

| File | Description |
|------|-------------|
| `./lisa/{feature-slug}.md` | Markdown PRD with overview, user stories, and technical notes |
| `./lisa/{feature-slug}.json` | JSON PRD for programmatic use |

### JSON Structure

The JSON output follows the [snarktank/ralph](https://github.com/snarktank/ralph) format:

```json
{
  "project": "user-authentication",
  "branchName": "ralph/user-authentication",
  "description": "User authentication with email/password and OAuth",
  "userStories": [
    {
      "id": "US-001",
      "category": "setup",
      "title": "Database schema for users",
      "description": "As a developer, I want user tables created so that I can store credentials",
      "acceptanceCriteria": [
        "Migration creates users table with id, email, password_hash columns",
        "Unique constraint on email column",
        "npm run migrate completes without errors"
      ],
      "passes": false,
      "notes": ""
    }
  ]
}
```

**Category values:**
- `setup` - Initial setup, configuration, scaffolding
- `core` - Core feature functionality
- `integration` - Connecting with other systems
- `polish` - UI refinements, error handling, edge cases

## Interview Process

### How It Works

1. **Initialization**: Creates state files to track interview progress

2. **Interview Loop**:
   - AI asks probing questions using interactive prompts
   - Interview continues until you say "done" or "finalize"
   - Draft spec updated every 2-3 questions
   - Questions adapt based on your answers
   - If interrupted, use resume to continue

3. **Completion Detection**: When you say "done", "finalize", "finished", "that's all", "complete", or "wrap up"

4. **Finalization**: Generates all output files

### Interview Coverage

The interview systematically covers:

**Scope Definition**
- What is explicitly OUT of scope?
- MVP vs full vision boundaries
- Related features to avoid touching

**User Stories**
- Discrete stories completable in one coding session
- Verifiable acceptance criteria (not vague)
  - Good: "API returns 200 for valid input", "Response < 200ms"
  - Bad: "Works correctly", "Is fast", "Handles errors"

**Technical Implementation**
- Data models and storage
- API design (endpoints, methods, auth)
- Integration with existing systems
- Error handling and edge cases

**User Experience**
- User flows and journeys
- Edge cases and error states
- Accessibility considerations

**Trade-offs**
- Performance requirements
- Security considerations
- Scalability expectations

**Implementation Phases**
- 2-4 incremental phases
- Verification command for each phase
- Minimum viable first phase

## First Principles Mode

Use `--first-principles` to challenge assumptions before diving into details:

**Plugin:**
```bash
/lisa:plan "new feature" --first-principles
```

**CLI:**
```bash
npx @blen/lisa "new feature" --first-principles
```

**Phase 1 - Challenge the Approach (3-5 questions):**
- "What specific problem have you observed that led to this idea?"
- "What happens if we don't build this at all?"
- "What's the absolute simplest thing that might solve this?"
- "What would have to be true for this to be the wrong approach?"
- "Is there an existing solution we could use instead?"

**Phase 2 - Detailed Spec:** Only proceeds after validating the approach is sound.

## Configuration

### CLI Configuration

The CLI stores configuration in `./lisa/config.yaml`:

```yaml
# Lisa CLI Configuration
# Default AI provider (claude, opencode, cursor, codex, copilot)
defaultProvider: claude

# Output directory for generated PRDs
outputDirectory: ./lisa
```

Interview progress is saved to `./lisa/state.yaml`, allowing you to:
- Resume interrupted interviews with `npx @blen/lisa --resume`
- Recover from network errors or crashes
- Continue multi-session planning work

State is automatically cleared after successful PRD generation.

### Plugin Runtime Files

During a plugin interview:

| File | Purpose |
|------|---------|
| `.claude/lisa-{slug}.md` | Interview state (iteration count, paths, settings) |
| `.claude/lisa-draft.md` | Running draft spec updated throughout |

## Programmatic Usage

The CLI can also be used as a library:

```typescript
import { runInterview, exploreCodebase, generateMarkdown } from '@blen/lisa';

// Explore codebase
const exploration = await exploreCodebase('/path/to/project');
console.log(exploration.summary);

// Generate PRD
const prd = {
  overview: 'Feature overview...',
  userStories: [...],
  technicalNotes: '...'
};
const markdown = generateMarkdown(prd, 'feature-slug');
```

### Supported File Types for Context

Lisa supports the following file types for `--context`:

- **Markdown**: `.md`, `.markdown`
- **Text**: `.txt`, `.text`
- **Code**: `.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.rb`, `.go`, `.rs`, `.java`
- **Config**: `.json`, `.yaml`, `.yml`, `.toml`, `.ini`, `.conf`
- **Web**: `.html`, `.css`, `.scss`, `.less`
- **Other**: `.xml`, `.sql`, `.graphql`, `.gql`, `.sh`, `.bash`, `.zsh`

## Complete Workflow: Lisa + Ralph

```
+------------------+     +------------------+
|   Lisa Plans     | --> |   Ralph Does     |
|                  |     |                  |
| /lisa:plan       |     | /ralph-loop      |
| "my feature"     |     |                  |
+------------------+     +------------------+
        |                       |
        v                       v
  +-----------+          +-----------+
  | .md spec  |          | Working   |
  | .json     |          | Code      |
  | progress  |          |           |
  +-----------+          +-----------+
```

1. **Lisa plans** - Generate comprehensive spec:
   ```bash
   /lisa:plan "my feature"
   # or
   npx @blen/lisa "my feature"
   ```

2. **Ralph does** - Implement iteratively:
   ```bash
   /ralph-loop
   ```

The generated spec includes a pre-formatted Ralph Loop command with phases and verification steps.

Use with [ralph-loop](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop) for a complete planning-to-implementation workflow.

## Development

### Plugin Development

To develop and test the plugin locally:

```bash
# Run Claude Code with the plugin loaded from local directory
cc --plugin-dir /path/to/lisa

# Example: if you cloned the repo to ~/projects/lisa
cc --plugin-dir ~/projects/lisa
```

### Plugin Structure

```
lisa/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata (name, version, author)
├── commands/
│   ├── plan.md              # Main command (/lisa:plan)
│   ├── resume.md            # Resume interrupted interviews (/lisa:resume)
│   ├── cleanup.md           # Clean up state files (/lisa:cleanup)
│   └── help.md              # Help documentation (/lisa:help)
├── hooks/
│   └── hooks.json           # Hook configuration (minimal)
├── scripts/
│   └── setup-lisa.sh        # Interview initialization
└── README.md
```

### CLI Development

#### Prerequisites

- Node.js >= 18.0.0
- npm

#### Setup

```bash
# Clone the repository
git clone https://github.com/blencorp/lisa.git
cd lisa/cli

# Install dependencies
npm install
```

#### Running Locally

During development, use `npm run dev` to run the CLI directly without building:

```bash
# Run CLI with a feature description
npm run dev "user authentication system"

# With options
npm run dev "feature name" -- --provider claude --first-principles

# Resume an interrupted session
npm run dev -- --resume

# Show help
npm run dev -- --help
```

Note: Use `--` before CLI flags to pass them through npm to the script.

#### Building

```bash
# Compile TypeScript to JavaScript
npm run build

# Output is written to ./dist/
```

#### Type Checking

```bash
npm run typecheck
```

#### Linting

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix
```

### Testing

The CLI uses [Vitest](https://vitest.dev/) as its test framework.

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run a specific test file
npm test src/core/prd.test.ts

# Run tests with coverage
npm test -- --coverage
```

#### Test Structure

| Type | Location | Description |
|------|----------|-------------|
| Unit | `src/**/*.test.ts` | Tests for individual modules |
| Integration | `src/integration/` | Tests for interview flow with mocked providers |
| E2E | `src/e2e/` | Tests against real AI CLI providers |
| Snapshot | `src/core/prd.snapshot.test.ts` | Validates PRD output formats |

### CLI Project Structure

```
cli/
├── src/
│   ├── index.ts              # Public API exports
│   ├── cli/                  # CLI interface (Commander.js, Inquirer)
│   ├── core/                 # Core logic (orchestrator, state, PRD generation)
│   ├── providers/            # AI provider implementations
│   └── utils/                # Utility functions
├── dist/                     # Compiled output
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## License

MIT

---

**Version:** 1.2.0 (Plugin) | 0.1.0 (CLI)
**Author:** BLEN Engineering Team

Built with love by [BLEN, Inc](https://www.blencorp.com).

### About BLEN

BLEN, Inc is a digital services company that provides Emerging Technology (ML/AI, RPA), Digital Modernization (Legacy to Cloud), and Human-Centered Web/Mobile Design and Development.
