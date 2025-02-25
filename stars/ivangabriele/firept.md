---
repo: ivangabriele/firept
url: 'https://github.com/ivangabriele/firept'
homepage: ''
starredAt: '2025-02-05T05:06:52Z'
createdAt: '2023-10-05T00:45:19Z'
updatedAt: '2025-02-05T05:06:53Z'
language: TypeScript
license: AGPL-3.0
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:08.354Z'
description: 'APIfy your local workspaces, allowing AI to interact with it.'
tags:
  - api
  - apificacion
  - apifier
  - automation
  - chatgpt
  - custom-gpt
  - local-api
  - openai
  - workspace-manager
  - workspace-tool
---

<p align="center">
  <img alt="FirePT Logo" height="128" src="https://raw.githubusercontent.com/ivangabriele/firept/main/docs/assets/logo.png" />
</p>
<h1 align="center">FirePT</h1>
<h3 align="center">APIfy your project workspace, allowing AI to interact with it.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/firept">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/firept?style=for-the-badge" />
  </a>
  <a href="https://github.com/ivangabriele/firept/blob/main/LICENSE">
    <img alt="AGPL-3.0 license" src="https://img.shields.io/github/license/ivangabriele/firept?style=for-the-badge&labelColor=000">
  </a>
  <a href="https://github.com/ivangabriele/firept/actions?query=branch%3Amain+workflow%3AUnit">
    <img alt="CI Unit Workflow" src="https://img.shields.io/github/actions/workflow/status/ivangabriele/firept/unit.yml?branch=main&label=Unit&style=for-the-badge&labelColor=000">
  </a>
  <a href="https://github.com/ivangabriele/firept/actions?query=branch%3Amain+workflow%3AE2E">
    <img alt="CI E2E Workflow" src="https://img.shields.io/github/actions/workflow/status/ivangabriele/firept/e2e.yml?branch=main&label=E2E&style=for-the-badge&labelColor=000">
  </a>
</p>

---

> [!NOTE]  
> This is a work in progress and is still under heavy testing.  
> This doesn't work out of the box yet.

- [Introduction](#introduction)
- [Features](#features)
  - [Features](#features-1)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setting up PublicHost](#setting-up-publichost)
  - [Preparing the workspace](#preparing-the-workspace)
  - [Running FirePT](#running-firept)
  - [Using FirePT](#using-firept)
    - [With OpenAI Custom GPT](#with-openai-custom-gpt)
- [Contributing](#contributing)

---

## Introduction

FirePT is designed to enhance the capabilities of AI LLMs that accepts API actions (like custom GPTs) by providing an
API to interact with the current working directory. It allows for performing various tasks like reading or editing
files, running shell commands, and more to come.

You'll need to publicly expose the local FirePT via a domain and a secure HTTPS. FirePT already integrates
[PublicHost](https://publichost.org) which does just that by tunneling your local server to a public domain with HTTPS.
PublicHost is fully open-source and can be self-hosted. You can also use other similar services like
[Ngrok](https://ngrok.com) or [LocalTunnel](https://localtunnel.github.io/www/).

## Features

### Features

All features can only be run within the declared project directory.

- [x] OpenAPI documentation
- [x] List files
- [x] Read files
- [x] Create files and directories
- [x] Edit files
- [x] Delete files and directories
- [x] Move (rename) files and directories
- [x] Run shell commands
- [x] Local, per-project config file
- [ ] Actions tracking (to help AI keep track of previous actions when starting new chat sessions)
- [ ] Run shell commands in background pods (to avoid blocking the server response on long-running and forever-running
      commands) with logs, exit and kill endpoints
- [x] Read Github issues
- [ ] Comment Github issues
- [ ] Read Github pull requests
- [ ] Comment Github pull requests
- [ ] Partially read files (from line to line)
- [ ] Partially edit files (from line to line)
- [ ] Fine-grained feature control (to enable/disable features)

> [!IMPORTANT]  
> I'm not among AI-Will-Take-Over-The-World believers. However, the file created as well as the shell commands could
> definitely do whatever they want to your system. Carefully watch FirePT logs and generated source code.
>
> **A good practice is to run FirePT in a sandboxed environment (container, VM, etc.) and to never run it as root.**

## Getting Started

### Prerequisites

Before installing FirePT, ensure you have the following:

- Node.js (version 20 or later)
- npm (usually comes with Node.js)

### Installation

Install FirePT globally using npm:

```sh
npm i -g firept
```

### Setting up PublicHost

**To be updated.**

### Preparing the workspace

Add a `firept.yml` (or `firept.yaml`) file to the root of your project directory.

```yaml
server:
  apiKey: '****'
  port: 9999

publichost:
  apiKey: '****'
  host: publichost.org
  subdomain: your-subdomain

# If you don't use PublicHost but your own localhost public tunneling service (like ngrok or localtunnel):
# customPublicUrl: 'https://example.org'

# https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28#authenticating-with-a-personal-access-token
# https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
repository:
  provider: github
  personalAccessToken: '****'
  owner: your-github-username
  name: your-repo-name

# The following properties and sub-properties are all optional:
workspace:
  # `.gitignore` files and `.git` directories are already ignored by FirePT,
  # these are additional files and directories to ignore:
  ignoredFiles:
    - ./.yarn/**
    - ...
```

> [!IMPORTANT]  
> **!!! DO NOT COMMIT THE `firept.yml` FILE TO YOUR REPOSITORY.  
> ADD IT TO YOUR `.gitignore` FILE !!!**

You can also add it you global `.gitignore` file to avoid polluting your team repo with your local settings.

### Running FirePT

To start the FirePT server, run (within your project directory):

```sh
fire start
```

### Using FirePT

#### With OpenAI Custom GPT

**To be updated.**

## Contributing

We welcome contributions to FirePT! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of
conduct and the process for submitting pull requests.

---
