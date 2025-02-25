---
repo: peopledatalabs/peopledatalabs-js
url: 'https://github.com/peopledatalabs/peopledatalabs-js'
homepage: 'https://docs.peopledatalabs.com/docs/javascript-sdk'
starredAt: '2022-03-15T03:37:24Z'
createdAt: '2022-01-16T05:32:34Z'
updatedAt: '2025-02-20T16:05:00Z'
language: TypeScript
license: MIT
branch: main
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:59.527Z'
description: A universal JS client with TypeScript support for the People Data Labs API
tags:
  - api
  - companies
  - company-data
  - company-enrichment
  - company-search
  - contact-data
  - data-enrichment
  - enrichment
  - javascript-library
  - npm-package
  - people
  - people-data
  - peopledatalabs
  - person-enrichment
  - person-search
  - sdk-js
  - search
---

<p align="center">
<img src="https://www.peopledatalabs.com/images/company-logo.png" style="background-color: white; padding: 5px 10px;" width="250" alt="People Data Labs Logo">
</p>
<h1 align="center">People Data Labs JavaScript Library</h1>
<p align="center">
JavaScript client with TypeScript support for the People Data Labs API.
</p>

<p align="center">
  <a href="">
    <img src="https://img.shields.io/badge/repo%20status-Active-limegreen" alt="Repo Status">
  </a>&nbsp;
  <a href="https://www.npmjs.com/peopledatalabs">
    <img src="https://img.shields.io/npm/v/peopledatalabs.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="People Data Labs on NPM" />
  </a>&nbsp;
  <a href="">
    <img src="https://github.com/peopledatalabs/peopledatalabs-js/actions/workflows/test.yaml/badge.svg" alt="Tests Status" />
  </a>
</p>

#

