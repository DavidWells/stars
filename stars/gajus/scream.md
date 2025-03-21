---
repo: gajus/scream
url: 'https://github.com/gajus/scream'
homepage: ''
starredAt: '2020-05-11T21:52:38Z'
createdAt: '2014-11-09T17:43:47Z'
updatedAt: '2025-01-23T20:41:06Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 291
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:53.272Z'
description: >-
  Dynamic viewport management for mobile. Manage viewport in different states of
  device orientation. Scale document to fit viewport. Calculate the dimensions
  of the "minimal" iOS 8 view relative to your viewport width.
tags: []
---

# Scream

[![NPM version](http://img.shields.io/npm/v/scream.svg?style=flat-square)](https://www.npmjs.org/package/scream)

Dynamic viewport management for mobile.

* Manage `viewport` in different states of device orientation.
* Scale document to fit viewport.
* Calculate the dimensions of the "minimal" iOS 8 view relative to your viewport width.

![Demonstration using iOS simulator](./.README/demonstration.gif)

## Contents

* [Scream](#scream)
    * [Contents](#scream-contents)
    * [Managing the Viewport](#scream-managing-the-viewport)
        * [Configuration](#scream-managing-the-viewport-configuration)
    * [Events](#scream-events)
        * [Orientation Change](#scream-events-orientation-change)
        * [View Change](#scream-events-view-change)
        * [Unregister the event](#unregister-the-event)
    * [Screen](#scream-screen)
    * [Viewport](#scream-viewport)
    * [Minimal View](#scream-minimal-view)
    * [Download](#scream-download)

## Managing the Viewport

Configure management and dimensions of the viewport at the time of the initialization:

```js
import Scream from 'scream';

const scream = Scream({
    viewport: true,
    width: {
        portrait: screen.width,
        landscape: screen.height
    }
});
```

If enabled, scream generates the `viewport` meta tag to reflect the present orientation and in response to the [`orientationchangeend`](https://github.com/gajus/orientationchangeend) event.

```html
<meta name="viewport" content="width={width},initial-scale={scale},minimum-scale={scale},maximum-scale={scale},user-scale=0">
```

* `{width}` the width set in the configuration for the current orientation.
* `{scale}` calculated scale needed to fit the document in the screen.

### Configuration

| Name | Description | Default |
| --- | --- | --- |
| `viewport` | Manage the viewport of the page. | `true` |
| `width.portrait` | Viewport width in the portrait orientation. | `screen.width` (`device-width`) |
| `width.landscape` | Viewport width in the landscape orientation. | `screen.width` (`device-width`) |

### Safe Area Insert

With the introduction of devices with a notch, there is now the concept of `viewport-fit=cover` and `safe-area-inset` as explained here:

https://webkit.org/blog/7929/designing-websites-for-iphone-x/

This adds additional complexity as applying the viewport width needed for the minimal view calculation can cause content to clash with the notch in landscape mode. It is possible to calculate the padding required to prevent this clash in JavaScript but this only works if `viewport-fit=cover` is set and this may have an undesirable effect on the layout of the page.

Scream attempts to calculate the notch padding by first adding `viewport-fit=cover` to the viewport and then replacing it with the width of the safe area. This works well in most cases but may be undesirable if the notch has already been taken into account in the page design. In this case, it is recommended to manage the viewport tag manually by setting `viewport: false` and applying the relevant `safe-area-inset` padding with CSS.

## Events

### Orientation Change

> The `orientationchangeend` event is fired when the orientation of the device has changed and the associated rotation animation has been complete.

– https://github.com/gajus/orientationchangeend

This is proxy for your convenience to perform operations that must follow the change of the device orientation and in the context of updated viewport tag. This is required when determining the view state.

```js
scream.on('orientationchangeend', () => {
    // Invoked after the orientation change and the associated animation (iOS) has been completed.
});
```

### View Change

Invoked on page load and when view changes.

```js
scream.on('viewchange', (e) => {
    // @var {String} 'full', 'minimal'
    e.viewName;
});
```

### Unregister the event

The `on` method returns a `listener` object that you can use to unregister your event handler calling the method `off`.

```js
const listener = scream.on('viewchange', (e) => { /* your code */ });

// to unregister:

scream.off(listener);
```

## Screen

```js
/**
 * @return {String} portrait|landscape
 */
scream.getOrientation();

/**
 * Screen width relative to the device orientation.
 *
 * @return {Number}
 */
scream.getScreenWidth();

/**
 * Screen width relative to the device orientation.
 *
 * @return {Number}
 */
scream.getScreenHeight();

/**
 * Returns padding needed to prevent content from clashing with notch.
 *
 * @return {Number}
 */
scream.getNotchPadding();
```

## Viewport

```js
/**
 * Viewport width relative to the device orientation.
 *
 * @return {Number}
 */
scream.getViewportWidth();

/**
 * Viewport height relative to the device orientation and to scale with the viewport width.
 *
 * @return {Number}
 */
scream.getViewportHeight();

/**
 * The ratio between screen width and viewport width.
 *
 * @return {Number}
 */
scream.getScale();
```

## Minimal View

This functionality is iOS 8 specific. It has been developed as part of [Brim](https://github.com/gajus/brim) to bring back the minimal-ui.

```js
/**
 * Returns dimensions of the usable viewport in the minimal view relative to the current viewport width and orientation.
 *
 * @return {Object} dimensions
 * @return {Number} dimensions.width
 * @return {Number} dimensions.height
 */
scream.getMinimalViewSize();

/**
 * Returns true if screen is in "minimal" UI.
 *
 * iOS 8 has removed the minimal-ui viewport property.
 * Nevertheless, user can enter minimal-ui using touch-drag-down gesture.
 * This method is used to detect if user is in minimal-ui view.
 *
 * In case of orientation change, the state of the view can be accurately
 * determined only after orientationchangeend event.
 *
 * @return {Boolean}
 */
scream.isMinimalView();
```

## Download

Using [NPM](https://www.npmjs.org/):

```sh
npm install scream
```
