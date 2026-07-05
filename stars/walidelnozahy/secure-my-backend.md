---
repo: walidelnozahy/secure-my-backend
url: 'https://github.com/walidelnozahy/secure-my-backend'
homepage: null
starredAt: '2024-06-27T20:52:09Z'
createdAt: '2021-01-12T17:56:46Z'
updatedAt: '2024-06-27T20:52:09Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:28.977Z'
description: a little package that takes an unsecured url and makes it secure
tags: []
---

<p align="center">
  <img src="https://res.cloudinary.com/dqbgnn5hf/image/upload/c_scale,w_200/v1610530093/padlock.svg" width="200" height="200">
</p>

# Secure your backend with aws

A little package that takes an unsecured url and makes it secure using aws's api gateway.

## Usage

You need to create an aws account (if you don’t have one already)

    npm install --save @walidelnozahy/secure

then simply just call `secure http://example.com` in your terminal

    secure http://example.com

    // https://id.execute-api.us-west-1.amazonaws.com/dev

## How it works

Steps needed to secure the endpoint with api gateway are:

    1. Create new rest api.
    2. Get resources for the created rest api (to get parent id).
    3. Create resource (with parent id).
    4. Put method with created resource id and request params.
    5. Put method with parent id.
    6. Put integration for the resource id.
    7. Put integration for the parent id.
    8. Create deployment.
    9. Create stage.
