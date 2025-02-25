---
repo: heydoctor/react-scientist
url: 'https://github.com/heydoctor/react-scientist'
homepage: ''
starredAt: '2019-10-06T08:50:26Z'
createdAt: '2018-07-05T17:05:06Z'
updatedAt: '2023-01-28T12:29:58Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.564Z'
description: "\U0001F469‍\U0001F52CReact components to assist with experiments, split-testing and analytics"
tags:
  - ab-testing
  - analytics
  - experiment
  - react
  - split-testing
---

# 👩‍🔬 React Scientist [![npm version](https://badge.fury.io/js/react-scientist.svg)](http://badge.fury.io/js/react-scientist) [![Build Status](https://travis-ci.org/heydoctor/react-scientist.svg?branch=master)](https://travis-ci.org/heydoctor/react-scientist) [![codecov](https://codecov.io/gh/heydoctor/react-scientist/branch/master/graph/badge.svg)](https://codecov.io/gh/heydoctor/react-scientist)


> Simple React components for split testing and analytics

## Installation

```
$ npm install react-scientist
$ yarn add react-scientist
```

## Components

### `Experiment`

#### Props

|  name | type  |   required | default   | description   |
|---|---|---|---|---|
|  `name` | string  | ✅   | | The name of the experiment |
|  `id` | string  |   | "" | An external experiment ID, e.g. from Google Optimize |
| `userId`  |  string |   | "" | A static user ID to ensure logged-in users have consistent experiences when running experiments |
| `domain`  |  string |   | `document.location.host` | The domain that the variant cookie should be set on. |
| `variants` | array |  ✅ |  | List of possible variants for the experiment to choose from. |

#### Usage

```jsx
import React from 'react';
import { render } from 'react-dom';
import { Experiment } from 'react-scientist';

// Override the static `onStart` method to listen when users are enrolled in an experiment.
// NOTE: Overriding the `onStart` method should happen **before** the React app is rendered to the DOM.

Experiment.onStart = ({ experimentName, experimentId, variantIndex, variantName }) => {
  // Handle experiment start. Typically will send an analytic event to Segment, Google Analytics, etc.
};

const LoginTitleExperiment = () => (
  <Experiment
    name="Login Title"
    variants={[
      {
        name: 'Control',
        weight: 0.5,
        render: () => <h1>Sign In</h1>,
      },
      {
        name: 'Login',
        weight: 0.5,
        render: () => <h1>Login</h1>,
      },
    ]}
  />
);

render(<LoginTitleExperiment />);
```

## Cross Domain Experiments
`<Experiment />` uses cookies to store the active variant for your running experiments. If you'd like to run experiments on both a naked domain and a subdomain, pass the root domain as the `domain` prop. Make sure to prefix the domain with leading `.` so the cookie will be accessible across any property.

```jsx
<Experiment
  name="Cross Domain"
  domain=".example.com"
  variants={[
    {
      name: 'Control',
      weight: 0.5,
      render: () => <h1>Sign In</h1>,
    },
    {
      name: 'Login',
      weight: 0.5,
      render: () => <h1>Login</h1>,
    },
  ]}
/>
```

---

### `Metric`

#### Props

| name      | type   | required | default | description                                                            |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------- |
| `name`    | string | ✅       |         | The name of the event, e.g. `Button Clicked`                           |
| `on`      | string |          | `click` | The event to listen to, e.g. `click`, `hover`                          |
| `data`    | object |          | {}      | Extra data to send along with the event, e.g. `{ location: 'banner' }` |
| `options` | object |          | {}      | Options to pass to Event handler                                       |

#### Usage

```jsx
import React from 'react';
import { render } from 'react-dom';
import { Metric } from 'react-scientist';

// Override the static `onEvent` method to listen when events are captured. NOTE: Overriding the `onEvent`
// method should happen **before** the React app is rendered to the DOM.
Metric.onEvent = ({ name, data, options }) => {
  // Handle event capture. Typically will send an analytic event to Segment, Google Analytics, etc.
};

const MetricExample = () => (
  <Metric name="Facebook Login Clicked">
    <Button>Login With Facebook</Button>
  </Metric>
);

render(<MetricExample />);
```

## License

MIT © [Sappira Inc.](https://sappira.com)
