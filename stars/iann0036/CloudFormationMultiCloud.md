---
repo: iann0036/CloudFormationMultiCloud
url: 'https://github.com/iann0036/CloudFormationMultiCloud'
homepage: null
starredAt: '2018-12-16T06:12:44Z'
createdAt: '2018-12-05T11:46:53Z'
updatedAt: '2024-10-03T17:52:09Z'
language: Python
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:53.615Z'
description: Add support for Azure and Google Cloud resources in CloudFormation.
tags:
  - aws
  - azure
  - cloudformation
  - cloudformation-custom-resource
  - google-cloud-platform
---

# CloudFormation Multi-Cloud

> An experiment to add Azure and Google Cloud resource support to CloudFormation.

![Screenshot](assets/screen1.png)

:exclamation: **CAUTION:** This project is currently in alpha stages. Some components may not work as expected and fields may not be validated. Currently, all fields within the example stacks are required.


## Installation

<a href="https://console.aws.amazon.com/cloudformation/home?#/stacks/new?&templateURL=https://s3.amazonaws.com/ianmckay-ap-southeast-2/multicloud/custom_resource.yaml" target="_blank"><img src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"></a>

Click the above link to deploy the stack which is required to deploy the Transform and Custom Resource handler. You will be asked to input your Azure app credentials and Google JSON server credentials.

If you prefer, you can also manually upsert the [custom_resource.yaml](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/custom_resource.yaml) stack from source and compile your own copy of the Lambda source. Please note that if you do this, the Python requirements must be vendored from within an Amazon Linux machine.


## Usage

Once the handler stack is created, you may use the below resources by adding the `MultiCloud` transform to your stack. This will transform your input template to convert the Azure/Google Cloud resources into Custom Resources that will handle the lifecycle within that cloud provider.

The following resources are supported (click the link to see examples):

Functionality | AWS Resource | Azure Resource | Google Cloud Resource
------------- | ------------ | -------------- | ---------------------
Logical Group | - | [Azure::Resource::ResourceGroup](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_bucket.yaml#L10-L14) | -
Virtual Network | AWS::EC2::VPC | [Azure::Network::VirtualNetwork](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_example.yaml#L16-L24) | [GoogleCloud::Compute::Network](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/googlecloud_example.yaml#L10-L19)
Subnet | AWS::EC2::Subnet | [Azure::Network::Subnet](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_example.yaml#L26-L32) | [GoogleCloud::Compute::Subnetwork](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/googlecloud_example.yaml#L21-L31)
Network Interface | AWS::EC2::NetworkInterface | [Azure::Network::NetworkInterface](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_example.yaml#L34-L43) | -
Virtual Machine | AWS::EC2::Instance | [Azure::Compute::VirtualMachine](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_example.yaml#L45-L65) | [GoogleCloud::Compute::Instance](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/googlecloud_example.yaml#L33-L59)
Queue | AWS::SQS:Queue | [Azure::Storage::Queue](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_queue.yaml#L26-L31) | [GoogleCloud::PubSub::Topic](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/googlecloud_queue.yaml#L10-L14)
Object Bucket | AWS::S3::Bucket | [Azure::Storage::StorageAccount](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/azure_bucket.yaml#L16-L24) | [GoogleCloud::Storage::Bucket](https://github.com/iann0036/CloudFormationMultiCloud/blob/master/examples/googlecloud_bucket.yaml#L10-L18)
