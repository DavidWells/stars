---
repo: styled-components/styled-components-website
url: 'https://github.com/styled-components/styled-components-website'
homepage: 'https://styled-components.com'
starredAt: '2020-04-23T06:10:54Z'
createdAt: '2017-04-10T15:11:30Z'
updatedAt: '2025-02-20T19:15:37Z'
language: MDX
license: MIT
branch: main
stars: 618
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:56.718Z'
description: The styled-components website and documentation
tags:
  - documentation
  - nextjs
  - preact
  - react
  - styled-components
---

# `styled-components.com`

The `styled-components` website. Built with Next.js, Preact and (of course) styled-components!

## Contributing

Thank you so much for wanting to contribute to the website! We could really use a hand at making it the best it can be, see [the issues](https://github.com/styled-components/styled-components-website/issues) for some ideas on what to do.

If you've never worked with the technologies used in this repo, here are some links that may help:

- [**Learn Next.js**](https://nextjs.org/learn)
- [Next.js documentation](https://github.com/vercel/next.js)
- [styled-components documentation](https://styled-components.com) (this very website!)

### Running locally

To develop the website locally, you'll want to run the development server:

```sh
# Download the repo
git clone https://github.com/styled-components/styled-components-website
# Enter the repo
cd styled-components-website
# Install the dependencies
yarn install
# Start local development
yarn dev
```

> Note: This requires Node.js and yarn to be set up locally, see [nodejs.org](https://nodejs.org) for more information.

### Updating the visual diffs

If you add a new section or materially change the website, it probably will trigger the image comparison diff snapshot to fail. These can be updated via:

```sh
yarn test -u
```

### Folder structure

This is what each folder correlates to:

```sh
styled-components-website
├── components/  # Shared components
├── pages/       # The actual pages, mostly containing layout; the directory directly correlates to the URL. (e.g. pages/docs/basics.js === styled-components.com/docs/basics)
├── sections/    # The content, written in Markdown
├── public/      # Assets
├── test/        # Tests
├── utils/       # Various utilities use across the site
└── vendor/      # Cached dependencies
```
