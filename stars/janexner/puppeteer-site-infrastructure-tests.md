---
repo: janexner/puppeteer-site-infrastructure-tests
url: 'https://github.com/janexner/puppeteer-site-infrastructure-tests'
homepage: ''
starredAt: '2020-05-16T01:20:11Z'
createdAt: '2019-06-19T07:19:30Z'
updatedAt: '2022-11-18T20:42:03Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:52.379Z'
description: >-
  Test framework that allows analysts/marketers to specify site infrastructure
  regression tests for dev
tags:
  - adobe
  - bdd
  - cucumber
  - javascript
  - javascript-library
  - puppeteer
  - webanalytics
---

# Site Infrastructure Tests

This project contains code that you can use to build your own test suite.

The suite can be used to test parts of the site infrastructure that are important for whatever your Analytics/Marketing team ads on top of it using the tag management system.

Running this suite as a regression tests effectively prevents dev from pulling the ground from under analytics feet.

## How it works

The Site Infrastructure Tests framework is based on cucumber/gherkin. Check https://docs.cucumber.io/guides/10-minute-tutorial/#write-a-scenario for a quick introduction.

Tests, called "features" in cucumber/gherkin, describe how we expect the site to react to loading a page or actions happening on the page.

In order to use the framework on your site, you provide features.

This framework is based on puppeteer, so after you cloned it and ran ```npm install```, you can directly run ```npm run test```.

## Features

While gherkin describes the formal language used in features, the semantics of the statements still has to be coded. The following list shows all statements / tests that are currently available.

Here is an example of a feature file:

```gherkin
@analytics
Feature: Minimal tracking infrastructure on the home page is ok
  As an analytics team
  I want the home page to contain tracking infrastructure
  so I can track data and analyse it

  @trackingdata
  Scenario: The home page loads and all data is present
    Given the page "https://www.jan-exner.de/" is loaded
    And we wait for 1 second
    Then there is a data layer element called "digitalData.page.pageInfo.language"
    And the "digitalData.page.pageInfo.pageName" data layer element is "Home"

  @trackingtools
  Scenario: The home page loads and contains DTM
    Given the page "https://www.jan-exner.de/" is loaded
    Then DTM is present
    And the DTM library is "satelliteLib-f898bce177301e894492bf685fe6bc28e8eca6c5"
```

This example contains 1 feature called "Minimal tracking infrastructure on the home page is ok", as well as 2 scenarios.

Each scenario is describes with "Given", "When" (optional), and "Then" phrases. "And" phrases do exactly what you'd think they'd do.

The "The home page loads and contains DTM" scenario first loads the page on "https://www.jan-exner.de/", then runs two checks: "DTM is present" and "the DTM library is ...".

The feature passes the test if all "Then" statements in all scenarios are successful.

## Available Statements

When you write features, you can use the following statements.

### Setup / "Given" / "When"

These statements can be used to setup for the tests in the scenarios. You must use at least `the page "<URL>" is loaded`.

#### `the page "<URL>" is loaded`

Causes the framework to load the page behind that URL in Chrome.

Example: `the page "https://www.jan-exner.de/" is loaded`

#### `the snippet "<JS code>" is executed`

Causes the framework to execute the Javascript code inside Chrome.

Example: `the snippet "window.jan=true;" is executed`

#### `we wait for xy second[s]`

Causes the framework to wait a number of seconds before working any further.

Example: `we wait for 1 second`

Example: `we wait for 5 seconds`

### Tests / "Then"

Statements that are not related to any specific tools.

#### `there is a data layer element called "<name>"`

Causes the framework to test whether there is a data layer element with the name given.

Example: `there is a data layer element called "digitalData.page.pageInfo.pageName"`

Example: `the data layer element "digitalData.page.pageInfo.pageName" exists`

*Note: both phrases test the exact same thing*

*Note: this can be used to test the presence of any Javascript variable*

#### `the "<name>" data layer element is "<value>"`

Causes the framework to compare the value of the data element with the value given.

Example: `the "digitalData.page.pageInfo.pageName" data layer element is "Home"`

#### `the "<name>" data layer element is <value>`

Causes the framework to compare the value of the data element with the value given. Same  as above but for numeric values.

Example: `the "digitalData.page.pageInfo.ageInDays" data layer element is 5`

#### `the DOM element "<name>" exists`

Causes the framework to test whether the DOM element of the given name/path exists.

Example: `the DOM element "button.cartAdd" exists`

#### `the DOM element "<name>" exists <n> times`

Causes the framework to test whether the DOM element of the given name/path exists n times.

Example: `the DOM element "button.cartAdd" exists 2 times`

#### `the snippet "<JS snippet>" evaluates to true`

Causes the framework to execute the Javascript snippet given and check whether it evaluates to true.

Example: `the snippet "window.jan" evaluates to true`

