---
repo: codegram/jamstack-cfp
url: 'https://github.com/codegram/jamstack-cfp'
homepage: 'https://jamstack-cfp.netlify.app/'
starredAt: '2020-05-11T19:01:57Z'
createdAt: '2020-04-09T13:32:35Z'
updatedAt: '2024-12-21T23:35:56Z'
language: Vue
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:53.733Z'
description: Run your call for papers using JAMStack + GitHub Actions
tags: []
---

# JAMStack CFP

This is an example call for papers application, made to showcase how to make use of GitHub Actions to add user generated content to your JAMStack static site! It's built with Gridsome but the same approach can be done with Gatsby or any other static generator.

## How it works

When a user submits the from, a serverless function triggers a GitHub workflow that generates a pull request that adds a `json` file to the repository. Once this PR is merged, Gridsome generates the site statically listing all the accepted submissions. Connecting the GitHub's GraphQL API to Gridsome, it also generates the pending submissions list from the open PRs. The result is a 100% static site that is able to handle user generated content!

## Authentication

To make it easier to test and play with, I have not added any authentication method, but you can easily connect the app with a GitHub OAuth app or similar to prevent abuse and be able to communicate with users. Just take into consideration not to store any sensitive information if your repository is public (I'm not sure if storing it in a private repository has any legal issues).

## When to use it

Obviously, this approach has some limitations. The submission process can take a few minutes, so if you need immediate feedback it's not a good option. Same if the amount of submissions you need to handle in a short period of time is super high. As a rule of thumb, this is a good usecase for a proof of concept, MVP or small app.

## Fork the repository

Feel free to fork this repository and adapt it to your project. If you do, I'd love to hear about it! Open an issue or reach me [on twitter](https://twitter.com/pincfloit).

You need to add a `GH_TOKEN_PERSONAL` secret in your repository settings, containing a token with repo scope. You can create the token in [your GitHub settings](https://github.com/settings/tokens). It's going to be used to run GitHub Action workflows, connect with GitHub's GraphQL API and to be able to trigger a repository dispatch event to your repository.

You will need to update the hardcoded `owner` and `name` values in `src/pages/Pending.vue` and `functions/submit.js` to match your GitHub's uername and repository name.

### Run the project locally

Create an `.env` file containing the `GH_TOKEN_PERSONAL` variable, then run:

```npm run develop```

### Deploy

#### Netlify

Deploying to [Netlify](https://www.netlify.com/) is the easiest option, as we need a serverless function.

Add the `GH_TOKEN_PERSONAL` environment variable in your project settings.

You will also need to configure a hook if you want your page to be rebuilt when a new submission PR is opened. Create a `Build hook` in your settings. Copy the url, and go to your GitHub repository settings: `https://github.com/your-username/your-repo/settings/hooks`. Add a new webook, paste the URL and select `Let me select individual events.`, then choose `Pull requests`.

Ready to go! 🚀

#### GitHub pages

You can choose to deploy to GitHub pages too. The front-end deployment workflow is ready, including the trigger to rebuild the page after a PR is open, but you should handle yourself the deployment of the serverless function to AWS or similar.

If you are not serving the project from the root of your domain (usually the case when using GitHub pages, when deploying to `https://your-username.github.io/your-repo`), you should also a `BASE_PATH` variable with the correct path (`/your-repo`) to your repository's secrets in order to load the assets correctly.
