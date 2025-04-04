---
repo: notracking/hosts-blocklists
url: 'https://github.com/notracking/hosts-blocklists'
homepage: ''
starredAt: '2019-10-06T23:08:49Z'
createdAt: '2015-12-17T20:58:56Z'
updatedAt: '2025-02-24T09:42:50Z'
language: null
license: NA
branch: master
stars: 2308
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:17.211Z'
description: >-
  Automatically updated, moderated and optimized lists for blocking ads,
  trackers, malware and other garbage
tags:
  - adblock
  - ads
  - blacklist
  - blocklist
  - blocklists
  - dns
  - dnscrypt
  - dnscrypt-proxy
  - dnscrypt-proxy2
  - dnsmasq
  - domain
  - filter
  - hostfile
  - hostname
  - hostnames
  - malware
  - unbound
---

# The NoTracking blocklist will be shutting down soon. Please read https://github.com/notracking/hosts-blocklists/issues/900 for more details.

# No more ads, tracking and other virtual garbage
The NoTracking blocklist is a DNS based filter list for blocking ads, malware, phising and other online garbage.

## General blocklist policies
 - Should not break useful and commonly used services
 - Blocks tracking servers
 - Blocks advertising servers
 - Blocks analytics servers
 - Blocks scam websites
 - Blocks malware servers
 - Blocks webminers
 - Blocks phishing servers
 
## Optimization
The optimizer makes full use of domainname based wildcard filtering `*.adhost.net`, this reduces the chance of missing any new subdomains and significantly reduces the size of the blocklists.

## Dead hosts removal
All hostnames are constantly monitored for updates. In case the A, AAAA, CNAME and NS records return NXDOMAIN they will be marked as dead and removed. Domains are tested on their whois data and removed if they have been unregistered for a certain time.

The current list of dead hostnames can be found [here](https://github.com/notracking/hosts-blocklists-scripts/blob/master/hostnames.dead.txt) and have a look [here](https://github.com/notracking/hosts-blocklists-scripts/blob/master/domains.dead.txt) for all unregistered domains.

## Sources
Most sources come from public hostfile type lists, though several AdblockPlus lists are also included only for their non-3rd party networking filters `||evilhost.com^`. See [SOURCES.md](SOURCES.md) for the full overview of all included lists.

## Versions
| List | Compatibility |
| ------------- | ------------- |
| [dnsmasq/dnsmasq.blacklist.txt](https://github.com/notracking/hosts-blocklists/raw/master/dnsmasq/dnsmasq.blacklist.txt) | Dnsmasq |
| [adblock/adblock.txt](https://github.com/notracking/hosts-blocklists/raw/master/adblock/adblock.txt)| Adguard Home, uBlock Origin, Pi-Hole |
| [dnscrypt-proxy/dnscrypt-proxy.blacklist.txt](https://github.com/notracking/hosts-blocklists/raw/master/dnscrypt-proxy/dnscrypt-proxy.blacklist.txt)| Dnscrypt-proxy |
| [unbound/unbound.blacklist.conf](https://github.com/notracking/hosts-blocklists/raw/master/unbound/unbound.blacklist.conf)| Unbound |
| [hostnames.txt](https://github.com/notracking/hosts-blocklists/raw/master/hostnames.txt) & [domains.txt](https://github.com/notracking/hosts-blocklists/raw/master/domains.txt)| Dnsmasq (version < 2.80 only, use both files) |

## How to install
 - [Instructions for AdblockPlus](https://github.com/notracking/hosts-blocklists/wiki/Install-AdblockPlus) (eg. [uBlock](https://github.com/gorhill/uBlock), [Adguard Home](https://github.com/AdguardTeam/AdGuardHome/), [Pi-Hole](https://github.com/pi-hole/pi-hole/))
 - [Instructions for dnscrypt-proxy](https://github.com/notracking/hosts-blocklists/wiki/Install-dnscrypt-proxy)
 - [Instructions for dnsmasq](https://github.com/notracking/hosts-blocklists/wiki/Install-dnsmasq)
 - [Instructions for dnsmasq (old: pre v2.80)](https://github.com/notracking/hosts-blocklists/wiki/Install-dnsmasq-(old:-pre-v2.80))
 - [Instructions for unbound](https://github.com/notracking/hosts-blocklists/wiki/Install-unbound)
 - [Instructions for Control D](https://docs.controld.com/docs/free-dns)

## Supporting Notracking blocklist
If you are intrested in supporting the project you can:
 - Submit false positives
 - [Donate with Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VPTVYWY3B7XWG&source=url)
 - Donate Bitcoin: 37VkbtMDgxCiHaCSS4PNPDo2z5AwM8grB2
 - Donate Ethereum: 0xaf446938cd43de5a267e9596a40be55a86f6b4a8
