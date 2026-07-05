---
repo: Andarist/use-constant
url: 'https://github.com/Andarist/use-constant'
homepage: null
starredAt: '2022-09-01T19:28:53Z'
createdAt: '2019-03-18T19:42:25Z'
updatedAt: '2025-02-24T10:25:14Z'
language: JavaScript
license: NA
branch: main
stars: 216
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:35.003Z'
description: null
tags: []
---

# use-constant

React hook for creating a value exactly once. `useMemo` doesn't give this guarantee unfortunately - https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily

### Usage
Install the package
```bash
npm install use-constant
# OR
yarn add use-constant
```

In your code
```javascript
import useConstant from 'use-constant';

const MyComponent = () => {
  // Give useConstant() a function which should be be executed exactly once and
  // return in it your constant value
  const myConstantValue = useConstant(() => 42);
  // ...
```
