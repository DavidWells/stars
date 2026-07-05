---
repo: awesome-cdk/cognito-google-federation-example
url: 'https://github.com/awesome-cdk/cognito-google-federation-example'
homepage: ''
starredAt: '2022-02-13T19:18:19Z'
createdAt: '2022-02-06T21:53:42Z'
updatedAt: '2024-09-05T01:26:16Z'
language: TypeScript
license: NA
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:24.432Z'
description: >-
  Use Cognito's Google federated identity integration to allow your app users to
  login with their Google account.
tags:
  - aws-cdk
  - cognito
  - federated-identity
  - google
---

# Cognito + Google federated identity

Use Cognito's Google federated identity integration to allow your app users to login with their Google account.

![](./docs/assets/demo.gif)

**[Live Demo](https://eehvlyuzre.execute-api.us-east-1.amazonaws.com/prod/public)**

### Benefits of implementing this

* Allow your app users to login to your app with their Google account.
* Users are automatically provisioned (mirrored) to your Cognito user pool, should you decide to abandon Google as an
  SSO provider in the future (or allow your users to link multiple external accounts like Facebook, LinkedIn to the same
  Cognito user).

### Overview

Here's a Sequence Diagram, describing the user's journey:

[![](https://mermaid.ink/img/pako:eNqdVF9v2jAQ_yonP7USZe_RhNTSbkPqJETHW148-5JYOHZmOwxW9bvv7CQ0tNBp8ISTu9-_8-WZCSuRZczjrxaNwHvFS8fr3AD9Gu6CEqrhJsAXZ01AI9-_ueNic_LF3JZGBfv-xVdrS43d8wH3ZjbrgTJYRTE-QGsU_QFtS2VgvXqEqx4SvlkfUMJ6cd2h9K0E0ldcAtI_P1YSWmcuEjIYuwBklMnIjlQORQCq_y8vB4R5hWIDipCd4VrvQRXQenTAtUMu98DbUKGhKfEI9VuFqp8UcCFsS4MjAVSg9285urIMFkUCsU794UFZA7hrSLUE68Dglrgq3jRoUE4-_3SfZgT46qrnOjiBgrqO4KapaR01Y7Thhx5BOFE51x64kUAkzm7RDxIjfPQIlTr0YM2VnnZOukfjsBZ9TAeFU0jkS8JVnrR4oLAGrBQjcQx0SeLSWp3U1LyBQqGWHrTaIOQsceds3JIguqq36Y5vUh9XGo41eBNUjXA7DmlOC01TBrprbh_XjtdIXs5v25J7_wFWsj0sk7amJBNbGtA486uF_GEJbQK3QqD3_WGFhUNfpdP5RX3YiYqb8pSNeANOU_5z2z5qG6Xw2vcUrMMzbSkD2jW7UTiBRyu4juW8pNPCSNyhvL-bAAZxfT7n75xmT52UF837eNkoJts6io7ugYoKTspgE1ajo7sj6Yv9HJlyRig15iyjvxIL3uqQs9y8UGnbSMJ-kBSyY1lwLU4YsdqnvRHDuavpP_osK4gEX_4CW70jjw)](https://mermaid.live/edit#pako:eNqdVF9v2jAQ_yonP7USZe_RhNTSbkPqJETHW148-5JYOHZmOwxW9bvv7CQ0tNBp8ISTu9-_8-WZCSuRZczjrxaNwHvFS8fr3AD9Gu6CEqrhJsAXZ01AI9-_ueNic_LF3JZGBfv-xVdrS43d8wH3ZjbrgTJYRTE-QGsU_QFtS2VgvXqEqx4SvlkfUMJ6cd2h9K0E0ldcAtI_P1YSWmcuEjIYuwBklMnIjlQORQCq_y8vB4R5hWIDipCd4VrvQRXQenTAtUMu98DbUKGhKfEI9VuFqp8UcCFsS4MjAVSg9285urIMFkUCsU794UFZA7hrSLUE68Dglrgq3jRoUE4-_3SfZgT46qrnOjiBgrqO4KapaR01Y7Thhx5BOFE51x64kUAkzm7RDxIjfPQIlTr0YM2VnnZOukfjsBZ9TAeFU0jkS8JVnrR4oLAGrBQjcQx0SeLSWp3U1LyBQqGWHrTaIOQsceds3JIguqq36Y5vUh9XGo41eBNUjXA7DmlOC01TBrprbh_XjtdIXs5v25J7_wFWsj0sk7amJBNbGtA486uF_GEJbQK3QqD3_WGFhUNfpdP5RX3YiYqb8pSNeANOU_5z2z5qG6Xw2vcUrMMzbSkD2jW7UTiBRyu4juW8pNPCSNyhvL-bAAZxfT7n75xmT52UF837eNkoJts6io7ugYoKTspgE1ajo7sj6Yv9HJlyRig15iyjvxIL3uqQs9y8UGnbSMJ-kBSyY1lwLU4YsdqnvRHDuavpP_osK4gEX_4CW70jjw)

### Repo summary

This repo is an example AWS CDK project that demonstrates how you can provision the whole AWS infrastructure, including
a dummy NodeJS + Express + API Gateway (with public endpoints for login and protected endpoints to demonstrate a
protected backend API with resources, only accessible to users that went through the Google SSO procedure).

