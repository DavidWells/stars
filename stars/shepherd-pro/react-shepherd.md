---
repo: shepherd-pro/react-shepherd
url: 'https://github.com/shepherd-pro/react-shepherd'
homepage: 'https://react-shepherd.vercel.app'
starredAt: '2022-06-29T19:21:51Z'
createdAt: '2019-02-04T04:19:26Z'
updatedAt: '2025-02-24T23:03:54Z'
language: CSS
license: NA
branch: master
stars: 642
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:39.699Z'
description: A React wrapper for the site tour library Shepherd
tags: []
---

**This repository is no longer being maintained and all further development is at the main [shepherd](https://github.com/shepherd-pro/shepherd/tree/main/packages/react) repo.**





# react-shepherd

<div>
  <a href="https://shipshape.io">
    <img align="left" src="http://i.imgur.com/DWHQjA5.png" alt="Ship Shape" width="50" height="50"/>
  </a>

**[react-shepherd is built and maintained by Ship Shape. Contact us for web app consulting, development, and training for your project](https://shipshape.io/)**.

</div>

[![NPM](https://img.shields.io/npm/v/react-shepherd.svg)](https://www.npmjs.com/package/react-shepherd)
[![Test Status](https://github.com/shipshapecode/react-shepherd/workflows/Test/badge.svg)](https://github.com/shipshapecode/react-shepherd/actions?query=workflow%3ATest)
[![Maintainability](https://api.codeclimate.com/v1/badges/d5273e1d465352a6df4e/maintainability)](https://codeclimate.com/github/shipshapecode/react-shepherd/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d5273e1d465352a6df4e/test_coverage)](https://codeclimate.com/github/shipshapecode/react-shepherd/test_coverage)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a React wrapper for the [Shepherd](https://github.com/shipshapecode/shepherd), site tour, library.
It's mainly a wrapper around the Shepherd library that exposes the tour object and methods to the context object
that can be passed into props for dynamic interactivity.

## Install

```bash
npm install --save react-shepherd
```

## Usage

### Via Provider/Context

```jsx
import React, { Component, useContext } from "react";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import newSteps from "./steps";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

function Button() {
  const tour = useContext(ShepherdTourContext);

  return (
    <button className="button dark" onClick={tour.start}>
      Start Tour
    </button>
  );
}

export default function App() {
  return (
    <div>
      <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
        <Button />
      </ShepherdTour>
    </div>
  );
}
```

### Via Hook

```jsx
import React, { Component } from "react";
import { useShepherdTour } from "react-shepherd";
import newSteps from "./steps";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

export default function App() {
  const tour = useShepherdTour({ tourOptions, steps: newSteps });

  return (
    <button class="button dark" onClick={tour.start}>
      Start Tour
    </button>
  );
}
```

## Configuration

The following configuration options for a tour can be set on the ShepherdTour to control the way that Shepherd is used. This is simply a POJO passed to Shepherd to use the options noted in the Shepherd Tour [options](https://shepherdjs.dev/docs/Tour.html).
**The only required option is `steps`, which is an array passed to the props.**

### tourOptions

`PropTypes.object`
Used to set the options that will be applied to each step by default. You can pass in any of the options that you can with Shepherd.

### steps

`PropTypes.array`
You must pass an array of steps to `steps`, something like this:

```js
const steps = [
  {
    id: 'intro',
    attachTo: { element: '.first-element', on: 'bottom' },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    cancelIcon: {
      enabled: true,
    },
    title: 'Welcome to React-Shepherd!',
    text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },
  // ...
];
```

## Steps

The options are the same as Shepherd [options](https://shepherdjs.dev/docs/Step.html).

## License

MIT
