---
repo: ShishKabab/user-logic
url: 'https://github.com/ShishKabab/user-logic'
homepage: null
starredAt: '2025-06-30T18:02:32Z'
createdAt: '2018-12-05T16:42:53Z'
updatedAt: '2025-06-30T19:39:44Z'
language: TypeScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:53.119Z'
description: >-
  Data-driven logic for ultra-configurable applications, implemented in
  Javascript
tags: []
---

User logic
==========

This library allows you to safely evaluate logic user-defined logic. Through this, you can (lazy) load decision making logic from various sources, and analyze them in very interesting ways. As an application, think of dynamically configurable alerts based on analytics, tuning an algorithm that decides when to re-engage the user by e-mail, or defining some simple operations that need to be done during the migration of a data model. This library is inspired by [JSON logic](http://jsonlogic.com/), but a lot cleaner, more extensible, customizable and debuggable. Also, not using symbols like `!=` and `>=` makes this much more readable when storing logic in YAML format.

### Installation

```
npm install user-logic --save
```

### Usage

```
import { UserLogic } from 'user-logic'

const willReceiveWiskeyBottleLogic = new UserLogic({definition: {
    and: [
        {gt: ['$user.years-of-membership', 5]},
        {gt: ['$user.age', 21]},
        '$user.likes.alcohol',
    ]
}})

console.log(willReceiveWiskeyBottleLogic.evaluate({user: {
    'years-of-membership': 6,
    'age': 52,
    'likes': {flowers: false, alcohol: true}
}}))
```

There are operations that take one or multiple operands, but they all work in the way above.

### Supported operations

You can find the whole list of supported operations in the [unit tests](./ts/operations.test.ts).

### Customization

You can pass in custom operations to the constructor of `UserLogic`:

```
import { UserLogic } from 'user-logic'
import { unaryOperator } from 'user-logic/lib/operations'

const customLogic = new UserLogic({definition: {bla: 'Hello'}, operations: {
    bla: unaryOperator(value => value() + '!!!')
}})

console.log(customLogic.evaluate({})) // Hello!!!
```

The simplest way is to use either `unaryOperator` as shown above, or `binaryOperator`. Both take functions that evaluate the passed in expressions when called, allowing for short-circuit operators. The `binaryOperator` is used like this, and supports operators with more than one operand:

```
import { UserLogic } from 'user-logic'
import { binaryOperator } from 'user-logic/lib/operations'

const customLogic = new UserLogic({definition: {add: [3, 5, 7]}, operations: {
    add: binaryOperator((left, right) => left() + right())
}})

console.log(customLogic.evaluate({})) // 15
```

If you want to do more advanced stuff, you can construct custom nodes:

```
const customLogic = new UserLogic({definition: {'if': [true', 'True!', 'False!']}, operations: {
    ifNode: ({definition, parse}) => {
        const [condition, ifTrue, ifFalse] = definition.map(parse)
        return {
            evaluate: context => {
                if (condition.evaluate(context)) {
                    return ifTrue.evaluate(context)
                } else {
                    return ifFalse.evaluate(context)
                }
            }
        }
    }
})
```

To override lookup behavior, you can override the valueTemplate operation which receives the path without a `$` sign as the definition. This is a very simple implementation:

```
import * as objectPath from 'object-path'

export function valueTemplateNode({definition, reportLookup}) {
    const path = definition.split('.')
    return {
        evaluate: context => {
            return objectPath['withInheritedProps'].get(context, path)
        }
    }
}
```

### Logic maps

Sometimes, you need to construct an object with a few values including logic, of which a few might be conditional. For this use case, we have logic maps:
```
import { UserLogic, makeLogicMap, evalLogicMap } from 'user-logic'

const logicMap = makeLogicMap({
    foo: {gt: ['$age', 18]},
    bar: {gt: ['$age', 21]}
})
console.log(evalLogicMap(logicMap, {age: 20})) // {foo: true, bar: false}

const conditionalLogicMap = makeLogicMap([
    {name: 'Joe'},
    {if: {lt: ['$age', 18]}
     minor: true}
])
console.log(evalLogicMap(conditionalLogicMap, {age: 20})) // {name: 'Joe'}
console.log(evalLogicMap(conditionalLogicMap, {age: 15})) // {name: 'Joe', minor: true}
```

### Reporting lookups

If you need to know which variables your logic can access, pass in the `reportLookup` option to the constructor:

```
const lookups = []
const logic = new UserLogic({definition: {eq: ['$foo.test', 5]}, reportLookup: path => lookups.push(path)})
expect(lookups).to.deep.equal([
    ['foo', 'test']
])
```

### Future development

This library has the goal of making applications more flexible with user-defined business logic portable across various languages, while being super debuggable and useful to work on complex logic with inter-disciplinary teams. In this content, I'd like to see the following features:

- **Solid debugging tools**: The basic hooks that allow users to step through the logic, and even its compilation, to enable better visualization.
- **Awesome error reporting**: Tagging each node in the logic with a specific ID and attaching those to errors, so clear visualization of errors.
- **Logic reversing**: Generating possible sceneraios for a given logic set for generating better unit tests. For example `{and: ['$foo', '$bar']}` with $foo and $bar being booleans would generate `[{foo: true, bar: true}, {foo: true, bar: false}, {foo: false, bar: true}, {foo: false, bar: false}]`.
- **A framework independent, highly customizable visual editor**: Something like Scratch and Blockly that would be suitable for working on logic in serious business settings.
