---
repo: bericp1/netlify-cms-oauth-provider-node
url: 'https://github.com/bericp1/netlify-cms-oauth-provider-node'
homepage: ''
starredAt: '2021-05-23T17:45:29Z'
createdAt: '2019-11-30T19:13:00Z'
updatedAt: '2025-02-22T13:21:25Z'
language: JavaScript
license: MIT
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:38.536Z'
description: >-
  A stateless external OAuth provider for netlify-cms with built-in support for
  Vercel serverless functions
tags:
  - netlify-cms
  - oauth2
  - serverless-functions
  - vercel
  - vercel-serverless
  - zeit
---

# `netlify-cms-oauth-provider-node`

[![](https://img.shields.io/npm/v/netlify-cms-oauth-provider-node)](https://www.npmjs.com/package/netlify-cms-oauth-provider-node)

A stateless [external OAuth provider](https://www.netlifycms.org/docs/authentication-backends/#external-oauth-clients)
for `netlify-cms`.

This package exposes an API that makes it easy to use in a traditional long-running Node server (i.e. using `express`)
or in stateless serverless functions (i.e.
[Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)).

## Usage

**Note:** More detailed documentation and inline code samples are in the works. For now, it's best to check out the
examples:

-   [Generic Node HTTP server](./examples/generic)
-   [Vercel functions](./examples/vercel)

### Overview

This library exports handler-creating functions:

-   `createBeginHandler(config: object, options: CreateConfigOptions): function(state: string=): Promise<string>`
-   `createCompleteHandler(config: object, options: CreateConfigOptions): function(code: string=, params: object=): Promise<string>`
-   `createHandlers(config: object, options: CreateConfigOptions): ({ begin: (function(state: string=): Promise<string>), complete: (function(code: string=, params: object=): Promise<string>) })`
-   `createVercelBeginHandler(config: object, options: CreateConfigOptions): AsyncVercelServerlessFunction`
-   `createVercelCompleteHandler(config: object, options: CreateConfigOptions): AsyncVercelServerlessFunction`
-   `createVercelHandlers(config: object, options: CreateConfigOptions): ({ begin: AsyncVercelServerlessFunction, complete: AsyncVercelServerlessFunction })`

They do the following:

-   Generic handlers
    -   `createBeginHandler`: Creates a generic async function that takes an optional `state` string parameter (possibly used
        for CSRF protection, not currently implemented in this library) and resolves eventually with a URL to redirect the
        user to in order to kick off the netlify-cms OAuth flow with the provider (i.e. GitHub).
    -   `createCompleteHandler`: Creates a generic async function that takes an authorization code (and optional additional
        parameters) received from the OAuth provider and eventually resolves with a string of HTML that should be returned
        to the requesting user. The HTML will use the `postMessage` API to send the access token that we got from exchanging
        the authorization code with the provider to netlify-cms.
    -   `createHandlers`: Creates both of the above handlers and returns an object containing them on the `begin` and
        `complete` keys.
-   Vercel Handlers
    -   `createVercelBeginHandler`: Creates an async Vercel serverless function that handles everything for you and
        delegates to the generic begin handler described above.
    -   `createVercelCompleteHandler`: Creates an async Vercel serverless function that handles everything for you and
        delegates to the generic complete handler described above.
    -   `createVercelHandlers`: Creates both of the above async Vercel serverless functions and returns an object containing
        them on the `begin` and `complete` keys.

That's a lot to digest but essentially:

-   All of the handler-creating functions take two optional arguments:
    -   `config: object`: An `object` that can have any of the [configuration parameters](#configuration). This object
        is optional but some configuration parameters are not (they can be specified i.e. via env variables and setting
        `useEnv` in `options` to `true` instead of via this object.)
    -   `options: CreateConfigOptions`: An object that can take any of the [`CreateConfigOptions` options](#createconfigoptions)
        that effect how config is read, compiled, and validated. Typically you'll want to pass `{ useEnv: true }` for this
        to read config from the environment, which is disabled by default for security and predictability.

## Configuration

**Note:** More detailed documentation on available configuration parameters are in the works.

For details on available configuration parameters, check out [`lib/config.js`](./lib/config.js) which uses
[`convict`](https://github.com/mozilla/node-convict) to parse and validate configuration. To sum up:

-   `origin: string|array`: Required. The HTTP origin of the host of the netlify-cms admin panel using this OAuth
    provider. Multiple origin domains can be provided as an array of strings or a single comma-separated string. You can
    provide only the domain part (`'example.com'`) which implies any protocol on any port or you can explicitly specify
    a protocol and/or port (`'https://example.com'` or `'http://example.com:8080'`).
-   `completeUrl: string`: Required. The URL (specified during the OAuth 2.0 authorization flow) that the `complete`
    handler is hosted at.
-   `oauthClientID: string`: Required. The OAuth 2.0 Client ID received from the OAuth provider.
-   `oauthClientSecret`: Required. The OAuth 2.0 Client secret received from the OAuth provider.
-   `dev: boolean=`: Default: `process.env.NODE_ENV === 'development'`. Enabled more verbose errors in the generated HTML
    UI, etc.
-   `adminPanelUrl: string=`: Default: `''`. The URL of the admin panel to link the user back to in case something
    goes horribly wrong.
-   `oauthProvider: string=`: Default: `'github'`. The Git service / OAuth provider to use.
-   `oauthTokenHost: string=`: Default: `''`. The OAuth 2.0 token host URI for the OAuth provider. If not provided,
    this will be guessed based on the provider.
-   `oauthTokenPath: string=`: Default: `''`. The relative URI to the OAuth 2.0 token endpoint for the OAuth provider.
    If not provided, this will be guessed based on the provider.
-   `oauthAuthorizePath: string=`: Default: `''`. The relative URI to the OAuth 2.0 authorization endpoint for the
    OAuth provider. If not provided, this will be guessed based on the provider.
-   `oauthScopes: string=`: Default: `''`. The scopes to claim during the OAuth 2.0 authorization request with the OAuth
    provider. If not provided, this will be guessed based on the provider with the goal to ensure the user has read/write
    access to repositories.

Config can be passed as an object as the first argument of any handler-creating function and additionaly via
environment variables as long as you pass `{useEnv: true}` as the second argument to any handler-creating function
to enable this behavior. See below.

### `CreateConfigOptions`

In addition to config, there's also the options object optionally passed as the second arg of any handler creating
function. It determines how configuration is compiled. For example, by default configuration will not be read from
the environment; one must set `useEnv` to `true` in the options to enable that functionality.

The available options are:

-   `useEnv?: boolean`: Default: `false` (for security and predictability). Set to `true` to load config from
    `process.env`.
-   `useArgs?: boolean`: Default: `false` (for security and predictability). Set to `true` to load config from
    `process.argv`.
-   `extraConvictOptions?: object`: Default: `{}`. Additional [`opts` to pass to `convict`](https://github.com/mozilla/node-convict/tree/master/packages/convict#var-config--convictschema-opts).
-   `extraValidateOptions?: object`: Default: `{}`. Additional [`options` to pass to `config.validate`](https://github.com/mozilla/node-convict/tree/master/packages/convict#configvalidateoptions).
-   `skipAlreadyValidatedCheck?: boolean`: Default: `false`. Always reload and revalidate config when it's passed in even
    if the object instance already has been. This is generally used for i.e. tests and internal use and isn't very helpful
    but if you mutate the config object at all, you might need this.

## TODO

-   [ ] More detailed usage instructions and examples
-   [ ] More detailed configuration documentation
