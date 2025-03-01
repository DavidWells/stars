---
repo: sindresorhus/devtools-detect
url: 'https://github.com/sindresorhus/devtools-detect'
homepage: 'https://sindresorhus.com/devtools-detect'
starredAt: '2022-01-02T21:49:58Z'
createdAt: '2013-07-02T13:11:08Z'
updatedAt: '2025-02-24T02:55:48Z'
language: HTML
license: MIT
branch: main
stars: 2089
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.687Z'
description: Detect if DevTools is open and its orientation
tags: []
---

# devtools-detect

> Detect if DevTools is open and its orientation

Useful for when you want something special to happen when DevTools is open. Like pausing canvas, adding style debug info, etc.

**This package has a lot of flaws. It used to work better, but browsers changed, and the detection now has too many false-positives.**

## [Demo](https://sindresorhus.com/devtools-detect)

## Install

```sh
npm install devtools-detect
```

## Usage

```html
<script type="module">
import devtools from './node_modules/devtools-detect/index.js';

// Check if it's open
console.log('Is DevTools open:', devtools.isOpen);

// Check it's orientation, `undefined` if not open
console.log('DevTools orientation:', devtools.orientation);

// Get notified when it's opened/closed or orientation changes
window.addEventListener('devtoolschange', event => {
	console.log('Is DevTools open:', event.detail.isOpen);
	console.log('DevTools orientation:', event.detail.orientation);
});
</script>
```

## React usage

```jsx
import {useState, useEffect} from 'react';
import devtoolsDetect from 'devtools-detect';

export function useDevToolsStatus() {
	const [isDevToolsOpen, setIsDevToolsOpen] = useState(devtoolsDetect.isOpen);

	useEffect(() => {
		const handleChange = event => {
			setIsDevToolsOpen(event.detail.isOpen);
		};

		window.addEventListener('devtoolschange', handleChange);

		return () => {
			window.removeEventListener('devtoolschange', handleChange);
		};
	}, []);

	return isDevToolsOpen;
}
```

```jsx
import {useDevToolsStatus} from './useDevToolsStatus.js';

export default function App() {
	const isDevToolsOpen = useDevToolsStatus();
	return isDevToolsOpen ? 'OPEN' : 'CLOSED';
}
```

## Support

- Chrome DevTools
- Safari DevTools
- Firefox DevTools
- Opera DevTools

## Caveats

Doesn't work if DevTools is undocked and will show false positive if you toggle any kind of sidebar.
