---
repo: kroll-software/babyagi4all
url: 'https://github.com/kroll-software/babyagi4all'
homepage: null
starredAt: '2023-05-03T21:22:17Z'
createdAt: '2023-05-02T05:22:37Z'
updatedAt: '2025-01-24T12:04:57Z'
language: Python
license: MIT
branch: main
stars: 249
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T19:59:50.995Z'
description: BabyAGI to run with GPT4All
tags: []
---

# BabyAGI4All

A small autonomous AI agent based on [BabyAGI](https://github.com/yoheinakajima/babyagi) by Yohei Nakajima.
</br>

Runs on CPU with the [GPT4All](https://github.com/nomic-ai/gpt4all) model by Nomic AI.
</br>

100% open source, 100% local, no API-keys needed.
</br>

# Installation:

1. Clone this repository
2. Install the requirements: *pip install -r requirements.txt*
3. Download a model file (see below)
4. Copy the file *.env.example* to *.env*
4. Edit the model-path and other preferences in the file *.env*

## Model Downloads

The following model files have been tested successfully:

* *gpt4all-lora-quantized-ggml.bin*
* *ggml-wizardLM-7B.q4_2.bin*
* *ggml-vicuna-7b-1.1-q4_2.bin*

Some of these model files can be downloaded from [here](https://github.com/nomic-ai/gpt4all-chat#manual-download-of-models).
</br>
</br>

Then run *python babyagi.py*
</br>

Have fun!
</br>
