---
repo: pedronauck/spacefold
url: 'https://github.com/pedronauck/spacefold'
homepage: null
starredAt: '2022-03-17T16:43:31Z'
createdAt: '2022-03-15T23:52:19Z'
updatedAt: '2023-09-30T13:02:08Z'
language: TypeScript
license: NA
branch: main
stars: 62
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:57.839Z'
description: Use Pub/Sub pattern inside your React applications easily
tags: []
---

# spacefold

🗣 Use Pub/Sub pattern inside your React applications easily!

[![GitHub release](https://img.shields.io/github/release/pedronauck/spacefold.svg)]()

## 📜 Table of content

- [Demo](#--demo)
- [Why](#--why)
- [Usage](#--usage)
- [Contribute](#--contribute)

## 🔥 &nbsp; Demo

Like always, a counter as a demo: [Counter Demo](https://codesandbox.io/s/spacefold-counter-6hcb7x?file=/src/index.tsx)

## 🧐 &nbsp; Why

React has a declarative API and a unidirectional data flow, this is beatiful and changes a lot the way we write our frontend application, in fact, this changes everything. But, like a lot of things, React has good and bad parts. One of the bad ones, is that sometimes just make a simple communication between modules (internal or external), became hard to do that using props or states and in a lot of cases you will need a context/provider, some state management library or - in worst cases - prop dilling.

Because of that I've beeing used a very simple implementation of an old pattern called Pub/Sub inside my application when I have this type of problem.

#### ⚠️ Disclaimer

> This is not intended to replace your state management library or something else. Use this with caution or you can became your system very hard to debug.

## 💻 &nbsp; Usage

- **Small**. 1.3kb minified!
- **Extremely Simple**. Just publishers and subscribers like old ways

Install as project dependency:

```bash
$ yarn add spacefold
```

Now you can start to create your publishers and subscribers

```tsx
import { useState } from "react";
import { pub, sub, useSub } from "spacefold";

const inc = pub<number>();
const dec = pub<number>();

const counterSub = sub({
  register: [inc, dec] // You need to register which events your subscriber accept
});

const Counter = () => {
  const [state, setState] = useState(0);
  const sub = useSub(counterSub);

  sub.on(inc, (num) => {
    setState(state + num);
  });
  sub.on(dec, (num) => {
    setState(state - num);
  });

  return <div>{state}</div>;
};

const Decrement = () => (
  <button onClick={() => dec.send(2)}>dec</button>
);

const Increment = () => (
  <button onClick={() => inc.send(2)}>inc</button>
);

export const App = () => (
  <div>
    <Counter />
    <Increment />
    <Decrement />
  </div>
);
```

Yes, simple as that, just a subscriber and a publisher!

## 🕺 &nbsp; Contribute

1.  [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2.  Install dependencies using Yarn: `yarn install`
3.  Make the necessary changes and ensure that the tests are passing using `yarn test`
4.  Send a pull request 🙌
