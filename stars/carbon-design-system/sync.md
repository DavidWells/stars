---
repo: carbon-design-system/sync
url: 'https://github.com/carbon-design-system/sync'
homepage: null
starredAt: '2020-10-10T23:14:41Z'
createdAt: '2018-01-03T16:33:06Z'
updatedAt: '2023-09-24T00:00:33Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:27.421Z'
description: Internal tool for keeping project repositories in sync
tags: []
---

# `@carbon/sync` [![Build Status](https://travis-ci.org/carbon-design-system/sync.svg?branch=master)](https://travis-ci.org/carbon-design-system/sync)

> Internal tool for Carbon maintainers to keep projects in sync.

## Usage

To begin, you will need to clone the repo to your computer by doing:

```bash
git clone git@github.com/carbon-design-system/sync.git
cd sync
```

You'll then need to install dependencies by using [Yarn](https://yarnpkg.com/en/) to run:

```bash
yarn install
```

Finally, you can run the main `sync` task by doing the following in your terminal:

```bash
# Export your personal GitHub Access token as an environment variable
export GH_TOKEN=XYZ
# Run the sync script
yarn sync
```

This will sync all the repos that are found [here](/src/data/github/repos.json).

## Project overview

```bash
.
├── README.md
├── package.json
├── src
│   ├── connectors          # How we make requests to providers like GitHub
│   │   ├── github
│   │   └── travis-ci
│   ├── data                # The source of truth for when we sync our projects
│   │   └── github
│   ├── index.js
│   ├── sync                # Defines the capabilities of what we can sync
│   │   ├── github
│   │   └── travis-ci
│   └── tools               # Useful tools for gathering or generating data
│       ├── getLabels.js
│       ├── getRepos.js
│       └── milestones.js
└── yarn.lock
```

The data that is used to find all the GitHub repos that we support is located [here](/src/data/github/repos.json). Inside of each repo, there is a `config` block where you can enable or disable specific features. For example, here is what a repo could look like:

```json
{
  "name": "carbon-elements",
  "owner": "IBM",
  "url": "https://github.com/IBM/carbon-elements",
  "config": {
    "travis": {
      "CLOUD_TOKEN": false,
      "NPM_TOKEN": false,
      "GH_TOKEN": false
    },
    "github": {
      "labels": true,
      "milestones": true,
      "protected": false
    }
  }
}
```

In this case, we have the repo at `IBM/carbon-elements` with a `config` block that says we should sync GitHub labels and milestons with this project.

The data that we use to sync all the repos is located [here](/src/data/github). Any changes to milestones or labels in there will be reflected the next time `sync` is ran.

### Tasks

There are a variety of tasks that you might want to run before sync'ing projects. The most common ones are fetching the most up-to-date list of repos for the Carbon Design System, in addition to getting the labels from a project that you know has the most up-to-date labels.

#### Fetching Repos

To fetch the current list of repos, you can run the following command:

```bash
# Export your personal GitHub Access token as an environment variable
export GH_TOKEN=XYZ
node src/tools/getRepos.js
```

#### Fetching Issues

To fetch the current issues from a specific repo, you can run the following command:

```bash
# Export your personal GitHub Access token as an environment variable
export GH_TOKEN=XYZ
node src/tools/getIssues.js IBM/carbon-components
```
