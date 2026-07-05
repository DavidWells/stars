---
repo: Kabisa-archive/Kabisa-Serverless-Tickets
url: 'https://github.com/Kabisa-archive/Kabisa-Serverless-Tickets'
homepage: null
starredAt: '2020-09-02T18:01:54Z'
createdAt: '2018-10-09T10:56:19Z'
updatedAt: '2023-01-28T15:54:28Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:37.039Z'
description: null
tags: []
---

# Kabisa Serverless Tickets

Feel free to create an issue if you have any questions or troubles. I won't check them every day but I'll try to check them weekly.

## Setup:
in infrastructure/

- `aws-vault exec kabisa-bart-playground`
- `(cd  tables/examples/ && aws dynamodb batch-write-item --request-items file://Availability.json)`


## Development:
- `yarn`
- `(cd infrastructure; sls dynamodb install)`
- `yarn run dev`
or
`yarn run dev_online`

#### Killing serverless-offline in case of it still running:
`lsof -i :8000 -sTCP:LISTEN |awk 'NR > 1 {print $2}' | xargs kill -15`

## Deploy:
```
cd dist/

yarn run build

aws-vault exec kabisa-playground

aws s3 sync . s3://kabisa-tickets-dev-hosting --include "*" --exclude "*.js" --exclude "*.css"
aws s3 sync . s3://kabisa-tickets-dev-hosting --delete --exclude "*" --include "*.js" --include "*.css" --content-encoding=gzip


```

## License

Kabisa Serverless Tickets is released under the [MIT License](LICENSE).
