---
repo: tobyzerner/json-api-models
url: 'https://github.com/tobyzerner/json-api-models'
homepage: ''
starredAt: '2025-01-24T01:17:21Z'
createdAt: '2019-11-19T01:27:05Z'
updatedAt: '2025-01-24T01:17:22Z'
language: TypeScript
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:10.646Z'
description: 'A lightweight layer for working with JSON:API data.'
tags:
  - json-api
---

# json-api-models

> A lightweight layer for working with [JSON:API](http://jsonapi.org) data.

## Installation

```
npm install json-api-models --save
```

## Usage

```ts
import { Store } from 'json-api-models';

const models = new Store();

// Sync a JSON:API response document to the store
models.sync({
    data: {
        type: 'users',
        id: '1',
        attributes: { name: 'Toby' },
        relationships: {
            pet: { data: { type: 'dogs', id: '1' } },
        },
    },
    included: [
        {
            type: 'dogs',
            id: '1',
            attributes: { name: 'Rosie' },
        },
    ],
});

// Resource data is transformed into easy-to-consume models
const user = models.find('users', '1');
user.name; // Toby
user.pet; // { type: 'dogs', id: '1', name: 'Rosie' }
```

### Syncing JSON:API Data

Use the `sync` method to load your JSON:API response document into the store. Both the primary `data` and any `included`
resources will be synced. The return value will be a model, or an array of models, corresponding to the primary data.

```ts
const model = models.sync(document);
```

If any of the synced resources already exist within the store, the new data will be **merged** into the old model. The
model instance will not change so references to it throughout your application will remain intact.

You can also sync an individual resource using the `syncResource` method:

```ts
const model = models.syncResource({
    type: 'users',
    id: '1',
    attributes: { name: 'Toby' },
});
```

### Retrieving Models

Specific models can be retrieved from the store using the `find` method. Pass it a type and an ID, a resource identifier
object, or an array of resource identifier objects:

```ts
const user = models.find('users', '1');
const user = models.find({ type: 'users', id: '1' });
const users = models.find([
    { type: 'users', id: '1' },
    { type: 'users', id: '2' },
]);
```

Retrieve all of the models of a given type using the `findAll` method:

```ts
const users = models.findAll('users');
```

### Working with Models

Models are a _superset_ of JSON:API resource objects, meaning they contain all of the members you would
expect (`type`, `id`, `attributes`, `relationships`, `meta`, `links`) plus some additional functionality.

Getters are automatically defined for all fields, allowing you to easily access their contents. Relationship fields are
automatically resolved to their related models (if present within the store):

```ts
model.name; // => model.attributes.name
model.pet; // => models.find(model.relationships.pet.data)
```

To easily retrieve a resource identifier object for the model, the `identifier` method is available. This is useful when
constructing relationships in JSON:API request documents.

```ts
model.identifier(); // { type: 'users', id: '1' }
```

### Forgetting Models

Remove a model from the store using the `forget` method, which accepts a resource identifier object. This means you can
pass a model directly into it:

```ts
models.forget(user);
```

### Custom Models

You can define custom model classes to add your own functionality. Custom models must extend the `Model` base class.
This is useful if you wish to add any custom getters or methods to models for a specific resource type:

```ts
import { Model } from 'json-api-models';

class User extends Model {
    get firstName() {
        return this.name.split(' ')[0];
    }
}
```

Register your custom models with the store during construction:

```ts
const models = new Store({
    users: User,
});
```

### TypeScript

For TypeScript autocompletion of model attributes and relationships, provide the raw JSON:API resource schema when defining your models.

```ts
type UsersSchema = {
    type: 'users';
    id: string;
    attributes: {
        name: string;
    };
    relationships: {
        dog: { data?: { type: 'dogs'; id: string } | null };
    };
};

class User extends Model<UsersSchema> {}
```

To type related resources, you can provide a collection of all models as the second generic.

```ts
type DogsSchema = {
    // ...
};

type Schemas = {
    users: User;
    dogs: Dog;
};

class User extends Model<UsersSchema, Schemas> {}
class Dog extends Model<DogsSchema, Schemas> {}
```

### API Consumption Tips

This library is completely unopinionated about how you interact with your JSON:API server. It merely gives you an easy
way to work with the resulting JSON:API data. An example integration with `fetch` is demonstrated below:

```ts
const models = new Store();

function api(url, options = {}) {
    options.headers = options.headers || {};
    options.headers['Accept'] = 'application/vnd.api+json';

    if (options.body) {
        options.body = JSON.stringify(options.body);
        options.headers['Content-Type'] = 'application/vnd.api+json';
    }

    return fetch('http://example.org/api/' + url, options).then(
        async (response) => {
            if (response.status === 204) {
                return { response };
            } else {
                const document = await response.json();
                const data = models.sync(document);
                return { response, document, data };
            }
        },
    );
}

api('users/1').then(({ data }) => {
    console.log(data.name);
});
```

When constructing API requests, remember that JSON:API resource objects contain `links` that can be used instead of
rebuilding the URL. Also, models contain an `identifier` method that can be used to spread the `type` and `id` members
into the document `data` (required by the specification). Here is an example of a request to update a resource:

```ts
const user = models.find('users', '1');

api(user.links.self, {
    method: 'PATCH',
    body: {
        data: {
            ...user.identifier(),
            attributes: { name: 'Changed' },
        },
    },
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
