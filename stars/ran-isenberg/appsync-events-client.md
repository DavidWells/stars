---
repo: ran-isenberg/appsync-events-client
url: 'https://github.com/ran-isenberg/appsync-events-client'
homepage: null
starredAt: '2024-12-06T21:15:37Z'
createdAt: '2024-11-16T05:59:29Z'
updatedAt: '2025-02-13T17:59:44Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:17.995Z'
description: AppSync Events frontend sample implementation
tags: []
---

# AppSync Events Client Demo

[![license](https://img.shields.io/github/license/ran-isenberg/appsync-events-client)](https://github.com/ran-isenberg/appsync-events-client/blob/master/LICENSE)
![JSSupport](https://img.shields.io/static/v1?message=Amplify&color=blue&style=flat-square&logo=javascript)
![version](https://img.shields.io/github/v/release/ran-isenberg/appsync-events-client)
![github-star-badge](https://img.shields.io/github/stars/ran-isenberg/appsync-events-client.svg?style=social)

This repository demonstrates how to use AWS AppSync's events feature to enable real-time messaging. The code showcases subscribing to an AppSync event channel and publishing messages to it, ideal for building real-time applications.

This demo is part of my blog post on [Using AWS AppSync for Real-Time Events](). *(Link to blog post coming soon)*.

Thanks Afik Grinstein for your contribution!

---

## How It Works

1. **Real-Time Subscriptions**: The app connects to an AppSync events channel and logs messages in real-time.
2. **Message Publishing**: Users can publish messages to the channel using the provided `publishEvent` function.
3. **API Key Authentication**: The AppSync API uses an API key for authentication.

---

## Prerequisites

- AWS AppSync API with Events enabled.
- An API key for the AppSync API for the 'default' channel.
- NPM installed.

---

## Setup and Usage

To get started, follow these steps:

1. Replace the placeholders for your API endpoint and API key in the code below:
   - **`<YOUR_APPSYNC_ENDPOINT>`**: Your AppSync API endpoint.
   - **`<YOUR_API_KEY>`**: Your AppSync API key.

```javascript
import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';

// Set your API endpoint and API key
Amplify.configure({
    "API": {
        "Events": {
            "endpoint": "https://<YOUR_APPSYNC_ENDPOINT>/event", // Replace with your AppSync API endpoint
            "region": "us-east-1", // Replace with your AWS region
            "defaultAuthMode": "apiKey",
            "apiKey": "<YOUR_API_KEY>" // Replace with your API key
        }
    }
});
```

2. Run:

```shell
npm install
npm run dev
```

3. Open the application in the localhost browser with Vite, and you can:
   - Receive messages published to the `/default/test` channel in real-time.
   - Publish messages to the same channel using the input field.
  
## Connect

- Email: [ran.isenberg@ranthebuilder.cloud](mailto:ran.isenberg@ranthebuilder.cloud)
- Blog Website [RanTheBuilder](https://www.ranthebuilder.cloud)
- LinkedIn: [ranisenberg](https://www.linkedin.com/in/ranisenberg/)
- Twitter: [RanBuilder](https://twitter.com/RanBuilder)

## License

This library is licensed under the MIT License. See the [LICENSE](https://github.com/ran-isenberg/appsync-events-client/blob/main/LICENSE) file.
