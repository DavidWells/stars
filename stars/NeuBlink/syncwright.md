---
repo: NeuBlink/syncwright
url: 'https://github.com/NeuBlink/syncwright'
homepage: null
starredAt: '2025-08-06T19:50:08Z'
createdAt: '2025-07-26T17:58:33Z'
updatedAt: '2025-08-06T19:50:09Z'
language: Go
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-23T22:30:26.953Z'
description: AI-powered Git merge conflict resolution tool
tags:
  - ai
  - automation
  - claude
  - cli-tool
  - devops
  - git
  - github-action
  - merge-conflicts
---

# Syncwright

**AI-powered Git merge conflict resolution tool**

Syncwright is a production-ready CLI tool and GitHub Action that automatically detects, analyzes, and resolves Git merge conflicts using AI assistance. It provides a safe, intelligent approach to conflict resolution while maintaining code quality and developer control.

## Key Features

- **Intelligent Conflict Detection** - Automatically scans repositories and identifies merge conflicts with detailed context
- **AI-Powered Resolution** - Uses Claude AI to provide context-aware conflict resolutions with confidence scoring
- **Multi-Language Support** - Handles Go, JavaScript/TypeScript, Python, Java, C/C++, and more
- **Safety First** - Automatic backups, confidence thresholds, and validation ensure safe resolutions
- **GitHub Actions Integration** - Seamless CI/CD workflow integration with composite action
- **Security Conscious** - Automatically filters sensitive files and credentials from AI processing
- **Comprehensive Validation** - Built-in syntax checking and project validation tools
- **Timeout & Retry Support** - Configurable timeout limits and retry mechanisms for reliability
- **Debug Mode** - Detailed logging for troubleshooting and development

## Quick Start

### As GitHub Action (Recommended)

Add Syncwright to your workflow to automatically resolve merge conflicts in pull requests:

```yaml
name: Auto-resolve conflicts
on:
  pull_request:

jobs:
  resolve:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: neublink/syncwright@v1.0.3
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
```

## 🔑 Token Setup (Required for AI Features)

### Step 1: Generate Claude Code OAuth Token

