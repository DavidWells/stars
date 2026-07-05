---
repo: theninthsky/frontend-essentials
url: 'https://github.com/theninthsky/frontend-essentials'
homepage: 'https://www.npmjs.com/package/frontend-essentials'
starredAt: '2022-12-28T22:55:42Z'
createdAt: '2021-09-26T05:38:12Z'
updatedAt: '2025-02-03T03:29:53Z'
language: TypeScript
license: MIT
branch: main
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:01.286Z'
description: 'A set of useful functions, components and hooks.'
tags:
  - javascipt
  - npm-package
  - react-hooks
  - reactjs
---

<div align="center">
  <h1>Frontend Essentials</h1>
  <a href="https://www.npmjs.com/package/frontend-essentials">
     <img src="https://img.shields.io/npm/v/frontend-essentials.svg" alt="npm package" />
  </a>
  <a href="https://www.npmjs.com/package/frontend-essentials">
    <img src="https://img.shields.io/npm/dm/frontend-essentials.svg" alt="npm downloads" />
  </a>
</div>
<br>
<pre>npm i frontend-essentials</pre>
<br>

- [React Components](#react-components)
  - [LazyRender](#lazyrender)
  - [Media](#media)
  - [Meta](#meta)
- [React Hooks](#react-hooks)
  - [useAxios](#useaxios)
  - [useFetch](#usefetch)
  - [useMedia](#usemedia)
  - [useObjectState](#useobjectstate)
  - [usePersistState](#usepersiststate)
  - [usePersistObjectState](#usepersistobjectstate)
  - [useProgressiveImage](#useprogressiveimage)
  - [useTransitionNavigate](#usetransitionnavigate)
- [Utility Functions](#utility-functions)
  - [lazyPrefetch](#lazyprefetch)
    <br>

# React Components

## LazyRender

Lazily renders a large list of items:

```js
<LazyRender items={notes} batch={20}>
  {({ _id, title, content, date }) => <Note key={_id} title={title} content={content} date={date} />}
</LazyRender>
```

## Media

Conditionally renders a component when certain media queries are matched:

```js
<Media query="(max-width: 768px)">
  <Menu />
</Media>
```

When an array is passed as `query`, queries will have an `OR` relationship when matching:

```js
// matches when width is at most 480px or at least 1200px
<Media query=["(max-width: 480px)", "(min-width: 1200px)"]>
    <Menu />
</Media>
```

## Meta

Sets meta properties for `title`, `description` and _[Open Graph](https://ogp.me/)_:

```js
<Meta
  title="Frontend Essentials"
  description="A set of useful functions, components and hooks."
  image="https://my-website.com/icons/og-icon.png"
/>
```

Results in:

```html
<title>Frontend Essentials</title>
<meta name="description" property="description" content="A set of useful functions, components and hooks." />
<meta name="og:type" property="og:type" content="website" />
<meta name="og:url" property="og:url" content="https://my-website.com" />
<meta name="og:title" property="og:title" content="Frontend Essentials" />
<meta name="og:image" property="og:image" content="https://my-website.com/icons/og-icon.png" />
```

<br>

# React Hooks

## useAxios

Handles http requests easily:

```js
const { loading, status, error, data, activate } = useAxios({
  method: 'get',
  url: 'https://example.com/v1/items',
  onSuccess: ({ data }) => console.log(data),
  onError: ({ error }) => console.error(error)
})
```

Initial request can be skipped and triggered manually:

```js
const { loading, status, error, data, activate } = useAxios({
  method: 'get',
  url: 'https://example.com/v1/items',
  manual: true,
  onSuccess: ({ data }) => console.log(data)
})

setTimeout(activate, 3000)
```

When specifying a UUID, response data will be persisted between rerenders:

```js
const { loading, status, error, data, activate } = useAxios({
  method: 'get',
  url: 'https://example.com/v1/items',
  uuid: 'items',
  onSuccess: ({ data }) => console.log(data)
})
```

Refetches can be prevented during rerenders:

```js
const { loading, status, error, data, activate } = useAxios({
  method: 'get',
  url: 'https://example.com/v1/items',
  uuid: 'items',
  immutable: true,
  onSuccess: ({ data }) => console.log(data)
})
```

Null response keys can be purged:

```js
const { loading, status, error, data, activate } = useAxios({
  method: 'get',
  url: 'https://example.com/v1/items',
  purgeNull: true,
  onSuccess: ({ data }) => console.log(data)
})
```

Response keys can be transformed to camelCase:

```js
const { loading, status, error, data, activate } = useAxios({
  method: 'get',
  url: 'https://example.com/v1/items',
  camelCased: true,
  onSuccess: ({ data }) => console.log(data)
})
```

Get axios instance:

```js
import { axios } from 'frontend-essentials'

axios.defaults.withCredentials = true
```

## useFetch

Similar to useAxios but with native fetch's API:

```js
const { loading, response, status, error, data, activate } = useFetch('https://example.com/v1/items', {
  mode: 'no-cors',
  onSuccess: ({ data }) => console.log(data)
})
```

## useMedia

Returns a media queries object containing boolean matches for each passed query:

```js
const { mobile, tablet } = useMedia({
  mobile: '(max-width: 480px)',
  tablet: '(min-width: 481px) and (max-width: 1199px)'
})

const getDescription = () => {
  if (mobile) return 'Hello'
  if (tablet) return 'Hello Mr.'
  return 'Hello Mr. Smith'
}

return <div>{getDescription()}</div>
```

## useObjectState

Makes working with form state easier by returning a _setState_ that shallowly merges state like _this.setState_ does.
<br>
In addition, it returns a third _resetState_ function that reverts the form to its initial state:

```js
const [form, setForm, resetForm] = useObjectState({
  name: '',
  age: 18,
  address: ''
})

return (
  <form>
    <input value={form.name} onChange={event => setForm({ name: event.target.value })} />
    <input type="number" value={form.age} onChange={event => setForm({ age: event.target.value })} />
    <input value={form.address} onChange={event => setForm({ address: event.target.value })} />

    <button type="button" onClick={resetForm}>
      Reset
    </button>
  </form>
)
```

## usePersistState

Allows you to keep your current state between rerenders:

```js
const [posts, setPosts] = usePersistState('posts', [])

// will store the state in memory for the next mount
setPosts([
  { id: 1, title: 'First', content: 'Lorem' },
  { id: 2, title: 'Second', content: 'Ipsum' }
])
```

## usePersistObjectState

The combination of `usePersistState` and `useObjectState`:

```js
const [form, setForm, resetForm] = usePersistObjectState(
  'student',
  {
    name: '',
    age: 18,
    address: ''
  },
  { localStorage: true }
)
```

## useProgressiveImage

Returns a low quality image source until a higher resolution image is fetched:

```js
const [src, blur] = useProgressiveImage(lowQualitySrc, highQualitySrc)

return <img style={{ filter: blur ? 'blur(20px)' : 'none' }} src={src} />
```

## useTransitionNavigate

Delays React Router's navigation until the target page is rendered:

```js
const navigate = useTransitionNavigate()

<NavLink
    to='home'
    onClick={event => {
    event.preventDefault()
    navigate('home')
    }}
>
    Home
</NavLink>
```

<br>

# Utility Functions

## lazyPrefetch

Prefetches a lazily loaded React module:

```js
const Login = lazyPrefetch(() => import('pages/Calendar'))
```

_Note: the prefetch occurs 250ms after the `load` event. If there are images in the DOM, the prefetch will occur only after they are downloaded._
