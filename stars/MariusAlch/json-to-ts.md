---
repo: MariusAlch/json-to-ts
url: 'https://github.com/MariusAlch/json-to-ts'
homepage: ''
starredAt: '2024-09-01T01:07:45Z'
createdAt: '2017-04-16T16:24:01Z'
updatedAt: '2025-02-24T02:12:49Z'
language: TypeScript
license: NA
branch: master
stars: 422
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:22.512Z'
description: Convert jsons to typescript interfaces
tags: []
---

![JSON TO TS](https://image.ibb.co/fTb60k/icon.png)

# Json to TS

### Convert json object to typescript interfaces

# Example

### Code

```javascript
const JsonToTS = require('json-to-ts')

const json = {
  cats: [
    {name: 'Kittin'},
    {name: 'Mittin'}
  ],
  favoriteNumber: 42,
  favoriteWord: 'Hello'
}

JsonToTS(json).forEach( typeInterface => {
  console.log(typeInterface)
})
```

### Output:

```typescript
interface RootObject {
  cats: Cat[];
  favoriteNumber: number;
  favoriteWord: string;
}
interface Cat {
  name: string;
}
```

## Converter
- Array type merging (**Big deal**)
- Union types
- Duplicate type prevention
- Optional types
- Array types

# Setup

```sh
$ npm install --save json-to-ts
```
