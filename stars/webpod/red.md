---
repo: webpod/red
url: 'https://github.com/webpod/red'
homepage: ''
starredAt: '2019-03-29T17:51:49Z'
createdAt: '2019-03-19T17:23:44Z'
updatedAt: '2025-02-15T13:06:33Z'
language: Go
license: MIT
branch: master
stars: 1478
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:41.435Z'
description: Security log analysis tools for server monitoring
tags: []
---

# red

![red](https://user-images.githubusercontent.com/141232/54882450-bb85b200-4e8c-11e9-8bd9-37cf43b5b1ed.gif)

_Red_ is a terminal log analysis tools.

## Usage

Pipe JSON stream logs into _red_ and specify a few fields to display. For example using with kubernetes:

```bash
kubectl logs ... | red level message
```

You will see combined logs with trend sparkline and total count.

## Install

```bash
go install github.com/antonmedv/red@latest
```

## License

MIT
