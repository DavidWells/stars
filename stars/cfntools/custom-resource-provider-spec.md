---
repo: cfntools/custom-resource-provider-spec
url: 'https://github.com/cfntools/custom-resource-provider-spec'
homepage: null
starredAt: '2019-07-10T00:34:40Z'
createdAt: '2019-06-29T22:47:46Z'
updatedAt: '2020-05-12T13:30:29Z'
language: null
license: CC0-1.0
branch: develop
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:30.052Z'
description: null
tags: []
---

# Custom Resource Providers Specification
This is a draft version of this document, readers should expect changes. Feedback is very welcome!

## Abstract
To fill gap in CloudFormation Coverage, or to extend CloudFormation to support non-AWS resources, people have been using Custom Resources. A lot of the code implementing these resources has been released as Open Source software, however every organization seems to use their own way of writing, building and deploying their code. This document tries to describe a common interface to make it easier to re-use existing code.

## 1. Definitions
### 1.1 Custom Resource
A Custom resource is a [CloudFormation Resource][1], of the type [`AWS::CloudFormation::CustomResource`][2]. This resource type can also be written as [`Custom::MyCustomResourceTypeName`][3], with `MyCustomResource` matching the regular expression [`[a-zA-Z0-9_@-]{1,52}`][3].

### 1.2 Custom Resource Provider
A Custom Resource Provider is piece of software that handles and responds to requests from CloudFormation. It is responsible for the creation, updates and deletion of the actual resource that are defined by the Custom Resource.

### 1.3 Custom Resource Type
All Custom Resources using the same Custom Resource Provider, can be said to have the same Custom Resource Type.

### 1.4 Consumer
A consumer in the context of this document is the organization or person that wants to use the Custom Resource Provider to create its own Custom Resources of this type.

## 2. Rationale
The intent behind this speficiations is to have a way to follow the following principles

### 2.1 Reusability
Custom Resource Providers should not be tied to a particalur environment. If a provider has external dependencies they should be explicit defined when the provider is set up by the consumer. They should also make it possible for the consumer to adapt it to the requirements of their environment. This can be the need for more or less logging, integration with a KMS via a Consumer Managed CMK or different deployment strategies.

### 2.2 Least Privilige
Custom Resource Providers are typically deployed into the AWS environments of the consumers. They should take a least privilege approach to any permissions they need. Consumers, having insights in their own environments, should be able to scope down permissions even further.

### 2.3 Native-like behaviour
Custom Resources will be used together with "native" CloudFormation resources. Providers should mimic the Create/Update/Delete behaviour of CloudFormation by default.

## 3. Distribution
Each Custom Resource provider:

- MUST be distributed as a CloudFormation template
- MUST include a README.md explaining the usage of the provider
- MAY be published to the AWS Serverless Application Repository
- MAY be published to an S3 Bucket

## 4. CloudFormation Template
### 4.1 General Guidelines
The CloudFormation template:

- MUST follow the guidlines for Parameters and Outputs in this section
- SHOULD create LogGroups if Resources are used that will log to CloudWatch Logs.
- SHOULD only use resources supported by the AWS Serverless Application Repository
- SHOULD use CloudFomation Parameters to define external inputs and dependencies.
- SHOULD NOT use any Custom Resources
- SHOULD NOT hard code any values that will make it impossible to deploy the same template multiple times (either in the same region or multiple regions).

### 4.1 Parameters
The following parameters and their behavior MUST be implemented by the template.

- `LogLevel` with AllowedValues `CRITICAL`, `ERROR`, `WARNING`, `INFO`, `DEBUG`. The Provider SHOULD use this to configure the logs generated. The Default SHOULD be `WARNING`. If no logs are generated the Description SHOULD mention this.
- `LogRetentionInDays`. The Default SHOULD be `''` and when set to `''` the template MUST NOT configure a retention period. If no logs are generated the Description SHOULD mention this.
- `PermissionsBoundary` with AllowedPattern `(^$|^arn:aws:iam::\d{12}:policy/.*$)`. The Provider MUST use this boundary on every Role it creates. The Default SHOULD be `''` and the template MUST NOT fail to deploy with this default.
- `RoleName` with AllowedPattern `[a-zA-Z0-9+=,.@_-]*`. The provider MUST use this RoleName instead of creating it's own if one is specified. The Default SHOULD be `''`. The Provider SHOULD assume that this Role exists in the SAME account as the CLoudFormation Stack that is created from the template.
- `RolePath`, with AllowedPattern `(^/$|^/[\u0021-\u007F]+/$)` and Default `/`. This value MUST be used when creating a Role and when using a `RoleName`.
- If both `Role` and `PermissionsBoundary` are specified deploying the template SHOULD fail. `Role` MUST take precedence if no such behaviour is implemented.

