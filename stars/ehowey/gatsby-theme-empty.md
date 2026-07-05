---
repo: ehowey/gatsby-theme-empty
url: 'https://github.com/ehowey/gatsby-theme-empty'
homepage: ''
starredAt: '2020-08-22T15:31:15Z'
createdAt: '2020-08-21T18:09:56Z'
updatedAt: '2024-06-21T06:11:11Z'
language: JavaScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: true
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:39.307Z'
description: >-
  An empty template for a lightning fast Gatsby themes monorepo setup. Ready to
  be filled up with awesomeness!
tags:
  - gatsby
  - gatsby-themes
  - gatsbyjs
---

<p align="center">
    <img alt="Gatsby Theme Empty" src="https://www.erichowey.dev/images/empty-logo.png" width="400" />
</p>

<h3 align="center">A template for a <i>lightning fast</i> setup of a Gatsby themes monorepo</h3>

<hr/>

I took everything I have learned from managing a complex Gatsby themes monorepo and distilled it down to a lightning fast template you can use to setup your own Gatsby themes monorepo with Yarn workspaces, Lerna, Cypress, GitHub actions, and Depedabot **all preconfigured**.

## Prerequisites

The following tools should already be installed in your local dev environment for this to work. Odds are you already have these tools installed with the possible exception of Yarn. You can follow the [Yarn install instructions](https://classic.yarnpkg.com/en/docs/install/) if you need to before proceeding.

- Gatsby CLI
- Yarn
- NPM (with account if you want to publish the theme)

## Lightning start

This might look like a lot of steps - but I just broke it down into detailed steps. The two key parts are creating a new repo using this template and then running a find and replace in your code editor of choice replacing `empty` with your theme name of choice.

1. Click `Use This Template` and create a new repo for your project from this template.

1. `git clone` your project and open it in your code editor of choice.

1. Find and replace `empty` with your theme's new name. For example if your theme name was going to be `gatsby-theme-kickoff` you would find and replace `empty` -> `kickoff`.

1. Update fields such as author, description, etc in the `package.json` for the theme and starter. The package name should already be updated via the previous step.

1. Update the folder names for the theme and starter. For example; from `gatsby-starter-empty` and `gatsby-theme-empty` to `gatsby-starter-kickoff` and `gatsby-theme-kickoff`.

1. Run `yarn install` to setup yarn workspaces

1. Make an initial commit to GitHub with all of your changed names and folders. You should see the smoke test run on your push to the main branch.

1. Run `lerna init` to initialize Lerna

1. Run `yarn develop:kickoff` to ensure it is building

1. Create something amazing.

1. When you are ready run `lerna publish` and share it with the world on NPM.

1. Login to Netlify, point it at your Git repo and launch it! It will automatically build and deploy the starter.

## Commands

The syntax for yarn workspaces is long and the following scripts are setup to make it easier to run commands in your starter.

**yarn develop:theme-name**: Runs `gatsby develop` on your starter.

**yarn build:theme-name**: Runs `gatsby build` on your starter.

**yarn serve:theme-name**: Runs `gatsby serve` on your starter.

**yarn clean:theme-name**: Runs `gatsby clean` on your starter.

**yarn test:theme-name**: Uses start-server-and-run to start and Gatsby develop server and then open Cypress.io for running end-to-end tests.

## What's inside

- An ultra-minimalist [Gatsby](https://www.gatsbyjs.com/) theme and starter preconfigured to work in unison using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).
- [Cypress.io](https://www.cypress.io/) preconfigured with a basic smoke test and an accessibility audit test (with [cypress-axe](https://github.com/avanslaars/cypress-axe)). Try running `yarn test:theme-name` and see what happens.
- [Lerna](https://github.com/lerna/lerna) preconfigured to manage publishing packages to NPM.
- GitHub action preconfigured for CI to run a smoke test on every pull request and push to the main branch.
- [Dependabot](https://docs.github.com/en/github/administering-a-repository/keeping-your-dependencies-updated-automatically) to manage any outdated dependencies.
- [Netlify](https://www.netlify.com/) config to automatically build and deploy the included starter

## FAQ

1. **Where is the demo?:** There is no demo. There is nothing to show really. It is a blank page with a title, a couple of lines of text and that is it. Nothing fancy to look at but an "empty" page where you can create something amazing! My hope was that there would be a _very_ minimal amount of work for you to undo before getting going.

1. **Why are the tests failing in this repo?:** They are failing in this repo because it is a template and does not include a yarn.lock file. If you follow the instructions above your tests will start passing once you commit to GitHub because you will generate a new a yarn.lock file when running the install process.

1. **Do I need to publish to NPM?:** No! But this repo is setup assuming that at some point you will want to publish either a private or public theme. Note that Netlify deploys will not work properly until you publish the theme.

1. **Why isn't Netlifying build succeeding?:** There are two main reasons this could be happening. Are you sure that you renamed your folders properly following the instructions above? Is the theme published on NPM (Netlify will build from the NPM version)?

1. **Why is this theme so, bare, there is almost nothing here?:** The only opinions this repo has are about the tooling (e.g. Workspaces, Cypress and Dependabot) that I have found are helpful for building Gatsby themes. You have to choose how you are going to build your site and install all the necessary plugins and packages necessary to this. If you want a more opinionated and complete set of themes, checkout my other project, [Gatsby Theme Catalyst](https://github.com/ehowey/gatsby-theme-catalyst).

## What's next

One other integration you may want to consider, depending on how you will be using Gatsby themes, is adding a GitHub action to publish your starters to their own repo. Check out [actions-push-subdirectory](https://github.com/johno/actions-push-subdirectories) for instructions on how to do this. This is necessary for your starters to work properly with the `gatsby new` command as they need to be in an indepedent repo.

If you want to see a more advanced version of this monorepo setup you can checkout [Gatsby Theme Catalyst](https://github.com/ehowey/gatsby-theme-catalyst) which uses these same tools across a repository with over 10 interlinked themes.
