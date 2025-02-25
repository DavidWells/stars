---
repo: bachors/Visitor-Parser-JS
url: 'https://github.com/bachors/Visitor-Parser-JS'
homepage: 'https://bachors.github.io/Visitor-Parser-JS/'
starredAt: '2019-10-06T05:44:04Z'
createdAt: '2016-12-03T01:09:22Z'
updatedAt: '2023-05-12T16:45:46Z'
language: JavaScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:21.106Z'
description: Visitor Parser JS
tags:
  - analytics
  - geolocation
  - javascript
  - seo
  - user-agent
  - visitor
---

<p>Lightweight javascript-based to analyze visitors with user-agent &amp; ip geo location parser.</p>
<h2>Usage</h2>
 

<h4>Default:</h4>
<pre>visitorParser(function(data) {
    console.log(data);
});</pre>


<h4>With Configuration:</h4>
<pre>var config = {
    // set user-agent string
    setUa: 'Mozilla/5.0 (Linux; U; Android 2.3.5; de-de; SAMSUNG GT-S5830/S5830BUKS2 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', 
    // get all options result of regex
    getOpt: true, 
    // set url ip geo location apis
    geoAPI: 'http://freegeoip.net/json/' 
};
visitorParser(config, function(data) {
    console.log(data);
});</pre>

<h2>Contribute</h2>
<ul>
<li>Fork and clone this repository</li>
<li>Make some changes as required</li>
</ul>

Hope will usefull for you all.

Question ? please email : <bachor.can@gmail.com>
