---
repo: smalltownheroes/bikini-girls-with-machine-guns
url: 'https://github.com/smalltownheroes/bikini-girls-with-machine-guns'
homepage: null
starredAt: '2016-07-26T13:50:11Z'
createdAt: '2016-03-18T13:10:16Z'
updatedAt: '2022-08-25T16:10:44Z'
language: CoffeeScript
license: NA
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:20.586Z'
description: Load tester that utilizes a Lambda function with PhantomJS
tags: []
---

	 ▄▄▄▄    ▄████ █     █░███▄ ▄███▓ ▄████
	▓█████▄ ██▒ ▀█▓█░ █ ░█▓██▒▀█▀ ██▒██▒ ▀█▒
	▒██▒ ▄█▒██░▄▄▄▒█░ █ ░█▓██    ▓██▒██░▄▄▄░
	▒██░█▀ ░▓█  ██░█░ █ ░█▒██    ▒██░▓█  ██▓
	░▓█  ▀█░▒▓███▀░░██▒██▓▒██▒   ░██░▒▓███▀▒
	░▒▓███▀▒░▒   ▒░ ▓░▒ ▒ ░ ▒░   ░  ░░▒   ▒
	▒░▒   ░  ░   ░  ▒ ░ ░ ░  ░      ░ ░   ░
	 ░    ░░ ░   ░  ░   ░ ░      ░  ░ ░   ░
	 ░           ░    ░          ░        ░
	      ░

# Bikini Girls With Machine Guns

## Remember this

Everything you have experienced in your entire life has brought you to this instant. All things are now possible in the limitless void of counter-actuality. All things that are knowable will be realized in this new dimension of Bikini Girls With Machine Guns.

## But what does it do?

Load tester that utilizes a Lambda function with PhantomJS

# Usage

Make sure you use node v0.10.36 before installing dependencies! Cuz the NodeJs version of AWS Lambda is lagging behind.

	nvm use v0.10.36

	npm install

	npm test

To locally run the lambda-function with a test SNS message (see test/data/lambda.json)

	grunt lambda_invoke

To package the lambda module for a certain environment: [development, staging or production]

	grunt lambda_package:development

To deploy to AWS Lambda

	grunt deploy:development

