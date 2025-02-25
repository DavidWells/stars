---
repo: orchestrated-io/orcs-design-system
url: 'https://github.com/orchestrated-io/orcs-design-system'
homepage: 'https://styleguide.orchestrated.io'
starredAt: '2018-11-21T05:00:39Z'
createdAt: '2018-08-28T00:24:28Z'
updatedAt: '2025-02-25T00:03:40Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:01.926Z'
description: TeamForm Design System - ORCS
tags:
  - design-system
  - orcs
  - react
  - storybook
  - styled-components
  - styled-system
  - teamform
---

# ORCS: TeamForm's Design System

## featuring Styled System + Styled Components

[GitHub repository](https://github.com/orchestrated-io/orcs-design-system) | [Deployed on GitHub Pages](https://orchestrated-io.github.io/orcs-design-system/)

[![npm version](https://badge.fury.io/js/orcs-design-system.svg)](https://badge.fury.io/js/orcs-design-system) ![GitHub last commit](https://img.shields.io/github/last-commit/orchestrated-io/orcs-design-system) [![GitHub license](https://img.shields.io/github/license/orchestrated-io/orcs-design-system.svg)](https://github.com/orchestrated-io/orcs-design-system/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Forchestrated-io%2Forcs-design-system.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Forchestrated-io%2Forcs-design-system?ref=badge_large)

## Getting Started

Clone repository:

```
git clone https://github.com/orchestrated-io/orcs-design-system.git
```

Install dependencies:

```
npm install
```

### Run the ORCS Storybook

Start the ORCS development server:

```
npm run storybook
```

A new browser window will open with a random localhost port. ORCS runs [Storybook 7](https://github.com/storybookjs/storybook/releases).

## Working with ORCS

All library components and files are located in `/lib`. Static files are located in `/assets`.

### Viewing changes in PM / TD.

As an alternative to `npm link` you can run `npm run dist` and then copy the `es` folder directly into TD or PM:

`cp -R es/ ../../../team-directory/node_modules/orcs-design-system/`

**_This has now been been made easier with using Nodemon and a custom script. Read on for how to set this up._**

### Working with orcs locally (hot reloading).

1. `cp .env.example .env`
2. OPTIONAL: Update `WORKING_DIR` in `.env` if orcs resides in a different working directory to your project. Else-wise Orcs will assume the project is one level up from itself.
3. Add any projects to `CONSUMERS` in `.env` separated by ',' e.g. `CONSUMERS=my-app,your-app,our-app`
4. IF APPLICABLE: Add the following to your webpack configuration

```
...
snapshot: {
    managedPaths: [/^(.+?[\\/]node_modules)[\\/]((?!orcs-design-system)).*[\\/]*/]
}
...
```

5. Run `npm run dev`.

Now you can make any changes in orcs and it will build and then copy the es from the build into your project's node_modules. Run `npm install` in your project dir if you want to revert to the npm installation.

### Symlinking with `npm link`

##### We haven't had much success with this recently

If you need to do `npm link` in your local environment you might encounter the following issues:

- https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
- https://github.com/styled-components/styled-components/issues/2379

Both react and styled-components cause duplicate instance issue after npm link, to fix that we need to ensure both app project and lib project are sharing the same instance of them.

In `orcs-design-system` folder:

```
npm link {PATH_APP_REPO}/node_modules/react
npm link {PATH_APP_REPO}/node_modules/styled-components
npm link
```

In `{PATH_APP_REPO}`:

```
npm i orcs-design-system
npm link orcs-design-system
npm start
```

### Testing

```
npm run test
```

### Publishing changes

In order to publish a new version, you will have to patch and push your changes.
After your changes have been merged to master, from your master branch:

```
npm version patch
git push
```

### Deploying to GitHub Pages

ORCS automatically deploys to GitHub Pages when a new version is published. To manually deploy:

```
npm run deploy-storybook
```

## Using ORCS in a project

In your project's root, install ORCS and styled-components:

```
npm i orcs-design-system
npm i styled-components
```

### Using components

Once ORCS is installed, you can directly import components. For example, for `Box`:

```
import { Box } from "orcs-design-system"
...
<Box>
...
</Box>
```

The [ORCS Storybook](https://orchestrated-io.github.io/orcs-design-system) contains documentation for each component, including code examples and props tables.

For components with subcomponents, each subcomponent must be imported. For example, to use `Tabs`:

```
import { TabsContainer, Tab } from "orcs-design-system"
```

### Using Styled System props

The design system components are built with [Styled System](https://styled-system.com/) props. Generally, components can access the `space` and `layout` prop categories, with additional prop categories on a per-component basis. Check the _Properties_ section in a component's documentation to see what props it can use. Custom props will be listed in the props table.

As a guide to using these props, see the [Styled System reference table](https://styled-system.com/table).

The design system's theme scales are contained in [systemtheme](https://github.com/orchestrated-io/orcs-design-system/blob/master/packages/orcs-design-system/lib/systemtheme.js).

You may also find it useful to install the following Styled System utilities: theme-get and css.

```
npm i @styled-system/theme-get
npm i @styled-system/css
```

### Theming

This design system uses styled-components `ThemeProvider` and comes with a default theme, `systemtheme` that uses styled-system arrays. To apply the theme to your app, you can use `systemtheme` or your own theme object.

```
import { ThemeProvider } from "styled-components"
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>
```

Variables can be referenced using `theme.arrayName.variableAlias`. When using Styled System props, components refer to the theme field associated with the prop as set out in the [reference table](https://styled-system.com/table).

### Using icons

You will need to add the icon library that we are using (which is Font Awesome). To do this, install the Font Awesome packages:

```
npm i @fortawesome/react-fontawesome
npm i @fortawesome/fontawesome-svg-core
npm i @fortawesome/free-regular-svg-icons
npm i @fortawesome/free-solid-svg-icons
```

Then add this to the top of your root app file:

```
import { library } from '@fortawesome/fontawesome-svg-core'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(far, fas);
```

Alternatively, you can use the full icon packages if you purchase Font Awesome Pro license.

Once you have purchased a license you need to add your Font Awesome NPM token as an environment variable in a .npmrc file at the root of your app in the following format:

```
@fortawesome:registry=https://npm.fontawesome.com
//npm.fontawesome.com/:_authToken=FONT_AWESOME_NPM_TOKEN_GOES_HERE
```

For further usage guidelines for the Icon component, [see the Icon docs](http://localhost:55322/?path=/docs/components-icon--default-icon).

## Sandbox environment for playing with orcs, via [playroom](https://github.com/seek-oss/playroom):

Playroom allows you to simultaneously design across a variety of themes and screen sizes, powered by JSX and your own component library.

Playroom allows you to create a zero-install code-oriented design environment, built into a standalone bundle that can be deployed alongside your existing design system documentation.

To run playroom, use this command: `npm run playroom`

## Browser/device support

This design system is intended to work correctly on all modern desktop and mobile browsers.

---

> "A design system is a living, funded product with a roadmap and backlog, serving an ecosystem." — Nathan Curtis

## Security vulnerability checks

The `audit-ci` command runs to detect any **high** and **critical** severity security vunerabilities. Currently this runs:

- as a part of the 'ci' github action before publishing a package (ci.yml)
- as part of the PR and push workflow (pr.yml)

This means we effectively stop the line for any high or critical security issues.

To run locally:

```
npm run audit-ci

```

or

```
npx audit-ci
```

This uses the default configuration file [audit-ci.json](audit-ci.json).

### Addressing security issues

More information on the specific vunerabilities can be found by adding the `--report` flag.

`npm run audit-ci -- --report`
or
`npx audit-ci --report`

The built in `npm audit` command provides a useful output too but will not use the [audit-ci.json](audit-ci.json) configuration file so `npm audit fix` will fix everything it can rather than a single vunerability.

You may find it easier to update issues invidually or by using `npm update DEP_NAME --depth nnn` or simlar.

### Allow list configuration

Presently we have a number of high-criticality security issues in the allow list (see [audit-c.json](audit-ci.json).

**TODO** Add more information on the allowed vunerabilities as comments in the config file.

### Strict mode checking

We have an additional 'strict' mode check that allows us to run a full audit including medium or low severity issues. With suitable user permissions, this can be run from a github action:

Triggering the GH action directly on a specific branch (including master):

```
gh workflow run security.yml --ref BRANCH_NAME

```

(add -f mode=notstrict to make it run the default audit-ci config if you wish)

Or locally:

```
npm run audit-ci:strict
```

This gives a fuller view of the vunerabilities relevant to the codebase.
