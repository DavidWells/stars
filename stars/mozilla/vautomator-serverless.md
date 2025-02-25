---
repo: mozilla/vautomator-serverless
url: 'https://github.com/mozilla/vautomator-serverless'
homepage: 'https://vautomator-serverless.rtfd.io/'
starredAt: '2020-03-23T00:17:09Z'
createdAt: '2019-03-04T03:09:36Z'
updatedAt: '2024-10-11T11:31:54Z'
language: Python
license: MPL-2.0
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:02.406Z'
description: vautomator-serverless is deprecated and no longer active
tags: []
---

**************************
vautomator-serverless : deprecated
**************************

vautomator-serverless is no longer supported. The Python package that the tool used to interact with the Tenable.io
API, `tenable-io <https://github.com/tenable/Tenable.io-SDK-for-Python>`_, was deprecated in 2020. In order
to fork this project and get it working, you'd need to update vautomator-serverless to use a different
Python package for interacting with Tenable.io

Original README
===========

This project used serverless framework and attempted to create a
serverless environment that could be used to automate vulnerability
assessment tasks from multiple ingestion points, such as on-demand
submission of a host via a REST API, regular scanning of a known list of hosts, and opportunistically scanning of hosts appearing in Certificate Transparency logs.

This is under development with more features being added as different
branches. The tool currently supports:

*   A single API endpoint (``/scan``) which performs all scans on a given host, and emails the results to desired email address(es).
*   Addition of a target to the scan queue for port scan by an API endpoint (``/ondemand/portscan``). 
*   Addition of a target to the scan queue for HTTP Observatory scan by an API endpoint (``/ondemand/httpobservatory``) 
*   Addition of a target to the scan queue for TLS Observatory scan by an API endpoint (``/ondemand/tlsobservatory``) 
*   Addition of a target to the scan queue for SSH Observatory scan by an API endpoint (``/ondemand/sshobservatory``)
*   Addition of a target to the scan queue for a directory enumeration scan (currently with ``dirb``) by an API endpoint (``/ondemand/direnum``)
*   Addition of a target to the scan queue for a Google web search by an API endpoint (``/ondemand/websearch``)
*   [OPTIONAL] Addition of a target to the scan queue for a Tenable.io scan by an API endpoint (``/ondemand/tenablescan``)
*   Performing requested scan type (port, HTTP Observatory, TLS Observatory or SSH Observatory) on hosts in the queue
*   Scheduled port scans from a hard-coded list of hosts (disabled by default)
*   Scheduled directory enumeration scans (via ``dirb``) from a hard-coded list of hosts (disabled by default)
*   Scheduled HTTP Observatory scans from a hard-coded list of hosts (disabled by default)
*   Scheduled TLS Observatory scans from a hard-coded list of hosts (disabled by default)
*   Scheduled SSH Observatory scans from a hard-coded list of hosts (disabled by default)
*   An endpoint to retrieve the scan results for a given host (``/results``)
*   Manually add a host to the scan queue (for PoC purposes).

All API endpoints are currently protected by an API key. Ideally this should be replaced with SSO integration.

Results from all scans are placed in an S3 bucket specified in
``serverless.yml``.

Port scans are performed using a `statically compiled nmap
binary <https://github.com/ernw/static-toolbox/releases/download/1.0.2/nmap-7.70SVN-b5bd185-x86_64-portable.zip>`_,
`packaged within the serverless
application <https://github.com/mozilla/vautomator-serverless/blob/master/serverless.yml#L64-L66>`_.

Directory enumeration scans are performed via ``dirb``, compiled
specifically for Amazon Linux and the binary and all supporting files
packaged within the serverless application, similar to the ``nmap``
binary.

.. note:: UDP port scans are not supported as Lamdba functions can not run as root/privileged users.

Setup
===========

Please refer to the setup steps `here <https://vautomator-serverless.rtfd.io/en/latest/setup.html>`_.

On-demand Scan REST APIs
=========================

Please refer to REST API documentation `here <https://vautomator-serverless.rtfd.io/en/latest/usage.html>`_.
