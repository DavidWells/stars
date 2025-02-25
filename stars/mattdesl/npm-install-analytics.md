---
repo: mattdesl/npm-install-analytics
url: 'https://github.com/mattdesl/npm-install-analytics'
homepage: ''
starredAt: '2019-09-13T23:24:03Z'
createdAt: '2015-07-12T16:59:06Z'
updatedAt: '2019-09-14T02:54:35Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.525Z'
description: add analytics to your own "npm install" usage
tags: []
---

# npm-install-analytics

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

<img src="http://i.imgur.com/qt1NL2x.png" width="70%" />

A simple solution to track your personal `npm install` usage, sending the data to Google Analytics.

Only tested in UNIX shells.

## Events

Only `install` and `uninstall` commands will send data to Google Analytics. The Event is sent with the following:

- **Category:** `'install'` or `'uninstall'`
- **Action:** the installed module name, like `'tape'` or `'http-server@latest'`
- **Label:** a save command if present: `'save'`, `'save-dev'`, `'save-optional'` or `'global'`

## Setup

#### 1. Google Analytics

If you already have an active tracking code for a website, you can skip this section.

First, set up a Google Analytics account and create a new property with its own UA Tracking ID.

<img src="http://i.imgur.com/87BkatU.png" width="70%" />

Copy the tracking ID in `Tracking Info > Tracking Code`. It will look like this:

```
UA-51572731-7
```

Now fork the following repo:

https://github.com/mattdesl/my-npm-analytics

Once forked, you can clone it or just edit `index.html` through GitHub's interface. 

We need to replace `YOUR_TRACKING_ID` in `index.html` with your ID, so that the line looks like this:

```js
ga('create', 'UA-51572731-7', 'auto');
```

After pushing to `gh-pages`, you should be able to view your static site:

http://YOUR_GITHUB_USERNAME.github.io/my-npm-analytics/

#### 2. Configuration

In your `$HOME` directory, create a `.npm-install-analyticsrc` file with the following, replacing your ID as we did earlier:

```json
{
  "id": "YOUR_TRACKING_ID"
}
```

For example, editing with vim:

```sh
cd ~/
touch .npm-install-analyticsrc
vim .npm-install-analyticsrc
```

#### 3. Install

Install this tool globally with a new version of Node and npm, like so:

```sh
npm install -g npm-install-analytics
```

Now running the following should silently send commands to your Google Analytics. You should see them appear in Real Time Events.

```sh
npm-install-analytics install tape --save-dev
```

#### 4. Alias

This step is optional. You can add the following alias to `~/.bash_profile` if you would like to alias the command:

```sh
alias npm='npm-install-analytics'
```

Now when you re-start bash, typing `npm install` will silently send information to your Google Analytics. Other commands, like `npm view`, should be unaffected.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/npm-install-analytics/blob/master/LICENSE.md) for details.
