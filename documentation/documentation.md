# Documentation

## Running locally

In the project root folder, run:

* npm install
* npm run build:ui
* npm start

Check also, that frontend dependencies are installed with `npm install` in folder `frontend`.

The app will run on address `http://localhost:3001/`.

Testing backend: `npm test`

Linting frontend: `npm run eslint`

To run only frontend locally, run `npm start` in folder `frontend`. Frontend will run locally on port `3000`.

Deploying to heroku: `npm run deploy:full` or `npm run deploy` or `git push heroku master`

## Env-variables

Env-variables are used in the project. Create file `.env` in the root folder and add the following items to it:

* `SECRET=` (For authentication)
* `MONGODB_URI=` (For database, MongoDB-address)
* `MONGODB_TEST_URI=` (For testing in DB, not necessary)
* `AWS_ACCESS_KEY_ID=` (Your AWS key ID)
* `AWS_SECRET_ACCESS_KEY=` (Your AWS secret key)
* `S3_BUCKET_NAME=` (Your AWS S3 bucket name)

## React-star-rating-component

https://www.npmjs.com/package/react-star-rating-component