The following Parameters are OPTIONAL:

- `DeleteAction` with AllowedValues `Delete`, `Retain`, `Snapshot`, and `Fail`. The provider MAY chose to only include some of these AllowedValues. `Delete` SHOULD be included and SHOULD be the Default. When included the provider MUST behave as if the DeletionPolicy was set to this value. If the `DeleteAction` is set to `Fail`, the `Retain` action MUST be taken and the provider MUST signal a Failure to CloudFormation. It is RECOMMENDED to not include the `Retain` value, and instead use a [DeletionPolicy][5], [UpdateReplacePolicy][6], [Stack Policy][7] and/or limited IAM permissions.
- `UpdateReplaceAction` with AllowedValues `Delete`, `Snapshot` and `Fail`. `Delete` SHOULD be included and SHOULD be the Default. The template SHOULD NOT include `Retain` as an allowed value. It is RECOMMENDED to not include the `Snapshot` value, and instead only snapshot with the `DeleteAction`, to prevent two snapshots being generated. When an update requires the creation of a new resource and the deletion of the existing one, the following behaviour MUST be implemented:
  - `Delete`: A new PhysicalResourceId is returned to CloudFormation. CloudFormation will call the Delete action in the UPDATE_COMPLETE_CLEANUP_IN_PROGRESS phase.
  - `Snapshot`: A snapshot is created and the `Delete` behavior is followed after it succeeds. The Update MUST fail if the creation of the snapshot fails.
  - `Fail`: No new resource should be created and a failure should be send to CloudFormation.

The template MAY include any other Parametere that is needed for the Provider.
If there are external dependencies, they SHOULD be passed to the template as Parameters.

### 4.2 Outputs
An Output SHOULD NOT include an `Export`
The following Outputs MUST be included:

- `ServiceToken`. The value MUST be usable as the ServiceToken of the Custom Resource. If an update to the provider would change this token, the update MUST be considered a breaking change.
- `RoleArn` The ARN of the IAM Role used by the Custom Resource Provider. If no Role is used, the value MUST be left empty and this SHOULD be explained in the Description.

## 4.3 Example
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Example Customm Resource Provider
Parameters:
  LogLevel:
    Type: String
    Default: WARNING
    AllowedValues: [CRITICAL, ERROR, WARNING, INFO, DEBUG]
  LogRetentionInDays:
    Type: String
    Default: ''
    AllowedValues: ['', 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653]
  PermissionsBoundary:
    Type: String
    Default: ''
    AllowedPattern: '(^$|^arn:aws:iam::\d{12}:policy/.*$)'
  RoleName:
    Type: String
    Default: ''
    AllowedPattern: '[a-zA-Z0-9+=,.@_-]*'
  RolePath:
    Type: String
    Default: '/'
    AllowedPattern: '(^/$|^/[\u0021-\u007F]+/$)'
  DeleteAction:
    Type: String
    Default: Delete
    AllowedValues: [Delete, Retain, Snapshot, Fail]
  UpdateReplaceAction:
    Type: String
    Default: Delete
    AllowedValues: [Delete, Snapshot, Fail]

Conditions:
  LogRetentionInDaysSet: !Not [!Equals [!Ref LogRetentionInDays, '']]
  PermissionsBoundarySet: !Not [!Equals [!Ref PermissionsBoundary, '']]
  CreateRole: !Equals [!Ref RoleName, '']
  
Rules:
  NoPermissionsBoundaryWhenRoleIsSet:
    RuleCondition: !Not [!Equals [!Ref RoleName, '']]
    Assertions:
      - Assert: !Equals [!Ref PermissionsBoundary, '']
        AssertDescription: PermissionsBoundary must be empty if RoleName is used

