---
repo: binxio/cfn-cross-account-dns-provider
url: 'https://github.com/binxio/cfn-cross-account-dns-provider'
homepage: ''
starredAt: '2024-01-23T05:26:01Z'
createdAt: '2023-03-25T08:29:18Z'
updatedAt: '2024-11-10T14:15:47Z'
language: Python
license: NA
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:38.595Z'
description: >-
  Manage DNS records in a Route53 Hosted Zone in another AWS Account, using a
  SNS backed custom CloudFormation resource.
tags:
  - cloudformation
  - cross-account
  - custom-resource
  - route53
---

# CloudFormation custom Cross Account DNS Provider

Manage DNS records in a Route53 Hosted Zone in another AWS Account, using a SNS backed custom CloudFormation resource.

When using a multi account setup for different environments you will face the problem of: Where do I put my Route53 hosted zone?

For this you have 3 options:

1. Put the Route53 Hosted Zone in your production account.
   1. This will mean that you need to manage your dev/test/acceptance records in your production account.
2. Create a hosted zone per environment.
   1. Either you need multiple domains, which cost additional money! 
   2. Or you use a subdomain for dev/test/acceptance, again this will cost you an additional fee for hosting extra zones.
   3. And you still have dev/test/acceptance records in your production accounts.
3. Host the domain from a centralized account.
   1. You still need to get the records in that zone somehow, but at least it's consistent with all environments. This
      will give a more predictable experience.

For the later solution we created this custom provider. You need to deploy the provider in the account hosting your Route53
hosted zones. By using the `Custom::CrossAccountDNS` resource you can use the SNS topic provided by the provider as the
`ServiceToken`. This allows you to invoke the custom resource provider across accounts.  

You can control who is allowed to send messages on the resource policy of the SNS topic. In the provided example you will
see that we limit it within the AWS Organization using the `aws:PrincipalOrgID` condition, but you can also target
specific accounts using the `aws:PrincipalAccount` condition.

You could even take it a step further and limit what zones can be managed by the provider. Or even deploy a provider per
hosted zone. This allows you to only allow your dev/test/acceptance and production accounts to write in a specific hosted
zone.
