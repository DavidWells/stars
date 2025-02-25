---
repo: microchipgnu/prompt-format
url: 'https://github.com/microchipgnu/prompt-format'
homepage: null
starredAt: '2025-02-07T22:20:01Z'
createdAt: '2025-02-06T17:09:38Z'
updatedAt: '2025-02-22T03:19:06Z'
language: TypeScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:08.153Z'
description: null
tags: []
---

# 📜 Prompt Format

> Turn any Git repository into a prompt-friendly text ingest for LLMs

## 🌟 Features

- 📂 Process Git repositories from multiple sources:
  - GitHub repositories (using `user/repo` format)
  - Git URLs (HTTPS/HTTP/Git protocols)
  - Local repository paths
- 📝 Generate structured output including:
  - Repository summary (name, file count, total size)
  - Directory tree visualization
  - File contents with clear separators
- 🔍 Smart file filtering:
  - Include specific files with patterns
  - Extensive default ignore patterns for common non-source files
  - Customizable ignore patterns
- ⚡ Built-in safety limits:
  - Maximum file size (default: 10MB)
  - Maximum total size (500MB)
  - Maximum directory depth (20 levels)
  - Maximum file count (10,000 files)
- 🛡️ Automatic filtering of:
  - Binary files
  - Build outputs
  - Dependencies
  - Version control files
  - IDE configurations
  - Package lock files

## 🔧 Run

```bash
npx prompt-format
```

## 📦 Install

```bash
npm install -g prompt-format
```

## Basic usage with GitHub repository

```bash
npx prompt-format <git-repo-url>
```

## Clone specific branch

```bash
npx prompt-format <git-repo-url> -b main
```

## Process local repository

```bash
npx prompt-format ./path/to/local/repo
```

## Custom file size limit (in MB)

```bash
npx prompt-format <git-repo-url> -s 20
```


## 📋 Output Format

The tool generates three main sections:

1. **Summary**: Basic repository information including name, file count, and total size
2. **Tree**: Visual representation of the directory structure
3. **Content**: File contents with clear separators for easy parsing

## 🔒 Default Ignored Patterns

- Version Control: `.git`, `.svn`, `.hg`, etc.
- Build Outputs: `dist`, `build`, `out`, `target`
- Dependencies: `node_modules`, `bower_components`, `vendor`
- Package Files: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- IDE Files: `.idea`, `.vscode`, `.vs`
- Binary/Media Files: Images, videos, audio files
- Temporary Files: `.cache`, `.temp`, logs


