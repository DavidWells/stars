---
repo: sindresorhus/css-extras
url: 'https://github.com/sindresorhus/css-extras'
homepage: ''
starredAt: '2025-10-09T22:28:02Z'
createdAt: '2025-10-05T05:05:37Z'
updatedAt: '2025-10-18T22:04:01Z'
language: CSS
license: CC0-1.0
branch: main
stars: 664
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-10-18T22:29:47.524Z'
description: Useful CSS custom functions using the new @​function rule
tags: []
---

# css-extras

> A collection of useful CSS custom functions

A comprehensive collection of CSS custom functions that leverage the new native CSS [`@function`](https://www.w3.org/TR/css-mixins-1/) rule.

No build step required! Feel free to copy-paste what you need. No credit needed.

> [!CAUTION]
> Work in progress.

## Requirements

Currently only supported in Chrome 141+. The `@function` rule is going through the W3C standardization process and will be available in other browsers soon.

## Install

```sh
npm install css-extras
```

## Usage

```css
@import 'css-extras';
```

Or link directly in HTML:

```html
<link rel="stylesheet" href="node_modules/css-extras/index.css">
```

Then use any of the functions in your CSS:

```css
.element {
	/* Math functions */
	padding: --negate(var(--spacing));
	margin: --abs(-20px);

	/* Color functions */
	background: --opacity(blue, 50%);
	border-color: --tint(var(--primary-color), 20%);

	/* Typography */
	font-size: --fluid-type(16px, 24px);

	/* Layout */
	border-radius: --conditional-radius(1rem);

	/* And many more! */
}
```

[**Demo**](https://sindresorhus.com/css-extras/example.html) *(requires Chrome 141+)*

## Functions

This package includes ~50 CSS custom functions organized into these categories:

- **Math & Number** - Mathematical operations and calculations
- **Color** - Color manipulation, generation, and accessibility helpers
- **Typography** - Fluid type scaling and line height
- **Layout** - Responsive layouts and aspect ratios
- **Spacing** - Consistent spacing systems
- **Animation** - Easing functions
- **Grid** - Responsive grid helpers
- **Filter** - Shadows and effects
- **Theme** - Light/dark mode utilities
- **Utility** - Unit conversion and helpers

**[Complete function reference](docs/functions.md)**

## Examples

### Responsive card component

```css
.card {
	/* Conditional border radius */
	border-radius: --conditional-radius(1rem);

	/* Smooth shadow */
	box-shadow: --smooth-shadow(rgb(0 0 0 / 0.2), 16px, 3);

	/* Fluid spacing */
	padding: --spacing(4);
	margin-block: --spacing(3);

	/* Theme-aware background */
	background: --theme-color(var(--card-bg), 95%, 10%);

	/* Fluid typography */
	font-size: --fluid-type(14px, 16px, 320px, 1280px);
}

.card-title {
	font-size: --modular-scale(1rem, 1.25, 2);
	color: --shade(var(--primary-color), 20%);
}

.card:hover {
	transform: translateY(--negate(4px));
	box-shadow: --glow(var(--primary-color), 20px, 0.3);
}
```

### Responsive layout

```css
.layout {
	display: grid;
	grid-template-columns: --sidebar-layout(280px, 50ch);
	gap: --spacing(4);
	padding: --container-padding(2rem, 1400px);
}

.content-grid {
	display: grid;
	grid-template-columns: --auto-grid(300px, 3);
	gap: --spacing(3);
}

.responsive-element {
	padding: --responsive-value(1rem, 2.5rem, 320px, 1200px);
	font-size: --responsive-value(14px, 18px, 320px, 1200px);
}
```

### Theme-aware components

**IMPORTANT:** Theme functions require `color-scheme: light dark` to work:

```css
:root {
	color-scheme: light dark; /* Required! */
}

.button {
	/* Theme-aware values (works with ANY value type!) */
	color: --light-dark(black, white);
	background: --theme-color(var(--brand-color), 90%, 20%);
	border-color: --light-dark(#d1d5db, #374151);

	/* Works with non-color values too */
	padding: --light-dark(0.5rem 1rem, 0.75rem 1.5rem);
	font-weight: --light-dark(500, 400);
	background-image: --light-dark(url(icon-light.svg), url(icon-dark.svg));
}
```

## Browser support

Check [caniuse.com](https://caniuse.com/?search=%40function).

## Related

- [sass-extras](https://github.com/sindresorhus/sass-extras) - Useful utilities for working with Sass
- [modern-normalize](https://github.com/sindresorhus/modern-normalize) - Normalize browsers' default style

## License

- [MIT](license-mit)
- [CC0-1.0](license-cc0)

SPDX-License-Identifier: (MIT OR CC0-1.0)
