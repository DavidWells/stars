---
repo: hueper/PDF-Analytics
url: 'https://github.com/hueper/PDF-Analytics'
homepage: null
starredAt: '2019-10-06T19:59:06Z'
createdAt: '2017-02-22T15:44:58Z'
updatedAt: '2024-12-25T18:27:49Z'
language: JavaScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:17.936Z'
description: Tracking user interaction within a PDF
tags:
  - analytics
  - git
  - html5
  - javascript
  - mozilla
  - pdf
---

## PDF-Analytics
Tracking user interaction within a PDF

We are using PDF.js a JavaScript library to parse PDF files using the HTML5 Canvas. The browser output is HTML, not a PDF. That makes tracking easy as cake.

#### Requirements
* [Git](https://git-scm.com/downloads)
* [PDF.js](https://github.com/mozilla/pdf.js/) by mozilla
* [Google Analytics](https://analytics.google.com/)

#### Interactions

###### pagechange (user scrolls to another page)

###### click
* download
* print
* zoomIn
* zoomOut
* presentationMode
* viewFind (user searches)

#### How to track

1. Get Git:<br/>
https://git-scm.com/downloads

2. Get the JavaScript tracking snippet:<br/>
https://developers.google.com/analytics/devguides/collection/analyticsjs/

3. Get [PDF.js](https://github.com/mozilla/pdf.js/):
```bash
    $ git clone git://github.com/mozilla/pdf.js.git
    $ cd pdf.js
    # following pdf.js install instructions https://github.com/mozilla/pdf.js#getting-the-code:
    $ npm install -g gulp-cli
    $ npm install
    $ gulp server
    # open http://localhost:8888/web/viewer.html
```

4. Add pdf-analytics.js:
  - add pdf-analytics.js to pdf.js/web
  - add your JavaScript tracking snippet to pdf.js/viewer.html (right before the closing body tag):

  ```html
    <script src="pdf-analytics.js"></script>
      <script>
        var trackInteraction = function(cat, url) {
         ga('send', 'event', cat, 'scroll', url, {
          'transport': 'beacon'
         });
        }
     </script>
     <script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

       ga('create', 'YOUR-TRACKING-ID', 'auto');
       ga('send', 'pageview');

     </script>
   </body>
  ```
  Done

#### Contributions
Are very welcome

#### License
MIT
