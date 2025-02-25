---
repo: andreabedini/aws-credentials-from-saml
url: 'https://github.com/andreabedini/aws-credentials-from-saml'
homepage: 'https://addons.mozilla.org/en-US/firefox/addon/aws-credentials-from-saml/'
starredAt: '2021-02-09T00:41:31Z'
createdAt: '2019-10-31T01:32:39Z'
updatedAt: '2023-02-17T11:24:09Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:03.148Z'
description: Intercepts AWS credentials from SAML SSO login
tags:
  - aws
  - aws-saml-sso
  - firefox-extension
  - webextension
---

# AWS credentials from SAML

## The problem

_Enterprise_ companies have a strong desire to centralise identity
management into a single platform/solution, like Azure AD, Auth0, Okta, G-suite SAML provider or
others. In this scenario one can get access to AWS through Federated SAML
SSO (you can read about it [here][AWS SAML SSO]).

But there's a problem: if you live and breathe AWS, you certanly loathe
clicking around on the console and you insist scripting the hell of out
your infrastructure management. In the end it's 2019 and Infrastructure as
Code is not even a buzzword anymore.

## The solution

This is a browser extensino that allows you to get your job done without
any causing any trouble. The extension incercepts the SAMLResponse sent
from the IdP to AWS and uses AWS [assumeRoleWithSAML] API to obtain a set
of credentials that you can use from the AWS CLI or any other application.

The credentials file is automatically downloaded to your download folder as
you do the SAML login. The name of the file is set to always be
`credentials` (overwriting the file if necessary). This allows you to point
the AWS CLI to a stable file.

## Configuring the AWS CLI

AWS CLI can read the location of the credentials file [from the
environment][AWS CLI environment variables]. Setting
`AWS_SHARED_CREDENTIALS_FILE` to the `credentials` file in your browser's
download folder should do the trick.

Assuming browser downloads files to the folder `Downloads` in your home,
here is what you have to do.

On Linux/macOS: add the following to `.bashrc` or `.bash_profile`

```sh
export AWS_SHARED_CREDENTIALS_FILE=$HOME/Downloads/credentials
```

On Windows: open the terminal and type the following (has to be done only
once, the change will persist)

```cmd
setx AWS_SHARED_CREDENTIALS_FILE C:\Users\<username>\Downloads\credentials
```

## Prior art

- Christian Frichot's version of the same idea https://github.com/xntrik/aws-saml-capture-extension . We kinda worked on this at the same time.
- Dave Johnson https://github.com/sportradar/aws-azure-login . Uses a
    headless browser to do the authentication.
- G.T.C. (Gerard) Laan's version https://github.com/sportradar/aws-azure-login . Very similar and more customisable, I wasn't aware of it before writing my own solution.
- The more I look the more [I find][related extensions]
## License

Licensed under [MIT License][MIT License]

[AWS SAML SSO]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html
[assumeRoleWithSAML]: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithSAML.html
[AWS CLI environment variables]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
[MIT License]: https://choosealicense.com/licenses/mit/
[related extensions]: https://addons.mozilla.org/en-US/firefox/search/?q=aws%20saml
