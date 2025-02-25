---
repo: ClimbAssist/ClimbAssistService
url: 'https://github.com/ClimbAssist/ClimbAssistService'
homepage: null
starredAt: '2020-09-12T20:59:20Z'
createdAt: '2020-03-26T01:26:25Z'
updatedAt: '2021-03-28T21:01:53Z'
language: Java
license: AGPL-3.0
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:33.862Z'
description: Back-end service supporting climbassist.com
tags: []
---

ClimbAssistService
============

Welcome to ClimbAssistService!

See it live at [climbassist.com](https://climbassist.com)!

This repository contains the code for running the back-end Climb Assist service. Climb Assist runs on AWS and the
majority of our resources are provisioned using CloudFormation. This service is responsible for many things, including 
the following:
* Creating the infrastructure (Elastic Beanstalk environment, DynamoDB tables, S3 buckets, Cognito user pools, etc.) on
which Climb Assist runs
* Serving front-end resources (HTML, JS, CSS)
* Resource (Country, Region, Crag, Wall, Route, etc.) CRUD
* User CRUD
* User sign-in, sign-out, and other management actions
* Sending contact emails

If you have any questions or concerns, reach out to the development team at 
[dev@climbassist.com](mailto:dev@climbassist.com).

To clone this repository, run the following command:

    $ git clone https://github.com/ClimbAssist/ClimbAssistService.git --recurse-submodules
    
If you already cloned the repository without the `--recurse-submodules` option, run the following command to manually
initialize the submodule:

    $ git submodule update --init --recursive
    
Afterwards, you will have the ClimbAssistService repository cloned with a submodule of the ClimbAssistUI repository. The
ClimbAssistUI repository is necessary in order to effectively run ClimbAssistService as it serves the front-end
web pages that are stored in ClimbAssistUI.

In order to run the service, you will need access to the Climb Assist AWS account. Most likely, you will have to reach
out to the development team and have them run your changes and confirm that they work.

However, if you do have access to the AWS account and you would like to try running the service locally, the
instructions are as follows:

Documentation
-------------

All the APIs in ClimbAssistService are documented in [docs/api_documentation.md](docs/api_documentation.md). This
documentation should be kept up-to-date as APIs are added and modified.

Deploying a Development Stack
-----------------------------

To test changes to the template or against non-production environments, you can create a development stack. This is
required in order to run ClimbAssistService locally.

1. Install the SAM CLI following [these
instructions](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
Note: You don't need to install Docker, even though it says you do.

1. Install maven. See https://maven.apache.org/install.html for details.

1. Install tomcat. See https://tomcat.apache.org/tomcat-8.0-doc/setup.html for
   details.
   
1. Build ClimbAssistUI. See that repository's README for details.

1. Create a development stack.

        $ ./dev-stack --name <name> [--skip-compute-resources]
         
    `<name>` is whatever you want used to name the stack, deployment S3 bucket, and resources. If I pass in "dustin", 
    the stack will be named "dustin-dev" and named resources will have "-dustin" added to the ends of their names to
    avoid naming conflicts. The "--skip-compute-resources" option is used to avoid creating the compute resources such
    as the Elastic Beanstalk environment, execution roles, subnets, VPCs, domain registration, etc. This is handy if you
    only want to create the data plane (DynamoDB tables, S3 buckets, Cognito user pool, etc.), such as if you're running
    the service locally but still need to interact with resources.

1. **IMPORTANT**: Be sure to either delete the development stack or update it without the compute resources when you
are done testing so we are not charged for using those resources.

To delete the stack:

        $ aws cloudformation delete-stack --stack-name <name>-dev
        
To remove the compute resources from the stack:
                
        $ ./dev-stack --name <name> --skip-compute-resources

Running from Intellij
---------------------

1. Create a development stack. See above.

1. Install maven. See https://maven.apache.org/install.html for details.

1. Install tomcat. See https://tomcat.apache.org/tomcat-8.0-doc/setup.html for
   details.
   
1. In Intellij, choose `File` > `New` > `Project from Existing Sources...` and 
select the directory where you cloned the repository.

1. Build ClimbAssistUI. See that repository's README for details.

1. Choose `Run` > `Edit Configurations...` > `+` > `Tomcat Server` > `Local`.

1. In the Deployment tab, make sure ClimbAssist:war exploded is selected as 
the artifact to deploy.

1. In the Configuration tab, replace the VM options with the following

    `-DresourceNameSuffix=-<name> -DaccountId=172776452117 -Dregion=us-west-2 -DuserPoolClientId=<user pool client ID
     from your development stack> -DuserPoolId=<user pool ID from your development stack> 
     -DclimbAssistEmail=-<name>@climbassist.com -DuserDataRetentionTimeMinutes=1 
     -DrecaptchaBackDoorResponseSecretId=RecaptchaBackDoorResponse-<name>`
     
     Alternatively, if you don't have an @climbassist.com email address, you can use dev@climbassist.com for the email.

1. Choose OK to save the configuration, then choose the green arrow at the 
top of the window to run the application. In a few seconds, Intellij will 
open your browser to view the application.

Running from the Command Line
-----------------------------

1. Create a development stack. See above.

1. Install maven. See https://maven.apache.org/install.html for details.

1. Install tomcat. See https://tomcat.apache.org/tomcat-8.0-doc/setup.html for
   details.
   
1. Build ClimbAssistUI. See that repository's README for details.

1. Build the application.

        $ mvn -f pom.xml compile package

1. Copy the built application to the Tomcat webapp directory.  The actual
   location of that directory will vary depending on your platform and
   installation.

        $ cp target/ROOT.war <tomcat webapp directory>
        
1. Open your Tomcat Properties application, navigate to the Java tab, and add the following to the Java Options:

    `-DresourceNameSuffix=-<name> -DaccountId=172776452117 -Dregion=us-west-2 -DuserPoolClientId=<user pool client ID
     from your development stack> -DuserPoolId=<user pool ID from your development stack>
     -DclimbAssistEmail=-<name>@climbassist.com -DuserDataRetentionTimeMinutes=1 
     -DrecaptchaBackDoorResponseSecretId=RecaptchaBackDoorResponse-<name>`
     
     Alternatively, if you don't have an @climbassist.com email address, you can use dev@climbassist.com for the email.

1. Restart your tomcat server.

1. Open http://127.0.0.1:8080/ in a web browser to view your application.

Integration Tests
-------------------------

The integration tests in the package are located under `src/integration-test`.

1. Create a development stack. See above.

2. Run the integration tests 

        $ mvn verify -Dregion=us-west-2 -DuserPoolId=<user pool ID from your development stack> 
        -DapplicationEndpoint=<Elastic Beanstalk application endpoint from your development stack>
        -DrecaptchaBackDoorResponseSecretId=RecaptchaBackDoorResponse-<name>`
