---
repo: semanticart/filler-detection
url: 'https://github.com/semanticart/filler-detection'
homepage: null
starredAt: '2025-06-02T05:48:48Z'
createdAt: '2024-02-06T17:48:54Z'
updatedAt: '2025-06-02T05:48:48Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:10.845Z'
description: 'Detect filler words (um, uh) as you speak.'
tags: []
---

# Filler Detection

Detect filler words (um, uh) as you speak.

[See the YouTube video](https://youtu.be/pUzBuwjvH9E)

## Usage

```
bun index.ts [WHISPER_CPP_PATH] [AIRHORN_WAV_FILE_PATH]
```

Example: `bun index.ts /Users/ship/src/whisper.cpp /Users/ship/Downloads/airhorn.wav`

You should be able to use non-bun TypeScript runners as well.

## Dependencies

| name        | url                                      | install command                 |
| ----------- | ---------------------------------------- | ------------------------------- |
| sox         | https://github.com/chirlu/sox            | `brew install sox`              |
| whisper     | https://github.com/openai/whisper        | `pip install -U openai-whisper` |
| whisper.cpp | https://github.com/ggerganov/whisper.cpp | see below                       |

### whisper.cpp Instructions

See the GitHub project for the latest, but this should get you started:

```
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
bash ./models/download-ggml-model.sh tiny.en
make
```
