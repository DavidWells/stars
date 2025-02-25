---
repo: camptocamp/devops-stack-module-oidc-aws-cognito
url: 'https://github.com/camptocamp/devops-stack-module-oidc-aws-cognito'
homepage: 'https://devops-stack.io/'
starredAt: '2022-01-19T17:52:11Z'
createdAt: '2022-01-18T18:21:57Z'
updatedAt: '2024-08-14T12:27:05Z'
language: HCL
license: Apache-2.0
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:20.554Z'
description: A DevOps Stack module to deploy and configure AWS Cognito as an OIDC provider
tags: []
---

= devops-stack-module-oidc-aws-cognito

A https://devops-stack.io[DevOps Stack] module to deploy and configure https://aws.amazon.com/cognito/[AWS Cognito] as an OIDC provider. 

You can simply use this module to create an OIDC client to use throughout the DevOps Stack applications or you can use it to entirely the needed resources for that OIDC client as well as a group and users with administrative access.

== Usage

This module can be declared by adding the following block on your Terraform configuration:

[source,terraform]
----
module "oidc" {
  source = "git::https://github.com/camptocamp/devops-stack-module-oidc-aws-cognito.git?ref=<RELEASE>"

  cluster_name = module.eks.cluster_name
  base_domain  = module.eks.base_domain

  cognito_user_pool_id     = resource.aws_oidc_pool.pool.id
  cognito_user_pool_domain = resource.aws_cognito_user_pool_domain.pool_domain.domain
}
----

The above declaration assumes that you have created a Cognito pool and domain yourself, which you can do manually or you can create the following resources in your Terraform code:

[source,terraform]
----
resource "aws_cognito_user_pool" "pool" {
  name = module.eks.cluster_name
}

resource "aws_cognito_user_pool_domain" "pool_domain" {
  domain       = module.eks.cluster_name
  user_pool_id = aws_cognito_user_pool.pool.id
}
----

If you want this module to take charge of creating the Cognito pool and domain automatically, you simply need to activate the variable `create_pool`:

[source,terraform]
----
module "oidc" {
  source = "git::https://github.com/camptocamp/devops-stack-module-oidc-aws-cognito.git?ref=<RELEASE>"

  cluster_name = module.eks.cluster_name
  base_domain  = module.eks.base_domain

  create_pool = true
}
----

You can go even further and provide a map of users to the module and it will take care of creating an administrator group called `devops-stack-admin` with the users you specified. AWS Cognito will take the user's e-mail addresses to send a temporary password in clear text, so these addresses need to be valid. *For now, we devised this user creation in the code mainly as a way to bootstrap ephemeral clusters used for testing.* To do this, you need to populate the `user_map` variable with an object for each user:

[source,terraform]
----
module "oidc" {
  source = "git::https://github.com/camptocamp/devops-stack-module-oidc-aws-cognito.git?ref=<RELEASE>"

  cluster_name = module.eks.cluster_name
  base_domain  = module.eks.base_domain

  create_pool = true

  user_map = {
    johndoe = {
      username   = "johndoe"
      first_name = "John"
      last_name  = "Doe"
      email      = "john.doe@example.com"
    }
    janedoe = {
      username   = "janedoe"
      first_name = "Jane"
      last_name  = "Doe"
      email      = "jane.doe@example.com"
    }
  }
}
----

NOTE: Only the `username` and `e-mail` fields on each user are required. Besides, since the e-mail is a scope required by most of our apps, the e-mail is automatically set as verified when the users are created.

IMPORTANT: All users will belong to the administrators group and will have high privileges in applications such as Argo CD.

The module contains an output called `devops_stack_admins` where you can get a map containing every username and their respective e-mail.

=== OIDC Configuration

By default, the OIDC client is configured to allow returning to the canonical URLs of the default DevOps Stack applications. You can however use the variable `callback_urls` if you want to add any other callback URLs for the OIDC client:

[source,terraform]
----
module "oidc" {
  source = "git::https://github.com/camptocamp/devops-stack-module-oidc-aws-cognito.git?ref=<RELEASE>"

  cluster_name = module.eks.cluster_name
  base_domain  = module.eks.base_domain

  cognito_user_pool_id     = resource.aws_oidc_pool.pool.id
  cognito_user_pool_domain = resource.aws_cognito_user_pool_domain.pool_domain.domain

  callback_urls = [
    "https://callback1.url/oauth/callback",
    "https://callback2.url/login/generic_oauth",
  ]
}
----

The module provides and output called `oidc` containing the OIDC configuration that is to be passed on to other modules. This output is an object that outputs the content of `local.oidc`:

