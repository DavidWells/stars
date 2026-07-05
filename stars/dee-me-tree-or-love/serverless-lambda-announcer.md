---
repo: dee-me-tree-or-love/serverless-lambda-announcer
url: 'https://github.com/dee-me-tree-or-love/serverless-lambda-announcer'
homepage: 'https://www.npmjs.com/package/serverless-lambda-announcer'
starredAt: '2018-11-15T23:38:59Z'
createdAt: '2018-04-10T13:04:03Z'
updatedAt: '2023-04-12T08:37:26Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:04.277Z'
description: >-
  :zap: :speech_balloon:  A serverless framework plugin that announces a deploy
  of a new function to a webhook
tags: []
---

# serverless-lambda-announcer :speech_balloon: 
A plugin for serverless framework that announces a deploy of a new function to a given url.  
[![Build Status](https://travis-ci.org/dee-me-tree-or-love/serverless-lambda-announcer.svg?branch=master)](https://travis-ci.org/dee-me-tree-or-love/serverless-lambda-announcer)  

## Purpose  
This plugin allows to specify a custom hook listening for lambda deploys.  
On deploy the announcer will announce the lambda definition to the specified hook.  
The hook should be a `POST` endpoint accepting json-encoded payload.   
## Installation  
Run `npm install serverless-lambda-announcer`  
Add it to the `serverless.yml` as:  
```
plugins:
  ...
  - serverless-lambda-announcer
  ...
```  
## Usage  
This plugin announces only *full* deployments: fired on `sls deploy` only :v:  
### Configuration  
In the `serverless.yml` specify a custom parameter for the announcer:  
```yaml
custom:
  # can be specified as an array attribute too: - announcer:
  announcer:
    # required:
    hook: <your POST webhook>
    # optional:
    contract:   
      /{function name}: <your contract> 
```     
**Hook**:  
The `hook` must be an accessible `POST` url accepting json input.   
    
**Contract**:  
The `contract` is an optional paramter. 
If specified must be mapped to function name.
Can be specified in any form. 
It will be passed along in the body same way as was specified.   
  
### Announce Body
The body that is sent from the announcer is:  
```
[
  {
    "endpoints": [
      {
        "method": <http method>,
        "path": <full https endpoint>
      }
    ],
    "name": "<service name> : <function name>",
    "identifier": <function name>,
    "events":[
      {<generated cloudformation event data>}
    ],
    "contract": <your specified contract (if exists)>
  }  
]
```  
## Kudos  
Some methods are borrowed from the sourcecode of the [`serverless`](https://github.com/serverless/serverless) core plugins - super-duper-mega thanks  
