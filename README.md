
# Movie-api


##### Database

Since we need to store on only `movies` data with four columns: `Title, Released, Genre, Director` - without any calls or nesting with other models, a document-oriented Mongo seems as a natural choice. `mongoose` is popular ORM over Mongo, allowing to bind `quasi-schema` on db and making other goodies like `type-checking` for the fields (columns)


##### Endpoints

The server (on `Express`) supports 3 endpoints:

1. `/auth (POST)`: to get JWT token for protected route `/movies` passing either `basic-thomas` or `premium-jim` with their associated passwords

1. `/movies (GET)`: controller resolves JWT token data, getting its name, and returns all movies saved by username

1. `/movies (POST)`: `title` is parsed from req.body, and if film not is not already saved, the controllers fetch data from `OMDB` api by title and saves into the global collection stored in `MongoDB`

The constraint that `basic` plan user cannot save more than 5 films per calendar month was observed


##### Parameters


Most parameters are self-explanatory and included in `.env` file, it should normally be hidden by default, but for task/code replicability, it's published in repo

The only specific parameter is `IS_GITHUB_ACTION`: this is a boolean that is `true` if the code is run by `github_workflows`. Access to that runtime environment is limited so only `npm test` is run, while `npm start` runs when environment is eg localhost, where one can server functions more thoroughly

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


Not much time was invested into test coverage, yet using `mocha-chai`, the `test/index` code checks if the following can be run:

1. authentication for the `basic` user, getting JWT_TOKEN (adding authentication for `premium` user could be a straightforward extension)

1. `/movies (POST & GET)` calls, expecting server response status to be `200`


##### Start & Deployment


The code can either be run locally with `docker-compose` installed, or can be run with `github_workflows` with trigger events defined to be either:

1. `push` for `test_ci_cd` branch, or
1. `pull_request` into `master or main` branches

Note that `--exit-code-from` flag, when instantiating code in `github_workflows` helps exit from `express` app, terminating work of both server and mongo_db containers - this is useful for `npm test`

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