This is a simple JavaScript client library to access the various API endpoints provided by [People Data Labs](https://www.peopledatalabs.com/).

This library bundles up PDL API requests into simple function calls, making it easy to integrate into your projects. You can use the various [API endpoints](#endpoints) to access up-to-date, real-world data from our massive [Person](https://docs.peopledatalabs.com/docs/stats) and [Company](https://docs.peopledatalabs.com/docs/company-stats) Datasets.  

## ✨ Features

- Supports all People Data Labs API endpoints
- Built-in Typescript support

## Table of Contents

- [🔧 Installation](#installation)
- [🚀 Usage](#usage)
- [🌐 Endpoints](#endpoints)
- [📘 Documentation](#documentation)
  - [Special Note about Search API Support](#special-note)
  - [Upgrading to v6.X.X](#upgrading-to-v6)
  - [Upgrading to v5.X.X](#upgrading-to-v5)

## 🔧 Installation <a name="installation"></a>

1. Pull the package from the npm repository:

```bash
yarn add peopledatalabs
```

or

```bash
npm i peopledatalabs
```

2. If you get a error while running a typescript project, add `"esModuleInterop": true` to your tsconfig

3. Sign up for a [free PDL API key](https://www.peopledatalabs.com/signup)

## 🚀 Usage <a name="usage"></a>

First, create the PDLJS client:

```js
import PDLJS from 'peopledatalabs';

const PDLJSClient = new PDLJS({ apiKey: 'YOUR API KEY' })
```

Then, send requests to any PDL API Endpoint:

**Using Person APIs**

```js
// By Enrichment
try {
  const response = await PDLJSClient.person.enrichment({ phone: '4155688415' });

  console.log(response);
} catch (error) {
  console.log(error);
}

// By Preview Enrichment
try {
  const response = await PDLJSClient.person.enrichmentPreview({ phone: '4155688415' });

  console.log(response);
} catch (error) {
  console.log(error);
}

// By Bulk Enrichment
const bulkEnrichmentRecords = {
  requests: [
    {
      params: {
        profile: ['linkedin.com/in/seanthorne'],
      },
    },
    {
      params: {
        profile: ['linkedin.com/in/randrewn'],
      },
    },
  ],
};

try {
  const response = await PDLJSClient.person.bulk.enrichment(bulkEnrichmentRecords);

  console.log(response.items);
} catch (error) {
  console.log(error);
}

// By Search (SQL)
const sqlQuery = "SELECT * FROM person WHERE location_country='mexico' AND job_title_role='health'AND phone_numbers IS NOT NULL;"

try {
  const response = await PDLJSClient.person.search.sql({ searchQuery: sqlQuery, size: 10 });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

// By Search (Elasticsearch)
const esQuery = {
  query: {
    bool: {
      must:[
        { term: { location_country: 'mexico' } },
        { term: { job_title_role: 'health' } },
        { exists: { field: 'phone_numbers' } }
      ]
    }
  }
}

try {
  const response = await PDLJSClient.person.search.elastic({ searchQuery: esQuery, size: 10 });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

// By Fuzzy Enrichment
try {
  const response = await PDLJSClient.person.identify({ name: 'sean thorne' });

  console.log(response);
} catch (error) {
  console.log(error);
}
```

**Using Company APIs**

```js
// By Enrichment
try {
  const response = await PDLJSClient.company.enrichment({ website: 'peopledatalabs.com' });

  console.log(response);
} catch (error) {
  console.log(error);
}

// By Bulk Enrichment
const bulkEnrichmentRecords = {
  requests: [
    {
      params: {
        profile: ['linkedin.com/in/peopledatalabs'],
      },
    },
    {
      params: {
        profile: ['linkedin.com/in/apple'],
      },
    },
  ],
};

try {
  const response = await PDLJSClient.company.bulk.enrichment(bulkEnrichmentRecords);

  console.log(response.items);
} catch (error) {
  console.log(error);
}

// By Search (SQL)
const sqlQuery = "SELECT * FROM company WHERE tags='big data' AND industry='financial services' AND location.country='united states';"

try {
  const response = await PDLJSClient.company.search.sql({ searchQuery: sqlQuery, size: 10 });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

// By Search (Elasticsearch)
const esQuery = {
  query: {
    bool: {
      must:[
        { term: { tags: 'big data' } },
        { term: { industry: 'financial services' } },
        { term: { location_country: 'united states' } }
      ]
    }
  }
}

try {
  const response = await PDLJSClient.company.search.elastic({ searchQuery: esQuery, size: 10 });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

```

**Using Autocomplete API**

```js
// Get Autocomplete Suggestions
try {
  const response = await PDLJSClient.autocomplete({ field: 'title', text: 'full', size: 10 });

  console.log(response);
} catch (error) {
  console.log(error);
}
```

**Using Cleaner APIs**

```js
// Clean Raw Company Strings
try {
  const response = await PDLJSClient.company.cleaner({ name: 'peOple DaTa LabS' });

  console.log(response);
} catch (error) {
  console.log(error);
}

// Clean Raw Location Strings
try {
  const response = await PDLJSClient.location.cleaner({ location: '455 Market Street, San Francisco, California 94105, US' });

  console.log(response);
} catch (error) {
  console.log(error);
}

// Clean Raw School Strings
try {
  const response = await PDLJSClient.school.cleaner({ name: 'university of oregon' });

  console.log(response);
} catch (error) {
  console.log(error);
}
```

**Using Job Title Enrichment API**

```js
// Enrich a Job Title
try {
  const response = await PDLJSClient.jobTitle({ jobTitle: 'software engineer' });

  console.log(response);
} catch (error) {
  console.log(error);
}
```

**Using Skill Enrichment API**

```js
// Enrich a Skill
try {
  const response = await PDLJSClient.skill({ skill: 'c++' });

  console.log(response);
} catch (error) {
  console.log(error);
}
```

**Using IP Enrichment API**

```js
// Enrich an IP Address
try {
  const response = await PDLJSClient.ip({ ip: '72.212.42.228' });

  console.log(response);
} catch (error) {
  console.log(error);
}
```

**Using Sandbox APIs**

```js
// By Person Enrichment
try {
  const response = await PDLJSClient.person.enrichment({
    email: 'reneewillis74@aol.com',
    sandbox: true,
  });

  console.log(response);
} catch (error) {
  console.log(error);
}

// By Person Search (SQL)
try {
  const response = await PDLJSClient.person.search.sql({
    searchQuery: "SELECT * FROM person WHERE location_country='united states';",
    size: 10,
    sandbox: true,
  });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

// By Person Search (Elasticsearch)
const esQuery = {
  query: {
    bool: {
      must:[
        { term: { location_country: 'united states' } }
      ]
    }
  }
}

try {
  const response = await PDLJSClient.person.search.elastic({ searchQuery: esQuery, size: 10, sandbox: true });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

// By Person Fuzzy Enrichment
try {
  const response = PDLJSClient.person.identify({ email: 'reneewillis74@aol.com', sandbox: true });

  console.log(response);
} catch (error) {
  console.log(error);
}

// By Company Enrichment
try {
  const response = await PDLJSClient.company.enrichment({ website: 'kohlerinteriors.com', sandbox: true });

  console.log(response);
} catch (error) {
  console.log(error);
}

// By Company Search (SQL)
const sqlQuery = "SELECT * FROM company WHERE tags='hotel consultant' AND industry='hospitality';"

try {
  const response = await PDLJSClient.company.search.sql({ searchQuery: sqlQuery, size: 10, sandbox: true });

  console.log(response.total);
} catch (error) {
  console.log(error);
}

// By Company Search (Elasticsearch)
const esQuery = {
  query: {
    bool: {
      must:[
        { term: { tags: 'hotel consultant' } },
        { term: { industry: 'hospitality' } }
      ]
    }
  }
}

try {
  const response = await PDLJSClient.company.search.elastic({ searchQuery: esQuery, size: 10, sandbox: true });

  console.log(response.total);
} catch (error) {
  console.log(error);
}
```

## 🌐 Endpoints <a name="endpoints"></a>

**Person Endpoints**
| API Endpoint | PDLJS Function |
|-|-|
| [Person Enrichment API](https://docs.peopledatalabs.com/docs/enrichment-api) | `PDLJS.person.enrichment({ ...params })` |
| [Person Preview Enrichment API](https://docs.peopledatalabs.com/docs/preview-enrichment-api) | `PDLJS.person.enrichmentPreview({ ...params })` |
| [Person Bulk Person Enrichment API](https://docs.peopledatalabs.com/docs/bulk-enrichment-api) | `PDLJS.person.bulk.enrichment({ ...records })` |
| [Person Search API](https://docs.peopledatalabs.com/docs/search-api) | SQL: `PDLJS.person.search.sql({ ...params })` <br/> Elasticsearch: `PDLJS.person.search.elastic({ ...params })`|
| [Person Identify API](https://docs.peopledatalabs.com/docs/identify-api) | `PDLJS.person.identify({ ...params })` |

**Company Endpoints**
| API Endpoint | PDLJS Function |
|-|-|
| [Company Enrichment API](https://docs.peopledatalabs.com/docs/company-enrichment-api) | `PDLJS.company.enrichment({ ...params })` |
| [Company Bulk Enrichment API](https://docs.peopledatalabs.com/docs/bulk-company-enrichment-api) | `PDLJS.company.bulk.enrichment({ ...records })` |
| [Company Search API](https://docs.peopledatalabs.com/docs/company-search-api) | SQL: `PDLJS.company.search.sql({ ...params })` <br/> Elasticsearch: `PDLJS.company.search.elastic({ ...params })`|

**Supporting Endpoints**
| API Endpoint | PDLJS Function |
|-|-|
| [Autocomplete API](https://docs.peopledatalabs.com/docs/autocomplete-api) | `PDLJS.autocomplete({ ...params })` |
| [Company Cleaner API](https://docs.peopledatalabs.com/docs/cleaner-apis#companyclean) | `PDLJS.company.cleaner({ ...params })` |
| [Location Cleaner API](https://docs.peopledatalabs.com/docs/cleaner-apis#locationclean) | `PDLJS.location.cleaner({ ...params })` |
| [School Cleaner API](https://docs.peopledatalabs.com/docs/cleaner-apis#schoolclean) | `PDLJS.school.cleaner({ ...params })` |
| [Job Title Enrichment API](https://docs.peopledatalabs.com/docs/job-title-enrichment-api) | `PDLJS.jobTitle({ ...params })` |
| [Skill Enrichment API](https://docs.peopledatalabs.com/docs/skill-enrichment-api) | `PDLJS.skill({ ...params })` |
| [IP Enrichment API](https://docs.peopledatalabs.com/docs/ip-enrichment-api) | `PDLJS.ip({ ...params })` |

**Sandbox Endpoints**
| API Endpoint | PDLJS Function |
|-|-|
| [Person Enrichment Sandbox API](https://docs.peopledatalabs.com/docs/sandbox-apis) | `PDLJS.person.enrichment({ ...params, sandbox: true })` |
| [Person Search Sandbox API](https://docs.peopledatalabs.com/docs/sandbox-apis) | SQL: `PDLJS.person.search.sql({ ...params, sandbox: true })` <br/> Elasticsearch: `PDLJS.person.search.elastic({ ...params, sandbox: true })`|
| [Person Identify Sandbox API](https://docs.peopledatalabs.com/docs/sandbox-apis) | `PDLJS.person.identify({ ...params, sandbox: true })` |
| [Company Enrichment Sandbox API](https://docs.peopledatalabs.com/docs/sandbox-apis) | `PDLJS.company.enrichment({ ...params, sandbox: true })` |
| [Company Search Sandbox API](https://docs.peopledatalabs.com/docs/sandbox-apis) | SQL: `PDLJS.company.search.sql({ ...params, sandbox: true })` <br/> Elasticsearch: `PDLJS.company.search.elastic({ ...params, sandbox: true })`|

## 📘 Documentation <a name="documentation"></a>

All of our API endpoints are documented at: <https://docs.peopledatalabs.com/>

These docs describe the supported input parameters, output responses and also provide additional technical context.

As illustrated in the [Endpoints](#endpoints) section above, each of our API endpoints is mapped to a specific method in the PDLJS class.  For each of these class methods, **all function inputs are mapped as input parameters to the respective API endpoint**, meaning that you can use the API documentation linked above to determine the input parameters for each endpoint.

As an example:

The following is **valid** because `name` is a [supported input parameter to the Person Identify API](https://docs.peopledatalabs.com/docs/identify-api-reference#input-parameters):

```js
PDLJS.person.identify({ name: 'sean thorne' })
```

Conversely, this would be **invalid** because `fake_parameter` is not an input parameter to the Person Identify API:

```js
PDLJS.person.identify({ fake_parameter: 'anything' })
```

#### Special Note about Search API Support <a name="special-note"></a>

Our Person Search API and Company Search API endpoints both support two types of query syntax: you can construct search queries using either `SQL` or `Elasticsearch` syntax.

In the PDLJS class, the person and company search functions are broken out into two syntax-specific methods as follows:
| Data Type | Search Query Syntax | Function |
| -- | -- | -- |
| Person | SQL | `PDLJS.person.search.sql({ ...params })` |
| Person | Elasticsearch | `PDLJS.person.search.elastic({ ...params })` |
| Company | SQL | `PDLJS.company.search.sql({ ...params })` |
| Company | Elasticsearch | `PDLJS.company.search.elastic({ ...params })` |

You can pass your query to these methods using the special `searchQuery` function argument, as shown in the following example:

```js
const sqlQuery = "SELECT * FROM company WHERE website='peopledatalabs.com';"

try {
  const response = await PDLJS.company.search.sql({ searchQuery: sqlQuery, size: 10 });

  console.log(response.total)
} catch (error) {
  console.log(error)
}
```

#### Upgrading to v6.X.X <a name="upgrading-to-v6"></a>

NOTE: When upgrading to v6.X.X from vX.X.X and below, Retrieve and Bulk Retrieve were both changed to make the `pretty`, `titlecase` and `filter_updated` to be siblings of the `requests` parameter.

#### Upgrading to v5.X.X <a name="upgrading-to-v5"></a>

NOTE: When upgrading to v5.X.X from v4.X.X and below, Bulk Enrichment was moved from `PDLJS.person.bulk({ ...records })` to `PDLJS.person.bulk.enrichment({ ...records })`
