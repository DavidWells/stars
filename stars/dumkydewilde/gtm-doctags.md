---
repo: dumkydewilde/gtm-doctags
url: 'https://github.com/dumkydewilde/gtm-doctags'
homepage: null
starredAt: '2022-02-21T23:00:15Z'
createdAt: '2021-10-03T10:09:06Z'
updatedAt: '2023-03-15T12:47:13Z'
language: JavaScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:16.343Z'
description: >-
  Automatically generate a GTM documentation site using the Google Tag Manager
  notes and Docsify
tags: []
---

# GTM DocTags
GTM DocTags is a lightweight documentation generator for Google Tag Manager. It uses the notes field on tags, triggers and variables in Google Tag Manager —does anybody even use the note field?— and grabs that and some additional info through the GTM API to create a set of markdown files. The markdown files can be stored in Google Cloud Storage and rendered at runtime with [Docsify](https://docsify.js.org/) to create a fully searchable, neat looking documentation site that you can serve your developers and other team members. 

This project is mostly intended as a proof of concept as needs will vary for each team, for example if you'd like to show documentation for multiple containers on one site. But with this repo you should have everything in hand to get started. 

Want to see a live demo? Have a look at [docs.dumky.net](http://docs.dumky.net)!

## Quickstart
1. Create a Google Cloud Project with a storage bucket. If you want to point a (sub)domain like `docs.example.com` to your storage bucket, make sure to name your bucket `docs.example.com` and point your CNAME (DNS) record to `c.storage.googleapis.com.` (that includes a `.` at the end). 
2. Upload the `index.html` and `_sidebar.md` files to the storage bucket as these are what's needed for Docsify to run and render your markdown files.
3. Create a Cloud Function using the `gtm-to-markdown.js` script. You can use a HTTP or Pub/Sub trigger to trigger it daily via Cloud Scheduler or you could use something like a [GTM Status Monitor](https://www.dumky.net/posts/monitor-google-tag-manager-version-status-and-send-notifications-to-slack-the-easy-way-zapier-and-hard-way-gcp/?utm_crap=wow-someone-actually-looked-at-my-github) to only update after a new version is published (or just do both)
4. To give the cloud function access to your GTM container you'll have to go to the IAM page and grab the email address from the app engine service account (or create your own service account). You might also have to enable the Google Tag Manager API in your newly created GCP Project at the [GCP marketplace](https://console.cloud.google.com/marketplace/product/google/tagmanager.googleapis.com).
5. Run your Cloud Function, and voila, you can click the public link for the `index.html` in your storage bucket and see the black magic of Docsify in action.

> :point_right: If you're playing around with static hosting on GCP Cloud Storage you might want to set `index.html` as the default page by clicking the three dots after your bucket in the bucket browser and clicking `Edit website configuration`. To see your changes appear live, you may also want to set the `cache-control` in the metadata of the `index.html` file (and other files) to something like `max-age=60` (i.e. one minute) instead of the default `max-age=3600`. 

## References
- [Google Tag Manager API](https://developers.google.com/tag-manager/api/v2)
- [Docsify](https://docsify.js.org/)
