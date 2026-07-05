---
repo: remorses/baby-i-am-faded
url: 'https://github.com/remorses/baby-i-am-faded'
homepage: 'https://baby-i-am-faded.now.sh'
starredAt: '2021-11-21T06:53:41Z'
createdAt: '2020-04-18T12:09:38Z'
updatedAt: '2023-08-05T21:50:21Z'
language: TypeScript
license: NA
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.509Z'
description: Reveal animations using React and Emotion
tags: []
---

<div align="center">
    <br/>
    <br/>
    <h1><pre>baby-i-am-faded</pre></h1>
    <br/>
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Faded_Zhu.jpg/220px-Faded_Zhu.jpg" />
    <br/>
    <br/>
    <br/>
</div>

Animates react components when in view, uses `emotion` for the animations code, completely tree shakable, super tiny

## Features

-   🏷 **TypeScript support** - It is written in TypeScript to make it easier and faster to use the library
-   🍃 **Lightweight** - Very little footprint on your project and no other dependencies required
-   🚀 **Fast** - Buttery smooth experience thanks to the use of native asynchronous APIs and hardware acceleration

## Demo

You can find a demo website [here](https://baby-i-am-faded.xmorse.now.sh).

## Install

`yarn add baby-i-am-faded`

## Usage

You can use the faded component like this

```tsx
import { Faded } from 'baby-i-am-faded'
import 'baby-i-am-faded/styles.css'

export const App = () => (
    <>
        <Faded cascade>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
        </Faded>
        <Faded whenInView triggerOnce>
            <Placeholder />
        </Faded>
    </>
)
```

## Limitations

`cascade` works only on the first 30 elements

`cascade` animates only children with depth 1, not children of children

Animations are disabled by default on mobile browser (width less than 500px) and on devices that prefer reduced motion
