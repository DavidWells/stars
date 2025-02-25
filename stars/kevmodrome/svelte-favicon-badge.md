---
repo: kevmodrome/svelte-favicon-badge
url: 'https://github.com/kevmodrome/svelte-favicon-badge'
homepage: null
starredAt: '2020-03-28T01:26:25Z'
createdAt: '2020-03-25T18:55:07Z'
updatedAt: '2024-10-21T14:23:58Z'
language: JavaScript
license: NA
branch: master
stars: 101
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:00.556Z'
description: >-
  A custom component that adds a favicon and a badge that you can use to show
  for example number of unread messages
tags: []
---

# svelte-favicon-badge

A custom component that adds a favicon and a badge that you can use to show for example number of unread messages, etc.

## Example

<p align="center">


<img src="./screenshot.gif" alt="Screenshot"/>

</p>

## Quick Start

Install via `npm i svelte-favicon-badge` and simply import the component and add it to your markup. It's probably a good idea to only use one per page/route since there could be conflicts.
The options are: `count` `background` `color` and `href`

```html
<script>
	import Badge from "svelte-favicon-badge";
	let count = 0;
	let background = "#FF0000";
	let color = "#FFFFFF";
</script>

<Badge {count} {color} {background} href="favicon.png" />
```

## Browser Support

Should support all modern browsers except Safari. Not tested in IE but is assumed not to work.
