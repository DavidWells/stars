---
repo: matt-filion/s3-db
url: 'https://github.com/matt-filion/s3-db'
homepage: ''
starredAt: '2017-11-07T05:12:17Z'
createdAt: '2017-02-06T14:40:32Z'
updatedAt: '2024-09-25T18:50:04Z'
language: TypeScript
license: NA
branch: master
stars: 109
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:35.654Z'
description: Document DB API for AWS S3
tags:
  - bucket
  - database
  - lambda
  - s3
  - serverless
---

![Node.js CI](https://github.com/matt-filion/s3-db/workflows/Node.js%20CI/badge.svg)

# Document DB API for AWS S3

[AWS S3](https://aws.amazon.com/s3) is incredibly cheap, has 2 9's of availability, 12 9s of resiliency, triggers via [AWS Lambda](https://aws.amazon.com/lambda/), cross region replication, versioning and pretty decent [Performance](./docs/Performance.md). Its a pretty compelling database solution for a lot of scenarios. A few other people agree, see [Pete Warden's blog](https://petewarden.com/2010/10/01/how-i-ended-up-using-s3-as-my-database/) and [this interesting solution](http://www.s3nosql.com.s3.amazonaws.com/infinitedata.html).

# Whats New

This library has been changed drastically from the 1.x.x version as this was written to be TypeScript first. Also:

- It makes use of async/await patterns.
- TypeScript decorators signficantly improved/reduced configuration.
- Model classes are no longer decorated with convenience functions (just metadata.)
- A new collection instance is no longer async/promisified.
- No need to create a 'Database' object.

## Next?

- JavaScript Examples
- eTag verification on save, for collission detection.
- Carry over 'copy'
- Iterator pattern on ResourceList, or instead of.
- Performance docs on Lambda @ 128mb, 512mb, 1024mb. 2024mb, 3036mb.
- Bug: MD5 does not appear to be persisting or returning when doing .head() check on a document.

# Usage

## Installation

`npm install s3-db --save` into the project where S3-DB will be used. If you dont already have the aws-sdk node module then `npm install aws-sdk` as well.

## Configure S3DB

There are very reaonsable out of the box configurations, but if you would like to change any of them you can do so using the `S3DB` class. The only values that you need to worry about at the global level are the following.

Here is a basic example overwriting all default values.

```
S3DB.update({
    baseName: 'myapp',
    stage: 'quality',
    region: 'us-east-2',
    bucketPattern: '{{stage}}-{{region}}-{{baseName}}-{{bucketName}}'
});
```

Note: Below in the configuration section each of these values is explained in detail.

## Decorate Model/Types

Create your model class and decorate it with `@collection()` and `@id()` appropriately. So that when an instance of that class type is passed into the appropriate `Collection` instance, it will know how it should be configured.

If you do not specify an argument for `@collection()` then the class type will be lower cased, and used as the name and all collection configuration defaults used.

Here is a very basic example where you are fine with the name being generated by s3-db.

```
@collection()
export class User {

    @id()
    private id?: string;
    private name?: string;
    private age?: name;
    private address?: Address;

    constructor(){
    }
}
```

So once you have your model decorated, you can create an instance of a `Collection` and begin creating/updating/deleting objects in a Bucket. Function on `Collection` is async/promisified so you can use either pattern.

Async Example.

```
const collection: Collection<User> = new Collection(User);
function async doStuff(){
    const user: User = await collection.save({name:'Testing',age:21});
    const checkedUser: User = await collection.load(user.id);
    await collection.delete(user.id);
}
```

Promise Example.

```
const collection: Collection<User> = new Collection(User);

/* Creates a user and generates an ID for the user record. */
collection.save({name:'Testing',age:21})
    .then( (user: User) => collection.load(user.id) )
    .then( (user: User) => collection.delete(user.id) );
```

# Configuration

A complete list of all the configuration points and what values you can use.

## S3DB

Configurations that are applied across all collections.

| Name          | Default                                            | Description                                                                                                                                                                                                                                        |
| ------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseName      | `s3db`                                             | Used in the bucketPattern and logging as a namespace.                                                                                                                                                                                              |
| stage         | `dev`                                              | The logical environment. Used in the bucketPattern.                                                                                                                                                                                                |
| region        | `us-west-2`                                        | Used in the AWS configuration to target a specific region. Also used in the bucketpattern.                                                                                                                                                         |
| bucketPattern | `{{stage}}-{{region}}-{{baseName}}-{{bucketName}}` | The name that is used to lookup the bucket for a collection. Must use valid S3 bucket name characters. The replacement values for `{{stage}}`, `{{region}}`, `{{baseName}}` and `{{bucketName}}` are all case sensitive. You can omit any of them. |

## Collection

Configurations specific to a collection.

| Name | Default | Description |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pageSize              | `100`                | Maximum of 1000. How many documents to return when doing a `.find()` operation.  |
| serversideEncryption  | `true`               | If S3 server side encryption is enabled (encryption at rest.)   |
| checkIsMOdified       | `true`               | If enabled, `save()` operations will check if the object provided has been modified before being saved. If it is not modified it returns without attempting to save to S3. |
| isModified            | `MD5IsModified`      | A function that is used to check if an object is modified. If you override it, implement the `IsModified` interface.|
| serialization         | `JSONSerialization`  | How objects are serialized to a string before they are perstisted to S3.  |
| defaultIdGenerator    | `defaultIDGenerator` | Default generation is UUID v4. This is called when no generator is provided on the `@id()` annotation. |
| validator             | `undefined`          | A function that can be used to check if the object being saved is valid. |
| noExceptionOnNotFound | `false`              | Changes the behavior to return undefined rather than throw an excpetion, when no document is found. |

# API's

The available objects, decorators and functions.

## @collection(string? | CollectionConfiguration?)

Annotation indicates that a specific class corresponds to an S3 Bucket.

## @id(generator?)

Anotation indicates what attribute or field on a class will be the key for the persisted object. If this annotation is not used then 'id' is used, or added.

## S3DB

Singleton containing the 'global' configurations for the S3DB instance.

### S3DB.update({ baseName?: string; stage?: string; bucketPattern?: string; region?: string })

Updates the default configuration with the values provided.

### S3DB.setLogLevel(level: LogLevel): void

Updates the logging level of the S3DB logger and will change the default level that each collection instance defines.

## Collection

Used to do CRUD operations. Need to create an instance to use.

### const collection: Collection<SomeClass> = new Collection(SomeClass);

Creates a new instance that will use the SomeClass definition (which should contain the `@collection` and `@id` decorators) to determine its configuration.

### collection.head(id): Promise<S3Metadata>

Returns the metadata for the corresponding object identified by the id.

### collection.exists(id): Promise<boolean>

Returns true if the object exists within the corresponding S3 bucket.

### collection.save(toSave): Promise<SomeClass>

Creates or updates an object in S3 that corresponds to the id of the toSave object passed in. If there is no id on the object, then one is generated.

### collection.delete(id): Promise<boolean>

Removes an object from an S3 bucket for the corresponding id.

### collection.find(prefix, pageSize, continuationToken): Promise<ReferenceList>

Returns a list of `S3Metadata` objects for all objects in the corresponding S3 bucket htat start with the prefix value provided. If continuationToken is passed in then the list will be a 'continuation' of a previous find operation.

### collection.subCollection(prefix: string, typeOf: SomeClass): Collection<SomeClass>

Creates a new collection where all operations will execute with the prefix in front of the id's used. So if the prefix is `/users/` then when `.load('1234')` is called the request will result in an ID lookup for `/users/1234`. Similarly, all objects saved will have the prefix applied when the ID is generated by the save operation, or, when an ID is provided and it does not `startWith()` the configured prefix.

### collection.setLogLevel(level: LogLevel): void

Lets you change the logging level for this specific collection instance. At creation of the collection, the logging level is taken from the S3DB logger, as a child logger is created from it.
