# Documentation

## Running locally

In the project root folder, run:

* npm install
* npm run build:ui
* npm start

Check also that frontend dependencies are installed with `npm install` in `/frontend`.

The app will run on address `http://localhost:3001/`.

Testing backend: `npm test`

Linting frontend: `cd frontend/ && npm run eslint`

To run only frontend locally, run `npm start` in `frontend/`. Frontend will run locally on port `3000`.

Deploying to heroku: `npm run deploy:full` or `npm run deploy` or `git push heroku master`

## Env-variables

Env-variables are used in the project. Create a `.env` file in the root folder and add the following items to it:

* `SECRET=` (For authentication)
* `MONGODB_URI=` (For database, MongoDB-address)
* `MONGODB_TEST_URI=` (For testing in DB, not necessary)
* `AWS_ACCESS_KEY_ID=` (Your AWS key ID)
* `AWS_SECRET_ACCESS_KEY=` (Your AWS secret key)
* `S3_BUCKET_NAME=` (Your AWS S3 bucket name)

`.env.example` shows an example.

## React-star-rating-component

https://www.npmjs.com/package/react-star-rating-component


## Heroku

The project is running on Heroku (https://categapp.herokuapp.com/).
Username and password for testing purposes:
username
password


## System goals

The goal was to create a service for uploading images with login functionality. The service is imported from GitHub to GitLab (version.helsinki.fi), and the service is running in Heroku. The goal was also to use MongoDB for storing data and AWS S3 for storing images + some other frameworks, like react-star-rating-component. The user can crete new categories and sub-categories. Each category may have multiple items including images and description. The items can be rated: it's possible to give 1-5 stars for each item. One example of the categories: Main category Locations, each location has its own sub-category and each sub-category (i.e. a specific location) can have multiple images of that location. The categories can also be updated, deleted and sorted.

## System architecture

The application is built with node.js and is using Express.js in server-side. MongoDB is used for storing, updating, reading and deleting data. AWS S3 is used for storing images. The image uploading happens with multer (https://www.npmjs.com/package/multer). The structure is the following: There are controllers for category, image, user, login, s3 and testing. Then there are models for category, image and user. Each model uses MongoDB mongoose.Schema for defining the properties of objects. There are unit tests for category and user, and also integration tests. Locally, an uploads folder is used for storing images.

The system frontend code is built with React.js and is located in a separate directory. The frontend must be built before starting the application, if changes have been made. Frontend has cypress tests, unit tests and linting possibility. The frontend code is divided into components and services. Components include the displayed components, e.g. LoginForm.js and MainPage.js. Services send requests to backend and return data. Styles are defined in app.css.

## Components / Module description including the interfaces exposed between the modules and communication between the modules

The login functionality uses jwt (https://jwt.io/), bcrypt (https://www.npmjs.com/package/bcrypt) and tokenization. 
Services use axios (https://www.npmjs.com/package/axios) to poll backend and fetch data. AWS S3 (https://aws.amazon.com/s3/) is used for storing the images. The communication between the system and MongoDB database happens via mongoose (https://mongoosejs.com/). The code is stored in GitHub and imported to GitLab, and the application is hosted by Heroku. The env-variables (e.g. MongoDB urls and AWS Access Keys + S3 Bucket name) are stored in Heroku. React-star-rating-component is used for setting the ratings. The rating happens via update (PUT-request).


## Pros and cons of the open-source components/modules used for developing the system

Mongoose provides a straight-forward schema-based solution to model the application data with MongoDB. It includes e.g. validation, queries and built-in type casting.
Axios is a promise-based HTTP Client for node.js. It can make XMLHttpRequests from the browser and HTTP requests from node.js. It's really popular framework for fetching data. It can automatically transform request and response data for JSON and supports the Promise API (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). AWS S3 is really scalable service with lots of storage. It's stable and there are many different storage classes available. The durability is high, and it's quite easy to integrate with other AWS products. It allows also encryption and is developer-friendly. Cons are related to the pricing, if a lot of data is stored in AWS. The pricing schema is a bit complex, and downloading data can be expensive. It of course depends on the amount of data. New users get free storage for a period, it's often one year. For beginners, AWS may not be so intuitive with many complex options. It can require configuring additional services, and there are lots of options. The service can also sometimes be a bit slow (especially the cheaper alternatives). But all in all, it's very popular and widespread service.

JWT (JSON Web Tokens) is a very popular technology for authetication. It's URL-safe and cryptographically signed. HTTPS is recommended with JWT. It provides cryptographically safe and trustful authentication. It can be used to encypt various data. On the other hand, the use of JWT can increase the potential for mistakes, because it has a wide range of features and is large. Additionally, JWT cannot be removed at the end of a session, because it's self-contained.


## Which of the fallacies of the distributed system is the system violating?

- The network is reliable. It's not quarenteed that the network is always reliable. There can exist interruptions in the user's own network, in Heroku or in AWS. Interruptions or service breaks can result in poor user experience.
- Latency is zero. There can be some latency.
- Bandwidth is infinite. The bandwidth has it's own limits, e.g. when creating or deleting multiple items at the same time.


## What needs to be added to the system to be integrated/extended by another system

The application can be used or extended by another system. It's possible to clone the application, create a new MongoDB database cluster and AWS S3 bucket, and define new env-variables. The application can be deployed to Heroku or also to another hosting service. The application can be extended. The code is publically available.


## Evaluation. Methodology used for evaluating the system performance, and the key results

The application has cypress-tests, integration tests and unit tests for testing the performance. The application can also be tested manually in Heroku. The application runs smoothly, although some post-operations may take a few seconds.

## Avenues for future work

Future work include maybe some cleaning of the code and tests, and defining more css-rules to make the application visually even better. It would also be nice to build a some kind of search bar and more functionalities, like downloading images and registering new users in the application.
