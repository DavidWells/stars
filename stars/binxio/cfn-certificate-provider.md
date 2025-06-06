---
repo: binxio/cfn-certificate-provider
url: 'https://github.com/binxio/cfn-certificate-provider'
homepage: null
starredAt: '2024-01-23T05:26:09Z'
createdAt: '2018-10-04T14:44:00Z'
updatedAt: '2024-12-17T15:34:56Z'
language: Python
license: Apache-2.0
branch: master
stars: 145
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:38.456Z'
description: >-
  A custom CloudFormation resource provider for creating DNS validated
  certificates in AWS
tags: []
---

# CloudFormation custom Certificate provider
Almost two years after the release of this custom provider,  AWS finally provides native support for
creating certificates with CloudFormation without manual intervention. Checkout
https://aws.amazon.com/blogs/security/how-to-use-aws-certificate-manager-with-aws-cloudformation/

So, it is highly likely you do not need this custom provider anymore. If you want to create
certificates in different regions, this provider is still pretty useful.

# Custom Certificate Provider with DNS validation support
AWS Certificate Manager is a great service that allows the creation and renewal of certificates
to be automated. It provides two ways of validating a certificate request: through email and through DNS.

When you are creating immutable infrastructure, the email validation method is a no-go as it requires
human intervention. The DNS validation is of course the way to go! With 'Route53' we have full
control over the DNS domain and can create the required records.

Although the CloudFormation [AWS::CertificateManager::Certificate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-certificatemanager-certificate.html) resource allow you to specify that you want DNS validation, it did not
reveal the DNS records that you need to create. It writes them in the CloudFormation log
file so that another human has to collect them and manually update the DNS record.

With this custom provider you can fully automated the creation of certificates with CloudFormation!


## How do I request certificates fully automatically?

As a prerequisite, you need to have the hosted zones for the domain names on your certificate in Route53. If you have that,
you can fully automate the provisioning of certificates, with the following resources:

1. [Custom::Certificate](docs/Certificate.md) to request a certificate without waiting for it to be issued
3. [Custom::CertificateDNSRecord](docs/CertificateDNSRecord.md) which will obtain the DNS record for a domain name on the certificate.
3. [Custom::IssuedCertificate](docs/IssuedCertificate.md) which will actively wait until the certificate is issued.
4. [AWS::Route53::ResourceRecordSet](https://docs.aws.amazon.com/Route53/latest/APIReference/API_ResourceRecordSet.html) to create the validation DNS record.

Checkout the sample in [cloudformation/demo-stack.yaml](cloudformation/demo-stack.yaml).

## Installation
To install this custom resource, type:

```sh
git clone https://github.com/binxio/cfn-certificate-provider.git
cd cfn-certificate-provider
aws cloudformation deploy \
        --capabilities CAPABILITY_IAM \
	--stack-name cfn-certificate-provider \
	--template-file cloudformation/cfn-certificate-provider.yaml
```

This CloudFormation template will use our pre-packaged provider from `463637877380.dkr.ecr.eu-central-1.amazonaws.com/xebia/cfn-certificate-provider:2.0.0`.


## Demo
To install the simple sample of the Custom Resource, type:

```sh
read -p "domain name: " DOMAIN_NAME
read -p "hosted zone id: " HOSTED_ZONE
aws cloudformation deploy --stack-name cfn-certificate-provider-demo \
	--template-file cloudformation/demo-stack.yaml \
	--parameter-overrides DomainName=$DOMAIN_NAME HostedZoneId=$HOSTED_ZONE
```

