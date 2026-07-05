---
repo: ariya/berkala
url: 'https://github.com/ariya/berkala'
homepage: ''
starredAt: '2021-08-06T01:31:47Z'
createdAt: '2021-08-04T04:58:29Z'
updatedAt: '2022-08-12T17:08:15Z'
language: JavaScript
license: MIT
branch: main
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.023Z'
description: Run scheduled tasks
tags: []
---

# Berkala

[![GitHub license](https://img.shields.io/github/license/ariya/berkala)](https://github.com/ariya/berkala/blob/main/LICENSE)
[![Tests](https://github.com/ariya/berkala/workflows/Tests/badge.svg)](https://github.com/ariya/berkala/actions)

Berkala runs scheduled tasks specified in a YAML-based configuration.

To get started, first download the binary for your operating system from the [Releases page](https://github.com/ariya/berkala/releases). Unpack the ZIP file and run the executable.

Since a config file does not exist yet, you will be offered to create one.
Simply accept it and `berkala.yml` will be created, which may look like the following:

```yml
tasks:

  # Without an explicit interval, the task runs immediately
  boot:
    steps:
    - notify: Berkala starts now

  stay-hydrated:
    interval: every 1 hour
    steps:
    - notify: Drink some water! # TODO: how much?
    - print: Reminder was sent

  lunch:
    interval: at 11:58am
    steps:
    - notify: It's lunch time very soon
      title: Important
    - say: Get ready for lunch

  sign-of-life:
    interval: every 2 hours
    steps:
    - run: ping -c 7 google.com
      timeout-minutes: 2

  weekend-exercise:
    cron: 0 9 * * 6  # every 9 morning on Saturday
    steps:
    - notify: Time for some exercises!
      title: Stay healthy
```
Just like any regular YAML, everything from the `#` character until the end of the line will be ignored. Use this to insert comments.

The schedule for each task can be specified as:
* [a human-friendly interval](https://breejs.github.io/later/parsers.html#text),  e.g. `every 5 minutes`, `at 5pm`, or
* [a cron expression](https://crontab.guru/), e.g. `0 9 * * 6`

If neither is explicitly stated, then the task runs right away.

Each task consists of one or more steps.

Every step must be one of the following:

<details><summary><code>run</code>: executes a shell command</summary>

Example:
```yaml
  sign-of-life:
    interval: every 30 minutes
    steps:
    - run: ping -c 7 google.com
```
Optionally, `timeout-minutes` can be used to limit the execution time and `working-directory` can be used to set the directory to start the execution from.

Another example:
```yaml
  sys-resource:
    interval: every 2 hours
    steps:
    - run: |
        date >> resources.log
        top | head -n 4 >> resources.log
      timeout-minutes: 3
      working-directory: /var/log
```

</details>


<details><summary><code>print</code>: displays a message to the standard output</summary>

Example:
```yaml
  morning:
    interval: at 7:00am
    steps:
    - print: Good morning!
```

</details>

<details><summary><code>notify</code>: sends a desktop notification</summary>

Optionally, `title` can be used to set the notification title.

Example:
```yaml
  mahlzeit:
    interval: at 11:58am
    steps:
    - notify: It's lunch time very soon
      title: Yummy
```

The notification is supported on the following system:

* Windows: [Windows.UI.Notifications](https://docs.microsoft.com/en-us/uwp/api/windows.ui.notifications.toastnotification) via [Powershell scripting](https://docs.microsoft.com/en-us/powershell/scripting)
* macOS: `display notification` with [AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html)
* Linux: [notify-send](https://www.commandlinux.com/man-page/man1/notify-send.1.html), e.g. part of `libnotify-bin` package on Debian/Ubuntu

</details>

<details><summary><code>say</code>: converts text to audible speech</summary>

Example:
```yaml
  vaya-con-dios:
    interval: 0 17 * * 1-5  # every workday late afternoon
    steps:
    - say: Time to go home
```

The text-to-speech conversion is supported on the following system:

* Windows: [System.Speech.Synthesis](https://docs.microsoft.com/en-us/dotnet/api/system.speech.synthesis) via [Powershell scripting](https://docs.microsoft.com/en-us/powershell/scripting)
* macOS: `say` with [AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html)
* Linux: [Festival speech synthesis](https://www.cstr.ed.ac.uk/projects/festival/), e.g. `festival` and `festvox-kallpc16k` on Debian/Ubuntu

</details>

Found a problem or have a new idea? File [an issue](https://github.com/ariya/berkala/issues)!

<details>
<summary>Alternative way to run Berkala (with Node.js)</summary>

With [Node.js](https://nodejs.org/) v14 or later (that has [npx](https://www.npmjs.com/package/npx)):

```bash
npx @ariya/berkala
```

To run the development version, check out this repo and then:

```bash
npm install
npm start
```

[![npm version](https://img.shields.io/npm/v/@ariya/berkala)](https://www.npmjs.com/package/@ariya/berkala)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ariya/berkala.svg)](https://bundlephobia.com/result?p=@ariya/berkala)

</details>
