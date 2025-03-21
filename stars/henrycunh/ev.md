---
repo: henrycunh/ev
url: 'https://github.com/henrycunh/ev'
homepage: ''
starredAt: '2022-02-05T18:51:57Z'
createdAt: '2022-01-31T00:05:02Z'
updatedAt: '2024-11-13T16:05:31Z'
language: TypeScript
license: NA
branch: main
stars: 62
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.214Z'
description: '✨ A tool for versioning, securing and easily sharing environment variables'
tags:
  - encryption
  - environment
  - environment-variables
  - sharing
  - tool
---

<div align="center">

# ev
  <sup>a tool for versioning, securing and easily sharing environment variables</sup>

</div>


<p align="center">
  <table>
    <tbody>
      <td align="center">
        <img width="2000" height="0"><br>
        <a href="#initializing">initializing</a> • <a href="#commands">commands</a> • <a href="#using-in-your-project">using in your project</a><br>
        <img width="2000" height="0">
      </td>
    </tbody>
  </table>
</p>

## Features
- ⏱ **Version control** - allows for storing environment variables securely in git
- 🔑 **Secure** - uses a single secret to secure your variables
- 🧑‍💻 **Easy sharing** - sharing the secret means sharing your variables
- 🛠 **Great DX** - tools for easily managing variables  

## Getting started

### Initializing

Install [**Node >= 14**](https://nodejs.org/en/) and run:
```
npx ev
```
It will prompt you for a new **secret key** and create two new files:
  - `.ev/vars` - where your environment variables are encrypted and safely stored,
  - `.ev/secret` - your secret key, whose must not be version controlled

And add `.ev/secret` to `.gitignore`

You can install `ev` globally <sup>*(so you wont have to prepend `npx`)*</sup> by running,
```bash
npm install -g @henrycunh/ev
```

## Commands

<details open>
<summary><strong>Adding new variables →</strong></summary>
<br>

```bash
ev MY_KEY=VALUE OTHER_KEY=OTHER_VALUE
```
<sup>This will add the `MY_KEY` and `OTHER_KEY` variables, if the variables already exists, their value will be overrided</sup>
</details>

<details>
<summary><strong>Exporting variables into the environment →</strong></summary>
<br>
  
```bash
ev | source
# you can alternatively use
eval $(ev)
```
<sup>This will export every variable into the environment</sup>

You can test it by running

```bash
ev TEST=123 && ev | source && echo $TEST
```
<sup>This should print `Added 1 variables.` followed by `123`.</sup>
</details>
  
<details>
<summary><strong>Removing variables →</strong></summary>
<br>
  
```bash
ev rm MY_KEY OTHER_KEY
```
<sup>This will remove the `MY_KEY` and `OTHER_KEY` variables</sup>
</details>

<details>
<summary><strong>Listing variables →</strong></summary>
<br>
  
```bash
ev ls
```
<sup>This will list all variables</sup>
```bash
ev ls MY_KEY
```
<sup>This will list the `MY_KEY` variable</sup>
</details>

<details>
<summary><strong>Changing the secret key →</strong></summary>
<br>
  
```bash
ev change-secret
```
<sup>This will prompt for the old key and the new one, if the old key is correct, it will re-encrypt the variables with the new one</sup>
</details>

<details>
<summary><strong>Setting the secret key →</strong></summary>
<br>
  
In case you mistype your secret, you can just run this to type the secret again
```bash
ev set-secret
```
<sup>This will prompt for the secret</sup>
</details>

<details>
<summary><strong>Using different environments →</strong></summary>
<br>
  
You can append the option `--env` <sup>*(or `-e`)*</sup> on any command to specify a different environment
```bash
ev -e staging MY_KEY=VALUE_IN_STAGING
```
<sup>The variables for each environment is stored in a different file</sup>
</details>
  
<details>
  <summary><strong>Loading variables from a <code>.env</code> file →</strong></summary>
<br>
  
```bash
ev load .env
```
<sup>All the variables on `.env` will be loaded into the default environment</sup>
</details>

<details>
  <summary><strong>Setting a different secret for specific environments →</strong></summary>
<br>
When using this tool, you may want to give access to staging/local environment variables but not to the production ones.

```bash
ev change-secret -e production
```
<sup>Changes the default secret on the <code>production</code> environment</sup>
</details>

## Using in your project
After initializing and setting a secret, you can just load from your previous `.env` file with the command `ev load .env` and run either `ev | source` or `eval $(ev)` to export the variables into the environment.

### Passing a secret through a environment variable
In a CI environment, you want your secret to be passed through an environment variable set by your CI system. You can do this by setting the `EV_SECRET` variable
```bash
EV_SECRET=my-secret eval $(npx ev)
```

### Javascript projects
You can add a `pre` script to your `package.json` file to load the variables into the environment before your development script runs. Here's an example:
```json
{
  "scripts": {
    "predev": "eval $(ev)",
    "dev": "..."
  }
}
```
You can even create different scripts for different environments
```json
{
  "scripts": {
    "predev:staging": "eval $(ev -e staging)",
    "dev:staging": "..."
  }
}
```




