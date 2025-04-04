---
repo: WebReflection/p-cool
url: 'https://github.com/WebReflection/p-cool'
homepage: null
starredAt: '2021-08-08T17:23:16Z'
createdAt: '2021-08-05T08:42:03Z'
updatedAt: '2024-09-02T13:18:01Z'
language: JavaScript
license: ISC
branch: main
stars: 37
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:48.688Z'
description: Pretty Cool Elements
tags: []
---

# Pretty Cool Elements

<sup>**Social Media Photo by [Jamison McAndie](https://unsplash.com/@jamomca) on [Unsplash](https://unsplash.com/)**</sup>


This module is a follow up of [this Medium post](https://webreflection.medium.com/about-web-components-cc3e8b4035b0), and it provides element mixins/behaviors, through class names, without names clashing.


### Features

  * it addresses every single point touched in the Medium's post:
    * no name clashing
    * multiple mixins/behaviors attached/detached at any time
    * native Custom Elements builtin callbacks, associated to mixins/behaviors
  * it's **S**erver **S**ide **R**endering compatible out of the box
  * it uses all the DOM primitives without needing an extra attribute (bloat-free layouts)
  * it's semantically bound with element's view (their classes and their dedicated style)
  * it's graceful enchancement out of the box, based on builtin extends
  * it provides a robust polyfilled version through [vanilla-elements](https://github.com/WebReflection/vanilla-elements#readme)


#### Example

```js
import {define} from 'p-cool';

define('my-div', {

  // to know when a behavior is attached or detached via class
  attachedCallback(element) {},
  detachedCallback(element) {}, // see ## About Callbacks

  // to observe connected/disconnected lifecycle
  connectedCallback(element) {},
  disconnectedCallback(element) {},

  // to observe specific attributes (omit to observe them all)
  observedAttributes: ['some-attribute'],

  // to know when observed attributes changed
  attributeChangedCallback(element, name, oldValue, newValue) {},
});
```

```html
<div is="p-cool-div" class="my-div" some-attribute="ok">
  Hello Behaviors 👋
</div>
```

## About PCool

With native Custom Elements, we need to reserve a single name in a shared global registry to pass through the upgrade, and callbacks, mechanism.

With `p-cool` elements, the registry is pre-populated with [vanilla-elements](https://github.com/WebReflection/vanilla-elements#readme) extends through a `p-cool-*` prefix, so that `<div is="p-cool-div">`, and `<p is="p-cool-p">`, or `<main is="p-cool-main">` are all valid, already registered, builtin extends, that brings mixins/behaviors to any element, and through their class name, as long as one, or mixin, is defined/attached, through the `define(name, mixin)` module's export.

```html
<!doctype html>
<script type="module">
import {define} from '//unpkg.com/p-cool';

import Hero from './mixins/hero.js';
define('hero', Hero);

import Bottom from './mixins/bottom.js';
import AutoHide from './mixins/auto-hide.js';
define('bottom', Bottom);
define('auto-hide', AutoHide);
</script>
<style>
main { /* ... */ }
.hero { /* ... */ }
.bottom { /* ... */ }
</style>
<body is="p-cool-body" class="hero">
  <main>Hero</main>
  <footer is="p-cool-footer" class="bottom auto-hide">
    ...
  </footer>
</body>
```

To implement an *element extend*, the `<p-cool>` *Custom Element* is registered too, so that a page could be defined by non-builtin extends, with mixins/behaviors attached when, and if, needed.

```html
<!doctype html>
<script type="module">
import {define} from '//unpkg.com/p-cool';

import Hero from './mixins/hero.js';
define('hero', Hero);

import Bottom from './mixins/bottom.js';
import AutoHide from './mixins/auto-hide.js';
define('bottom', Bottom);
define('auto-hide', AutoHide);
</script>
<body>
  <p-cool class="hero"></p-cool>
  <p-cool class="bottom auto-hide">
    ...
  </p-cool>
</body>
```


## About Callbacks

<details>
  <summary><strong>attachedCallback</strong></summary>
  <div>

This callback is granted to be invoked only *once*, and *before* any other callback, whenever a mixin/behavior is attached through the element's class, somehow simulating what a `constructor` would do with Custom Elements.

This callback is ideal to add related event listeners, setup an element for the specific mixin/behavior, and so on.

Please note that if a mixin/behavior is detached, and then re-attached, this callback *will* be invoked again.

  </div>
</details>

<details>
  <summary><strong>attributeChangedCallback</strong></summary>
  <div>

If any `observedAttributes` is specified, or if there is an `attributeChangedCallback`, this is invoked every time observed attributes change.

Like it is for *Custom Elements*, this callback is invoked, after a mixin/behavior is attached, hence *after* `attachedCallback`, but *before* `connectedCallback`.

This callback is also invoked during the element lifecycle, whenever observed attributes change, providing the `oldValue` and the `newValue`.

Both values are `null` if there was not attribute, or if the attribute got removed, replicating the native *Custom Element* behavior.

  </div>
</details>

<details>
  <summary><strong>connectedCallback</strong></summary>
  <div>

This callback is granted to be invoked *after* an element gets a new mixin/behavior, if the element is already live, and every other time the element gets moved or re-appended on the DOM, exactly like it is for native *Custom Elements*.

Please note that when a mixin/behavior is attached, and there are observed attributes, this callback will be invoked *after* `attributeChangedCallback`.

  </div>
</details>

<details>
  <summary><strong>disconnectedCallback</strong></summary>
  <div>

This callback is granted to be invoked when an element gets removed from the DOM, and it would never trigger if the `connectedCallback` didn't happen already.

Both callbacks are the ideal place to attach, on *connected*, and remove, on *disconnected*, timers, animations, or idle related callbacks, as even when elements get trashed, both callbacks are granted to be executed, and in the right order of events.

  </div>
</details>

<details>
  <summary><strong>detachedCallback</strong></summary>
  <div>

This callback is **not granted to be invoked** if an element get trashed, but it's granted to be invoked *after* `disconnectedCallback`, if a mixin/behavior is removed from an element.

Please note that this callback is *not* really useful for elements that might be, or may not be, trashed, because there is no way to use a *FinalizationRegistry* and pass along the `element`, but it's very hando for those elements that never leave the DOM, but might change, over time, their classes, hence their mixins/behaviors.

```js
import {define} from 'p-cool';

define('mixin', {
  attachedCallback(element) {
    console.log('mixin attached');
  },
  detachedCallback(element) {
    console.log('mixin detached');
  }
});

// example
document.body.innerHTML = `
  <div id="first" class="mixin">First</div>
  <div id="second" class="mixin">Second</div>
`;
// logs "mixin attached" twice

// will **not** "mixin detached"
first.remove();

// it **will** log "mixin detached"
second.classList.remove('mixin');
```

  </div>
</details>

## About Exports

This module offers the following exports:

  * `p-cool` with a `define(name, mixin)` export that *does not polyfill Safari*
  * `p-cool/min` with a minified `define(name, mixin)` export that *does not polyfill Safari*
  * `p-cool/poly` with a minified `define(name, mixin)` export that also *does polyfill Safari*
  * `p-cool/behaviors` with the internally used `define` and `behaviors` exports, plus constants, useful to potentially create other libraries or utilities on top of the same logic

The `https://unpkg.com/p-cool` points at the minified `/poly` variant, useful to quickly test, or develop, with this module.


## Compatibility

Every ES2015+ compatible browser out of the box, including Safari/WebKit based browsers in the *poly* version.
