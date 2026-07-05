---
repo: tone-row/flowchart-fun
url: 'https://github.com/tone-row/flowchart-fun'
homepage: 'https://flowchart.fun/'
starredAt: '2021-04-19T01:12:12Z'
createdAt: '2021-03-01T01:55:23Z'
updatedAt: '2025-02-24T07:09:35Z'
language: TypeScript
license: MIT
branch: main
stars: 3184
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:48.586Z'
description: Easily generate flowcharts and diagrams from text ⿻
tags:
  - diagram-generator
  - flowchart
  - flowchart-editor
  - generator
  - graphs
  - open-source
  - react
---

# Flowchart Fun

[Flowchart Fun](https://flowchart.fun/) is a webapp for quickly generating flowcharts from text. With a fast and intuitive workflow, you can visualize your ideas and plans in minutes.

<img src="https://github.com/tone-row/flowchart-fun/blob/main/app.png?raw=true" alt="screenshot" width="600" />

## 📝 Example

For an example of how Flowchart Fun works, take the following input:

```
Node A
  goes to: Node B
  and: Node C
    goes back to: (Node A)
```

You can generate this flowchart with just a few clicks:

<img src="./example1.png" alt="example flowchart" width="400" />

## 🛠️ Development

Flowchart Fun is built with [React](https://reactjs.org/) and [cytoscape.js](https://github.com/cytoscape/cytoscape.js).

### 💡 Prerequisites

If you plan on developing the premium features, you will need accounts on [Vercel](https://vercel.com/docs/concepts/functions/introduction), [Supabase](https://supabase.io/), [Stripe](https://stripe.com/) and [Sendgrid](https://sendgrid.com/).

### 🚀 Getting Started

1. Clone the repository
1. Copy `.env.example` to `.env` and add env variables
1. `pnpm install` and `vercel dev`

#### 🔒 To run with login features:

`vercel dev`

Note: You will need to create a [Vercel account](https://vercel.com/signup) and [install the CLI](https://vercel.com/download) to run the app locally. To deploy the app, you will need a Pro Vercel account because it uses more than 12 serverless functions.

#### ⚙️ To run without login features:

`pnpm dev`

### 🌐 Translations

We welcome anyone interested in helping us add translations to Flowchart Fun. Translations can be added to the .po files located in /app/src/locales/[language]/messages.po. After adding translations, please run `pnpm -F app compile`. We would appreciate your help in making Flowchart Fun accessible in even more languages!

#### 💬 Interested in Adding a Language?

Let us know about your plans in the [Discord](https://discord.com/invite/wPASTQHQBf), and we'd be glad to lend a helping hand.

### 🧪 Tests

To ensure quality and accuracy, Flowchart Fun employs [Jest](https://jestjs.io/) for unit testing and [Playwright](https://github.com/microsoft/playwright) for e2e testing.

#### Unit Tests

`pnpm -F app test`

#### E2E Tests

`pnpm -F app e2e`

### 🔍 Analyzing the Bundle

`pnpm -F app build && pnpm -F app analyze`

## 🤝 Contributing

If you're interested in contributing, we'd love to have your help with the underlying syntax parser - [Graph Selector](https://github.com/tone-row/graph-selector). Our community welcomes all contributions, big or small!

To get started, please fork the dev branch and start developing and testing your feature. If you have any questions, don't hesitate to join the discussion on [Discord](https://discord.com/invite/wPASTQHQBf). We're always happy to help and answer any questions you may have.
