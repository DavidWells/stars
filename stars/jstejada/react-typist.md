---
repo: jstejada/react-typist
url: 'https://github.com/jstejada/react-typist'
homepage: 'https://jstejada.github.io/react-typist/'
starredAt: '2015-10-19T02:06:56Z'
createdAt: '2015-10-03T18:33:09Z'
updatedAt: '2025-02-15T17:01:07Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 1405
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:36.438Z'
description: Typing animations with React
tags:
  - animations
  - react
  - reactjs
  - typing
  - typing-animation
  - typist
---

# React Typist [![npm](https://img.shields.io/npm/dm/react-typist.svg)]() [![npm](https://img.shields.io/npm/v/react-typist.svg)]()
React Component for making typing animations. Wrap `Typist` around your text or any
element tree to animate text inside the tree. Easily stylable and highly
configurable.


## Install
```shell
npm install react-typist --save
```


## Live Example
* <a href="//jstejada.github.io/react-typist" target="_blank">Basic example</a>


## Basic Usage
#### CommonJS Module (using webpack or browserify):
```jsx
import React, {Component} from 'react';
import Typist from 'react-typist';

export default class MyComponent extends Component {

  render() {
    return (
      <Typist>
        Animate this text.
      </Typist>
    );
  }
}
```

#### UMD module:
Include `dist/standalone/Typist.js` into your build, using whatever build tool
or manually entering a `<script>` tag.

