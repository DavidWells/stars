---
repo: aneilbaboo/accesscontrol-plus
url: 'https://github.com/aneilbaboo/accesscontrol-plus'
homepage: null
starredAt: '2020-05-10T21:36:25Z'
createdAt: '2018-05-30T17:19:42Z'
updatedAt: '2024-07-25T20:36:40Z'
language: TypeScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:53.727Z'
description: >-
  Rich access control in an easy to read syntax featuring roles with
  inheritance, dynamic attribute tests, and more
tags:
  - abac
  - access-control
  - authorization
  - permissions
  - rbac
  - roles
  - scopes
---

# Access Control Plus

 [![License](https://img.shields.io/github/license/aneilbaboo/accesscontrol-plus.svg)](https://github.com/aneilbaboo/accesscontrol-plus/LICENSE) [![version](https://img.shields.io/github/package-json/v/aneilbaboo/accesscontrol-plus.svg)]() [![npm](https://img.shields.io/npm/v/accesscontrol-plus.svg )](https://npmjs.com/accesscontrol-plus) [![Typescript](https://img.shields.io/badge/written%20in-%20TypeScript%20-6575ff.svg)](https://www.typescriptlang.org)

[![CircleCI](https://circleci.com/gh/aneilbaboo/accesscontrol-plus.svg?style=shield&circle-token=c9c24e27ca8f0e9ab2e1e339ecc884f97e31372e)](https://circleci.com/gh/aneilbaboo/accesscontrol-plus) [![codecov](https://codecov.io/gh/aneilbaboo/accesscontrol-plus/branch/master/graph/badge.svg)](https://codecov.io/gh/aneilbaboo/accesscontrol-plus)  [![Maintainability](https://api.codeclimate.com/v1/badges/e7807330f3780ee15802/maintainability)](https://codeclimate.com/github/aneilbaboo/accesscontrol-plus/maintainability) [![NSP Status](https://nodesecurity.io/orgs/aneilbaboo/projects/9087af43-e61e-4eea-a810-2c4cd71297ca/badge)](https://nodesecurity.io/orgs/aneilbaboo/projects/9087af43-e61e-4eea-a810-2c4cd71297ca) [![Known Vulnerabilities](https://snyk.io/test/github/aneilbaboo/accesscontrol-plus/badge.svg)](https://snyk.io/test/github/aneilbaboo/accesscontrol-plus)



 <!-- No dependencies yet, so this badge shows as "pending" [![Dependencies](https://david-dm.org/aneilbaboo/accesscontrol-plus.svg)](https://david-dm.org/aneilbaboo/accesscontrol-plus) -->


Rich access control featuring roles, inheritance, dynamic attribute tests, backend integration and more.

```shell
npm install accesscontrol-plus
```

## Features

* Roles with inheritance
* Backend integration 
* Permissions on resource fields
* Explanations for why permissions were granted or denied
* Wildcard matching
* Modular policy definition
* Constraints on resources
* Typescript ready

## Quick start

```js
//
// Create AccessControlPlus instance to manage a group of roles
//
import {AccessControlPlus} from 'accesscontrol-plus';

const accessControl = new AccessControlPlus();

//
// Define roles, scopes and conditions
//
accessControl
  .deny('public').resource('*').action('*')
  .grant('user')
    .resource('posts')
      .create
      .read.onFields('*', '!dontreadthisfield') // allow read on all fields but one
      .update.where(userIsAuthor)
      .delete.where(userIsAuthor)
  .grant('admin').inherits('user')
    .resource('users')
      .action('*');

function userIsAuthor({user, post}) {
  return user.id == post.authorId;
}

//
// Test whether permission is granted
//
let permission;

permission = await accessControl.can('user', 'posts:create');
// permission.granted => truthy

permission = await accessControl.can('user', 'users:create');
// permission.granted => falsy

permission = await accessControl.can('admin', 'users:create');
// permission.granted => truthy (because of inheritance)

permission = await accessControl.can('user', 'posts:read');
// permission.granted => truthy
// permission.field('text') => true (matched by '*')
// permission.field('dontMatchThisField') => false (explicitly not granted)

permission = await accessControl.can('user', 'posts:read:text')
// permission.granted => truthy

// using context:
permission = await accessControl.can(
  'user',                                   // role
  'posts:update',                           // scope
  { user: {id: 123}, post: {authorId: 123}} // context
); // permission.granted => truthy
```

## Concepts

### Role Based Access Control (RBAC) versus Attribute Based Access Control (ABAC)

Role based authorization defines permissions in terms of roles in an organization - users, editors, authors, etc.  This is convenient, but RBAC relies on static definitions and can't use contextual information (like time, location, dynamic organizational relationships, etc) to determine access rights.  In traditional RBAC, contextual tests must be performed in other layers of an application. On the other hand, ABAC allows use of contextual information, but is also more complicated, and is [sometimes described as overkill](https://objectpartners.com/2017/06/16/abac-or-ac/ ) for solving typical problems. For more discussion, see: https://iamfortress.net/2017/02/15/ac-vs-abac/.

### AccessControlPlus: RBAC with ABAC-powers

This library combines useful properties of RBAC and ABAC. You grant permission in terms of roles, making it easy to define and manage your policies, like tradition RBAC, and implement fine-grained context-sensitive tests that integrate with your backend, like ABAC.

The `AccessControlPlus` class provides the top-level API of this library. Use it to define role permissions (using `grant` or `deny`), add conditions using `where`, `and` and `or`, and test whether a permission is granted (using `can`). (See [API](#API)).

```typescript
const ac = new AccessControlPlus();
accessControl.deny('public').scope('*:*');
accessControl.grant('author').scope('post:update')
  .where(authorIsResourceOwner); // a function you write which tests attributes
```

### Definitions

#### Roles, Resources, Actions and Inheritance

Each `role` (e.g., "admin" or "user") has `scopes` which **grant** or **deny** permission to perform `actions` on `resources`, potentially limited to certain `fields` of the resource.  Roles can [inherit](##inherits) scopes from other roles.

#### Scopes

A `scope` name is a `resource:action` pair or a `resource:action:field` triplet. For example,

```js
"post:read" // read a post resource
"post:read:text" // read the text field of a post resource
```

##### Shortcuts for creating scopes
```js
const userRole = accessControl.grant('user');

// the following are all equivalent:
userRole.scope('post:create')
userRole.resource('post').action('create')
userRole.resource('post').create // see CRUD shortcuts
```

##### Effect: Grant or Deny
A scope has an effect, which is either `grant` or `deny`, which is determined by how the role is accessed.

E.g.,
```js
const ac = new AccessControl();
ac
  .grant('user').scope('comments:read') // creates a grant scope
  .deny('user').scope('comments:*') // creates a deny scope
```

##### How permission is determined

Scopes are checked in the order defined.

Permission is granted if a `grant` scope is found for the specified `role` (or inherited roles) for the specified `resource`, `action` and optional `field`. If no `grant` scope is matched, the permission is denied where `permission.denied` is an array of strings describing all the scopes which were attempted.

Permission is immediately denied if a `deny` scope is matched.

Given, a request for a user role to read the text field of a post resource:
```js
// request permission to read the text field of a post:
const permission = accessControl.can('user', 'post:read:text', context);
```
1. Look for the specified role (`user`)
   - if `user` doesn't exist, look for the `*` role
   - if no role can be found, return a denied permission
   - otherwise, continue
2. Look for the specified resource (`post`) on the role
   - if `post` resource doesn't exist, look for the `*` resource
   - if no resource can be found, return a denied permission
3. Look for the `read` action
   - if `read` action doesn't exist, look for the `*` action
   - if no action can be found, return a denied permission
   - otherwise, there will be a list of one or more scopes defined for the action
4. Iterate through each scope
   - Check whether the field (if requested in the call to `can`) is granted by the scope, and whether the condition (if provided) is satisfied. If these tests are satisfied, generate a permission and return it
5. If no scope can be found for the current role, repeat this process for all inherited roles until finished
6. If no permission was found, return a permission where `denied` contains descriptions of all the scopes which matched but failed

#### Permissions
A `permission` is an instance of the `Permission` class returned by `AccessControlPlus#can`:
```typescript
const permission: Permission = await accessControl.can('user', 'post:read');

// If the permission is granted, it is set to a "permission path", which
// which shows which scope tested successfully
permission.granted === "grant:user:post:read:0:::"

// if permission is denied, the permission paths of all scopes which were attempted
//
permission.denied === [ "..." , "..." } ] // the tests attempted and failed
```
If [constraints](##withConstraint) were defined for the scope, the permission will contain a `constraint` key.

##### permission paths
Permission paths are strings structured as:
```js
"{grant|deny}:{role}:{resource}:{action}:{scopeIndex}:{field}:{conditionName}"
```
Note: the `scopeIndex` indicates which

#### Conditions

Scopes can be restricted with `conditions`, javascript sync or async functions of the form:

```typescript
type Condition = (ctx: Context)=> Promise<boolean> | boolean // type Context = any
```

Conditions should be *named* functions. The condition name is used to generate a description string, assigned to `permission.grant`

```js
// Add a condition to post:update:
accessControl.grant('user').scope('post:update')
  .where(userIsOwner); // add a condition

function userIsOwner({user, resource}) {
  return user.id === resource.ownerId;
}

permission = await accessControl.can('user', 'post:update',
  { user:     { id:      1 },
    resource: { ownerId: 1 }});

permission.granted // => 'grant:user:post:update:0::userIsOwner'
```

If a condition throws an error, it is treated as though it returned `false`. (Note: this may cause unexpected behavior if a condition is used to `deny`, so this behavior may change in the future, such that exceptions will be treated as `true` for `deny`).

#### Context

The `context` is a developer-specified value that is passed to the test function `can`, which in turn passes the value to various developer-defined functions involved in testing scopes. Arbitrary values such as the current user, the request parameters, time, environment and location can be passed in the context. See the example above under [Conditions](#Conditions).

```typescript
type Context = any;
```

#### Fields
Fields represent attributes of the resource. They can be allowed or denied using the [`onFields`](#onfields) method.

```typescript
// E.g., Allow fields and disallow specific fields:
accessControl.grant('user').resource('post').read.onFields('*', '!stats');

// request permission for action on a specific field:
ac.can('user', 'post:read:stats'); // permission denied
ac.can('user', 'post:read:foo'); // permission granted
permission = ac.can('user', 'post:read');
// permission granted with
// permission.fields = { "*": true, "stats": false }

```

Alternatively, you can request a permission for the action, and you will receive a permission with a `fields` property which is an object describing which fields are accessible:
```
ac.

Field permissions can also be calculated dynamically be providing a function (which can be async). The function returns an Object mapping field names to boolean values indicating whether the field is granted or not.
E.g., the following is equivalent to the `onFields` call shown above.
```typescript
accessControl.grant('user').resource('post').read.onDynamicFields((ctx: Context) => ({
  '*': true, // grant all fields
  stats: false
}));
```


## API

### AccessControlPlus

Top level object which exposes the API.

#### constructor
```js
import {AccessControlPlus} from 'accesscontrol-plus';
const accessControl = new AccessControlPlus();
```

#### grant

Returns a Role object which can be used to grant permissions
```js
// accessControl.grant(roleName)
accessControl.grant('admin') // => Role instance
```

#### deny
Returns a Role object which can be used to deny permissions
```js
// accessControl.deny(roleName);
accessControl.deny('admin') // => Role instance
```

#### can

Async function returning a permission indicating whether the given role can access the scope:
```js
// context is a developer-defined value passed to conditions
// (see Scope #where, #and, #or)
const context = { user: { id: 'the-user-id' } };
// accessControl.can(role, scope, context)
const permission = await accessControl.can('admin', 'delete:user', context);
if (permission.granted) {
  // delete the user
} else {
  // report access denied
}
```

The first argument can also be a list of role names.

### Role
Represents a named role.

#### inherits
Inherit scopes from another role:
```js
// role.inherits(roleName)
role.inherits('public'); // => Role instance
```

#### resource
Access a resource of a particular role:
```js
// role.resource(resourceName)
role.resource('article'); // => Resource instance
```

#### scope
Access a scope, a short cut for accessing a resource then accessing an action:
```js
// role.scope(scopeName)
role.scope('article:read'); // same as role.resource('article').action('read')
```

### Resource
A resource object is obtained using the `Role.resource` method

#### action
```js
// resource.action(actionName)
resource.action('read'); // => Scope
```
Note: you can create multiple scopes per action. This allows you to provide different constraints and fields for the same action:
```js
resource
  .action('read').where(foobar)
    .withConstraint(FooBarConstraint).onFields('foo', 'bar')
  .action('read').where(baz)
    .withConstraint(BazConstraint).onFields('baz');
```

#### CRUD shortcuts

```js
resource.create // = resource.action('create');
resource.read   // = resource.action('read');
resource.update // = resource.action('update');
resource.delete // = resource.action('delete');
```

### Scope
Represents a specific permission, and enables setting conditions and constrains on the permission.

#### where
Sets one or more tests which must all pass for the permission to be granted. This method is equivalent to `scope.and`, except for the name generated in the `permission.grant` and `permission.deny`:

```js
// scope.where((context: Context) => boolean)
// scope.where(async (context: Context) => Promise<boolean>)
function async ownsResource({ user, request }) {
  const resource = await MyResource.loadFromDB({ id: request.params.id });
  return resource.id === user.id;
}
scope.where(ownsResource); // => Scope
```

#### and
Grants permission for the scope if all of the tests return truthy values:
```js
scope.and(test1, test2, test3...); // => Scope
```

#### or
Grants permission for the scope if any of the tests return a truthy value:
```js
scope.or(test1, test2, test3...); // => Scope
```

#### withConstraint
Note: constraints are deprecated and may be removed from a future version of the API.

Add a function which returns a constraint useful to the developer for passing to a function that accesses a resource:
```js
accessControl.grant('user').scope('article:create')
  .withConstraint(({user})=>({ ownerId: user.id})); // => Scope
...
let permission = await accessControl.can('user', 'article:create', { user: { id: 123 }});
if (permission.granted) {
  await Article.create(permission.constraint); // { ownerId: 123 }
}
```

#### onFields
Restrict the grant/denial to specific fields. Provide a list of fieldNames. Use `*` for all fields, `!{fieldName}` to exclude a field:

```js
// grant on all fields
accessControl.grant('admin').scope('user:read')
  .onFields('*');
accessControl.can('admin', 'user:read:superPrivateData');
// permission.granted => "grant:admin:user:read:0:superPrivateData:"
```

```js
// deny on specific fields
accessControl.grant('admin').scope('user:read')
  .onFields('*', '!privateData');
permission = await accessControl.can('admin', 'user:read:privateData');
// permission.granted => undefined
// permission.denied = ["grant:admin:user:read:0:privateData:"]
permission = await accessControl.can('admin', 'user:read:name');
// permission.granted = "grant:admin:user:read:0:name:"
```

```js
// grant on specific fields
accessControl.grant('admin').scope('user:read')
  .onFields('name');
await accessControl.can('admin', 'user:read:name');
// permission.granted => yes
await accessControl.can('admin', 'user:read:phoneNumber'); // permission.granted => no
```

#### onDynamicFields
Generate field grants dynamically, given a context. You can use async calls, if needed:
```js
accessControl.grant('admin').scope('user:read')
  .onDynamicFields(async ({admin, user}: Context) => {
    const permissive = await myBackend.adminHasPermissionFromUser(admin, user);
    if (permissive) {
      return { '*': true };
    } else {
      return { 'id': true, 'userName': true, 'phoneNumber': true };
    }
  });
```

### Permission
Object returned by `AccessControlPlus#can`

#### granted
If permission granted this will be a string describing the scope granted.

#### denied
If permission denied, this is set to an array of objects that contain

#### field
Tests whether permission was granted for the specified field. Accounts for wildcards and denied fields (`!foo`) provided in [`.onFields`](#onFields).

```js
permission.field('foo') // => true or false
```

## Extended Example

```js
import AccessControlPlus from 'accesscontrol-plus';

function userIsResourceOwner({user, resource}) {
  return user.id === resource.ownerId;
}
function userImpersonatesResourceOwner({user, resource}) {
  return user.impersonationId === resource.ownerId;
}
function articleIsPublished({resource}) {
  return resource.state === 'published';
}

const ac = new AccessControlPlus();
//
// 4 roles in this scenario: public, author, admin, superadmin
//
ac
  // Define roles:
  //
  // PUBLIC
  //
  .deny('public') // start by disallowing the public access to everything
    .scope('*:*')
  .grant('public')
    .scope('article:read')
      .where(articleIsPublished)
        .onFields('*', '!viewers') // allow all fields except viewers
  //
  // AUTHOR
  //
  .grant('author').inherits('public')
    .resource('article')
      .action('create')
        // add a constraint - to include when creating the article:
        .withConstraint(({user})=>({ ownerId: user.id }))
      .action('read') // === .scope('article:read')
        .where(userIsResourceOwner)
      .action('update') // === .scope('article:update')
        .where(userIsResourceOwner)
  //
  // ADMIN
  //
  .grant('admin').inherits('author')
    .resource('article')
      .action('read').where(userImpersonatesResourceOwner)
  //
  // SUPERADMIN
  //
  .grant('superadmin').inherits('admin')
    .resource('user')
      .action('*');

//
// The following are objects which are generated by your code
// during a request - users, resources, etc:
//
const user = { id: 1234 }; // determined by request authentication
const draft = { ownerId: 1234, state: 'draft', text: '...' }; // retrieved from db
const published = { ownerId: 1234, state: 'published', text: '...' }; // retrieved from db
const adminUser = { id: 999, impersonationId: 1234 };
const superAdmin = { id: 222 };

async function testPermissions {
  let permission;
  // public can read published articles
  permission = await accessControl.can('public', 'article:read', { user: null, resource: published });
  // permission.granted => truthy

  // public can't read draft articles
  permission = await accessControl.can('public', 'article:read', { user: null, resource: draft });
  // permission.granted => falsy
  // permission.denied = ['public:article:read:articleIsPublished']

  // author can read their own draft article
  permission = accessControl.can('author', 'article:read', { user, resource: draft });
  // permission.granted => truthy

  // auth can update their own article
  permission = accessControl.can('user', 'article:update', { user: user, resource: draft });
  // permission.granted => truthy

  // admin cannot update an author's article, even if they are impersonating them
  permission = accessControl.can('admin', 'article:update', { user: adminUser, resource: draft});
  // permission.granted => falsy
  // permision.denied = [ 'grant:author:article:update:0::userIsResourceOwner' ]

  // admin can read a draft article if they are impersonating the author
  permission = accessControl.can('admin', 'article:read', { user: adminUser, resource: draft});
  // permission.granted => truthy

  // superadmin can do anything to user resources
  permission = accessControl.can('superadmin', 'user:delete', { user: superAdmin, resource: user });
  // permission.granted => truthy
}
```
