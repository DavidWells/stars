---
repo: theotow/nodejs-kafka-example
url: 'https://github.com/theotow/nodejs-kafka-example'
homepage: 'https://medium.com/@theotow/event-sourcing-with-kafka-and-nodejs-9787a8e47716'
starredAt: '2018-10-19T04:47:21Z'
createdAt: '2018-05-07T08:05:56Z'
updatedAt: '2025-02-24T09:38:34Z'
language: JavaScript
license: NA
branch: master
stars: 82
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:10.607Z'
description: Event sourcing with kafka and nodejs
tags:
  - kafka
  - nodejs
---

# Nodejs Kafka


## Setup

Make sure you have following on your local machine installed
>   docker - 18.03.1
>   docker-compose - 1.21.1
>   node - 9.9.0
>   npm - 5.6.0

Install Project

    npm install
    docker-compose up

Create Kafka Topics

    docker run --rm -it --net=host landoop/fast-data-dev kafka-topics --zookeeper 127.0.0.1:2181 --topic requests --replication-factor 1 --partitions 100 --create
    docker run --rm -it --net=host landoop/fast-data-dev kafka-topics --zookeeper 127.0.0.1:2181 --topic finalevents --replication-factor 1 --partitions 100 --create

Kafka UI

   Visit http://127.0.0.1:3030 to inspect your kafka broker, topics, partitions etc.



## Usage

Terminal1: Start Consumer (you can start multiple in different terminals to spread the load)

    node consumer.js

Terminal2: Start API

    node api.js

Terminal3: Start CLI

    node cli.js

Start interacting with the CLI and observe what the API / Consumer does
