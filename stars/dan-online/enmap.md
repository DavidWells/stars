---
repo: dan-online/enmap
url: 'https://github.com/dan-online/enmap'
homepage: null
starredAt: '2022-12-09T01:42:37Z'
createdAt: '2022-11-25T13:05:30Z'
updatedAt: '2024-05-17T16:46:07Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:00:05.545Z'
description: Enhanced Map structure with additional utility methods.
tags: []
---

# Enmap - Enhanced Maps

<div align="center">
  <p>
    <a href="https://discord.gg/N7ZKH3P"><img src="https://discordapp.com/api/guilds/298508738623438848/embed.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/enmap"><img src="https://img.shields.io/npm/v/enmap.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/enmap"><img src="https://img.shields.io/npm/dt/enmap.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://www.patreon.com/eviecodes"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
  </p>
</div>

<div align="center">
  <p><img src="https://evie.codes/enmap-logo.svg" alt="Enmap Logo" />
</div>

Enhanced Maps are a data structure that can be used to store data in memory that can also be saved in a database behind the scenes.
These operations are fast, safe, and painless.

The data is synchronized to the database automatically, seamlessly, and asynchronously for maximum effectiveness.
The storage system used is an `sqlite` database which is fast, performant, can be easily backed up,
and supports multiple simultaneous connections.

## Documentation

* [Installation](https://enmap.evie.dev/install)
* [Basic Setup](https://enmap.evie.dev/usage)
* [API Reference](https://enmap.evie.dev/api)
* [Examples](https://enmap.evie.dev/complete-examples)

## Support

Support is offered on my official [Evie.Codes Discord](https://discord.gg/N7ZKH3P).

## FAQs

### Q: So what's Enmap?

**A**: Enmaps are the Javascript Map() data structure with additional utility methods. This started
as a pretty straight clone of the [Discord.js Collections](https://discord.js.org/#/docs/collection/main/class/Collection)
but since its creation has grown far beyond those methods alone.

### Q: What is "Persistent"?

**A**: By using a database layer with `better-sqlite3`, any data added to the Enmap
is stored not only in temporary memory but also backed up in a local database. This means that
when you restart your project, your data is not lost and is loaded on startup.

### Q: How big can the Enmap be?

**A**: The size of the memory used is directly proportional to the size of all the keys loaded in memory.
The more data you have, the more complex it is, the more memory it may use. You can use the
[fetchAll](https://enmap.evie.dev/usage/fetchall) option to reduce memory usage.

### Q: Who did you make this for?

**A**: Enmap was made specifically for beginners in mind. It's for you, the budding javascript developer that wants to save data
in a database but doesn't want to learn SQL - yet. It's also for people that want to rapidly prototype some app that depends on
a database but doesn't want to have to deal with queries, even if it's not the most efficient way to do things.

### Q: What can it be used for?

**A**: Enmap is useful for storing very simple key/value data for easy retrieval, and also for more complex objects with many properties.
Mainly, because of who I originally made this for, it's used in Discord.js Bots to save currencies, content blocks, server settings, and
user information for bans, blacklists, timers, warning systems, etc.

## Testimonials

Some user comments!

> I have legit tried several databases, from popular complicated ones to pretty basic ones. The only database I had absolutely no issue with was and still is enmap.

> I know how to use a real db, but enmap is so sweet and easy to use

> Thanks to Enmap, I am able to do tons of things that I never thought I would accomplish.
From custom settings to even just saving the little things, it is amazing to use.

> Enmap helped me, and it stills helps me, because it is very simple and useful. Thank you for creating Enmap.

> Without your tutorials I didn't have an internship and some work.. :))

> Enmap was introduced to me fairly early, and has been essential to the growth and development of my bot. Without it, I'd have to use and learn complicated and unsafe systems. Enmap has helped me do exactly what I want with my bot. Thank you.
