---
repo: lmgonzalves/segment
url: 'https://github.com/lmgonzalves/segment'
homepage: 'http://lmgonzalves.github.io/segment'
starredAt: '2015-11-13T17:40:25Z'
createdAt: '2015-10-24T02:01:10Z'
updatedAt: '2025-02-04T21:22:52Z'
language: CSS
license: MIT
branch: gh-pages
stars: 1740
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:35.888Z'
description: A JavaScript library to draw and animate SVG path strokes
tags: []
---

# Segment

A JavaScript library to draw and animate SVG path strokes.

See the [DEMO](http://lmgonzalves.github.io/segment).

Read [this article](http://lmgonzalves.github.io/2015/10/26/animating-svg-path-segments/) to understand how it works.

## Basic usage

**HTML**

Add the segment script, and define a `path` somewhere.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/segment-js/1.1.3/segment.js"></script>

<svg>
  <path id="my-path" ...>
</svg>
```

**JavaScript**

Initialize a new `Segment` with the `path`. Then draw a segment of stroke every time you want with: `.draw(begin, end, duration, options)`.

```js
var myPath = document.getElementById("my-path"),
    segment = new Segment(myPath);

segment.draw("25%", "75% - 10", 1);
```

## Install with NPM

```
npm install segment-js
```

## Constructor

The `Segment` constructor asks for 4 parameters:

- path: DOM element to draw.
- begin (optional, default `0`): Length to start drawing the stroke.
- end (optional, default `100%`): Length to finish drawing the stroke.
- circular (optional, default `false`): Allow `begin` and `end` values less than 0 and greater than 100%.

## Method `draw(begin, end, duration, options)`

| Name       | Type     | Default | Description |
|------------|----------|---------|-------------|
|`begin`     | string   | 0       | Path length to start drawing. |
|`end`       | string   | 100%    | Path length to finish drawing. |
|`duration`  | float    | 0       | Duration (in seconds) of the animation. |
|`options`   | object   | null    | Options for animation in object notation. |

Note that `begin` and `end` can be negative values and can be written in any of these ways:

- floatValue
- percent
- percent + floatValue
- percent - floatValue

### All possible `options` for `draw` method

| Name       | Type     | Default | Description |
|------------|----------|---------|-------------|
|`delay`     | float    | 0       | Waiting time (in seconds) to start drawing. |
|`easing`    | function | linear  | Easing function (normalized). I highly recommend [d3-ease](https://github.com/d3/d3-ease). |
|`circular`  | boolean  | false   | If `true`, when the stroke reaches the end of the path it will resume at the beginning. The same applies in the opposite direction. |
|`callback`  | function | null    | Function to call when the animation is done. |

**Example**

```js
function cubicIn(t) {
    return t * t * t;
}

function done() {
    alert("Done!");
}

segment.draw("-25%", "75% - 10", 1, {delay: 0.5, easing: cubicIn, circular: true, callback: done});
```

## Animating with another library

It's possible to animate the path stroke using another JavaScript library, like [GSAP](http://greensock.com/gsap). `Segments` offers a method called `strokeDasharray` that is useful for this issue.
Here is an example using TweenLite (with CSSPlugin).

```js
TweenLite.to(path, 1, { strokeDasharray: segment.strokeDasharray(begin, end) });
```
