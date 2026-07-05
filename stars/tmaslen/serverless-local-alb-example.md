---
repo: tmaslen/serverless-local-alb-example
url: 'https://github.com/tmaslen/serverless-local-alb-example'
homepage: null
starredAt: '2019-11-19T21:42:31Z'
createdAt: '2019-11-19T21:04:03Z'
updatedAt: '2021-02-26T01:37:38Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:12.186Z'
description: >-
  Example starter project that runs ALB+Lambda locally and gives you a working
  serverless.yml file for deploying
tags: []
---

# Deployable and locally runnable ALB + Lambda Serverless example

Example project using the [serverless.com](https://serverless.com) framework that allows you to:

 * Locally run a lambda fronted by a application load balancer so you can develop and test without deploying.
 * Deploy that lambda and application load balancer, whole serverless.yml should JUST WORK, all you gotta do is add VPC and subnet details (your AWS account has a default one setup for you already).

This is still a work in progress, all feedback is welcome.

I've not found any examples that does these two things so I've made my own and leaving it here for you.

Come say hi on Twitter, I'm [tmaslen](https://twitter.com/tmaslen).

## Step 1: AWS account setup

Obvious fact: you need an AWS account for all this to work.

This is a list of everything you need before starting:

 * VPC setup with two subnets.
 * Local IAM account with the right amount of permissions given.
   * Easiest way to do this is to give that account full access.
   * You could use [this list of permissions instead](iam-policy.json) (this is probably wrong and so will update in future)

## Step 2: Install lots of things

 * `git clone git@github.com:tmaslen/serverless-local-alb-example.git`
 * `cd serverless-local-alb-example`
 * `npm install -g serverless`

## Step 3: Run it locally

 * `serverless offlinealb --function handler`
 * Check it out via `0.0.0.0:3000/`

## Step 4: Deploy it

 * Add your VPC and subnet ID values into the file `[config/serverless.config.yml](config/serverless.config.yml)`
 * `serverless deploy`
 * Check it out online
