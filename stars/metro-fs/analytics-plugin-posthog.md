---
repo: metro-fs/analytics-plugin-posthog
url: 'https://github.com/metro-fs/analytics-plugin-posthog'
homepage: 'https://www.npmjs.com/package/@metro-fs/analytics-plugin-posthog'
starredAt: '2022-06-10T18:06:09Z'
createdAt: '2022-03-24T09:30:00Z'
updatedAt: '2025-01-02T08:29:03Z'
language: TypeScript
license: NA
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:42.493Z'
description: 'PostHog plugin for Analytics - https://github.com/DavidWells/analytics'
tags: []
---

# @metro-fs/analytics-plugin-posthog

## Important note for the initial release
If your project is using Typescript, you'll get an error when trying to use custom methods defined in this plugin: `Property 'posthog' does not exist on type 'Plugins'`.
Custom methods are working fine, base library needs a change in typing for the `plugins` array.  
You can track the issue [HERE](https://github.com/DavidWells/analytics/issues/266).

## What's that
This is a small plugin for [DavidWells/analytics](https://github.com/DavidWells/analytics) library. It handles all basic `analytics` library methods (`initialize`, `page`, `track`, `identify`, and `loaded`). Initially, we were adding selected custom methods that PostHog's API provides one by one (like `register`, `trackAndSet`, `trackAndSetOnce`, etc.), but it required releasing a new version with each change. Currently, we have exposed a scoped instance of PostHog itself; you can get it with `analytics.plugins.posthog.getPosthogInstance`.
## Installation
1. `npm i @metro-fs/analytics-plugin-posthog`
2. In `analytics` init, add PostHog in the plugins array. Example config:
```js
import Analytics from 'analytics';
import postHog from '@metro-fs/analytics-plugin-posthog';

const analytics = Analytics({
  app: 'example',
  plugins: [
    postHog({
      token: POSTHOG_TOKEN,
      enabled: true,
      options: {
        api_host: POSTHOG_API_HOST,
        debug: process.env.NODE_ENV === 'dev',
        persistence: 'memory',
        disable_cookie: true,
        disable_session_recording: true,
      },
    }),
  ],
});

export default analytics;
```

## Usage
Just use the analytics library as usually, e.g. `analytics.track(eventName, eventValue);`.  
If you want to use custom PostHog methods, use: `analytics.plugins.posthog.onFeatureFlags(this.onFeatureFlagsReady)`. Please remember about the TypeScript issue mentioned earlier.

### Identify
You can use default behavior of all Analytics plugins and then all user traits will
end up as `$set` property and `$set_once` will be empty.

Or you can manually specify `$set` and `$set_once`, that will override all other traits:

```js
analytics.identify(userId, {
  propertyName1: 'value1',
  propertyName2: 'value2',
  $set: {
    propertyName3: 'value2-overriden',
    propertyName4: 'value3',
  },
  $set_once: {
    propertyName5: 'value4',
  }
})
```

that will ignore `propertyName1` and `propertyName2` and send `$set` and `$set_once` directly
