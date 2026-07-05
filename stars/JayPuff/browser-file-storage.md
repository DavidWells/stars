---
repo: JayPuff/browser-file-storage
url: 'https://github.com/JayPuff/browser-file-storage'
homepage: null
starredAt: '2022-12-11T23:14:54Z'
createdAt: '2018-08-31T17:52:25Z'
updatedAt: '2024-08-22T13:57:02Z'
language: JavaScript
license: NA
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:03.495Z'
description: >-
  Abstracts the complexity of indexed DB so that a user can easily save
  files/blobs by key/filename on the browser
tags: []
---

# Browser File Storage
Abstracts the complexity of the IndexedDB Api so that a user can easily save files on the browser.

While there are some local database like libraries to store json objects, advanced queries, replication, etc, this is very focused on a single use case: saving and loading files locally.

# Important
- Browser must support the IndexedDB API as it cannot be polyfilled: https://caniuse.com/#feat=indexeddb
- Browser must support promises or include a Promise polyfill: https://www.npmjs.com/package/promise-polyfill
- Files saved locally, just like IndexedDB entries, are namespaced by domain by default, don't expect to save a file on one domain and be able to access it from another just because it is the same user's computer accessing your websites.

# Installation
Installing Package
```javascript
npm install browser-file-storage
```

Importing in Webpack
```javascript
import browserFileStorage from 'browser-file-storage'
```

Importing through script tag  
*To be found in the builds folder or the dist folder*
```html
<script type="text/javascript" src="browser-file-storage.min.js"> 
```

# Usage

## Logging

By default browserFileStorage will only log errors, if you want to see logs in more detail you can change the mode.

```javascript
// Levels are 'info', 'warn', 'error' and 'none'
browserFileStorage.logLevel('info')
```

## Initialization

Before using browserFileStorage, it is important to initialize the instance.
Although a namespace parameter is not needed, it is safer to namespace the instance with the name of your app.
The app name will be appended to the inner database name and create a unique identifier in case another library within the same domain, also uses indexedDB internally.

The same namespace will have to be used always when running *init* as it will re open the same inner database. 

```javascript

browserFileStorage.init('MY_AMAZING_APP').then((status) => {
    // status contains one property to know if we created or opened inner database `initial`
    if(status.initial) {
        // ... The inner database was newly created. It did not exist previously or was deleted by browser/user.
    }

    // ... Here you can begin asking for persistency, load files, save files, etc.
}).catch((error) => {
    if(!error.supported) {
        // ... IndexedDB is not supported internally! This environment or browser is not compatible with browserFileStorage :(
    }

    if(error.alreadyInit) {
        // ... You tried to run `init` but the browserFileStorage was already initialized.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to initialize.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }
})
```

## Asking for persistency

Since browser-file-storage uses indexed DB to store files internally, we can ask for user/browser permission for the data to stay on the computer permanently or until the user manually deletes it (through browser or filesystem). Default persistency means the browser can technically clear the data whenever it wants to in order to fit other data.

```javascript
browserFileStorage.persist().then((status) => {
    // status contains two properties to see what happened: `persistent`, and `canPersist`
    if(status.persistent) {
        // ... User or Browser authorized persistency for the files to save
    } else {
        if(status.canPersist) {
            // ... User/Browser did not give permission for data to persist
        } else {
            // ... Data persistency is simply not supported on current browser
        }
    }
}).catch((error) => {
    // ... browserFileStorage was probably not initialized
})
```

## Saving a file

Save takes two mandatory parameters: *filename and contents*
Save also takes an optional third parameter: *mimetype*

*filename* is a string and will be used as identifier to save and load the file from the inner database. the extension in the filename will also be used if possible to auto-detect the mimetype of the file, unless the content we are storing is a blob with an already existing mimetype, or if the third optional parameter *mimetype* is set (In which case mimetype will be forced to whatever was specified on that third parameter)

*contents* can be a raw string, a blob, a BrowserFile (Type used internally to unify what we save and load from browserFileStorage)

### Simple Examples

```javascript
browserFileStorage.save('settings.txt', 'This is the settings file!').then(((file) => {
    console.log('Saved file successfully!', file)
}).catch((error) => {
    console.error('Could not save the file!', file)
})
```

```javascript
// .. use fetch, axios, $.ajax, xhr request, etc to fetch an image blob accordingly...
browserFileStorage.save('background.png', myImage).then(((file) => {
    console.log('Saved image successfully!', file)
}).catch((error) => {
    console.error('Could not save the image!', file)
})
```

### In Depth Example and Error Handling

