---
repo: aidansteele/cloudkey
url: 'https://github.com/aidansteele/cloudkey'
homepage: ''
starredAt: '2021-11-06T05:13:34Z'
createdAt: '2021-10-27T06:26:55Z'
updatedAt: '2025-01-12T18:58:54Z'
language: Go
license: NA
branch: main
stars: 158
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.403Z'
description: No need for IAM users when we have Yubikeys
tags: []
---

## cloudkey

As far as I can tell, the only justification for AWS IAM users that I hear 
nowadays is for usage on non-interactive systems outside of AWS, e.g. a Raspberry 
Pi in your closet. This repo uses the little-known [`iot:AssumeRoleWithCertificate`][aws-blog]
functionality to avoid that.

Specifically, it uses the "card authentication" slot on a Yubikey to store a TLS
certificate and private key. This slot can be used to sign requests without a PIN
or touch - perfect for the Raspberry Pi use case. 

Can you think of any other use cases for IAM users? I'd love to hear them. Please
open an issue on this repo and let me know!

# Usage

```
# this command enrols the currently attached Yubikey as an identity that can
# assume two IAM roles.
$ cloudkey enrol
    --identity unique-name-for-this-identity \
    --role role-name-that-can-be-assumed \
    --role maybe-a-second-role-name-too
    
# this command returns temporary IAM credentials in the format expected by the
# aws cli and sdks. 
$ cloudkey credentials role-name-that-can-be-assumed

# the above command is expected to be used in ~/.aws/config and look like the 
# following:
#
# [profile my-profile]
# credential_process = cloudkey credentials <role-name-that-can-be-assumed>
#
# usage:
$ aws s3 ls --profile my-profile 
```

[aws-blog]: https://aws.amazon.com/blogs/security/how-to-eliminate-the-need-for-hardcoded-aws-credentials-in-devices-by-using-the-aws-iot-credentials-provider/
