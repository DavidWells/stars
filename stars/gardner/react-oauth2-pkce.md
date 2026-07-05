---
repo: gardner/react-oauth2-pkce
url: 'https://github.com/gardner/react-oauth2-pkce'
homepage: ''
starredAt: '2021-05-15T20:14:04Z'
createdAt: '2020-05-19T23:41:04Z'
updatedAt: '2024-02-08T09:40:15Z'
language: TypeScript
license: NA
branch: master
stars: 49
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:41.288Z'
description: "React auth provider that works with AWS cognito PKCE\U0001F6E1️\U0001F512"
tags: []
---

# react-oauth2-pkce

> Authenticate against generic OAuth2 using PKCE

[![NPM](https://img.shields.io/npm/v/react-oauth2-pkce.svg)](https://www.npmjs.com/package/react-oauth2-pkce) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-oauth2-pkce
```

## Usage

```tsx
import React from 'react'
import { AuthProvider, AuthService } from 'react-oauth2-pkce'

import { Routes } from './Routes';

const authService = new AuthService({
  clientId: process.env.REACT_APP_CLIENT_ID || 'CHANGEME',
  location: window.location,
  provider: process.env.REACT_APP_PROVIDER || 'https://sandbox.auth.ap-southeast-2.amazoncognito.com/oauth2',
  redirectUri: process.env.REACT_APP_REDIRECT_URI || window.location.origin,
  scopes: ['openid', 'profile']
});

const App = () => {
  return (
    <AuthProvider authService={authService} >
      <Routes />
    </AuthProvider>
  )
}

export default App
```

### Custom Provider/Endpoint

After https://github.com/gardner/react-oauth2-pkce/pull/16 it is possible to pass in just `provider` or `authorizeEndpoint`, `tokenEndpoint` and `logoutEndpoint`. These two parameters were added to maintain backwards compatibility while enabling callers to customize the endpoint.

### End User Session on "Single Application Logout"
You can end user session when calling `logout(true)`. A custom endpoint can configured by passing `logoutEndpoint` as props. The user will be redirected to the `redirectUri`.

## License

MIT © [Gardner Bickford](https://github.com/gardner)
