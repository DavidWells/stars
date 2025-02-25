---
repo: mattpocock/make-route-map
url: 'https://github.com/mattpocock/make-route-map'
homepage: ''
starredAt: '2021-04-08T22:17:09Z'
createdAt: '2020-07-29T16:02:33Z'
updatedAt: '2024-01-25T14:24:01Z'
language: TypeScript
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:51.770Z'
description: Type-safe routing for single-page-applications
tags: []
---

# make-route-map

Routing in web apps can be a subtle, but persistent source of bugs. You think you've updated every reference to a route you're changing, and _BAM_. You've caused a bug in some unrelated part of your app.

Keep your routes in a single, type-safe source of truth with a routeMap.

We've been using it at [Yozobi](http://yozobi.com/) in production apps for some time now, and it's saved us a lot of headaches.

## makeRouteMap

### Simple

```js
import { makeRouteMap } from 'make-route-map';

const routeMap = makeRouteMap({
  users: {
    path: '/users',
  },
  admin: {
    path: '/admin',
  },
});

console.log(routeMap.admin());
// '/admin'

console.log(routeMap.users());
// '/users'
```

### Path Params and Search

```js
import { makeRouteMap } from 'make-route-map';

const routeMap = makeRouteMap({
  editUser: {
    path: '/users/:id/edit',
    params: {
      id: true,
    },
  },
  auth: {
    path: '/auth',
    search: {
      desiredUsername: true,
    },
  },
});

console.log(routeMap.editUser({ params: { id: '240' } }));
// '/users/240/edit'

console.log(routeMap.auth({ search: { desiredUsername: 'mattpocock' } }));
// '/auth?desiredUsername=mattpocock'
```

## makeNavigate

`makeNavigate` gives you a type-safe way of navigating around your app.

```js
import { makeRouteMap, makeNavigate } from 'make-route-map';

const routeMap = makeRouteMap({
  editUser: {
    path: '/users/:id/edit',
    params: {
      id: true,
    },
  },
  auth: {
    path: '/auth',
    search: {
      desiredUsername: true,
    },
  },
});

// This could be replaced with any history.push implementation
const goToRoute = route => {
  window.location.href = route;
};

const navigate = makeNavigate(routeMap, goToRoute);

// This would take the user to '/users/240/edit'
navigate.editUser({
  params: {
    id: '240',
  },
});
```

### useNavigate in React

In React, this can be combined with a hook to make a simple `useNavigate` hook. This example uses `react-router-dom`.

```js
import { makeRouteMap, makeNavigate } from 'make-route-map';
import { useHistory } from 'react-router-dom';

const routeMap = makeRouteMap({
  root: {
    path: '/',
  },
});

const useNavigate = () => {
  const history = useHistory();
  const navigate = makeNavigate(routeMap, history.push);
  return navigate;
};

const Button = () => {
  const navigate = useNavigate();
  return <button onClick={navigate.root}>Go Home</button>;
};
```

## Options

`make-route-map` is at an early stage, so I'm keen to hear what you need to make this work for you.

### paramMatcher

Helps for when your path params don't match the default `:id` pattern.

```js
import { makeRouteMap } from 'make-route-map';

const routeMap = makeRouteMap(
  {
    editUser: {
      path: '/users/$id/edit',
      params: {
        id: true,
      },
    },
  },
  {
    paramMatcher: param => new RegExp(`\\$${param}`),
  }
);

console.log(
  routeMap.editUser({
    params: {
      id: '240',
    },
  })
);
// '/users/240/edit'
```

```js
import { makeRouteMap } from 'make-route-map';

const routeMap = makeRouteMap({
  editUser: {
    path: '/users/:id/edit',
    params: {
      id: true,
    },
  },
});

import { makeNavigate } from 'make-route-map';
import { useHistory } from 'react-router-dom';

const useNavigate = () => {
  const history = useHistory();
  const navigate = makeNavigate(routeMap, history.push);
  return navigate;
};

const Button = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate.editUser({ params: { id: '240' } })}>
      Edit User
    </button>
  );
};
```
