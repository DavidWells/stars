---
repo: antonosmond/mock-aws
url: 'https://github.com/antonosmond/mock-aws'
homepage: null
starredAt: '2016-11-27T19:42:33Z'
createdAt: '2015-08-09T01:10:24Z'
updatedAt: '2023-01-28T15:51:13Z'
language: JavaScript
license: ISC
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:50:35.933Z'
description: >-
  Mock aws-sdk API methods to enable easier testing of apps which use the AWS
  SDK for JavaScript
tags: []
---

# mock-aws
Easily mock aws-sdk API methods to enable easier testing of applications which use the [AWS SDK for JavaScript](http://www.npmjs.com/package/aws-sdk).

[![Build Status](https://travis-ci.org/antonosmond/mock-aws.svg?branch=master)](https://travis-ci.org/antonosmond/mock-aws)

Under the hood, this stubs aws-sdk methods using [sinon.js](http://sinonjs.org/).

### API

* [AWS.mock(service, method, data)](#awsmockservice-method-data)
* [AWS.restore(service, method)](#awsrestoreservice-method)
* [AWS.restore(service)](#awsrestoreservice)
* [AWS.restore()](#awsrestore)


#### AWS.mock(service, method, data)
Mocks an AWS service method to return the specified test data or a function
##### Arguments
- **service (string):** the name of the AWS service that the method belongs to e.g. EC2, Route53 etc.
- **method (string):** the service's method to be be mocked e.g. describeTags
- **data (object):** the test data that the mocked method should return or a function that is called

The parameter `data` can be either fixed data, in which case the original callback will be called with that data, or it can be a function. If it is a function, then when the mocked service is called, your function will be called. 

If it is a function, it will be passed all of the parameters passed to the original AWS SDK call, including the callback. **You are expected to call the callback.**

Example of fixed data:

```js
var AWS = require('mock-aws');
var ec2 = new AWS.EC2();

AWS.mock('EC2', 'describeTags', [ 'one', 'two', 'three' ]);
ec2.describeTags({}, function(err, data) {
  console.log(data); // data should equal [ 'one', 'two', 'three' ];
});
```

Example of function:

```js
var AWS = require('mock-aws');
var ec2 = new AWS.EC2();

AWS.mock('EC2', 'describeTags', function(params,callback){
  params = params || {};
  if (params.special) {
    callback(null,"special");
  } else if (params.strange) {
    callback(null,"weird");
  } else {
    callback("ERROR!");
  }
});
ec2.describeTags({}, function(err, data) {
  console.log(err);  // err should equal "ERROR!"
  console.log(data); // data should be undefined
});
ec2.describeTags({special: true}, function(err, data) {
  console.log(err);  // err should be null
  console.log(data); // data should be "special"
});
ec2.describeTags({strange:true}, function(err, data) {
  console.log(err);  // err should be null
  console.log(data); // data should be "weird"
});
```


#### AWS.restore(service, method)
Removes mocked service method to restore the original functionality
##### Arguments
- **service (string):** the name of the AWS service that the method belongs to e.g. EC2, Route53 etc.
- **method (string):** the service's method to be be restored e.g. describeTags

```js
var AWS = require('mock-aws');

// Mock some EC2 methods to return specified test data
AWS.mock('EC2', 'describeTags', [ 'one', 'two', 'three' ]);
var ec2 = new AWS.EC2();

// EC2 methods should return specified test data
ec2.describeTags({}, function(err, data) {
  console.log(data); // data should equal [ 'one', 'two', 'three' ];
});

// Call restore with a service & method
AWS.restore('EC2', 'describeTags');

// describeTags method now returns real AWS data
ec2.describeTags({}, function(err, data) {
  console.log(data); // data should equal real data from AWS
});
```

#### AWS.restore(service)
Removes ALL mocked methods for given service to restore the original functionality
##### Arguments
- **service:** (string) the name of the AWS service to restore e.g. EC2, Route53 etc.

```js
var AWS = require('mock-aws');
var ec2 = new AWS.EC2();

AWS.mock('EC2', 'describeTags', [ 'one', 'two', 'three' ]);
AWS.mock('EC2', 'describeVpcs', 'vpcs');
ec2.describeTags({}, function(err, data) {
  console.log(data); // data should equal [ 'one', 'two', 'three' ];
});
ec2.describeVpcs({}, function(err, data) {
  console.log(data); // data should equal 'vpcs';
});

AWS.restore('EC2');
ec2.describeTags({}, function(err, data) {
  console.log(data); // data should be real data from AWS
});
ec2.describeVpcs({}, function(err, data) {
  console.log(data); // data should be real data from AWS
});
```

#### AWS.restore()
Removes ALL mocked services & methods to restore the original functionality

```js
var AWS = require('mock-aws');

var ec2 = new AWS.EC2();
var s3 = new AWS.S3();

AWS.mock('EC2', 'describeTags', [ 'one', 'two', 'three' ]);
AWS.mock('EC2', 'describeVpcs', 'vpcs');

AWS.mock('S3', 'listBuckets', { buckets: [] });

ec2.describeTags({}, function(err, data) {
  console.log(data); // data should equal [ 'one', 'two', 'three' ];
});
ec2.describeVpcs({}, function(err, data) {
  console.log(data); // data should equal 'vpcs';
});

s3.listBuckets({}, function(err, data) {
  console.log(data); // data should equal { buckets: [] };
})


AWS.restore('EC2');
ec2.describeTags({}, function(err, data) {
  console.log(data); // data should be real data from AWS
});
ec2.describeVpcs({}, function(err, data) {
  console.log(data); // data should be real data from AWS
});
s3.listBuckets({}, function(err, data) {
  console.log(data); // data should equal { buckets: [] };
})
```


#### Example
I want to build and test a tag validator that returns the id's of any EBS volumes which don't have a tag called 'name'.
My production code for my tag-validator may look something like the following:
```js
var AWS = require('aws-sdk');

function getNamelessVolumes(region, callback) {

  var ec2 = new AWS.EC2({ region: region });

  ec2.describeVolumes({}, function(err, data) {
    if (err) callback(err, null);
    var namelessVolumes = [];
    data.Volumes.forEach(function(volume) {
      var named = false;
      for (var i = 0; i < volume.Tags.length; i++) {
        if (volume.Tags[i].Key.toLowerCase() === 'name') {
          named = true;
          break;
        }
      }
      if (!named) {
        namelessVolumes.push(volume.VolumeId);
      }
    });
    callback(null, namelessVolumes);
  });

}

module.exports = {
  getNamelessVolumes: getNamelessVolumes
};
```
In order to test my validator, I don't want to actually call AWS, nor do I want to have to change my production code.
The mock-aws module solves this problem - I can easily mock the describeVolumes method in my test then call the tag validator as normal.
This way I can use varying test data to fully test the getNamelessVolumes function, without relying on AWS services.
First I setup my test data:
```json
{
  "Volumes": [
    {
      "VolumeId": "v-111",
      "Tags": [
        {
          "Key": "name",
          "Value": "volume 1"
        },
        {
          "Key": "role",
          "Value": "test"
        }
      ]
    },
    {
      "VolumeId": "v-222",
      "Tags": [
        {
          "Key": "role",
          "Value": "test"
        }
      ]
    }
  ]
}
```
Now I can write my test, mocking describeVolumes() to return my test data
```js
var should = require('should');
var AWS = require('mock-aws'); // include mock-aws instead of aws-sdk
var tagValidator = require('../lib/tag-validator');

describe('tag-validator', function() {
  describe('getNamelessVolumes()', function() {
    it('should return the ids of volumes which do NOT contain a "name" tag', function(done) {

      // Test data for the AWS method to return
      var testData = require('./test-data.json');

      // Mock the aws-sdk method 'describeVolumes' to return the test data
      AWS.mock('EC2', 'describeVolumes', testData);

      // Call the function I'm trying to test
      tagValidator.getNamelessVolumes('us-east-1', function(err, data) {
        // Assert that getNamelessVolumes() returned the correct results
        data.length.should.eql(1);
        data[0].should.eql('v-222');
        done();
      });

    });
  });
});
```
The point here is that I can test the functionality of my tag-validator without making real calls to AWS and I never had to modify my production code in order to make it testable. mock-aws handled it for me.

I built this for myself but feel free to use, share, submit bugs / pull requests, suggest changes or features etc.