There are statements that are directly associated with Adobe Experience Cloud solutions.

#### `Launch is present`

Causes the framework to test whether Launch, by Adobe is being loaded on the page

Example: `Launch is present` 

#### `DTM is present`

Causes the framework to test whether DTM is being loaded on the page

Example: `DTM is present` 

#### `the DTM library is "<libraryId>"`

Causes the framework to test whether the DTM library is the correct one.

Example: `the DTM library is "satelliteLib-f898bce177301e894492bf685fe6bc28e8eca6c5"`

#### `MCID|ECID|Experience Cloud ID Service is present`

Causes the framework to test whether the Experience Cloud ID Service (aka Marketing Cloud ID Service, aka Visitor ID Service)

Example: `MCID is present`

Example: `ECID is present`

Example: `Experience Cloud ID Service is present`

*Note that the three examples are equivalent and will result in the exact same test.*

#### `MCID|ECID|Experience Cloud ID Service version is "<version>" or later`

Causes the framework to test whether Experience Cloud ID Service is at least of a specific version.

Example: `MCID version is "2.1.0" or later`

Example: `ECID version is "2.1.0" or later`

Example `Experience Cloud ID Service version is "2.1.0" or later`

*Note that the three examples are equivalent and will result in the exact same test.*

#### `MCID|ECID|Experience Cloud ID Service version is below "<version>"`

Causes the framework to test whether Experience Cloud ID Service is not too recent.

Example: `MCID version is below "2.4"`

Example: `ECID version is below "2.4"`

Example: `Experience Cloud ID Service version is below "2.4"`

*Note that the three examples are equivalent and will result in the exact same test.*

#### `AA|Adobe Analytics is present`

Causes the framework to test whether Analytics is loaded into the page.

Example: `AA is present`

Example: `Adobe Analytics is present`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `AA|Adobe Analytics version is "<version>" or later`

Causes the framework to test whether Analytics is at least of a specific version.

Example: `AA version is "2.4.0" or later`

Example: `Adobe Analytics version is "2.4.0" or later`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `AA|Adobe Analytics lib type is "<type>"`

Causes the framework to test whether the Analytics library is of the given type ("AppMeasurement", "legacy", or "none")

Example: `AA lib type is "AppMeasurement"`

Example: `Adobe Analytics lib type is "AppMeasurement"`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `an AA|Adobe Analytics call has been sent for report suite id "<rsid>"`

Causes the framework to test whether a tracking call for Analytics was sent.

Example: `an AA call has been sent for report suite "jexnerprod"`

Example: `an Adobe Analytics call has been sent for report suite "jexnerprod"`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `latest AA|Adobe Analytics tracking call contains key "<key>" with value "<value>"`

Causes the framework to check the latest Adobe Analytics tracking call for a specific key (or "variable") and test that the value is correct.

Example: `latest AA|Adobe Analytics tracking call contains key "v3" with value "default"`

#### `AT|Adobe Target is present`

Causes the framework to test whether Target has been loaded.

Example: `AT is present`

Example `Adobe Target is present`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `AT|Adobe Target version is "<version>" or later`

Causes the framework to test whether Target is at least of a specific version.

Example: `AT version version is "1.0" or later`

Example: `Adobe Target version is "1.0" or later`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `AT|Adobe Target lib type is "<version>"`

Causes the framework to test whether the Target library is of the given type ("at.js", "legacy", or "none")

Example: `AT lib type is "at.js"`

Example: `Adobe Target lib type is "at.js"`

*Note that the two examples are equivalent and will result in the exact same test.*

#### `an AT|Adobe Target mbox named "<name>" exists`

Causes the framework to test whether a Target mbox of the given name exists on the page.

Example: `AT mbox named "target-global-mbox" exists`

Example: `Adobe Target mbox named "target-global-mbox" exists`

Some statements test other tools, too.

#### `jQuery is present`

Causes the framework to test whether jQuery has been loaded into the page.

Example: 

#### `the jQuery version is "<version>" or later`

Causes the framework to test whether jQuery is at least of a specific version

Example: `the jQuery version is "2.0.0" or later`

#### `the jQuery version is below "<version>"`

Causes the framework to test whether the jQuery version is not too recent.

Example: `the jQuery version is below "3"`

#### `GTM is present`

Causes the framework to test whether Google Tag Manager is loaded into the page.

Example: `GTM is present`

#### `Ensighten Manage is present`

Causes the framework to test whether Ensighten Manage is loaded into the page.

Example: `Ensighten Manage is present`

#### `Tealium IQ is present`

Causes the framework to test whether Tealium IQ is loaded into the page.

Example: `Tealium IQ is present`

#### `log Browser Performance Timing`

Causes the framework to retrieve the window.performance.timing object from the browser
and to log it into the 'timings.csv' file.

Example: `log Browser Performance Timing`
