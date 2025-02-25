---
repo: sam-goodwin/scoop
url: 'https://github.com/sam-goodwin/scoop'
homepage: ''
starredAt: '2025-01-16T19:32:08Z'
createdAt: '2025-01-15T20:33:10Z'
updatedAt: '2025-01-16T19:32:08Z'
language: TypeScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:14.002Z'
description: 'Scoop, Dump, Generate'
tags: []
---

# scoop

A CLI tool to scoop up file contents using glob patterns.

## Installation

```bash
bun install -g github:sam-goodwin/scoop
```

## Usage

Scoop has two main commands:

- `up` (default): scoop up file contents
- `ls`: list matching files without contents

```bash
# Basic glob pattern (using default 'up' command)
scoop "src/**/*.ts"
# or explicitly
scoop up "src/**/*.ts"

# List matching files without contents
scoop ls "src/**/*.ts"

# Multiple patterns
scoop up "src/**/*.ts" "lib/**/*.js"

# Exclude patterns with -e flag
scoop up "src/**/*" -e "src/**/*.test.ts"

# Multiple excludes
scoop up "**/*" -e "node_modules/**/*" -e "dist/**/*"

# Copy to clipboard with -c flag (works with both 'up' and 'ls')
scoop up "src/**/*.ts" -c
scoop ls "src/**/*.ts" -c

# Include files that match .gitignore patterns
scoop up "**/*" --include-gitignore
```

By default, scoop respects your .gitignore patterns, excluding any files that match. Use the `--include-gitignore` flag to include files that would normally be ignored.

The `up` command output includes file paths as comments followed by their contents:

```ts
// src/utils.ts
export function add(a: number, b: number): number {
  return a + b;
}

// src/main.ts
import { add } from "./utils";
console.log(add(1, 2));
```

All status messages are written to stderr, so you can safely pipe the output:

```bash
# Pipe to a file
scoop up "src/**/*.ts" > files.txt

# Pipe to another command
scoop up "src/**/*.ts" | grep "function"
```
