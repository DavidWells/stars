---
repo: shanginn/git-aicommit
url: 'https://github.com/shanginn/git-aicommit'
homepage: ''
starredAt: '2022-09-26T19:09:53Z'
createdAt: '2022-09-24T05:56:45Z'
updatedAt: '2024-11-13T09:46:48Z'
language: JavaScript
license: NA
branch: master
stars: 79
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:28.783Z'
description: Generates auto commit messages with OpenAI GPT model
tags: []
---

# GIT AI COMMIT

Tired of writing commit messages? Let the computer do it for you!

[![asciicast](demo.svg)](https://asciinema.org/a/fpL5Dkd74xO8yRTM15O49zOF9)

> It's shit, but better than "WIP"!

## Installation

```bash
bun add -g git-aicommit
```

## Configuration

This cli tool uses [standard rc files](https://www.npmjs.com/package/rc#standards):

- local `.git-aicommitrc`
- `$HOME/.git-aicommitrc`
- `$HOME/.git-aicommit/config`
- `$HOME/.config/git-aicommit`
- `$HOME/.config/git-aicommit/config`
- `/etc/git-aicommitrc`
- `/etc/git-aicommit/config`

Or [default config](config.js) is used if no config file is found.

To override default config, create a config file and export an object with the following properties:

```bash
touch $HOME/.git-aicommitrc
```

```js
// $HOME/.git-aicommitrc
export default {
    openAiKey: process.env.OPENAI_API_KEY,
    addAllChangesBeforeCommit: true,
    autocommit: true,
    openCommitTextEditor: false,
    language: 'english',
    systemMessagePromptTemplate: '' +
        'You are expert AI, your job is to write clear and concise Git commit messages.' +
        'Your responsibility is to ensure that these messages accurately describe the changes made in each commit,' +
        'follow established guidelines. Provide a clear history of changes to the codebase.' +
        'Write 1-2 sentences. Output only the commit message without comments or other text.',
    humanPromptTemplate: '' +
        'Read the following git diff for a multiple files and ' +
        'write 1-2 sentences commit message in {language}' +
        'without mentioning lines or files:\n' +
        '{diff}',
    excludeFromDiff: [
        '*.lock', '*.lockb'
    ],
    diffFilter: 'ACMRTUXB',
    completionPromptParams: {
        model: "gpt-4o-mini",
        temperature: 0.0,
        maxTokens: 1000,
    }
}
```

### Command line arguments

```bash
git-aicommit --openAiKey="sk-..." --completionPromptParams.temperature=0.3 --no-autocommit
```
## Usage

```bash
export OPENAI_API_KEY=sk-YOUR_API_KEY
git-aicommit
```

Or make an alias:

```bash
alias gai='git-aicommit'

## And run it:
gai
```

It's that simple!
