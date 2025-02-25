---
repo: tomnomnom/waybackurls
url: 'https://github.com/tomnomnom/waybackurls'
homepage: null
starredAt: '2019-06-26T04:05:41Z'
createdAt: '2018-01-24T22:25:18Z'
updatedAt: '2025-02-25T12:48:34Z'
language: Go
license: NA
branch: master
stars: 3726
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:34.067Z'
description: Fetch all the URLs that the Wayback Machine knows about for a domain
tags: []
---

# waybackurls

Accept line-delimited domains on stdin, fetch known URLs from the Wayback Machine for `*.domain` and output them on stdout.

Usage example:

```
▶ cat domains.txt | waybackurls > urls
```

Install:

```
▶ go install github.com/tomnomnom/waybackurls@latest
```

## Credit

This tool was inspired by @mhmdiaa's [waybackurls.py](https://gist.github.com/mhmdiaa/adf6bff70142e5091792841d4b372050) script.
Thanks to them for the great idea!
