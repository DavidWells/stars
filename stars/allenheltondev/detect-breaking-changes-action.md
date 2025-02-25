---
repo: allenheltondev/detect-breaking-changes-action
url: 'https://github.com/allenheltondev/detect-breaking-changes-action'
homepage: null
starredAt: '2022-10-29T20:10:16Z'
createdAt: '2022-10-17T20:58:52Z'
updatedAt: '2025-01-29T22:11:01Z'
language: JavaScript
license: NA
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:15.987Z'
description: null
tags: []
---

## Detect Breaking Change GitHub Action

This GitHub action is used in your CI pipeline to detect breaking changes in an Open API Specification. It will compare the file in the current branch against the file in the main branch. 

**This is intended to be used as an action triggered on a pull request**

## Usage

```yaml
uses: allenheltondev/detect-breaking-changes-action@v1
with:
  specFilename: spec/openapi.yaml
  accessToken: <PAT from GitHub>
  format: yaml
  breakingChangeTypes: |
    removed-paths
    schema-properties-removed
    parameters-removed
```

Or minimally

```yaml
uses: allenheltondev/detect-breaking-changes-action@v1
with:
  specFilename: oas.json
  accessToken: <PAT from GitHub>
```

*NOTE - It is recommended to keep your Personal Access Token as a secret in your repository*

### Inputs

* `specFilename` - *Required* - Relative path to the Open API Spec from the root
* `accessToken` - *Required* - GitHub Personal Access Token used to load the spec from the main branch
* `format` - Specifies the format of the Open API Spec. Accepts *yaml* or *json*. Defaults to *json* if no value is provided
* `breakingChangeTypes` - List of breaking change types to detect. If none are provided, the entire set will be used.

### Breaking Change Types

Below is a list of all the breaking changes the action will detect. 

|type|name|
|------|-----|    
|removed-paths|An entire endpoint and all associated http methods was removed.|
|removed-http-methods|An individual http method was removed from a path.|
|required-request-body|A request now requires a body to be provided.|
|new-schema-definition|A new schema was created for an existing property or object.|
|schema-type-changed|A data type was changed for a top-level schema. Example: "object" to "array".|
|schema-new-required-properties|An existing schema has new required properties.|
|schema-property-type-changed|The data type of a property in a schema changed. Example: "string" to "number".|
|schema-properties-removed|All properties have been removed from a schema.|
|multiple-of-type-changed|A schema defined with a multiple-of property (allOf, anyOf, oneOf) changed. Example: "allOf" to "anyOf".|
|fewer-multiple-of-options|A schema defined with a multiple-of property (allOf, anyOf, oneOf) has fewer options than before.|
|response-removed|A path no longer returns a response code it did previously.|
|new-required-parameters|A path requires additional parameters to be provided.|
|parameters-removed|A path no longer supports one or more parameters|
|parameter-type-changed|The data type of one or more parameters changed. Example: "string" to "number".|
