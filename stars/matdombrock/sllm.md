---
repo: matdombrock/sllm
url: 'https://github.com/matdombrock/sllm'
homepage: 'https://www.npmjs.com/package/sllm'
starredAt: '2023-05-01T17:09:01Z'
createdAt: '2023-02-25T11:02:22Z'
updatedAt: '2025-02-22T19:10:02Z'
language: JavaScript
license: GPL-3.0
branch: master
stars: 40
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:51.273Z'
description: A command line interface for the OpenAI LLMs.
tags:
  - assistant
  - chatbot
  - chatgpt
  - cli
  - gpt3
  - openai
---

# SLLM - Command Line ChatGPT-like Assistant
A command line interface for the OpenAI Large Language Models that emulates some features of ChatGPT. 

**UPDATE: GPT4 Support is Here!**

*Note: This project has recently been updated to default to the GPT3.5-Turbo Model. You can access other models (**including GPT4**) with the `--model` option.*

![screenshot](.docs/sllm-ss.png)

In addition to providing a simple interface for talking with GPT, this tool also offers a few extra features built on top of the GPT APIs. 

### Extra Features:
- Act as a chat bot (emulates chatGPT)
- Read local files
- Automatically prepend subject domains & context (Bash, JS, Physics etc.)
- Expert Mode (act as an expert on some subject)
- Explain it like I'm 5 (explain the answer simply)

### Why Not Use ChatGPT?
You can do whatever you want :)

I made this for the following reasons:

- Access LLMs without leaving the command line
- Access LLMs without logging in to OpenAI (use a token instead)
- Directly read and write local files
- I don't always have easy access to a GUI

> $ sllm what would be the advantage of talking to a LLM via the command line?
> 
> The advantage of talking to a LLM via the command line is that it allows for a more efficient and direct way of communicating. It also allows for more precise and specific commands to be used, which can help to quickly get the desired results.

---

### Example Usage:

> $ sllm what can be used to check the status of a running systemd service? -e bash scripting
> 
> The command to check the status of a running systemd service is "systemctl status <service_name>".
> 
> 
> $ sllm how can I get the full log instead? -d bash -H 1
> 
> To get the full log of a running systemd service, you can use the command "journalctl -u <service_name>".


## Install

```
npm install -g sllm
```

## Setup

