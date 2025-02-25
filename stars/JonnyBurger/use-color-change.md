---
repo: JonnyBurger/use-color-change
url: 'https://github.com/JonnyBurger/use-color-change'
homepage: 'https://www.npmjs.com/package/use-color-change'
starredAt: '2020-02-02T18:44:38Z'
createdAt: '2020-02-02T10:07:28Z'
updatedAt: '2024-04-05T15:19:44Z'
language: TypeScript
license: NA
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:05.996Z'
description: "\U0001F4C8\U0001F4C9React hook for flashing a text when a value becomes higher or lower"
tags:
  - change
  - color
  - flash
  - hook
  - numeric
  - react
  - value
---

# use-color-change

> React hook for flashing a numeric value when it changes

<p align="center">
<img src="https://github.com/JonnyBurger/use-color-change/blob/master/usecolorchange.gif?raw=true">
</p>

## Installation

This module can be used in any React project that supports hooks.

```
npm i use-color-change
```

## Usage

Use the hook and pass a number as the first parameter. Specify the colors you want to flash and how long the animation should take.
The return value of the hook has the type `{animation: string}`, you can pass it as a style for any element and also further customize it for example using `animation-timing-function` if you please.

```tsx
export const App = () => {
    const [value, setValue] = useState(0);
    const colorStyle = useColorChange(value, {
        higher: 'limegreen',
        lower: 'crimson',
        duration: 1800
    });

    return <div style={colorStyle}>{value}</div>;
};
```

## Function signature

```ts
useColorChange(value: number, {
    higher: string | null;
    lower: string | null;
    duration?: number | undefined;
})
```

-   `value`: The numeric value for which the animation should be based on.
-   `options`:
    -   `higher`: The color which should be flashing when the value increases. You can pass `null` for no animation.
    -   `lower`: The color which should be flashing when the value decreases. You can pass `null` for no animation.
    -   `duration`: _(optional)_ How long the flash should take in miliseconds. Default is `1800`.
    -   `property`: _(optional)_ either `color` or `background-color`, allowing you to animate the background color instead.

### Author

© Jonny Burger

### License

MIT
