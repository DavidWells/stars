---
repo: tiemma/sonic-distribute
url: 'https://github.com/tiemma/sonic-distribute'
homepage: ''
starredAt: '2022-04-03T04:13:46Z'
createdAt: '2021-08-10T22:56:05Z'
updatedAt: '2024-01-19T10:43:06Z'
language: TypeScript
license: NA
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:52.108Z'
description: >-
  Accelerate your distributed processes with this MapReduce framework. Focus on
  your logic and deploy tasks to workers seamelssly.
tags:
  - computing
  - distributed
  - mapreduce
  - nodejs
---

# sonic < distribute >

![image](https://raw.githubusercontent.com/Tiemma/sonic-core/master/image.png) 

Accelerate your linear processes with MapReduce.

![CodeQL](https://github.com/Tiemma/sonic-distribute/workflows/CodeQL/badge.svg)
![Node.js CI](https://github.com/Tiemma/sonic-distribute/workflows/Node.js%20CI/badge.svg)

# What does this do?

It sets up a cluster of workers with a single master node and deploys each task to each worker, adds the results to a queue and processes that based on the specification of your reduce operation.

In simple terms, it's a framework for MapReduce based on Node's cluster.


# How to use it

- Install the package
- Create the masterFn, workerFn and reduceFn methods
- Call the MapReduce method with the functions and a set of args 
- Process the final output as needed

## Install the package

To install the package, run
```bash
npm install --save @tiemma/sonic-distribute
```

## Create the masterFn, workerFn and reduceFn methods

Create a set of methods which implement the Master, Worker and Reduce tasks.

Note the signatures of the methods during your implementation

```typescript
export type MasterFn = (workerQueue: Queue, args: any) => any;
export type WorkerFn = (event: MapReduceEvent, args: any) => any;
export type ReduceFn = (resultQueue: Queue, failedQueue: Queue) => any;
```

## Call the MapReduce method with the functions and a set of args
Then proceed to import and call the MapReduce method as desired

```typescript
import {MapReduce} from "@tiemma/sonic-distribute";

//...describe masterFn, workerFn and reduceFn methods
// the workerFns are pipelined ... event.data -> workerFn[0] -> workerFn[1] ... workerFn[n-1] -> response
const response = await MapReduce(masterFn, [workerFn], reduceFn, { response: ....anything, numWorkers: desired_number_of_workers})
```

> NOTE: The arg numWorkers is reserved to specify the desired number of workers to deploy

## Process the final output as needed
Due to the nature of the fork, you would be required to access the output of the MapReduce operation as so:

```typescript
import {MapReduce, isMaster()} from "@tiemma/sonic-distribute";

//...describe masterFn, workerFn and reduceFn methods
const response = await MapReduce(masterFn, [workerFn], reduceFn, { response: ....anything, numWorkers: desired_number_of_workers})
if(isMaster()) {
    //....process response output of map reduce
}
```

# Environment variables

You can configure the environment to use the `QUIET` environment variable if you choose to not see any logs.

# Why did I do this?

I was working on another package to assist with logical dumps of database tables in the required foreign key order.

This package was born out of the need to optimise the performance of the linear dump process in a configurable way.

# Best Practices

## Synchronization is your job

The entire framework serves to make it easy to just focus on your distributed processing tasks.

There is a good focus on preserving processing order hence why the result is queued, rather than sorted.

Any synchronization primitives required by you across workers would need to be implemented by you.

Since the fork is process based, I advise external systems capable of locking based on some shm e.g sqlite file db, some instance of zookeeper etc.

All of this is left to you to implement.

If you have some method by which it can be simply implemented here, do create a PR using the ISSUE TEMPLATE [here](./.github/ISSUE_TEMPLATE/feature_request.md).


# Future Plans

## Multi-master and tagged worker setups

There might be a case to run multiple masters and  support pushing jobs to certain tagged workers with various workerFns based on the pipeline workers job feature described above.

This is an async pipeline and would be effectively represented by DAGs with various logic for traversing across job in either the worker or reduce stage and across those stages respectively.

If you have some method by which it can be simply implemented here, do create a PR using the ISSUE TEMPLATE [here](./.github/ISSUE_TEMPLATE/feature_request.md).


# Debugging

By default, logs are shown.

If you prefer no logs, kindly set the QUIET env variable.

```bash
export QUIET=true
```

# I found a bug, how can I contribute?
Open up a PR using the ISSUE TEMPLATE [here](./.github/ISSUE_TEMPLATE/feature_request.md)
