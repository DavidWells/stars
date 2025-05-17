---
repo: sachaarbonel/repo_walker
url: 'https://github.com/sachaarbonel/repo_walker'
homepage: ''
starredAt: '2025-05-11T19:49:43Z'
createdAt: '2024-07-04T06:38:08Z'
updatedAt: '2025-05-12T12:38:46Z'
language: Rust
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-17T22:30:16.640Z'
description: >-
  Code context extractor for AI assistants. Walks Git repos, respects
  .gitignore, filters files. Optimized output for LLMs like Claude. Supports
  diff comparisons.
tags: []
---

# Repo Walker

Repo Walker is a command-line tool for analyzing Git repositories and formatting the output for easy use with Large Language Models (LLMs) like Anthropic's Claude. It's designed to work seamlessly with clipboard utilities like `pbcopy`, allowing you to quickly provide context to AI assistants.

## Features

- Compare changes between Git tags, branches, or commits
- Filter files by extension
- Apply regex pattern matching to file contents
- Handle non-UTF-8 file contents
- Strip comments from supported languages (Rust, JavaScript, Go)
- Beautiful, structured output with:
  - Directory tree visualization
  - Line-numbered file contents
  - Syntax highlighting
  - Token counting for LLM context windows
- Easy integration with clipboard utilities

## Installation

Ensure you have Rust and Cargo installed on your system. Then, clone this repository and build the project:

```bash
cargo install --git https://github.com/sachaarbonel/repo_walker.git
```

## Usage

### Basic Usage

```bash
repo_walker --path /path/to/repo [OPTIONS] | pbcopy
```

This command will analyze the repository and copy the output to your clipboard, ready to paste into an AI assistant chat.

### Compare two Git revisions

```bash
repo_walker --path /path/to/repo --git-from v1.0 --git-to v2.0 [OPTIONS] | pbcopy
```

### Options

- `--path, -p <PATH>`: Path to the Git repository (required)
- `--pattern, -m <REGEX>`: Regex pattern to filter file contents
- `--extensions, -e <EXT1,EXT2,...>`: Comma-separated list of file extensions to include
- `--context-lines, -c <NUM>`: Number of context lines to show (default: 3)
- `--git-from <REVISION>`: Starting Git revision for comparison
- `--git-to <REVISION>`: Ending Git revision for comparison
- `--excludes <PATTERN1,PATTERN2,...>`: Patterns to exclude from results
- `--strip-comments`: Remove comments from supported languages (Rust, JavaScript, Go)

## Output Format

The tool provides a structured, easy-to-read output format:

```
================================================================
Repository Snapshot: repo_name @ current
================================================================

Directory Structure
================================================================
src/
  ├── main.rs
  ├── lib.rs
  └── modules/
      └── core.rs

================================================================================
File: src/main.rs (≈125 tokens)
================================================================================
   1│ fn main() {
   2│     println!("Hello, world!");
   3│ }

Analysis Summary
================================================================
Total tokens processed: 125
GPT-4 context window sizes for reference:
- 8K context: 1.5% used (125/8192)
- 32K context: 0.4% used (125/32768)
```

### Token Counting

The tool now includes token counting using the tiktoken library (the same tokenizer used by GPT models), which helps you:
- Track token usage per file
- Get total token count for all processed files
- See token usage as a percentage of common GPT context windows (8K and 32K)

This feature is particularly useful when preparing code for AI analysis, as it helps you stay within model context limits.

## Examples

1. Walk through a repository, showing only Rust files:
   ```bash
   repo_walker --path /path/to/repo --extensions rs | pbcopy
   ```

2. Search for specific patterns with context:
   ```bash
   repo_walker --path /path/to/repo --pattern "fn.*main" --context-lines 5 | pbcopy
   ```

3. Compare Git revisions, excluding test files:
   ```bash
   repo_walker --path /path/to/repo --git-from main --git-to feature-branch --excludes "*_test.rs,*_spec.rs" | pbcopy
   ```

4. View code with comments stripped:
   ```bash
   repo_walker --path /path/to/repo --strip-comments --extensions rs,js,go | pbcopy
   ```

## Integration with AI Assistants

Repo Walker is particularly useful when working with AI assistants that have token limits. The tool helps you:
1. Stay within context window limits with accurate token counting
2. Provide well-structured code context
3. Focus on relevant parts of your codebase
4. Track token usage to optimize your prompts
5. Remove comments to focus on code logic and save tokens

## Error Handling

- Non-UTF-8 files are skipped with appropriate warnings
- Binary files are automatically detected and excluded
- Invalid Git revisions are reported with clear error messages
- File access errors are handled gracefully

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