```javascript
// Some settings JS object.
const data = { preferences: { notifications: "off" } }
const json = JSON.stringify(data)

browserFileStorage.save('settings.json', json ).then((file) => {
    // ... File saved successfully. 
    console.log('File Saved successfully!', file)
}).catch((error) => {
    if(!error.init) {
        // ... browserFileStorage was not initialized yet.
    }

    if(error.invalidFilename) {
        // ... Error with filename... It is either empty, null, or not a string.
    }

    if(error.invalidContents) {
        // ... Error with contents... They are empty, or not what expected... Blob, String, BrowserFile, etc.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to save.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }

})
```

### Auto-Assigned MimeType

If save received a raw string, or blob with no mimetype, it will try to match the extension from the filename to a known mimetype.
Since there are LOTS of mimetypes, we only detect some of the most common types, other wise files default to *text/plain* or *application/octet-stream*

If you want to make sure your file is saved with the proper mimetype, so that when it is loaded again it can be read by the browser as you want it to, simply pass a third parameter to the save function with the mimetype; This will force the internal blob to that type **Even if the blob was already typed**

```javascript
// Some settings JS object.
const data = { preferences: { notifications: "off" } }
const json = JSON.stringify(data)

browserFileStorage.save('settings.json', json, 'application/json' ).then((file) => {
    // ...
}).catch((error) => {
    // ....
})
```


### File metadata

In case you want to store any sort of metadata for the file, you can use an optional 4th parameter after mimetype when using the save function (You can leave mimetype as null if you are using auto-assigned mimetype)

Metadata is expected to be a simple JS object.

```javascript
// Some settings JS object.
const data = { preferences: { notifications: "off" } }
const json = JSON.stringify(data)

browserFileStorage.save('settings.json', json, null, { md5: 'some hash' }).then((file) => {
    // ...
}).catch((error) => {
    // ....
})
```

### More Specific Examples

