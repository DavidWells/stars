---
repo: frontend-joe/react-bubbly-transitions
url: 'https://github.com/frontend-joe/react-bubbly-transitions'
homepage: null
starredAt: '2022-10-30T05:00:22Z'
createdAt: '2022-10-23T14:12:02Z'
updatedAt: '2024-11-14T20:00:02Z'
language: TypeScript
license: NA
branch: main
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:15.380Z'
description: React library enabling users to show bubbly transitions between route changes.
tags: []
---

# react-bubbly-transitions

Show bubbly transitions between route changes, in your React 18 apps.

Click [here for a demo](https://bubbles.frontendjoe.com/).

Or [check out the npm package here](https://www.npmjs.com/package/react-bubbly-transitions).

## Installation

Just a few quick steps to get started:

#### 1. Create a React app (optional)

If you are adding the transitions to an existing app, you can skip this step.

```sh
npx create-react-app my-bubbly-app
cd my-bubbly-app
```

#### 2. Install dependencies

Our project depends upon React's router library

```sh
npm i react-bubbly-transitions react-router-dom
```

#### 3. Add components

The package relies on two components being present.

##### BubblyContainer

This is what houses our wave transition between route changes and does not require any props.

##### BubblyLink

This button can be declared anywhere inside your Router component.

It takes the following props:

| Prop       | Description                                                                                  | Example | type               | required | default |
| ---------- | -------------------------------------------------------------------------------------------- | ------- | ------------------ | -------- | ------- |
| children   | The content inside the link                                                                  | About   | String / Component | true     |         |
| to         | The route that the link will take you to                                                     | /about  | String             | true     |         |
| colorStart | The background color of the bubble shape that appears first. Must be a hexcode or rgba value | #8f44fd | String             | false    | #8f44fd |
| colorEnd   | The background color of the bubble shape that appears last. Must be a hexcode or rgba value  | #ffffff | String             | false    | #ffffff |

Be careful with the duration (too fast/slow can ruin the effect) - my recommended duration is between 1000ms and 1600ms.

##### Example App.tsx

Copy this whole code snippet into your App.tsx for a basic example:

```typescript
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BubblyContainer, BubblyLink } from "react-bubbly-transitions";

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;

function App() {
  return (
    <BrowserRouter>
      <BubblyContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BubblyLink to="/">Home</BubblyLink>
              <BubblyLink to="/about">About</BubblyLink>
              <BubblyLink to="/contact">Contact</BubblyLink>
              <Outlet />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<>No Match</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4. Styling

To style the BubblyLink component you can target it via css (just be more specific than me 😄):

```css
body .react-bubbly-transitions__bubbly-link {
  color: #af44fd;
}
```

To style the active state of the BubblyLink, just target the .active class and again be more specific.

```css
body .react-bubbly-transitions__bubbly-link.active {
  text-decoration: underline;
}
```

### 5. DRY (Don't Repeat Yourself)

To avoid repeating certain BubblyLink props, I recommend creating your own generic link component that sets the props here by default.

```typescript
import { FC, ReactNode } from "react";
import { BubblyLink } from "react-bubbly-transitions";

type Props = {
  to: string;
  children: ReactNode;
};

export const MyBubblyLink: FC<Props> = ({ to, children }) => (
  <BubblyLink colorStart="#af44fd" colorEnd="#222222">
    {children}
  </BubblyLink>
);
```

### 6. Have fun with it!

Please hit me up on [My Instagram page](https://instagram.com/frontendjoe) for any support or suggestions 🙂
