---
repo: systemdesignpartners/cognito-auth-storage
url: 'https://github.com/systemdesignpartners/cognito-auth-storage'
homepage: ''
starredAt: '2020-03-23T22:40:51Z'
createdAt: '2019-06-12T19:51:53Z'
updatedAt: '2020-08-01T14:11:35Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.198Z'
description: >-
  Replace AWS Cognito default client-side storage with a custom javascript
  object
tags: []
---

# cognito-auth-storage
AWS Amplify Auth (Cognito) lets you replace the default Token storage class (which uses localStorage) with your own. This repo has two such classes, one for in-memory storage and another for IndexedDb storage.


## AuthStorageMemory.js
AuthStorageMemory is a simple class that stores the Tokens in memory in JavaScript, instead of in localStorage. This class is mainly for illustration purposes. Keeping the Tokens in memory does decrease their visibility somewhat, but functionality is also impacted, since they will be destroyed when the session is closed. The effect of the Refresh Token is largely mooted, unless the User keeps the browser session open for multiple days.

## AuthStorageIDB.js
AuthStorageIDB is a more useful class, which stores the Tokens in IndexedDB instead of in localStorage. This makes them accessible to Service Workers, so for instance if you have a BackgroundSync process (on Chrome) that hits your REST API, the Tokens will be available to you. Be aware that IndexedDB has an asynchronous interface, while AWS Amplify expects Cognito Auth storage to be synchronous. Since they are both operating locally within the same browser this is not a severe issue, but you will probably want to manually invoke the sync() method immediately when the user connects, to see if IndexedDB says that they are already logged in. The rest of the time, for the most part this class directly uses in-memory storage for its source-of-truth, and mirrors the in-memory activity with appropriate writes back to IndexedDB.


## Usage
To use either class typically you will import the storage class you want to use:
```javascript
import {AuthStorageMemory} from 'cognito-auth-storage';
```

And also import your aws-exports.js (created by the amplify cli) like this:
```javascript
import myconfig from './aws-exports';
```

Then if you are using AuthStorageMemory, customize the storage class with:
```javascript
myconfig.storage = new AuthStorageMemory();
```

If you are using AuthStorageIDB, it's a little more involved after importing. First step:
```javascript
AuthStorageIDB.init(errorCallback, successCallback);
```
The callbacks are for initial setup. The errorCallback receives one argument, which is simply the error message. The successCallback receives one argument, which is an object that is suitable for use as myconfig.storage. The reason that AuthStorageIDB works this way is because it is not 100% certain that IndexedDB will be available, depending on your browser. If not, this approach provides a means to delete the myconfig.storage property, which in turn signals to Amplify to use its own default storage (localStorage). So in the successCallback, to complete the setup you must do (second step):
```javascript
myconfig.storage = argReceivedByTheSuccessCallback;
```
or in the errorCallback you would do (alternate second step);
```javascript
delete myconfig.storage;
```
to fall back to localStorage.

Regardless which class you are using, make sure you set the correct storage property within the myconfig object. For instance AWS Amplify in its terminology calls S3 "Storage" but it is not that Storage that we are dealing with here. You want the one that belongs to "Auth" (which is AWS Amplify's name for Cognito). Depending on how many features of Amplify you are using, and how you set up your configuration, this may vary. For instance if you are using a myconfig file with multiple sections, i.e., containing JSON object properties such as API, Auth, etc., you want the ".storage" property of Auth.

Finally, near the end of your callback don't forget the statement to actually use your myconfig object:
```javascript
Amplify.configure(myconfig);
```


## Notes
The AuthStorageIDB class has a dependency on the npm 'idb' module, which is a very thin wrapper over IndexedDB.

AWS does not really publish a spec for the storage class. The slightly different interface implementations in our two classes (e.g., static/non-static methods, sync() method, etc.) seem to be satisfactory to Amplify.
