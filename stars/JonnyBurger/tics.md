---
repo: JonnyBurger/tics
url: 'https://github.com/JonnyBurger/tics'
homepage: ''
starredAt: '2019-10-06T19:45:09Z'
createdAt: '2018-10-20T21:33:41Z'
updatedAt: '2024-12-19T18:36:00Z'
language: TypeScript
license: NA
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:18.211Z'
description: "\U0001F3A2 Simple self-hosted analytics ideal for Express / React Native stacks"
tags:
  - analytics
  - express
  - mongo
  - node
  - react-native
  - statistics
---

# 🎢  tics
> Simple self-hosted analytics ideal for Express / React Native stacks

## 🚥 Install

On both your frontend and backend, install the tics library.

```
npm i tics
```

## 🤹🏼‍  How it works
You mount an Express.js Router, accept requests to your server and save impressions in your database. `tics` also provides a frontend library to send impressions. 

## 🎛 Usage
### Backend

```js
const app = require('express');
const tics = require('tics/server');
const db = require('./mongo');

const {impressions, analytics, stats} = tics({
    db: db.collection('impressions')
});

// Use endpoints to receive impressions and retrieve stats
app.use('/telemetry', impressions);
app.use('/analytics', mustBeAdmin, analytics);

// Or use built-in functions to get stats
await stats.activeUsers.daily() // => 29
```

**tics()** takes a MongoDB database collection as an argument. Collections from `mongodb` and `then-mongo` drivers have been tested.

**tics()** returns an object with 3 items:

- `impressions` is an Express.js router that the frontend can call to collect telemetry data.
- `analytics` is an Express.js router that exposes a JSON API with analytics data. You should add some middleware to protect this router with some sort of authentication.
- `stats` is an object containing the following methods:
    - `stats.dau()` returns daily active users
    - `stats.wau()` returns weekly active users
    - `stats.mau()` returns monthly active users
    - `stats.userCount(filter)` counts users. You can add a mongo query to only count a subset of impressions.
    - `stats.platforms()` returns a breakdown of the different platforms. Example response: `[{id: 'ios', count: 1000, id: 'android', count: 2000}]`
    - `stats.languages()` returns a breakdown of the languages of the users devices. Example response: `[{id: 'de', count: 1000, id: 'en', count: 2000}]`
    - `stats.versions()` returns a breakdown of the different versions of the app. Example response: `[{id: '1.0.0', count: 200}, {id: '1.0.1', count: 400}, {id: '1.1.0', count: 4000}]`
    - `stats.contents()` returns a breakdown of the different contents that the analytics are tracking.
    - `stats.breakDown()` allows to break down a custom field similar to the breakdowns above
    - `stats.activityLevels` focus on breaking down the different interactions of one content.
        - `stats.activityLevels.byContentType` returns a breakdown of the impressions of the different contents. Example: `[{id: 'register-screen', count: 1000}, {id: 'article-page', count: '100'}]`
        - `stats.activityLevels.byContentId(content_id)` returns the breakdown of the different interactions with one entity of a content. Example reponse: `[{id: 'view', count: 20000, {id: 'click', count: 1000}, {id: 'conversion': 20}}]`,
    - `stats.db` provides raw access to make queries yourself

### Track from React Native / Expo / Web

```ts
import tics from 'tics';

const analytics = tics({endpoint: 'https://jonny.io/api/telemetry'});

tics.impression('https://jonny.io/api/telemetry', {
    content: 'ad',
    content_id: '3240978',
    level: 'view',
    platform: 'ios',
    identifier: '098324',
    language: 'de',
    version: '1.0.0'
})
.then(() => { /* ... */})
```

Pass as the `endpoint` parameter the URL where the `impressions` router is mounted. This is the host of your server plus the route of the impression router.

Returned is an object which contains: 

- `impression`: Makes an impression request to the server. Terminology:
    - `impression.content`: Type of content. For example `register-screen`, `ad`, `product`,
    - `impression.content_id` *optional*: Allows to distinguish between different entities of the same content type.
    - `impression.level`: Type of interaction. For example `view`/ `click`/ `conversion` for sales. Or `install` / `register` for tracking registration conversion. Default: `view`
    - `impression.platform` *optional*: Operating system of the device. React native client will try to figure it out itself if this option is omitted.
    - `impression.identifier` *optional*: Identifying string of the user. Multiple impressions by the same user get removed when calculating number of users. React native client will try to use native identifier when omitted.
    - `impression.language` *optional*: Language of user's device
    - `impression.version` *optional*: App version number. React Native client will try to find it when this parameter is omitted.
    
### Track sessions

Track sessions using React hooks. Pass a value for `isFocused` and it will automatically stop tracking if the user navigates away in React Native.

```ts
import {useTics} from 'tics';
import {useIsFocused} from '@react-navigation/native';

export const Comp = () => {
    const isFocused = useIsFocused();
    useTics(isFocused, 'https://jonny.io/api/telemetry', {
        content: 'ad',
        content_id: '3240978',
        level: 'view',
        platform: 'ios',
        identifier: '098324',
        language: 'de',
        version: '1.0.0'
    })
    return null;
}
```

## 👨🏻‍💻 Author

* [Jonny Burger](https://jonny.io)

## 🗒 License
MIT
