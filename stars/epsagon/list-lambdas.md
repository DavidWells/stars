---
repo: epsagon/list-lambdas
url: 'https://github.com/epsagon/list-lambdas'
homepage: 'https://epsagon.com'
starredAt: '2018-02-11T23:15:09Z'
createdAt: '2018-01-26T13:18:49Z'
updatedAt: '2024-08-13T13:01:53Z'
language: Python
license: MIT
branch: master
stars: 187
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:28.647Z'
description: "Enumerate Lambda functions across all regions with useful metadata \U0001F4A1\U0001F4B5⚙"
tags:
  - aws-lambda
  - devops
  - devops-tools
  - epsagon
  - lambda
  - serverless
  - serverless-functions
---

List Lambdas functions
=====================

.. image:: https://github.com/epsagon/list-lambdas/blob/master/list-lambdas.png
   :align: center

(Based on `photo <https://commons.wikimedia.org/wiki/File:AWS_Lambda_logo.svg>`_ by Valve Software / `CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0/deed.en>`_)





Motivation
----------
- Read our blog post, `"The curse of dead Lambda functions" <https://epsagon.com/tools/the-curse-of-dead-aws-lambda-functions/>`__.
- Enumerate list of Lambda functions from **every region**.
- Detect **"dead"** or unused Lambda functions.


Setup
-----
.. code-block:: bash

    git clone https://github.com/epsagon/list-lambdas
    cd list-lambdas/
    pip install -r requirements.txt
    python list_lambdas.py

Docker
-----
.. code-block:: bash

    git clone https://github.com/epsagon/list-lambdas
    cd list-lambdas/
    docker build -t list_lambdas:latest .
    docker run --rm -v $HOME/.aws:/root/.aws -t list_lambdas:latest --profile myprofile


Example Outputs
---------------

CLI:

.. image:: https://github.com/epsagon/list-lambdas/blob/master/examples/cli.png

CSV file:

.. image:: https://github.com/epsagon/list-lambdas/blob/master/examples/csv.png


Usage
-----

Filter only Lambda functions that have not been active in the last 10 days:

.. code-block:: bash

    python list_lambdas.py --inactive-days-filter 10

Print extended information to the screen (same as in the CSV file):

.. code-block:: bash

    python list_lambdas.py --all

Sort by a chosen column (e.g. by last invocation time):

.. code-block:: bash

    python list_lambdas.py --sort-by last-invocation

Output table (**with extra data**) to a CSV file:

.. code-block:: bash

    python list_lambdas.py --csv lambdas.csv

Provide credentials:

.. code-block:: bash

    python list_lambdas.py --token-key-id <access_key_id> --token-secret <secret_access_key>
