---
repo: antanasbrazenas/cognito-saml-demo
url: 'https://github.com/antanasbrazenas/cognito-saml-demo'
homepage: null
starredAt: '2019-04-28T00:43:33Z'
createdAt: '2018-02-28T11:24:09Z'
updatedAt: '2020-10-02T11:05:45Z'
language: HTML
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:38.752Z'
description: null
tags: []
---

# Cognito + SAML (Active Directory) Demo

## Environment Setup

### 1. Install latest serverless.com
`npm install -g serverless`

### 2. Deploy Active Directory Server
`cd provisioning/active-directory` and run `sls deploy -v`.

Provide the following options:
* `sshKey` - name of an existing EC2 KeyPair.
* `domainDNSName` - FQDN of the root domain
* `domainNetBIOSName` - NetBIOS name of the domain for users of earlier versions of Windows
* `safemodePassword` - password for a separate Administrator account when the domain controller is in Restore Mode.
* `rdpCIDR` - IP Cidr from which you are likely to RDP into the instances

i.e.: 
```commandline
sls deploy -v --sshKey antanas.brazenas --domainDNSName saml-demo.dev4.bgch.io --domainNetBIOSName CORP --safemodePassword ABCdef123. --rdpCIDR 0.0.0.0/0
```

This will set-up EC2 Windows2008r2 instance that will act as an Active Directory Server.

### 3. RDP to the instance
You will need to retrieve an admin password for the instance. You can do that from the AWS Console -> EC2 -> Instances -> {your instance} -> Connect.

#### 3.1 Configure Active Directory Groups and Users
Navigate to Start -> All Programs -> Administrative Tools -> Active Directory Users and Computers -> {Your Domain} -> Users

Create two AD Groups named "AWS-Prod" and "AWS-Dev". Create a user with an email address and add
it to both groups.

Create another user "ADFSSVC" to be used as the ADFS service account later on.

#### 3.2 Install ADFS
Download and install ADFS from https://www.microsoft.com/en-us/download/details.aspx?id=10909

In the Setup Wizard, make sure to choose the Federation server option for the Server Role.

Start the AD FS 2.0 Management after installation completes and run AD FS 2.0 Federation Server Configuration Wizard. Select the following options:
* Create a new Federation Service
* New federation server farm
* Import and select a valid certificate in IIS. The certificate should be issued to the same `domainDNSName` as used in the serverless command.
Add a CNAME to map to the public EC2 instance's address.
* For the service account, specify ADFSSVC user created in step 3.1

If you're getting "Configure service settings" warnings, run the following command from cmd as an administrator to fix it:
```commandline
setspn -a host/localhost adfssvc
```

### 4. Deploy Cognito Pools
Install serverless-plugin-scripts: `npm install --save serverless-plugin-scripts`

Run the following commands to deploy cognito user pools:
`cd provisioning/cognito` and run `sls deploy -v`.

Please note, the stack is using lambda based custom resources to create
required infrastructure not yet supported by CloudFormation:
* `Custom::UserPoolDomain`
* `Custom::SAMLProvider`
* `Custom::AppClientProviders`

### 5. Configure Cognito as a Trusted Relying Party
On the ADFS server, from the ADFS Management Console, right-click **ADFS 2.0** and select **Add Relying Party Trust**.
It will start a new party trust wizard. Make sure to select the following options:
* Enter data about the relying party manually
* Put anything into the Display name, i.e. "Cognito"
* AD FS 2.0 profile
* In the Configure Certificate step, just click Next
* In the Configure URL step, just click Next
* Add relying party trust identifier - which should look like "urn:amazon:cognito:sp:<user_pool_id>"
* Select Permit all users to access this relying party
* Add POST Binding endpoint to Cognito - https://<domain_prefix>.auth.<region>.amazoncognito.com/saml2/idpresponse

The trust has now been established. Now it's time to set-up claims that are sent to Cognito when users authenticate.
If you haven't selected the checkbox to start setting claims at the end of the previous step, you can right click
on the Relying Party trust and click "Edit Claim Rules".
* Select a claim rule name
* Attribute store can be Active Directory if your users are in Active Directory
* Map a LDAP Attributes (e.g. User-Principal-Name) to Outgoing Claim Types (e.g. Email). Email is required by a Cognito user pool created in the previous step.
* If you want users to be created in Cognito User Pool, one of the Outgoing Claim Types need to be set to Name ID (i.e. User-Principal-Name)
* If you want all of your users to issue the same claim type (i.e. same partnerid for all authenticated users), this could be done
by adding a new rule and selecting "Send Claims Using a Custom Rule". In the custom rule area, type the following:
```text
=> issue(Type = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/partnerid", Value = "My Super Awesome Partner");
```
More information about the custom claims rule language, can be found at https://blogs.technet.microsoft.com/askds/2011/10/07/ad-fs-2-0-claims-rule-language-primer/


### 6. Get started with your application
Cognito Stack, deployed in step 4 has an output named `testPage`. Use this URL to test your ADFS integration
with Cognito user pool.
