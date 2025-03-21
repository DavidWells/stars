---
repo: ccoenraets/belgian-beer-explorer
url: 'https://github.com/ccoenraets/belgian-beer-explorer'
homepage: null
starredAt: '2015-12-30T00:51:32Z'
createdAt: '2015-01-06T16:32:09Z'
updatedAt: '2024-10-08T08:52:22Z'
language: JavaScript
license: NA
branch: master
stars: 205
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:35.568Z'
description: 'App built with React, Bootstrap, Node.js, Postgres'
tags: []
---

# Belgian Beer Explorer

Sample App demonstrating how to build applications with React, Node.js, and the Lightning Design System. Written with ECMAScript 6 on the client and on the server (leveraging the new ES6 support of Node.js 4+).

The back-end is built with **Node.js** using a **Postgres** database.

See it live here: [http://www.belgianbeerexplorer.com](http://www.belgianbeerexplorer.com).


## Automatic Deployment to Heroku

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com)

1. Click the Button below to deploy the application on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Your own instance of the application is automatically deployed, and your own Postgres database is populated with sample data.

1. If the Heroku Toolbelt is not install on your system, [install it](https://toolbelt.heroku.com/) now.

1. Open a browser, [access beers.sql](https://raw.githubusercontent.com/ccoenraets/belgian-beer-explorer/master/beers.sql), and save the file locally. 

1. On the command prompt, type the following command to populate your database: 
 
    ```
    heroku pg:psql --app YOUR_HEROKU_APP_NAME < beers.sql
    ```

## Local Installation

Follow the instructions below if you prefer to install the application on your local machine:

1. Install the latest version of [Node.js](https://nodejs.org). This application requires Node.js 4+.

1. Install [Postgres](http://www.postgresql.org/) locally 

1. Start Postgres and create a database called **belgianbeers**.

1. Clone this repository or download and unzip [this](https://github.com/ccoenraets/belgian-beer-explorer/archive/master.zip) zip file.

1. Navigate to the **belgian-beer-explorer** directory and install the project dependencies:

    ```
    npm install
    ```

1. Open **server/config.js** and make sure the **databaseURL** matches your configuration (use your user name)

1. Type the following command to build the client application:

    ```
    npm run webpack
    ```
    
    The project is written using ECMAScript 6 including ECMAScript 6 modules.

1. Type the following command to start the server:
    
    ```
    npm start
    ```
    
    The database is automatically populated
    
1. Open a browser and access [http://localhost:5000](http://localhost:5000)
