---
repo: ravenscar/franken-srp
url: 'https://github.com/ravenscar/franken-srp'
homepage: null
starredAt: '2020-12-30T23:00:45Z'
createdAt: '2020-12-23T00:30:10Z'
updatedAt: '2024-10-07T04:33:57Z'
language: TypeScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:13.367Z'
description: Library to facilitate SRP login with AWS Cognito User Pools
tags: []
---

# franken-srp


Low-level library to facilitate SRP login with AWS Cognito User Pools. It supports SMS MFA, TOTP software token MFA, new password setting after using a temporary password, and devices. It also has a helper for using the refresh token to get new id/access tokens.

It is written in Typescript and is fully typed with guards for the AWS responses.
## Usage
Install with npm

`npm i franken-srp`

Use node or webpack.

Login
```TypeScript
const { srpLogin } = require("franken-srp");

const poolParams = {
  region: "ap-southeast-2",
  userPoolId: "ap-southeast-2_123456789",
  clientId: "abcdefghijklmnopqrstuvwxyz",
};

const doLogin = async (username, password) => {
  const login = srpLogin({
    ...poolParams,
    username,
    password,
  });

  const result = await login.next();
  if (result.value.code === "TOKENS") {
    return result.value.response;
  }

  throw new Error(`got unexpected result code: ${result.code}`);
};

doLogin("jeff@amazon.com", "hunter2").then(console.log).catch(console.warn);
```
If the login is successful you'll see something like:
```TypeScript
{
  username: 'jeff@amazon.com',
  tokens: {
    accessToken: 'eyJraWQiOiJubTMyZGc1TXBCSmNrUUkxcjhhZ2xKVGFram91WkpOMG5uY...',
    idToken: 'eyJraWQiOiJ2anE5XC9xOVRpYmxTUkpodW5OXC9wVEtmSk1SemdUVmJUYm8wM...',
    refreshToken: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9B...',
    tokenType: 'Bearer',
    expiresIn: 3600
  },
  newDevice: undefined
}
```
Refresh
```TypeScript
const { refresh } = require("franken-srp");

const poolParams = {
  region: "ap-southeast-2",
  userPoolId: "ap-southeast-2_123456789",
  clientId: "abcdefghijklmnopqrstuvwxyz",
};

refresh({
  ...poolParams,
  refreshToken: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9B...',
})
  .then(console.log)
  .catch(console.warn)

```
If the refresh is successful you'll see something like:
```TypeScript
{
  tokenType: 'Bearer',
  expiresIn: 3600,
  idToken: 'eyJraWQiOiJ2anE5XC9xOVRpYmxTUkpodW5OXC9wVEtmSk1SemdUVmJUY...',
  accessToken: 'eyJraWQiOiJubTMyZGc1TXBCSmNrUUkxcjhhZ2xKVGFram91WkpOM...'
}
```
## Caveats
If you use this library (or Amplify, or the Cognito-idp SDK calls) then you lose OAuth and OIDC features. The only way to get these with Cognito user pools is to use the Hosted UI. 

It is important to understand that with the above you also lose things like the OAuth code flow. This may be important to you if you are using a mobile app and using a webview to do login.

`franken-srp` facilitates only the login, device registration, and refresh functionalities of user pools. It does not handle signups, password changes, MFA failover, nor any other cognito functionality. It is a low-level library and as such has no UI components nor any opinion about where you should store the tokens, that's up to you. It is worth mentioning there is a [react component](https://github.com/ravenscar/franken-srp-react/) that uses this library.

## API

### srpLogin
`async function* srpLogin(TSrpLoginParams) => TSrpLoginResponse` 

```TypeScript
type TSrpLoginParams = {
  region: string; // aws region of user pool (e.g. "ap-southeast-2")
  userPoolId: string; // full user pool ID (e.g. ap-southeast-2_123456789)
  clientId: string; // user pool client ID (e.g. "abcdefghijklmnopqrstuvwxyz")
  username: string;
  password: string;
  device: undefined | {
    key: string;
    groupKey: string;
    password: string;
  };
  autoConfirmDevice: boolean;
  autoRememberDevice: "remembered" | "not_remembered" | null; 
}
```

If devices are not enabled in the user pool `device`, `autoConfirmDevice` and `autoRememberDevice` have no effect. If devices are enabled then it is recommended to set `autoConfirmDevice` to true, this registers the device for device tracking (but not remembering). If a device is not confirmed then the access token is usable but the refresh token is not. If `autoConfirmDevice` is `"remembered"` then the device can be used to skip MFA on subsequent logins, if this feature is enabled in the user pool.

If you are using devices and have not provided a device, make sure to save the key, groupKey, and password as they will needed if you plan to reuse the device on a subsequent login. You will need the key for refresh functionality.

```TypeScript
type TSrpLoginResponse = AsyncGenerator<TAuthStep, TAuthStep, string>;

type TAuthStep = {
  code: TAuthStepCode;
  error?: Error;
  response?: TAuthResponse;
  hint?: string; // for MFA e.g. "number ending in ****22"
};

type TAuthStepCode = "TOKENS" | "ERROR" | "SMS_MFA_REQUIRED" | "SOFTWARE_MFA_REQUIRED" | "NEW_PASSWORD_REQUIRED"

type TAuthResponse = {
  username: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    tokenType: string;
    expiresIn: number;
  };
  newDevice?: {
    key: string;
    groupKey: string;
    password?: string;
    deviceAutoConfirmed: boolean;
    deviceAutoRemembered?: "remembered" | "not_remembered";
    userConfirmationNecessary?: boolean;
  };
}
```
`srpLogin` returns an async generator of type `TSrpLoginResponse` which returns and yields `TAuthStep` on each `next()`. If a parameter is passed to `next()` (for MFA or new password) it will be a `string`.

