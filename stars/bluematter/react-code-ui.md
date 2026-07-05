---
repo: bluematter/react-code-ui
url: 'https://github.com/bluematter/react-code-ui'
homepage: null
starredAt: '2022-01-11T07:08:19Z'
createdAt: '2021-11-11T20:34:51Z'
updatedAt: '2023-05-04T14:39:28Z'
language: TypeScript
license: NA
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:22.354Z'
description: A react code ui that has animated typing similar to Stripe.
tags: []
---

# react-code-ui

A react code ui that has animated typing similar to Stripe.

![Screen Shot 2021-11-12 at 2 00 33 PM](https://user-images.githubusercontent.com/1669104/141539701-ba8ae9e3-90de-4596-a7ac-e9705829f81b.png)

# Motionbox · [![Twitter Follow](https://shields.io/twitter/follow/_motionbox?label=Follow)](https://twitter.com/_motionbox)

**At [Motionbox](https://motionbox.io), we’re building video editing tools to help companies and developers market their products/services.** This repository is one of many we have released as a gift to the open source community. You can find us using it in [production](https://motionbox.io/video-api).

## Installation

```sh
$ npm i react-code-ui
```

```sh
$ yarn install react-code-ui
```

## Examples

- https://codesandbox.io/s/small-glitter-k5ys9?file=/src/App.tsx

## Documentation

```tsx
import Code from "react-code-ui";
import "react-code-ui/dist/index.css";

const code = `await motionbox.render({
  template: 'ckdjfxars10960umm5vwfqi0q',
  data: {
    text1: ['Tech', 'Tutorials', 'WithTim'],
    text2: ['LEARN'],
    text3: ['CODE'],
    image1: {
      link: 'YOUR_IMAGE_URL'
    }
  }
});
`;

<Code code={code} />;
```

## TODOs

- Add support for more keywords
- Add support for more operators
- Add auto dropdown support like Stripe
- Add more testing for different code combinations
- Add support for more languages
- Add support for useful props


## Authors

- Michael Aubry ([@michaelaubry](https://twitter.com/michaelaubry)) - [Motionbox](https://motionbox.io)

## Community

- [Slack](https://join.slack.com/t/motionboxio/shared_invite/zt-nftkjp69-BYAD1dYoyT7z37o~3HmXJw) - To get involved with the Motionbox community, ask questions and share tips.
- [Twitter](https://twitter.com/_motionbox) - To receive updates, announcements, blog posts, and general Motionbox tips.

## License

Licensed under the Apache License 2.0, Copyright © 2021-present [Motionbox](https://motionbox.io).

See [LICENSE](./LICENSE) for more information.
