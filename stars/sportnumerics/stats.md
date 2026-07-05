---
repo: sportnumerics/stats
url: 'https://github.com/sportnumerics/stats'
homepage: null
starredAt: '2017-10-17T16:10:58Z'
createdAt: '2016-12-05T05:09:59Z'
updatedAt: '2023-03-12T20:13:48Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:37.581Z'
description: Collects statistics
tags: []
---

# sportnumerics stats

![build status](https://lambci-buildresults-rz3fnx4hrqc8.s3.amazonaws.com/gh/sportnumerics/stats/branches/master/0beb9e598640f026b1d11f3708cfa963.svg)

This application collects stats from the NCAA stats website (stats.ncaa.org) and shoves them into a dynamo DB database for consumption by the rest of the sportnumerics stack.

The sportnumerics stack looks a bit like this:

    +---------------+
    |     stats     |
    +-------+-------+
            |
            v
    +-------+-------+
    |    predict    |
    +-------+-------+
            |
            v
    +-------+-------+
    | explorer-api  |
    +-------+-------+
            |
            v
    +-------+-------+
    |   explorer    |
    +---------------+

Where the arrows represent data flow through the system (to some extent).

There is a bit more complexity in that stats, predict, and explorer-api all talk to the same database which manages the list of teams, and games (eek, bad practice, I know, but it's simpler that way).

## Getting Started

If you want to run this locally, you can clone the repo, install the dependencies, and run the tests:

    npm install
    npm test

At this point there isn't really a way to run the lambda code locally, so you'll need an AWS environment to spin up the stack into in order to test it.

If you have your AWS environment variables set up (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, etc...) then (after installing the dependencies, as above) you should be able to deploy using the npm deploy command

    npm run deploy

This command wraps the serverless framework deploy command and deploys a dev stage into your AWS environment.
