---
repo: C5H8NNaO4/node-aws-verify-jwt
url: 'https://github.com/C5H8NNaO4/node-aws-verify-jwt'
homepage: null
starredAt: '2020-03-23T17:46:20Z'
createdAt: '2019-07-31T12:43:59Z'
updatedAt: '2020-03-23T17:46:20Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.859Z'
description: Verify aws cognito jwt tokens.
tags: []
---

Verify AWS serverless cognito jwt tokens.

## Setup
`npm install node-aws-verify-jwt`

## Quick Start

    import { getPayload, verifyJWT } from   'node-aws-verify-jwt';
    
    //Verify integrity of the token and return the payload.
    const payload = await getPayload({
        jwtToken,
        region,
        userPoolID,
    });
    
    //Verify the token and validate claims.
    const valid = await verifyJWT({
        jwtToken,
        region,
        userPoolID,
        claims: {
            client_id: '22vik2co81f7reethfbm8sfat5b',
            exp: (val) => val > ~~(+new Date/1000)
        },
    });

## Build 
`npm run build`
 
 Runs `babel src --out-dir lib`

## Test

`npm run test`

Runs jest 
