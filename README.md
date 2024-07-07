# Conazon Front-end

The front-end for Conazon. This project uses Nginx to reverse proxy api requests across the other go microservices. Session is handled in the cookies set by the `conazon-users-and-auth` project.

This project requires a .env file configured as follows:

```
REACT_APP_PROTOCOL=http
REACT_APP_DOMAIN=localhost
```

and a .env.backend

```
JWTSECRET
CLIENTID
CLIENTSECRET
REDIRECTURL
DATABASEURL='host=postgres port=5432 user=postgres dbname=conazon sslmode=disable'
SECURECOOKIE
```

Run `docker-compose up` to run the project. All other `conazon` back-end endpoints must be running for the project to work

The docker container is currently configured to just run `npm start` for development purposes. You should change this to build and serve when officially deploying.
