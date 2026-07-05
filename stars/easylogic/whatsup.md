---
repo: easylogic/whatsup
url: 'https://github.com/easylogic/whatsup'
homepage: ''
starredAt: '2020-10-04T05:06:25Z'
createdAt: '2020-08-16T12:22:32Z'
updatedAt: '2024-08-20T12:22:06Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:28.453Z'
description: Modern Swagger JSON Management Tool
tags:
  - management
  - multi
  - swagger
  - ui
---

# WHATS UP

Modern Swagger JSON Management Tool 


# Getting Started 

First, you need to get a json file supported by swagger.

Then put the downloaded file in the src/data/ directory.

```js
// package.json 
"script": {
    ...
    "download:pet": "curl https://petstore.swagger.io/v2/swagger.json > src/data/pet.json",
    "download": "npm run download:pet"
    ...
}


```

And add the downloaded json file to the src/data/index.ts file.

```js
// src/data/index.ts 
import pet from './pet.json';

export default {
    pet,            // add json file 
} as {[key: string]: any}

```

### Start - `pnpm start`


```sh
git clone https://github.com/easylogic/whatsup 
cd whatsup
pnpm install 
pnpm start 
```



### Build - `pnpm build`

```sh
pnpm build
```

After executing pnpm build, SPA related files are created in the build directory.

Use this output if you want to deploy to a specific static server.

### License - MIT 
