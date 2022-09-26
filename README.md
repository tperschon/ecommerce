[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Table of Contents

[Description](#Description)

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Questions](#Questions)

# Description
```
An ecommerce backend databasing system
```
- Demonstrates CRUD operations using Express routes and Sequelize
- Sends data back to the client in JSON format
# Installation
```
If you don't already have node.js, install node.js
If you don't already have mysql installed, this also must be installed
Navigate to the project directory via a command line interface such as bash, powershell, or zshell
```
```
Use the command 'npm install' to install dependencies from the package.json with version control from package-lock.json
Still using the CLI, navigate to the db folder within the project folder
Use the command 'mysql -u <user> -p' whereas <user> refers to the user you're logging into mysql with, entering your password into the CLI prompt
Use the command 'source schema.sql' to create the database. If the database already exists, it will be dropped(deleted) and created fresh
Exit mysql using the command 'exit' and then navigate up a level to the root folder of the project with 'cd ../'
Use the command 'npm run seed' to seed the database with some base data
```
# Usage
```
Use a command line interface to navigate to the project folder
To start the application, run the command 'npm start'
Test the application's ability using Insomnia or another similar program
Ensure that requests are properly formatted
Routes go through /api/<route> whereas <route> should be replaced with products, tags or categories
Routes that utilize ids will need a /<id> appended to the route, whereas <id> should be replaced with the numeric id of the resource you wish to interact with
Routes that create or change data will need a JSON body on the request, the format of the body can be determined by examining the models
```
# Contributing
If you would like to contribute to the project, it can be found here: [ecommerce](https://github.com/tperschon/ecommerce)
# Questions
If you have any questions, I can be reached via: [Github](github.com/tperschon) and [E-Mail](timperschon@gmail.com)
