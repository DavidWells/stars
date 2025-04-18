---
repo: xhiroga/aws-peacock-management-console
url: 'https://github.com/xhiroga/aws-peacock-management-console'
homepage: ''
starredAt: '2021-10-24T05:34:37Z'
createdAt: '2021-10-16T10:49:34Z'
updatedAt: '2025-02-22T07:59:21Z'
language: TypeScript
license: MIT
branch: main
stars: 99
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.968Z'
description: >-
  Browser Extension to show account alias and change color of AWS Management
  Console, even if AWS SSO or multi session
tags:
  - aws
  - aws-management-console
  - aws-sso
  - browser-extension
  - chrome-extensions
  - firefox-addon
---

# AWS Peacock Management Console ![Peacock](./public/icons/128.png)

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/bknjjajglapfhbdcfgmhgkgfomkkaidj.svg)](https://chrome.google.com/webstore/detail/aws-peacock-management-co/bknjjajglapfhbdcfgmhgkgfomkkaidj?utm_source=github)
[![Firefox Add-on](https://img.shields.io/amo/v/aws-extend-switch-roles3.svg)](https://addons.mozilla.org/firefox/addon/aws-peacock-management-console/)

Browser Extension to show account name or alias and change color of AWS Management Console, even if AWS SSO.

![Screenshot](images/aws-peacock-mc.png)

AWS Peacock Management Console store configuration which maps environment(Account ID and Region) to style(color). In AWS Management Console, it modify HTML tags to change color and show account alias. If logged in by AWS SSO, show account name than account name.

## Disclaimer

While effort has been made to ensure the accuracy of the program, developers assumes no responsibility for any problem caused by this extension.

## Install

- [AWS Peacock Management Console - Chrome Web Store](https://chrome.google.com/webstore/detail/aws-peacock-management-co/bknjjajglapfhbdcfgmhgkgfomkkaidj?utm_source=github)
- [AWS Peacock Management Console – 🦊 Firefox ADD-ONS](https://addons.mozilla.org/firefox/addon/aws-peacock-management-console/)

## Development

```shell
yarn
yarn watch
# Click `Load Unpacked` from chrome://extensions and select .`/dist`
```

## License

Code is provided by [LICENSE](./LICENSE). (icons are not included)  
Icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)

## References and Inspiration

- [Peacock - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
- [tilfinltd/aws-extend-switch-roles: Extend your AWS IAM switching roles by Chrome extension, Firefox add-on, or Edge add-on](https://github.com/tilfinltd/aws-extend-switch-roles)
- [yaggytter/chrome-extension-awssso: Chrome Extension for AWS SSO](https://github.com/yaggytter/chrome-extension-awssso)
