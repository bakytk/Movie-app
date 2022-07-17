
# Movie-api


##### Database

API calls log `movies` data with four columns: `Title, Released, Genre, Director` to MongoDB. 
`mongoose` is used as ORM


##### Endpoints

The `Express` server supports 3 endpoints:

1. `/auth (POST)`: to get JWT token for protected route `/movies` passing either `basic-thomas` or `premium-jim` with their associated passwords

1. `/movies (GET)`: controller resolves JWT token data, getting its name, and returns all movies saved by username

1. `/movies (POST)`: `title` is parsed from req.body, and if film not is not already saved, the controllers fetch data from `OMDB` api by title and saves into the global collection stored in `MongoDB`

A constraint is imposed on `basic` plan user to save more than 5 films per calendar month


##### Parameters


`IS_GITHUB_ACTION` parameter is a boolean that is `true` if the code is run by `github_workflows`

It was introduced so as to test app when there's eg `push` event into `dev` branch.
Otherwise, `npm test` command is used as main rather than `npm start`, otherwise app will run indefinitely, consuming runtime limits

The list of parameters with default values is as follows:

```
IS_GITHUB_ACTION=false
JWT_SECRET=
APP_PORT=17000 #express server
OMDB_API_KEY=
DB_USER=
DB_PWD=
DB_NAME=movies
DB_PORT=27017
```

##### Mocha tests


`mocha-chai`, the `test/index` are used to make basic checks on the work of the app:

1. authentication for the `basic` user, getting JWT_TOKEN (adding authentication for `premium` user could be a straightforward extension)

1. `/movies (POST & GET)` calls, expecting server response status to be `200`


##### Start & Deployment


```
# to run and test locally 
docker-compose up --build
``` 

`github_workflows` trigger events are set for:

1. `push` for `dev` branch, or
1. `pull_request` into `master or main` branches

Note that `--exit-code-from` flag, when instantiating code in `github_workflows` helps exit from `express` app, terminating work of both server and mongo_db containers - this is useful for `npm test`

To test locally, run the following:

```
# start locally (default port: 17000)
docker-compose up --build

# when server is up localhost
# cURL or POSTMAN commands can be passed as given by instructions:

curl --location --request POST 'http://localhist:17000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'

curl --location --request GET 'http://localhost:17000/movies' \
--header 'Authorization: Bearer <your-JWT-token>'

curl --location --request POST 'http://localhost:17000/movies' \
--header 'Authorization: Bearer <your-JWT-token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Avatar"
}'
```
