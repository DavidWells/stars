---
repo: Vexilla/client-js
url: 'https://github.com/Vexilla/client-js'
homepage: null
starredAt: '2022-10-21T03:58:35Z'
createdAt: '2020-12-10T23:07:29Z'
updatedAt: '2025-01-19T09:25:09Z'
language: TypeScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:19.380Z'
description: null
tags: []
---

# Warning: Repo Archived

**This repo is archived. The latest functionality and newest versions of this SDK will be located in the main monorepo: https://github.com/vexilla/vexilla/tree/main/clients/js**

# Vexilla Client - JS/TS

This is the JS/TS client library for Vexilla, a static file based feature flag system.

## Getting Started

To get started is easy.

### Installation

Using npm or yarn, install the package. Typescript types are shipped with it.

```sh
npm install --save @vexilla/client
```

or

```sh
yarn add @vexilla/client
```


### Setup

You will need to create a Client within your app. This optionally takes in the `customInstanceHash` for use with gradual rollout.

After creation, call `fetchFlags`. This can be chained from the constructor since it returns the client instance.

```javascript
this.client = new VexillaClient({
  baseUrl: 'https://BUCKET_NAME.s3-website-AWS_REGION.amazonaws.com',
  environment: process.env.ENVIRONMENT,
  customInstanceHash: userId
});
this.client.getFlags('features.json');
```


### Usage

Use the created client to check if a feature `should` be on.

```javascript
client.should(FEATURE_NAME)
```


### Full Example

```javascript
import { VexillaClient } from '@vexilla/client';

export class FeatureFlagsService {
  private client;

  constructor() {
    this.client = new VexillaClient({
      baseUrl: 'https://BUCKET_NAME.s3-website-AWS_REGION.amazonaws.com',
      environment: process.env.ENVIRONMENT,
      customInstanceHash: userId
    });
    this.client.getFlags('features.json');
  }

  should(featureName) {
    return this.client?.should(featureName);
  }
}
```


## What are Feature Flags?

Feature flags are useful for enabling or disabling parts of your application without having to redeploy. In some cases such as mobile applications, the redeploy could take up to a week.

See more about them here:

- [https://featureflags.io](https://featureflags.io)
- [https://en.wikipedia.org/wiki/Feature_toggle](https://en.wikipedia.org/wiki/Feature_toggle)

Feature Flags are also a fundamental building block for things such as A/B testing.

## How does it work?

1. You configure the Config UI with your hosting credentials. These are stored in LocalStorage. Your credentials should have a limited scope of permissions.

2. You add environments to the Config UI.

3. Then you add features. These can be a toggle or a gradual rollout.

4. Then you upload the json to your static hosting provider. You can also download ot copy the JSON to your clipboard for other uses.

5. Your applications include a client library as a dependency and the client consumes the JSON config.

6. Finally your application uses the client you created to determine if a feature `should` be on.

## Contributing

## Support

If you are having issues, please open a Github Issue on the relevant repo. (client, app, docs, etc.).

## Sponsors

No sponsors yet. This could be a link and icon for **your** company here.

## LICENSE - MIT

Copyright 2021 Vexilla

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
ARE.
