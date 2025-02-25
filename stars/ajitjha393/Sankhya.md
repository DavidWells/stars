---
repo: ajitjha393/Sankhya
url: 'https://github.com/ajitjha393/Sankhya'
homepage: 'https://www.npmjs.com/package/sankhya-graph-js'
starredAt: '2022-01-31T23:19:08Z'
createdAt: '2022-01-28T14:50:35Z'
updatedAt: '2024-09-13T12:18:28Z'
language: JavaScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.095Z'
description: >-
  A powerful and declarative way to remap one Object in another using
  transformation graph for JS Objects
tags:
  - getters
  - graph
  - js
  - proxy
---

# Sankhya

Sankhya, a JavaScript utility-library to declaratively transform an Object into
another using pure transformation functions.

This is inspired from [Plumbing](https://github.com/plumatic/plumbing) Clojure
library

## Installation

```
npm i sankhya-graph-js
or
yarn add sankhya-graph-js

```

## Example

Traditional way of defining Transformation:

```js
function stats(input) {
  const {values} = input

  if (!values) throw new Error('No property "values"!')

  const count = values.length
  const mean = values.reduce(sum) / count
  const meanSquare = values.map(square).reduce(sum) / count
  const variance = meanSquare - square(mean)

  const output = {
    count,
    mean,
    meanSquare,
    variance,
  }
  return output
}

function sum(a, b) {
  return a + b
}
function square(a) {
  return a * a
}

const data = {values: [1, 2, 3, 4, 5, 6, 7]}
const transformedObj = stats(data)

console.log(transformedObj)
// -> Object {count: 7, mean: 4, meanSquare: 20, variance: 4}
```

Problems with the above approach:

Here the drawback of this approach is that each of these transformation function
are dependent on the ones above it. Hence we have to make sure that proper
dependency order is maintained.

So if you try to exchange the order of the definition of these functions it will
blow up. If you exchange `meanSquare` and `variance` order, it won't work.

Here we can see that these functions are not independent which becomes a
liability

Hidden Graph which is maintained by this stats

![image](https://user-images.githubusercontent.com/42679346/151663228-6b684600-ed42-4386-abc0-6715c9fb87ba.png)

Using `sankhya`, we can refactor stats to this very declarative, robust and
structured form, using a map from keywords to keyword functions:

```js
const sankhya = require('sankhya-graph-js')

const square = x => x ** 2
const sum = (x, y) => x + y

const stats = sankhya({
  meanSquare: (i, o) => i.values.map(square).reduce(sum) / o.count,
  count: (i, o) => i.values.length,
  variance: (i, o) => o.meanSquare - square(o.mean),
  mean: (i, o) => i.values.reduce(sum) / o.count,
})

const transformedObj = stats({values: [1, 2, 3, 4, 5, 6, 7]})
console.log(transformedObj)
// -> Object {count: 7, meanSquare: 20, mean: 4, variance: 4}
```

## Explanation:

Every output transformation is pure and expressed with an arrow function, where
the i and o parameters represent input (data) and output (the future returned
object) respectively.

We can express output values in function of other output values, `sankhya` will
understand the underlying graph and execute the statements in the right order!
Ordering of the definition of these functions can be arbitrary

Moreover, each micro-function in the object values is executed exacly once, and
the result cached for next calls. (You can verify this by logging from inside
the arrow functions)

This is why the given functions need to be pure.

## Validation

Before performing any transformation `sankhya` validates input data, and throws
if a property on input is non-existant.

```js
function dataAttributeProxy(data) {
  return new Proxy(data, {
    get: (t, p, r) => {
      if (p in t) {
        return t[p]
      }
      throw new Error(`Data object is missing key ${p}`)
    },
  })
}
```

## Laziness

Sometimes we define a heavy computation function, rich of all the data we might
need, but somewhere we need only a subset of these.

But in the traditional way we can't achieve this without actually triggering all
of the computations

For these cases we have `.lazy`.

For example, suppose we only need the mean of our data:

```js
const data = {values: [1, 2, 3, 4, 5, 6, 7]}
const transformed = stats.lazy(data)

// The object is initially empty:
console.log(transformed)
// -> Object {}

// We materialize and objectify the computations as they are needed:
console.log(transformed.mean)
// -> 4

// The results are then attached to the object,
// but anything we don't need is not computed:

console.log(transformed)
// -> Object {count: 7, mean: 4}
```

This is made possible by using prototype getters.

This also guarantees to execute the minimum of necessary steps to get the
result.

## Type Definitions -

```ts
export type sankhyaConfig<I, O> = {
  [K in keyof O]: (i: I, o: O) => O[K]
}

interface sankhyaTransformer<I, O> {
  (input: I): O
  lazy: (input: I) => O
}

declare function sankhya<I = Record<string, any>, O = Record<string, any>>(
  config: sankhyaConfig<I, O>,
): sankhyaTransformer<I, O>

export default sankhya
```
