---
repo: mermaid-js/mermaid-live-editor
url: 'https://github.com/mermaid-js/mermaid-live-editor'
homepage: 'https://mermaid.live'
starredAt: '2023-11-21T08:13:25Z'
createdAt: '2019-11-21T20:31:36Z'
updatedAt: '2025-02-25T06:42:00Z'
language: TypeScript
license: MIT
branch: develop
stars: 4614
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:44.213Z'
description: >-
  Edit, preview and share mermaid charts/diagrams. New implementation of the
  live editor.
tags:
  - diagrams
  - mermaid
---

[![Mermaid Live Editor](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/2ckppp/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/2ckppp/runs) [![Join our Slack!](https://img.shields.io/static/v1?message=join%20chat&color=9cf&logo=slack&label=slack)](https://join.slack.com/t/mermaid-talk/shared_invite/enQtNzc4NDIyNzk4OTAyLWVhYjQxOTI2OTg4YmE1ZmJkY2Y4MTU3ODliYmIwOTY3NDJlYjA0YjIyZTdkMDMyZTUwOGI0NjEzYmEwODcwOTE) [![Netlify Status](https://api.netlify.com/api/v1/badges/27fa023d-7c73-4a3f-9791-b3b657a47100/deploy-status)](https://app.netlify.com/sites/mermaidjs/deploys)

# Contributors are welcome!

If you want to speed up the progress for mermaid-live-editor, join the slack channel and contact knsv.

# mermaid-live-editor

Edit, preview and share mermaid charts/diagrams.

## Features

- Edit and preview flowcharts, sequence diagrams, gantt diagrams in real time.
- Save the result as a svg
- Get a link to a viewer of the diagram so that you can share it with others.
- Get a link to edit the diagram so that someone else can tweak it and send a new link back

## Live demo

You can try out a live version [here](https://mermaid.live/).

## Docker

### Run published image

```bash
docker run --platform linux/amd64 --publish 8000:8080 ghcr.io/mermaid-js/mermaid-live-editor
```

### To configure renderer URL

When building set the MERMAID_RENDERER_URL build argument to the rendering
service.
Example:
Default is`https://mermaid.ink`.
Set to empty string to disable PNG and SVG links under Actions

### To configure Kroki Instance URL

When building set the MERMAID_KROKI_RENDERER_URL build argument to your Kroki
instance.
Default is `https://kroki.io`
Set to empty string to disable Kroki link under Actions

### To configure Analytics

When building set the MERMAID_ANALYTICS_URL build argument to your plausible instance, and MERMAID_DOMAIN to your domain.

Default is empty, disabling analytics.

### To enable Mermaid Chart links and promotion

When building set the MERMAID_IS_ENABLED_MERMAID_CHART_LINKS build argument to `true`

Default is empty, disabling button to save to Mermaid Chart and promotional banner.

### To update the Security modal

The modal shown on clicking the security link assumes analytics, renderer, Kroki
and Mermaid chart are enabled. You can update it by modifying `Privacy.svelte`
if you wish.

### Development

```bash
docker compose up --build
```

Then open http://localhost:3000

### Building and running images locally

#### Build

```bash
docker build -t mermaid-js/mermaid-live-editor .
```

#### Run

```bash
docker run --detach --name mermaid-live-editor --publish 8080:8080 mermaid-js/mermaid-live-editor
```

Visit: <http://localhost:8080>

#### Stop

```bash
docker stop mermaid-live-editor
```

## Setup

Below link will help you making a copy of the repository in your local system.

https://docs.github.com/en/get-started/quickstart/fork-a-repo

## Requirements

- [volta](https://volta.sh/) to manage node versions.
- [Node.js](https://nodejs.org/en/). `volta install node`
- [yarn](https://yarnpkg.com/) package manager. `volta install yarn`

## Development

```sh
yarn install
yarn dev -- --open
```

This app is created with Svelte Kit.

## Release

When a PR is created targeting master, it will be built and deployed by Netlify.
The URL will be indicated in a Comment in the PR.

Once the PR is merged, it will automatically be released.
