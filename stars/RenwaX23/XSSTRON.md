---
repo: RenwaX23/XSSTRON
url: 'https://github.com/RenwaX23/XSSTRON'
homepage: ''
starredAt: '2021-02-06T02:19:11Z'
createdAt: '2021-01-26T17:29:21Z'
updatedAt: '2025-02-24T21:00:08Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 689
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:03.885Z'
description: Electron JS Browser To Find XSS Vulnerabilities Automatically
tags: []
---


<h4 align=center>
  <br>
  <img width=150 src=https://i.imgur.com/QxUbGIP.png>
  <br>
  XSSTRON, Electron JS Browser To Find XSS Vulnerabilities
  <br><br><br>
</h4>

#### Powerful Chromium Browser to find XSS Vulnerabilites automatically while browsing web, it can detect many case scenarios with support for POST requests too

### Installation
```
Install Node.js and npm (https://www.npmjs.com/get-npm) or (sudo apt install npm)
Download this repo files or (git clone https://github.com/RenwaX23/XSSTRON)
cd XSSTRON
npm install
npm start
```
Some users using Debian/Ubuntu might not able to run the tool as i think it's an issue with Electron itself, you can continue using the app in Window/OSX and Linux installed on Windows. Check [Known Issues](https://github.com/RenwaX23/XSSTRON#known-issues)

### Usage
**Just browse the web like a normal web browser then it will automatically look for XSS vulns in background and show them in a new window with POC**

![](https://i.imgur.com/W6guvyw.png)
![](https://i.imgur.com/QNnzC0h.png)

### GET request POC
![](https://i.imgur.com/ekFafmU.png)

### POST request POC
![](https://pbs.twimg.com/media/EsaEPwiXIAEdXIQ?format=jpg&name=large)

### Known issues

Some users in certain linux distributions get into some problems try these

Kali/Debian users this fixes installation:
```
sudo apt install npm
sudo npm install -g electron --unsafe-perm=true --allow-root
cd XSSTRON
sudo npm install
electron . --no-sandbox
```
- In (package.json) change it to:
```
  "devDependencies": {
    "electron": "^10"
  },
  ```
- Try to update npm and nodejs to latest version
- delete node_modules and package-lock.json and reinstall
- in package.json change the electron devDepencies to (electron11-bin)
- install electron using (npm install electron) and run the app with electron using (electron .)
with each step remember to delete the node_modules and package-lock.json and re install again using (npm install)

**Failed to serialize arguments** is known issue and might be fixed soon :)

### Thanks for
-   [electron-browser](https://github.com/pfrazee/electron-browser)
-   [Firing Range](https://public-firing-range.appspot.com/)
-   [Brute Logic](https://brutelogic.com.br/knoxss.html)
-   [Sapra](https://twitter.com/0xsapra)

