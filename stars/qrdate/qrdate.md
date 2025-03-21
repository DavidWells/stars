---
repo: qrdate/qrdate
url: 'https://github.com/qrdate/qrdate'
homepage: 'https://qrdate.org'
starredAt: '2022-03-19T18:14:48Z'
createdAt: '2022-02-26T20:57:19Z'
updatedAt: '2025-02-11T09:48:43Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 39
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:57.181Z'
description: >-
  Trusted timestamps that you can physically include in photos, videos and live
  streams using QR codes and audible data signals.
tags:
  - cryptography
  - journalism
  - osint-tool
  - qrcode
  - timestamp
  - trusted-timestamping
---

<a href="https://qrdate.org" target="_blank">![QR Date - Signed timestamps inside QR codes for verifying dates in realtime reporting.](https://user-images.githubusercontent.com/55932282/158589719-838b0da3-9ee0-435f-a599-eaaa7d39f8a3.jpg)</a>

# QR Date

![CI passing](https://github.com/qrdate/qrdate/actions/workflows/node.js.yml/badge.svg)

This is the reference implementation for the first version of [QR Date](https://qrdate.org), a signed timestamp inside a QR code that you can use to verify the date in (near-) real-time photojournalism, photo/video uploads and live streams.

**We are actively working on both the specification and this library.** Things may change dramatically in the coming weeks.

## What is it?

QR Date is a trusted timestamp that you can physically include in photos, videos and live streams using QR codes and audible data signals. It is for newsrooms, citizen journalists and social media users who wish to verify dates in videos, live streams and photos by visibly and/or audibly including trusted timestamps in the content.

- **For newsrooms**, it helps publishers to make better informed editorial decisions on which media to trust from professional and citizen journalists.
- **For citizen journalists**, it allows the public to play an active role in news, helping to verify when what's being recorded happened.
- **For social media users**, it works via rapid dissemination to people around the world who can help to verify the QR Date and the media's authenticity.

## How is it used?

QR Dates are included in photos and videos using physical means to make faking them harder (but not impossible) within a reasonable amount of time.

- **QR Codes:** Physically hold a device or piece of paper displaying the QR code to the camera. With photos, take several with different codes. With video, you can move the device or paper around a little.
- **Sonify:** Play the data signal from a speaker over the air close enough so that the microphone on your camera can pick it up over background noise. It does not need to be played loud in a quiet environment. Natural reverb and other ambient sounds will make the signal harder to fake.

Observers of QR Dates included in photos and videos can look for normal signs of tampering and verify the date independently without any proprietary tools.

- **QR codes:** Any QR code reader will work with QR Dates visible within photos and videos.
- **Data signals:** Programs such as fldigi can be used to decode the MT63 encoded signal.

## Security and limitations

**Like all media, QR Dates can be faked by embedding new codes into old photos and videos.** It is a new tool that does not replace old ones. It can and should be combined with other forensic tools to determine if an image has been manipulated.

## How does it work?

A server returns the current time, which it signs using a private key to produce a verification signature.

The URL embedded within the QR Date contains the timestamp and the signature.

Accessing the URL will take observers to QRDate.org, or your website if you run your own implementation, which tells them if the date and signature is valid. The signature can also be verified using a public key without access to the internet.

### Distributed clock source

We are working on making qrdate compatible with [Roughtime](https://blog.cloudflare.com/roughtime/) for a distributed, auditable clock source.

Want to help? Feel free to raise issues with your ideas!

### Offline use

We are also working to specify QR Dates to work offline using a chained certificate and mobile apps.

# Using this library

**This library does NOT generate the QR code image for you!** It only aims to help you conform to the QR Date spec. You need to feed the output of the date creation function (specifically, the `url` value) into a QR code image generator to get the correct output image.

**This is an ES module written in TypeScript.** CommonJS is *not* supported. The minimum NodeJS version is 14.19.0.

### Installation

```sh
npm i --save qrdate
```

# API

## `createDynamicQRDate(params: { privateKey: KeyLike; urlBase?: string; formatter?: CustomQRDateURLFormatter; }): DynamicQRDate`

Create a Dynamic QR Date spec object with web-based verification. Use this function to create QR Date that users can verify on your website. The client flow is:

1. User requests your website.
2. Your server calls `createDynamicQRDate`, returning the results to the client.
3. Draw the QR code on the client from the `url` property on the return object.

### Input object

Attribute    | Type                     | Required                      | Explanation
-------------|--------------------------|-------------------------------|--------------------
`params.urlBase`    | string                   | Either `params.urlBase` or `params.formatter` are required. If `params.formatter` is defined, `params.urlBase` is not used.  | Your verification base URL - do NOT change this once you have decided on it without some kind of redirection in place! All your QR codes will start with the base URL.
`params.formatter`  | CustomQRDateURLFormatter | See above | A formatter
`params.privateKey` | KeyLike (string / Buffer / KeyObject) | Yes | Your ed25519 private key. The key *can* be base64url encoded, and the function will try to parse it for you.

### Output object

All the return values are designed to be safe to be shown to the client:

Attribute    | Type                     | Explanation
-------------|--------------------------|---------------------
`timestamp`  | number                   | UNIX timestamp
`url`        | string                   | The text to render into a QR code.
`signature`  | string                   | Base64url-encoded signed timestamp
`version`    | number                   | The version of the QR Date

### Example

```ts
import { createDynamicQRDate } from 'qrdate';

const urlBase = 'https://localhost/v';
const privateKey = `-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIDgQtOtTyj6rlKFp2+qwlrgzGeA2sxJz4agZKzsCFGKw\n-----END PRIVATE KEY-----`;

const qrDateDynamic = createDynamicQRDate({
  urlBase,
  privateKey, // or a Buffer or KeyObject
});

console.log(qrDateDynamic);
// -----------^
// {
//   timestamp: 1646109781467,
//   url: "https://qrdate.org/v?s=x9hKYrJH0e0BPyVqwnKMAMmxEudkvJccqzjHgaheWFJEd86rW_XdwCKZid7k0teMq7Ygp1PfAJhnT64WcyD6CA&t=1646109781467&v=1",
//   signature: "x9hKYrJH0e0BPyVqwnKMAMmxEudkvJccqzjHgaheWFJEd86rW_XdwCKZid7k0teMq7Ygp1PfAJhnT64WcyD6CA",
// }

```

## `createStaticQRDate(privateKey: KeyLike): StaticQRDate`

**Note: This is not production ready. The certificate chain is still on a concept level.**

Create a Static QR Date spec object for offline verification. Use this function to create QR Date that users can verify *without* your website using a certificate chain. The client flow is:

For users wanting to display codes:

1. User requests your website or uses an offline app.
2. Your server calls `createStaticQRDate`, returning the results to the client.
3. Draw the QR code on the client from the `url` property on the return object.

For users wanting to verify the codes:

1. You publish your public key either in a public or private place, depending on what sort of a setup you wish.
2. The user inserts your public key into their key store, with the store creating a SHA256 hash of it as the fingerprint.
3. The user can verify the signature by looking up the public key in their keystore using the fingerprint supplied in the QR Date and use that to perform the verification.

Attribute    | Type                     | Required                      | Explanation
-------------|--------------------------|-------------------------------|--------------------
`privateKey` | KeyLike (string / Buffer / KeyObject) | Yes | Your ed25519 private key. The key *can* be base64url encoded, and the function will try to parse it for you.

### Output object

All the return values are designed to be safe to be shown to the client:

Attribute     | Type                     | Explanation
--------------|--------------------------|---------------------
`timestamp`   | number                   | UNIX timestamp
`url`         | string                   | The text to render into a QR code.
`signature`   | string                   | Base64url-encoded signed timestamp
`fingerprint` | string                   | Base64url-encoded fingerprint hashed from your public key
`version`     | number                   | The version of the QR Date

### Example


```ts
import { createStaticQRDate } from 'qrdate';

const privateKey = `-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIDgQtOtTyj6rlKFp2+qwlrgzGeA2sxJz4agZKzsCFGKw\n-----END PRIVATE KEY-----`;

const qrDateStatic = createStaticQRDate({
  privateKey // or a Buffer or KeyObject
});

console.log(qrDateStatic);
// -----------^
// {
//   timestamp: 1646142017145,
//   url: 'qrdate://v?s=tyYD957Q3i6TGUJi7-xzypIl4Be6mM8Jqvc2-nAswRuTadlCEELtMnXWqykcpzneuXJa772vNXc3T0pQFcPBBw&t=1646142017145&f=soyUshlcjtJZ8LQVqu4_ObCykgpFN2EUmfoESVaReiE&v=1',
//   signature: 'tyYD957Q3i6TGUJi7-xzypIl4Be6mM8Jqvc2-nAswRuTadlCEELtMnXWqykcpzneuXJa772vNXc3T0pQFcPBBw',
//   fingerprint: 'soyUshlcjtJZ8LQVqu4_ObCykgpFN2EUmfoESVaReiE',
//   version: 1
// }
//
// In the above url, `/v` has been added after qrdate:// automatically.
// If you are making your own implementation, be sure to include the `/v` for compatibility.
// A static URL should always start with `qrdate://v` to keep it universal and not to clutter the produced QR code further.
// Please see the spec for V1 Static URLs for further info.
//
```

## `verifyDynamicQRDate(params: { signature: string; timestamp: string|number; publicKey: KeyLike }): boolean`

Verify that the signature on a signed dynamic QR Date timestamp is valid.

Attribute    | Type                                        | Required | Explanation
-------------|---------------------------------------------|----------|--------------------
`params.signature`  | string                               | Yes      | Signature passed from client
`params.timestamp`  | number / string                      | Yes      | Signature passed from client
`params.publicKey` | KeyLike (string / Buffer / KeyObject) | Yes      | Your ed25519 public key. The key *can* be base64url encoded, and the function will try to parse it for you.

### Example

```ts
import { verifyDynamicQRDate } from 'qrdate';

const valid = verifyDynamicQRDate({
  signature: "x9hKYrJH0e0BPyVqwnKMAMmxEudkvJccqzjHgaheWFJEd86rW_XdwCKZid7k0teMq7Ygp1PfAJhnT64WcyD6CA", 
  timestamp: 1646109781467,
  version: 1,
  publicKey: `-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAJH6tPGKF1ZCMP3DUdpiin7rDLmVb/9A1zyllxaU6cjg=\n-----END PUBLIC KEY-----`; // or a Buffer or KeyObject
});

console.log(valid);
// boolean ---^
```

## `verifyStaticQRDate(params: { signature: string; timestamp: string|number; fingerprint: string; publicKey: KeyLike }): boolean`

**Note: This is not production ready. The certificate chain is still on a concept level.**

Verify that the signature on a signed static QR Date timestamp is valid.

Attribute            | Type                                  | Required                      | Explanation
---------------------|---------------------------------------|-------------------------------|--------------------
`params.signature`   | string                                | Yes                           | Signature passed from qrdate:// URL
`params.timestamp`   | number / string                       | Yes                           | Timestamp passed from qrdate:// URL
`params.fingerprint` | string                                | Yes                           | Public key fingerprint passed from qrdate:// URL
`params.publicKey`   | KeyLike (string / Buffer / KeyObject) | Yes                           | Ed25519 public key corresponding to the fingerprint. The key *can* be base64url encoded, and the function will try to parse it for you.

### Example

```ts
import { verifyStaticQRDate } from 'qrdate';

const valid = verifyDynamicQRDate({
  timestamp: 1646147373409,
  signature: 'SARv4c8pJYVxqEK8BCcPy8dgXEAkyWDPRAhvT70RotaHgnko1BkBh-maNzqAicDzqcz7EV65OwLDno7HWT1iAg',
  fingerprint: 'soyUshlcjtJZ8LQVqu4_ObCykgpFN2EUmfoESVaReiE',
  version: 1,
  publicKey: `-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAyHAuTvSG6RZaKGOfzI6iZ8NVaebZpFAFEN/85o6c3nE=\n-----END PUBLIC KEY-----` // or Buffer or KeyObject
});

console.log(valid);
// boolean ---^
```

## `generateKeys(): { privateKey: string|KeyObject; publicKey: string|KeyObject }`

Use to generate a pair of keys. You can use only the `privateKey` to interact with the library - any public keys that are required can be derived from it. **Store your private key in a safe place!** When used with QR Date it is essentially *a key to the future*.

### Example

```ts
import { generateKeys } from 'qrdate';
const { privateKey, publicKey } = generateKeys(true);
// true will return keys as string (default)
// false returns them as KeyObjects
console.log(privateKey); // -----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----
console.log(publicKey); // -----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----
```

# QR Date URL Specification

This is the initial version of the specification. If you have any ideas or input, feel free to raise an issue.

## Dynamic QR Date v1 spec

Use this spec when you're hosting a verification page for QR Dates on your server. Anyone scanning a QR Date will load your website for verification. The public key will not be included in the generated URL, so it can be shorter.

```
https://qrdate.org/v?s=twBgNlHANnq5BX1IJb6qAWyfeQkARwIFGiOysZAAIcyba08piw30358RiK9GmCbl3LfloNxoUfsdt6eeKJkyDQ&t=1646148299484&v=1
```

### Important security considerations

- **DO NOT LEAK PRIVATE INFORMATION BY STORING ANY SORT OF STATE IN THE URL.**
- **DO NOT STORE IP ADDRESSES OF PEOPLE WHO REQUEST DATES.**
 
It is imperative that you stick to the spec. Do not create any sort of unintended tracking mechanisms by adding your own parameters or state.

### Required query parameters

The query parameters are the contract for parsing the URL. You need to provide these for the URL to be considered a QR Date.

Parameter | Explanation
----------|--------------
`t`       | Timestamp (UNIX)
`s`       | Signature (ed25519)
`v`       | Version (1)

### Format the beginning of the URL

**Do not point to qrdate.org in your implementation**, as we do not host your private key! `https://qrdate.org/v` is only a placeholder for your domain and hosting setup.

## Static QR Date v1 spec

Use this spec when you want to use QR Date without hosting a separate verification page. 

```
qrdate://v?s=d4pOIiiOpOv5q0FPaPUYgZDJERwpZ5JKYOex3nOKLCgMWUL9t3VKCHAdRZJs4a6x5HVTeMaSfSyVi4hK3GhCDQ&t=1646148299487&f=soyUshlcjtJZ8LQVqu4_ObCykgpFN2EUmfoESVaReiE&v=1
```

### Don't add your own parameters in this one either

Sticking to the spec means you're only doing the bare necessary thing- signing a timestamp, and not leaking someone's private information by mistake.

### Required origin and pathname

**All** v1 static URLs should start with `qrdate://v` and then immediately proceed to the query parameters. Do **not** add your own parameters or change the URL format in any way. The order of the query parameters does not matter.

### Required query parameters

Parameter | Explanation
----------|--------------
`t`       | Timestamp (UNIX)
`s`       | Signature
`f`       | Public key fingerprint (SHA256) - **NOT** the public key
`v`       | Version (1)

This type of URL can be parsed without external parties as it contains both the signature and public key **fingerprint** (not the public key itself), which can be compared against a key store that you need to implement in a client application consuming these URLs. Therefore, for example, a system that generates QR Dates every minute through a script to serve on a static website is possible, without needing further web-based validation as long as the user has added the public key (that you must publish elsewhere) into their trusted list. For automatic validation, the consuming client must then implement some sort of a key store, which is outside the scope of this package.

## Contact

- Website: [https://qrdate.org](https://qrdate.org)
- Twitter: [@QRDate](https://twitter.com/QRDate)

## Contributors

- miunau
- Kris
- Cendyne
- ...and others preferring to stay anonymous

Want to help out? We welcome contributions and people adopting this idea into other languages and environments. Please conform to the QR Date specification to keep things interoperable. If you have ideas for the spec, please file an issue!

### Thanks

Hosting for QRDate.org is sponsored by Vercel.

[![Powered by Vercel](powered-by-vercel.svg)](https://vercel.com/?utm_source=qrdate&utm_campaign=oss)

## License

### INTELLECTUAL PROPERTY

QR Date, QR Time, and QRDate.org are the property of QRDate.org.  
Contact: [hi@qrdate.org](mailto:hi@qrdate.org)

### THIS LIBRARY IS LICENSED UNDER:

MIT &copy; QRDate.org + contributors

### THE QR DATE SPEC IS LICENSED UNDER:

CC Attribution 4.0 International (CC BY 4.0) &copy; QRDate.org + contributors
