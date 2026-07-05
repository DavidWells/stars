---
repo: xops/json-schema-to-react-tree
url: 'https://github.com/xops/json-schema-to-react-tree'
homepage: ''
starredAt: '2022-04-03T19:12:35Z'
createdAt: '2020-03-31T18:45:01Z'
updatedAt: '2023-10-10T13:40:56Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:51.584Z'
description: A react component to visually display JSON Schemas
tags: []
---

# json-schema-to-react-tree

A react component to visually display JSON Schemas


![image](https://user-images.githubusercontent.com/364566/78064105-14144880-7346-11ea-9b42-b7158048cba9.png)


## Usage
`npm install @xops.net/json-schema-to-react-tree`

```
import React from "react";
import JSONSchemaTree from "@xops.net/json-schema-to-react-tree";

const MyApp = (props) => {
  return (
    <>
      <JSONSchemaTree
        schema={{
          type: "object",
          properties: {
            number: {
              type: "string",
            },
            hash: {
              type: "string",
            },
            timestamp: {
              description: "timestamp in which the block occured",
              title: "Timestamp",
              type: "string",
            },
            transactions: {
              type: "string",
            },
          },
        }} />
    </>
  )
}
export default MyApp;
```


### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
