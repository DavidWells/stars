---
repo: eser/ajancli
url: 'https://github.com/eser/ajancli'
homepage: null
starredAt: '2025-11-19T19:15:50Z'
createdAt: '2025-06-14T20:20:12Z'
updatedAt: '2025-11-19T19:15:50Z'
language: Go
license: NOASSERTION
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:54.565Z'
description: null
tags: []
---

# AjanCLI

A CLI tool for managing Go components and libraries, inspired by `shadcn/ui`. AjanCLI helps you add reusable components and libraries to your Go projects from a centralized GitHub registry.

## Features

- 🚀 **Easy Installation**: Add components with a single command
- 📦 **Component Registry**: Centralized registry hosted on GitHub
- 🔄 **Interactive Selection**: Choose components interactively or via CLI arguments
- 🗂️ **Organized Structure**: Components are installed in your `pkg/` directory
- ✅ **Version Tracking**: Keep track of installed components
- 🎨 **Beautiful CLI**: Colored output and progress bars
- 🔧 **Configurable**: Customize registry URL and installation paths

## Installation

### From Source

```bash
git clone https://github.com/eser/ajancli.git
cd ajancli
make build
sudo mv bin/ajancli /usr/local/bin/
```

### Using Go Install

```bash
go install github.com/eser/ajancli@latest
```

## Quick Start

1. **Initialize a new project**:
   ```bash
   ajancli init
   ```

2. **List available components**:
   ```bash
   ajancli list
   ```

3. **Add a component**:
   ```bash
   ajancli add connfx
   ```

4. **Add multiple components**:
   ```bash
   ajancli add connfx logger validator
   ```

5. **Interactive component selection**:
   ```bash
   ajancli add
   ```

## Commands

### `ajancli init`

Initialize a new ajancli project by creating configuration and directory structure.

```bash
ajancli init [flags]

Flags:
  -f, --force        force initialization even if config exists
  -p, --path string  path to initialize the project (default ".")
```

**Example:**
```bash
# Initialize in current directory
ajancli init

# Initialize in a specific directory
ajancli init --path ./my-project

# Force reinitialize existing project
ajancli init --force
```

### `ajancli add`

Add one or more components to your project.

```bash
ajancli add [components...] [flags]

Flags:
  -a, --all         add all available components
  -o, --overwrite   overwrite existing files
  -p, --path string custom path to add components
  -y, --yes         skip confirmation prompts
```

**Examples:**
```bash
# Add a single component
ajancli add connfx

# Add multiple components
ajancli add connfx logger validator

# Add all components
ajancli add --all

# Interactive selection (no arguments)
ajancli add

# Skip confirmation
ajancli add connfx --yes

# Overwrite existing files
ajancli add connfx --overwrite
```

### `ajancli list`

List available or installed components.

```bash
ajancli list [flags]

Flags:
  -f, --format string   output format (table, json) (default "table")
  -i, --installed       list only installed components
```

**Examples:**
```bash
# List all available components
ajancli list

# List installed components only
ajancli list --installed

# Output as JSON
ajancli list --format json
```

### `ajancli remove`

Remove components from your project.

```bash
ajancli remove [components...] [flags]

Flags:
  -f, --force   force removal without confirmation
  -y, --yes     skip confirmation prompts
```

**Examples:**
```bash
# Remove a single component
ajancli remove connfx

# Remove multiple components
ajancli remove connfx logger

# Force removal without confirmation
ajancli remove connfx --force
```

## Global Flags

- `--config string`: config file (default is $HOME/.ajancli.yaml)
- `--registry string`: registry URL (default: https://raw.githubusercontent.com/eser/ajancli/main/registry.json)
- `-v, --verbose`: verbose output

## Configuration

AjanCLI creates an `ajancli.json` configuration file in your project:

```json
{
  "registry": "https://raw.githubusercontent.com/eser/ajancli/main/registry.json",
  "componentsDir": "pkg",
  "pkgDir": "pkg",
  "installed": [
    "connfx",
    "logger"
  ],
  "metadata": {
    "created_by": "ajancli",
    "version": "1.0.0"
  }
}
```

## Registry Format

The registry is a JSON file that defines available components:

```json
{
  "components": {
    "connfx": {
      "files": [
        {
          "kind": "folder",
          "provider": "github",
          "source": "github.com/eser/ajan/tree/main/connfx",
          "target": "pkg/ajan/connfx"
        }
      ]
    },
    "logger": {
      "files": [
        {
          "kind": "file",
          "provider": "github",
          "source": "github.com/eser/ajan/tree/main/logger/logger.go",
          "target": "pkg/ajan/logger/logger.go"
        }
      ]
    }
  }
}
```

### Registry Schema

- **components**: Object containing component definitions
  - **[component-name]**: Component definition
    - **files**: Array of files/folders to install
      - **kind**: "file" or "folder"
      - **provider**: "github" (more providers may be supported in the future)
      - **source**: GitHub URL in format `github.com/owner/repo/tree/branch/path`
      - **target**: Target path in your project (relative to project root)

## Project Structure

After initialization, your project will have:

```
your-project/
├── ajancli.json          # Configuration file
├── pkg/                  # Components directory
│   ├── .gitkeep         # Ensures directory is tracked by git
│   └── ajan/            # Installed components
│       ├── connfx/      # Example component
│       └── logger/      # Example component
```

## Development

### Prerequisites

- Go 1.21 or later
- Make (optional, for using Makefile commands)

### Building

```bash
# Build for current platform
make build

# Build for all platforms
make build-all

# Install to GOPATH/bin
make install
```

### Testing

```bash
# Run tests
make test

# Run tests with coverage
make test-coverage

# Run linter
make lint
```

### Project Commands

```bash
# Show all available commands
make help

# Clean build files
make clean

# Tidy go modules
make tidy

# Download dependencies
make deps

# Create example project
make init-example

# Run demo
make demo
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Architecture

AjanCLI follows hexagonal architecture principles:

- **cmd/**: CLI commands and entry points
- **pkg/**: Core application logic
  - **config/**: Configuration management
  - **logger/**: Structured logging
  - **project/**: Project initialization and management
  - **registry/**: Component registry operations, installation, and removal

## Error Handling

AjanCLI uses Go's error handling best practices:

- Sentinel errors for specific conditions
- Error wrapping with context
- Consistent error messages with structured context

Example error messages:
```
Error: component not found (name="nonexistent")
Error: installation failed: failed to create directory "pkg/example": permission denied
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/) for the CLI design and workflow
- Built with [Cobra](https://github.com/spf13/cobra) for CLI framework
- Uses [Survey](https://github.com/AlecAivazis/survey) for interactive prompts 