<a name="cssBlink"></a>
#### CSS
Typist contains a simple CSS file to make the cursor at the end of the text
blink. To include it, you must include
[`dist/Typist.css`](https://github.com/jstejada/react-typist/blob/69445a87314b52454f050045961ac32090739726/dist/Typist.css) in your build.

## Dynamic content usage
Provide a unique `key` prop to `Typist` so that it would re-render every time your dynamic content is changed like that:
```
import React, { useState } from "react";
import Typist from "react-typist";

export default const DynamicTypist = () => {
  const texts = ["first text", "second text", "third text"];
  const [currentTextCounter, setCurrentTextCounter] = useState(0);

  return <div onClick={() => if (currentTextCounter < texts.length - 1) { setCurrentTextCounter(currentTextCounter + 1) }}>
    <Typist key={currentTextCounter}>
      {texts[currentTextCounter]}
    </Typist>
  </div>
}
```

Otherwise your dynamic content **won't** be reflected and re-typed.

## Children
Typist will animate any text present in its descendents. Each text
node will be animated as it is encountered in depth-first traversal of the
`children` tree, one after the other.

Typist can take as `children` any valid node that can be rendered in a React
application, i.e. it could be undefined, null, a boolean, a number, a string,
a React element, or an array of any of those types recursively.

This also implies that you are free to pass any props to the `children` of Typist,
including your own css classes (as in any React application). This allows you to
easily style your text inside Typist:

```jsx
<Typist>
  <span className="my-custom-class"> First Sentence </span>
  <br />
  <div className="container">
    <p> This will be animated after first sentence is complete </p>
    <MyComponent prop1="val1"> More text. </MyComponent>
  </div>
  Final sentence
</Typist>
```

Refer to [`examples/`](/examples) for more examples.


## Typist.Delay
In order to insert delays into your animation, you can use the `Typist.Delay`
Component:

```jsx
<Typist>
  <p> First Sentence </p>
  <Typist.Delay ms={500} />
  <br />
  This won't be animated until 500ms after the first sentenced is rendered
</Typist>
```

Refer to [`examples/`](/examples) for more examples.

### Typist.Delay Props
* [`ms`](#ms)

<a name="ms"></a>
#### ms
*Required*

Milliseconds to apply for the delay


## Typist.Backspace

Typist also supports backspace animations via the `Typist.Backspace` Component:

```jsx
<Typist>
  <span> First Sentence </span>
  <Typist.Backspace count={8} delay={200} />
  <span> Phrase </span>
</Typist>
```

Refer to [`examples/`](/examples) for more examples.

### Typist.Backspace Props
* [`count`](#count)
* [`delay`](#delay)

<a name="count"></a>
#### count
*Default*: `1`

Number of characters to backspace

<a name="delay"></a>
#### delay
*Default*: `0`

Delay in milliseconds before the backspace animation starts


## Typist Props
* [`className`](#className)
* [`avgTypingDelay`](#avgTypingDelay)
* [`stdTypingDelay`](#stdTypingDelay)
* [`startDelay`](#startDelay)
* [`cursor`](#cursor)
* [`onCharacterTyped`](#onCharacterTyped)
* [`onLineTyped`](#onLineTyped)
* [`onTypingDone`](#onTypingDone)
* [`delayGenerator`](#delayGenerator)

<a name="className"></a>
#### className
*Default*: `null`

CSS class name to be applied to the Typist root node. Typist will always
have the CSS class `Typist` applied to it.

```jsx
<Typist className="MyTypist"> Animate this text. </Typist>
```
 will produce:
```jsx
<div class="Typist MyTypist"> Animate this text. </div>
```

<a name="avgTypingDelay"></a>
#### avgTypingDelay
*Default*: `70`

Average typing delay in milliseconds between every keystroke of the typing
animation **(Less is faster)**. The distribution of the typing delays between
strokes is not uniform, to make the animation more human like.

<a name="stdTypingDelay"></a>
#### stdTypingDelay
*Default*: `25`

Standard deviation of typing delay between keystrokes of the typing animation.
**(Less means more uniform, i.e. less variance between values)**.

<a name="startDelay"></a>
#### startDelay
*Default*: `0`

Milliseconds before typing animation begins.

<a name="cursor"></a>
#### cursor
*Default*:
```js
{
  show: true,
  blink: true,
  element: '|',
  hideWhenDone: false,
  hideWhenDoneDelay: 1000,
}
```

Object containing options for cursor:

* `show (bool)`: whether to display cursor at the end of text.
* `blink (bool)`: whether to add blinking animation to cursor. You must also
include the [css](#cssBlink)
* `element (string)`: character to use for the cursor
* `hideWhenDone (bool)`: whether the cursor should be hidden after typing
animation is complete.
* `hideWhenDoneDelay (int)`: delay in ms to be applied before hiding cursor when
typing animation is complete.

<a name="onCharacterTyped"></a>
#### onCharacterTyped
Function to be called every time a character is typed on the screen.

```js
function(character, charIdx) {
  ...
}
```

<a name="onLineTyped"></a>
#### onLineTyped
Function to be called every time a line is typed on the screen.

```js
function(line, lineIdx) {
  ...
}
```

<a name="onTypingDone"></a>
#### onTypingDone
Function to be called when typing animation is complete.

<a name="delayGenerator"></a>
#### delayGenerator
*Default*: [`gaussianDistribution`][normal-dist]

Function to be called to generate the typing delay (in ms) for every keystroke
of the animation. Every time this function is called it should return a value
in milliseconds. This function can be used to provide your own typing delay
distribution, for example uniform (e.g. always 100ms), or a deterministic
distribution.

However, if you wish to insert delays at specific points in the animation,
consider using the [`Delay`](#typistdelay) Component instead.

```js
function(mean, std, current = {line, lineIdx, character, charIdx, defDelayGenerator}) {
  ...
}
```

* `mean (number)`: Average typing delay. Will be the value of [`props.avgTypingDelay`](#avgTypingDelay)
* `std (number)`: Standard deviation of typing delay. Will be the value of [`props.stdTypingDelay`](#stdTypingDelay)
* `current.line (string)`: Value of line of text (Typist child) currently being animated.
* `current.lineIdx (int)`: Index of line of text (Typist child) currently being animated.
* `current.character (string)`: Value of character that was just rendered.
* `current.charIdx (int)`: Index of character that was just rendered.
* `current.defDelayGenerator (function)`: Reference to default delay
generator function to be able to fall back to.


This function can also be used to introduce delays at specific points in the
typing animation.

e.g.:
```js
function(mean, std, {line, lineIdx, charIdx, defDelayGenerator}) {
  // Delay the animation for 2 seconds at the last character of the first line
  if (lineIdx === 0 && charIdx === line.length - 1) {
    return 2000;
  }
  return defDelayGenerator();
}
```


## Troubleshooting
### Internet Explorer Compatibility
React Typist makes use of Array.from() which is not supported in IE.

`SCRIPT438: Object doesn't support property or method 'from' Typist.js (449,1)`

To resolve this, [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) can be added to your project.

 ```shell
 npm install --save babel-polyfill
 ```

You can now include this module in your app at the entry point.

ES6:
```js
import 'babel-polyfill'
```

CommonJS:
```js
require('babel-polyfill')
```

## Development

To build the examples and start the dev server, run:
```shell
npm start
```
Now, open `http://localhost:8080` and start hacking!


If you just want to build the examples, run:
```shell
npm run examples
```


## Running Tests

```shell
npm test
```


## License

[MIT](http://mit-license.org)

[normal-dist]: https://en.wikipedia.org/wiki/Normal_distribution
