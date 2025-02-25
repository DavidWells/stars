---
repo: BalliAsghar/Mailsy
url: 'https://github.com/BalliAsghar/Mailsy'
homepage: ''
starredAt: '2022-03-15T00:42:27Z'
createdAt: '2022-03-06T21:31:16Z'
updatedAt: '2025-02-22T14:48:02Z'
language: JavaScript
license: NA
branch: main
stars: 512
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:59.726Z'
description: ⚡️ Quickly generate a disposable email straight from terminal.
tags:
  - api
  - cli
  - email
  - javascript
  - nodejs
  - temporary-email
---

# Mailsy

![GitHub Repo stars](https://img.shields.io/github/stars/BalliAsghar/Mailsy?color=ff&style=for-the-badge)

⚡️ Quickly generate a disposable email.

# Extensions

- [Alfred](https://github.com/BalliAsghar/mailsy-alfred)
- [Raycast](https://www.raycast.com/BalliAsghar/mailsy)

## Screenshots

![alt text](https://raw.githubusercontent.com/BalliAsghar/Mailsy/main/screenshot/Mailsy.png)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Mailsy.

```console
npm install mailsy -g
```
Macos users can install mailsy via homebrew

```console
brew install mailsy
```

## Usage

**Creating Email Address**

Email will be copied to clipboard!

```console
foo@bar:~$ mailsy g
random@email.com
```

**Fetching Emails**

**Note:**

Hit Enter to open the email in your default browser.

```console
foo@bar:~$ mailsy m
? Select an email (Use arrow keys)
❯ 1. Hello, World! - from m.asghar99@outlook.com
  2. Mailsy - from m.asghar99@outlook.com

```

**Delete Account**

If you want to dispose an email address and to get a new one use:

```console
foo@bar:~$ mailsy d
Account deleted
```

**Details about Account**

```console
foo@bar:~$ mailsy me

 Email: random@random.com
 createdAt: 13/03/2022, 21:32:09

```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=BalliAsghar/Mailsy&type=Date)](https://star-history.com/#BalliAsghar/Mailsy&Date)

### FAQ

## How Mailsy works?

Mailsy is using [mail.tm](https://mail.tm/en/) API to generate a disposable email.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
