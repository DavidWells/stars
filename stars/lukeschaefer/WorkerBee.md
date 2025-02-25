---
repo: lukeschaefer/WorkerBee
url: 'https://github.com/lukeschaefer/WorkerBee'
homepage: ''
starredAt: '2022-02-14T18:01:38Z'
createdAt: '2015-09-18T21:00:43Z'
updatedAt: '2024-01-03T12:13:49Z'
language: TypeScript
license: MIT
branch: master
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:23.375Z'
description: Inline Web Workers without external files
tags:
  - javascript
  - typescript
  - worker
---

# WorkerBee

WorkerBee is a minimal TypeScript library to make using Web Workers as easy as possible. 
Instead of having to create a seperate file for code that is run in a different thread, 
workers can be made inline with their own functions and be communicated with asynchronously.

## Why?

Javascript is single-threaded. If a complex operation is running for a while, nothing else will
run, and your browser will slow down, and your UI will become unresponsive. 

Here's a quick example of a function that can run for a long time if you're not careful:

```typescript
// From https://stackoverflow.com/a/57012040:
const findNthPrime = (n : number) => {
  const primes = [];
  let i = 1;
  while (i++ && primes.length < n) {
    primes.reduce((a,c)=>(i%c)*a,2) && prime.push(i);
  }
  return primes.pop();
}

// Will likely cause your browser to become unresponsive:
const result = findNthPrime(100000);
```

With WorkerBee - if you have a simple, self-contained function like that, you can execute
it another thread like so:

```typescript
const workerFindNthPrime = miniWorker(findNthPrime);
const result = await workerFindNthPrime(100000);
```

And things will work nice and smoothly, no matter how long that operation takes.
See below for more complex use-cases.

## Installation

```
npm install @lukeschaefer/worker-bee
```
    
## Usage:

There are two ways of creating workers in WorkerBee:

### `miniWorker()`

Like we saw above, simply give miniWorker a self-contained function, and it can execute it in a separate thread:

```typescript
import { miniWorker } from '@lukeschaefer/worker-bee';

const multiplier = miniWorker((x, y) => {
  return x * y;
});

const result = await multiplier(12,3);
console.log(result); // 36 is logged
```

But that's about all it can do.

### `createWorker`

`createWorker` takes in an initialization object, which can consist of properties and methods to call. 
It will generate accessors and setters so that you can interact with your Web Worker as easily as a normal object:

```typescript

const usefulWorker = createWorker({
  counter: 0,
  addToCounter: function(input: number) {
    this.counter += input;
    return this.counter;
  },
  addRandomToCounter: function() {
    return this.addToCounter(Math.random());
  }
});

usefulWorker.counter = 20;

usefulWorker.addToCounter(10); // Promise<30>
usefulWorker.addRandomToCounter(); // Promise<30.123>
```

`createWorker` workers come with a few helper functions as well:

  - `destroy()` - Closes the webworker.
  - `importScript()` - Makes the webworker call `loadScript`

