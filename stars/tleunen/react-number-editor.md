---
repo: tleunen/react-number-editor
url: 'https://github.com/tleunen/react-number-editor'
homepage: ''
starredAt: '2015-03-06T22:09:08Z'
createdAt: '2014-10-21T22:36:04Z'
updatedAt: '2023-10-25T12:56:01Z'
language: JavaScript
license: MIT
branch: master
stars: 70
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.463Z'
description: Custom number editor (text field) react component
tags: []
---

# react-number-editor

[![NPM](https://nodei.co/npm/react-number-editor.png)](https://nodei.co/npm/react-number-editor/)

![img](http://i.imgur.com/VIwMScb.gif)

A [react](https://github.com/facebook/react) component to easily use number inputs. This one acts like those in After Effects or similar software.

- Click and drag to slide the value.
- Double-click to enter manually a new value.
- Use your Up/Down keys to increment/decrement the value.
- Hold shift key to step by bigger value.
- Hold control/command key to step by smaller value.

## Example

```js
var React = require('react');
var NumberEditor = require('react-number-editor');

React.render(
    <NumberEditor min={0} max={1} step={0.01} decimals={2} onValueChange={onValueChange} />,
    document.body
);
```

## Usage

### `<NumberEditor />`

Here are the list of properties available for the component:

- `min` (number) the minimum value. Default no minimum
- `max` (number) the maximum value. Default no maximum
- `step` (number) the step to increment when sliding and with up/down arrows. Default 1.
- `stepModifier` (number) how much to multiply/divide with the modifier keys (shift and control/command). Default is 10.
- `decimals` (number) the number of decimals to show. Default 0.
- `initialValue` (number) the default value to show. Default 0.
- `className` (string) the class name to apply to the DOM element. Default empty.
- `onValueChange` (function) The callback when the value changes. The value is passed as the parameter.
-  onKeyDown (function) This callback is called when a key is pressed, after the control has processed the key press, and allows developers to implement their own shortcuts, etc.

## demo

To run the demo, executes this command and go to `http://localhost:8080`:
`npm run demo`

## License

MIT, see [LICENSE.md](/LICENSE.md) for details.

## Thanks

Thanks to [@mattdesl](https://github.com/mattdesl) for his work on [number-editor](https://github.com/mattdesl/number-editor).
