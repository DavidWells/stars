---
repo: livingdocsIO/microschema
url: 'https://github.com/livingdocsIO/microschema'
homepage: ''
starredAt: '2022-11-29T18:34:01Z'
createdAt: '2017-10-28T02:36:28Z'
updatedAt: '2025-02-22T01:01:32Z'
language: JavaScript
license: NA
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:06.992Z'
description: ' Small library without dependencies to create JSON Schemas.'
tags:
  - json-schema
  - jsonschema
  - schema
---

# microschema

Small library without dependencies to create JSON Schemas in a concise way.

Example:
```js
const ms = require('microschema')

ms.strictObj({
  identityId: 'string:required',
  clientId: 'number',
  redirectUri: 'string:uri',
  scope: 'string',
  ipAddress: ms.string({pattern: ''}),
  children: ms.arrayOf(ms.strictObj({
    scope: 'string'
  }))
})
```


## Strings

Using the `ms.string()` method:
```js
ms.string()
output = {type: 'string'})
```

```js
ms.string({pattern: '[a-z]+'})

// Passing a javascript RegExp is equivalent to the above
ms.string({pattern: /[a-z]+/})

output = {
  type: 'string',
  pattern: '[a-z]+'
}
```

Specifying a format:
```js
ms.string({format: 'email'})

output = {
  type: 'string',
  format: 'email'
}
```
Note: Check which formats are available with your JSON Schema
implementation before using this.


Specifying min and max length:
```js
ms.string({minLength: 3, maxLength: 50})

output = {
  type: 'string',
  minLength: 3,
  maxLength: 50
}
```

Setting the required flag (only possible within an object):
```js
ms.obj({
  foo: ms.required.string()
})

output = {
  type: 'object',
  required: ['foo'],
  properties: {
    foo: {
      type: 'string'
    }
  }
}
```

Simplified usage within objects:
```js
ms.obj({
  foo: 'string'
})

output = {
  type: 'object',
  properties: {
    foo: {
      type: 'string'
    }
  }
}
```

```js
ms.obj({
  foo: 'string:required'
})

output = {
  type: 'object',
  required: ['foo'],
  properties: {
    foo: {
      type: 'string'
    }
  }
}
```

## Numbers and Integers

Simplified usage within objects:
```js
ms.obj({
  foo: 'string'
})
```

Using the `ms.number()` method:
```js
ms.number()
output = {type: 'number'}
```

```js
ms.number({min: 0, max: 10})

output = {
  type: 'number',
  minimum: 0,
  maximum: 10
}
```

Using the `ms.integer()` method:
```js
ms.integer()
output = {type: 'integer'}
```

The `integer()` methods also accepts `min` and `max` params the same as `number()` does.


## Booleans

```js
ms.boolean()
output = {type: 'boolean'})
```

Simplified usage within objects:
```js
ms.obj({
  foo: 'boolean:required'
})

output = {
  type: 'object',
  required: ['foo'],
  properties: {
    foo: {
      type: 'boolean'
    }
  }
}
```

## Null

```js
ms.null()
output = {type: 'null'})
```

## Objects

```js
ms.obj()
output = {type: 'object'}
```

Don't allow additional properties with `strictObj()`:
```js
ms.strictObj({
  count: ms.integer()
})

output = {
  type: 'object',
  additionalProperties: false,
  properties: {
    count: {type: 'integer'}
  }
}
```

Add `title` and `description` annotations to the schema:
```js
ms.obj({
  displayName: 'string',
}, {title: 'Title', description: 'Desc.'})

output = {
  type: 'object',
  title: 'Title',
  description: 'Desc.',
  properties: {
    displayName: {type: 'string'}
  }
}
```

Add `dependencies`:
```js
ms.obj({
  creditCard: 'string',
  address: 'string'
}, {dependencies: {creditCard: 'address'}})

output = {
  type: 'object',
  properties: {
    creditCard: {type: 'string'},
    address: {type: 'string'}
  },
  dependencies: {
    creditCard: ['address']
  }
}
```

Set a `default` value in case the property is absent:
```js
ms.obj({
  creditCard: 'string',
  address: 'string'
}, {default: {}})

output = {
  type: 'object',
  default: {},
  properties: {
    count: {type: 'integer'}
  }
}
```


## Arrays

```js
ms.arrayOf(ms.string())

output = {
  type: 'array',
  items: {type: 'string'}
}
```

You can use these additional modifiers:
```js
ms.arrayOf(ms.string(), {minItems: 1, maxItems: 3, uniqueItems: true})

output = {
  type: 'array',
  items: {type: 'string'},
  minItems: 1,
  maxItems: 3,
  uniqueItems: true
}
```

## Enumerations

```js
// All values in an enumeration must be of the same type.
ms.enum('foo', 'bar')

output = {
  type: 'string',
  enum: ['foo', 'bar']
}
```

## Constant Value

```js
ms.const('foo')

// The output is the same as ms.enum('foo') as there is no equivalent
// to value in JSON schema.
output = {
  type: 'string',
  const: 'foo'
}
```

## Combining Types

```js
ms.types('string', 'number')
output = {
  type: ['string', 'number']
}

ms.types(ms.string({format: 'uri'}), ms.number({min: 0}))
output = {
  type: ['string', 'number'],
  format: 'uri',
  minimum: 0
}
```

## anyOf / oneOf / allOf

```js
ms.anyOf('number', ms.obj({foo: 'string'}))

output = {
  anyOf: [
    {type: 'number'},
    {
      type: 'object',
      properties: {
        foo: {type: 'string'}
      }
    }
  ]
}
```
Note: you can also pass an array as the first argument


## $id / $ref

```js
ms.$id('#user').obj({
  name: 'string',
  friend: ms.$ref('#user')
})

output = {
  $id: '#user',
  type: 'object',
  properties: {
    name: {type: 'string'}
    friend: {$ref: '#user'}
  }
}
```

## definitions

```js
ms.definitions({
  user: ms.obj({name: 'string'})
}).obj({
  name: 'string',
  friend: ms.$ref('#/definitions/user')
})

output = {
  definitions: {
    user: {
      type: 'object',
      properties: {
        name: {type: 'string'}
      }
    }
  }
  type: 'object',
  properties: {
    name: {type: 'string'}
    friend: {$ref: '#/definitions/user'}
  }
}
```
