---
repo: pualien/Trackie
url: 'https://github.com/pualien/Trackie'
homepage: 'https://pualien.github.io/Trackie/'
starredAt: '2019-10-06T08:59:17Z'
createdAt: '2019-06-17T08:42:00Z'
updatedAt: '2024-07-11T13:43:36Z'
language: JavaScript
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.277Z'
description: >-
  A Chrome extension to enhance debugging of some frequently-used tag management
  platforms (Google Tag Manager, Tealium, Commanders Act, DTM) in combination
  with some frequently-used tags (Google Analytics, Google Analytics 4, GA
  Audiences, Ddm, Criteo, Adobe Analytics/Omniture, Floodlight, Comscore,
  Facebook, Bluekai, Youbora, Kinesis, Webtrekk, Segment)
tags:
  - adobe-analytics
  - analytics
  - bluekai
  - chrome-extension
  - comscore
  - criteo
  - debug
  - facebook-analytics
  - floodlight
  - ga4
  - google-analytics
  - google-analytics-4
  - kinesis
  - omniture
  - segment
  - segmentio
  - webtrekk
  - youbora
---

![](https://i.imgur.com/iymRnYu.jpg)
 
Trackie
==========

Debug and test tag manager and analytics implementations.
Trackie 🐞 is a Chrome extension to enhance debugging 👨🏼‍💻 of some frequently-used tag management platforms 🌩:
- Google Tag Manager
- Tealium
- Commanders Act
- DTM

In addition Trackie intercepts ⚡️ a lot of most-used tag calls (page view, clicks, checkout...) 🕵🏻‍♂‍from:
- Google Analytics
- 💎 Google Analytics 4 property (GA4), formerly known as "App + Web" property 
- GA Audiences
- Adobe Analytics/Omniture
- Floodlight
- Comscore 
- Criteo
- Facebook
- Bluekai
- Youbora
- Kinesis
- Webtrekk
- Nielsen
- 💎 Segment track + identify

Tag calls can now be exported in csv 💾 in order to better view data collected offline!

Installation
------------
To use the unpacked source version, enable Developer mode in the [Chrome extensions page](chrome://extensions/) and *Load unpacked extension* from the checked-out **src** folder.

The latest official version is on the [Chrome Web Store](https://chrome.google.com/webstore/detail/trackie/iphjjodolgbelaogcefgpegebgecopeh).

Use
---
A new panel will appear in Developer Tools titled **Trackie**, containing a page group and URL for each pageload in the tab, with each push to the dataLayer variable (in the case of GTM's array-based data layer) appearing in a subgroup.

![](https://i.imgur.com/AG7VjK8.png)

1. Current URL / TMS logo (or X if no TMS found); click to collapse/expand this page
2. TMS container ID; becomes a dropdown menu if multiple containers are present
3. Data layer items; items with a **+** are objects containing sub-items and can be expanded one level by clicking **+** or expanded fully by shift-clicking **+**
4. Information on fired tags (GA, Floodlight, SiteCatalyst); click **+** here to see all parameters in the request
5. Trackie settings and information
6. Clear history

All items are in reverse chronological order (newest on top).

Note that vertical alignment between the data layer and any fired tags does not necessarily indicate a tie between the two. If a page contains only a data layer, or only tags, that side of the panel will expand to take up the width of the entire panel.

Settings
--------
### General
- show data layer presence: enable (default) or disable the TMS logo / X in each page group. Useful for disabling if you are using Trackie for e.g. pure GA debugging rather than tag management debugging.
- auto-collapse nested data layer variables: when this option is enabled (default), nested variables such as Google Analytics enhanced ecommerce will automatically be collapsed to save space.
- block tags from firing: requires use of the Chrome dev or beta channels. When this option is enabled, supported tags will be blocked from actually sending to the analytics platform. Note that blocking does not take the Tags selections into account (i.e. all supported tags are blocked, regardless of whether or not they are shown).

### Tags
All supported tag types are shown by default; these can be individually disabled.

### Ignored IDs
To filter out tags hitting specific analytics properties, enter the property IDs here.

Bug report - feature request
--- 
Feel free to open new issues following the [issue templates](https://github.com/pualien/Trackie/issues/new/choose)

Misc
----
Trackie was built with and thanks to the following:
- [DataSlayer](https://github.com/sean-adams/dataslayer)
- [Google Data Layer Helper Library](https://github.com/google/data-layer-helper)
- [Pure](http://purecss.io/)
- [jQuery](http://jquery.com/)
- [leanModal](http://leanmodal.finelysliced.com.au/)
- [Open Sans](http://www.google.com/fonts/specimen/Open+Sans)
- [Massimo Artizzu's O.o polyfill](https://github.com/MaxArt2501/object-observe)

Trackie is under the MIT License. See LICENSE.md.
