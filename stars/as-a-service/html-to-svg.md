---
repo: as-a-service/html-to-svg
url: 'https://github.com/as-a-service/html-to-svg'
homepage: 'https://html-to-svg.as-a-service.dev/'
starredAt: '2020-05-09T00:41:20Z'
createdAt: '2020-05-07T02:06:12Z'
updatedAt: '2024-12-09T21:13:51Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 124
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:53.944Z'
description: svg screenshot of web pages (saves the given URL to an SVG file)
tags:
  - cloud-run
  - screenshot
  - svg
---

# Saves the given URL to an SVG file

A simple web service that saves the given URL to an SVG image.

Run with `docker run -p 8080:8080 gcr.io/as-a-service-dev/html-to-svg`

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://deploy.cloud.run)

## API

### URL parameters:

* `url`: The URL of the website to capture
* (`width`): The viewport width (in pixels), defaults to 1280
* (`height`): The viewport height (in pixels), defaults to 800

Example: `/?url=https://steren.fr`

## Running the server locally

* Build with `docker build . -t html-to-svg`
* Start with `docker run -p 8080:8080 html-to-svg`
* Open in your browser at `http://localhost:8080/?url=https://steren.fr`

![CloudBuild](https://badger-l7zawt5jsq-uw.a.run.app/build/status?project=as-a-service-dev&id=6fd4fa14-6e16-4a60-a754-9fd4ffe8872d)
