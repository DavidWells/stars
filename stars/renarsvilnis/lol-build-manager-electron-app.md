---
repo: renarsvilnis/lol-build-manager-electron-app
url: 'https://github.com/renarsvilnis/lol-build-manager-electron-app'
homepage: null
starredAt: '2016-04-30T05:12:58Z'
createdAt: '2015-08-21T13:16:50Z'
updatedAt: '2016-04-30T05:12:58Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:26.806Z'
description: >-
  Cross platform application built with help of Electron framework for the
  League of Legends build manager
tags: []
---

# lol-build-manager-electron-app
Cross platform application built with help of Electron framework for the League of Legends build manager. **Currently only works in OSX**.

### Developing
First things first, get yourself a League of Legends API key from [developer.riotgames.com](developer.riotgames.com).

```bash
# install all dependencies
npm install

# gulp watch that listen to file changes
API_KEY="<YOUR_API_KEY>" gulp

# in a another terminal tab to run the app without building and
# packaging the application
npm run start-app
```

### Testing
![Ain't nobody got time fo dat](http://images.akamai.steamusercontent.com/ugc/548633388689781205/C8FCD52B53C4D81510C5CE4DD8A8856890A714EB/)

But seriously, due to the tight time constraints for now there aren't any tests. Already feeling the pain of not having them.

### Publishing
```bash
# for building the application on OSX you need to have brew
# and through it install Wine, it is needed for Windows build
brew install wine
# it is very likely the installation for it will fail and you will be
# prompt to install xquartz, install it and then try again Wine
# it will take some time
brew install Caskroom/cask/xquartz

API_KEY="<YOUR_API_KEY>" npm run package
```

### TODO
Check [TODO.md](TODO.md)
