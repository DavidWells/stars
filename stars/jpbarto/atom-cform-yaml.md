---
repo: jpbarto/atom-cform-yaml
url: 'https://github.com/jpbarto/atom-cform-yaml'
homepage: null
starredAt: '2016-12-16T19:10:09Z'
createdAt: '2016-10-25T22:04:03Z'
updatedAt: '2025-01-13T14:10:27Z'
language: Python
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:51.185Z'
description: >-
  A package based on atom-cform to help Atom users create YAML AWS
  CloudFormation templates 
tags: []
---

# atom-cform-yaml package

A package based on [atom-cform](https://github.com/dgomesbr/atom-cform) to help Atom users create YAML AWS CloudFormation templates.

The package snippets are now derived automatically from the published [AWS CloudFormation Resource Specification](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html).  This enables the snippets to be more complete but perhaps a little less helpful. Any comments on how to improve usability now that the snippets are auto-generated are welcomed.

# Demo
![30 seconds or less...](http://i.giphy.com/xUPGcB7Ovwa7WbkS6A.gif)

# Usage
1. Create an empty ```*.yaml``` file and type ```stack-start``` - a skeleton YAML CloudFormation template will appear.
2. Under each section begin typing the 'thing' you are trying to define, such as ```stack-parameter```, ```metadata-interface```, or ```ec2-instance```.  The package will populate the template for you.
3. Tab through the different fields and fill in your values.
4. Save the template and run it through the AWS CloudFormation console or deploy the template using the AWS CLI.
5. Have fun and get building!

# Help

### Autocomplete doesn't work?
If autocomplete doesn't work for you it could be because of  [atom/autocomplete-snippets#55](https://github.com/atom/autocomplete-snippets/issues/55). [autocomplete-snippets/pull/77](https://github.com/atom/autocomplete-snippets/pull/77) has been submitted to fix the issue but until it's released you may have to make the change yourself.
1. Clone ```https://github.com/atom/autocomplete-snippets.git``` into a folder of your choosing.
2. Change the files as documented in [autocomplete-snippets/pull/77](https://github.com/atom/autocomplete-snippets/pull/77).
3. cd into the ```autocomplete-snippets``` folder and run ```apm link .```.  This will create a link inside ~/.atom/packages to the folder in which you download autocomplete-snippets.
4. Reload the Atom window.
5. In Atom go to ```Preferences...```, ```Packages```, search for ```autocomplete-snippets```. Click on ```Settings```
6. Remove ```.string``` from ```Disable Snippet Autocompletion Selector String```.
7. Reload the Atom window.

_Uninstall fixed version of ```autocomplete-snippets```_
1. Run ```apm unlink ~/.atom/packages/atom-cform-yaml```
2. Reload the Atom window

=======
