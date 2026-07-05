---
repo: baselime/paginate-aws
url: 'https://github.com/baselime/paginate-aws'
homepage: null
starredAt: '2023-04-03T04:32:07Z'
createdAt: '2023-02-07T14:17:39Z'
updatedAt: '2024-07-19T23:13:28Z'
language: TypeScript
license: MIT
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:53.251Z'
description: Typesafe AWS Pagination using async generators
tags: []
---

# paginate-aws

> Typesafe AWS Pagination using async generators

Useful when you need to paginate and AWS SDK call (v2/v3). Works with any aws operation with a paginationKey and uses typescript to help (but not guarantee) you have selected the correct pagination key

![Pagination Key Help](example.png)



## Install

```bash
npm install @baselime/paginate-aws
```

## Usage
```js
import { paginate } from '@baselime/paginate-aws';

for await (const stacks of paginate((next) => cloudFormation.listStacks({ NextToken: next }).promise(), 'NextToken')) {
    console.log(stacks.StackSummaries)
    //=> [{ StackName: 'prod-just-ship-it-be-cool', ...}, ...]
}
```
## API

### paginate((next: string) => somePromise({ next }), paginationKey: string)

returns an async generator that paginates through the aws-sdk list method returning all the responses.
