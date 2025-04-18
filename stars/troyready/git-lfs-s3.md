---
repo: troyready/git-lfs-s3
url: 'https://github.com/troyready/git-lfs-s3'
homepage: ''
starredAt: '2024-04-17T02:19:06Z'
createdAt: '2019-11-07T03:14:47Z'
updatedAt: '2025-01-22T15:25:19Z'
language: TypeScript
license: NA
branch: main
stars: 68
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:31.261Z'
description: Git LFS S3 Storage Service
tags: []
---

# Git LFS S3 Storage Service

This project deploys a [Serverless](https://serverless.com/cli/) [Git LFS](https://git-lfs.github.com/) service, with objects stored on S3 & authentication performed via a Cognito User Pool.

## Purpose

Provides a mechanism to use Git LFS to keep binaries/large files out of your git history that doesn't depend on your git hosting provider. Reasons to use this could include:

* Your git repo hosting doesn't include Git LFS support
* Your existing git repo hosting Git LFS support is cost-prohibitive
* You need to host the files yourself (e.g. retention/[purge](https://help.github.com/en/github/managing-large-files/removing-files-from-git-large-file-storage#git-lfs-objects-in-your-repository) requirements)

## Deploying

### API

* Clone the project
* Execute:
  * `npm install`
    * If any errors arise try deleting `package-lock.json` and trying again
  * sls deploy for your stage & region; e.g. for the "common" stage in oregon: `npx sls deploy -s common -r us-west-2 --verbose`

Upon completion, the 2 relevant stack outputs to note are:

* `ServiceEndpoint`: This is your Git LFS url
* `UserPoolId`: This is your Cognito User Pool id

### Users

After the serverless project is deployed (see `API` above), create a user in the user pool:

```bash
aws cognito-idp admin-create-user --user-pool-id USERPOOLID --username DESIREDUSERNAME --user-attributes Name=email,Value=DESIREDEMAILADDRESS Name=phone_number,Value="+1XXXXXXXXXX" --message-action SUPPRESS --region REGION
```

(substituting `USERPOOLID`, `DESIREDUSERNAME`, `DESIREDEMAILADDRESS`, `REGION`, & the phone number `XXXXXXXXXX`)

Then set a password for that user (ensure it is not saved in your shell history, e.g. for [bash](https://stackoverflow.com/a/29188490/2547802) or [zsh](https://superuser.com/a/352858)):

```bash
 aws cognito-idp admin-set-user-password --user-pool-id USERPOOLID --username DESIREDUSERNAME --password PASSWORDHERE --permanent --region REGION
```

(substituting `USERPOOLID`, `DESIREDUSERNAME`, `PASSWORDHERE`, & `REGION`)

## Configuring a Repo to Use the Git LFS Service

### Prereqs (System-wide -- Once Per Workstation)

Install [Git LFS](https://github.com/git-lfs/git-lfs/wiki/Installation), e.g.:

```bash
brew install git-lfs
git lfs install
```

### Setting up the repo

* Add any file patterns for Git LFS to track, e.g.: `git lfs track "*.deb"`
* Configure the url: `git config -f .lfsconfig remote.origin.lfsurl SERVICEENDPOINTHERE` (subtitute your ServiceEndpoint url)
* Commit the `.gitattributes` & `.lfsconfig` files

That's it. On push/pull, you'll be prompted for Cognito credentials.

## Further Customization Ideas

* Add an API Gateway custom domain to the API to get a better URL
* Swap out authentication
  * Any backend method (e.g. LDAP) could be adapted into the authorizer in place of the current Cognito AdminInitiateAuth process.
