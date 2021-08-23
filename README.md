# Crud-Test

Crud-Test implemented in Node.Js

# About

User-Post CRUD backend server implemented in Node.Js-Express. Database was made with MongoDB.

Project consist in two routes:

-   /users
-   /posts

In each route, content can be Created, Read, Updated or Deleted.

Unitary Test where made with Jest and Supertest.
Test coverages up to 76%.

This coverage can be seen at ./coverage/lcov-report/index.html

Docker and Docker-compose is set but not working as intended

# Can I try it at home?

Sure!

-   If you have Node and an IDE, just clone this repo and run npm install.

-   To set .env you can use(
    PORT=3001
    JWT_KEY=mysecretkey
    MONGO_DB_URI=mongodb://localhost/crud
    MONGO_DB_TEST=mongodb://localhost:/crud_test
    xMONGO_DB_URI=mongodb://mongo:27017/crud
    )

-   Then run "npm start" and server will listen on port 3001.

-   Tests can be run with "npm run test"

-   Docker and Docker-compose are still on development.
