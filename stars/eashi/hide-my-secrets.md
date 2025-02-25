---
repo: eashi/hide-my-secrets
url: 'https://github.com/eashi/hide-my-secrets'
homepage: ''
starredAt: '2020-12-29T04:25:23Z'
createdAt: '2020-07-09T10:18:45Z'
updatedAt: '2024-03-15T10:01:18Z'
language: TypeScript
license: NA
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:14.141Z'
description: A VSCode extension to hide secrets in YAML and JSON files.
tags:
  - hacktoberfest
  - hacktoberfest2020
  - hide-secrets
  - json
  - vscode
  - vscode-extension
  - yaml
---

# hide-my-secrets 

A Visual Studio Code extension to hide secret text in YAML files. The extension is written live on Twitch on [emadashi's channel](https://twitch.tv/emadashi). So make sure you join every Thursday at 20:00 AEST time.

![Hiding Secrets](https://raw.githubusercontent.com/eashi/hide-my-secrets/master/hide-my-secret.gif)


## Acknowledgement

Awesome people in the Twitch channel help without calling for credit, without them this extension wouldn't have been possible. Big thanks to them:

- [@codeandcoffee](https://github.com/tkoster)
- [@jsobell](https://github.com/jsobell)
- [@jothamr](https://www.twitch.tv/jothamr)
- Amal Abeygunawardana
- [@pjimmy](https://twitter.com/pjimmy)
- [@hossambarakat](https://twitter.com/hossambarakat_)
- [@JTango18](https://twitter.com/jtango18)

## Features

Once activated this extension hides secrets in YAML files. The secrets can be identified by configuring the extension and adding keys that are considered secrets e.g. "password", "key", "token"..etc.

## Extension Settings
### Hide
Toggle the extension on and off to hide/unhide the secrets.
``` js
"hide-my-secrets.hide": true,
```
### List of secret keys
Add here all the keys that represent secrets.
``` js
"hide-my-secrets.secretKeys": [
        "password",
        "connectionstring",
        "token"
    ]
```
