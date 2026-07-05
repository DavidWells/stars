---
repo: KyleMit/eleventy-plugin-embed-tweet
url: 'https://github.com/KyleMit/eleventy-plugin-embed-tweet'
homepage: 'https://www.npmjs.com/package/eleventy-plugin-embed-tweet'
starredAt: '2020-04-27T00:46:47Z'
createdAt: '2019-12-24T20:10:46Z'
updatedAt: '2024-04-27T06:29:07Z'
language: JavaScript
license: NA
branch: main
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:55.849Z'
description: A plugin for embedding tweets on the server side during build time
tags:
  - eleventy
  - eleventy-plugin
  - twitter-api
---


## Installation

Install [on npm](https://www.npmjs.com/package/eleventy-plugin-embed-tweet)

```bash
npm install eleventy-plugin-embed-tweet --save
```

Add the following to your .`eleventy.js` config - see docs for options param:

```js
module.exports = function(eleventyConfig) {

    const pluginEmbedTweet = require("eleventy-plugin-embed-tweet")
    eleventyConfig.addPlugin(pluginEmbedTweet);

};
```

## Requirements

Requires signing up for [~~free~~](https://twitter.com/TwitterDev/status/1621026986784337922?s=20&t=wOM6Oe0n-JGSIpbXheaYHg) twitter [developer API account](https://developer.twitter.com/en/apply-for-access) - see docs for walkthrough

This plugin relies on making live API calls during build by using async shortcodes which were added in [**Eleventy v0.10.0**](https://github.com/11ty/eleventy/releases/tag/v0.10.0-beta.1) so it's listed as a peer dependency

## Basic Usage

Embed a tweet anywhere you can use nunjucks templates using a shortcode with the tweet id like this:

### Nunjucks

```js
{% tweet "1188837207206977536" %}
```

> **Note**: ID must be passed as a string because [long numbers will truncate in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER))

## Demo

Demo project available on github at [KyleMit/eleventy-plugin-embed-tweet-demo](https://github.com/KyleMit/eleventy-plugin-embed-tweet-demo) and live version hosted on [eleventy-embed-tweet.netlify.com/](https://eleventy-embed-tweet.netlify.com/)

## Goals

* Avoid client side API calls
* Minimize repetitive server side API calls
* Cache assets and API data so project can build offline
* Leverage free (personal) twitter API tier on build server
* Provide fallback for local development for distributed devs who want to run without adding credentials

## Todo

* [ ] Destructure API JSON before caching - only store info we care about
* [ ] Cache profile and media images
* [ ] Much better docs
* [ ] Figure out more consistent CSS structure
* [ ] Handle `<br>` elements
* [ ] Automate `npm publish`

## Docs

### Setting up Twitter Account

### Setting .ENV variables

Once you sign up for a twitter account, you'll need to create a file named `.env` at the project root - it contains keys so it's excluded by the `.gitignore` so each person will have to manually create their own:

```env
TOKEN=********
TOKEN_SECRET=********
CONSUMER_KEY=********
CONSUMER_SECRET=********
```

Remember to update your `.gitignore` with `.env` so you don't commit your secrets

You'll also have to add the environment variables on your build server.

If you build without setting environment variables, the API call won't work, so the plugin will fallback to using the client side embed available from [publish.twitter.com](https://publish.twitter.com/#)

### Plugin Options

```js
let pluginEmbedTweet = require("eleventy-plugin-embed-tweet")

let tweetEmbedOptions = {
    cacheDirectory: '',    // default: ''
    useInlineStyles: true, // default: true
    autoEmbed: false       // default: false
}

eleventyConfig.addPlugin(pluginEmbedTweet, tweetEmbedOptions);
```

#### `useInlineStyles`

By default the single embed will contain all the necessary html and css to render each tweet.  This occurs by including a `<style>` block along with the tweet.  If you're embedding multiple tweets per page, you may elect to separate the CSS into it's own area so it's not repeated multiple times

You can instantiate the plugin like this:

```js
eleventyConfig.addPlugin(pluginEmbedTweet, {useInlineStyles: false});
```

And then make sure to include the styles somewhere else on your page like this:

```html
<style type="text/css">{% tweetStyles %}</style>
```

**Feel free to also add your own styles** and customize however you'd like.  The official twitter widget is implemented as a web component and [makes styling through the shadow dom really tricky](https://stackoverflow.com/a/59493027/1366033) - but this sits as flat html on your page - so customize however you'd like

The rough structure of the html returned by this plugin looks like this:

```css
.tweet-card
    .tweet-header
        .tweet-profile
        .tweet-author
            .tweet-author-name
            .tweet-author-handle
        .tweet-bird
            .tweet-bird-icon
    .tweet-body
    .tweet-images
    .tweet-footer
        .tweet-like
            .tweet-like-icon.tweet-icon
            .tweet-like-count
        .tweet-date
```

#### `cacheDirectory`

Relying on an external, authenticated API to build your site has some tradeoffs:

* The Build will fail if API is down (twitter on fire)
* The Build will fail if you're offline (on a train)
* People who clone the repo will need to sign up for their own API keys in order to do a full build
* Increases build times with repetitive calls (especially during debugging)
* Increases reliance on API access over long term

To address these tradeoffs, this plugin can cache API calls locally which you can periodically commit to your repository.

To enable, you can pass a `cacheDirctory` path relative to your project root where you'd like to have data saved:

```js
eleventyConfig.addPlugin(pluginEmbedTweet, {cacheDirectory: 'tweets'});
```

Because this directory will be updated during build time, you **must add a [`.eleventyignore`](https://www.11ty.dev/docs/ignores/)** with the directories name, otherwise `eleventy --serve` can get stuck in an infinite loop when it detects changes and tries to rebuild the site during the build.

**File**: `.eleventyignore`

```bash
tweets/
```

I'd recommend periodically committing this file. The only data that'll change over time is the `favorites_count`, but otherwise you can have a relatively shelf stable set of data in your repository

If you'd like to guarantee that the build server is always getting the latest data for `favorites_count`, you can set `CACHE_BUST=true` in your build environment's variables or include in your scripts in you `package.json` like this:

```json
"scripts": {
    "build": "npx eleventy",
    "serve": "npx eleventy --serve",
    "full-build": "set CACHE_BUST=true && npx eleventy",
    "clear-cache": "rm -rf tweets"
}
```

#### `autoEmbed`

This configuration option, if set to `true`, adds a transform to Eleventy to find links to tweets that are "alone" in a paragraph, with the value equal to the URL, and auto embed them, replacing the link.

For example:

```html
<p><a href="https://twitter.com/KyleMitBTV/status/1211079569245114371">https://twitter.com/KyleMitBTV/status/1211079569245114371</a></p>
```

Will be replaced by the embedded tweet.

In the source Markdown, it only needs the tweet URL on one single line:

```markdown

https://twitter.com/KyleMitBTV/status/1211079569245114371

```

## Performance

Static site generators work hard to bake in performance and do as much work ahead of time as possible.

Which is why it's a bummer that the official way to embed tweets is to use the [publish.twitter.com](https://publish.twitter.com/#) which looks like this:

```html
<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">
    Nobody:<br><br>
    Software Marketing Page: &quot;Blazingly Fast&quot;
  </p>
  &mdash; Kyle Mitofsky (@KyleMitBTV)
  <a href="https://twitter.com/KyleMitBTV/status/1188837207206977536">October 28, 2019</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

And performs like this:

![twitter network traffic](https://i.imgur.com/4SFqs4P.png)

// TODO - include real performance metrics/deltas
