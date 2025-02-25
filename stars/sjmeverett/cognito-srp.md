---
repo: sjmeverett/cognito-srp
url: 'https://github.com/sjmeverett/cognito-srp'
homepage: null
starredAt: '2021-05-15T22:07:15Z'
createdAt: '2018-02-04T22:54:44Z'
updatedAt: '2024-09-01T10:12:52Z'
language: TypeScript
license: NA
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:40.775Z'
description: Secure Remote Password protocol implementation compatible with Amazon Cognito
tags: []
---

# cognito-srp

Secure Remote Password protocol implementation compatible with Amazon Cognito.

This package borrows heavily from the [srp-js](https://www.npmjs.com/package/srp-js) package, but implements a slight variant
of the protocol in order to work with Amazon Cognito. Also inspired by bits from
[amazon-cognito-identity-js](http://www.npmjs.com/package/amazon-cognito-identity-js), the official client library.

Use it if you want to interact with Cognito without all the bloat of the AWS SDK, or if you want to write a server that acts
like Cognito, and is therefore compatible with the AWS SDK. Alternatively, use simply as a replacement for `srp-js`.

## Usage

First, install:

```
yarn add cognito-srp
```

Then import. Your starting point will usually be the `UserPool` class:

```js
import { UserPool } from 'cognito-srp';
```

Instantiate a pool, using your pool name:

```js
const userPool = new UserPool('7DZy4Fkn7');
```

Note that the pool name here is not the full `UserPoolId` that the AWS SDK asks for, i.e.:

```js
const UserPoolId = 'us-east-2_7DZy4Fkn7';
const poolname = UserPoolId.split('_')[1];
```

Then the usage differs depending on whether you want to use it on the client or server.

### On the server

Before you can check the identity of users, you need to create at least one:

```js
const user = await userPool.createUser({username: 'testuser', password: 'pass123'});
```

The `user` object contains the `username`, a `salt`, and a `verifier` value, a long string of hex
which can be thought of as a password hash.

When checking the identity of a user, the client will first make a request, passing
the username and a generated key called `A`.

Assuming you can find the user from the username, you can then ask for a password challenge:

```js
const challenge = await userPool.getServerChallenge(user);
```

From the challenge, you can get the server's generated key, called `B`, to pass back to the client.

```js
const B = challenge.calculateB();
```

You can also start a session, passing the client's key, `A`:

```js
const session = challenge.getSession(A);
```

The server sends `B` back to the client, along with their salt and a base64-encoded "secret block".
I'm not completely sure what that block is for, perhaps session management.

Then the client will make another request with a password signature, the secret block, and a timestamp.
To verify that they have the correct password, you must also calculate the signature and compare the two.
If they match, the client has the correct password.

```js
const signature = session.calculateSignature(secretBlock, timestamp);

if (signature === requestSignature) {
  // yay
}
```

If you need to bin the session and rehydrate it later, for example, between the two requests, you can
recreate it from the "HKDF" value:

```js
const hkdf = session.getHkdf();

// ...

const newSession = new Session(poolname, username, hkdf);
```

Note that knowing the HKDF is as good as knowing the password for this session, so keep it safe
if you're writing something important.

If you're writing a mock server to test something that uses cognito, you could send the HKDF
out as the "secret block", as the client will echo it back to you on the next request, and
it saves trying to store it.

**This is obviously not a good idea in production.**

### On the client

Once the user has entered their username and password, you can create a challenge:

```js
const challenge = await userPool.getClientChallenge({username, password});
```

You can then make a request to the server with the user's username and a client key (`A`):

```js
const A = challenge.calculateA();
```

The server will respond with the server key (`B`), the user's salt, and a secret block.
The client can then create a session:

```js
const session = challenge.getSession(B, salt);
```

Then, the client can calculate the signature as proof that it knows the password:

```js
const timestamp = getTimestamp();
const signature = session.calculateSignature(secretBlock, timestamp);
```

The client sends the secret block, timestamp and signature back to the server, and its
identity is established.

## Notes

The exact format of the requests and responses to Amazon Cognito is outside the scope of this package &ndash;
it only implements the SRP stuff, and you can wrap it in whatever protocol you want.

Although this library is compatible with Cognito and therefore successfully implements the Secure Remote Password
protocol, I'm not a security expert, and I don't claim to understand the maths behind it &ndash; keep that in
mind before you use it for something important.
