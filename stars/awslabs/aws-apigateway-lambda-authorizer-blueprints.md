---
repo: awslabs/aws-apigateway-lambda-authorizer-blueprints
url: 'https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints'
homepage: null
starredAt: '2017-10-06T21:40:35Z'
createdAt: '2016-02-16T22:33:25Z'
updatedAt: '2025-02-22T13:12:29Z'
language: C#
license: Apache-2.0
branch: master
stars: 706
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:39.604Z'
description: >-
  Blueprints and examples for Lambda-based custom Authorizers for use in API
  Gateway.
tags: []
---

# Amazon API Gateway - Custom Authorizer Blueprints for AWS Lambda
We've added blueprints and examples in 3 languages for Lambda-based custom Authorizers for use in API Gateway.

## Java
Not available in the Lambda console. Use the AuthPolicy object to generate and serialize IAM policies for your custom authorizer. See javadoc comments for more details.

## NodeJS
Also available in the Lambda console, the NodeJS blueprint makes it easy to generate IAM policies, including Conditions.

## Python
Also available in the Lambda console, the Python blueprint includes the AuthPolicy class, which makes generating IAM policies simple and easy to understand.

## Go
Not available in the Lambda console. Use the AuthorizerResponse object to generate IAM policies for your custom authorizer. See comments for more details.

## Rust
Not available in the Lambda console. Using `awslabs/aws-lambda-rust-runtime`. Use the APIGatewayPolicyBuilder object to generate IAM policies for your custom authorizer. See comments for more details.

## Docs ##
For more details, see public documentation for:
- API Gateway Custom Authorizers -- [Blog Post](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/) -- [Developer Guide](http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html)
- IAM Policy Language -- [API Gateway Developer Guide](http://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html) -- [Policy Language Reference](http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html)
