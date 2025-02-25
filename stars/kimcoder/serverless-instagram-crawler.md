---
repo: kimcoder/serverless-instagram-crawler
url: 'https://github.com/kimcoder/serverless-instagram-crawler'
homepage: ''
starredAt: '2018-06-11T15:57:45Z'
createdAt: '2018-05-21T06:41:51Z'
updatedAt: '2024-09-30T20:02:13Z'
language: TypeScript
license: MIT
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:20.960Z'
description: 'serverless, instagram hashtag crawler with lambda, dynamoDB'
tags:
  - aws
  - crawler
  - crawling
  - instagram
  - serverless
---

# serverless-instagram-crawler
this is instagram hashtag crawler with serverless framework.

- [serverless](https://github.com/serverless/serverless)
- [nodejs](https://nodejs.org/)
- [typescript](https://www.typescriptlang.org/)

## Config
you have to config like this. ( before deploy )
```
yarn run config
```
![config](/config.gif)
<br>If you do config, will save a file `.config.json`

## Serverless
Get environment variables from `.config.json` file
```
provider:
    environment:
        HASH_TAG: ${file(./.config.json):hashTag}
        COUNT: ${file(./.config.json):count}
        DYNAMODB_TABLE: ${file(./.config.json):dynamoDB}
```

also, lambda function has set schedule & timeout like this

it means that function will run every midnight (12:00)
```
functions:
    crawling:
        ..
        ..
        timeout: 180
        events:
          - schedule: cron(0 12 * * ? *)
```

## scripts
```
yarn run config
yarn run test 
sls deploy
```

## directory structure

    .
    ├── dist/              # compiled source dir ( .js )
    ├── src/               # source dir ( .ts )
    └── test/              # test source ( .js )
