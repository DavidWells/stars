---
repo: darkfadr/react-nest-providers
url: 'https://github.com/darkfadr/react-nest-providers'
homepage: null
starredAt: '2020-05-25T22:31:21Z'
createdAt: '2020-01-05T04:33:45Z'
updatedAt: '2021-08-30T15:15:36Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:51.294Z'
description: null
tags: []
---

# react-nest-components

## Installation
```bash
$ yarn add react-nest-components
```
or 
```bash
$ npm install --save react-nest-components
```

## Usage
```js
import React, { createElement } from 'react'
import nest, { render } from 'react-nest-components';
import i18n from './i18n';


const AppProviders = nest(
  AnalyticsProvider,
  () => render(LanguageProvider, { i18n }),
  ThemeProvider,
  CustomProvider
);

// Note: the above will create the following
// const AppProviders = ({children}) => (
//   <AnalyticsProvider>
//     <LanguageProvider i18n={i18n}>
//       <ThemeProvider>
//         <CustomProvider>
//           {children}
//         </CustomProvider>
//       </ThemeProvider>
//     </LanguageProvider>
//   </AnalyticsProvider>
// );

ReactDOM.render(
  <AppProvider>
    <App/>
  </AppProvider>, 
  document.getElementById('root)
);


```

## Why do this? Why so extra?

## TODO
- [ ] Add documentation
- [ ] Implement tests
