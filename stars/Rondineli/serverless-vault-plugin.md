---
repo: Rondineli/serverless-vault-plugin
url: 'https://github.com/Rondineli/serverless-vault-plugin'
homepage: null
starredAt: '2018-11-15T23:36:28Z'
createdAt: '2018-09-18T13:12:58Z'
updatedAt: '2024-10-13T07:53:01Z'
language: JavaScript
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:04.360Z'
description: >-
  Plugin to read secrets from vault and inject to your lambda project using kms
  and base64 encryption.
tags:
  - kms
  - lambda
  - nodejs
  - secret
  - serverless
  - serverless-framework
  - serverless-plugin
  - serverless-vault-plugin
  - store-secrets
  - vault
---

# serverless-vault-plugin

[![CircleCI](https://circleci.com/gh/Rondineli/serverless-vault-plugin/tree/master.svg?style=svg)](https://circleci.com/gh/Rondineli/serverless-vault-plugin/tree/master)


## Why?
[Vault](https://learn.hashicorp.com/vault/) is an amazing tool to use to store secrets.

Since I started using lambda + serverless, I have been looking for something that could allow me deploy in a safe way (avoiding writing environment files or commiting my passwords on github to be able using a continuous deployment, so I decided to write my own plugin to solve this problem.

## Why not SSM?
I have been using vault as my store secret and it's been working well since then I have managed to keep using it to any apps based on app authentication or keys trought my vault api. When we decided move to lambda we didn't want to move anything else to aws (I know we are lock-in), but then we decided to keep vault as our secret manager.

## Why KMS then?
Although we are using Vault, once we retrieve the secrets from it, they go plain text (not desirable). So, I just store my secrets in KMS after we retrieve them from Vault and then my Lambda function will be able to decrypt them.

## Topology
![* Topology](img/topology.png)

## How to use it?
### Add those configs in your `serverless.yml`

#### Using token method auth
```
custom:
  config: ${file(env/${opt:stage}.yml)}

  vault:
    token: "<app token>"
    url: "https://vault:8200"
    secret: "secret/path"
    ssl_check: false
    version: "v1"
  kms:
    keyId: ${env:KEY_KMS_ID}
```
#### Using Userpass auth
```
custom:
  config: ${file(env/${opt:stage}.yml)}

  vault:
    method: "Userpass"
    user: "my vault user"
    password: "my user password"
    url: "https://vault:8200"
    secret: "secret/path"
    ssl_check: false
    version: "v1"
  kms:
    keyId: ${env:KEY_KMS_ID}
```

### Using single path secrets with multiples passwords
```
custom:
  config: ${file(env/${opt:stage}.yml)}

  vault:
    method: "Userpass"
    user: "my vault user"
    password: "my user password"
    url: "https://vault:8200"
    secret: "secret/path"
    ssl_check: false
    version: "v1"
  kms:
    keyId: ${env:KEY_KMS_ID}
```

Then add your env var as a list
```
environment:
  - VAR_FOO
  - VAR_BAR
```

It needs a structure at vault like, `vault write secret/path VAR_FOO=foo VAR_BAR=bar`


### Using multiple paths secrets with multiples or single password
```
custom:
  config: ${file(env/${opt:stage}.yml)}

  vault:
    method: "Userpass"
    user: "my vault user"
    password: "my user password"
    url: "https://vault:8200"
    secret: "secret"
    ssl_check: false
    version: "v1"
  kms:
    keyId: ${env:KEY_KMS_ID}
```

Then add your env var as a list
```
environment:
  - path_foo
  - path_bar
```

It needs a structure at vault like, `vault write secret/path_foo ANY_FOO=foo && vault write secret/path_bar ANY_BAR=bar`

It will fetch all passwords under those paths.

Once you run `sls deploy -s <stage>`, it will fetch the vault and will try to find `VAR_FOOR`, `VAR_BAR` (using your secret path). It will then encrypt it on KMS and set the environment variables to your deployment runtime.
