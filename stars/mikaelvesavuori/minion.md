---
repo: mikaelvesavuori/minion
url: 'https://github.com/mikaelvesavuori/minion'
homepage: ''
starredAt: '2025-01-14T07:46:01Z'
createdAt: '2023-08-27T12:23:37Z'
updatedAt: '2025-01-14T07:46:01Z'
language: Shell
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.636Z'
description: >-
  The easiest and most lightweight way for developers to use OpenAI APIs in a
  CLI.
tags:
  - ai
  - ai-developer-tools
  - chatgpt
  - cli
  - developer-tools
  - diagramming
  - llm
  - openai
  - openai-api
  - test-generation
---

# Minion: Minimalist CLI wrapper for OpenAI APIs 👾

## The easiest and most lightweight way for developers to use OpenAI APIs in a CLI.

Minion is a simple CLI wrapper that calls OpenAI APIs (of your choice) with prefabbed prompts and, for some use cases, your Git diff data. It expedites proactive - rather than reactive - code reviews, commit messaging, test generation, and diagramming and many more things.

Its key modalities are to:

- **Assist**: Generate unit tests from code, integration tests from schemas, or any applicable tests from your changes.
- **Feedback**: Code reviews from your files or changes.
- **Coach**: Supportive and coaching prompts helps you build better solutions.

## What to know

This solution uses cURL to call OpenAI APIs. OpenAI will not train their models based on API calls, so this is a "safer" solution than, for example, using the web version of ChatGPT.

## Prerequisites

You will need an [OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) and have it exported in the environment as `OPENAI_API_KEY`, i.e. run `export OPENAI_API_KEY="sk-SOME_RANDOM_STRING`.

**Minion assumes you have Bash.**

Minion also assumes that you have [jq](https://jqlang.github.io/jq/) installed. If you have [Homebrew](https://brew.sh/) installed, it's as easy as `brew install jq` to get it.

Further, the _installation script_ assumes a shell with Zsh support, as it modifies the `.zshrc` file. Exactly how you do the installation and mapping the command `minion` to the Bash script is ultimately up to you.

## Features

### Generate commit message

Ease the generation of a [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style commit message.

```bash
minion commit
```

Prompt:

```text
Generate a Conventional Commits style commit message for the following changes. Use a compact and terse style. For things like dependencies and other verbose changes, bundle these changes into an overall change description. These are the changes:
```

### Code review

Have the LLM generate a code review, focusing on issues and to give feedback on how the code could be refactored.

```bash
minion review changes # Review all changes

minion review file {path} # Review a document at a given location

minion review directory {path} # Review all source code files recursively from location

minion review diagram {path} # Review diagram at location (jpeg, png, gif, webp)
```

Prompt:

```text
You are a world-class software engineer. You have been assigned to review the following code. You will provide actionable feedback while having a supportive tone. Focus on issues and problems, not mincing words. Highlight the issues and address each separately. If one issue is very similar to another, group them together. If one issue has effect on another, explain how. Give feedback on things that could be refactored or improved with common design patterns. Also, ensure any new code has tests if applicable (i.e. not for dependencies, version changes, configuration, or similar). These are the changes:
```

### Write tests for changes or individual files

Generate tests for your changes or individual files, using your tool of choice.

```bash
minion test changes # Generate unit tests for all code changes using "an appropriate tool"

minion test changes {tool_name} # Generate unit tests for all code changes using the provided tool

minion test file {tool_name} {path} # Generate unit tests for the file at the path using the provided tool

minion test api {tool_name} {path} # Generate integration tests for the schema/file at the path using the provided tool
```

Prompt:

```text
You are a world-class software engineer. You have been asked to write appropriate {TEST_TYPE} tests using {TOOL} for the changes. Tests should only be made for our source code, not for dependencies, version changes, configuration, or similar. We are aiming for full code coverage, if possible. If there are no applicable changes, don't write any tests. Only provide code, no explanations. These are the changes:
```

### Create a diagram for changes

Generate one of several types of diagrams for your changes.

The allowed types are: `mermaid` (default), `uml`, `sequence_diagram`, `class_diagram`, `flowchart`, and `graphviz`.

```bash
minion diagram changes # Defaults to Mermaid

minion diagram changes {diagram_type} # Choose your own format here

minion diagram file {diagram_type} {path} # Generate diagrams for a specific file, such as an infrastructure-as-code configuration
```

Prompt:

```text
You are a world-class software architect. You have been asked to produce diagrams using $TOOL for the changes. Focus on our own code, and only add external dependencies if necessary. If it's unclear what the solution is, then don't make diagrams and voice your concern and reasons for stopping. These are the changes:
```

### Ask a question

Finally, you may just want to conveniently ask a question!

```bash
minion ask "Tell me about 5 practical ways to minimize technical debt in a React project."
```

## Installation

The easiest "one-off" way would be to use Minion just as any old script in a project if you want...

_But the nicer option is to use the `install.sh` script._

It will:

- Make a root level directory named `.minion`
- Copy `minion.sh` to the new directory
- Add a line to your `.zshrc` with an alias (`minion`) that runs the script

_Please refer to the [Prerequisites](#prerequisites) section above before installing._

Feel free to modify the installation script or do it your way if this doesn't match how you'd like it to be set up.

You will need to source or reload your IDE for the changes to be activated.

## Configuration and model choice

Starting with version `1.4.0`, you will be presented with a list of models when you pass a command to Minion.

If you want to use a default model and skip manual input, then simply create a `minion.json` file with a `model` key with the value for the model you want to use. The file will be read from the current directory.

Example:

```json
{
  "model": "gpt-4o-mini"
}
```

Valid choices are:

- `gpt-3.5-turbo`
- `gpt-4`
- `gpt-4-turbo`
- `gpt-4o`
- `gpt-4o-mini`
- `chatgpt-4o-latest`

## Usage

Run `minion [commit|review|test|ask|diagram]` in a Git repository.

## Contributing

There is a dedicated [CONTRIBUTING.md](CONTRIBUTING.md), but generally I'm happy to take suggestions and proposals for new features!

## Future ideas

- Support for non-OpenAI providers
- Support for configuration files to additional concepts, like tool/language choices and such
- Support for custom code/docs review policies
- Generate code from diagram (`minion scaffold`)
