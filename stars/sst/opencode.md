---
repo: sst/opencode
url: 'https://github.com/sst/opencode'
homepage: 'https://opencode.ai'
starredAt: '2025-06-11T01:12:18Z'
createdAt: '2025-04-30T20:08:00Z'
updatedAt: '2025-06-14T22:16:59Z'
language: TypeScript
license: MIT
branch: dev
stars: 2153
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:10.561Z'
description: 'AI coding agent, built for the terminal.'
tags: []
---

[![OpenCode Terminal UI](screenshot.png)](https://github.com/sst/opencode)

AI coding agent, built for the terminal.

⚠️ **Note:** version 0.1.x is a full rewrite and we do not have proper documentation for it yet. Should have this out week of June 17th 2025 📚

### Installation

```bash
# YOLO
curl -fsSL https://opencode.ai/install | bash

# Package managers
npm i -g opencode-ai@latest        # or bun/pnpm/yarn
brew install sst/tap/opencode      # macOS
paru -S opencode-bin               # Arch Linux
```

> **Note:** Remove previous versions < 0.1.x first if installed

### Providers

The recommended approach is to sign up for claude pro or max and do `opencode auth login` and select Anthropic. It is the most cost effective way to use this tool.

Additionally opencode is powered by the provider list at [models.dev](https://models.dev) so you can use `opencode auth login` to configure api keys for any provider you'd like to use. This is stored in `~/.local/share/opencode/auth.json`

```bash
$ opencode auth login

┌  Add credential
│
◆  Select provider
│  ● Anthropic (recommended)
│  ○ OpenAI
│  ○ Google
│  ○ Amazon Bedrock
│  ○ Azure
│  ○ DeepSeek
│  ○ Groq
│  ...
└
```

The models.dev dataset is also used to detect common environment variables like `OPENAI_API_KEY` to autoload that provider.

If there are additional providers you want to use you can submit a PR to the [models.dev repo](https://github.com/sst/models.dev). If configuring just for yourself check out the Config section below

### Project Config

Project configuration is optional. You can place an `opencode.json` file in the root of your repo and it will be loaded.

```json title="opencode.json"
{
  "$schema": "http://opencode.ai/config.json"
}
```

#### MCP

```json title="opencode.json"
{
  "$schema": "http://opencode.ai/config.json",
  "mcp": {
    "localmcp": {
      "type": "local",
      "command": ["bun", "x", "my-mcp-command"],
      "environment": {
        "MY_ENV_VAR": "my_env_var_value"
      }
    },
    "remotemcp": {
      "type": "remote",
      "url": "https://my-mcp-server.com"
    }
  }
}
```

#### Providers

You can use opencode with any provider listed at [here](https://ai-sdk.dev/providers/ai-sdk-providers). Use the npm package name as the key in your config. Note we use v5 of the ai-sdk and not all providers support that yet.

```json title="opencode.json"
{
  "$schema": "http://opencode.ai/config.json",
  "provider": {
    "@ai-sdk/openai-compatible": {
      "name": "MySpecialProvider",
      "options": {
        "apiKey": "xxx",
        "baseURL": "https://api.provider.com/v1"
      },
      "models": {
        "my-model-name": {
          "name": "My Model Name"
        }
      }
    }
  }
}
```

### Contributing

To run opencode locally you need

- bun
- golang 1.24.x

To run

```
$ bun install
$ cd packages/opencode
$ bun run src/index.ts
```

### FAQ

#### How do I use this with OpenRouter

Theoretically you can use this with OpenRouter with config like this

```json title="opencode.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "@openrouter/ai-sdk-provider": {
      "name": "OpenRouter",
      "options": {
        "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      },
      "models": {
        "anthropic/claude-3.5-sonnet": {
          "name": "Claude 3.5 Sonnet"
        }
      }
    }
  }
}
```

However we are using [ai-sdk v5](https://ai-sdk.dev) which OpenRouter does not support yet. The moment they do this will work
