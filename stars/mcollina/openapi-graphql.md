---
repo: mcollina/openapi-graphql
url: 'https://github.com/mcollina/openapi-graphql'
homepage: null
starredAt: '2021-06-28T05:50:34Z'
createdAt: '2021-06-16T09:58:11Z'
updatedAt: '2023-09-12T14:21:56Z'
language: TypeScript
license: MIT
branch: main
stars: 37
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:32.096Z'
description: Create a GraphQL from an OpenAPI schema
tags: []
---

# openapi-graphql

Create an executable GraphQL schema from an OpenAPI schema.

This library was forked from the excellent https://github.com/IBM/openapi-to-graphql
at commit [3e2eb50a04dd206e0be3a8954df1964941e449bb](https://github.com/IBM/openapi-to-graphql/commit/3e2eb50a04dd206e0be3a8954df1964941e449bb).

The main differences are:

1. removed the dependency to `request`, and made HTTP client pluggable.
2. removed support for subscriptions

Any improvements are welcomed!

## Install

```bash
npm i -s openapi-graphql
```

## Example

Require OpenAPI-GraphQL and use the `createGraphQLSchema` function:

```javascript
const { request } = require('undici')
const { createGraphQLSchema } = require("openapi-graphql")
const querystring = require('qs')
const fs = require('fs')

const oas = fs.readFileSync('path/to/oas')

async function build () {
  const { schema, report } = await createGraphQLSchema(oas, {
    httpRequest
  });

  return schema
}

async function httpRequest(opts) {
  let url = opts.url
  const qs = querystring.stringify(opts.qs)
  if (qs) {
    url += '?' + qs
  }
  // You can use any HTTP request library here
  const res = await request(url, {
    method: opts.method.toUpperCase(),
    headers: opts.headers,
    body: opts.body
  })

  res.body.setEncoding('utf8')
  let body = ''
  for await (let chunk of res.body) {
    body += chunk
  }
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body
  }
}
```

### Nested Objects

To create nested object types you need to define [link objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#link-object) in the OAS. According to the specification, a link object "represents a possible design-time link for a response." In other words, a link object describes how the data from one operation can be used to query another.

For example, let's say we have an API that has an operation called `GET /users/{userId}` and an operation called `GET /employers/{employerId}`. In addition, let's say that the `user` object returned from `GET /users/{userId}` contains a field called `currentEmployerId`. We can define a link object that says, use the `currentEmployerId` returned by `GET /users/{userId}` to query `GET /employers/{employerId}` in order to get the user's current employer. That link would look like the following:

```JSON
{
  "operationId": "employer",
  "parameters": {
    "employerId": "$response.body#/currentEmployerId"
  }
}
```

If you define a link object, then OpenAPI-GraphQL will add a new field to your object type. In this case, the `User` object type will have not only an `currentEmployerId` field, but also an `employer` field. Then, you will be able to create nested GraphQL queries like the following:

```graphql
query {
  user(userId: "Alan") {
    currentEmployerId
    employer {
      name
    }
  }
}
```

---

To create nested object types for arrays, you will need to keep the following in mind.

Continuing from the previous example, let's say that there is a third operation called `GET /friends/{userId}` which would return an array of users, specifically the friends of a particular user. Furthermore, let's say you wanted to run the following query, which would allow you to get all the employers of Alan's friends:

```graphql
query {
  friends(userId: "Alan") {
    currentEmployerId
    employer {
      name
    }
  }
}
```

If this was like the previous case, you would simply define a link from `GET /friends/{userId}` to `GET /employers/{employerId}`. However, this is _impossible_ because of the current specification. This is because this operation returns an array rather than an object and the current specification does not provide a way to access individual elements of an array.

Nevertheless, OpenAPI-GraphQL can still create a nested relationship. This is because OpenAPI-to-GraphQL _reuses_ object types. If `GET /friends/{userId}` returns an array of `User` object types, then each of those users will take on the links defined in other operations that return `User` object types. In other words, because `GET /friends/{userId}` returns an array of `User` object types and `GET /users/{userId}`, which also returns a `User` object type, has a link to `GET /employers/{employerId}`, you will still be able to get all the employers of a user's friends because of the shared type.

---

OpenAPI-GraphQL can create GraphQL interfaces from multiple OASs. To create link between OASs, you will need use an `operationRef` instead of `operationId`. You will also need to create references using the _title of the OAS_. Although this is not supported by the specification, it is necessary for this functionality to work.

For example, let's say that there was a library API that would allow you to get a user's favorite books by querying `GET /favoriteBooks/{name}`. In addition, let's say that in the original API, the `User` object type contained two fields, `firstName` and `lastName`. To create a link between the original API and the library API, you would have to write something like the following:

```JSON
{
  "operationRef": "I <3 Books API#/paths/~1favoriteBooks~1{name}/get",
  "parameters": {
    "name": "{$response.body#/firstName} {$response.body#/lastName}"
  }
}
```

Notice that the slashes in the path `/favoriteBooks/{name}` must be escaped with `~1` and that you can compose parameter values with different [runtime expressions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#runtimeExpression) using brackets.

## Options

The `createGraphQLSchema` function takes an optional `options` object as a second argument:

```javascript
createGraphQLSchema(oas[, options])
```

The options object can contain the following properties:

- `strict` (type: `boolean`, default: `false`): OpenAPI-GraphQL generally tries to produce a working GraphQL schema for a given OAS if the strict mode is disabled. If OpenAPI-to-GraphQL cannot fully translate a given OAS (e.g., because data schema definitions are incomplete or there are name collusions that cannot be resolved), `createGraphQLSchema` will by default degrade gracefully and produce a partial GraphQL schema. OpenAPI-to-GraphQL will log warnings (given logging is enabled). If the `strict` mode is enabled, however, `createGraphQLSchema` will throw an error if it cannot create a GraphQL schema matching the given OAS perfectly.

***

Schema options:

- `operationIdFieldNames` (type: `boolean`, default: `false`): By default, query field names are based on the return type's type name and mutation field names are based on the [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#operation-object), which may be generated if it does not exist. This option forces OpenAPI-GraphQL to only create field names based on the operationId.

- `fillEmptyResponses` (type: `boolean`, default: `false`): OpenAPI-GraphQL, by default, will only wrap operations that have a [response schema](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#responsesObject). Therefore, operations that _do not have_ response schemas will be ignored. The reason is that all GraphQL objects must have a data structure and in these cases where the OAS does not define response schemas, the data structures cannot be safely assumed. As a result, it is recommended that the OAS should be modified to include a response schema. However, under certain circumstances, some operations should _not in fact_ have a response schema. One circumstance is HTTP status code 204, in which no content should be returned. The option `fillEmptyResponses` will allow OpenAPI-to-GraphQL to wrap these operations by assigning these operations a placeholder data structure. Although this data structure is meaningless, the operation will appear in the schema.

- `addLimitArgument` (type: `boolean`, default: `false`): Add a `limit` argument to fields returning lists of objects/lists that will limit the number of returned elements, selecting the first `n` elements of the list.

- `idFormats` (type: `string[]`, default: `[]`): If a schema is of type `string` and has format `UUID`, it will be translated into a [GraphQL ID type](https://graphql.org/graphql-js/type/#graphqlid). To allow for more customzation, this option allows users to specify other formats that should be interpreted as ID types. 

- `selectQueryOrMutationField` (type: `object`, default: `{}`): OpenAPI-GraphQL, by default, will make all GET operations into `Query` fields and all other operations into `Mutation` fields. This option allows users to manually override this process. The operation is identifed first by the [title](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#infoObject) of the OAS, then the [path](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#paths-object) of the operation, and lastly the [method](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#path-item-object) of the operation. The `selectQueryOrMutationField` object is thus a triply nested object where the outer key is the title, followed by the path, and finally the method, which points to an integer value of either `0`, or `1`, corresponding to `Query` or `Mutation` type respectively. 

- `genericPayloadArgName` (type: `boolean`, default: `false`): Set the default argument name for the payload of a mutation to `requestBody`. Otherwise, the name will default to the camelCased pathname.

- `simpleNames` (type: `boolean`, default: `false`): By default, field names are sanitized to conform with GraphQL conventions, i.e. types should be in PascalCase, fields should be in camelCase, and enum values should be in ALL_CAPS. This option will prevent OpenAPI-GraphQL from enforcing camelCase field names and PascalCase type names, only removing illegal characters and staying as true to the provided names in the OAS as possible. 

- `simpleEnumValues` (type: `boolean`, default: `false`): By default, field names are sanitized to conform with GraphQL conventions, i.e. types should be in PascalCase, fields should be in camelCase, and enum values should be in ALL_CAPS. This option will prevent OpenAPI-GraphQL from enforcing ALL_CAPS enum values, only removing illegal characters and staying as true to the provided enum values in the OAS as possible. 

- `singularNames` (type: `boolean`, default: `false`): Experimental feature that will try to create more meaningful names from the operation path than the response object by leveraging common conventions. For example, given the operation `GET /users/{userId}/car`, OpenAPI-GraphQL will create a `Query` field `userCar`. Note that because `users` is followed by the parameter `userId`, it insinuates that this operation will get the car that belongs to a singular user. Hence, the name `userCar` is more fitting than `usersCar` so the pluralizing 's' is dropped. This option will also consider irregular plural forms.



Resolver options:

- `headers` (type: `object` , default: `{}`): Headers to be sent in every request to the API. Parameters defined in the OpenAPI Specification and set by these headers will be ignored by OpenAPI-GraphQL.

- `qs` (type: `object`, default: `{}`): Query parameters to be sent in every request to the API. Parameters defined in the OpenAPI Specification and set by these query parameters will be ignored by OpenAPI-GraphQL.

- `requestOptions` (type: `object`, default: `{}`): Additional options for performing HTTP requests. The supported key are: `headers`, `qs`.

- `baseUrl` (type: `string`): Used to manually specify the base URL which all paths will be built on. Normally, OpenAPI-GraphQL will select a base URL from the [server object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#serverObject) defined in the OAS. However, if the server object contains multiple URLs, OpenAPI-to-GraphQL will randomly select one. The purpose of this option is to provide greater control over the base URL in these situations, especially when the OAS cannot be modified. This option may also prove to be useful in testing and development.

- `customResolvers` (type: `object`, default: `{}`): OpenAPI-GraphQL, by default, creates resolver functions that make REST calls to resolve Query and Mutation fields in the generated GraphQL interface. This option allows users to provide custom resolver functions to be used in place of said ones created by OpenAPI-to-GraphQL. The field that the custom resolver will affect is identifed first by the [title](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#infoObject) of the OAS, then the [path](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#paths-object) of the operation, and lastly the [method](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#path-item-object) of the operation. The `customResolvers` object is thus a triply nested object where the outer key is the title, followed by the path, and finally the method, which points to the [resolver function](https://graphql.org/learn/execution/#root-fields-resolvers) itself. The resolver function can use the parameters `obj`, `args`, `context`, and `info` in order to produce the proper data, as do standard [resolver functions](https://graphql.org/learn/execution/#root-fields-resolvers) in GraphQL. Use cases include the resolution of complex relationships between types, implementing performance improvements like caching, or dealing with non-standard authentication requirements. _Note: Because the arguments are provided by the GraphQL interface, they may look different from the [parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#parameterObject) defined by the OAS. For example, they will have [sanitized](https://github.com/IBM/openapi-to-graphql#characteristics) names. The [request body](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#requestBodyObject) will also be contained in the arguments as an [input object type](https://graphql.org/graphql-js/mutations-and-input-types/)._

- `httpRequest(opts, context)` (type: `function`): a function to perform*** HTTP requests. The `opts` object will include the following properties: `url`, `headers`, `qs`, `body`. `context` is the current graphql context.



Authentication options:

- `viewer` (type: `boolean`, default: `true`): The viewer object types (i.e. `QueryViewer` and `MutationViewer`) are artificial constructs that allow users to pass authentication credentials to OpenAPI-GraphQL. They are created when the OAS defines [security scheme objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securitySchemeObject) and when operations adopt them through a [security requirement object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securityRequirementObject). A viewer is created for each security scheme and each viewer contains authenticated operations that uses its respective security scheme. In addition, a special `anyAuth` viewer, which can authenticate requests utilizing different security schemes, is created. Unfortunately, viewers are bulky so, depending on the API, it may be possible to send credentials through the `header`, `qs`, or `requestOptions` options. _Note: OAuth authentication is handled using the `tokenJSONpath` and `sendOAuthTokenInQuery` options._

- `tokenJSONpath` (type: `string`): Used to pass the [JSONPath](http://goessner.net/articles/JsonPath/) of the OAuth token in the GraphQL context. To see more details, click [here](./README.md#authorization).

- `sendOAuthTokenInQuery` (type: `boolean`, default: `false`): If set to true, the OAuth token extracted from the provided `tokenJSONpath` will be sent as an `access_token` query parameter (instead of in the header).

***

Validation options:

- `oasValidatorOptions` (type: `object`, default: `{}`): We use the [oas-validator](https://www.npmjs.com/package/oas-validator) library to validate Swaggers/OASs. We expose the options so that users can have more control over validation. See [here](https://github.com/Mermade/oas-kit/blob/master/docs/options.md) for more information.

- `swagger2OpenAPIOptions` (type: `object`, default: `{}`): We use the [swagger2openapi](https://www.npmjs.com/package/swagger2openapi) library to validate Swaggers/OASs. We expose the options so that users can have more control over validation. See [here](https://github.com/Mermade/oas-kit/blob/master/docs/options.md) for more information.

***

Logging options:

- `provideErrorExtensions` (type: `boolean`, default: `true`): If a query cannot be fulfilled, GraphQL returns a [list of error objects](https://graphql.github.io/graphql-spec/draft/#sec-Errors) for all fields that could not be resolved. OpenAPI-GraphQL will add an `extensions` object to all error objects resulting from REST calls that did not return successful HTTP codes (i.e. 200-299). Each `extensions` object contains data about the REST call (e.g. the method, path, status code, response headers, and response body). This data can be useful for debugging but it can also _unintentionally leak information_. If set to `false`, this option prevents the `extensions` objects from being created.

- `equivalentToMessages` (type: `boolean`, default: `true`): Append a small message to the description of a field that clarifies the operation the field will trigger. The message will take the form of `Equivalent to {title of OAS} {method in ALL_CAPS} {path}` (the [title](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#infoObject) will only appear if multiple OASs are provided). Messages will appear for query/mutation fields as well as for fields created by links. _Note: These messages may unintentionally leak information about the underlying REST API._

Consider this example of passing options:

```javascript
OpenAPI-GraphQL.createGraphQLSchema(oas, {
  httpRequest,
  headers: {
    authorization: 'asfl3032lkj2' // send authorization header in every request
    'x-origin': 'GraphQL' // send header to identify requests made via GraphQL
  },
  qs: {
    limit: 30 // send limit query string in every request
  },
  requestOptions: {
    headers: { 'another': 'header' }
  },
  customResolvers: {
    'I <3 Books API': {
      '/favoriteBooks/{name}': {
        'get': (obj, args, context, info) => {
          return {
            books: [
              'A Guide to OpenAPI-GraphQL',
              'Why OpenAPI-GraphQL is Amazing',
              'Long Live OpenAPI-GraphQL!'
            ]
          }
        }
      }
    }
  }
})
```

## Custom Type and Field Names and Enum Values

The `x-graphql-type-name`, `x-graphql-field-name`, and `x-graphql-enum-mapping` OAS extensions can be used to configure type and field names as well as enum values.

The type and field names and enum values that OpenAPI-GraphQL generates may not be adequate or may not be consistent over different versions so this is a way to guarantee consistency.

`x-graphql-type-name` and `x-graphql-field-name` can be added to a JSON schema to change the type name as well as change a field name. OpenAPI-GraphQL will also use `x-graphql-type-name` to name input object types by appending `Input` to the end of the name.

```diff
{
  "type": "object",
+ "x-graphql-type-name": "Response",
  "properties": {
    "code": {
      "type": "integer",
+     "x-graphql-field-name": "statusCode",
    }
  }
}
```

`x-graphql-field-name` can be added to an [operation object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) to change a field name under the top-level `Query` and `Mutation` types.

```diff
{
  "/pet/findByStatus": {
    "get": {
+     "x-graphql-field-name": "getPetsByStatus",
      "parameters": [
        ...
      ],
      "responses": {
        ...
      }
    }
  }
}
```

`x-graphql-field-name` can be added to a [link object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#linkObject) to change the name of a linked field (see section on [Nested Objects](https://github.com/IBM/openapi-graphql/tree/master/packages/openapi-to-graphql#nested-objects)).

```diff
{
+ "x-graphql-field-name": "orderPet",
  "operationId": "getPetById",
  "parameters": {
    "petId": "$response.body.petId"
  },
  "description": "Link from Order to Pet"
}
```

`x-graphql-enum-mapping` can be added to a JSON schema to change the enum values. It is a mapping from the original enum values to the ones that should used in the GraphQL interface.

```diff
{
  "type": "string",
  "enum": ["available", "pending", "sold"],
+ "x-graphql-enum-mapping": {
+   "available": "INITIAL",
+   "pending": "IN_PROGRESS",
+   "sold": "SOLD"
+ }
}
```

## Authentication

By default, OpenAPI-GraphQL will wrap API requests that need authentication in corresponding `viewers`, which allow the user to pass required credentials. OpenAPI-to-GraphQL currently supports viewers for basic authentication and API keys. For example, a query using an API key viewer is:

```javascript
{
  viewerApiKey (apiKey: "api_key_here") {
    ...  // query for authenticated data here
  }
}
```

OpenAPI-GraphQL uses dedicated viewers for mutations. For example, a mutation using a basic authentication viewer is:

```javascript
mutation {
  mutationViewerBasic (username: "user", password: "secret") {
    ...  // mutate authenticated data here
  }
}
```

OpenAPI-GraphQL further provides `anyAuth` viewers (for queries and mutations), which allow the user to simultaneously provide information for multiple authentication mechanisms. `anyAuth` viewers allow OpenAPI-to-GraphQL to resolve nested queries and mutations that encompass API requests with different authentication mechanisms. For example, consider the following query:

```javascript
{
  viewerAnyAuth (
    exampleApiKeyProtocol: {apiKey: "a1p2i3k4e5y"}
    exampleBasicProtocol: {
      username: "erik"
      password: "secret"
    }
  ) {
    patent (patentId: "test") {  // requires "exampleApiKeyProtocol"
      patentId
      inventor {                 // requires "exampleBasicProtocol"
        name
      }
    }
  }
}
```

## Authorization

Because OpenAPI-GraphQL is a library, it cannot make the callbacks that OAuth requires by itself. Instead, the user must take care of the callback. After the user has obtained the OAuth token from the callback, simply pass the token, specifically the path of the token, to OpenAPI-to-GraphQL through the `tokenJSONpath` [option](./README.md#options).

To see an example of how this would work, click [here](https://github.ibm.com/apiharmony/oasgraph-oauth-github-example)!

## Logging

OpenAPI-GraphQL provides multiple levels of logging, which can be controlled by a `DEBUG` environment variable. You can enable these levels using:

```bash
DEBUG=level_1,level_2 node app-using-openapi-graphql.js
```

The following logging levels are supported:

- `preprocessing`: Logs information about preprocessing the OAS.
- `translation`: Logs information about translating an OAS to GraphQL.
- `http`: Logs information about the HTTP requests made to the API.

## Testing

To test OpenAPI-GraphQL, run:

```bash
npm test
```

This command will temporarily start and later shut down an example REST(-like) API.

## License

MIT license

Copyright (c) Matteo Collina 2021. All Rights Reserved.

Copyright (c) IBM Corp. 2012,2019. All Rights Reserved.
