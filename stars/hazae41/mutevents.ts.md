---
repo: hazae41/mutevents.ts
url: 'https://github.com/hazae41/mutevents.ts'
homepage: 'https://deno.land/x/mutevents'
starredAt: '2020-05-26T15:18:37Z'
createdAt: '2020-02-26T21:20:36Z'
updatedAt: '2023-01-27T19:48:41Z'
language: TypeScript
license: NA
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:51.027Z'
description: 'Typed, mutable, async, and promiseable events for Deno'
tags:
  - abortable
  - deno
  - events
  - functional
  - listener
  - promises
  - typescript
---

# Mutevents

Typed, async, and promiseable events for Deno.

## Usage

    deno cache -r https://deno.land/x/mutevents/mod.ts

```typescript
import { EventEmitter } from "https://deno.land/x/mutevents/mod.ts";

interface AnimalEvents {
  death: string
}

class Animal extends EventEmitter<AnimalEvents> { 
  async die(){
    return await this.emit("death", "I'm dead!")
  }
}

const animal = new Animal()

animal.on(["death"], (text) => console.log(text))

const [msg, cancelled] = await animal.die()
if(cancelled) console.error(cancelled)
```

## Syntax

```typescript
type EventPriority =
  "before" | "normal" | "after";

type EventResult<T, K extends keyof T> =
  [data: T[K], cancelled?: Cancelled]

type EventListener<V> =
  (x: V) => unknown | Promise<unknown>

// Emit an event with the given args, returns a Cancelled object if cancelled
emitter.emit(event, data): Promise<EventResult>

// Synchronously emit an event with the given args, returns a Cancelled object if (synchronously) cancelled
emitter.emitSync(event, data): EventResult

// Add a listener on the given event and priority, returns a removal function
emitter.on([event, priority], ...listeners: EventListener[]): () => void

// Add a listener that removes itself when executed, returns a removal function
emitter.once([event, priority], ...listeners: EventListener[]): () => void

// Abortable promise that resolves (with the result) when the given event type is emitted
emitter.wait([event, priority], filter: (data) => boolean): Abortable (Promise)

// Abortable promise that rejects (with the result) when the given event type is emitted
emitter.error([event, priority], filter: (data) => boolean): Abortable (Promise)

// Shortcut for creating an event listener that reemits the data on the given event type
emitter.reemit(event): EventListener

// Shortcut for creating an event listener that synchronously reemits the data on the given event type
emitter.reemitSync(event): EventListener
```

## Types

Types are useful with TypeScript autocompletion and compiler warnings. Plus, they allow you to inherit events from a superclass.

We define a generic type Animal with a "death" event type

```typescript
interface AnimalEvents {
  death: void // No arguments passed
}
```

Using inheritance

```typescript
class Animal<E extends AnimalEvents = AnimalEvents> extends EventEmitter<E> {
  async die(){
    return await this.emit("death", undefined)
  }
}
```

Or a field

```typescript
class Animal<E extends AnimalEvents = AnimalEvents> {
  events: new EventEmitter<E>()
  // ...
}
```

Then we define a type Dog that extends Animal with a "woof" event type.

```typescript
interface DogEvents extends AnimalEvents /*<- This is important*/ {
  woof: string // Argument type of the "woof" event
}

class Dog extends Animal<DogEvents> {
  async woof(text: string){
    return await this.emit("woof", text)
  }
}
```

Dog can now emit two event types: "woof" and "death"

## Cleaning up

In order to avoid memory leaks, you must clean up your garbage!

You can achieve this by running the removal functions.

One method to do so is to call them all once a certain event happens (usually a "close", "quit", "finish" event that happens once)

```typescript
class Connection extends EventEmitter<{
  message: string
  close: undefined
}> {}

const offmessage = connection.on(["message"],
  (text) => console.log(text))

connection.once(["close"], offmessage)
```

You can also call multiple removal functions at once

```typescript
type Location = [number, number, number]

class Player extends EventEmitter<{
  spawn: Location
  death: Location 
  quit: Location
}> {}

const offspawn = player.on(["spawn"],
  ([x, y, z]) => console.log("Spawn:", x, y, z))

const offdeath = player.on(["death"], 
  ([x, y, z]) => console.log("Death:", x, y, z))

player.once(["quit"], offspawn, offdeath)
```

## Priorities

An event listener can have a priority:
- "before" 
- "normal"
- "after"

The priority must be defined in the array after the event name. If no priority is defined, "normal" will be used.

Example

```typescript
dog.on(["woof"], () => console.log("Normal"));
dog.on(["woof", "after"], () => console.log("Last"));
dog.on(["woof", "before"], () => console.log("First"));
```

When multiple listeners are on the same priority, the first defined will be the first executed.

```typescript
dog.on(["woof", "before"], () => console.log("First"));
dog.on(["woof", "before"], () => console.log("Last"));
```

## Cancellation

Any event can be cancelled by any listener. The listener needs to throw something.
The next listener will not be executed, and the emit() will also throw.

If you want to cancel an event without throwing an error, there is a special Cancelled object with an optional reason field. Such object will not be thrown on the emitter side.

```typescript
dog.on(["woof"], () => {
  throw new Cancelled("...");
});

dog.on(["woof"], () => {
  console.log("This won't be displayed")
});
```

You can check for cancellation on the emitter side

```typescript
const [data, cancelled] = await dog.emit("woof");
if (cancelled) console.error("cancelled")
```

Or rethrow it

```typescript
const [data, cancelled] = await dog.emit("woof");
if (cancelled) throw cancelled;
```

## Promises

See `test/connection.ts` and `test/bingo.ts`

You can wait for an event and resolve/reject when it happens.

```typescript
await emitter.wait("event") // Will resolve when "event" is emitted
await emitter.error("event") // Will reject when "event" is emitted
```

Such promises are [abortables](https://deno.land/x/abortable), so you can race them and abort them when done.

```typescript
// @test/connection.ts
// Wait for a message until the connection is closed
// Removing both listeners when one of them fullfills
async read() {
  const message = this.wait("message")
  const close = this.error("close")
  return await Abort.race([message, close])
}
```

You can also race them with a timeout from https://deno.land/x/timeout

Since Timeout uses Abortable, all listeners are removed when the delay is exceeded

```typescript
// @test/connection.ts
// Wait for a message until the connection is closed OR the delay is exceeded
// Removing both listeners and clearing the timeout when one of them fullfills
// Throws TimeoutError if the delay is exceeded
async request() {
  const response = this.wait("message")
  const close = this.error("close")
  return await Timeout.race([response, close], 1000)
}
```