[source, terraform]
----
locals {
  oidc = {
    issuer_url              = format("https://cognito-idp.%s.amazonaws.com/%s", data.aws_region.current.name, local.cognito_user_pool_id)
    oauth_url               = format("https://%s.auth.%s.amazoncognito.com/oauth2/authorize", local.cognito_user_pool_domain, data.aws_region.current.name)
    token_url               = format("https://%s.auth.%s.amazoncognito.com/oauth2/token", local.cognito_user_pool_domain, data.aws_region.current.name)
    api_url                 = format("https://%s.auth.%s.amazoncognito.com/oauth2/userInfo", local.cognito_user_pool_domain, data.aws_region.current.name)
    client_id               = resource.aws_cognito_user_pool_client.client.id
    client_secret           = resource.aws_cognito_user_pool_client.client.client_secret
    oauth2_proxy_extra_args = []
  }
}
----

== Technical Reference

// BEGIN_TF_DOCS
=== Requirements

The following requirements are needed by this module:

- [[requirement_aws]] <<requirement_aws,aws>> (>= 4)

- [[requirement_null]] <<requirement_null,null>> (>= 3)

=== Providers

The following providers are used by this module:

- [[provider_aws]] <<provider_aws,aws>> (>= 4)

- [[provider_null]] <<provider_null,null>> (>= 3)

=== Resources

The following resources are used by this module:

- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user[aws_cognito_user.devops_stack_users] (resource)
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group[aws_cognito_user_group.devops_stack_admin_group] (resource)
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_in_group[aws_cognito_user_in_group.devops_stack_users] (resource)
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool[aws_cognito_user_pool.devops_stack_user_pool] (resource)
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_client[aws_cognito_user_pool_client.client] (resource)
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_domain[aws_cognito_user_pool_domain.devops_stack_user_pool_domain] (resource)
- https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource[null_resource.dependencies] (resource)
- https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource[null_resource.this] (resource)
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/region[aws_region.current] (data source)

=== Required Inputs

The following input variables are required:

==== [[input_cluster_name]] <<input_cluster_name,cluster_name>>

Description: Name given to the cluster. Value used for the ingress' URL of the application.

Type: `string`

==== [[input_base_domain]] <<input_base_domain,base_domain>>

Description: Base domain of the cluster. Value used for the ingress of .

Type: `string`

=== Optional Inputs

The following input variables are optional (have default values):

==== [[input_subdomain]] <<input_subdomain,subdomain>>

Description: Subdomain of the cluster. Value used for the ingress' URL of the application.

Type: `string`

Default: `"apps"`

==== [[input_dependency_ids]] <<input_dependency_ids,dependency_ids>>

Description: IDs of the other modules on which this module depends on.

Type: `map(string)`

Default: `{}`

==== [[input_create_pool]] <<input_create_pool,create_pool>>

Description: Boolean to activate the creation of the pool. If set as true you cannot specify the variables `cognito_user_pool_id` and `cognito_user_pool_domain`.

Type: `bool`

Default: `false`

==== [[input_cognito_user_pool_id]] <<input_cognito_user_pool_id,cognito_user_pool_id>>

Description: ID of the Cognito user pool to use. If the variable `create_pool` is activated, the module will create its own pool and this variable will not be used.

Type: `string`

Default: `null`

==== [[input_cognito_user_pool_domain]] <<input_cognito_user_pool_domain,cognito_user_pool_domain>>

Description: Domain prefix of the Cognito user pool to use (custom domain currently not supported!). If the variable `create_pool` is activated, the module will create its own pool and this variable will not be used.

Type: `string`

Default: `null`

==== [[input_callback_urls]] <<input_callback_urls,callback_urls>>

Description: List of URLs where the authentication server is allowed to return during the authentication flow. Will be concatenated with the default URLs pertaining to the DevOps Stack.

Type: `list(string)`

Default: `[]`

==== [[input_user_map]] <<input_user_map,user_map>>

Description: List of users to be added to the default admin group. Note that all fields are mandatory. These users will be given a temporary password on their invitation e-mail, so the address needs to be valid.

Type:
[source,hcl]
----
map(object({
    username   = string
    email      = string
    first_name = string
    last_name  = string
  }))
----

Default: `{}`

=== Outputs

The following outputs are exported:

==== [[output_id]] <<output_id,id>>

Description: ID to pass other modules in order to refer to this module as a dependency.

==== [[output_oidc]] <<output_oidc,oidc>>

Description: Object containing multiple OIDC configuration values.

==== [[output_devops_stack_admins]] <<output_devops_stack_admins,devops_stack_admins>>

