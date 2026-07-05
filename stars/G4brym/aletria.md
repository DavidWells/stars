---
repo: G4brym/aletria
url: 'https://github.com/G4brym/aletria'
homepage: 'http://npmjs.com/aletria'
starredAt: '2025-02-20T23:42:35Z'
createdAt: '2025-02-14T12:04:35Z'
updatedAt: '2025-02-22T06:10:20Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:07.274Z'
description: 'Simple AI CLI that generates docs, unit tests and README.md files'
tags:
  - ai
  - cli
  - gemini
  - gemini-ai
  - generator
  - generator-ai
  - google
  - npm
---

# aletria

aletria is a CLI tool designed to help developers integrate AI-driven features into their codebases. Leveraging the
impressive context size of Gemini 2.0, aletria automates the generation of unit tests, project documentation, and README
files, streamlining your development workflow.

A big focus of this project is privacy.
 - No data (except the generated docs and code) is stored anywhere.
 - Your API key is only stored in memory locally on your machine, meaning once the cli is closed there is no way to retrieve it.
 - Your code is only sent to Google API for inference, and nothing is sent to any other service.


**This is very much experimental work!!**
Please make sure you have commited your work before starting this tool, in order to avoid having files edited that you didn't want.

## Features

- **Multi-File Documentation Generation**
  Combine your source code, unit tests, README.md, and other files to produce detailed, markdown-based documentation for
  your project.

### Coming up features
This is not available yet, but will soon!
- **AI-Powered Unit Test Generation**
  Automatically parse your source code files and generate comprehensive unit tests.

- **Dynamic README Generation**
  Generate a professional project README.md by parsing your source code, unit tests, and a brief description of your
  project.

## Getting Started

### Prerequisites

- At least Node.js 20
- A Google AI Studio API key

### Installation

```bash
npx aletria@latest
```

### Configuration

aletria requires a Google AI Studio API key, this will either be retrieved from the environment using the name `GOOGLE_API_KEY`
or the tool, will ask you to fill the key when starting a task.

You may define the inline while calling, like this:
```bash
GOOGLE_API_KEY=your_api_key_here npx aletria@latest
```

## Usage

aletria provides a simple CLI interface to execute its main functions. Here’s how you can get started:

### 1. Generate Documentation

Parse your source code, unit tests, README.md, and additional project files to generate comprehensive markdown
documentation:

```bash
npx aletria@latest generate-docs -i ./src -o ./docs
```

### 2. Generate Unit Tests

**This is not available yet!**

Parse all source code files and generate unit tests:

```bash
npx aletria@latest generate-tests -i ./src -o ./tests
```

### 3. Generate Project README

**This is not available yet!**

Generate a project README.md by parsing your source code, unit tests, and a brief project description:

```bash
npx aletria@latest generate-readme -i ./src -i ./package.json -o ./README.md
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
