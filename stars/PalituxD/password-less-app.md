---
repo: PalituxD/password-less-app
url: 'https://github.com/PalituxD/password-less-app'
homepage: null
starredAt: '2021-01-08T19:13:02Z'
createdAt: '2020-08-11T03:43:23Z'
updatedAt: '2021-12-08T20:30:55Z'
language: Python
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:08.552Z'
description: null
tags: []
---

#MyAppStack

MyAppStack project contains all services for MyApp application.

## Quick start guide 🚀

This instructions allow you to build and deploy a stack for MyApp application.

Check **Deployment** to know how to deploy this project.
Check **Development** to know how to update this project.

### Pre-requisites  📋
  - _Node v12 or a later version_
  - _Python v3 or a later version_
  - An AWS account with described permisions in lambda-executor-policy.json file.
  - pyenv
```sh
$ brew install pyenv
$ pyenv install 3.8.2
$ pyenv install 3.8.6
$ pyenv global 3.8.2
$ echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
$ python --version
```    
  - poetry
```sh
$ curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```
- Serverless:
```sh
$ npm install --silent --no-progress serverless@2.4.0
$ npm install
$ sls --version
```
#### Set your AWS credentials
Set your AWS credentials and set a profile name for $APP_PROFILE, in my case I called it as 'deploy'. You could use --overwrite to update an existing profile.
```sh
$ sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY --profile $APP_PROFILE
```

## Stack Services
Each service should be developed under ./services folder, e.g: 
- my-app-auth
- my-app-api-users

### Creating a new Service
In order to create a service from MyApp template, use:
```sh
$ source env.sh
$ my-app-create-service [my-app-new-service]
```
This command will create a new service code from stack template.


#### Working in a service
Each service contains a defined structure: 
```sh
./service
    functions
        feature
            function.yml
            lambda_function.py
    resources
        resource.yml
    env.sh
    package.json
    serverless.yml    
```
In order to enable my-app-functions, use:
```sh
$ source env.sh
$ npm install
# enables: my-app-offline, my-app-package, my-app-deploy, my-app-remove
```

#### Shared/Common code
- ./serverless.common.yml: Contains shared configuration 
- ./common: Contains shared base code for each service 


### Auth dependency
Each secured service could use the stack authentication service.
For securing a feature, my-app-auth exports some needed parameters for other services: 
  - ApiGatewayRestApiRootResourceId
  - ApiGatewayAuthorizerId

./services/[my-app-service]/serverless.yml
```yml
  apiGateway:
    restApiId: !ImportValue ${self:cusFtom.common.currentStage}-ApiGatewayRestApiId
    restApiRootResourceId: !ImportValue ${self:custom.common.currentStage}-MyAppRestApiRootResourceId
```
./services/[my-app-service]/functions/[feature]/function.yml
```yml    
    authorizer:
          type: COGNITO_USER_POOLS
          authorizerId: !ImportValue ${self:custom.common.currentStage}-MyAppAuthorizerId
```
### Deployment 🔧
```sh
$ cd ./service/my-app-service
$ source env.sh
# enables: my-app-offline, my-app-package, my-app-deploy, my-app-remove
$ my-app-package
$ my-app-deploy
```
Take care: If you will use the stack authentication, first deploy my-app-auth.

## Building with 🛠️

* [Serverless](https://www.serverless.com/) - Allows us to build and run applications and services without thinking about servers
* [Python](https://www.python.org/) - Just the easiest programming language
* [AWS](https://aws.amazon.com/) -  Offers cloud computing web services.


## Authors ✒️
* **Pablo Atoche** - *Initial work* - [PalituxD](https://github.com/PalituxD)

## License 📄