1. **Visit Claude Code Console**: Go to [console.anthropic.com](https://console.anthropic.com)
2. **Login/Create Account**: Sign in with your Anthropic account
3. **Navigate to API Keys**: Go to Settings → API Keys
4. **Create New Key**: Click "Create Key" 
5. **Name Your Key**: Use a descriptive name like "Syncwright GitHub Action"
6. **Copy Token**: Save the token securely (starts with `sk-ant-oat01-...`)

### Step 2: Add Token to GitHub Repository

1. **Go to Repository Settings**: Navigate to your repo → Settings
2. **Access Secrets**: Click "Secrets and variables" → "Actions"  
3. **Add New Secret**: Click "New repository secret"
4. **Configure Secret**:
   - **Name**: `CLAUDE_CODE_OAUTH_TOKEN`
   - **Value**: Your Claude Code OAuth token from Step 1
5. **Save**: Click "Add secret"

### Step 3: Verify Token Setup

```yaml
# Test your token setup with this minimal workflow
name: Test Syncwright Token
on: workflow_dispatch

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: neublink/syncwright@v1.0.3
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          run_validation: true
```

### ⚠️ Security Notes

- **Never commit tokens**: Keep tokens in GitHub Secrets only
- **Rotate regularly**: Generate new tokens every 90 days
- **Scope appropriately**: Use dedicated tokens for different projects
- **Monitor usage**: Check API usage in Claude Code Console

### As CLI Tool

Install and use Syncwright directly:

```bash
# Install via script (recommended)
curl -fsSL https://raw.githubusercontent.com/NeuBlink/syncwright/main/scripts/install.sh | bash

# Or install via Go
go install github.com/NeuBlink/syncwright/cmd/syncwright@latest

# Detect conflicts
syncwright detect --verbose

# Generate AI payload
syncwright payload --in conflicts.json --out payload.json

# Apply AI resolutions
export CLAUDE_CODE_OAUTH_TOKEN="your-token"
syncwright ai-apply --in payload.json --verbose

# Format resolved files
syncwright format --recent

# Validate changes
syncwright validate --comprehensive
```

## Installation Options

### GitHub Action (Composite)

Use Syncwright as a reusable GitHub Action:

```yaml
- uses: neublink/syncwright@v1.0.3
  with:
    claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
    merge_failed: true  # Set to true when merge conflicts detected
    pr_number: ${{ github.event.number }}
    base_branch: ${{ github.base_ref }}
    head_branch: ${{ github.head_ref }}
    timeout_seconds: 300  # Maximum execution time (default: 300)
    max_retries: 3        # Retry attempts for failed operations (default: 3)
    debug_mode: false     # Enable detailed debug logging (default: false)
```

### Binary Installation

**Automated Script (Linux/macOS/Windows)**
```bash
curl -fsSL https://raw.githubusercontent.com/NeuBlink/syncwright/main/scripts/install.sh | bash
```

**Manual Download**
Download pre-compiled binaries from [GitHub Releases](https://github.com/NeuBlink/syncwright/releases)

**Go Install**
```bash
go install github.com/NeuBlink/syncwright/cmd/syncwright@latest
```

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `CLAUDE_CODE_OAUTH_TOKEN` | Claude Code OAuth token for AI operations | Yes* | - |
| `SYNCWRIGHT_MAX_TOKENS` | Maximum tokens for AI processing | No | unlimited |
| `SYNCWRIGHT_DEBUG` | Enable debug logging | No | false |
| `SYNCWRIGHT_VERSION` | Specific version to install | No | latest |

*Required only for AI-powered operations

### GitHub Action Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `claude_code_oauth_token` | Claude Code OAuth token | No | - |
| `run_validation` | Run validation checks | No | true |
| `max_tokens` | Maximum tokens for AI processing (-1 for unlimited) | No | -1 |
| `merge_failed` | Whether automatic merge failed | No | false |
| `pr_number` | Pull request number | No | - |
| `base_branch` | Base branch name | No | - |
| `head_branch` | Head branch name | No | - |
| `timeout_seconds` | Maximum execution time in seconds | No | 300 |
| `max_retries` | Maximum number of retry attempts | No | 3 |
| `debug_mode` | Enable detailed debug logging | No | false |

### CLI Configuration

```bash
# Set confidence threshold (0.0-1.0)
syncwright ai-apply --confidence-threshold 0.8

# Enable verbose output with timeout control
syncwright detect --verbose --timeout 600

# Specify output format with retry logic
syncwright validate --format json --out results.json --max-retries 5

# Dry run mode with extended timeout
syncwright ai-apply --dry-run --timeout 900

# Debug mode for troubleshooting
syncwright resolve --ai --verbose --debug
```

## Workflow Examples

### Standard GitHub Actions Workflow

```yaml
name: Syncwright Conflict Resolution

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  resolve-conflicts:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    permissions:
      contents: write
      pull-requests: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Attempt merge
        id: merge
        continue-on-error: true
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          
          # Attempt to merge base branch
          if ! git merge origin/${{ github.base_ref }}; then
            echo "merge_failed=true" >> $GITHUB_OUTPUT
          else
            echo "merge_failed=false" >> $GITHUB_OUTPUT
          fi
      
      - name: Resolve conflicts with Syncwright
        if: steps.merge.outputs.merge_failed == 'true'
        uses: neublink/syncwright@v1
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          merge_failed: true
          pr_number: ${{ github.event.number }}
          base_branch: ${{ github.base_ref }}
          head_branch: ${{ github.head_ref }}
          run_validation: true
          timeout_seconds: 600  # Extended timeout for large repositories
          max_retries: 3        # Retry failed operations
          debug_mode: false     # Enable for troubleshooting
          # max_tokens: -1      # unlimited by default
```

### CLI Workflow

```bash
#!/bin/bash
# Complete conflict resolution workflow

set -e

echo "🔍 Detecting conflicts..."
syncwright detect --verbose --out conflicts.json

if [ ! -s conflicts.json ] || [ "$(jq '.conflicts | length' conflicts.json)" -eq 0 ]; then
    echo "✅ No conflicts detected"
    exit 0
fi

echo "📦 Building AI payload..."
syncwright payload --in conflicts.json --out payload.json

echo "🤖 Applying AI resolutions..."
syncwright ai-apply --in payload.json --confidence-threshold 0.7 --verbose

echo "🎨 Formatting resolved files..."
syncwright format --recent --verbose

echo "✅ Validating changes..."
syncwright validate --comprehensive --verbose

echo "🎉 Conflict resolution complete!"
```

## Security Considerations

Syncwright is designed with security as a priority:

- **Sensitive Data Protection** - Automatically excludes files containing API keys, passwords, and credentials
- **Selective Processing** - Only conflict regions are sent to AI, not entire files
- **Backup Creation** - Automatic backups before any modifications
- **Confidence Scoring** - AI resolutions include confidence levels; low-confidence changes can be rejected
- **Local Processing** - Most operations run locally; only conflict context sent to AI service
- **Token Security** - OAuth tokens are handled securely and never logged

See [SECURITY.md](SECURITY.md) for detailed security information.

## Troubleshooting

### Common Issues

**Q: "No conflicts detected" but I see conflict markers**
```bash
# Ensure you're in a Git repository
git status

# Check if files are properly staged
git add .

# Re-run detection
syncwright detect --verbose
```

**Q: "AI resolution failed with authentication error"**
```bash
# Verify token is set
echo $CLAUDE_CODE_OAUTH_TOKEN

# Check token permissions
# Token needs access to Claude Code API
```

**Q: "Binary not found" in GitHub Actions**
```bash
# Ensure installation step completed
./syncwright --version

# Check PATH includes workspace
echo $PATH | grep workspace
```

**Q: "Confidence too low" rejecting all resolutions**
```bash
# Lower confidence threshold
syncwright ai-apply --confidence-threshold 0.5

# Review conflicts manually
syncwright ai-apply --dry-run --verbose
```

**Q: "Operation timed out" errors**
```bash
# Increase timeout for large repositories
syncwright resolve --ai --timeout 900

# Enable retries for reliability
syncwright resolve --ai --max-retries 5
```

**Q: "Retry attempts exceeded" failures**
```bash
# Check network connectivity and API status
curl -I https://api.anthropic.com

# Increase timeout and retry settings
syncwright resolve --ai --timeout 600 --max-retries 10
```

### Debug Mode

Enable detailed logging:

```bash
export SYNCWRIGHT_DEBUG=true
syncwright detect --verbose
```

Or in GitHub Actions:
```yaml
- uses: neublink/syncwright@v1.0.3
  with:
    claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
    debug_mode: true
    timeout_seconds: 600  # Extended timeout for debugging
```

### Getting Help

- Check [USAGE.md](USAGE.md) for detailed examples
- Review [GitHub Issues](https://github.com/NeuBlink/syncwright/issues) for known problems
- Enable verbose mode (`--verbose`) for detailed output
- Use dry-run mode (`--dry-run`) to preview changes

## Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository** and create a feature branch
2. **Write tests** for new functionality
3. **Follow Go conventions** and run `go fmt`
4. **Update documentation** as needed
5. **Submit a pull request** with clear description

### Development Setup

```bash
# Clone repository
git clone https://github.com/NeuBlink/syncwright.git
cd syncwright

# Install dependencies
go mod download

# Run tests
make test

# Build binary
make build

# Test locally
./bin/syncwright --version
```

### Code Structure

```
syncwright/
├── cmd/syncwright/     # CLI entry point
├── internal/
│   ├── commands/       # Command implementations
│   ├── gitutils/       # Git operations
│   ├── payload/        # AI payload generation
│   └── validate/       # Validation logic
├── scripts/            # Installation and utilities
└── action.yml          # GitHub Action definition
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [USAGE.md](USAGE.md), [SECURITY.md](SECURITY.md)
- **Issues**: [GitHub Issues](https://github.com/NeuBlink/syncwright/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NeuBlink/syncwright/discussions)

---

**Syncwright** - Making merge conflicts a thing of the past with AI-powered resolution.
