---
repo: kern/filepizza
url: 'https://github.com/kern/filepizza'
homepage: 'https://file.pizza'
starredAt: '2025-03-16T17:10:39Z'
createdAt: '2015-02-25T23:29:26Z'
updatedAt: '2025-03-19T18:38:04Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 6788
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-19T19:43:56.153Z'
description: ':pizza: Peer-to-peer file transfers in your browser'
tags:
  - react
  - webrtc
---

<a href="https://xkcd.com/949/"><img src="http://imgs.xkcd.com/comics/file_transfer.png" alt="XKCD 949" width="30%" align="right" /></a> <img src="public/images/wordmark.png" alt="FilePizza wordmark" width="50%" /> <h3>Peer-to-peer file transfers in your browser</h3>

*Cooked up by [Alex Kern](https://kern.io) & [Neeraj Baid](https://github.com/neerajbaid) while eating Sliver @ UC Berkeley.*

Using [WebRTC](http://www.webrtc.org), FilePizza eliminates the initial upload step required by other web-based file sharing services. Because data is never stored in an intermediary server, the transfer is fast, private, and secure.

A hosted instance of FilePizza is available at [file.pizza](https://file.pizza).

## What's new with FilePizza v2

* A new UI with dark mode support, now built on modern browser technologies.
* Works on most mobile browsers, including Mobile Safari.
* Transfers are now directly from the uploader to the downloader's browser (WebRTC without WebTorrent) with faster handshakes.
* Uploaders can monitor the progress of the transfer and stop it if they want.
* Better security and safety measures with password protection and reporting.
* Support for uploading multiple files at once, which downloaders receive as a zip file.
* Streaming downloads with a Service Worker.
* Out-of-process storage of server state using Redis.

## Development

```
$ git clone https://github.com/kern/filepizza.git
$ pnpm install
$ pnpm dev
$ pnpm build
$ pnpm start
```

## Running with Docker

```
$ pnpm docker:build
$ pnpm docker:up
$ pnpm docker:down
```

## Stack

* Next.js
* Tailwind
* TypeScript
* React
* PeerJS for WebRTC
* View Transitions
* Redis (optional)

## FAQ

**How are my files sent?** Your files are sent directly from your browser to the downloader's browser. They never pass through our servers. FilePizza uses WebRTC to send files. This requires that the uploader leave their browser window open until the transfer is complete.

**Can multiple people download my file at once?** Yes! Just send them your short or long URL.

**How big can my files be?** As big as your browser can handle.

**What happens when I close my browser?** The URLs for your files will no longer work. If a downloader has completed the transfer, that downloader will continue to seed to incomplete downloaders, but no new downloads may be initiated.

**Are my files encrypted?** Yes, all WebRTC communications are automatically encrypted using public-key cryptography because of DTLS. You can add an optional password to your upload for an extra layer of security.

## License & Acknowledgements

FilePizza is released under the [BSD 3-Clause license](https://github.com/kern/filepizza/blob/main/LICENSE). A huge thanks to [iblowyourdesign](https://dribbble.com/iblowyourdesign) for the pizza illustration.
