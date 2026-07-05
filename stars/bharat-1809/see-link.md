---
repo: bharat-1809/see-link
url: 'https://github.com/bharat-1809/see-link'
homepage: 'https://seelink.bharatsharma.me'
starredAt: '2021-12-12T01:19:52Z'
createdAt: '2021-11-07T09:46:10Z'
updatedAt: '2023-12-03T10:41:19Z'
language: JavaScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:29.252Z'
description: "\U0001F50E Get the preview metadata like title, description, image, video, etc from a link or a URL extracted from the given text."
tags:
  - javascript
  - link
  - link-preview
  - nodejs
  - npm-package
  - preview
  - puppeteer
  - url
  - url-preview
---

<!-- markdownlint-disable MD036 -->
# See-Link

[![Build Status](https://img.shields.io/github/workflow/status/bharat-1809/see-link/CI?logo=github)](https://github.com/bharat-1809/see-link)
[![Package Version](https://img.shields.io/badge/npm-v2.0.1-blue)](https://www.npmjs.com/package/see-link)
[![License](https://img.shields.io/badge/License-MIT-orange)](https://github.com/bharat-1809/see-link/blob/2a79daaa549d986eb05d51c8a919452f84a3b14e/LICENSE)
[![Donate](https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal)](https://www.paypal.me/bsharma1809)

**See-a-Link**! Get the preview metadata like title, description, image, video, etc from a link or a link extracted from the given text.

See-Link looks through the [open-graph](http://ogp.me/), [twitter cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup) markup and other meta tags to get the preview information from the link. It visits a link in a headless browser and scrapes the required information. It can also return the dominant color of the page in case the `theme-color` is needed but no meta info is found.

*To know more about **how See-Link works** checkout this [wiki](https://github.com/bharat-1809/see-link/wiki/How-does-see-link-works%3F).*

Check out [this article](https://dev.to/veerreshr/seo-tags-meta-tags-that-you-need-for-previews-on-social-networks-343n) to know about meta tags, SEO and their need for generating link previews.

# Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API](#api)
- [Options](#options)
- [Test](#test)
- [License](#license)

## Features

- Get the dominant color of the page if required.
- Can return images present in html body incase meta tags are not available.
- Can be customized to return the info as per the requirement.
- Uses stealth measures and user-agent can be customized to bypass restrictions setup by sites to prevent bot scraping.

**NOTE**

- A different domain cannot be requested from your web app (browsers block cross-origin-requests). If you do not know how same-origin-policy works, here is a [great article](https://dev.to/lydiahallie/cs-visualized-cors-5b8h), therefore this library works on node (back-end environments) and certain mobile run-times (like react-native).

- This library fetches the website and parses its html using [puppeteer](https://pptr.dev/), as if the user would visit the page. This means that some websites might redirect you to a sign-up page. You can try to change the user-agent property (by default it uses [Facebook's user agent](https://developers.facebook.com/docs/sharing/webmasters/crawler/#:~:text=app%20or%20website.-,Crawler%20IPs%20and%20User%20Agents,-The%20Facebook%20crawler)) and the response you get then might be different, but there is nothing wrong with this library.

## Getting Started

```bash
npm install see-link
```

## Usage

Its quite simple:

```javascript
const seeLink = require('see-link');

(async () => {
    const preview = await seeLink('https://www.bharatsharma.me');

    // You can directly pass a url as above or pass a chunk of text
    // and seeLink will extract the first link from it. Like this:

    const preview_text = await seeLink('This text will be parsed by seeLink https://www.bharatsharma.me');

    console.log(preview);
})();
```

The above code will result in the following output:

```bash
{
  title: 'Bharat Sharma',
  description: 'Personal website of Bharat Sharma',
  image: 'https://bharatsharma.me/assets/images/logo.png',
  domainName: 'bharatsharma.me'
}
```

## API

```javascript
function seeLink(url: string, options?: seeLink.Options): Promise<SeeLinkRes>
```

`seeLink` takes a `url` and `options` object (*optional*). The `url` string can be **any link or a text containing a link**. It rejects with an error if there was no URL in the text provided.

`seeLink` returns a promise that resolves to the preview metadata of the following type:

```javascript
SeeLinkRes {
  title: string;
  description: string;
  image: string;
  domainName: string;
  video?: string;
  themeColor?: string;
  favIcon?: string;
  type?: string;
}
```

## Options

Additionally you can pass an options object to the function to change the default behaviour:

| Option Name | Function  | Type |
|-------------|-----------|------|
| detailedPreview | Get all the possible metadata supported by the see-link (eg: video, theme-color, type, favIcon) | boolean |
| getVideo | Get the video metadata along with the default result | boolean |
| getThemeColor | Get the `theme-color` metadata along with the default result | boolean |
| getDominantThemeColor | When `getThemeColor` is set to true and no `theme-color` meta info is found then get the dominant color of the page. By default it's `true` | boolean |
| args | Arguments to pass to the `puppeteer.launch` function | string[] |
| userAgent | User-Agent to use when visiting the website | string |
| timeout | Timeout in milliseconds for the request | number |
| executablePath | Path to the chrome/chromium executable | string |
| headless | Whether to run the browser in headless mode | boolean |

## Test

The library is tested using [Mocha](https://mochajs.org/) and [Chai](https://chaijs.com/). You can run the tests by running the following command in the project root:

```bash
./test.sh
```

If `bash: ./test.sh: Permission denied` error is thrown, you can make the test executable by running the following command:

```bash
chmod +x test.sh
```

Alternatively, you can run the tests by running the following commands in the project root:

```bash
npm run-script test-server
```

then in another terminal run the following command:

```bash
npm test
```

*NOTE:* The test server runs on port `3000` by default. You can change the port number in `test_setup/config.js` file.

## License

See-Link is released under the [MIT License](https://github.com/bharat-1809/see-link/blob/2a79daaa549d986eb05d51c8a919452f84a3b14e/LICENSE).
