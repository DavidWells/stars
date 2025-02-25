---
repo: matchilling/aws-kms-boilerplate
url: 'https://github.com/matchilling/aws-kms-boilerplate'
homepage: >-
  https://www.matchilling.com/storing-security-sensitive-data-using-aws-kms-and-openssl/
starredAt: '2017-12-27T22:44:10Z'
createdAt: '2017-12-21T07:57:17Z'
updatedAt: '2024-06-07T14:48:28Z'
language: Shell
license: GPL-3.0
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:33.063Z'
description: "\U0001F510 This repository contains the example code for the blog post \"Painlessly storing security sensitive data using AWS KMS and OpenSSL\""
tags:
  - aws-kms
  - encryption
  - key-management
  - openssl
  - security
---

# AWS KMS Boilerplate
This repository contains the example code for the blog post ["Painlessly storing security sensitive data using AWS KMS and OpenSSL"](https://www.matchilling.com/storing-security-sensitive-data-using-aws-kms-and-openssl/)

## Usage
- Setup your AWS account
- Create an AWS KMS Customer Master Key as described and assign an alias to it as described in step 1 and 2 of the article.
- Place your security sensitive data such as API keys, database credentials etc. in the `.decrypted/` folder.
- For encryption execute `./bin/encrypt --kms_key_id=alias/your-key`.
- For decryption execute `./bin/decrypt`.
- *Note: activate the debugging mode by passing `--debug=true` into the script*

## License
This distribution is covered by the **GNU GENERAL PUBLIC LICENSE**, Version 3, 29 June 2007.

## Support & Contact
Having trouble with this repository? Check out the documentation at the repository's site or contact m@matchilling.com and we’ll help you sort it out.

Happy Coding

:v:
