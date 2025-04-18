---
repo: tobilg/aws-edge-locations
url: 'https://github.com/tobilg/aws-edge-locations'
homepage: ''
starredAt: '2020-04-28T06:31:28Z'
createdAt: '2019-07-22T07:37:19Z'
updatedAt: '2025-02-22T06:09:19Z'
language: TypeScript
license: MIT
branch: main
stars: 61
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:55.441Z'
description: List of AWS edge location code prefixes
tags: []
---

# aws-edge-locations
List of AWS CloudFront Edge Location code prefixes including latitude/longitude information, usable via a lookup mechanism.

## Data

If you're here for the plain data, have a look at

* [List of AWS CloudFront Edge Locations (as CSV)](data/aws-edge-locations.csv) 
* [List of AWS CloudFront Edge Locations (as JSON)](data/aws-edge-locations.json)
* [List of AWS CloudFront Edge Locations (as Parquet)](data/aws-edge-locations.parquet)

## Installation
To install, you can do the following:

```bash
$ npm i --save aws-edge-locations
```

## Usage

### Node

This package can be used to lookup the AWS CloudFront Edge Locations via the three character prefix (the first three characters of the `location` (e.g. `IAD12`) field in the CloudFront logs).

```javascript
const AWSEdgeLocations = require('aws-edge-locations').default;
// Or
// import AWSEdgeLocations from 'aws-edge-locations';

const el = new AWSEdgeLocations();
const location = el.lookup('IAD12'.substr(0,3)); // Use only the first three characters!

/* returns
{
  "city": "Washington",
  "country": "United States",
  "countryCode": "US",
  "latitude": 38.94449997,
  "longitude": -77.45580292,
  "pricingRegion": "United States, Mexico, & Canada"
}
*/

const invalid = el.lookup('FOO'); // returns false

// Get edge location count
const locationCount = el.getLocationCount(); // returns the current number of locations
```

### Browser

This package is published as an UMD module, and can be used in the browser directly from [unpkg](https://unpkg.com/).

```html
<html>
    <head>
        <script src="https://unpkg.com/aws-edge-locations"></script> 
    </head>
    <body>
        <script>
            // Using the global variable
            document.write('There are ' + awsEdgeLocations.getLocationCount() + ' edge locations');
        </script>
    </body>
</html>
```

## Local data generation

To prepare the data regeneration, please run `npm run download-airports && npm run filter-airports`.

The `npm run generate` script will regenerate the `csv`, `json` and `parquet` versions of the AWS CloudFront Edge Location list in the `data` folder.

It does this by extracting the information from the [Amazon CloudFront Key Features page](https://aws.amazon.com/cloudfront/features/), cleaning and unifiying it, and merging it with [airport data](https://r2.datahub.io/clt98lrmc000fl708ilem2s44/master/raw/data/airport-codes.csv) (the first three characters of the `location` field are IATA airport codes) to also get the latitude/longitude information.

Also, there are some manual overrides when it wasn't possible to automatically determine the correct IATA code from the city names.

Running `npm run build` will transpile the TypeScript code in the `src` directory and save it in the `dist` directory.
