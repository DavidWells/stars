---
repo: johnlindquist/get-rules
url: 'https://github.com/johnlindquist/get-rules'
homepage: null
starredAt: '2025-06-18T22:58:00Z'
createdAt: '2025-05-06T19:34:13Z'
updatedAt: '2025-06-28T03:37:16Z'
language: TypeScript
license: NA
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-28T22:31:13.664Z'
description: >-
  Downloads .mdc rule files for Cursor from johnlindquist/rules-for-tools
  repository.
tags: []
---

# get-rules

An npm utility to quickly download and install the latest `.mdc` rule files for AI-assisted coding tools (like Cursor) from John Lindquist's [get-rules](https://github.com/johnlindquist/get-rules) repository.

## Installation

Install the tool globally using npm:

```bash
npm install -g get-rules
```
Or, if you prefer to use it on a per-project basis without global installation, you can use `npx`:
```bash
npx get-rules
```

## Usage

Navigate to the root directory of your project where you want to install/update the rules, and then run:

```bash
get-rules
```

This will:
1. Connect to the GitHub API to fetch the list of files in the [johnlindquist/get-rules](https://github.com/johnlindquist/get-rules) repository.
2. Identify all `.mdc` (Markdown Custom) rule files across the organized directory structure.
3. Create a `.cursor/rules` directory hierarchy in your current working directory (if it doesn't exist).
4. Download each `.mdc` file into its proper location within `.cursor/rules`, skipping any that already exist locally. This ensures you always get the latest versions of new rules without overwriting local modifications.

## Rules Structure

The rules are organized into categories for better maintainability:

```
.cursor/rules/
├── _/                      # Personal rules (gitignored)
├── _always/                # Always-applied global rules
│   ├── persona.mdc         # Core operating directives
│   ├── communication-style.mdc
│   ├── guiding-principles.mdc
│   └── ...
├── _globs/                 # Rules organized by file patterns
│   └── react/              # React-specific rules
├── cli/                    # Command-line tool usage
├── docs/                   # Documentation generation
├── git/                    # Git workflows
├── task/                   # Task planning and execution
└── ...                     # Other categories
```

### Key Directories

- **`_/`** - Reserved for personal rules (not tracked by Git)
- **`_always/`** - Global rules that apply to all operations
- **`_globs/`** - Rules organized by file patterns they apply to
- **`cli/`** - Command-line tool configurations
- **`docs/`** - Documentation generation and maintenance
- **`git/`** - Git workflows and version control
- **`task/`** - Task planning and execution patterns

## Customization

See [PERSONALIZATION.md](.cursor/rules/PERSONALIZATION.md) in your `.cursor/rules` directory for information on:
- Creating personal rules in the `_/` directory
- Locally overriding team rules without affecting others
- Customizing AI behavior for your workflow

## How it Works

This tool is a self-contained Node.js script. It directly interacts with the GitHub API to list repository contents and then downloads the necessary `.mdc` files while preserving the directory structure. It does not rely on external shell scripts like `curl`, `bash`, or `powershell`.

## Contributing

Issues and pull requests are welcome! Please feel free to contribute to the [get-rules repository](https://github.com/johnlindquist/get-rules).

For the rules themselves, please contribute to the [get-rules repository](https://github.com/johnlindquist/get-rules).

## License

MIT License - Copyright (c) John Lindquist 
