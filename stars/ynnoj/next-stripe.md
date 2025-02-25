---
repo: ynnoj/next-stripe
url: 'https://github.com/ynnoj/next-stripe'
homepage: ''
starredAt: '2021-01-30T19:55:19Z'
createdAt: '2021-01-26T14:58:02Z'
updatedAt: '2025-02-11T06:47:00Z'
language: JavaScript
license: MIT
branch: beta
stars: 565
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:04.629Z'
description: Simplified server-side Stripe workflows in Next.js
tags:
  - nextjs
  - stripe
---

<h2 align="center">
  NextStripe
</h3>

<p align="center">
  Simplified server-side Stripe workflows in Next.js
</p>

> ⚠️ PLEASE NOTE: This library is currently in beta and should be used in production with caution!

## Getting Started

```
yarn add next-stripe@beta
```

### Add the API route

Create a `[...nextstripe].js` catch-all route in your project's `pages/api/stripe` directory.

> ⚠️ PLEASE NOTE: It is recommended you use a [restricted key](https://stripe.com/docs/keys#limit-access) with limited API access with this library. These keys can be created and configured with the required access in the Stripe Dashboard.

```js
import NextStripe from 'next-stripe'

export default NextStripe({
  stripe_key: process.env.STRIPE_RESTRICTED_KEY
})
```

## Usage

`next-stripe/client` exports helper functions to call the Next.js API routes.

### Checkout Sessions

#### Create

[Stripe API Docs](https://stripe.com/docs/api/checkout/sessions/create)

```js
import { createCheckoutSession } from 'next-stripe/client'

const session = await createCheckoutSession({
  success_url: window.location.href,
  cancel_url: window.location.href,
  line_items: [{ price: 'price_id', quantity: 1 }],
  payment_method_types: ['card'],
  mode: 'payment'
})
```

### PaymentIntents

#### Create

[Stripe API Docs](https://stripe.com/docs/api/payment_intents/create)

```js
import { createPaymentIntent } from 'next-stripe/client'

const paymentIntent = await createPaymentIntent({
  amount: 1000,
  currency: 'usd'
})
```

#### Confirm

[Stripe API Docs](https://stripe.com/docs/api/payment_intents/confirm)

```js
import { confirmPaymentIntent } from 'next-stripe/client'

const paymentIntent = await confirmPaymentIntent('pi_id', {
  payment_method: 'pm_id'
})
```

#### Retrieve

[Stripe API Docs](https://stripe.com/docs/api/payment_intents/retrieve)

```js
import { retrievePaymentIntent } from 'next-stripe/client'

const paymentIntent = await retrievePaymentIntent('pi_id')
```

#### Update

[Stripe API Docs](https://stripe.com/docs/api/payment_intents/update)

```js
import { updatePaymentIntent } from 'next-stripe/client'

const paymentIntent = await updatePaymentIntent('pi_id', {
  amount: 1000,
  currency: 'usd'
})
```

### Billing Portal Sessions

#### Create

[Stripe API Docs](https://stripe.com/docs/api/customer_portal/create)

```js
import { createBillingPortalSession } from 'next-stripe/client'

const session = await createBillingPortalSession({
  customer: 'cus_id',
  return_url: window.location.href
})
```

## Acknowledgements

- A lot of the patterns in this library were inspired by [NextAuth](https://github.com/nextauthjs/next-auth).
- Thanks to [Jamie Barton](https://github.com/notrab/next-stripe) for the initial idea.
