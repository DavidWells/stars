---
repo: deseretdigital-ui/react-breakpoints-mixin
url: 'https://github.com/deseretdigital-ui/react-breakpoints-mixin'
homepage: 'http://ui.deseretdigital.com/react-breakpoints-mixin/'
starredAt: '2015-03-10T17:05:26Z'
createdAt: '2015-01-07T23:47:56Z'
updatedAt: '2016-10-21T18:57:03Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.329Z'
description: BreakpointsMixin for your React Components.
tags: []
---

# React Breakpoints Mixin

BreakpointsMixin for your React Components.


## Example

See the working [example page](http://ui.deseretdigital.com/react-breakpoints-mixin/).


## Install

The package is available through npm and also bower.

### npm

```shell
npm install --save react-breakpoints-mixin
```


### bower

```shell
bower install --save react-breakpoints-mixin
```


## Import

The `BreakpointsMixin` module is packaged in the [UMD][GoogleUMD] format, which
means you can bring it in as a [CommonJS][GoogleCommonJS] module using `require`,
or as a [global variable][GoogleGlobalVariable] using a `<script>` tag.

[GoogleUMD]: https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=javascript%20umd
[GoogleCommonJS]: https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=commonjs+module
[GoogleGlobalVariable]: https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=why%20javascript%20global%20variables%20are%20bad

### CommonJS

```javascript
var BreakpointsMixin = require('react-breakpoints-mixin').BreakpointsMixin;
```

The export has a `BreakpointsMixin` property which you can assign to a variable.


### Global Variable

```javascript
  <script src="bower_components/react-breakpoints-mixin/dist/react-breakpoints-mixin.js"></script>
```

The script exposes a `BreakpointsMixin` global variable.


## Use

Once you have imported the `BreakpointsMixin` variable, you need to ...

1. Add it to your fancy component's list of mixins.
2. Define breakpoints for width and/or height.
3. Generate css classes using the provided `this.breakpointsClasses()` method.

```jsx
var FancyComponent = React.createClass({

  mixins: [ BreakpointsMixin ], /* [1] */

  breakpoints: { /* [2] */
    width: {
      "small": [0, 400],
      "medium": [400, 600],
      "large": [600, Infinity]
    },
    height: {
      "short": [0, 100],
      "medium": [100, 200],
      "long": [200, Infinity]
    }
  },

  render: function () {
    <div className={this.getClasses()}>Hello World</div>
  },

  getClasses: function () {
    return React.addons.classSet(this.breakpointsClasses('fancy-component')); /* [3] */
  }

});
```

---
__NOTE__: To use `React.addons.classSet` you will need to include [react with
addons](http://facebook.github.io/react/docs/addons.html).
___


### Defining Breakpoints

Breakpoints are defined by adding a `breakpoints` property to your component.

The `breakpoints` property is an object whose keys are element properties that
the breakpoints are evaluated against. Only `width` and `height` are supported.

Under each property is another object, whose keys are the user-defined names for
the breakpoints and the value is the breakpoint range, an array with two integer
values representing the min and max of the breakpoint.

To avoid having to subtract one pixel between breakpoints, the max is not
included in range comparisons during breakpoint evaluation. The comparison to
see if a breakpoint matches effectively looks like this:

```javascript
min <= width && width < max
```

---
__NOTE__: We have deemed overlapping breakpoints to be a thing of naught. A
warning will be output to the console if overlapping breakpoints are detected.
___


## Reference

### `BreakpointsMixin`

Type: Object

The main module, a mixin for use with React.


### `this.breakpointsClasses( className )`

Type: Method

Params:

+ className, Type: String

Return Type: Object

Generates [BEM][BEMSyntax] modifier classes for each matched breakpoint. Returns
an object to be passed to `React.addons.classSet`.

[BEMSyntax]: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

This method satisfies the typical use case of applying styles based on the
element's dimensions through the use of modifier classes.

These classes follow the format of:

```
{className}--{property}-{name}
```

Where `className` is passed in as argument, `property` is the property the
breakpoint is defined against (`width`, `height`), and `name` is the name defined
in the breakpoints definition on your component.

For example, given the following breakpoints:

```javascript
  breakpoints: {
    width: {
      "small": [0, 400],
      "medium": [400, 600],
      "large": [600, Infinity]
    },
    height: {
      "short": [0, 100],
      "medium": [100, 200],
      "long": [200, Infinity]
    }
  },
```

Calling `this.breakpointsClasses('responsive-colors')`, with the element width
equal to 300 pixels, and the element height equal to 50 pixels, would return
something like:

```javascript
{
  "responsive-colors": true,
  "responsive-colors--width-medium": true,
  "responsive-colors--height-short": true
}
```


### `this.breakpointMatched( property, name )`

Type: Method

Params:

+ property, Type: String
+ name, Type: String

Return Type: Bool

Checks to see if a defined breakpoint has been matched. Returns a boolean.

When modifier classes are insufficient, this method can be used, typically in
the render method, or the render process, to check if a breakpoint is matched.
Use this method sparingly. For most cases modifier classes should be enough.

For example, to check if a breakpoint on `width` named `small` is matched, call
the method like so:

```javascript
  var matched = this.breakpointMatched('width', 'small');
```


### `this.breakpointsEvaluate()`

Type: Method

Evaluates breakpoints. Called in `componentDidMount` and on window resize.

This method can also be called on the component to force evaluation of
breakpoints in a scenario where the element dimensions may have changed, but the
component has already been mounted and the window is not resized. An example of
this scenario could be a user interface with resizeable panels.

This method compares the element properties (width or height) with the
corresponding breakpoints and records the matched breakpoints in the component
state, which results in another component render.

---
__NOTE__: Consider the breakpoints state private and read only. Use
`this.breakpointsClasses(className)` or `this.breakpointMatched(property, name)`
to glean information about state.

__NOTE__: There are a few techniques for detecting resize on elements,
independent of window resize, such as listening to `scroll` event on a nested
div, or `resize` in an invisible `<iframe>`, but we found they impact
performance to an unacceptable degree, especially on pages that have many
components using the BreakpointsMixin. We settled with evaluating breakpoints
only in `componentDidMount` and on window resize and exposing
`this.breakpointsEvaluate()` for those rare cases it is needed.
___
