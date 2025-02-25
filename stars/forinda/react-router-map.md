---
repo: forinda/react-router-map
url: 'https://github.com/forinda/react-router-map'
homepage: ''
starredAt: '2022-11-16T01:35:26Z'
createdAt: '2022-11-06T15:55:01Z'
updatedAt: '2024-02-28T12:19:38Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:09.352Z'
description: >-
  A declarative routing library that maps your routes and uses the
  react-router-dom library so that you focus on the logic rather than route
  configuration. It supports nested routing and react-router-dom v6+
tags:
  - nodejs
  - react
  - react-router
  - react-router-dom
  - react-router-dom-v6
  - routing
  - typescript
---

## `react-router-map`

## How to use

Installation

```sh
# Pnpm
pnpm install react-router-map
# Npm
npm install react-router-map
#Yarn
yarn add react-router-map
```

To load it in your component ensure `react-router-dom` is installed

Supports both `esm` and `commonjs`

For versions `>1.0.0`

- Removal of `hasChildren` prop and check for the children directly without the `boolean` field
- Addition of `Layout` prop and `extensible` layout structure in the routes level for more complex routing layout wrappers

```jsx
import MapRouter from 'react-router-map'
import { IRouteProps } from 'react-router-map/dist/types' //Types of route for esm modules

const Child1 = () => <div>Child 1</div>
const Child2 = () => <div>Child 2</div>
const Parent1 = () => <div>Child 2</div>
const Parent1 = () => <div>Child 2</div>
const routes: IRouteProps[] = [
  {
    pathName: 'Home',
    urlPath: '/',
    Component: <Parent1 />,
  },
  {
    pathName: 'Admin',
    urlPath: '/admin',
    Component: <Parent2 />,
    nestedComponents: [
      {
        pathName: 'Dashboard',
        urlPath: '/admin',
        Component: <Child1 />,
      },
      {
        pathName: 'Users',
        urlPath: '/admin/users',
        Component: <Child2 />,
      },
    ],
  },
]
const Comp = () => (
  <div>
    <MapRouter routes={routes} topScroll browserRouter />
  </div>
)
```

If you are using a layout component for your app that runs acrosss all components then you can just plug it in

```jsx
type Lmap = (
  LayoutContainer: React.FC<{
    children: JSX.Element,
  }>,
  Component: React.FC | React.ElementType,
) => JSX.Element

const layoutWrap: Lmap = (
  LayoutContainer: React.FC<{ children: JSX.Element }>,
  Component: React.FC | React.ElementType,
) => {
  return (
    <LayoutContainer>
      <Component />
    </LayoutContainer>
  )
}
const routes: IRouteProps[] = [
  {
    Component: layoutWrap(BaseLayout, Homepage),
    pathName: 'Home',
    urlPath: '/',
  },
  {
    Component: layoutWrap(BaseLayout, AboutPage),
    pathName: 'About',
    urlPath: '/about',
  },
  {
    Component: layoutWrap(BaseLayout, ContactPage),
    pathName: 'Contact',
    urlPath: '/contact',
  },
  {
    Component: layoutWrap(BaseLayout, NotFound),
    pathName: 'NotFound',
    urlPath: '*',
  },
]
const ComponentPage = () => <MapRouter routes={routes} topScroll />
```

For versions `<=1.0.0`

```jsx
import { MapRouter } from 'react-router-map'
import { IRouteProps } from 'react-router-map/dist/types' //Types of route for esm modules

const Child1 = () => <div>Child 1</div>
const Child2 = () => <div>Child 2</div>
const Parent1 = () => <div>Child 2</div>
const Parent1 = () => <div>Child 2</div>
const routes: IRouteProps[] = [
  {
    pathName: 'Home',
    urlPath: '/',
    Component: <Parent1 />,
    hasChildren: false,
  },
  {
    pathName: 'Admin',
    urlPath: '/admin',
    Component: <Parent2 />,
    hasChildren: true,
    nestedComponents: [
      {
        pathName: 'Dashboard',
        urlPath: '/admin',
        Component: <Child1 />,
        hasChildren: false,
      },
      {
        pathName: 'Users',
        urlPath: '/admin/users',
        Component: <Child2 />,
        hasChildren: false,
      },
    ],
  },
]
const Comp = () => (
  <div>
    <MapRouter routes={routes} enableTopScroll={false} browserRouter={false} />
  </div>
)
```

Sample layout structure

```sh
- Hompage # Hopepage render Parent 1
- admin # The component wrapper where you pass your <Outlet/>
  - Dashboard # Render dashboard
  - Users # Render users
  - Sumary # Render Dashboard summary
```

Sample Dashboard component

```jsx
const Admin = () => (
  <div>
    <div>
      <h1>Dashboard</h1>
    </div>
    <div>
      <Outlet />
    </div>
  </div>
)
```

The code above implements `HashRouter` and `BrowserRouter` for you and you just need to install the package and `react-router-dom`
Features

- Optional topscroll on page navigation
- Enable BrowserRouter or disable( Defaults to `HashRouter`)
- Nested layouts (You just have to to supply any level of nesting in your Application in the `nestedComponents` property)
  Upcoming features
- Layout support

# Try it out on Stackblitz

## <a href="https://stackblitz.com/edit/react-ts-nriwyu?ctl=1&devToolsHeight=33&embed=1&file=pages/Homepage.tsx&theme=dark" target="_black">Stackblitz live</a>

In the mean time we can inject a wrapper in the route `Component` property

Supports nested layouts
![Dashboard layout](./assets/nested.png)
