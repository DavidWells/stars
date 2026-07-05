---
repo: kevva/wifi-password
url: 'https://github.com/kevva/wifi-password'
homepage: null
starredAt: '2015-05-28T23:06:47Z'
createdAt: '2015-02-15T21:37:06Z'
updatedAt: '2025-02-13T21:15:10Z'
language: JavaScript
license: MIT
branch: master
stars: 618
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:42.599Z'
description: Get current wifi password
tags:
  - nodejs
  - wifi-password
---

# wifi-password

> Get current wifi password


## Install

```
$ npm install wifi-password
```


## Usage

```js
const wifiPassword = require('wifi-password');

wifiPassword().then(password => {
	console.log(password);
	//=> 'johndoesecretpassword'
});
```


## API

### wifiPassword([name])

Returns a promise that resolves to a string containing the password.

#### name

Type: `string`

Get the wifi password for a specified *known* network.


## Related

* [wifi-password-cli](https://github.com/kevva/wifi-password-cli) - CLI for this module.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
