---
repo: sashee/aws-disable-user-access-denied
url: 'https://github.com/sashee/aws-disable-user-access-denied'
homepage: null
starredAt: '2024-08-13T22:27:44Z'
createdAt: '2024-07-23T12:19:13Z'
updatedAt: '2024-08-13T22:27:45Z'
language: null
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:26.416Z'
description: null
tags: []
---

# Automatically disable an IAM user's access if it makes an invalid request

This is an example stack that creates:
* an IAM user with some permissions
* an alarm that triggers when the user sends a request that is denied
* a Lambda function that attaches the AWSDenyAll policy to the user

## Why is it useful?

If a user is used by a process (and not a person) then all the requests it sends is determined by code. Permissions are granted to the user to be able to carry out its task that means under normal circumstances all requests it sends will be granted.

If there is a security breach, such as the credentials are stolen, an attacker might want to try out the keys to see what is accessible to it. This generates requests that are denied that we can detect.

Using automation we can remove all permissions in the case of a deny. This automatically disables all access when it's suspected the keys are stolen.
