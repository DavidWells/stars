---
repo: genderev/assassin
url: 'https://github.com/genderev/assassin'
homepage: ''
starredAt: '2020-09-13T05:35:33Z'
createdAt: '2020-09-01T16:24:24Z'
updatedAt: '2025-01-27T23:19:27Z'
language: JavaScript
license: NA
branch: master
stars: 83
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:33.367Z'
description: >-
  Assassin is a decentralized database that uses background threads to kill slow
  JavaScript.
tags:
  - dat-protocol
  - database
  - decentralized
  - decentralized-database
  - distributed-systems
  - web-performance
  - web-worker
  - web-workers
---

<img alt="ASSASSIN" src="https://raw.githubusercontent.com/genderev/assassin/master/assets/assassin.png">



![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)
![GitHub license1](https://img.shields.io/github/languages/top/genderev/assassin)
![GitHub license](https://img.shields.io/github/issues-pr-closed-raw/genderev/assassin)
![GitHub license2](https://img.shields.io/github/languages/code-size/genderev/assassin)
![GitHub license31](https://img.shields.io/github/issues/genderev/assassin)
![GitHub license3](https://img.shields.io/github/issues-pr/genderev/assassin)
![GitHub license4](https://img.shields.io/github/contributors/genderev/assassin)
![GitHudk](https://img.shields.io/gitter/room/genderev/assassin)

<nav>
  <p><strong>Background</strong></p>
  <ul>
    <li><a href="#why-database">What problem does this solve?</a></li>
     <li><a href="#what-worker">What's a web worker?</a></li>
     <li><a href="#worker-picture">Web Workers Visualized</a></li>
  </ul>
  
  <p><strong>Usage</strong></p>
  <ul>
     <li><a href="#methods">Methods</a></li>

    
   <li><a href="#install-server">Server set up</a></li>

  <li><a href="#install-browser">Browser set up</a></li>
  </ul>
  
  
</nav>





<article>
<h1 id="why-database"> Why do we need a new database? </h1>
<ul><li> <strong><em>No existing decentralized databases</em> are compatible with <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">web workers</a>.</strong> </li></ul>
<h2 id="what-worker"> What are web workers? </h2>
  <ul>
<li> <strong>You can outsource JavaScript to web workers. </strong></li>
    <li>Web workers allow you to run multi-threaded JavaScript.</li> 
  <li>When you run JavaScript in parallel to the main thread, the main thread is free to respond to user input.  </li>
    </ul>
<h3 id="worker-picture"> Can you explain web workers with a picture? </h3>
<p>You can see in the diagram that without web workers (that's the "before" part of the picture), the main thread has to finish processing all JavaScript before responding to user input. With the use of web workers (that's the "after" part of the picture), the main thread can send JavaScript to web workers and then focus on updating the UI.</p>
<img alt="web worker diagram" src="https://raw.githubusercontent.com/genderev/assassin/master/assets/diagram.png">

<h3 id="features">
  Features 💥
</h3>

<p>💫&nbsp;<strong> Lightweight</strong>: Shipped with less than 100 lines of client side code. </p>

<p>⚖️&nbsp;<strong> Decentralized</strong>: Your database has no single point of failure. If the server goes down, your data is easy to retrieve. </p>

<p>✨&nbsp;<strong> Works in private browsing</strong>: I researched databases like LevelDB, PouchDB, and Gun, which rely on <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a> for client-side storage. I wanted these databases to be effective, but I ended up creating this database partly because <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a> is disabled in private browsing, which means none of these databases work for me. </p> 

<p id="methods"><strong>Methods:</strong></p>

<ul>
<li>
  <code>killer.connect(url)</code> - Connect to the server. <code>url</code> refers to the url of the server. You put the server's url into this this function.</li>
<li>
<code>killer.create(key,value)</code> - Add an entry to the database.</li>
<li>
<code>killer.update(key,new value)</code> - Update the value of a key in the database.</li>
<li>
<code>killer.delete(key)</code> - Delete an entry in the database.</li>
<li>
<code>database</code> - Inside the main thread, you can always access the database through the variable called <code>database</code>. </li></ul>

<h3 id="install-server"> Get Started: Server </h3>
First, you need to make a <a href="https://fly.io/">fly.io</a> account. If you haven't already installed <a href="https://dev.to/skaytech/docker-fundamentals-2ibi">Docker</a>, <a href="https://docs.docker.com/get-docker/">install it</a> and have the daemon running while you deploy your server. To deploy your server, type this in your <a href="https://www.w3schools.com/whatis/whatis_cli.asp">terminal</a> and hit "Enter" after the end of each line.
<img alt="shell" src="https://raw.githubusercontent.com/genderev/assassin/master/assets/carbon(2).png">


You can copy and paste:
<pre>
cd /path/to/where_you_want_this_to_be_stored
git clone https://github.com/genderev/assassin_server.git
cd assassin_server
flyctl init
flyctl deploy
</pre>

You can also deploy your server to <a href="https://buddy.works">buddy.works</a> or <a href="https://begin.com/">begin.com</a> on your own, if you want.
<h3 id="install-browser"> Get Started: Browser </h3>

You can save this <a href="https://raw.githubusercontent.com/genderev/assassin/master/dist/assassin.js">file</a> or you can clone this repo and use <code>assassin.js</code> in the <code>dist</code> folder. <code>assassin.js</code> goes inside the web worker that the main thread posts messages to. You can see an example of how to do this in the <a href="https://github.com/genderev/assassin/tree/master/demo">source code</a> for the <a href="https://assassin-demo.surge.sh/">demo</a>.

<h3 id="arch">Architecture:</h3>

<ul>

<li><strong>Data Model</strong>: Assassin is a key/value store that supports mapping a key to its corresponding value. </li>

<li><strong> System Architecture</strong>: The DAT protocol distributes and hosts data between many computers, so there is no one location where data is stored. Assassin relies on the the DAT protocol for data persistence. The metadata of the key-value pairs are stored in a distributed <a href="https://en.wikipedia.org/wiki/Trie">trie</a> structure.</li>

<li><strong>Isolation Levels</strong>: The isolation level is determined by the end user of the database. Assassin is designed to have a low <a href="https://en.wikipedia.org/wiki/Isolation_(database_systems)">isolation level</a>.</li>

<li><strong>Storage Model</strong>: Assassin sends data to the server, which then stores the metadata in the distributed file system <a href="https://github.com/hypercore-protocol/hyperdrive">Hyperdrive,</a> which is built on the DAT protocol. The data itself is distributed and hosted between multiple peers.</li>

</ul>

<h3 id="name">Why is it called Assassin?</h3><ul>
<li>My website currently uses the <a href="https://gun.eco/">Gun</a> database.</li> <li> Gun has many features I like and the founder is pretty nice. </li><li> <strong>Gun stopped working for me.</strong></li> 
<li>Gun's  storage adapter <a href="https://gun.eco/docs/RAD">RAD</a> relies on IndexedDB, which is <strong>disabled in private browsing</strong>. </li><li>Gun syncs data peer to peer through WebRTC, which <strong>doesn't function in web workers.</strong></li>
<li>Assassin is sort of (seriously, very little) like Gun but for web workers.</li><li> <strong>Gun + worker = Assassin</strong> 💥 </li></ul>



<h4 id="demo">
  Demo 🚀 
</h4>

<p><a href="https://assassin-demo.surge.sh">https://assassin-demo.surge.sh</a></p>

<h4 id="built-with">
  Built with 🔧
</h4>

<ul>
<li>
<a href="https://github.com/hypercore-protocol/hyperdrive">Hyperdrive</a> - Thanks for the abstraction layer on top of DAT!</li>
<li>HTML - For creating the web demo</li>
<li>CSS - For styling the web demo</li>
<li>JavaScript - For logic</li>
<li>
<a href="https://nodejs.org">Node.js</a> - To serve the logic</li>
</ul>

<h3 id="connect">Make sure to share your opinion in:</h3>

<ul>
<li>the Assassin <a href="https://github.com/genderev/assassin/pulls">GitHub pull requests</a>
</li>
<li>the <a href="https://gitter.im/assassindb/community">Gitter server</a>
</li>
</ul>
     
<p>And if you really want to help make Assassin better, make a <a href="https://github.com/genderev/assassin/pulls">pull request</a>! I really want to Assassin to have these things, so make a <a href="https://github.com/genderev/assassin/pulls">pull request</a> showing how to add them:</p>
<ul>
  <li> User authentication </li>
 </ul>
 

<p><strong>Assassin is open source, and always will be.</strong></p>

<h3>
  <strong>Support me on:</strong>
</h3>

<ul>

<li><strong><a href="https://ko-fi.com/assassindb">Ko-Fi</a></strong></li>


</ul>

<p>Star the repo, <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fgenderev%2Fassassin&text=Assassin%20works%20to%20kill%20slow%20database%20transactions.">Tweet</a>, and share among your friends, teams and contacts! </p>
</article>
