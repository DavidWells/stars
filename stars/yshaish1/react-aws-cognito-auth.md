---
repo: yshaish1/react-aws-cognito-auth
url: 'https://github.com/yshaish1/react-aws-cognito-auth'
homepage: null
starredAt: '2022-01-27T07:19:18Z'
createdAt: '2022-01-26T17:11:39Z'
updatedAt: '2023-01-14T17:40:16Z'
language: TypeScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.592Z'
description: AWS Cognito React Authentication
tags: []
---

<h1 align="center">
   <b>
        <a href="https://github.com/yshaish1/react-aws-cognito-auth">React AWS Cognito Auth</a><br>
    </b>
</h1>

<p align="center">React authentication wrapper for AWS Cognito User Pool</p>

<p align="center">
    <a href="https://github.com/yshaish1/react-cognito-auth"><b>Github</b></a> •
    <a href="https://www.npmjs.com/package/react-aws-cognito-auth"><b>npm</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-aws-cognito-auth.svg?style=flat-square)](https://www.npmjs.com/package/react-aws-cognito-auth)
[![npm downloads](https://img.shields.io/npm/dm/react-aws-cognito-auth.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-aws-cognito-auth)
[![Known Vulnerabilities](https://snyk.io/test/npm/react-aws-cognito-auth/badge.svg)](https://snyk.io/test/npm/react-aws-cognito-auth)

</div>

<div align="center">
This library is helper to aws amplify (with Cognito user pool) authentication with react
</div>

---

### How To Use

first of all you need to create user pool on aws cognito

https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html

---

### Provider

On top of your app need to add <b>react-aws-cognito-auth Provider</b> as describe below

First of all you need to import provider

```javascript
import { ReactCognitoAuthProvider } from 'react-aws-cognito-auth';
```

Then impliment like this (for example)

```javascript
<ReactCognitoAuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ReactCognitoAuthProvider>
```

---

### Configure Amplify

```javascript
import { ReactCognitoAuthConfig } from 'react-aws-cognito-auth';
```

And the configuration itself

```javascript
ReactCognitoAuthConfig({
  region: '###',
  userPoolId: '###',
  userPoolWebClientId: '###',
  idleTime: 10000 // Optinal, time in milliseconds. default = 3600000 (1 hour)
});
```

---

# That's It! 🚀

Now you can call <b>useAuth</b> wherever you want to use.

```javascript
import { useAuth } from 'react-aws-cognito-auth';
```

## Uses

### 🔴 2.0 news

now you can get idle time out.
by default JWT token of cognito user is 1 hour.

if the user is idle for 1 hour so <b>auth.idle</b> will be <b>true</b>

you can check if idle and the token is out of date.

```javascript
if (auth.isIdle()) {
  // do somthing... like popup to reload page
}
```

```javascript
const auth = useAuth();

auth.isLoading();
auth.isIdle();
auth.getCurrentUser();
auth.login('username', 'password');
auth.signup('email', 'username', 'password');
auth.confirmSignup('username', 'code');
auth.logout();
auth.resetPassword('username', 'password', 'resetCode');
```
