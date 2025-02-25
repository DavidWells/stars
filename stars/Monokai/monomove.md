---
repo: Monokai/monomove
url: 'https://github.com/Monokai/monomove'
homepage: null
starredAt: '2022-06-20T21:52:40Z'
createdAt: '2021-07-22T13:19:32Z'
updatedAt: '2025-02-05T19:11:15Z'
language: JavaScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.160Z'
description: Utilities for moving things on screen
tags: []
---

# Monomove
## Utilities for moving things

The aim of Monomove is to be a minimal toolkit for adding interaction and movement to web apps. It consists of a couple of components:

- `Tween` (animation tweening)
- `TweenManager` (manages the tweens)
- `delay` (simple utility)
- `Timeline` (a timeline of parallel tweens)
- `TweenChain` (a chain of consecutive tweens)
- `RenderLoop` (manages rendering via `requestAnimationFrame`)
- `SmoothScroller` (listen to DOM element scroll positions via `IntersectionObserver`)

### Install

```sh
npm install --save @monokai/monomove
```

### Usage

#### ESM

The recommended way to use Monomove is via esm style modules. This way of importing supports tree-shaking and keeps your packages small.

```js
import {Tween} from '@monokai/monomove';
```

#### CommonJS

You can also use commonjs style modules (`const {Tween} = require('monomove')`) but then you'll lose the tree shaking part.

```js
const {Tween} = require('@monokai/monomove');
```

#### UMD

You can directly link to Monomove via a script tag or `require` the umd version and it will globally create a `monomove` object from which you can use the modules.

```js
require('@monokai/monomove/umd');

const {SmoothScroller} = window.monomove;
```

#### From source

Alternatively, you can directly import from the source files in your project. The source files are not transpiled and potentially use some JavaScript syntax that's not cross-browser compatible.

```js
import {Tween} from 'monomove/source';
```

## Tween

A minimal animation tweening utility.

### Importing it:

```js
import {Tween} from '@monokai/monomove';
```

### Using it

Simple animation, tweening the opacity:

```js
const element = document.getElementById('my-id');
const duration = 0.2; // seconds

await new Tween(({value}) => {
	element.style.opacity = value;
}, duration)
	.start();
```

Tweening position with easing:

```js
await new Tween(({value}) => {
	element.style.left = `${value * 100}px`;
}, duration)
	.easing('0.25, 0.25, 0, 1') // css style easing
	.start();
```

Alternative invocation with any object:

```js
await new Tween({
	x: 0,
	y: 0
}, duration)
	.to({
		x: 100,
		y: 200
	})
	.onUpdate(({x, y}) => {
		element.style.transform = `translate3d(${x * 100}px, ${y * 100}px, 0)`;
	})
	.start();
```



## Timeline

Adding tweens together and create a single timeline

### Importing it:

```js
import {Timeline} from '@monokai/monomove';
```

### Using it

A timeline is a collection of tweens playing in parallel that you can control with a normalized position (between 0 and 1, inclusive).

Create a timeline of two tweens and jump to 50% of the timeline:

```js
const timeline = new Timeline([
	new Tween(({value}) => {
		element.style.opacity = value * 0.5;
	}, 2),
	new Tween(({value}) => {
		element.style.left = `${value * 100}px`;
	}, 1).delay(0.5)
])

timeline.setPosition(0.5);
```



```js
import {TweenChain} from '@monokai/monomove';
```

### Using it

A tween chain is a collection of tweens that play after each other. You can control the chain by setting a normalized position (between 0 and 1, inclusive).

Create a chain of two tweens and jump to 50% of the timeline:

```js
const tweenChain = new TweenChain([
	new Tween(({value}) => {
		element.style.opacity = value * 0.5;
	}, 2),
	new Tween(({value}) => {
		element.style.left = `${value * 100}px`;
	}, 1).delay(0.5)
])

tweenChain.setPosition(0.5);
```



## TweenManager

### Importing it:

```js
import {TweenManager} from '@monokai/monomove';
```

The tween manager takes care of running and cleaning up tween instances. Whenever you want to immediately delete tweens, you can use this class

### Removing all tweens

```js
TweenManager.removeAll();
```



## RenderLoop

### Importing it:

```js
import {RenderLoop} from '@monokai/monomove';
```

The main responsibility of the render loop is to keep track of the time and triggering the tweens on each drawing frame of the browser. 

### Hook up your own render function

```js
function onTick(ms) {
	console.log(`elapsed milliseconds: ${ms}`);
}

RenderLoop.add(this, onTick);
```

### Remove it

```js
RenderLoop.remove(this, onTick);
```

### Remove all hooks on the `this` context

```js
RenderLoop.remove(this);
```



## delay

### Importing it:

```js
import {delay} from '@monokai/monomove';
```

A simple utility to wait a bit without relying on `setTimeout`;

### Wait for 3 seconds

```js
await delay(3);
```



## SmoothScroller

The Smooth Scroller lets you control DOM elements based on the scroll position in the browser

### Importing it:

```js
import {SmoothScroller} from '@monokai/monomove';
```

### Using it

```js
const smoothScroller = new SmoothScroller({
	scrollDuration: 1 // easing duration (default = 0)
});
```

### Scroll browser page to position 100 in 3 seconds

```js
smoothScroller.scrollTo(100, 3);
```

### Scroll browser page to element with 100px offset in 3 seconds

```js
smoothScroller.scrollToElement(document.getElementById('my-element'), 100, 3);
```

### Change opacity of multiple elements based on their individual position in the browser frame

```js
smoothScroller.add([...document.getElementsByClassName('block')], ({
	factor,
	item
}) => {
	item.style.opacity = 1 - ((factor - 0.5) * 2) ** 4;
});
```

The callback offers a couple of variables:

- `item`: the DOM element
- `box`: the position and dimensions of the item
- `rawFactor`: value indicating normalized scroll position: measures from the top of the item at the bottom of the browser page to the bottom of the item at the **top** of the browser page
- `rawBoxFactor`: value indicating normalized box scroll position: measures from the top of the item at the bottom of the browser page to the bottom of the item at the **bottom** of the browser page
- `factor`: `rawFactor` clamped to [0, 1]
- `boxFactor`: `rawBoxFactor` clamped to [0, 1] 
- `isInView`: boolean indicating if item is in view
- `boxIsInView`: boolean indicating if the box of the item is in view

### Destroying it

```js
smoothScroller.destroy();
```