Resources:
  CustomResourceRole:
    Condition: CreateRole
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Principal:
            Service: lambda.amazonaws.com
          Action: sts:AssumeRole
      Path: !Ref RolePath
      PermissionsBoundary: !If [PermissionsBoundarySet, !Ref PermissionsBoundary, !Ref AWS::NoValue]
  CustomResourceFunction:
    Type: AWS::Lambda::Function
    Properties:
      Code: custom_resource/
      Handler: app.lambda_handler
      MemorySize: 256
      Role: !If [CreateRole, !GetAtt CustomResourceRole.Arn, !Sub "arn:aws:iam::${AWS::AccountId}:role${RolePath}${RoleName}"]
      Runtime: python3.7
      Timeout: 300
      Description: !Sub "${AWS::StackName} CustomResource lambda"
      Environment:
        Variables:
          LOG_LEVEL: !Ref LogLevel
          DELETE_ACTION: !Ref DeleteAction
          UPDATE_REPLACE_ACTION: !Ref UpdateReplaceAction
  CustomResourceLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Sub "/aws/lambda/${CustomResourceFunction}"
      RetentionInDays: !If [LogRetentionInDaysSet, !Ref LogRetentionInDays, !Ref AWS::NoValue]
  CustomResourceLogPermissions:
    Type: AWS::IAM::Policy
    Properties:
      Roles:
      - !If [CreateRole, !Ref CustomResourceRole, !Ref RoleName]
      PolicyName: !Sub "${AWS::Region}-CustomResourceLogGroup"
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Action:
          - logs:CreateLogStream
          - logs:PutLogEvents
          Resource:
          - !Sub "arn:aws:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/${CustomResourceFunction}"
          - !Sub "arn:aws:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/${CustomResourceFunction}:*"
          - !Sub "arn:aws:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/${CustomResourceFunction}:*:*"

Outputs:
  ServiceToken:
    Value: !GetAtt CustomResourceFunction.Arn
  RoleArn:
    Value: !If [CreateRole, !GetAtt CustomResourceRole.Arn, !Sub "arn:aws:iam::${AWS::AccountId}:role${RolePath}${RoleName}"]
```

## 5. Readme file
The Readme File SHOULD mirror the AWS documentation and contain the following sections:

- An introductions, that explains what the Custom Resource does.
- A "Syntax" section
- A "Properties" section
- A "Return Values" section
- An "Examples" section.

### 5.1 Syntax
This section SHOULD contain the syntax in yaml, json or both. It SHOULD show the Type, the Properties and the type of every property.

#### 5.1.1. Example

> ```yaml
> Type: Custom::MyCustomResourceName
> Properties:
>   ServiceToken: String
>   SomeProperty: Integer
> ```

### 5.2 Properties
This section SHOULD list for each property:

- Name
- Description
- Required (yes/no)
- Type
- Update requires (Replacement/Some interuption/No interuption)

It MAY include

- Minimum
- Maximum
- Pattern
- Allowed Values
- Any other relevant information

#### 5.2.1 Example

> - `ServiceToken`: see the [AWS Documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cfn-customresource.html#cfn-customresource-servicetoken)
>   - Required: Yes
>   - Type: String
>   - Update requires: Updates are not supported
> - `SomeProperty`: A property of the Custom Resource
>   - Required: No
>   - Type: Integer
>   - Update Requires: No interuption

### 5.3 Return Values
This section SHOULD explain the Return Values of both the Ref and the GetAtt functions.

#### 5.3.1 Example

> ### Ref
> `Ref` returns the Physical Resource Id
> ### Fn::GetAtt
>
> - `Arn`: The ARN of the resource.

### 5.4 Examples
This section should contain at least one example

#### 5.4.1 Example
> ### Create a resource
> This creates a resource with some property set to 42.
> 
> ```yaml
> MyCustomResource:
>   Type: Custom::MyCustomResourceName
>   Properties:
>     ServiceToken: arn:aws:lambda:eu-west-1:123456789012:function:CustomResourceProvider
>     SomeProperty: 42
> ```

## 6. Usefull links
Writing your own Provider:

- [A SAM cookiecutter template for python projects](https://github.com/cfntools/cookiecutter-custom-resource-provider-python)
- [Best Practices for writing an Lambda-backed Custom Resource](https://aws.amazon.com/premiumsupport/knowledge-center/best-practices-custom-cf-lambda/)
- [Python helper library for Custom Resources](https://github.com/aws-cloudformation/custom-resource-helper)
- [Another python helper library for Custom Resources)](https://github.com/iRobotCorporation/cfn-custom-resource)

## 7. To do

- Currently this document does not say anything about the value of the Custom Resource type.
- There should be an example of how to actually use these templates as a consumer.

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cfn-customresource.html
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cfn-customresource.html#aws-resource-cfn-customresource--remarks
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-loggroup.html#cfn-cwl-loggroup-retentionindays
[5]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html
[6]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html
