---
repo: jeshan/typeformation
url: 'https://github.com/jeshan/typeformation'
homepage: 'https://plugins.jetbrains.com/plugin/10653-typeformation'
starredAt: '2019-07-08T19:45:21Z'
createdAt: '2018-04-22T18:02:27Z'
updatedAt: '2020-03-24T08:33:48Z'
language: Java
license: BSD-2-Clause
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:30.452Z'
description: Type Cloudformation templates with pleasure!
tags:
  - cloudformation
  - intellij
  - jetbrains-ides
  - live-templates
---


# Why bother?
Writing Cloudformation templates is fun but **remembering its syntax is not**. This is for the lazy DevOps engineers; the kind of geek who wants to get things done, the kind who hates checking the docs all day for how this thing is supposed to work; the kind who wants to avoid wasting time deploying their CFN templates, wait 10 minutes only to find out that they missed a required input.

Finally, you can type Cloudformation templates with pleasure with Intellij live templates. It should work with any Jetbrains IDE for now (IntelliJ IDEA, PhpStorm, WebStorm, PyCharm, RubyMine, AppCode, CLion, GoLand, DataGrip, Rider, MPS, Android Studio)

# Install
Find it in the plugins page in your IDE or here:

https://plugins.jetbrains.com/plugin/10653-typeformation

# Demos
## General demo
<a href="https://www.youtube.com/watch?v=WALwWUauGaI">![Foo](https://img.youtube.com/vi/WALwWUauGaI/0.jpg)]</a>

## Serverless demo
<a href="https://www.youtube.com/watch?v=kSaiOteeMOc">![Foo](https://img.youtube.com/vi/kSaiOteeMOc/0.jpg)]</a>

# Screenshots
![](https://plugins.jetbrains.com/files/10653/screenshot_18020.png)

![](https://plugins.jetbrains.com/files/10653/screenshot_18023.png)

![](https://plugins.jetbrains.com/files/10653/screenshot_18019.png)

# Services covered
These services are covered with various extents. Expect active development on them:

- Api Gateway (through Serverless Application Model)
- Certificate Manager
- Cloud9
- Cloudformation (nested stacks)
- Cloudwatch (Logs, Events, Alarms, Dashboards, Metric filters)
- CodeBuild
- CodeCommit
- Database Migration Service
- DynamoDB
- Elastic Beanstalk
- EC2 (EBS, Elastic File System, Elastic IPs, Mappings of popular AMIs like Amazon Linux, CentOS and Ubuntu, ...)
- Elastic Container Service (registry, service, task definition)
- IAM (groups, roles, permissions, users)
- S3
- **Serverless Application Model** (Lambda and its integrations)
- SNS (Topic, Subscription and Policy)
- SQS (Queue and Policy)

# Other features
- Covers boilerplate Cloudformation declarations (Header, Mappings, Parameters, Transform)
- Selective set of 3rd-party templates like Cloudonaut VPC (http://templates.cloudonaut.io/en/stable/vpc/). See next section:

# Nested stack references
- Bastion host from Stelligent (https://github.com/stelligent/cloudformation_templates/blob/master/infrastructure/bastion.yml)
- Cloudonaut VPC (http://templates.cloudonaut.io/en/stable/vpc/)

# TODO
- add as many AWS services as possible!
- make it more conducive to certain workflows (e.g serverless or DevOps needs)
- support for other editors like Sublime, Atom and VS Code maybe? (help wanted)

# Qs
- Why doesn't live template X doesn't work?
  - It may have missed my attention. Please create an issue stating shortcut, expected result and actual result.
- Why is service X missing?
  - Because this project is still in its infancy. Pull requests, sample code and use cases welcome
- Will you support other IDEs?
  - The only editor I use is Intellij. I'll be glad to find contributors to help me understand how live templates for other editors work. Intellij live templates will remain the "source of truth"
Submit your feature request to support your favourite editor with this snippet:

```
Title: Support editor $EDITOR
Official docs on how to create snippets: $DOCS_URL
How to package plugins: $PLUGIN_URL
Example open source project that provides snippets: $PROJECT

To demonstrate interest in this and prioritise, click the thumbs up.
```

# Credits
- Stelligent team (https://github.com/stelligent/cloudformation_templates)
- Cloudonaut (https://cloudonaut.io/)
- AWS docs of course (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html)
- List of AWS Principal events from Jared Short (https://gist.github.com/shortjared/4c1e3fe52bdfa47522cfe5b41e5d6f22)


# Acknowledgements
The existing Cloudformation plugin by Leonid Shalupov for the inspiration!
https://plugins.jetbrains.com/plugin/7371-aws-cloudformation

Paul Duval of Stelligent and Michael and Andreas Wittig of Widdix for helping me internalise the "Everything as Code" mindset.
