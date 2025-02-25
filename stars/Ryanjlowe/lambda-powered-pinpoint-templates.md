---
repo: Ryanjlowe/lambda-powered-pinpoint-templates
url: 'https://github.com/Ryanjlowe/lambda-powered-pinpoint-templates'
homepage: null
starredAt: '2020-11-21T07:41:27Z'
createdAt: '2020-02-06T20:15:40Z'
updatedAt: '2024-07-15T03:57:30Z'
language: HTML
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:22.255Z'
description: >-
  Use the Amazon Pinpoint Lambda Hook capabilities to extend and power email
  templates
tags: []
---

# Lambda Powered Amazon Pinpoint Templates
Amazon Pinpoint allows you to manage Email, SMS, Push, and Voice templates via the AWS Console and APIs.  Pinpoint is also extremely extensible and does not require you to use these templates.  This is a POC built to showcase how you can retrieve and render templates outside of Pinpoint for use in Pinpoint campaigns using Lambda functions.  

This example uses MustacheJS with custom Helpers to render email templates stored in S3 using Pinpoint Endpoint Attributes AND data returned from invoking other Lambda functions.  In this way, data can be rendered in templates that exist in other RDS, DynamoDB, on-premises systems, Salesforce CRM, or wherever!


## Example Email Template
```

{{content-block "common/header.html"}}

<p>Here is my Ice Cream promotion email.  I am so happy you are here {{properCase Attributes.FirstName}}</p>

<p>Your price is {{currencyFormat Attributes.Price Attributes.Locale Attributes.Currency}}

<p>Your Deal expires {{dateFormat Attributes.ExpireDate "dddd, mmmm d, yyyy"}}

<p>
  {{#invokeLambda "example-invoked-lambda"}}
  <table>
    <tr>
      <td>Product Image from Lambda:</td>
      <td><img src="{{{image}}}" width="100" /></td>
    </tr>
    <tr>
      <td>Product Name</td>
      <td><a href="{{{link}}}">{{{name}}}</a></td>
    </tr>
    <tr>
      <td>Price:</td>
      <td>{{{price}}}</td>
    </tr>
  </table>
  {{/invokeLambda}}
</p>

<p>
  {{#translate-text "en" Attributes.PreferredLanguage.[0]}}
  This is English that will be translated into the preferred language of the current user by Amazon Translate.
  {{/translate-text}}
</p>


{{content-block "common/footer.html"}}

```

Note that the content-block "common/header.html" is also parsed for MustacheJS expressions and even more content-blocks.  Each content-block is therefore recursively processed:

```
...
<td style="border:0px;">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
      <td align="left" valign="top">
        <table width="100%" cellpadding="10" cellspacing="0" border="0">
          <tr>

           {{#ifEquals Attributes.brand "mainbrand"}}
             {{content-block "common/mainbrand/brand_header.html"}}
           {{/ifEquals}}
           {{#ifEquals Attributes.brand "subbrand"}}
             {{content-block "common/subbrand/brand_header.html"}}
           {{/ifEquals}}

          </tr>
          <tr>
            <td width="100%" bgcolor="FFFFFF">
              <table cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;">
                <tr>
                  <td>
...
```

## MustacheJS Registered Helpers
| Helper | Description |
| ---- | ---- |
| content-block | fetches a templatized content block by S3 key and recursively processes it |
| ifEquals | compares two values together |
| currencyFormat | formats a string of numbers for currency display |
| dateFormat | formats a string into a date string |
| invokeLambda | block invokes another lambda and makes the return object available inside the block |
| translate-text | translates the given text using Amazon Translate |
| upperCase | RETURNS AN UPPERCASED VERSION OF THE STRING |
| lowerCase | returns a lowercased version of the string |
| properCase | Returns A String Where Every Word Starts With A Capital Letter |
| urlencode | Encodes a string to be placed in a URL |

## Repository content
Main files:
```
.
├── README.MD                                           <-- This instructions file
├── templates                                           <-- Folder for email templates, sync to S3
├── lambda                                              <-- Folder for the AWS Lambdas
│   └── campaign-hook
│       └── index.js                                    <-- Function called by Pinpoint, Campaign Filter Lambda Hook
│   └── template-engine
│       └── index.js                                    <-- Function to recursively render templates from S3
│   └── example-invoked-lambda
│       └── index.js                                    <-- Example function that returns values used in blocks
```

## Example Segment
Save the following as a CSV file to test the example templates located in this repository.  It has the necessary attributes to render the ice_cream email.
```
ChannelType,Id,Address,User.UserId,Attributes.FirstName,Attributes.brand,Attributes.Price,Attributes.Locale,Attributes.Currency,Attributes.ExpireDate
EMAIL,1,EMAIL_ADDRESS1_HERE,1,Ryan,mainbrand,125.32,en-US,USD,2020-03-10T10:00:00
EMAIL,2,EMAIL_ADDRESS2_HERE,2,JOHN,subbrand,321.45,zh-CN,JPY,2020-05-10T10:00:00
```

## Set up
1. Deploy the Templates in an S3 bucket
`aws s3 templates/ s3://[BUCKET NAME]`
2. Deploy Lambdas
  * Run `npm run build` in each Lambda folder to build a deployable Zip file
  * Ensure Lambda functions have IAM permissions to call Pinpoint, invoke other Lambda functions, and access files in S3
  * Ensure Lambda functions have environment variables defined

    | Lambda Function | Environment Variable Name | Value |
    | --------------- | --------------- | --------------- |
    | campaign-hook | TEMPLATE_ENGINE_LAMBDA | [ARN of the Template Lambda Function]
    | template-engine | TEMPLATE_BUCKET | [Template S3 Bucket Name] |

3. Create a Pinpoint Project
4. Connect the campaign hook Lambda to a Pinpoint Project
[Full Lambda Hook Documentation for](https://docs.aws.amazon.com/pinpoint/latest/developerguide/segments-dynamic.html)
```
aws lambda add-permission \
 --function-name [CAMPAIGN_HOOK LAMBDA ARN] \
 --statement-id lambdaHookStatement1 \
 --action lambda:InvokeFunction \
 --principal pinpoint.[REGION].amazonaws.com \
 --source-arn arn:aws:mobiletargeting:[REGION]:[AWS_ACCOUNT_ID]:/apps/[PINPOINT_PROJECT_ID]/*

 aws lambda add-permission \
 --function-name [CAMPAIGN_HOOK LAMBDA ARN] \
 --statement-id lambdaHookStatement12 \
 --action lambda:InvokeFunction \
 --principal pinpoint.[REGION].amazonaws.com \
 --source-arn arn:aws:mobiletargeting:[REGION]:[AWS_ACCOUNT_ID]:/apps/[PINPOINT_PROJECT_ID]

 aws pinpoint update-application-settings \
 --application-id [PINPOINT_PROJECT_ID] \
 --write-application-settings-request 'CampaignHook={LambdaFunctionName="[CAMPAIGN_HOOK LAMBDA ARN]",Mode="FILTER"}'
```

5. Create a Pinpoint Template with the following Message Body

```
<!DOCTYPE html>
{{! BaseTemplate=emails/ice_cream.html TargetAttribute=html_ice }}
<html>{{Attributes.html_ice}}</html>
```

6. Import segment from above

7. Create a campaign using the segment and the created Pinpoint Template and schedule for immediate send
