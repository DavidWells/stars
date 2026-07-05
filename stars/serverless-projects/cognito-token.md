---
repo: serverless-projects/cognito-token
url: 'https://github.com/serverless-projects/cognito-token'
homepage: null
starredAt: '2019-04-27T23:39:02Z'
createdAt: '2018-04-15T11:58:56Z'
updatedAt: '2021-11-22T10:51:40Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:39.012Z'
description: 'generate cognito token '
tags: []
---

# Tokens with User Pools

This demo shows the real cognito three tokens in the aws document [Using Tokens with User Pools](https://amzn.to/2fo77UI). It also helps you to fully undertand how the payload looks like. 

## Preparation

* create cognito user pool. You can reference the serverless stack in [create_coginto_userpool](https://github.com/serverless-projects/serverless-authorizers/blob/master/cognito/create_coginto_userpool/serverless.yml)
* create at least one user in cognito user pool. If you want to create new user with command, reference `signup.sh`. You need login aws console to manually confirm and active it.
* update username, password, user pool id and client id in `config.json`. There is a sample file for your reference: `config.json.sample`

## Usage

run 

    $ npm install cognito-token
    $ cp config.json.sample config.json
    # edit config.json
    $ cognito-token config.json
    
    userData: {"Username":"bill","Pool":{"userPoolId":"....
    ===========================
    Result methods: idToken,refreshToken,accessToken,clockDrift
    idToken methods: jwtToken,payload
    accessToken methods: jwtToken,payload
    refreshToken methods: token
    ID token payload's method: sub,email_verified,gender,iss,phone_number_verified,cognito:username,given_name,aud,event_id,token_use,auth_time,phone_number,exp,iat,family_name,email
    user's mailbox: abc@example.com
    ===========================
    ID Token: eyJraWQiOiJoTxxxxVtZm1K5wZmIFA
    ===========================
    Access token: eyJraWQiOixxxxy5H5LaCQTw
    ===========================
    Refresh token: eyJjdHkiOixxxx8twwVe2CnDKMig

You should get three tokens: id token, access token and refresh token

I also added codes to show how to get these three token's methods and how to show the user's attributes, for example, his/her email box.
