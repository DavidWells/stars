---
repo: shoelace-style/shoelace
url: 'https://github.com/shoelace-style/shoelace'
homepage: 'https://webawesome.com'
starredAt: '2021-01-17T00:26:44Z'
createdAt: '2017-07-25T18:49:44Z'
updatedAt: '2025-02-25T12:44:57Z'
language: TypeScript
license: MIT
branch: next
stars: 13219
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:06.379Z'
description: "A collection of professionally designed, every day UI components built on Web standards. SHOELACE IS BECOMING WEB AWESOME \U0001F447\U0001F447\U0001F447"
tags:
  - css
  - designsystem
  - hacktoberfest
  - html
  - javascript
  - ui
  - ux
  - webcomponents
---

# Shoelace

A forward-thinking library of web components.

- Works with all frameworks 🧩
- Works with CDNs 🚛
- Fully customizable with CSS 🎨
- Includes an official dark theme 🌛
- Built with accessibility in mind ♿️
- Open source 😸

Designed in New Hampshire by [Cory LaViska](https://twitter.com/cory_laviska).

---

Documentation: [shoelace.style](https://shoelace.style)

Source: [github.com/shoelace-style/shoelace](https://github.com/shoelace-style/shoelace)

Twitter: [@shoelace_style](https://twitter.com/shoelace_style)

---

## Shoemakers 🥾

Shoemakers, or "Shoelace developers," can use this documentation to learn how to build Shoelace from source. You will need Node >= 14.17 to build and run the project locally.

**You don't need to do any of this to use Shoelace!** This page is for people who want to contribute to the project, tinker with the source, or create a custom build of Shoelace.

If that's not what you're trying to do, the [documentation website](https://shoelace.style) is where you want to be.

### What are you using to build Shoelace?

Components are built with [LitElement](https://lit-element.polymer-project.org/), a custom elements base class that provides an intuitive API and reactive data binding. The build is a custom script with bundling powered by [esbuild](https://esbuild.github.io/).

### Forking the Repo

Start by [forking the repo](https://github.com/shoelace-style/shoelace/fork) on GitHub, then clone it locally and install dependencies.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/shoelace
cd shoelace
npm install
```

### Developing

Once you've cloned the repo, run the following command.

```bash
npm start
```

This will spin up the dev server. After the initial build, a browser will open automatically. There is currently no hot module reloading (HMR), as browser's don't provide a way to reregister custom elements, but most changes to the source will reload the browser automatically.

### Building

To generate a production build, run the following command.

```bash
npm run build
```

### Creating New Components

To scaffold a new component, run the following command, replacing `sl-tag-name` with the desired tag name.

```bash
npm run create sl-tag-name
```

This will generate a source file, a stylesheet, and a docs page for you. When you start the dev server, you'll find the new component in the "Components" section of the sidebar.

### Contributing

Shoelace is an open source project and contributions are encouraged! If you're interesting in contributing, please review the [contribution guidelines](CONTRIBUTING.md) first.

## License

Shoelace was created by [Cory LaViska](https://twitter.com/cory_laviska) and is available under the terms of the MIT license.

Whether you're building Shoelace or building something _with_ Shoelace — have fun creating! 🥾
