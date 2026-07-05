---
repo: abdilahrf/shania
url: 'https://github.com/abdilahrf/shania'
homepage: ''
starredAt: '2019-06-26T04:59:49Z'
createdAt: '2019-06-24T10:49:54Z'
updatedAt: '2024-08-12T19:50:23Z'
language: Python
license: MIT
branch: master
stars: 52
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:33.883Z'
description: Scan secrets from Continuous Integration Build Logs
tags:
  - bugbounty
  - python
  - security-automation
  - security-tools
---

```
     _                 _       
    | |               (_)      
 ___| |__   __ _ _ __  _  __ _ 
/ __| '_ \ / _` | '_ \| |/ _` |
\__ \ | | | (_| | | | | | (_| |
|___/_| |_|\__,_|_| |_|_|\__,_|
                               
```

### Requirement ⛏

Use this command to install jq as the requirement : `sudo apt install jq`

- Replace [CI_TOKEN] with your key in `main.py` file
- Replace [GITLAB_TOKEN] with your key in `main.py` file
- Replace [GITHUB_TOKEN] with your key in `scan-organization.sh` file

---
### Usage 🎮

Example usage

```
./scan-organisation.sh uber
./scan-organisation.sh [ORGANIZATION_NAME]
./scan-single.sh [USER_HANDLE]
```

![Screeshoot](shania.png)

---
### FAQ ❓

- jq: error (at <stdin>:4)  Cannot index string with string "login" :  Make sure your [GITHUB_TOKEN] already correct

---
### References 🧾

- https://edoverflow.com/2019/ci-knew-there-would-be-bugs-here/

Special thanks to :
[@Rhynorater](https://twitter.com/Rhynorater)
[@hacker_](https://twitter.com/hacker_)
[@EdOverflow](https://twitter.com/EdOverflow)
[@KarimPwnz](https://twitter.com/KarimPwnz)
[@streaak](https://twitter.com/streaak)
[@d0nutptr](https://twitter.com/d0nutptr)

---
### Legal Disclaimer ⚠

This project is made for educational and ethical testing purposes only. Usage of this tool for attacking targets without prior mutual consent is illegal. Developers assume no liability and are not responsible for any misuse or damage caused by this tool.