Get an OpenAI [API KEY](https://platform.openai.com/account/api-keys).

```
export OPENAI_API_KEY=<your_api_key>
```

## Quick Start

```
$ sllm how many people live in china? 

According to the latest estimates, there are approximately 1.4 billion people living in China.
```

## Chat Mode
To enable a "chat mode" similar to chatGPT, run the following command:

```
sllm .settings -H 3
```

This will remind the LLM about the last 3 prompts it was given. 

## Overview
```
$ sllm --help
Usage: sllm [options] [command]


         ____    
    ___ / / /_ _ 
   (_-</ / /  ' \
  /___/_/_/_/_/_/

CLI for OpenAI Large Language Models. v2.0.6
Created by Mathieu Dombrock 2023. GPL3 License.


Options:
  -V, --version                  output the version number
  -h, --help                     display help for command

Commands:
  .help                          show sllm help
  .prompt [options] <prompt...>  send a prompt (default command)
  .settings [options]            set a persistent command option
  .settings-view                 view the current settings that were changed via the `settings` command
  .settings-purge                purge the current settings that were changed via the `settings` command
  .history-view [options]        view the conversation history
  .history-purge [options]       view the conversation history
  .history-undo [options]        undo the conversation history
  .purge                         delete all history and settings
  .count [options]               estimate the tokens used by a prompt or file
  .repeat                        repeat the last response
  .models                        list the available models

Note: All commands are prefixed with "." to avoid conflicting with prompts!
```

## Available Models

```
$ sllm models

Available Models:
-------
text-davinci-002
-------
text-davinci-003
alias: gpt3
-------
gpt-3.5-turbo
alias: gpt3t
-------
gpt-4
alias: gpt4
beta: might require special access!
-------
gpt-4-32k
alias: gpt4b
beta: might require special access!
-------
code-davinci-002
beta: might require special access!
///////
You can specify a model with the -m option
More info: https://platform.openai.com/docs/models/
```

## Prompt

```
$ sllm .prompt --help
Usage: sllm .prompt [options] <prompt...>

send a prompt (default command)

Arguments:
  prompt                      the prompt text

Options:
  -v, --verbose               verbose output
  -x, --max-tokens <number>   maximum tokens to use in response (default: "256")
  -X, --unlimited             do not limit tokens used in response
  -t, --temperature <number>  temperature to use (default: "0.2")
  -c, --context <string...>   context to prepend
  -d, --domain <string...>    subject domain to prepend
  -e, --expert <string...>    act as an expert on this domain
  -C, --code <language>       respond only with executable code (default: "JavaScript")
  -5, --like-im-five          explain it like I'm 5 years old
  -H, --history <number>      prepend history (chatGPT mode)
  -f, --file <path>           prepend the given file contents
  -T, --trim                  automatically trim the given file contents
  -m, --model <model-name>    specify the model name (default: "gpt-3.5-turbo")
  --mock                      dont actually send the prompt to the API
  -h, --help                  display help for command
```

## Working With Files

You can prepend a reference to a file with the `-f` or `--file` option.

However, be aware that files can not exceed 4k tokens. To the best of my knowledge, there is no way to get the GPT3 API to process more than 4096 tokens at once which means that this is a hard limitation and it would not be possible to get a meaningful analysis of a file that exceeds 4k tokens. 

**NOTE: At the time of writing, sending a file that contains 4k tokens would cost about $0.08 (USD). See [OpenAI Pricing](https://openai.com/pricing) for more info.**

### Trimming Files to Save Tokens
If your files are too large or you simply want to save a few tokens, you can try adding the `--trim` flag when loading a file. This command will attempt to remove all white spaces, tabs and new lines from the file. This might confuse the LLM so it's typically better to avoid this option unless needed. 

Depending on the type of file you want to analyze, you might also try minifying the file before running it through sllm. 

### File Examples:
```
$ sllm write a summary of this file -f sllm.js

  This file is a Node.js script that provides a command line interface (CLI) for interacting with OpenAI's GPT-3 API.

$ sllm what dependencies does this have -f ./package.json

 This package.json file has two dependencies: gpt-3-encoder and openai.

$ sllm what version of npm is this file built for? -f ./package.json

  This package.json file is built for npm version 6.14.4 or higher.

$ cat example.js

  const e = require('./llm.js');
  console.log(e);

$ sllm is this file NodeJS or Browser JS? -f example.js

  This file is Node.js.

$ sllm why do you say that? -H 1

  This file contains code that is specific to Node.js, such as the require statement, which is not supported in browser JavaScript.

$ sllm what is this file about? -f mute.cpp
  This file is about demonstrating the differences between mutating a value by reference, by pointer, and not mutating it at all. It contains three functions, noMute, muteR, and muteP, which respectively do not mutate the value, mutate the value by reference, and mutate the value by pointer. There is also a print function to output the results of the functions.

$ sllm what is this file about? -f cfg.txt
  This file is about creating a GIF animation of Conway's Game of Life using the .sorg settings. The animation will have a file name of "life", a frame delay of 1, 512 frames to render, 0 generations to run before render, a canvas width of 64, a canvas height of 64, a pixel/image scale of 8, a gif color pallet of lime, and a rule set of dtsd. Additionally, the .sorg settings include a file to load of "noise", a center of 0, an x offset of 1, and a y offset of 1.
```

## Counting Tokens

If you want to estimate how many tokens a prompt or file will consume, you can use the `sllm count` command.

```
$ sllm .count --help

Usage: sllm .count [options]

estimate the tokens used by a prompt or file

Options:
  -p, --prompt <string...>  the prompt string to check
  -f, --file <path>         the file path to check
  -h, --help                display help for command
```


