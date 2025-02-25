---
repo: keithamus/nibstate
url: 'https://github.com/keithamus/nibstate'
homepage: null
starredAt: '2022-03-30T21:33:52Z'
createdAt: '2022-03-21T08:44:48Z'
updatedAt: '2024-01-02T14:42:36Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:53.224Z'
description: null
tags: []
---

# nibstate

`nibstate` is an attempt to make the smallest and easiest to learn state management solution. As opposed to learning complex concepts like "Observables" or "Reactive Programming" or "Reducers", nibs provides a single function which boxes up a value and - if the value gets re-assigned - anything listening to it will update.

## Installation

```shell
$ npm install --save nibstate
```

## Usage

The main export is `nib`, which lets you box a value into a "Nib". You can then call `next(fn)`, and `fn` will be called at-most-once: the next time the `nib` changes value:

```typescript
import {nib, get, set} from 'nibstate'

const myState = nib('foo')
get(myState) // 'foo'
myState.value // 'foo'

myState.next(console.log)

set(myState, 'bar') // you can also use `myState.value = 'bar'`
// "bar" will be logged to the console

```

nibs can be derived from other nibs by passing a function, which is given a special version of `get` that allows for automatic updating:

```typescript
import {nib, get, set} from 'nibstate'

const myState = nib('hello')

const myStateUpper = nib(get => get(myState).toUpperCase())
const myStateLength = nib<number>(get => get(myState).length)

get(myState) // 'hello'
get(myStateUpper) // 'HELLO'
get(myStateLength) // 5

set(myState, 'goodbye')

get(myState) // 'goodbye'
get(myStateUpper) // 'GOODBYE'
get(myStateLength) // 7
```

nibs can be of any value, and they can be derived from any value, so for example you could have a function which fetches the JSON of a URL of a previous nib, like so:

```typescript
import {nib, get, set} from 'nibstate'
import type {Person} from './my-api/types'

const initials = nib<string>('A')

const url = nib<string>(get => `https://example.com/api/people.json?initials=${get(initials)}`)

const people = nib<Promise<Person[]>>(async get => {
  const res = await fetch(get(url))
  const json = await res.json()
  return json.data.people
})

const givenNames = nib<Promise<string[]>>(async get => {
  const results = await get(people)
  return results.map(person => person.givenName)
})

const peopleCount = nib<Promise<number>>(async get => {
  const results = await get(people)
  return results.length
})

console.log(await get(givenNames)) // ['Aki', 'Alex', 'Ali', 'Azriel']
console.log(await get(peopleCount)) // 4

initials.value = 'B'

console.log(await get(givenNames)) // ['Baily', 'Byrd', 'Bo', 'Brit', 'Bernie']
console.log(await get(peopleCount)) // 5
```

If you want to subscribe to _all_ changes of a Nib, you can `for await` them:

```typescript
import {nib} from 'nibstate'

const tick = nib(0)

function incr() {
  tick.value += 1
  setTimeout(incr, 1000)
}
setTimeout(incr, 1000)

for await(const t of tick) {
  console.log(t)
}
// Console logs:
// 1
// 2
// 3
// ... and so on
```

# Inspiration & Credits

nibs take some inspiration from "atoms" in libraries like [Recoil](https://recoiljs.org) and [Jotai](https://jotai.org). nibs offer similar API surface, but are modelled more closely from Observables (specifically, [mini-observable](https://github.com/keithamus/mini-observable))
