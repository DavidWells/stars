---
repo: mweagle/SpartaHTML
url: 'https://github.com/mweagle/SpartaHTML'
homepage: null
starredAt: '2016-01-22T20:50:00Z'
createdAt: '2015-12-15T16:01:24Z'
updatedAt: '2023-08-15T17:54:05Z'
language: CSS
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:33.216Z'
description: >-
  Sparta application that demonstrates provisioning an S3 backed site with a
  CORS-enabled API Gateway
tags: []
---

# SpartaHTML
[Sparta](https://github.com/mweagle/Sparta) application that demonstrates provisioning an S3 backed site with a CORS-enabled API Gateway

## Instructions

1. `git clone https://github.com/mweagle/SpartaHTML`
1. `cd SpartaHTML`
1. `make get`
1. `S3_BUCKET=<MY_S3_BUCKET_NAME> make provision`
1. In the _Stack output_ section of the log, look for the **S3SiteURL** key and open the provided URL in your browser (eg: _http://spartahtml-site09b75dfd6a3e4d7e2167f6eca73957e-zp9okcokn7o.s3-website-us-west-2.amazonaws.com_).

## Result

<div align="center"><img src="https://raw.githubusercontent.com/mweagle/SpartaHTML/master/site/websitelanding.jpg" />
</div>

## Credits

<ul>
  <li><a target="_blank" href="https://templated.co/spatial">Spatial HTML Template</a></li>
  <li><a target="_blank" href="https://unsplash.com/photos/iMxsCt2rxAQ">Joseph Chan - Photographer</a></li>
</ul>
