---
repo: ScaCap/next-app-builder
url: 'https://github.com/ScaCap/next-app-builder'
homepage: ''
starredAt: '2020-10-27T17:43:27Z'
createdAt: '2020-10-02T12:30:55Z'
updatedAt: '2024-05-06T16:33:46Z'
language: TypeScript
license: NA
branch: main
stars: 50
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:25.377Z'
description: Custom app builder for Next.js apps
tags: []
---

# next-app-builder

[![Version Badge][npm-version-svg]][package-url]
[![GZipped size][npm-minzip-svg]][bundlephobia-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Custom App builder for Next.js.

## What is a Custom `App`?

Next.js uses the App component to initialize pages. You can override it and control the page initialization. Which allows you to do amazing things like:

- Persisting layout between page changes
- Keeping state when navigating pages
- Custom error handling using componentDidCatch
- Inject additional data into pages
- Add global CSS

For more details, see [offical documentation](https://nextjs.org/docs/advanced-features/custom-app).

## Why a builder?

Generates a custom next App using middleware.

Before:

```javascript
class CustomNextApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    const initialPageProps = await (Component.getInitialProps ? Component.getInitialProps : {});
    const data = await fetch(getDataForPage(router.pathname));
    return {
      pageProps: {
        ...initialPageProps,
        data
      }
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <SsrDataProvider data={pageProps.ssrData}>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </SsrDataProvider>
    );
  }
}
```

After:

```javascript
const ssrDataMiddleware = {
  Component: SsrDataProvider,
  getInitialProps: ({ router }) => {
    const data = await fetch(getDataForPage(router.pathname));
    return { data };
  }
};

const layoutMiddleware = { Component: LayoutComponent };

nextAppBuilder({
  middleware: [ssrDataMiddleware, layoutMiddleware]
});
```

## Installation

Install using Yarn:

```sh
yarn add @scacap/next-app-builder
```

or NPM:

```sh
npm install @scacap/next-app-builder --save
```

## Usage

```javascript
// pages/_app.js
import nextAppBuilder from '@scacap/next-app-builder';
import materialUiMiddleware from '../middlewares/material-ui';
import theme from '../theme';

export default nextAppBuilder({
  middleware: [materialUiMiddleware(theme)]
});
```

[![Edit useInView](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/custom-next-app-15s4p?fontsize=14&hidenavigation=1&file=/pages/_app.tsx)

## API

### nextAppBuilder

Creates a custom app that should be the default export of `pages/_app.js`.

```javascript
const CustomApp = appBuilder({
  middleware: [
    // middlewares here
  ]
});
```

### middleware

An object containing the following fields:

- **name**: a human readable identifier of middleware. Optional.
- **getInitialProps**: a function which is executed before rendering. Used for blocking data requirements for every single page in your application, e.g. server side data fetching. Optional.
- **Component**: the React component which is rendered in custom App. It's a wrapper component that will receive each page as children. Typically used for adding providers in the App level, e.g. css theme provider. Optional.
- **componentDidCatch**: invoked when a descendant component throws an error. See more details in the [React docs](https://reactjs.org/docs/react-component.html#componentdidcatch). Optional.

## Caveats

Internally, you will be adding a custom getInitialProps in your App. This will disable Automatic Static Optimization in pages without Static Generation.

For more details, see [offical documentation](https://nextjs.org/docs/advanced-features/custom-app#caveats).

## Contributing

Let's build together our v1! Pull-requests and issue reports are welcome.

[npm-version-svg]: https://img.shields.io/npm/v/@scacap/next-app-builder.svg
[package-url]: https://www.npmjs.com/package/@scacap/next-app-builder
[bundlephobia-url]: https://bundlephobia.com/result?p=@scacap/next-app-builder
[npm-minzip-svg]: https://img.shields.io/bundlephobia/minzip/@scacap/next-app-builder
[deps-url]: https://david-dm.org/scacap/next-app-builder
[deps-svg]: https://david-dm.org/scacap/next-app-builder.svg
[dev-deps-url]: https://david-dm.org/scacap/next-app-builder?type=dev
[dev-deps-svg]: https://david-dm.org/scacap/next-app-builder/dev-status.svg
[license-url]: https://www.apache.org/licenses/LICENSE-2.0
[license-image]: https://img.shields.io/npm/l/@scacap/next-app-builder.svg
[downloads-url]: https://npm-stat.com/charts.html?package=@scacap/next-app-builder
[downloads-image]: https://img.shields.io/npm/dm/@scacap/next-app-builder.svg