Description: Map containing the usernames and e-mails of the created users from `var.user_map`.

==== [[output_cognito_user_pool_id]] <<output_cognito_user_pool_id,cognito_user_pool_id>>

Description: ID of the Cognito user pool. It will either be the ID of the pool created by this module or simply the ID that was given to the variable `cognito_user_pool_id`.
// END_TF_DOCS

=== Reference in table format 

.Show tables
[%collapsible]
====
// BEGIN_TF_TABLES
= Requirements

[cols="a,a",options="header,autowidth"]
|===
|Name |Version
|[[requirement_aws]] <<requirement_aws,aws>> |>= 4
|[[requirement_null]] <<requirement_null,null>> |>= 3
|===

= Providers

[cols="a,a",options="header,autowidth"]
|===
|Name |Version
|[[provider_aws]] <<provider_aws,aws>> |>= 4
|[[provider_null]] <<provider_null,null>> |>= 3
|===

= Resources

[cols="a,a",options="header,autowidth"]
|===
|Name |Type
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user[aws_cognito_user.devops_stack_users] |resource
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group[aws_cognito_user_group.devops_stack_admin_group] |resource
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_in_group[aws_cognito_user_in_group.devops_stack_users] |resource
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool[aws_cognito_user_pool.devops_stack_user_pool] |resource
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_client[aws_cognito_user_pool_client.client] |resource
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_domain[aws_cognito_user_pool_domain.devops_stack_user_pool_domain] |resource
|https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource[null_resource.dependencies] |resource
|https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource[null_resource.this] |resource
|https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/region[aws_region.current] |data source
|===

= Inputs

[cols="a,a,a,a,a",options="header,autowidth"]
|===
|Name |Description |Type |Default |Required
|[[input_cluster_name]] <<input_cluster_name,cluster_name>>
|Name given to the cluster. Value used for the ingress' URL of the application.
|`string`
|n/a
|yes

|[[input_base_domain]] <<input_base_domain,base_domain>>
|Base domain of the cluster. Value used for the ingress of .
|`string`
|n/a
|yes

|[[input_subdomain]] <<input_subdomain,subdomain>>
|Subdomain of the cluster. Value used for the ingress' URL of the application.
|`string`
|`"apps"`
|no

|[[input_dependency_ids]] <<input_dependency_ids,dependency_ids>>
|IDs of the other modules on which this module depends on.
|`map(string)`
|`{}`
|no

|[[input_create_pool]] <<input_create_pool,create_pool>>
|Boolean to activate the creation of the pool. If set as true you cannot specify the variables `cognito_user_pool_id` and `cognito_user_pool_domain`.
|`bool`
|`false`
|no

|[[input_cognito_user_pool_id]] <<input_cognito_user_pool_id,cognito_user_pool_id>>
|ID of the Cognito user pool to use. If the variable `create_pool` is activated, the module will create its own pool and this variable will not be used.
|`string`
|`null`
|no

|[[input_cognito_user_pool_domain]] <<input_cognito_user_pool_domain,cognito_user_pool_domain>>
|Domain prefix of the Cognito user pool to use (custom domain currently not supported!). If the variable `create_pool` is activated, the module will create its own pool and this variable will not be used.
|`string`
|`null`
|no

|[[input_callback_urls]] <<input_callback_urls,callback_urls>>
|List of URLs where the authentication server is allowed to return during the authentication flow. Will be concatenated with the default URLs pertaining to the DevOps Stack.
|`list(string)`
|`[]`
|no

|[[input_user_map]] <<input_user_map,user_map>>
|List of users to be added to the default admin group. Note that all fields are mandatory. These users will be given a temporary password on their invitation e-mail, so the address needs to be valid.
|

[source]
----
map(object({
    username   = string
    email      = string
    first_name = string
    last_name  = string
  }))
----

|`{}`
|no

|===

= Outputs

[cols="a,a",options="header,autowidth"]
|===
|Name |Description
|[[output_id]] <<output_id,id>> |ID to pass other modules in order to refer to this module as a dependency.
|[[output_oidc]] <<output_oidc,oidc>> |Object containing multiple OIDC configuration values.
|[[output_devops_stack_admins]] <<output_devops_stack_admins,devops_stack_admins>> |Map containing the usernames and e-mails of the created users from `var.user_map`.
|[[output_cognito_user_pool_id]] <<output_cognito_user_pool_id,cognito_user_pool_id>> |ID of the Cognito user pool. It will either be the ID of the pool created by this module or simply the ID that was given to the variable `cognito_user_pool_id`.
|===
// END_TF_TABLES
====
