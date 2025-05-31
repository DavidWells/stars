---
repo: qoomon/starlines
url: 'https://github.com/qoomon/starlines'
homepage: 'https://starlines.qoo.monster'
starredAt: '2025-05-31T01:22:23Z'
createdAt: '2024-11-11T13:57:56Z'
updatedAt: '2025-05-31T01:22:24Z'
language: JavaScript
license: NA
branch: main
stars: 44
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-31T21:04:39.915Z'
description: Create beautiful stargazers histograms of your repositories or gists
tags: []
---

# GitHub Starlines [![starline](https://starlines.qoo.monster/assets/qoomon/starlines)](https://github.com/qoomon/starlines)

Dynamically generated GitHub stargazer history badges.

> [!Note]
> The starline x-axis is scaled logarithmically and the y-axis is scaled by square root.

## Example
[![starline](https://starlines.qoo.monster/assets/qoomon)](https://github.com/qoomon)

## Usage
> [!NOTE]  
> It can take some time until the image is ready, depending on the amount of stargazers to fetch and process.<br>
> If you are eager to watch the image generation workflows progress jump to [workflow runs](https://github.com/qoomon/starline/actions/workflows/create-starline.yaml).

### For GitHub Repositories
```md
[![starline](https://starlines.qoo.monster/assets/OWNER/REPO)](https://github.com/qoomon/starline)
```
### For GitHub Gists
```md
[![starline](https://starlines.qoo.monster/assets/OWNER/GIST@gist)](https://github.com/qoomon/starline)
```
### For GitHub Users
```md
[![starline](https://starlines.qoo.monster/assets/USER)](https://github.com/qoomon/starline)
```

## Starline Cache
[GitHub Starlines Release](https://github.com/qoomon/starline/releases/tag/starlines)

## Sources
- Heavily inspired by [spark](https://github.com/antonmedv/spark)
  - especially the badge design is a copy of spark
