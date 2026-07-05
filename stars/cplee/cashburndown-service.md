---
repo: cplee/cashburndown-service
url: 'https://github.com/cplee/cashburndown-service'
homepage: null
starredAt: '2016-11-27T19:16:15Z'
createdAt: '2016-10-27T06:21:39Z'
updatedAt: '2020-01-06T17:17:31Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:50:36.393Z'
description: Service for calculating cash burndown
tags: []
---

# Idenity Pool
Setup Cognito identity pool named `Cashflow Burndown` with an Authenticated Role named `Cognito_CashflowBurndownAuth_Role`.  Enable *Google+* authentication provider and provide your *Google Client ID*.

# Unit test
`npm test`

# Deployment
Use Serverless to deploy:

```
sls deploy --plaid_client_id=<your_client_id> --plaid_client_secret=<your_client_secret>
```
