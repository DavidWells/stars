---
repo: tylermcginnis/react-router-firebase-auth
url: 'https://github.com/tylermcginnis/react-router-firebase-auth'
homepage: ''
starredAt: '2015-03-12T23:36:35Z'
createdAt: '2015-02-15T05:47:24Z'
updatedAt: '2025-02-17T20:14:38Z'
language: JavaScript
license: NA
branch: master
stars: 728
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.074Z'
description: Example of how to have protected routes with Firebase and React Router.
tags:
  - firebase
  - javascript
  - protected-routes
  - react
---

# Auth with React Router V4 and Firebase V3
This is an example repo for authenticating with Firebase and React Router.

For more info, visit [Protected routes and authentication with React Router v4](https://tylermcginnis.com/react-router-protected-routes-authentication/)

*Using React 15.4.0, React Router 4, and Firebase 3.6.1*

#### Features:
* Protected Routes with React Router
* Register new users with Firebase
* Add new users to ```/users``` in your Firebase database
* Login/Logout Functionality
* Simple Boostrap UI

#### Instructions:
* Swap out the firebase config in ```config/constants``` with your own
* ```npm install```
* ```npm start```
* Visit ```localhost:3000```

#### Try it out in a [Docker](https://www.docker.com/) container:
* Run a container running the prod version: `docker run -p 8080:80 -d allthethings/react-router-firebase-auth`
* **Or** build a dev version, locally: `docker build -t react-router-firebase-auth .`
* Then run the image (listens for changes to src): `docker run -v "$(pwd)/src:/code/src" -p 3000:3000 -d --name react-router-firebase-auth react-router-firebase-auth`
