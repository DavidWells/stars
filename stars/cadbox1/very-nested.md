---
repo: cadbox1/very-nested
url: 'https://github.com/cadbox1/very-nested'
homepage: 'https://verynested.cadell.dev/'
starredAt: '2021-04-03T17:27:19Z'
createdAt: '2018-11-02T09:07:07Z'
updatedAt: '2022-07-22T05:02:28Z'
language: TypeScript
license: GPL-3.0
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:54.610Z'
description: Nested lists published on GitHub.
tags: []
---

# Very Nested

Infinitely nested lists published on GitHub.

## Packages

- `manager` - Create, edit and view your Very Nested GitHub repos.
- `viewer` - Render a Very Nested list from JSON data.
- `template` - The GitHub template that new Very Nested repos are created from.
- `website` - The Very Nested public website.
- `login` - A small package for generating a GitHub login link.

## Commands

- `yarn` - Install dependencies.
- `npm run deploy` - Version packages with Lerna and publish Viewer to NPM.
- `yarn bump` - Version all packages with Lerna. Called by `npm run deploy`..
- `yarn prepare` - Build dependencies like Viewer and Login so they can be used by other packages. Run automatically after `yarn` but sometimes isn't if `yarn` fails.
- `clean` - Delete previous builds.

## 💻 Running Locally

1. Install dependencies.

```
yarn
```

If it fails, you may need to run prepare manually afterwards.

```
yarn prepare
```

1. Start the manager development server.

```
cd packages/manager
yarn start
```

1. In another browser tab, login to GitHub in production at [https://verynested.cadell.dev/](https://verynested.cadell.dev/).
1. Open your browser tools, go to Application and copy the accessToken value.
1. In the tab for your local, open dev tools, go to console and set the access token.

```
localStorage.setItem("accessToken", "{PASTE_ACCESS_TOKEN_HERE}")
```

1. Refresh your local.

### Manager

Create, edit and view your Very Nested GitHub repos.

```
cd packages/manager
yarn start
```

Copy the `accessToken` from production Local Storage to login.

[Read more...](./packages/manager/README.md)

### Viewer

Render a Very Nested list from JSON data.

#### Storybook

You can develop the viewer in isolation using Storybook.

```
cd packages/viewer
yarn storybook
```

#### Watch Build

You can build the viewer in watch mode to have it reload into the Manager app.

Run this in separate terminal.

```
cd packages/package-template
yarn build-watch
```

[Read more...](./packages/viewer/README.md)

### Template

The GitHub template that new Very Nested repos are created from.

1. Build the Viewer.
1. Add this script tag to the template.

   ```
   <script
         src="../viewer/dist/index.umd.js"
         crossorigin
       ></script>
   ```

1. Run `serve` in the root.
   ```
   serve
   ```
1. Go to this url: [http://localhost:5000/packages/template/](http://localhost:5000/packages/template/).

## Technical Problems Solved

- GitHub OAuth with Netlify Functions
  - This includes setting up Netlify Dev so we can develop functions locally
  - Would have been nice if GitHub supported the implicit flow so we didn't need any server side code.
  - The Netlify Functions OAuth examples included the initial auth request but this doesn't work with the popup flow (instead of a redirect flow where you lose page state) since you would get the url asynchronously where popups are blocked because they require user interaction.
    - This meant moving the url generation to the client side.
      - The pouplar OAuth library I used doesn't work in the browser.
      - Created the request myself with the queryString library.
- Redux structure
  - This is the 3rd rewrite of the structure for the redux code.
    1. Used the spread operator for immutable reducers
    2. Replaced those with Immer and wrote a weird, OOP style, translator that felt very weird.
    3. Replaced that with Redux Toolkit (which uses immer), typescript and removed the translator in favour of some functional style functions.
- Building the viewer library
  - Initially used microbundle, which uses rollup underneath, and that worked great with the CRA manager app.
  - The standalone viewer uses unpkg to load the viewer so I needed the umd build to bundle the dependencies, otherwise I would have to add them to the standalone viewer and that didn't sound so great.
  - Microbundle fails to bundle the React-Hotkeys dependency for something and it's something to do with rollup that I think they're working on.
    - Tried a lot of combinations here with Rollup directly but I think it's an issue they're working on.
  - Switched to webpack for the umd build and that worked great.
    - I still kept microbundle around because it can create the modern and efficient module build for the manager app wheras webpack can't yet.
- Gatsby transpiles workspace packages whereas CRA doesn't
  - Gatsby tries to transpile and lint the built module which fails because it's a production build.
  - Originally I just made the versions mismatched but settled on adding an empty eslintrc to disable linting.
- To get netlify to build all the packages in the monorepo, I had to change the build command to cd to the root then cd back down to build the package.
  - There's still some weird stuff happening with regards to netlify dev on this one, see this ticket for more: https://github.com/netlify/cli/issues/859
