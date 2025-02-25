---
repo: lifespikes/next-last-path
url: 'https://github.com/lifespikes/next-last-path'
homepage: ''
starredAt: '2022-11-26T19:10:12Z'
createdAt: '2022-10-26T09:13:23Z'
updatedAt: '2023-06-21T00:48:50Z'
language: TypeScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:07.789Z'
description: "\U0001F949 A React Hook containing the last path from a Next.js route + some goodies \U0001F381"
tags: []
---

![next-last-path-logo](https://user-images.githubusercontent.com/71573508/198857935-7b1a6bde-acaa-42ee-8382-669459ea4dd3.png)

# Next Last Path Hook 

<sub>AKA: useLastPath</sub> 

🥉 A React Hook containing the last path from a Next.js route + some goodies 🎁

### Features

- ⚡️ Fast
- 🧩 Small (1.1kB gzipped).
- 🥶 Dependency free.
- 🧪 Based on regex. 
- 🧨 Specially useful when working with dynamic routes.

### Install

```bash
npm i next-last-path
```

### Usage

```js
import { useLastPath } from 'next-last-path'

const Component = (props: any) => {
  const { lastPath, isLastPath, isDynamic, query, isMatch } = useLastPath()

  return <div>
    the last path is: {lastPath} {isDynamic && `and it's dynamic`}
  </div>
}

export default Component
```

### Options

| Option        | Type                                                 | Description                                                                                           |
|---------------|------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| matcher       | RegExp \| string \| Record<string, RegExp \| string> | A RegExp, a string, or an Object with RegExp or strings as values. Perform a match on the `lastPath`  |
| allowBrackets | boolean                                              | If route is dynamic, allow brackets on the final result of `lastPath`.                                |
| allowDots     | boolean                                              | If route is dynamic, allow dots on the final result of `lastPath`.                                    |
| defaultHome   | string                                               | By default the homepage is returned as `/`. If you are in `/` instead `defaultHome` will be returned. |
