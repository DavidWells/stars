---
repo: johnlindquist/pack
url: 'https://github.com/johnlindquist/pack'
homepage: null
starredAt: '2025-09-05T00:41:32Z'
createdAt: '2025-08-15T13:48:48Z'
updatedAt: '2025-09-23T16:40:17Z'
language: JavaScript
license: NA
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-10-18T22:29:48.089Z'
description: >-
  Smart file filter for Repomix - search and bundle only files containing
  specific strings
tags: []
---

# Packx - Smart File Filter and Bundler

[![npm version](https://badge.fury.io/js/packx.svg)](https://www.npmjs.com/package/packx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Packx is a powerful CLI tool that filters repository files by content and extension before bundling them for AI consumption. Search for specific strings in your codebase and bundle only the files that match - perfect for providing focused context to LLMs.

```bash
# Quick install
npm install -g packx

# Create a config template
packx init

# Search and bundle
packx -s "useState" -e "tsx" -o react-hooks.md
```

## Features

- 🔍 **Content-based filtering** - Only include files containing specific strings
- 📁 **Smart defaults** - Searches common code files automatically (no extension flag needed!)
- 🎨 **Flexible extensions** - Optionally filter by specific file types
- 🔧 **Config files** - Save and reuse search patterns
- ✂️ **Context lines** - Limit output to N lines around each match for focused results
- ⚡ **Fast** - Direct file processing without external dependencies
- 🎯 **Precise** - Search for multiple strings with special character support
- 📊 **Smart merging** - Overlapping context windows are automatically merged

## Installation

### Option 1: Install from npm (Recommended)

Works on Mac, Windows, and Linux with Node.js 18+:

```bash
# Install globally
npm install -g packx

# Or with yarn
yarn global add packx

# Or with pnpm
pnpm add -g packx

# Now use it anywhere
packx --help
pack --help  # Also available as 'pack'
```

### Option 2: Build from Source

Prerequisites:
- [Bun](https://bun.sh) (for building)
- [Repomix](https://github.com/yamadashy/repomix) (installed automatically)

```bash
# Clone the repository
git clone https://github.com/johnlindquist/pack.git
cd pack

# Install dependencies
bun install

# Build the executable
bun run compile

# Test it works
./bin/pack --help
```

### Local Installation Options (for source builds)

#### Option 1: Add the bin directory to PATH

```bash
# Add to ~/.zshrc or ~/.bashrc
echo 'export PATH="$HOME/dev/pack/bin:$PATH"' >> ~/.zshrc

# Reload shell configuration
source ~/.zshrc

# Now you can use pack from anywhere
pack --help
```

#### Option 2: Global link with Bun

```bash
# Create global link
bun link

# Use from anywhere
pack --help
```

#### Option 3: Copy to system bin

```bash
# Copy to local bin (create if doesn't exist)
mkdir -p ~/.local/bin
cp bin/pack ~/.local/bin/

# Make sure ~/.local/bin is in your PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Usage

### Quick Start

```bash
# Create a search config
packx init my-search

# Edit it with your patterns
nano my-search.ini

# Run the search
packx -f my-search.ini -o results.md
```

### Basic Usage

Search for strings across all common code files (default):

```bash
packx -s "TODO" -s "FIXME"
```

Search in specific file types:

```bash
packx -s "useState" -s "useEffect" -e "ts,tsx"
```

### Context Lines

Extract only the surrounding context instead of entire files:

```bash
# Show 10 lines around each TODO comment
packx -s "TODO" -l 10 -o todos.md

# Get focused context for debugging
packx -s "error" -s "exception" -l 50 --style markdown

# Minimal context for quick review
packx -s "FIXME" -l 3
```

### Preview Mode

See which files match before bundling:

```bash
pack -s "console.log" -e "js,ts" --preview
```

### Exclude Files

Exclude TypeScript declaration files:

```bash
pack -s "interface" -e "ts" -x "d.ts"
```

### With Repomix Options

All Repomix flags work seamlessly:

```bash
pack -s "TODO" -s "FIXME" -e "ts,tsx" \
  --compress \
  --style xml \
  -o todos.xml \
  --remove-comments
```

## Examples

### Find React Hooks

```bash
pack -s "useState" -s "useEffect" -s "useCallback" \
     -e "tsx,jsx" \
     -x "test.tsx,spec.tsx" \
     -o react-hooks.md
```

### Search with Special Characters

Strings can contain any characters including commas, brackets, and spaces:

```bash
pack -s "array[index]" -s "foo,bar" -s "hello world" -e "js"
```

### Multiple Extension Formats

Use multiple flags or comma-separated values:

```bash
# Multiple flags
pack -s "import" -e "ts" -e "tsx" -e "jsx"

# Comma-separated
pack -s "import" -e "ts,tsx,jsx"

# Mixed
pack -s "import" -e "ts,tsx" -e "jsx,js"
```

## Config Files

Save your search patterns in reusable config files.

### Quick Start with Config Files

```bash
# Create a config file template (creates pack-config.ini)
packx init

# Or specify a custom filename
packx init my-search
packx init focused-flag
packx init api-endpoints.config

# Edit the created file
nano pack-config.ini

# Use the config file
packx -f pack-config.ini
```

### Config File Format

The config file uses a simple INI-like format:

```ini
# Comments start with #

[search]
useState
useEffect
componentDidMount

[extensions]
ts
tsx
jsx

[exclude]
d.ts
test.ts
spec.ts
```

### Using Config Files

```bash
# Use config file
pack -f my-search.ini

# Combine with CLI arguments
pack -f my-search.ini -s "extraSearch" -o output.xml

# With Repomix options
pack -f my-search.ini --compress --style markdown

### Output to stdout

Use `--stdout` to write the packed content to stdout (useful for piping). Summaries are written to stderr:

```bash
packx -s "error" -l 2 --style markdown --stdout | tee errors.md

Note: By default, Packx now runs in summary-only mode and does not write content to a file. Use `-o <file>` to write to a file or `--stdout` to stream content.
```

### Path Globs and Files

You can pass directories, files, or globs as positional args. Globs restrict the search scope and work with or without `-e`:

```bash
# Only shell scripts in scripts/
packx scripts/*.sh --preview

# All Markdown anywhere
packx "**/*.md" -s "TODO" --style markdown

# Single file
packx README.md -s "Features"
```

Note: Explicit include globs/files override `-x` excludes for those matches (e.g., `packx "**/*.ini" -x ini` still includes the `.ini` files you asked for).

### Example Config Files

**console-logs.ini** - Find all console statements:
```ini
[search]
console.log
console.error
console.warn
console.debug

[extensions]
js
ts
jsx
tsx

[exclude]
node_modules
dist
build
```

**api-calls.ini** - Find API and network calls:
```ini
[search]
fetch(
axios
$.ajax
XMLHttpRequest
/api/
endpoint
apiKey

[extensions]
ts
tsx
js
jsx

[exclude]
test.
spec.
mock.
```

**react-hooks.ini** - Find React hooks:
```ini
[search]
useState
useEffect
useCallback
useMemo
useRef
useContext

[extensions]
tsx
jsx

[exclude]
d.ts
test.tsx
__tests__
```

## CLI Options

### Pack Options

| Option | Short | Description |
|--------|-------|-------------|
| `--strings` | `-s` | Search string (use multiple times) |
| `--exclude-strings` | `-S` | Exclude files containing these strings |
| `--extensions` | `-e` | Extensions to include (optional, defaults to common code files) |
| `--exclude-extensions` | `-x` | Extensions to exclude (multiple or comma-separated) |
| `--file` | `-f` | Read configuration from file |
| `--lines` | `-l` | Number of lines around each match (default: entire file) |
| `--prompt` | `-p` | Append a Markdown prompt at the end of the packed output |
| `--prompt-path` |  | Append the contents of a file as the prompt |
| `--case-sensitive` | `-C` | Make search case-sensitive (default: off) |
| `--preview` | | Preview matched files without packing |
| `--copy` | `-c` | Copy output to clipboard |
| `--help` | `-h` | Show help |
| `--version` | `-v` | Show version |

### Default Extensions

When no `-e` flag is specified, packx searches these file types:

- **Languages**: js, jsx, ts, tsx, mjs, cjs, py, rb, go, java, cpp, c, h, rs, swift, kt, scala, php
- **Web Frameworks**: vue, svelte, astro
- **Styles**: css, scss, less
- **Config**: json, yaml, yml, toml, xml
- **Documentation**: md, mdx, txt
- **Scripts**: sh, bash, zsh, fish
- **Data**: sql, graphql, gql

### Repomix Pass-through Options

All Repomix options work as normal:

- `--compress` - Compress output
- `--style <type>` - Output style (xml, markdown, plain)
- `-o <file>` - Output filename
- `--remove-comments` - Remove comments from code
- `--token-count-tree` - Show token counts
- `--instruction-file-path <file>` - Custom instructions file
- And many more...

## Build from Source

```bash
# Clone repository
git clone https://github.com/johnlindquist/pack.git
cd pack

# Install dependencies
bun install

# Build for current platform
bun run compile

# Build for specific platforms
bun run compile:macos     # Intel Mac
bun run compile:macos-arm  # Apple Silicon
bun run compile:linux      # Linux x64
bun run compile:linux-arm  # Linux ARM64
bun run compile:windows    # Windows x64

# Build for all platforms
bun run compile:all
```

## Use Cases

### 1. Focused Debugging Context

Extract just the error handling code for AI analysis:

```bash
packx -s "catch" -s "error" -s "exception" \
      -l 20 \
      -o error-handling.md \
      --style markdown
```

### 2. Code Review Preparation

Bundle only files containing specific feature flags:

```bash
packx -s "FEATURE_FLAG_NEW_UI" -s "experimentalFeature" \
      -e "ts,tsx" \
      -o feature-review.md \
      --style markdown
```

### 3. Security Audit

Find all files with potential security concerns:

```bash
pack -s "apiKey" -s "secret" -s "password" -s "token" \
     -e "js,ts,env,json" \
     -x "test.js,spec.js" \
     -o security-audit.xml
```

### 4. Migration Planning

Identify files using deprecated APIs:

```bash
pack -s "componentWillMount" -s "componentWillReceiveProps" \
     -e "jsx,tsx" \
     -o deprecated-apis.md
```

### 5. Documentation Generation

Extract all files with TODO comments:

```bash
pack -s "TODO" -s "FIXME" -s "HACK" -s "XXX" \
     -e "ts,tsx,js,jsx" \
     --remove-comments \
     -o todos.md
```

## Tips

1. **Use preview mode** (`--preview`) to verify matches before generating output
2. **Combine config files with CLI args** for maximum flexibility
3. **Store common patterns** in config files for team sharing
4. **Use exclude patterns** to skip test and build files
5. **Special characters** in search strings work perfectly (no escaping needed)

## Troubleshooting

### Command not found

Make sure the bin directory is in your PATH:

```bash
echo $PATH | grep -q "pack/bin" && echo "✓ In PATH" || echo "✗ Not in PATH"
```

### No files matched

- Use `-C` for case-sensitive matches when needed
- Verify extensions don't have extra dots (use `ts` not `.ts`)
- Use `--preview` to debug which files are being checked

### Large repositories

For very large repos, narrow the search scope:

```bash
# Search only in specific directories
pack -s "useState" -e "tsx" src/components src/hooks
```

## Contributing

Pull requests are welcome! Feel free to:

- Add new features
- Improve documentation
- Report bugs
- Suggest enhancements

## License

MIT

## Credits

Built on top of the excellent [Repomix](https://github.com/yamadashy/repomix) by @yamadashy.
