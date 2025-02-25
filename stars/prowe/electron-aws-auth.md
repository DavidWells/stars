---
repo: prowe/electron-aws-auth
url: 'https://github.com/prowe/electron-aws-auth'
homepage: null
starredAt: '2020-09-02T19:16:29Z'
createdAt: '2017-07-05T02:05:57Z'
updatedAt: '2021-03-11T06:47:50Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:36.760Z'
description: null
tags: []
---

# Command line AWS federated login

This project allows the use of AWS federated login to still obtain AWS access key / secrets for use in command line application and client code.

## Requirements

- [npm](https://www.npmjs.com)
- Unix-ish OS (tested on mac)

## Setup
1. Clone this repo into the location of your choice
    ```bash
    git clone git@github.com:prowe/electron-aws-auth.git
    ```
1. Run 
    ```bash
    npm install
    ```

## Usage
 Run the following command from a bash prompt to open a window, log you in and place the *AWS_ACCESS_KEY_ID*, *AWS_SECRET_ACCESS_KEY* and *AWS_SESSION_TOKEN* values into your current shell

 ```bash
 source login-aws-dev.sh
 ```

 Replace with the shell script for the AWS account you wish to login to.
