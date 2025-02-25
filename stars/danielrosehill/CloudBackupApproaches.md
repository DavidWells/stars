---
repo: danielrosehill/CloudBackupApproaches
url: 'https://github.com/danielrosehill/CloudBackupApproaches'
homepage: ''
starredAt: '2020-06-30T23:48:49Z'
createdAt: '2020-04-30T22:03:56Z'
updatedAt: '2024-08-04T14:33:44Z'
language: null
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:46.043Z'
description: >-
  Periodically updated markdown documentation summarizing manual /
  non-programmatic methodologies to back up commonly used SaaS / cloud-hosted
  software utilities.
tags: []
---

# Cloud Backup Approaches

In this repository I will endeavor to maintain up to date documentation regarding how to backup your (user) data from various commonly used cloud services providers. 

Please note: this repository is being automatically synced from Github to [Gitbook](https://danielrosehill.gitbook.io/saas-backup-approaches/). If you are accessing this from the latter, please use the menu in the left sidebar to navigate and not the table of contents below.

I am still searching for a tool that:

- Automatically exports all SaaS applications and sync them cloud-to-cloud to commonly supported object storage buckets (but especially Backblaze B2)

For my latest master backup strategy — covering both the cloud and the Linux desktop — [please visit this repository](https://github.com/danielrosehilljlm/Master_Backup_Strategy). 

If you have feedback or would like to contribute to the summaries, please be in touch. 

*** Author:

Daniel Rosehill
danielrosehill.co.il

**Keywords**: Data governance, user data exports, data portabiliity, SaaS, cloud

# Summaries:

["User Data Export Approaches of SaaS / Cloud Service / Social Media Providers — An Overview," (Daniel Rosehill /  Medium / 01-05-20)](https://medium.com/daniels-tech-world/user-data-export-approaches-of-saas-cloud-service-social-media-providers-an-overview-2101f6e8bd27?source=friends_link&sk=0fa880e506f3ba5adfed6eb81ad62e62)

<hr>

# Services documented:

| Service | Methodology |
| --- | --- |
| [Asana](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Asana.md) | Enterprise tier (paid) only |
| [Cpanels](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Cpanels.md) | On-demand exports through native functionality |
| [Facebook](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Facebook.md) | On-demand exports to archive; users can control contents |
| [Github](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Github.md) | Repositories exported in .git format |
| [GoodReads](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/GoodReads.md) | Single file on-demand CSV export |
| [Google / Gsuite](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/GoogleGsuite.md) | Google Takeouts automated export engine |
| [Green Invoice](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/GreenInvoice.md) | On-demand by document type |
| [LastPass](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/LastPass.md) | Exports single PHP file |
| [LinkedIn](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/LinkedIn.md) | On-demand archives; users can control contents |
| [Mailchimp](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Mailchimp.md) | On-demand exports to download archive |
| [Medium](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Medium.md) | On-demand Zip archives but images locked in Medium CDN |
| [Notion](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Notion.md) | On-demand per workspace archives in PDF, HTML or CSV + JSON |
| [Quora](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Quora.md) | Data request via support.  |
| [Reddit](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Reddit.md) | Data request via support; honored within 30 days |
| [Todoist](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Todoist.md) | Automatically generated snapshots but no enriched content (images/comment media) |
| [Trello](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Trello.md) | On demand generation of a single JSON file |
| [Twitter](https://github.com/danielrosehilljlm/CloudBackupApproaches/blob/master/summaries/Twitter.md) | On demand generation of download archives containing all user data |

<hr>


# Services without native user data export functionalities

| Service | Notes |
| --- | --- |
| Cloudflare | [cf-terraforming](https://github.com/cloudflare/cf-terraforming) achieves similar functinality |
| Soundcloud | Uses have to download their own tracks one-by-one! |


<hr>



## Example service documentation: LinkedIn

![LinkedIn](/images/0108.png)
