---
repo: chrisguttandin/dynamo-converters
url: 'https://github.com/chrisguttandin/dynamo-converters'
homepage: ''
starredAt: '2016-12-12T20:10:17Z'
createdAt: '2014-02-19T23:17:58Z'
updatedAt: '2025-02-24T18:39:47Z'
language: JavaScript
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:51.567Z'
description: >-
  A collection of converter functions to get good old JavaScript key/value
  objects into a DynamoDB friendly schema and back again.
tags:
  - aws
  - dynamodb
---

# dynamo-converters

**A collection of converter functions to get good old JavaScript key/value objects into a DynamoDB friendly schema and back again.**

[![version](https://img.shields.io/npm/v/dynamo-converters.svg?style=flat-square)](https://www.npmjs.com/package/dynamo-converters)

## Functionality

Amazon's official [aws-sdk for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/) uses a relatively verbose data structure to [put](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property), [update](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateItem-property) or [delete](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property) items stored inside a DynamoDB table. This is necessary to cover all possible use cases. But most of the time a much simpler data structure does the job as well. This little package is made for those cases.

If you think the official SDK is too verbose but this package does not cover all your needs you
might want to take a look at [dynamodb-data-types](https://github.com/kayomarz/dynamodb-data-types)
by [kayomarz](https://github.com/kayomarz).

## Getting Started

This package is available on [npm](https://www.npmjs.org/package/dynamo-converters) and can be
installed as usual:

```shell
npm install dynamo-converters
```

You can then use `dynamo-converters` by importing it:

```js
import { addValue, createDataToItem, dataToItem, deltaToUpdateParams, itemToData, withDateSerialization } from 'dynamo-converters';
```

## Documentation

`dynamo-converters` does provide the following functions:

### item : dataToItem( data )

This function takes a plain JavaScript object as input and returns a structured item which can then
be used with the official SDK.

```js
const data = {
    object: {
        nothing: undefined,
        number: 2,
        string: 'lorem ipsum'
    }
};

console.log(dataToItem(data));

// {
//     object: {
//         M: {
//             number: { N: '2' },
//             string: { S: 'lorem ipsum' }
//         }
//     }
// }
```

Please have a look at the
[unit tests](https://github.com/chrisguttandin/dynamo-converters/blob/master/test/unit/module.js#L4-L59) for
more examples.

This function is similar to the [`marshall()` function](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html#marshall-1) provided by the [@aws-sdk/util-dynamodb package](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html#aws-sdkutil-dynamodb) but it preserves the property types.

```js
dataToItem({ a: 0 });
// {
//     a: {
//         N: string;
//     };
// }

marshall({ a: 0 });
// {
//     [key: string]: any;
// }
```

### dataToItem : createDataToItem( transformSingleValue )

By default `dataToItem()` only handles values which directly map to the types supported by DynamoDB. If you need to transform certain values before converting them into an item you can create a custom version of `dataToItem()` by using the `createDataToItem()` factory method. It expects to be called with a function that transforms a single value.

Here is an example which turns a `Date` into a `string`.

```js
import { createDataToItem } from 'dynamo-converters';

const dataToItem = createDataToItem((value) => (value instanceof Date ? value.toJSON() : value));
```

A function for doing the exact same thing is also provided by `dynamo-converters`. You can therefore simply import it instead.

```js
import { createDataToItem, withDateSerialization } from 'dynamo-converters';

const dataToItem = createDataToItem(withDateSerialization);
```

### updateParams : deltaToUpdateParams( delta )

This function takes a plain JavaScript object as input and returns all necessary update params which
can then be used with the official SDK.

`deltaToUpdateParams()` also takes care of
[reserved words](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html)
and populates the `expressionAttributeNames` property of the returned object if needed. If the delta
contains no reserved word this property will be missing.

```js
const delta = {
    nothing: undefined,
    object: {
        number: 2,
        string: 'lorem ipsum'
    }
};

console.log(deltaToUpdateParams(delta));

// {
//     ExpressionAttributeNames: {
//         '#object': 'object'
//     },
//     ExpressionAttributeValues: {
//         ':object': {
//             M: {
//                 number: {
//                     N: '2'
//                 },
//                 string: {
//                     S: 'lorem ipsum'
//                 }
//             }
//         }
//     },
//     UpdateExpression: 'REMOVE nothing SET #object = :object'
// }
```

The `addValue()` function can be used to define an [ADD](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html#Expressions.UpdateExpressions.ADD) action.

```js
const delta = {
    counter: addValue(3)
};

console.log(deltaToUpdateParams(delta));

// {
//     ExpressionAttributeNames: {
//         '#counter': 'counter'
//     },
//     ExpressionAttributeValues: {
//         ':counter': {
//             N: '3'
//         }
//     },
//     UpdateExpression: 'ADD #counter = :counter'
// }
```

Please have a look at the
[unit tests](https://github.com/chrisguttandin/dynamo-converters/blob/master/test/unit/module.js#L61-L182) for
more examples.

### data : itemToData( item )

This function takes a structured item returned by the official SDK and turns it into a plain
JavaScript object.

```js
const item = {
    object: {
        M: {
            number: { N: '2' },
            string: { S: 'lorem ipsum' }
        }
    }
};

console.log(itemToData(item));

// {
//     object: {
//         number: 2,
//         string: 'lorem ipsum'
//     }
// }
```

Please have a look at the [unit tests](https://github.com/chrisguttandin/dynamo-converters/blob/master/test/unit/module.js#L184-L227) for more examples.

This function is similar to the [`unmarshall()` function](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html#unmarshall-1) provided by the [@aws-sdk/util-dynamodb package](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html#aws-sdkutil-dynamodb) but it preserves the property types.

```js
itemToData({ a: { N: '1' } });
// {
//     a: number;
// }

unmarshall({ a: { N: '1' } });
// {
//     [key: string]: any;
// }
```

### transformedValue : withDateSerialization (value)

This is an example implementation of a custom transform function. In case it gets called with a `Date` it will turn it into a `string`. Any other value gets just passed through as is.
