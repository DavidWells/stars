---
repo: skogsmaskin/passport-netlify
url: 'https://github.com/skogsmaskin/passport-netlify'
homepage: ''
starredAt: '2019-01-31T04:14:56Z'
createdAt: '2019-01-29T02:40:15Z'
updatedAt: '2020-08-16T15:38:44Z'
language: TypeScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:49.507Z'
description: ' Passport.js strategy for authenticating with Netlify using the OAuth 2.0 API.'
tags: []
---

# passport-netlify
[Passport](http://passportjs.org/) strategy for authenticating with
[Netlify](https://www.netlify.com/) using the OAuth 2.0 API.
 
[![Build Status](https://travis-ci.com/skogsmaskin/passport-netlify.svg?branch=master)](https://travis-ci.com/skogsmaskin/passport-netlify)

This module lets you authenticate with Netlify in your Node.js applications.
By plugging into Passport, Netlify authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).


## Install

```bash
$ npm install passport-netlify
```

## Usage

#### Create an Application

Before using `passport-netlify`, you must register an application with Netlify.
If you have not already done so, a new application can be created at
[OAuth applications](https://app.netlify.com/account/applications) within
your Netlify account settings panel.  Your application will be issued a
client ID and client secret, which need to be provided to the strategy.
You will also need to configure a callback URL which matches the route in your application.

#### Configure Strategy

The Netlify authentication strategy authenticates users using a Netlify account
and OAuth 2.0 tokens. The client ID and secret obtained when creating an
application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token, as well as 
`profile` which contains the authenticated user's Netilify profile. 
The `verify` callback must call `cb` providing a user to complete authentication.

```js
const NetlifyStrategy = require('passport-netlify').Strategy;

passport.use(new NetlifyStrategy({
    clientID: NETLIFY_CLIENT_ID,
    clientSecret: NETLIFY_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/netlify/callback",
    state: true // use OAuth2 state param to protect against csrf attacks (requries express-session)
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({provider: 'netlify': providerId: profile.id }, (err, user) => {
      return cb(err, user)
    })
  }
))
```

*Note: While Netlify doesn't support refresh tokens (as for Jan. 2019),
the verify callback still uses a second parameter `refreshToken` to conform
to the OAuth2 standard. This makes it easier to  share a verify callback function
for all `passport-oauth2` based authentications you use with Passport.js.
The `refreshToken` will be undefined with this strategy, and should just be ignored.*

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'netlify'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/netlify', passport.authenticate('netlify'))

app.get('/auth/netlify/callback', 
  passport.authenticate('netlify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
```
