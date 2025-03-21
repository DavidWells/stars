---
repo: CascadeEnergy/dynamoDb-marshaler
url: 'https://github.com/CascadeEnergy/dynamoDb-marshaler'
homepage: null
starredAt: '2016-06-15T01:13:34Z'
createdAt: '2014-12-15T10:07:34Z'
updatedAt: '2024-09-10T15:00:08Z'
language: JavaScript
license: MIT
branch: master
stars: 115
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:23.131Z'
description: >-
  Translates sane javascript objects (and JSON) into DynamoDb format and vice
  versa.
tags:
  - deprecated
---

# dynamoDb-marshaler 

**Note**

Amazon has added the DocumentClient to the official DynamoDB JavaScript SDK, which provides functionality very much like what this repository was intended to do. You can read about the official DynamoDB DocumentClient here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

We'll be keeping this repository available for the time being as a reference for anoyone who may have dependencies on it, but we are not intending to continue with development or support for this project.

Future pull requests and issues filed against this repo are almost certain to be closed as "will not fix".

[![NPM](https://nodei.co/npm/dynamodb-marshaler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dynamodb-marshaler/)

Translates sane javascript objects (and JSON) into DynamoDb format and vice versa.

**Caveat** Does not yet work with Binary types (B and BS). I have personally never come across
a case where I'm using binary types in json. If you need binary support, please let me know how it might be done, or contribute.

## Why?
Translation of DynamoDb `AttributeValue` objects is cumbersome and makes working with the [aws-sdk-js](https://github.com/aws/aws-sdk-js)
more difficult than it needs to be. This library abstracts away the verbose tiresome mappings and lets you work with standard javascript (JSON) data like
you're used to.

## Install
```
npm install dynamodb-marshaler
```

## Basic Marshaling of Objects
```javascript
var AWS = require('aws-sdk');
var marshalItem = require('dynamodb-marshaler').marshalItem;

AWS.config.region = 'us-west-2';
var dynamoDb = new AWS.DynamoDB();

dynamoDb.putItem({
  TableName: 'users',
  Item: marshalItem({username: 'nackjicholson'})  // {username: {S: 'nackjicholson'}}
});
```

## Basic Unmarshaling of Objects
```javascript
var AWS = require('aws-sdk');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

AWS.config.region = 'us-west-2';
var dynamoDb = new AWS.DynamoDB();

var data = dynamoDb.scan({
  TableName: 'users'
}, function(err, data) {
  // data.Items = [{username: {S: 'nackjicholson'}]
  var items = data.Items.map(unmarshalItem);
  console.log(items); // [{username: 'nackjicholson'}]
});
```

## Single Value Marshaling

```javascript
var marshal = require('dynamodb-marshaler/marshal');
console.log(marshal('nackjicholson')); // {S: 'nackjicholson'}
console.log(marshal(true)); // {BOOL: true}
console.log(marshal([1, 2, 3])); // {NS: ['1', '2', '3']}
```

## Methods
**.marshal**  
**.unmarshal**  
**.marshalItem** (alias `.toDDB`)  
**.unmarshalItem** (alias `.toJS`)  
**.marshalJson**  
**.unmarshalJson**  

## Browser
In the `./dist` directory of this repo there is a browser compatible version of this library which can be used as a
browser global, AMD, or CommonJS/Node module. Check the `examples/example.html` file for basic usage.

## JSON
You can marshal directly from a JSON string using `marshalJson`. As well as,  unmarshal a DynamoDb api response into a
JSON string with `unmarshalJson`.

## Examples
The examples directory contains a couple of node scripts which use the marshaler. If you clone this repo you can run
them easily using these commands:

`node examples/example-marshal.js`  
`node examples/example-unmarshal.js`  

They showcase all the conversions this library can perform.

The `examples/example.html` showcases use of `dynamodb-marshaler` in the browser environment. It can be run simply by
opening the example in a web browser. Or you can check it out at this [Plunkr](http://embed.plnkr.co/djI2cuXAqssYZoHO9s5a/preview)

## Understanding the rules

#### Empty strings
DynamoDB does not allow saving of an empty string `""`. The marshaler treats this as an error.

#### Sets vs Lists
Javascript has one list type -- arrays, but DynamoDB has sets and lists. How does the marshaler distinguish between the two?

Here's a table:

|                       | input                 | marshaled value                                    |
| --------------------- | --------------------- | -------------------------------------------------- |
| Strings/No duplicates | ["foo", "bar"]        | {"SS": ["foo", "bar"]}                             |
| Numbers/No duplicates | [42, 43]              | {"NS": ["42", "43"]}                               |
| Empty                 | []                    | {"L": []}                                          |
| Mixed                 | [42, "foo", null]     | {"L": [{"N": "42"}, {"S": "foo"}, {"NULL": true}]} |
| Duplicates            | ["foo", "bar", "foo"] | {"L": [{"S": "foo"}, {"S": "bar"}, {"S": "foo"}]}  |

## Contribute

Pull requests are welcome. Please run unit tests and linter.

`npm test`, `npm run lint`, and `npm run cov`.
