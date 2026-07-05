---
repo: Lioness100/rspell
url: 'https://github.com/Lioness100/rspell'
homepage: ''
starredAt: '2023-02-13T04:23:10Z'
createdAt: '2022-10-31T03:33:31Z'
updatedAt: '2024-10-08T01:41:23Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:56.658Z'
description: "\U0001F4DD Find and fix all your project's typos with a single command!"
tags: []
---

<div align="center">

# rspell

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Lioness100/rspell/ci.yml?branch=main)
![License](https://img.shields.io/github/license/Lioness100/sapphire-template)

</div>

> 📝 Find and fix all your project's typos with a single command!

https://user-images.githubusercontent.com/65814829/216869223-62ef0f71-c59a-4f6f-8096-2353d6173124.mp4

## 📝 Description

`rspell` is a CLI tool that leverages [`cspell`](https://cspell.org/) to find all the
typos in your project. It then uses an intuitive TUI so you can fix them without ever leaving your terminal. This is a
great way to tidy up your own code/documentation, or to contribute to your favorite open source projects!

## 📦 Installation

You can install `rspell` through npm (requires Node.js 16.6.0 or higher):
```sh
npm i -g rspell
```
Or, download a compiled binary from the [latest release](https://github.com/Lioness100/rspell/releases/latest).

## 🚀 Usage

```
Usage: rspell [options] [files...]

📝 Find and fix all your project's typos with a single command!

Examples:
  $ rspell                                            Check all files
  $ rspell "src/**/*.ts"                              Check all TypeScript files in the src directory
  $ rspell --config some-file.json                    Use a custom configuration file
  $ rspell "test" --exclude "**/__snapshots__/**"     Exclude files in the __snapshots__ directory

Arguments:
  files                       The glob patterns describing the files you want to spell check. (default: ["**"])

Options:
  -V, --version               output the version number
  -c, --config <cspell.json>  Configuration file to use. By default cspell looks for cspell.json in the current directory.       
  -e, --exclude <globs...>    Exclude files matching the glob pattern.
  -g, --use-gitignore         Use the .gitignore file to exclude files.
  -C, --cache                 Store the info about processed files in order to only operate on the changed ones.
  -d, --dot                   Include files/directories starting with "." in the glob search.
  -l, --locale <locale>       Explicitly set the locale to use for spell checking.
  -h, --help                  display help for command
```

Since `rspell` is built on top of `cspell`, you can customize the behavior of the tool by creating a [`cspell.json`
file](https://cspell.org/configuration/). If you don't have one, `rspell` will automatically create a config file for
you and update the list of ignored words appropriately as you use the CLI. 

## 💡 Featured PRs using `rspell`

- [mui/material-ui#36194](https://github.com/mui/material-ui/pull/36194) (980 typos)
- [botlabs-gg/yagpdb#1438](https://github.com/botlabs-gg/yagpdb) (910 typos)
- [PowerShell/PowerShell#19175](https://github.com/PowerShell/PowerShell/pull/19175) (881 typos)
- [BabylonJS/Babylon.js/13571](https://github.com/BabylonJS/Babylon.js/pull/13571) (639 typos)
- [strapi/strapi#15903](https://github.com/strapi/strapi/pull/15903) (483 typos)
- [twitter/the-algorithm#1736](https://github.com/twitter/the-algorithm/pull/1736) (437 typos)
- [Byron/gitoxide#724](https://github.com/Byron/gitoxide/pull/724) (408 typos)
- [babel/babel#15432](https://github.com/babel/babel/pull/15432) (387 typos)
- [flutter/flutter#121171](https://github.com/flutter/flutter/pull/121171) (284 typos)
- [vercel/next.js#46281](https://github.com/vercel/next.js/pull/46281)(197 typos)
- [ant-design/ant-design#40791](https://github.com/ant-design/ant-design/pull/40791) (157 typos)
- [pubkey/rxdb#4463](https://github.com/pubkey/rxdb/pull/4463) (156 typos)
- [meilisearch/meilisearch#3512](https://github.com/meilisearch/meilisearch/pull/3512) (111 typos)
- [SergioBenitez/Rocket#2471](https://github.com/SergioBenitez/Rocket/pull/2471) (84 typos)
- [nextauthjs/next-auth#6701](https://github.com/nextauthjs/next-auth/pull/6701) (63 typos)
- [nestjs/nest#11096](https://github.com/nestjs/nest/pull/11096) (56 typos)
- [vitest-dev/vitest#2815](https://github.com/vitest-dev/vitest/pull/2815) (48 typos)
- [TheAlgorithms/JavaScript#1283](https://github.com/TheAlgorithms/JavaScript/pull/1283) (47 typos)
- [Cog-Creators/Red-DiscordBot#5989](https://github.com/Cog-Creators/Red-DiscordBot/pull/5989) (43 typos)
- [prisma/prisma#17874](https://github.com/prisma/prisma/pull/17874) (43 typos)
- [trpc/trpc#3735](https://github.com/trpc/trpc/pull/3735) (40 typos)
- [reactjs/reactjs.org#5586](https://github.com/reactjs/reactjs.org/pull/5586) (35 typos)
- [zloirock/core-js#1215](https://github.com/zloirock/core-js/pull/1215) (28 typos)
- [nuxt/nuxt#18976](https://github.com/nuxt/nuxt/pull/18976) (26 typos)
- [chakra-ui/chakra-ui#7340](https://github.com/chakra-ui/chakra-ui/pull/7340) (16 typos)
- [nextjs/docs.nestjs.com#2622](https://github.com/nestjs/docs.nestjs.com/pull/2622) (14 typos)
- [solidjs/solid#1569](https://github.com/solidjs/solid/pull/1569) (14 typos)
- [eslint/eslint#16884](https://github.com/eslint/eslint/pull/16884) (13 typos)
- [discordjs/discord.js#9127](https://github.com/discordjs/discord.js/pull/9127) (12 typos)
- [vuejs/core](https://github.com/vuejs/core/pull/7693) (9 typos)
- [sveltejs/svelte#8257](https://github.com/sveltejs/svelte/pull/8257) (9 typos)
- [crxjs/chrome-extension-tools#646](https://github.com/crxjs/chrome-extension-tools/pull/646) (8 typos)
- [vitejs/vite#12032](https://github.com/vitejs/vite/pull/12032) (8 typos)
- [rust-lang-nursery/rust-cookbook#684](https://github.com/rust-lang-nursery/rust-cookbook/pull/684) (7 typos)
- [arc53/DocsGPT#36](https://github.com/arc53/DocsGPT/pull/36) (5 typos)
- [rust-secure-code/cargo-geiger#442](https://github.com/rust-secure-code/cargo-geiger/pull/442)
  (4 typos)
- [actix/actix-web#2982](https://github.com/actix/actix-web/pull/2982) (4 typos)
- [graphile/worker#316](https://github.com/graphile/worker/pull/316) (2 typos)
- [meilisearch/documentation#2177](https://github.com/meilisearch/documentation/pull/2177) (1 typo)
