---
repo: rkmittal/vs-crawler
url: 'https://github.com/rkmittal/vs-crawler'
homepage: null
starredAt: '2015-01-08T08:15:10Z'
createdAt: '2014-09-17T17:59:30Z'
updatedAt: '2015-01-08T08:15:10Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:54.967Z'
description: >-
  This project contains files related to the crawler written to crawl Versus.com
  to find out the best headphones
tags: []
---

vs-crawler
==========

This project contains files related to the crawler written to crawl Versus.com to find out the best headphones.

I set out to do some research on Versus.com to find some good headphones below $100. On the Versus page (http://versus.com/en/headphone/top), the headphones are listed with their points in increasing order of ranking. But the problem is that there is no price mentioned on this page. To find out, I started clicking on the first few links and was quickly tired of doing so. It took a long time to open each page and many of them were quite expensive. So I thought there must be a better way.

I thought, this is a job for PHANTOM (phantom.js that is). So I wrote a crawler that can crawl and print all the links from the top page. I fed the first five pages to this crawler which gave me the Top 250 links. I removed all the unnecessary stuff and left only the links on each line. Now this line was fed to a Java source file that acted as the driver to my phantom.js crawler that went to each link and figured out the price, whether it is noise canceling head-phone or not and also marked the headphones cheaper than $100 with a --> in the results.
