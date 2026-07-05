---
repo: johnlindquist/cursor-alias
url: 'https://github.com/johnlindquist/cursor-alias'
homepage: null
starredAt: '2025-11-21T14:39:18Z'
createdAt: '2025-11-04T18:47:35Z'
updatedAt: '2025-11-21T14:41:10Z'
language: TypeScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:54.291Z'
description: null
tags: []
---

# `a` - Your Terminal AI Agent

A single-letter command that brings Cursor's AI agent to your terminal with beautiful, readable output.

## What is `a`?

`a` is a Bun-based wrapper around `cursor-agent` that transforms raw streaming JSON into a beautifully formatted, readable transcript with:

- Markdown rendering with syntax highlighting
- Real-time streaming output
- Smart truncation of large outputs
- ANSI color support

Instead of wrestling with streaming JSON, just type `a "your task"` and get a clean, formatted AI agent response in your terminal.

> **🚨 Heads up: `a` installs as a global command!**  
> Running through the setup below links the Cursor agent to the single-letter command `a` on your system. After linking, any terminal session can launch Cursor by typing `a "your request"`. Make sure you're comfortable with that alias before proceeding.

<p align="center">
  <img src="media/cursor-alias.gif" alt="Cursor alias demo" width="720">
</p>

Prefer a higher-resolution recording? [Grab the original MP4 from the media-assets release.](https://github.com/johnlindquist/cursor-alias/releases/download/media-assets/cursor-alias.mp4)

## Why `a`?

The single-letter command `a` stands for **Agent** or **AI Agent** - your on-demand AI assistant that's always one keystroke away.

```bash
a "check git status and summarize changes"
a "run tests and fix any failures"
a "create a feature branch and push it"
```

No more context switching. No more copy-pasting between terminals and editors. Just describe what you want, and let the AI agent handle it.

## Installation

### Prerequisites

- [Bun](https://bun.sh) >= 1.1.0
- [Cursor](https://cursor.sh) with `cursor-agent` CLI available

### Setup

1. Clone and install:

```bash
git clone https://github.com/johnlindquist/cursor-alias.git
cd cursor-alias
bun install
```

2. Link globally to make `a` available everywhere:

```bash
bun link
```

That's it! Now `a` is available system-wide.

### Uninstalling

To remove the global `a` command:

```bash
cd cursor-alias
bun unlink
```

## Usage

### Basic Usage

Simply type `a` followed by your prompt:

```bash
a "describe the project layout"
a "find all TODO comments in the codebase"
a "run the test suite and explain any failures"
```

### With Cursor Agent Flags

Pass flags directly to `cursor-agent`:

```bash
a --force "retry the last attempt"
a --model claude-opus "analyze this for security issues"
```

Use `--` to separate flags from prompts when needed:

```bash
a --model gpt-4 -- "summarize the git log"
```

### Default Model

If you don't specify a model, `a` automatically uses `--model composer-1` for optimal performance.

## Output Formatting

### Beautiful Markdown Rendering

All output is rendered as formatted Markdown with:

- Syntax-highlighted code blocks
- Colored headings and lists
- Inline code formatting
- ANSI terminal styling

### Smart Truncation

Large outputs (file reads, command results) are automatically truncated to keep transcripts readable:

- Default: 200 lines or 8,000 characters per section
- Customize with environment variables:

```bash
export A_MAX_SECTION_LINES=500
export A_MAX_SECTION_CHARS=20000
```

### Disable Formatting

For raw output (useful for piping or debugging):

```bash
A_MARKDOWN=0 a "generate a config file"
```

## Real-World Examples

### Git Workflows

```bash
# Smart commit
a "stage all changes and create a conventional commit"

# Branch management
a "create a feature branch called auth-flow and push to origin"

# Code review prep
a "show me the diff and write a PR description"
```

### Development Tasks

```bash
# Install and test
a "install dependencies with bun and run all tests"

# Debug and fix
a "find the error in the logs and suggest a fix"

# Code cleanup
a "remove unused imports and format with prettier"
```

### Project Exploration

```bash
# Quick overview
a "summarize what this project does"

# Find patterns
a "show me all API endpoints in the codebase"

# Documentation
a "explain how authentication works here"
```

### System Operations

```bash
# Safe cleanup
a "remove node_modules and reinstall with bun"

# Process management
a "check if port 3000 is in use and kill the process"

# File operations
a "find all .log files and delete ones older than 7 days"
```

## How It Works

1. `a` wraps the `cursor-agent --output-format stream-json` command
2. Parses the streaming JSON responses in real-time
3. Formats each event type (system info, messages, tool calls, results) as Markdown
4. Renders the Markdown with ANSI colors using `marked-terminal`
5. Intelligently truncates large outputs to keep things readable

The result: a clean, professional terminal AI experience instead of raw JSON noise.

## Configuration

### Environment Variables

- `A_MARKDOWN` - Set to `0` to disable Markdown rendering
- `A_MAX_SECTION_LINES` - Maximum lines per section (default: 200)
- `A_MAX_SECTION_CHARS` - Maximum characters per section (default: 8000)

### Model Selection

Specify any Cursor-supported model:

```bash
a --model composer-1 "fast task"
a --model claude-opus "complex analysis"
a --model gpt-4 "alternative model"
```

## Direct Execution

You can also run the script directly:

```bash
bun run index.ts "your prompt here"
bun run a "your prompt here"
```

## Contributing

Issues and pull requests welcome at [github.com/johnlindquist/cursor-alias](https://github.com/johnlindquist/cursor-alias)

## License

MIT

---

**Warning:** Installing this package creates a global command called `a`. This means typing `a "anything"` in your terminal will immediately invoke the Cursor AI agent. Make sure you're comfortable with this single-letter alias before running `bun link`.
