---
repo: christiankaindl/LYTS
url: 'https://github.com/christiankaindl/LYTS'
homepage: 'https://lyts.christiankaindl.com'
starredAt: '2022-02-02T04:40:36Z'
createdAt: '2022-01-01T18:51:53Z'
updatedAt: '2024-12-18T11:06:32Z'
language: TypeScript
license: MIT
branch: main
stars: 164
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.857Z'
description: Layout primitives for React
tags:
  - css
  - javascript
  - layout
  - react
---

<div align='center'>
  <h1>LYTS</h1>
  <img src='./src/component-icons.png' alt='Abstract illustrations depicting the available layout components' />
  <p>Layout primitives for React.</p>
</div>

# LYTS

Layout primitives to build any kind of layout with useful props like `bleed`, `asChild` and `xAlign`/`yAlign`.

- **Like Lego** – Compose primitives to create complex layouts
- **Tiny bundle** – Only 445 Bytes total ([source](https://bundlephobia.com/package/@christiankaindl/lyts@2.0.0-beta.3))
- **Unstyled** – Bring your own styling solution—Tailwind, CSS Modules, you name it
- **Layout props** – Simple & productive API

⚛️ [Components API](https://lyts.christiankaindl.com/components) · 📚 [Guides](https://lyts.christiankaindl.com/guides) · 📖 [Examples](https://lyts.christiankaindl.com/examples)

To get started, import a base component and compose them together—<a href='https://lyts.christiankaindl.com/components/stack'>Stack</a>, <a href='https://lyts.christiankaindl.com/components/row'>Row</a>, <a href='https://lyts.christiankaindl.com/components/clamp'>Clamp</a>, <a href='https://lyts.christiankaindl.com/components/columns'>Columns</a>, <a href='https://lyts.christiankaindl.com/components/grid'>Grid</a>—happy layout building!

> [!NOTE]
> Version 2.0 introduced support for React 19, and migrated away from using `forwardRef()`. This means v2.0 may not work as intended when using with React 18 or earlier. If you want to pass `ref`s to LYTS components and use React 18 or lower, consider using v1.2.0 instead, which has full support.

## Usage

Layout components can be composed until you achieve your desired layout. For example, The following \<CenterCard> component renders a card with a max-width of 400px, centers it and uses a <a href='https://lyts.christiankaindl.com/components/stack'>Stack</a> to get consistent spacing:

![image]()

```jsx
const CenterCard: FunctionComponent = function () {
  return (
    // A card with clamped 400px and centered
    <Clamp clamp='400px'>
      <Stack gap={0.75} className='card'>
        <h3>Card title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </Stack>
    </Clamp>
  )
}
```

Check out the <a href='https://lyts.christiankaindl.com/examples'>Examples</a> page for a comprehensive collection of layouts and how to build them with LYTS.

A real-world example using LYTS is this documentation site, which makes extensive use of all components. [Check out the code here](https://github.com/christiankaindl/LYTS-website/)!

## Support & help

If you get stuck, [reach out to @christiankaindl](https://twitter.com/christiankaindl) on Twitter. In case of bugs, [open an issue on GitHub](https://github.com/christiankaindl/LYTS/issues).

## Local Development

```sh
npm install
npm run dev
```
