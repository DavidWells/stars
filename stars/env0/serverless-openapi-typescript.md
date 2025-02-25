---
repo: env0/serverless-openapi-typescript
url: 'https://github.com/env0/serverless-openapi-typescript'
homepage: ''
starredAt: '2021-12-01T07:08:19Z'
createdAt: '2021-08-26T06:57:36Z'
updatedAt: '2024-05-27T12:03:43Z'
language: TypeScript
license: NA
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:32.395Z'
description: >-
  Serverless plugin to generate OpenAPI 3.1.0 documentation including models
  from serverless configuration and TypeScript
tags:
  - json-schema
  - openapi
  - openapi3
  - openapi3-1
  - serverless
  - typescript
---

# Serverless OpenAPI TypeScript Plugin

Generates [**OpenAPI 3.1.0**](https://github.com/OAI/OpenAPI-Specification/blob/3.1.0/versions/3.1.0.md) documentation from serverless configuration files **including fully generated request/response models from TypeScript**.  

This is an extension plugin to the most excellent [@conqa/serverless-openapi-documentation](https://www.npmjs.com/package/@conqa/serverless-openapi-documentation).  

Partilly works with [ReDoc](https://github.com/Rebilly/ReDoc) as they're still working on OpenAPI 3.1.0 support.  
Works well with [Stoplight.io](https://stoplight.io/)    

> **Why OpenAPI 3.1.0 and not 3.0.0?**  
> Because types generated from TypeScript are complex and require at least json-schema draft07 to be described properly.  
> OpenAPI 3.1.0 is the first version to be fully compatible with JSON Schema - 3.0.0 is just an "extended subset" of draft05

---

- [Usage](#usage)
    - [Options](#options)
    - [Configuration](#configuration)
        - [Models](#models)
        - [Functions](#functions)
        - [`queryParams`](#queryparams)
        - [`pathParams`](#pathparams)
        - [`cookieParams`](#cookieparams)
        - [`requestModels`](#requestmodels)
        - [`methodResponses`](#methodresponses-and-responsemodels)
        - [`webhooks`](#webhooks)
- [Install](#install)

---

## Usage

This plugin requires additional configuration to use, see the "[Configuration](#configuration)" section for how to configure the plugin to generate documentation.

Below are the commandline options to run the generator:

```bash
serverless openapi generate [options]
```

### Options

```bash
Plugin: ServerlessOpenAPIDocumentation
openapi generate  ...................... Generate OpenAPI v3 Documentation
    --output / -o ...................... Output file location [default: openapi.yml|json]
    --format / -f ...................... OpenAPI file format (yml|json) [default: yml]
    --indent / -i ...................... File indentation in spaces [default: 2]
    --help / -h   ...................... Help
```

### Configuration

To configure this plugin to generate valid OpenAPI documentation there are two places you'll need to modify in your `serverless.yml` file, the `custom` variables section and the `http` event section for each given function in your service.

This plugin is compatible with the same documentation configuration structure in [@conqa/serverless-openapi-documentation](https://www.npmjs.com/package/@conqa/serverless-openapi-documentation) and needs to be run beside it.

The `custom` section of your `serverless.yml` can be configured as below:

```yml
custom:
  documentation:
    version: '1'
    title: 'My API'
    description: 'This is my API'
    # https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securitySchemeObject
    securitySchemes: {}
    # https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#security-requirement-object
    security: {}
    models: {}
    typescriptApiPath: 'api.d.ts'
    tsconfigPath: 'tsconfig.json'
```

These configurations can be quite verbose; you can separate it out into it's own file, such as `serverless.doc.yml` as below:

```yml
custom:
  documentation: ${file(serverless.doc.yml):documentation}

functions:
  myFunc:
    events:
      - http:
          path: getStuff
          method: get
          documentation: ${file(serverless.doc.yml):endpoints.myFunc}
```

For more info on `serverless.yml` syntax, see their docs.

#### Models

These will be generated for you from TypeScript.  
For information on how to specify these yourself, see [Models](https://github.com/conqa/serverless-openapi-documentation#models) on the base plugin page.    

#### Functions

To define the documentation for a given function event, you need to create a `documentation` attribute for your http event in your `serverless.yml` file.  

This plugin will assert the `documentation` attribute is set on every non `private: true` function with an `http` event.  

If you wish a function to not be listed on your documentation, you must explicitly set `documentation: ~` to disable docs on that function.    

The `documentation` section of the event configuration can contain the following attributes:

* `summary`: a short description of the method
* `description`: a detailed description of the method
* `tags`: an array of tags for this event
* `deprecated`: boolean indicator that indicates clients should migrate away from this function
* `requestBody`: contains description of the request
    * `description`: a description of the request body
* `requestModels`: a list of models to describe the request bodies (see [requestModels](#requestmodels) below) - **these will be autogenerated for you from TypeScript**
* `queryParams`: a list of query parameters (see [queryParams](#queryparams) below) - **these _can_ be autogenerated for you from TypeScript**
* `pathParams`: a list of path parameters (see [pathParams](#pathparams) below) - **these _can_ be autogenerated for you from TypeScript**
* `cookieParams`: a list of cookie parameters (see [cookieParams](#cookieparams) below)
* `methodResponses`: an array of response models and applicable status codes (see [methodResponses](#methodresponses-and-responsemodels)) - **these _will_ be autogenerated for you from TypeScript**
* `webhooks`: an object with all the webhooks with descriptions (see [webhooks](#webhooks)) - **these _will_ be autogenerated for you from TypeScript**

```yml
functions:
  createUser:
    handler: "handler.create"
    events:
      - http:
        path: "create"
        method: "post"
        documentation:
          summary: "Create User"
          description: "Creates a user and then sends a generated password email"
          requestBody:
            description: "A user information object"
          requestModels:
            application/json: "PutDocumentRequest"
          pathParams:
            - name: "username"
              description: "The username for a user to create"
              schema:
                type: "string"
                pattern: "^[-a-z0-9_]+$"
          queryParams:
            - name: "membershipType"
              description: "The user's Membership Type"
              schema:
                type: "string"
                enum:
                  - "premium"
                  - "standard"
          cookieParams:
            - name: "SessionId"
              description: "A Session ID variable"
              schema:
                type: "string"
          methodResponses:
            - statusCode: 201
              responseBody:
                description: "A user object along with generated API Keys"
              responseModels:
                application/json: "PutDocumentResponse"
            - statusCode: 500
              responseBody:
                description: "An error message when creating a new user"
              responseModels:
                application/json: "ErrorResponse"
```

#### `queryParams`

Query parameters can be described as follow:

* `name`: the name of the query variable
* `description`: a description of the query variable
* `required`: whether the query parameter is mandatory (boolean)
* `schema`: JSON schema (inline or file) **or a string representing fully qualified TypeScript type to generate schema from**

> Note: If schema is not specified one will be autogenerated for you as `{ "type": "string" }` if you specify `querystrings` in your [Serverless request parameters](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#request-parameters)

##### Explicit schema example
```yml
queryParams:
  - name: "filter"
    description: "The filter parameter"
    required: true
    schema:
      type: "string"
```

##### Autogenerated Schema from Serverless config
```yml
functions:
  foo:
    events:
      - http:
          request:
            parameters:
              querystrings:
                filter: true

# This will be autogenerated for you based on your Serverless config above! No need to write it yourself:                
# queryParams:
#  - name: "filter"
#    required: true 
#    schema:
#      type: "string"
```

##### Generated Schema from TypeScript type
```typescript
export namespace MyApi {
    export namespace FooBar {
        export namespace Request {
            export namespace QueryParams {
                // You may use JSdoc to set JSON Schema attributes! 
                /** @description The filter parameter **/
                export type Filter = 'hello' | 'world';
            }
        }
    }
}
```

```yml
functions:
  fooBar:
    events:
      - http:
          documentation:
            queryParams:
              - name: "filter"
                schema: "MyApi.FooBar.Request.QueryParams.Filter"
          request:
            parameters:
              querystrings:
                filter: false

# This will be autogenerated for you based from TypeScript! No need to write it yourself                
# queryParams:
#  - name: "filter"
#    required: false
#    description: "The filter parameter"  
#    schema:
#      type: string
#      enum:
#        - hello
#        - world
```

#### `pathParams`

Path parameters can be described as follow:

* `name`: the name of the query variable
* `description`: a description of the query variable
* `schema`: JSON schema (inline or file) **or a string representing fully qualified TypeScript type to generate schema from**

##### Explicit schema example

```yml
pathParams:
  - name: "usernameId"
    description: "The usernameId parameter"
    schema:
      type: "string"
```

##### Autogenerated Schema from Serverless config
```yml
functions:
  foo:
    events:
      - http:
          request:
            parameters:
              pahts:
                usernameId: true

# This will be autogenerated for you based on your Serverless config above! No need to write it yourself:                
# queryParams:
#  - name: "filter"
#    required: true 
#    schema:
#      type: "string"
```

##### Generated Schema from TypeScript type
```typescript
export namespace MyApi {
    export namespace FooBar {
        export namespace Request {
            export namespace PathParams {
                // You may use JSdoc to set JSON Schema attributes! 
                /** @description The usernameId parameter **/
                export type UsernameId = string;
            }
        }
    }
}
```

```yml
functions:
  fooBar:
    events:
      - http:
          documentation:
            paths:
              - name: "usernameId"
                schema: "MyApi.FooBar.Request.QueryParams.Filter"
          request:
            parameters:
              paths:
                usernameId: true

# This will be autogenerated for you based from TypeScript! No need to write it yourself                
# queryParams:
#  - name: "filter"
#    required: true 
#    description: "The usernameId parameter"
#    schema:
#      type: string
```

#### `cookieParams`

TypeScript generation for these isn't supported.  
For information on how to specify these yourself, see [Cookie Parameters](https://github.com/conqa/serverless-openapi-documentation#cookieparams) on the base plugin page.

#### `requestModels`

The `requestModels` property allows you to define models for the HTTP Request of the function event.  

These will be autogenerated for you from TypeScript **by convention**.  
The plugin will autogenerate a request model for every `put`, `patch` or `post` method based on the TypeScript type found by convention.    
The look strategy will be by:  
`${serverless.custom.documentation.apiNamespace}.${upper-case-name-of-function}.Request.Body`. Note that any underscores (`_`) or hyphens (`-`) in function names will be excluded in the resolved type (e.g. the Serverless function `my_get-function` will resolve to `MyGetFunction` in Typescript)  

For example, the following function:  
```yaml
functions:
  myFunction: 
    events:
      - http:
        documentation:
          summary: "Does a lot for you"
```

Will look for the resolve type as its request model:  
```typescript
// api.d.ts

export namespace MyApi {
    export namespace MyFunction {
        export namespace Request {
            export type Body = {
                id: string,
                name: string,
                age: number
                // ...
            }
        }
    }
}
```

#### `methodResponses` and `responseModels`

These will be autogenerated for you from TypeScript **by convention**.  
The plugin will autogenerate a response model for every `put`, `patch`, `post` and `get` method based on the TypeScript type found by convention.  
The response will use the generated type as body, and will have a 200 status code.  
`delete` method will be generated with an empty body and 204 status code.  
Only `application/json` response types are supported.  

The look strategy will be by:  
`${serverless.custom.documentation.apiNamespace}.${upper-case-name-of-function}.Response`

For example, the following function:
```yaml
functions:
  myFunction: 
    events:
      - http:
        documentation:
          summary: "Does a lot for you"
```

Will look for the resolve type as its request model:
```typescript
// api.d.ts

export namespace MyApi {
  export namespace MyFunction {
    export type Response = {
      id: string,
      name: string,
      age: number
      // ...
    }
  }
}
```

##### `responseHeaders` and `requestHeaders`

The `responseHeaders/requestHeaders` section of the configuration allows you to define the HTTP headers for the function event.    
TypeScript generation for these isn't supported.    
For information on how to specify these yourself, see [Response Headers](https://github.com/conqa/serverless-openapi-documentation#responseheaders-and-requestheaders) on the base plugin page.  

##### `customTags`

In some cases where a single serverless.yml contains endpoints which can be grouped differently,
you can define custom tags as following:

```yaml
custom:
  documentation:
    title: 'Project'
    description: DummyDescription

    apiNamespace: ProjectApi
    tags:
       - name: FooBarTitle
         description: FooBarDescription
       - name: BazTitle
         description: BazDescription
```

```yaml
functions:
  createFunc:
    handler: handler.create
    events:
      - http:
          documentation:
            summary: "Create Function"
            tag: FooBarTitle
```

Endpoints that are not attached to a custom tag, are still attached to the title ( which is the default tag ).

#### `webhooks`
OpenAPI have an option to add your application `webhooks`, while this feature isn't supported by `serverless`.

For those the plugin will look for the webhooks under `custom.documentation.webhooks`.

For example

```yaml
custom:
  documentation:
    apiNamespace: MyApi
    webhooks:
      WebhookName:
        post:
          requestBody:
            description: |
              This is a request body description
          responses:
            200:
              description: |
                This is a expected response description
```

this will generate the next OpenAPI file

```yaml
components:
  schemas:
    MyApi.Webhooks.WebhookName:
      type: object
webhooks:
  WebhookName:
    post:
      requestBody:
        description: |
          This is a request body description
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MyApi.Webhooks.WebhookName'
      responses:
        '200':
          description: |
            This is a expected response description
```

With the next `api.d.ts`:

```typescript
export namespace MyApi {
  export namespace Webhooks {
    export type WebhookName = {
      id: string,
      name: string,
      age: number
      // ...
    }
  }
}
```

You can also add Webhook tags by using `webhookTags` keyword it will auto add tag to all webhooks
```yaml
custom:
  documentation:
    apiNamespace: MyApi
    webhookTags:
      - name: ProjectWebhooks
        description: This is the description for ProjectWebhooks
    webhooks:
      WebhookName:
        post:
          requestBody:
            description: |
              This is a request body description
          responses:
            200:
              description: |
                This is a expected response description
```


## Install

This plugin is **an extension**.  
It means you must install and enable `@conqa/serverless-openapi-documentation` too.

To add these plugins to your package.json:

**Using npm:**
```bash
npm install @conqa/serverless-openapi-documentation --save-dev
npm install serverless-openapi-typescript --save-dev
```

**Using Yarn:**
```bash
yarn add @conqa/serverless-openapi-documentation --dev
yarn add serverless-openapi-typescript --dev
```

Next you need to add the plugin to the `plugins` section of your `serverless.yml` file.

```yml
plugins:
  - @conqa/serverless-openapi-documentation
  - serverless-openapi-typescript
  # NOTE: Order is important here - this plugin must be added after the base @conqa/serverless-openapi-documentation plugin
  # This plugin asserts that - you will get a validation message if you get the ordering wrong 
```

> Note: Add this plugin _after_ `serverless-offline` to prevent issues with `String.replaceAll` being overridden incorrectly.

## License

MIT