In practice this means that when calling `next()` a promise will be returned which will resolve to an iterator result:
```TypeScript
{
  done: boolean,
  value: TAuthStep
}
```
`value.code` can be inspected and if it is `TOKENS` then the tokens (and other info) will be returned in `value.response`. In the case the code is `SMS_MFA_REQUIRED`, `SOFTWARE_MFA_REQUIRED`, or `NEW_PASSWORD_REQUIRED` then the value must be passed to the subsequent next call, e.g.

```TypeScript
login.next("MyNewPassword")
```

The `value.hint` field may be present when using SMS MFA, it may contain a `string` like "number ending in ****22". Note that if the MFA code is incorrectly entered it can be detected by the code remaining the same, it may be retried. If an `ERROR` is returned then the iterator is done, the `value.error` will hold the error.
### refresh

`async function refresh(TInitiateRefreshTokenParams) => Promise<TInitiateRefreshTokenResponse>`

```TypeScript
type TInitiateRefreshTokenParams = {
  region: string;
  clientId: string;
  refreshToken: string;
  deviceKey?: string;
};
```
When devices are enabled in the user pool (optional or not) then a device key must be passed to refresh or it will fail. You also must ensure that the device has been confirmed prior to calling refresh, you can do this by setting `autoConfirmDevice: true` in srpLogin (recommended) or by confirming the device later. This is irrespective of whether or not the device has been remembered.
```TypeScript
type TInitiateRefreshTokenResponse = {
  tokenType: string;
  expiresIn: number;
  idToken: string;
  accessToken: string;
};
```
### confirmDevice
`async function confirmDevice(TConfirmDeviceParams) => TConfirmDeviceResponse`

If you do not have `autoConfirmDevice: true` in srpLogin you can manually confirm the device by calling `confirmDevice`. I don't know why you would do this but Cognito splits this out, so there you are.
```TypeScript
type TConfirmDeviceParams = {
  accessToken: string;
  region: string;
  deviceName?: string;
  deviceKey: string;
  deviceGroupKey: string;
  autoRememberDevice: "remembered" | "not_remembered" | null;
};
```
If devices are optional on the user pool but you want to automatically remember this one (perhaps it's a phone app) then you can set `autoRememberDevice` to true. If this is not set then you will have to manually call the AWS endpoint to confirm a device.
```TypeScript
type TConfirmDeviceResponse = {
  deviceKey: string;
  deviceGroupKey: string;
  devicePassword: string;
  deviceAutoConfirmed: true;
  deviceAutoRemembered: boolean;
  userConfirmationNecessary: boolean;
}
```
Make sure to save the key, groupKey, and password as they will needed if you plan to reuse the device on a subsequent login. You will need the key for refresh functionality.
## That's disgusting, why did you use an async generator?
The login process can be simple and a single step, or it can be a laborious process where a new password is required to be set and MFA is mis-entered several times. The generator responds with a code which lets you know what response it expects next, so it is fairly trivial to code for. Also, I dislike classes.
## Why us SRP?
We needed to use SRP as it is a pre-requisite to using device tracking with Cognito. It is also preferable to sending the plaintext password. 

If implemented correctly the password never needs to be sent across the wire, and therefore cannot be insecurely stored. It appears that AWS have not properly implemented it for user pools as at some point the password is always sent, however it does seem to be done properly for devices.


## Why does this exist?

SRP is hard, Cognito SRP is harder because it's

1. Not well documented, all implementations I have found seem to be reverse engineered.
2. Not standard, pretty much incompatible with every other SRP lib we tried.

We could not find an acceptable library which had the functionality needed so we wrote one. We were very frustrated dealing which what we perceived as a cobbled together implementation of SRP, it seemed like a Frankenstein's monster at times and that name stuck.

## Why not use the hosted UI?

The hosted UI was far to inflexible for us. Not only is it *barely* customisable for a few CSS properties it did not handle a lot of requirements we had when moving from another auth provider. I would consider using the hosted UI only if I was asked to provide an absolute bare minimum login screen for someone I didn't like.

Dealbreakers for us:
* Case sensitive logins (now fixed)
* No silent refresh
* Can't pre-fill the username field (important if you have more than one pool)
* No passwordless support
* Very very basic UI customisation
* Incomprehensible error messages displayed to the users

Honestly, if your standards are such that you are able to accept the Hosted UI then I recommend you do so, it will be much easier for the implementer although perhaps less pleasant for the end user.

## Why not use AWS Amplify?

When we first looked at [Amplify](https://github.com/aws-amplify/amplify-js) it has 400 open issues, at the time of writing this, not too much later, it has over 700. I had several Github issues open on it and its [predecessor](https://github.com/amazon-archives/amazon-cognito-auth-js) in addition to some AWS enterprise support tickets and did not feel like they were likely to be solved any time soon. After looking at the codebase it became clear that the quality of the code was not something we looked forward to be tied to long term.

I feel there is a very narrow set of applications where I would feel comfortable recommending Amplify, if you're not doing a high school project I expect you would fall outside this set. I hope this changes in the future and more development time is allocated to it so the project can match the marketing promises.
