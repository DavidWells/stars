---
repo: promd/node-red-contrib-cognito-auth
url: 'https://github.com/promd/node-red-contrib-cognito-auth'
homepage: null
starredAt: '2021-04-07T05:53:10Z'
createdAt: '2021-01-27T12:20:49Z'
updatedAt: '2021-04-07T05:53:10Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:52.876Z'
description: NodeRed node to authenticate against AWS Cognito and retrieve a JWT Token
tags: []
---

# node-red-contrib-cognito-auth
This is a helper that uses the amazon-cognito-identity-js to create and maintain a valid JWT that can be used to authenticate further calls to the AWS platform (e.g. GraphQL).

Runs that need to request a new JWT will take a bit longer, but calls that can re-use an existing token are quicker.

This is the first version of the Node, and it has been tailored for a specific need.
Feel free to fork on GitHub, or reach out with your request.

## Inputs

__Name__   
Display name of the Node. 

__TargetAttribute__
Defines the Attribute of the ```msg``` Object that will store the valid Token.   
Defaults to ```msg.payload```.

__Username__   
The user name of the Cognito Account, typically a email address.   
This can also be provided as a parameter to the inbount message on attribute ```msg.username```.   
If the ```msg.username``` is present on the input, it will be removed before the message is send foreward.

__Password__   
The Password of the Cognito Account.   
This can also be provided as a parameter to the inbount message on attribute ```msg.password```.   
If the ```msg.password``` is present on the input, it will be removed before the message is send foreward.

__Userpool Id__  
Id of the Cognito Userpool.   
Format starts with a region, followed by an ID (e.g.: eu-west-1_SoMeId).

__Client Id__   
Client ID or Webclient ID, as provided by Cognito.

__Token Type__  
This is either "id" or "access".   
Note: Tests only covered "access" so far.

__msg.reset__   
If present on the inbound message, the current Token will be withdrawn.   
Afterwards, the node will attempt to generate a new one.   
The flag ```msg.reset``` attribute will be removed.

## Output
token on ```msg.payload```  (or the specified target attribute)

## Dependencies
 - amazon-cognito-identity-js
 - jwt-decode
