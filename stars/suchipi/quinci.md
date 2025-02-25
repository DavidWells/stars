---
repo: suchipi/quinci
url: 'https://github.com/suchipi/quinci'
homepage: ''
starredAt: '2022-02-24T05:00:57Z'
createdAt: '2018-04-27T23:26:00Z'
updatedAt: '2023-09-24T13:32:53Z'
language: JavaScript
license: MIT
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:11.516Z'
description: "\U0001F935 Self-hosted, minimal GitHub CI server"
tags: []
---

<p align="center"><img width="30%" alt="quinCI logo" src="https://cdn.rawgit.com/suchipi/quinci/master/logo/quinCI.svg"/></p>

quinCI is a self-hosted, minimal GitHub CI server that runs scripts in response to GitHub webhook events.

It is an alternative to complex, monolithic CI servers like Jenkins. Instead of providing a runner architecture, loggers, a plugin system, and pipelines... it just runs script files. If your CI needs are not very complex, quinCI may be easier to set up and debug than Jenkins.

quinCI is a good fit for you if:

- You want to run CI on your own server
- You use GitHub
- You want to run CI when a commit is added to the `master` branch
- You want to run CI when a pull request is opened or updated

|                                                                                                                                                   |                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![quinCI's web UI, showing the status of different jobs and their run output](https://cdn.rawgit.com/suchipi/quinci/master/web-ui-screenshot.png) | ![quinCI's GitHub bot posting comments on GitHub and setting the commit status](https://cdn.rawgit.com/suchipi/quinci/master/github-screenshot.png) |

## How it Works

quinCI runs "tasks" when certain "events" occur. A task is an executable file that lives in your repo in the `quinci` folder. An event is something that can happen on GitHub, like a commit being added to master, or a Pull Request being opened.

Whenever quinCI runs a task, the instance of that task running for a given commit or pull request is called a "job".

You can view all the jobs quinCI is running or has run recently by opening the port quinCI is running on in your browser. You can also cancel jobs from this page.

Here's a list of the events quinCI reacts to, and what task it will run for each event:

| Event                                          | Task                                           |
| ---------------------------------------------- | ---------------------------------------------- |
| Commit pushed to or merged into a named branch | matches the branch name, eg `main` or `master` |

When you push a commit to master/main, or merge a PR into master/main, quinCI will run the `master` or `main` task on your repo. To do so, it:

- Clones your repo
- Checks out the commit you just pushed
- Marks the commit status on GitHub as "pending"
- Runs `./quinci/master` or `./quinci/main` inside your repo (depending on the name of the branch that got new commits)

- If `./quinci/master` or `./quinci/main` exits with a nonzero status code, quinCI will mark the commit status on GitHub as "failure" and leave a comment on the commit with information about the failure.
- If `./quinci/master` or `./quinci/main` exits with a status code of zero, quinCI will mark the commit status on GitHub as "success".

To run tasks for branches with different names, pass a comma-separated list of branch names on the command line using the `--named-branches` CLI flag. The default value of `--named-branches` is `master,main`. When you specify named branches using this CLI flag, it replaces the default value. So, if you want to include the default `master` and `main` tasks, you will need to include them, eg `--named-branches master,main,staging,production`.

> Note: When adding a task for a named branch, you may wish to also use `--queue-concurrency` to specify how many jobs can run concurrently for that task. If unspecified, the concurrency defaults to 1, meaning only one job can be running for that task at a time, and other jobs will wait until a running job has completed.

| Event                                 | Task           |
| ------------------------------------- | -------------- |
| PR opened, or new commits added to PR | `pull-request` |

When you open a Pull Request or push new commits onto a PR, quinCI will run the `pull-request` task on your repo. To do so, it:

- Clones your repo
- Checks out the commit you just pushed or opened a PR for
- Marks the commit status on GitHub as "pending"
- Runs `./quinci/pull-request` inside your repo

quinCI will post a comment when it starts running the task, and another comment when it has finished the task, which will include the results of the build.

- If `./quinci/pull-request` exits with a nonzero status code, quinCI will mark the commit status on GitHub as "failure" and leave a comment on the PR indicating the task failed.
- If `./quinci/pull-request` exits with a status code of zero, quinCI will mark the commit status on GitHub as "success" and leave a comment on the PR indicating the task succeeded.

| Event                                    | Task           |
| ---------------------------------------- | -------------- |
| Comment with special phrase posted on PR | `pull-request` |

In any PR, you can leave a comment with the phrase "quinCI run" or "quinCI test", and quinCI will re-run the `pull-request` task.

The phrase only needs to match `/quin+c[eyi]+.* (?:re)?(?:run|test)/i`, so you can write "Mr. Quincy, please test the code again, if you wouldn't mind" and it will work, too.

| Event                                        | Task   |
| -------------------------------------------- | ------ |
| Comment with special phrase posted on commit | varies |

On any commit, you can leave a comment with the phrase "quinCI run master", "quinCI run main", or "quinCI run pull-request" to run the `master`, `main`, or `pull-request` tasks on that commit.

The phrase only needs to match `/quin+c[eyi]+.* run ([\w.-]+)/i`, so you can write "Quinncey, could you please run master" and it will work, too.

You can also use this to run custom tasks; for example, if you create the file `quinci/deploy` in your repo, you can comment "quinCI run deploy" on a commit, and quinCI will clone the repo, check out the commit, and run `./quinci/deploy`.

> Note: When creating a custom task, you may wish to also use `--queue-concurrency` to specify how many jobs can run concurrently for that task. If unspecified, the concurrency defaults to Infinity, meaning as many jobs as are requested can be running for that task at a time.

## Installation and Setup

### Create tasks for quinCI to run

quinCI expects to find two executable files in your repo: `quinci/master` (or `quinci/main`), and `quinci/pull-request`. Create these in your repo before installing quinCI, or else your builds will fail.

`quinci/master` will be run for every commit added to master, `quinci/main` will be run for every commit added to main, and `quinci/pull-request` will be run for every pull request.

If you override the `--named-branches` setting via the CLI in such a way that `master` and/or `main` are no longer present, you don't need to have executable files at `quinci/master` or `quinci/main`.

The scripts can do whatever you want. Here's an example `quinci/master` script that runs tests and then deploys the code:

```sh
#!/usr/bin/env bash
set -e

yarn test
yarn deploy
```

And here's an example `qunci/pull-request` script that just runs the tests (without deploying):

```sh
#!/usr/bin/env bash
set -e

yarn test
```

Make sure to make these files executable:

```sh
chmod +x quinci/master
chmod +x quinci/pull-request
```

### Create GitHub App

quinCI is used as a [GitHub App](https://developer.github.com/apps/). Because it's self-hosted, the webhook URL and authentication details will vary, so you need to create a custom GitHub App for your quinCI server. You can [create a new GitHub App here](https://github.com/settings/apps/new).

- **Name** the app whatever you want
- **Description** is optional
- **Homepage URL** needs to be filled in but it doesn't matter what it is
- **User authorization callback URL** needs to be filled in but it doesn't matter what it is
- Leave **Setup URL** blank
- For the **Webhook URL**, use a public URL that you will run quinCI on, eg `http://mydomain.com:7777/`. You can use [ngrok](https://ngrok.com/) to expose a URL to your local box for testing. Also, you can change this later without re-creating the GitHub App.
- You have to have a **Webhook secret**. Generate something random. You'll need to include it when running quinCI on your server, so keep it somewhere.

Your app needs these permissions:

- **Repository contents**: Read only
- **Issues**: Read & write
- **Pull requests**: Read & write
- **Commit statuses**: Read & write

Everything else can be "No access".

Subscribe to these events:

- **Commit comment**
- **Push**
- **Issue comment**
- **Pull request**

You don't need to subscribe to anything else.

### Get GitHub App ID

After creating your GitHub App, go to its page under "GitHub Apps" in [GitHub Developer settings](https://github.com/settings/apps) and copy its ID from the "About" section. You'll need this when running quinCI on your server.

### Generate Private Key

From your GitHub App page, generate a private key and download it (It'll be a `.pem` file). You'll need to use it when running quinCI on your server, so keep it somewhere.

### Configure your repo to use the GitHub App

Go to your App's page in [GitHub Developer settings](https://github.com/settings/apps) and click "Install app" to install your Github App onto your repo.

### Run quinCI on your server

- You need [Node.js](https://nodejs.org/en/) 8.11.1 or higher to run quinCI.
- Install the quinCI client on your server: `npm i -g quinci`
- Copy the `.pem` private key you downloaded earlier somewhere on your server
- Make a text file and put your webhook secret in it, and put this file somewhere on your server
- Run `quinci` with the following command line switches:

```
Options:
  --help                 Show help                                               [boolean]
  --version              Show version number                                     [boolean]
  --port                 Port to run the HTTP server on                          [required] [default: 7777]
  --app-id               GitHub App ID                                           [required]
  --app-cert             Path to the GitHub App's private key pem file           [required]
  --webhook-secret-file  Path to a text file containing your Webhook secret      [required]
  --queue-concurrency    How many instances of a job are allowed to run at once.
                         Use 'Infinity' for no limit.                            [default: "master=1,main=1,pull-request=3"]
  --web-url              URL at which the web UI can be accessed                 [required]
  --named-branches       Comma-separated list of branch names that have
                         corresponding jobs in the 'quinci' folder in the repo
                         root, that should be run when commits are pushed to
                         that branch.                                            [default: "master,main"]
```

So for example:

```sh
quinci --port 8080 --app-id 12345 --app-cert secrets/quinci.private-key.pem --webhook-secret-file secrets/webhook-secret.txt --web-url http://example.com:8080
```

This will run quinCI in the current directory.

## Troubleshooting

- quinCI will not run in response to actions from users who do not have write access to the repository, as a security measure. If a user without write access opens a PR and you want to run its tests, comment "quinCI test this" on the PR.
- quinCI uses the [debug](https://www.npmjs.com/package/debug) module to log debugging information. To view debug logs while running, set the environment variable `DEBUG` to `quinci:*`.

## License

MIT
