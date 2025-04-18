---
repo: Rich-Harris/object-cull
url: 'https://github.com/Rich-Harris/object-cull'
homepage: null
starredAt: '2023-03-27T19:51:29Z'
createdAt: '2019-05-10T17:26:16Z'
updatedAt: '2024-11-06T21:15:00Z'
language: TypeScript
license: MIT
branch: master
stars: 145
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:53.839Z'
description: Create a copy of an object with just the bits you actually need
tags: []
---

# object-cull

Create a copy of an object, based on which properties were accessed.

```js
import { prepare, apply } from 'object-cull';

const proxy = prepare({
	firstname: 'Terrell',
	lastname: 'Snider',
	friends: [
		{ firstname: 'Rachelle', lastname: 'Knight' },
		{ firstname: 'Ila', lastname: 'Farrell' },
		{ firstname: 'Vasquez', lastname: 'Flynn' }
	],
	pets: [
		{ name: 'Bobo', species: 'Great Dane' }
	]
});

console.log(proxy.firstname); // Terrell
console.log(proxy.friends[0].firstname); // Rachelle

const { kept, culled } = apply(proxy);

console.log(kept);
/*
{ firstname: 'Terrell', friends: [ { firstname: 'Rachelle' } ] }
*/

console.log(culled);
/*
[
	{ path: 'lastname', value: 'Snider' },
	{ path: 'friends.0.lastname', value: 'Knight' },
	{ path: 'friends.1', value: { firstname: 'Ila', lastname: 'Farrell' } },
	{ path: 'friends.2', value: { firstname: 'Vasquez', lastname: 'Flynn' } },
	{ path: 'pets', value: [ { name: 'Bobo', species: 'Great Dane' } ] }
]
*/

const unused_bytes = culled.reduce((total, item) => {
	return total + JSON.stringify(item.value).length;
}, 0);

const percent_unused = 100 * unused_bytes / JSON.stringify(proxy).length;

console.log(`${percent_unused}% of the data was unused`);
```


## Why?

Mostly for server-side rendering. You might not need to serialize *all* your data to send it to the client.


## Prior art

* [js-off](https://github.com/reconbot/js-off)


## License

MIT
