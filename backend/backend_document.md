# Backend Documentation

## Installation

-   Open your terminal
-   Type (Make sure in the backend folder)
    -   cd backend
-   Type
    -   npm install
-   Wait for the install
-   Type
    -   npm start

## Technology Used

### Nodejs + Express

-   We use nodejs along with some useful frameworks like expressjs to build our backend.
-   All Dependencies are in backend/package.json

#### Important files:

-   ./server.js
    -   The start point of backend, the start() function will start the server.
-   controllers/auth.js
    -   All functions are in this file, such as user_list, register, login, add_friends, find_friends ...
-   routes/authRouter.js
    -   Router of the backend, used to decide the http rest apis.

### Mongodb

-   We use mongodb to store our data need for the project
-   For sprint 1, we are only storing users username, password and email in the database

#### Important files:

-   db/connect.js
    -   This file is used to connect with the database
-   models/User.js
    -   This file is used to define the type of user that we should store to the database
-   .env
    -   Stores some important constants: The connection url of the project, port and token expiry time... etc.

## End Points for Sprint 1

-   Get: API of All user lists (used for debug)
    -   localhost:5050/api/
-   Post: Register API
    -   localhost:5050/api/register
-   Post: login API
    -   localhost:5050/api/login
-   Get: API Profile Page (Need auth to see)
    -   localhost:5050/api/profile
-   Get: Logout API
    -   localhost:5050/api/logout

## End Points for Sprint 2

-   Post: Find friends
    -   localhost:5050/api/findf
-   Post: Find friends request
    -   localhost:5050/api/findfin
-   Post: Find friends sended
    -   localhost:5050/api/findfout
-   Post: User email to find a user
    -   localhost:5050/api/searchf
-   Post: Add a friend
    -   localhost:5050/api/addf
-   Post: Accept a friend
    -   localhost:5050/api/acceptf
-   Post: Reject a friend
    -   localhost:5050/api/rejectf
