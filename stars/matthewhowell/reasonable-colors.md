---
repo: matthewhowell/reasonable-colors
url: 'https://github.com/matthewhowell/reasonable-colors'
homepage: 'https://www.reasonable.work/colors'
starredAt: '2022-06-07T18:39:58Z'
createdAt: '2020-09-02T03:13:30Z'
updatedAt: '2025-02-19T09:59:03Z'
language: CSS
license: MIT
branch: master
stars: 422
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:44.483Z'
description: >-
  Reasonable Colors is an open-source color system that makes it easy to build
  accessible, nice-looking color palettes.
tags: []
---

# Reasonable Colors
Reasonable Colors is an open-source color system that makes it easy to build accessible, nice-looking color palettes.

Format for CSS variables: --color-COLORNAME-SHADE

Available values for COLORNAME:
	gray,
	rose, raspberry, red, orange, cinnamon, amber, yellow, lime,
	chartreuse, green, emerald, aquamarine, teal, cyan, powder, sky
	cerulean, azure, blue, indigo, violet, purple, magenta, pink

Available values for SHADE:
	1, 2, 3, 4, 5, 6

Minimum contrast can be inferred by the difference between two SHADE numbers

- Difference of 2: (3:1)
- Difference of 3: (4.5:1)
- Difference of 4: (7:1)

reasonable-colors.css uses hex values. HSL, LCH, and RGB color spaces are available.

For .scss friendly variable declarations, FILENAME.scss for each color space are provided.

More information available at: https://www.reasonable.work/colors 
