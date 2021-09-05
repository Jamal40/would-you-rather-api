# Would-You-Rather-API
Thsi application is the back-end api service for the repo "would-you-rather-api". 

## What is this project built for?
This API service is manly built connect the React app with databse. To handle authentication, validation and also to query the required datasets.

## Technology:
The API is built using Nodejs and express.js and mongoDB as database. Atlas is used to host the databse, Heroku to host the API service.

## Architecture
I have deliberately avoided querying the result in the client side (API-server). All the queries has been written using Aggregate framework in mongoDB.
The database is structured well according to Many-to-many or one-to-many or any other relationships and joining queries along with a lot of other advanced coomplex queries has been achieved with mongoDB(aggregate).

## Dependecies
Express.js
Joi (for validation)
bcrypt (for hashing password)

To take a look at the clien-app go to this repo:
https://github.com/Jamal40/would-you-rather

Thanks <3
