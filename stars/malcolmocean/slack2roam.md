---
repo: malcolmocean/slack2roam
url: 'https://github.com/malcolmocean/slack2roam'
homepage: null
starredAt: '2020-07-06T16:57:25Z'
createdAt: '2020-06-12T04:46:09Z'
updatedAt: '2024-03-03T22:53:15Z'
language: JavaScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:45.451Z'
description: Convert slack export JSON into RoamResearch import JSON
tags: []
---

Script for converting [Slack](https://slack.com) JSON into [Roam](https://roamresearch.com) import JSON.

Works as both a node module for use in other projects, as well as a command-line interface. The cli can be used in many diverse ways.

# As node module

## Install to your node project

```bash
npm install --save slack2roam
```

## Use it

```javascript
const slack2roam = require('slack2roam')
const users = [{
  id: "U0ABC123",
  name: "malcolmocean",
  real_name: "Malcolm Ocean",
}, {
  id: "U0DEF456",
  name: "conaw",
  real_name: "Conor White-Sullivan",
}]
const channel = {name: 'general'}
const messages = [{
    "type": "message",
    "text": "Hey it's a message in slack",
    "user": "U0ABC123",
    "ts": "1585242429.009300",
}, {
    "type": "message",
    "text": "Wow, here's another it's a message in slack!",
    "user": "U0DEF456",
    "ts": "1585893429.009300",
}]
const options = {uPageNameKey: 'real_name'} // defaults to 'name', ie username
slack2roam.makeUserMap(users)
const roamJson = slack2roam.slackChannelToRoamPage(channel, messages, options)
```

result:
```json {
  "title": "general",
  "children": [
    {
      "string": "[[March 26th, 2020]]",
      "children": [
        {
          "uid": "slack_general_1585242429_009300",
          "create-time": 1585242429093,
          "string": "[[Malcolm Ocean]] 13:07\nHey it's a message in slack"
        }
      ]
    },
    {
      "string": "[[April 3rd, 2020]]",
      "children": [
        {
          "uid": "slack_general_1585893429_009300",
          "create-time": 1585893429093,
          "string": "[[Conor White-Sullivan]] 01:57\nWow, here's another it's a message in slack!"
        }
      ]
    }
  ]
}
```

# As command-line script

## Install as a command-line tool

If you have NodeJS installed, npm comes with it. If not, [get it here](https://nodejs.org/en/download/).

```bash
npm install --global slack2roam
```

## Use it

The command-line tool expects the command to be run from a slack export folder that contains the following:

- `users.json`
- `channels.json`
- `general/`
  - `2020-06-11.json`
  - `2020-06-12.json`
  - _(other dates)_
- `random/`
- _(other channel folders)_

(It doesn't specifically expect `general/` and `random/`, those are just examples)

Once you're in that folder, you can just run this:

```bash
slack2roam -o roam_data.json
```

This will output to the file `roam_data.json`. If you omit the -o flag it will show you a preview in the console instead.

Each channel listed in `channels.json` gets its own page in roam.

If you want to provide options, add this flag with a JSON string

--options='{"uPageNameKey":"real_name", "workspaceName":"mycompany", "timeOfDayFormat": "ampm"}'

Importing in bulk is best as it will do optimal things with threading, but if you import stuff later that replies to earlier threads, then it will block reference them. This uses custom UIDs, which is the reason you might want to provide a `workspaceName` above, since slack's UIDs are probably only per-workspace and otherwise you could get a collision if you're importing from multiple workspaces. This is fairly unlikely, especially since slack2roam also puts the channel name into the UID.

# Areas for improvement

- custom timezone support
- handle edit timestamp better if date changed
- be better at reformatting text
- more command-line features, like specifying only one channel
- more options!

# Contributing

Ummm yeah hmu. I haven't done much managing of OSS projects but if you submit a pull request we can figure something out. Talk to me about it on Twitter [@Malcolm_Ocean](https://twitter.com/Malcolm_Ocean) as I don't check GitHub notifications much.

See [here](https://roamresearch.com/#/app/help/page/RxZF78p60) for Roam's JSON schema.

# Tip me 🤑

If this is hugely valuable to you, you can tip me [here](https://paypal.me/complice), or also go check out [my meta-systematic, goal-oriented productivity app, Complice](https://complice.co/?utm_source=github&utm_medium=readme&utm_campaign=slack2roam&utm_content=msgopa).
