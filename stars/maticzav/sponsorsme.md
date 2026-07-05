---
repo: maticzav/sponsorsme
url: 'https://github.com/maticzav/sponsorsme'
homepage: null
starredAt: '2021-12-17T06:16:13Z'
createdAt: '2020-11-23T11:16:52Z'
updatedAt: '2022-01-04T21:17:15Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:27.914Z'
description: A lightweight utility to check whether a user sponsors you.
tags: []
---

<div align="center"><img src="media/logo.svg" width="240" /></div>

# sponsorsme

![Test](https://github.com/maticzav/sponsorsme/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/maticzav/sponsorsme/branch/main/graph/badge.svg?token=NA8CH6JE76)](https://codecov.io/gh/maticzav/sponsorsme)
[![npm version](https://badge.fury.io/js/sponsorsme.svg)](https://badge.fury.io/js/sponsorsme)

> A lightweight utility to check whether a user sponsors you.

This package lets you get paid for the work you do by leveraging the GitHub Sponsors community. It's meant to be used primarily with GitHub applications and other similar workflows, but is general enough to be used just about anywhere.

All you need to start using it is a token of your sponsored account.

## Example

```ts
const sponsors = Sponsors({
  token: 'bearer <token>',
})

// Tells whether someone is in tiers above 10€
function isVIPSponsor(sponsorhip?: Sponsorship): boolean {
  return sponsorhip?.tier.monthlyPriceInCents >= 10 * 100
}

const sponsor = await sponsors.getInfo('maticzav')

if (isVIPSponsor(sponsor)) {
  // Do something special!!!
}
```

## Installation

```bash
yarn add sponsorsme
```

You can get the token from [GitHub](https://github.com/settings/tokens). Make sure you check at least 'user' and 'read:org' in permissions list.

> ❗️ NOTE: The token you use to check whether someone is your sponsor is not the same as your GitHub application's key!

## Docs

```ts
type SponsorsOptions = {
  /**
   * Whether the client should use internal cache or not.
   */
  cache?: boolean
  /**
   * Viewer's GitHub token used for authentication.
   * You should prefix the token with "bearer".
   */
  token: string
}

/**
 * Creates a Sponsors client that you can use to get sponsors information.
 */
class Sponsors {
  constructor(opts: SponsorsOptions): Sponsors
  /**
   * Returns information about the sponsor if it exists.
   */
  getInfo(login: string): Promise<Optional<Sponsorship>>

  /**
   * Tells whether there exists a sponsor with the given login.
   */
  isSponsor(login: string): Promise<boolean>

  /**
   * Clears the cache.
   */
  flush(): void
}

//
// Types
//

type Sponsorship = {
  id: string
  createdAt: string
  /**
   * Sponsor information.
   */
  sponsor: SponsorshipSponsor
  /**
   * Whether sponsorship is publicly visible.
   */
  public: boolean
  /**
   * Information about the tier.
   */
  tier: SponsorshipTier
}

type SponsorshipSponsor = {
  /**
   * Login handle of the sponsor.
   */
  login: string
  /**
   * Sponsor's email if available.
   */
  email?: string
}

type SponsorshipTier = {
  id: string
  createdAt: string
  /**
   * Information about the tier.
   */
  name: string
  description: string
  /**
   * The amount sponsoree receives each month.
   */
  monthlyPriceInCents: number
}
```

## License

MIT @ Matic Zavadlal
