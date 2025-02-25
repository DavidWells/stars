---
repo: balmbees/overwatch
url: 'https://github.com/balmbees/overwatch'
homepage: null
starredAt: '2024-12-27T06:30:50Z'
createdAt: '2016-08-03T08:04:54Z'
updatedAt: '2024-12-27T06:30:50Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:36.839Z'
description: Overwatch our infrastructure
tags: []
---

# OVERWATCH

Topology Based Monitoring Tool

[![Build Status](https://travis-ci.org/balmbees/overwatch.svg?branch=master)](https://travis-ci.org/balmbees/overwatch)
[![Code Climate](https://codeclimate.com/github/balmbees/overwatch/badges/gpa.svg)](https://codeclimate.com/github/balmbees/overwatch)
[![Coverage Status](https://coveralls.io/repos/github/balmbees/overwatch/badge.svg)](https://coveralls.io/github/balmbees/overwatch)

## What's this for?

At Vingle, we wanted really simple monitoring tool that shows big picture of our system
and at the same time shows the really simple status of each service components.
we originally thought that would be really helpful to

1. Monitor the major service outage. (detailed performance is not really matter at this point)
2. Explain the service architecture, the big picture to newbies
3. When some of our service components goes wrong, know which service will get effected
  - ex) RDS down
      - API (&#128308;)
      - iOS App (&#128308;)
      - Android App (&#128308;)
      - Web App (&#127765;)
      - User Tracking (&#128309;)
4. Put detailed monitoring / tracking tool links in one place (Sentry, NewRelic...)

## Concepts

## Watchers
Currently, we supports
- HTTPWatcher
- CloudwatchAlarmWatcher
- DummyWatcher

## Notifiers
Currently, we supports
- SlackNotifier
- SnsNotifier (AWS SNS)

## Road Map

1. Build basic Component / Service Monitoring Tool
  - Support AWS CloudWatch based monitoring
  - Support Slack Notification Adapter
2. Build service status history feature
3. Build login feature (With Google Account)  

this project used skeleton of https://github.com/kriasoft/react-starter-kit
and inspired by great monitoring tool project such as https://github.com/arachnys/cabot about status / alert structure,
and https://github.com/NagiosEnterprises/nagioscore for some concepts

## Screenshots
<div>
  <img src="https://cloud.githubusercontent.com/assets/2001792/17886474/da3c3768-695c-11e6-8668-15e08082c8ae.png" width="45%" height="auto" />
  ||
  <img src="https://cloud.githubusercontent.com/assets/2001792/17886475/db930bf0-695c-11e6-8373-2ad14f653003.png" width="45%" height="auto" />
</div>
