---
repo: springload/springload-analytics
url: 'https://github.com/springload/springload-analytics'
homepage: null
starredAt: '2020-11-25T22:19:42Z'
createdAt: '2020-11-13T03:42:28Z'
updatedAt: '2021-05-24T02:14:15Z'
language: TypeScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:21.305Z'
description: null
tags: []
---

# Springload Analytics

> Event tracker inspired by springload-analytics.js.

This library rewrite the previous `springload-analytics.js` to and add integration of `Perfume.js` to track the performance metrics in browser.

## Install

```bash
npm install @springload/springload-analytics
yarn add @springload/springload-analytics
```

## Basic setup

```javascript
import * as SpringloadAnalytics from "springload-analytics";
const { googleAnalyticsPlugin, tecPlugin } = SpringloadAnalytics;

SpringloadAnalytics.init({
  trackerPlugins: [
    googleAnalyticsPlugin({
      trackingId: "UA-12341131-6",
    }),
    tecPlugin({
      trackerUrl: "/event";
      applicationVersion: "ert7565456asd";
    })
  ]
});
```

The built-in google analytics tracker now is replaced by manually passsing tracker plugins in to initialization function which allow users to customize their own tracker based on project requirement.

## Performance metrics

**Perfume.js** is a tiny, web performance monitoring library that reports field data back to your favorite analytics tool.
`springload-analytics` sends performance metrics to Google Analytics using **perfume.js**.

**Perfume.js** tracks the following performance mertrics:

- First Paint (fp)
- First Contentful Paint (fcp)
- Largest Contentful Paint (lcp)
- Largest Contentful Paint Final (lcpFinal)
- First Input Delay (fid)
- Cumulative Layout Shift (cls) 0-0.1
- Cumulative Layout Shift Final (clsFinal)
- Total Blocking Time (tbt)
- Total Blocking Time 5S (tbt5S)
- Total Blocking Time 10S (tbt10S)
- Total Blocking Time Final (tbtFinal)

Performance tracking is enabled by passing performancePlugin instance to `trackerPlugins` is initialization funciton argument, You can specific the trackers you would like the tracking data be sent to in `sendTo` otherwise the data will be sent to all trackers.

```javascript
import * as SpringloadAnalytics from 'springload-analytics';
const { performancePlugin } = SpringloadAnalytics;

SpringloadAnalytics.init({
  trackerPlugins: [
    // ...other tracker plugins
    performancePlugin({
      sendTo: ['google-analytics'],
    }),
  ],
});
```

## API Reference

### Configuration

After initialization with config, the core API is exposed & ready for use in the application.

| Option             | Default     | Description                                                                                                                                |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| trackerPlugins     | `[]`        | The tracker plugins                                                                                                                        |
| debug              | 'false'     | Whether open debug mode                                                                                                                    |
| separator          | '&#x7c;'    | The charactor used to separate the content of `data-analytics` attribute into tracking variables `category`, `event`, `label` and `value`. |
| trackableAttribute | 'analytics' | The attribute name following `data-` attached to the trackable elements.                                                                   |
| trackableEvent     | 'click'     | The event need to be tracked on trackable elements.                                                                                        |
| payloadKeys        | `[]`        | The property keys array that related to the values in the same sequence in trackable attribute separated by separator.                     |

```javascript
SpringloadAnalytics.init({
  separator: ":"
  trackableAttribute: "sp-analytics",
  trackableEvent: "hover",
  payloadKeys: ["label", "data"]
});
```

### Page

Trigger page view measurement calls in Google analytics.

**Arguments:**

- [data] (optional) PageData - Page data overrides.
- [options] (optional) Object - Page tracking options
- [callback] (optional) Function - Callback to fire after page view call completes

```javascript
// Basic page tracking
SpringloadAnalytics.page();

// Page tracking with page data overrides
SpringloadAnalytics.page({
  url: 'https://google.com',
});

// Fire callback with 1st, 2nd or 3rd argument
SpringloadAnalytics.page(() => {
  console.log('do this after page');
});

// Send pageview to only to specific analytic tools
SpringloadAnalytics.page({}, ['google-ana']);
```

## Custom tracking

Custom targeted tracking you can specify event data by populating the data-analytics attribute with pipe (|) separated values.

```javascript
SpringloadAnalytics.setupTrackables({
  event: 'Link click',
  payloadKeys: ['category', 'label', 'value'],
});
```

```html
<!-- E.g. Use custom category, custom label and a custom value -->
<a data-analytics="Top navigation|Homepage link|1" href="/">Home</a>

<!-- E.g. Use custom label only -->
<a data-analytics="|Homepage link" href="/">Home</a>

<!-- E.g. Use custom value only -->
<a data-analytics="||1" href="/">Home</a>

<!-- E.g. Use custom category and custom label only -->
<a data-analytics="UI Elements|Show data" href="#">Show</a>

<!-- E.g. Use custom category and custom value only -->
<a data-analytics="UI Elements||1" href="#">Show</a>

<!-- E.g. Custom track a group of elements with custom category and event -->
<div data-analytics="Top navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about-us/">About us</a></li>
    <li><a href="/contact-us/">Contact us</a></li>
  </ul>
</div>
```

## Tracking dynamically

You can track within a JavaScript file by calling the track method, just specify the event and pass the event data which will be sent to trackers:

```javascript
// Specify event and payload.
SpringloadAnalytics.track(event, {
  label,
  value,
  category,
});

// Specify the trackers that will receive the payload, by default it'll be sent to all tracker.
SpringloadAnalytics.track(
  event,
  {
    label,
    data,
  },
  ['tec']
);
```

## Setup additional trackable elements on the fly

You can set up additional/alternative trackable elements on the fly by calling `setupTrackables`:

```javascript
SpringloadAnalytics.setupTrackables({
  trackableAttribute: 'google-analytics',
  trackableEvent: 'mouseenter',
  separator: ':',
  event: 'hover read more',
  payloadKeys: ['page', 'section'],
  sendTo: ['google-analytics'], // Not specific it will send to all trackers
});
```

The markup for this example would be:

```html
<div data-google-analytics="home:header">
  <span>Read more</span>
</div>
```
