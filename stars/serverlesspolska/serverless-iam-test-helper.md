---
repo: serverlesspolska/serverless-iam-test-helper
url: 'https://github.com/serverlesspolska/serverless-iam-test-helper'
homepage: null
starredAt: '2021-06-01T16:03:21Z'
createdAt: '2021-05-31T07:49:09Z'
updatedAt: '2024-12-04T18:15:31Z'
language: JavaScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:37.526Z'
description: Helper for testing Lambda IAM Roles created by Serverless Framework.
tags: []
---

# serverless-iam-test-helper
Helper that allows easy testing of AWS Lambda IAM roles that were created in Serverless Framework project using `serverless-iam-roles-per-function` plugin. Works with `jest` testing framework.

# Compatibility with AWS SDK
The current version `>= 1.0.0` of this library works with AWS SDK v3. For AWS SDK v2 compatibility use version `0.0.4`.

# How to use?
## 1. Install as a dev dependency
```
npm i -D serverless-iam-test-helper
```
## 2. Make sure there is a dedicated role per function
This library works with IAM role naming convention defined by [serverless-iam-roles-per-function](https://github.com/functionalone/serverless-iam-roles-per-function) plugin. Make sure you're using it.

## 3. Write test in `jest`

In your `jest` test suite add a `beforeAll` method where you will assume the Lambda function's IAM Role by providing `LAMBDA_LOGICAL_NAME` as parameter.
```JavaScript
import IamTestHelper from 'serverless-iam-test-helper';

describe('<LAMBDA_LOGICAL_NAME> Lambda IAM Role', () => {
  beforeAll(async () => {
    await IamTestHelper.assumeRoleByLambdaName('<LAMBDA_LOGICAL_NAME>')
  });

 // tests go here
})
```
Next, you implement the test.
```JavaScript
  it('should ALLOW <an operation that should be allowed>', async () => {
    // GIVEN
    const payload = { ... }
    const service = new Service()

    // WHEN
    const actual = await service.operation(payload)

    // THEN
    expect(actual).toBe(...)
  })
```
The `LAMBDA_LOGICAL_NAME` is the same as defined in the `serverless.yml` in `functions` section. It is crucial to pass correct Lambda name to `assumeRoleByLambdaName()` method.


You may also test that Lambda's IAM Role will block not allowed operations. Here is a sample of such test.

```JavaScript
  it('should DENY dynamodb:Query', async () => {
    // GIVEN
    const payload = { ... }
    const service = new MyEntityService()

    // WHEN
    let exception
    try {
      await service.getByQuery(payload)
    } catch (error) {
      exception = error
    }

    // THEN
    expect(exception.name).toBe('AccessDeniedException') // AWS SDK v3 convention
    expect(exception.message.includes('is not authorized to perform: dynamodb:Query')).toBeTruthy()
  })
```
In such test `exception` is expected 😉

# How does it work?
The logic behind it is pretty simple. Instead of executing *integration tests* using your *AWS profile* (IAM user), which usually has admin privileges, and is defined in `~/.aws/credentials` file. 

I temporarily *assume* Lambda's IAM Role and execute the whole test suite within that role context. Any AWS SDK operation that your code wants to execute is checked by the IAM service. Depending on  Lambda's IAM Role configuration it is *allowed* or *denied*.

Test suites run in an isolated fashion, that's why you may have multiple tests when each assumes other Lambda's role. After tests finish your own role (IAM user) is still present. **This does not override any of your local settings nor environment variables**.

You will get the **best results** when using that approach in projects that follow *hexagonal architecture*, so you can easily test in isolation parts (modules) of your application. Check out this [serverless-hexagonal-template](https://github.com/serverlesspolska/serverless-hexagonal-template) for Serverless Framework and an article describing [why and how to use it](https://dev.to/pzubkiewicz/testing-serverless-apps-has-never-been-easier-442m).

### Test compensation
The *test compensation* is an approach when test cleans up after itself. The `IamTestHelper` class provides a `static` method named `leaveLambdaRole()` and an alias `assumeUserRoleBack()`, which allows assuming your own (local IAM user) role back. 

That proves to be useful when you test a Lambda IAM Role that is allowed **only** to create elements (i.e. in DynamoDB database) but you want to perform a cleanup of sorts after the test, so there aren't any leftovers after test execution.

My pattern to achieve that is depicted by code below:
```JavaScript
import IamTestHelper from 'serverless-iam-test-helper';
// rest of imports

const cleanup = []

describe('<LAMBDA_LOGICAL_NAME> Lambda IAM Role', () => {
  
  beforeAll(async () => {
    await IamTestHelper.assumeRoleByLambdaName('<LAMBDA_LOGICAL_NAME>')
  });
 
 it('should ALLOW dynamodb:PutItem', async () => {
    // GIVEN
    const payload = { ... }
    const service = new MyEntityService()

    // WHEN
    const actual = await service.create(payload)

    // THEN
    expect(actual).toBe(...)

     // CLEANUP
    cleanup.push(actual)
  });

 afterAll(async () => {
    IamTestHelper.leaveLambdaRole()

    const userRoleAdapter = new DynamoDbAdapter()
    const deleteAll = cleanup.map((obj) => userRoleAdapter.delete({
      Key: obj.key(),
      TableName: process.env.tableName
    }))
    await Promise.all(deleteAll)
  });

})

```
This allows me to delete items that I have created during tests using my own IAM user profile with administrative privileges even when Lambda's IAM Role is not allowed to delete elements from DynamoDB table.

This helps me to keep my table in order.
# Benefits

Using this approach has following advantages:

* Better security due to tailored IAM Roles
* Tests are executed locally against **real** services in the AWS cloud
* Works in your CI/CD pipeline
* Easier & faster development
* Easier maintenance of the project: IAM Role tests protect against *regression* bugs in case of modification 

# Example
Working example is included in the [serverless-hexagonal-template](https://github.com/serverlesspolska/serverless-hexagonal-template) project. Follow instruction on its website to deploy your own project.

Sample `jest` tests that illustrate usage of that library are included in the `serverless-hexagonal-template` project.
* [createItem-MyEntityService.int.js](https://github.com/serverlesspolska/serverless-hexagonal-template/blob/main/__tests__/createItem/iam-createItem-MyEntityService.int.js)
* [processItem-MyEntityService.int.js](https://github.com/serverlesspolska/serverless-hexagonal-template/blob/main/__tests__/processItem/iam-processItem-MyEntityService.int.js).

