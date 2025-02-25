---
repo: nikolaiwarner/tzfriends
url: 'https://github.com/nikolaiwarner/tzfriends'
homepage: ''
starredAt: '2021-03-11T02:49:00Z'
createdAt: '2021-02-26T13:43:44Z'
updatedAt: '2023-09-08T18:19:03Z'
language: JavaScript
license: NA
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:58.937Z'
description: >-
  a command line program to see what time your friends around the world are
  experiencing
tags:
  - cli
  - friends
  - timezones
---

<img width="346" alt="tzfriends-1 0 0" src="https://user-images.githubusercontent.com/40796/109318521-e49ee200-781b-11eb-97c1-c53e1ba3635b.png">

# tzfriends

a command line program to see what time your friends around the world are experiencing

## How to use

### Install

`npm i -g tzfriends`

### Set your location
`tzfriends --location <location>`

### Show the time for all friends now, your time
`tzfriends`

### Show the time for all friends at a certain time/date at your time
`tzfriends 7pm`

### See what time your friend is experiencing
`tzfriends 7pm --name <name>`

### Add a friend
`tzfriends add <name> <location>`

### Update a friend's location
`tzfriends set <name> <location>`

### Remove a friend
`tzfriends remove <name>`

### Toggle 12/24 hour clock 
`tzfriends -a <true|false>`

## Thanks!

Thanks to substack for the super cool tzloc!
