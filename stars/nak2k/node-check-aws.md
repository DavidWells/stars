---
repo: nak2k/node-check-aws
url: 'https://github.com/nak2k/node-check-aws'
homepage: ''
starredAt: '2024-12-27T19:56:42Z'
createdAt: '2021-05-27T15:16:01Z'
updatedAt: '2024-12-27T19:56:43Z'
language: TypeScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:36.033Z'
description: null
tags: []
---

# check-aws

Check AWS environment you use is right.

## Installation

```
npm i -D check-aws
```

## Usage

Configure valid AWS environments in package.json:

```
{
  "check-aws": {
    "accountIds": [
      "123456789012"
    ]
  }
}
```

then, use the CLI command `check-aws`:

```
$ check-aws
```

or, call the API in your script:

```
import { checkAws } from "check-aws";

await checkAws();
```

## License

MIT
