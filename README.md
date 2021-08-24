# Crud-Test

Crud-Test implemented in Node.Js & MongoDB

# About

User-Post CRUD backend server implemented in Node.Js-Express. Database was made with MongoDB.

Project consist in two routes:

-   /users
-   /posts

In each route, content can be Created, Read, Updated or Deleted.

Unitary Test where made with Jest and Supertest.
Test coverages up to 76%.

This coverage can be seen at ./coverage/lcov-report/index.html

User Docker and Docker-Compose.

# Can I try it at home?

Sure!

-   If you have Node and an IDE(like Visual Studio Code or Sublime Text, among others), just clone this repo and run npm install.

-   Then create a .env file with the following variables, you may use these:
    (
    PORT=3001
    JWT_KEY=mysecretkey
    MONGO_DB_URI=mongodb://localhost/crud
    MONGO_DB_TEST=mongodb://localhost:/crud_test
    xMONGO_DB_URI=mongodb://mongo:27017/crud
    )

-   Then run "npm start" and server will start listening on port 3001.

-   Tests can be seen with "npm run test"

-   Docker and Docker-compose ready. Just do:

    -   docker-compose build
    -   docker-compose up

    And server will be listening on port 5000

Disclaimer: Had problems using .env with docker-compose, so I just hardcoded the DB conectionString.
