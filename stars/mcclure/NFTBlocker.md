---
repo: mcclure/NFTBlocker
url: 'https://github.com/mcclure/NFTBlocker'
homepage: null
starredAt: '2021-12-06T00:20:23Z'
createdAt: '2021-11-27T23:16:38Z'
updatedAt: '2025-02-12T12:47:17Z'
language: null
license: NA
branch: README
stars: 620
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:29.904Z'
description: Browser plugin to autoblock NFT users on Twitter.
tags: []
---

## This information is outdated

Sometime in January of 2024, Twitter discontinued the NFT-avatar feature. Therefore, the below software almost certainly does not anymore work. Notice I say "almost certainly": On occasion before Twitter has removed features from the *interface* while continuing to store the relevant data in the backend, and JavaScript running on the Twitter domain is often free to query backend information that the interface would not usually show. So it's *possible* that tools (1) and (4) below continue to work on users who *had* NFT avatars before the feature was removed. (Because the new management has both discontinued TweetDeck and made third-party apps such as the AntsStyle blocker nonviable, most likely (2) and (3) will be broken anyway.) Since I no longer use Twitter (and, in my opinion, neither should you) I have not attempted to test this.

For historical purposes, here is the text that *was* here:

## How to automatically block NFT users on Twitter

Twitter has a feature where registered NFT owners get a hexagonal profile border. This is silly and bad, but has an upside: It means you can now block NFT users on Twitter **automatically**, using any of the following tools.

1. **[NoFT](https://noft.gg/)**

    Works with: **Chrome**, **Firefox**  
    Uses: **Block NFT users**, **mute NFT users**, **remove profile pictures of NFT users**.

    This browser plugin watches Twitter while you use it and blocks, mutes, or de-avatars any registered NFT users that show up.

    **Note: This plugin is currently incompatible with uBlock Origin.** If you use uBlock Origin, you must [follow these short instructions after installation](https://twitter.com/YoshiEmblem/status/1486920290181554176) or else NoFT will do nothing.

2. **[AntsStyle "NFT Artist & Cryptobro Blocker"](https://antsstyle.com/nftcryptoblocker/)** *(Link dead— 2024-01-12)*

    Works with: **All forms of Twitter, including phone apps**  
    Uses: **Block NFT users**, **mute NFT users**.  
    **Note: User signup is offline until Feb. 22** (est). Too many people signed up!

    This app runs in the background while you use Twitter and blocks NFT users in your feed or notifications. It can detect registered NFT users like the other apps, but it can also (if you tell it to) detect NFT users based on patterns, like OpenSea links or having a ".eth" username.

    **Why does the app need so many permissions?** Unfortunately, Twitter's API only has 3 permissions levels for apps. In order to get permission to block people, the app must also get permission to post tweets. The author assures us the app will never post a tweet on your behalf.

    Because this app runs on its own server, it costs its operator money to run. If you want to support the app, the author has a [Patreon](https://www.patreon.com/antsstyle).

3. **[Better TweetDeck](https://better.tw/)**

	Works with: **TweetDeck**  
	Uses: **Hide posts by NFT users**.

	[TweetDeck](https://tweetdeck.twitter.com/) is like a better version of Twitter. Better TweetDeck makes TweetDeck even better. One of its features is to hide tweets by NFT users. In other news, the NFT users will not be blocked or muted-- you just won't have to see their tweets. This is good because it means BTD **makes no permanent changes to your account**.

4. **[NFTBlocker](https://github.com/mcclure/NFTBlocker/tree/stable)**

    Works with: **Chrome**, **Firefox**  
    Uses: **Block targeted networks of NFT users**

    This browser plugin is **old and you don't want to use it**. Use NoFT, which is newer and better. This plugin does only one thing, although it's something the other apps can't do: You can point at a "followers" or "following" page and block all registered NFT users.

## I don't understand any of this. What's an "NFT"?

Investment scam.

## Why would you want to block NFT users?

Three reasons.

1. Because it is designed in a foolish way, the NFT system has a shocking amount of impact on global warming. The more demand there is to buy and sell NFTs, the higher the value of energy-wasting ("proof of work") cryptocurrencies goes and the more coal and oil these networks will burn. I don't want to be in a community with people who support that.

2. The NFT market is rife with scams and art theft.

3. In short, NFT users are just irritating to be around. People who bought NFTs have to keep hyping other people to buy NFTs or the NFTs they bought will lose value. Twitter NFT cliques are rife with sockpuppet accounts, dogpiling and indifferentiable monkey clones. Blocking NFT users just makes Twitter nicer.
