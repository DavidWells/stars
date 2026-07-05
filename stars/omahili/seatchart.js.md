---
repo: omahili/seatchart.js
url: 'https://github.com/omahili/seatchart.js'
homepage: 'https://seatchart.js.org'
starredAt: '2022-03-08T05:25:18Z'
createdAt: '2015-09-10T13:06:39Z'
updatedAt: '2025-02-16T08:39:18Z'
language: TypeScript
license: MIT
branch: master
stars: 184
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:02.121Z'
description: "\U0001F4BA\U0001F5FA️ Create beautiful designed seat maps."
tags:
  - css
  - html
  - javascript
  - library
  - picker
  - seat
  - seat-map
  - seat-picker
  - seatchart
  - seatchartjs
  - seatmap
  - seats
  - seatshare
  - vanilla-javascript
  - vanilla-js
---

# Seatchart

Create beautiful designed seat maps 💺🗺️

- [Demo](https://seatchart.js.org/demo.html)
- [Docs](https://seatchart.js.org)

## Install

You can get seatchart from npm or use a CDN like [jsDelivr](https://www.jsdelivr.com).

### Npm

```
npm install --save seatchart
```

### JsDelivr

```
https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.js
https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.css
```

## Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Seatchart Example</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.css">
    <style>
      .economy {
        color: white;
        background-color: #43aa8b;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.js"></script>
    <script>
      var element = document.getElementById('container');
      var options = {
        map: {
          rows: 7,
          columns: 7,
          seatTypes: {
            default: {
              label: 'Economy',
              cssClass: 'economy',
              price: 10,
            },
          },
        },
      };

      var sc = new Seatchart(element, options);
    </script>
  </body>
</html>
```

## Usage with React

Create your Seatchart component:

```javascript
// Seatchart.tsx
import React, { forwardRef, useEffect, useRef } from 'react';
import SeatchartJS, { Options } from 'seatchart';

interface SeatchartProps {
  options: Options;
}

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

const Seatchart = forwardRef<SeatchartJS | undefined, SeatchartProps>(({ options }, ref) => {
  const seatchartRef = useRef<SeatchartJS>();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current && !seatchartRef.current) {
      seatchartRef.current = new SeatchartJS(elementRef.current, options);

      setForwardedRef(ref, seatchartRef.current);

      return () => {
        seatchartRef.current = undefined;
        setForwardedRef(ref, undefined);
      };
    }
  }, []);

  return (
    <div ref={elementRef} />
  );
});

export default Seatchart;
```

Import it and use it:

```javascript
// App.tsx
import React, { useRef } from 'react';
import SeatchartJS, { Options } from 'seatchart';
import Seatchart from './Seatchart';

import 'seatchart/dist/seatchart.min.css';
import './App.css';

const options: Options = {
  map: {
    rows: 7,
    columns: 7,
    seatTypes: {
      default: {
        label: 'Economy',
        cssClass: 'economy',
        price: 10,
      },
    },
  },
};

const App = () => {
  const seatchartRef = useRef<SeatchartJS>();

  const handleClick = () => {
    const index = { row: 0, col: 6 };
    const seat = seatchartRef.current?.getSeat(index);

    seatchartRef.current?.setSeat(index, {
      state: seat?.state === 'selected' ? 'available' : 'selected',
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle Seat</button>
      <Seatchart ref={seatchartRef} options={options} />
    </div>
  );
}

export default App;
```

And don't forget to style your seats:

```css
/* App.css */
.economy {
  color: white;
  background-color: #43aa8b;
}
```
