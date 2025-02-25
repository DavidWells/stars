---
repo: andresriancho/jwt-fuzzer
url: 'https://github.com/andresriancho/jwt-fuzzer'
homepage: null
starredAt: '2022-02-21T23:59:24Z'
createdAt: '2017-01-04T14:53:02Z'
updatedAt: '2025-02-07T13:52:03Z'
language: Python
license: GPL-3.0
branch: master
stars: 105
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:16.095Z'
description: JWT fuzzer
tags:
  - appsec
  - fuzzing
  - hacking
  - jwt
  - security
---

# JSON Web Token Fuzzer

[jwt-fuzzer](https://github.com/andresriancho/jwt-fuzzer) is a simple command line tool that creates
multiple, potentially invalid, strings from an initial [JSON Web Token](https://jwt.io/).

# Installation

```
$ pip install -r requirements.txt
```

# Usage

```
$ ./jwt-fuzzer --jwt={JSON Web Token} --output out.json
Generating test JSON Web Tokens...
Done!
```

Once the output file is generated you'll usually send the modified JWT using the `utils/sender` tool, which
you'll have to customize for your specific case.

