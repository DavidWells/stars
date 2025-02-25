---
repo: remorses/akarso-sso
url: 'https://github.com/remorses/akarso-sso'
homepage: 'https://akarso.co'
starredAt: '2023-12-29T02:43:13Z'
createdAt: '2023-08-11T19:04:12Z'
updatedAt: '2025-01-25T10:18:56Z'
language: TypeScript
license: NA
branch: preview
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:40.884Z'
description: Implement SSO sign-up with 10 lines of code
tags: []
---

<div align='center'>
    <br/>
    <br/>
    <h3>akarso</h3>
    <p>Implement SSO sign up with 10 lines of code</p>
    <br/>
    <br/>
</div>

Akarso is an alternative to the [WorkOS Admin Portal](https://workos.com/admin-portal) built on top of Supabase.

## Why

Currently if you want to let your customers sign in with SSO via Supabase you have to:

-   Ask the user to create an application in their SSO provider (Google, Azure, etc)
-   Ask them to send the metadata file or url
-   Execute the `supabase sso add` command with their SSO metadata
-   Ask them to try to sign in
-   Troubleshoot why their SSO integration is not working (there are 100 reasons why it could not work, wrong mappings, wrong ACS url, forgot to check an option in Google, etc)
-   Spend hours of support trying to fix their SSO integration, going back and forth in support chat

By instead using Akarso you can just add a button `Setup SSO` in your app that redirects to the Akarso Admin Portal where your customers can setup SSO in a few clicks.

Akarso will guide the user thorough the whole process and will collect the required information to setup SSO in Supabase.

Then akarso will redirect to your application with the SSO provider details (`ssoProviderId` and `identifier`) in the params, here you can update your team entity in the database with the SSO provider id.

## How to use Akarso

-   Sign up at https://akarso.co
-   Create and Admin Portal, choose a slug and add your supabase access token
-   Akarso will host an Admin Portal at `slug.tenants.akarso.co` where your users can setup SSO to your app
-   You can redirect to the Admin Portal from your application with the `akarso` npm package, read how to setup it [in the dashboard](https://akarso.co)

## How it works

-   The `akarso` npm package lets you create an Admin Portal link where you can redirect your users to setup SSO
-   The Admin Portal will ask your customers for the information needed to integrate SSO with Supabase (metadata, domain, etc)
-   The Admin Portal will redirect the user to the `callbackUrl` with a `token` param, you can use the `akarso` npm package to verify the token and get the SSO provider id and identifier
-   Connect your team database entity with the SSO provider id
-   Now you can use `supabase.auth.signInWithSSO` to sign in your users with SSO

## Security

-   Akarso will generate a `secret` for your Akarso account, Akarso can create Admin Portals only if you have this secret
-   Akarso will redirect to your `callbackUrl` with a jwt `token` in the search params, you can use the `akarso` npm package to verify the token against your `secret` to make sure the request comes from Akarso. The token payload contains the SSO provider id and custom `identifier`

## TODO

-   [ ] support custom domain other than `slug.akarso.site`
-   [ ] add function to delete the SSO connection in the `akarso` npm package