[Some specific save examples of different scenarios](#specific-save)

## Browser File methods and properties

When saving or loading a file, it is stored in a *BrowserFile* Object.

```javascript
let file = // ... Browser File returned from a load or save's resolved promise.

console.log(file.extension) // extension of file.
console.log(file.filename) // Same as the filename used to load file
console.log(file.lastModified) // JS timestamp when it was last saved/overwritten
console.log(file.size) // Size recorded when last stored.
console.log(file.blob) // Blob Object, this can be turned into a local URL, sent via xhr, etc. This is the actual `file`
console.log(file.type) // Mimetype
console.log(file.metadata) // Metadata JS Object

// Create a local URL for the resource. It will return the same url no matter how many times you called unless destroyed.
let url = file.createURL()
// Use `url` like you would a regular url within your page.. Ex: change an image tag's src to url, open the url on a new tab, etc

// Delete the created URL, url will no longer work.
// It will also make createURL() return a new URL
file.destroyURL()

// Read as Raw String
file.toString().then((string) => {
    // .. String contains raw text.
    console.log(string)
}).catch((error) => {
    if(!error.supported) {
        // ... FileReader Api is not available on this browser!
    }

    if(error.fileError) {
        // ... There was an error finding a blob to read internally.
    }

    if(error.readError) {
        // ... There was an error reading the file as specified.
        console.error(error.e) // more details...
    }
})

// Read as Binary String, Data URL, Array Buffer...
// Works the same as 'toString' including all the properties on the error object.
file.toBinaryString().then((binaryString) => { /* ... */ })
file.toDataURL().then((dataURL) => { /* ... */ })
file.toArrayBuffer().then((arrayBuffer) => { /* ... */ })
```

## Loading a file

Loading simply takes a filename as an argument and returns a promise that when resolved, contains the BrowserFile object.

### Basic Examples
```javascript
browserFileStorage.load('background.png').then((file) => {
    // Assign image source
    let image = document.getElementById('someImage')
    let url = file.createURL()
    image.src = url
}).catch((error) => {
    console.error(error)
})
```

```javascript
browserFileStorage.load('settings.json').then((file) => {
    file.toString().then((stringContents) => {
        // .. parse to JSON and begin using ...
        let object = {}
        try {
            object = JSON.parse(stringContents)
        } catch (e) {
            // Error Parsing.
        }
        
        console.log(object)
    })
}).catch((error) => {
    console.error(error)
})
```

### In Depth Example and Error Handling
```javascript
browserFileStorage.load('favicon.ico').then((file) => {
    // ... File loaded successfully.
    console.log('File Loaded Successfully!', file)
}).catch((error) => {
    if(!error.init) {
        // ... browserFileStorage was not initialized yet.
    }

    if(error.invalidFilename) {
        // ... Error with filename... It is either empty, null, or not a string.
    }

    if(error.notFound) {
        // ... File was not found in inner local database. Filename might be incorrect, or file might no longer exist.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to load.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }
})
```

## Loading All Files

If you want to load all files, they will be returned as an array of BrowserFile objects.


### Basic Example
```javascript
browserFileStorage.loadAll().then((files) => {
    for(let f in files) {
        console.log('Loaded a file: ', files[f])
    }
}).catch((error) => {
    console.error(error)
})
```

### In Depth Example and Error Handling
```javascript
browserFileStorage.loadAll().then((files) => {
    // ... Append all locally stored PNGs to document body.
    for(let f in files) {
        let file = files[f]

        if(file.type === 'image/png') {
            let image = document.createElement('img')
            image.src = file.createURL()
            document.body.appendChild(image)
        }
    }
}).catch((error) => {
    if(!error.init) {
        // ... browserFileStorage was not initialized yet.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to load all files.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }
})
```

## Listing all filenames / keys

If you want to get a list of all filenames or keys (Ex: in order to delete some of them)

### Basic Example
```javascript
browserFileStorage.list().then((filenames) => {
    for(let f in filenames) {
        console.log('Use this key to delete or load a file: ', filenames[f])
    }
}).catch((error) => {
    if(!error.init) {
        // ... browserFileStorage was not initialized yet.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to load all keys.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }
})
```

## Deleting a file

Delete takes a filename and resolves once the file is no longer there. It will resolve regardless of if the file existed in the first place or not.

### Basic Example
```javascript
browserFileStorage.delete('favicon.ico').then(() => {
    console.log('Favicon.ico no longer exists locally!')
}).catch((error) => {
    console.error(error)
})
```

### In Depth Example and Error Handling
```javascript
browserFileStorage.delete('settings.json').then(() => {
    // ... Delete does not resolve with any particular value.
    console.log('settings.json no longer exists locally!')
}).catch((error) => {
    if(!error.init) {
        // ... browserFileStorage was not initialized yet.
    }

    if(error.invalidFilename) {
        // ... Error with filename... It is either empty, null, or not a string.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to load.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }
})
```

## Deleting All Files

### Basic Example
```javascript
browserFileStorage.deleteAll().then(() => {
    console.log('Deleted All Files!')
}).catch((error) => {
    console.error(error)
})
```

### In Depth Example and Error Handling
```javascript
browserFileStorage.deleteAll().then(() => {
   console.log('Deleted All Files!')
}).catch((error) => {
    if(!error.init) {
        // ... browserFileStorage was not initialized yet.
    }

    if(error.dbError) {
        // ... Internal IndexedDB error! Oh no! Failed to load all files.

        // ... What was the problem exactly? (Error Object)
        console.error(error.error)
    }
})
```


# Capacity

Storage allowed for the inner IndexedDB Api is surprisingly high, specially when persisted, but it is very browser dependent.
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria

...

# <a name="specific-save"></a> Save specific examples.

## Storing a file fetched using XHR
```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', 'static/icon-source.png', true);

xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;
    browserFileStorage.save('icon-source.png', blob).then((file) => {
        console.log('Saved file!', file)
    })
    .catch((error) => {
        console.error(error)
    })
  }
};

xhr.onerror = function(e) {
  alert("Error " + e.target.status + " occurred while receiving the document.");
};

xhr.send();
```

## Storing a file fetched using XHR (axios)
```javascript
axios({
    url: 'static/icon-source.png',
    method: 'GET',
    responseType: 'blob'
}).then((response) => {

    browserFileStorage.save('icon-source.png',response.data).then((file) => {
        console.log('Saved file!', file)
    })
    .catch((error) => {
        console.error(error)
    })

}).catch((error) => [
    console.error(error)
])

```

## Storing a file from upload file input
```javascript
// file-upload is an existing input element of type `file`
let fileInput = document.getElementById('file-upload')

fileInput.addEventListener('change', (e) => {
    let files = e.target.files
    let file = files ? files[0] : null
    if(file) {
        browserFileStorage.save(file.name, file).then((savedFile) => {
            console.log('saved file! - ', savedFile)
        }).catch(error => {
            console.error(error)
        })
    } else {
        console.log('no file...')
    }
})
```


## Getting file hashes to know if file needs to be updated

While I decided not to implement something like this in the base library, you can use libraries such as CryptoJS to get hashes from a browserFileStorage file.

```javascript
let loadedFile = // Load a file using browserStorage...
loadedFile.toArrayBuffer().then((arrayBuffer) => {
    let wordArray = window.CryptoJS.lib.WordArray.create(arrayBuffer)
    let hash = window.CryptoJS.MD5(wordArray).toString())
    console.log(hash)
})

```
