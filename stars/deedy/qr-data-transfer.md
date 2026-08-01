---
repo: deedy/qr-data-transfer
url: 'https://github.com/deedy/qr-data-transfer'
homepage: null
starredAt: '2026-07-31T19:42:20Z'
createdAt: '2026-07-31T04:32:13Z'
updatedAt: '2026-08-01T22:39:51Z'
language: TypeScript
license: NA
branch: main
stars: 317
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-08-01T23:16:03.547Z'
description: null
tags: []
---

# QRFerry

QRFerry moves a file from one device to another as a live animated QR stream.
The sender and receiver run entirely in the browser; the file is never uploaded
to an application server.

## Use it

1. Open the root page on the sending screen and choose a file.
2. Open `/scan` on the receiving phone and allow rear-camera access.
3. Start the QR stream and keep the complete code inside the phone's guide.
4. Save the file when RaptorQ recovery and the whole-file checksum reach 100%.

Robust through Turbo 30 use one stable QR target. Turbo 60 uses two V30-L
lanes, updating them alternately at 30 fps each so one remains stable during
every display transition. The opt-in 1 Mbps laboratory profile uses the same
dual-lane design with V40-L for a nominal 1.40 Mbps optical payload channel
before camera loss. Dual modes require fullscreen sender playback, the
receiver's Dual lane option, and a landscape phone held close and steady.

## Demo

![QRFerry air-gapped data transfer demo](docs/qrferry-demo.webp)

This inline preview is generated from the final privacy-redacted demo. The
full-resolution recording remains local at
`videos/qrferrydemo_timed_redacted.mov` and is intentionally excluded from Git.

## Protocol

- Brotli quality 11 and gzip level 9 are both attempted; only the smallest
  representation is retained, and only when it saves optical bytes.
- QR frames use raw byte mode, avoiding the Base45 expansion of the previous
  protocol.
- Every frame carries a compact binary header, a RaptorQ symbol, and CRC-32.
- File metadata is inside the protected RaptorQ object instead of repeating in
  descriptor beacons.
- Source and repair symbols are interleaved. The receiver can join mid-cycle,
  discard blur, accept frames out of order, and reconstruct after receiving
  enough unique symbols.
- Turbo 15 uses one V30-L code held for four refreshes on a 60 Hz screen.
  Turbo 30 holds one code for two refreshes. Turbo 60 alternates updates across
  two V30-L lanes, so each lane remains stable for two refreshes while their
  combined stream carries 60 symbols per second. The 1 Mbps laboratory profile
  applies the same scheme to two denser V40-L lanes.
- Playback is synchronized to browser display refreshes. The sender reports its
  measured render rate; the receiver reports negotiated and delivered camera
  fps, completed scans per second, and decoder p50/p95 latency.
- Dual scanning acquires at most two codes per exposure and accepts either
  stable lane; it avoids the density and acquisition cost of a four-code grid.
- Rendering uses `fast_qr` compiled to WebAssembly. Scanning uses ZXing-C++
  compiled to WebAssembly. Fountain encoding and decoding use the RFC 6330
  RaptorQ implementation compiled to WebAssembly.
- The receiver verifies the per-frame CRC, the complete RaptorQ object CRC, the
  transmitted compressed payload CRC, and the original file CRC before saving.

## Development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The project does not require a Python environment. If Python tooling is added,
use `uv` for its environment and dependencies.

## Test harness

```bash
npm test
```

The harness checks:

- metadata, compression, and end-to-end checksum round trips;
- per-frame corruption rejection;
- RaptorQ reconstruction after unordered simulated camera-frame erasures;
- the actual V30-L WebAssembly renderer passed through the actual ZXing-C++
  WebAssembly scanner with exposure noise;
- exact QR capacity for every profile;
- production builds and server rendering for both `/` and `/scan`.

Run `npm run lint` and `npx tsc --noEmit` for the additional source checks.
