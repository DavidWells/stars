---
repo: flexivian/flexbench
url: 'https://github.com/flexivian/flexbench'
homepage: null
starredAt: '2022-06-20T21:49:38Z'
createdAt: '2022-01-25T10:56:09Z'
updatedAt: '2024-09-01T22:02:21Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.315Z'
description: 'A nodejs http traffic simulator '
tags: []
---

flexbench
======================
[![Build Status](https://travis-ci.org/flexivian/flexbench.svg?branch=develop)](https://travis-ci.org/flexivian/flexbench)

A nodejs http traffic simulator that scales.

Generate HTTP requests by utilizing the nodejs cluster module. Each worker of the cluster is responsible to create clients that generate requests. This architecture enables the simulator to scale in really big throughputs. It is suggested to balance the workers over the cores of your system. Create as many workers as your system cores.

Forked from http-traffic-simulator
==================================
Forked repo: https://github.com/iskitsas/http-traffic-simulator

Prerequisites
=============
- install node.js/npm (minimum version supported is 12)


Quick start
===========

- Create a `flex-test.js` file with the following content:
```
    var trafficSimulator = require('flexbench');
    function run(){
        trafficSimulator.testDuration(5);//-1 for infinite run
        trafficSimulator.workers(1);
        trafficSimulator.clients(2)
        trafficSimulator.throttleRequests_bps(50000);//-1 for no throttling
        trafficSimulator.randomDelayBetweenRequests('0.5-1.1');

        trafficSimulator.setFunc('request',requestFunc);

        trafficSimulator.start();

        trafficSimulator.events.on('end',function (stats) {
            console.log("Exiting..");
            process.exit();
        });
    }

    var requestFunc= function(){
        var options = {};
        options['host'] = 'www.example.com';
        options['port'] = '80';
        options['path'] = '/';
        options['method'] = 'GET';

        var req=trafficSimulator.request(options,function(response){
            console.log("Response: %s",response.statusCode);
            response.setEncoding('utf8');
            response.on('data',function(chunk){
                console.log(chunk.length)
            });
        });
    }

    run();
```
- Install flexbench dependency:
```
npm install flexbench
```

- Run `flex-test.js`:
```
node flex-test.js
```

# How to run examples after cloning the project locally

Inside the folder `example` you can find various examples. You can copy-paste and use them like in the Quick start guide, or you can clone the whole project locally and link/install flexbench locally (using latest source code), without installing it from public npm repository.

After cloning the project from github, navigate to project and run:

```
npm link flexbench 
```

Then navigate to `example` folder and run any example you want:
eg.
```
cd example
node count-simple-request.js
```

If you want to uninstall just unlink it like this:
```
npm unlink flexbench
```

# How to turn on Anonymization Feature

After you cloned your exmaple, set the anonymize mode into true to turn on anonymization for the HTTPS response:

```
trafficSimulator.setAnonymization(true);
```

If you want to use existing example file to copy and paste over, please go to example folder and find simple-request-anonymized.js

You can always test the anonymization feature by running simple-request-anonymized.js:

```
node simple-request-anonymized.js
```

Features
========
* Throttling
* Clustering
* Anonymizing
* Set delay between requests
* Random or consecutive generation of requests
* Statistics aggregation
* Set duration or total number of requests to be executed during the test
* Utilizing keep-alive-agent module for HTTP connection pooling that re-uses sockets

License
=======
The MIT License (MIT)

Copyright (c) 2022 Flexivian info@flexivian.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
