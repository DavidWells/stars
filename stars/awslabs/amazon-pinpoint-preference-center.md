---
repo: awslabs/amazon-pinpoint-preference-center
url: 'https://github.com/awslabs/amazon-pinpoint-preference-center'
homepage: >-
  https://aws.amazon.com/solutions/implementations/amazon-pinpoint-preference-center/
starredAt: '2021-10-02T06:41:33Z'
createdAt: '2020-11-10T00:04:16Z'
updatedAt: '2024-08-20T13:51:28Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:44.145Z'
description: >-
  Configures and builds an Amazon Pinpoint Preference Center that allows
  Pinpoint Customers to collect end-user attributes and communication
  preferences.
tags: []
---

# Deprecation Notice
This AWS Solution has been archived and is no longer maintained by AWS. To discover other solutions, please visit the [AWS Solutions Library](https://aws.amazon.com/solutions/).

# Amazon Pinpoint Preference Center
Configures and builds an Amazon Pinpoint Preference Center that allows Pinpoint Customers to collect end-user attributes and communication preferences.

## Running unit tests for customization
* Clone the repository, then make the desired code changes
* Next, run unit tests to make sure added customization passes the tests
```
cd ./deployment
chmod +x ./run-unit-tests.sh  \n
./run-unit-tests.sh \n
```
 
## Building distributable for customization
* Configure the bucket name of your target Amazon S3 distribution bucket
```
export DIST_OUTPUT_BUCKET=my-bucket-name # bucket where customized code will reside
export SOLUTION_NAME=my-solution-name
export VERSION=my-version # version number for the customized code
```
_Note:_ You would have to create an S3 bucket with the prefix 'my-bucket-name-<aws_region>'; aws_region is where you are testing the customized solution. Also, the assets in bucket should be publicly accessible.

* Now build the distributable:
```
chmod +x ./build-s3-dist.sh \n
./build-s3-dist.sh $DIST_OUTPUT_BUCKET $SOLUTION_NAME $VERSION \n
```

* Deploy the distributable to an Amazon S3 bucket in your account. _Note:_ you must have the AWS Command Line Interface installed.
```
aws s3 cp ./dist/ s3://my-bucket-name-<aws_region>/$SOLUTION_NAME/$VERSION/ --recursive --acl bucket-owner-full-control --profile aws-cred-profile-name \n
```

* Get the link of the solution template uploaded to your Amazon S3 bucket.
* Deploy the solution to your account by launching a new AWS CloudFormation stack using the link of the solution template in Amazon S3.

*** 

## File Structure

```
|-deployment/
  |-build-s3-dist.sh             [ shell script for packaging distribution assets ]
  |-run-unit-tests.sh            [ shell script for executing unit tests ]
  |-solution.yaml                [ solution CloudFormation deployment template ]
|-source/
  |-example-function-js          [ Example microservice function in javascript ]
    |- lib/                      [ Example function libraries ]
  |-example-function-py          [ Example microservice function in python ]

```

Each microservice follows the structure of:

```
|-service-name/
  |-lib/
    |-[service module libraries and unit tests]
  |-index.js [injection point for microservice]
  |-package.json
```

***

This solution collects anonymous operational metrics to help AWS improve the quality of features of the solution. For more information, including how to disable this capability, please see the [Implementation Guide](https://docs.aws.amazon.com/solutions/latest/amazon-pinpoint-preference-center/appendix-g-collection-of-operational-metrics.html).

***


Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://www.apache.org/licenses/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
