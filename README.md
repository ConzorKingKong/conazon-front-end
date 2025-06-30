# Conazon Front-end

The front-end for Conazon. This project uses Nginx to reverse proxy api requests across the other go microservices. Session is handled in the cookies set by the [`conazon-users-and-auth`](https://github.com/conzorkingkong/conazon-users-and-auth) project.

This project requires a `.env` file configured as follows:

```
REACT_APP_PROTOCOL=http
REACT_APP_DOMAIN=localhost
```

and a `.env.backend`

```
JWTSECRET - Secret for JWT REQUIRED
CLIENTID - Client ID for Google Oauth REQUIRED
CLIENTSECRET - Secret for Google Oauth REQUIRED
REDIRECTURL - Redirect url for Google Oauth REQUIRED
EMAILPASSWORD - App password (not regular password) to gmail account — https://support.google.com/accounts/answer/185833?visit_id=638613322705524102-924909150&p=InvalidSecondFactor&rd=1 REQUIRED
DATABASEURL='host=postgres port=5432 user=postgres dbname=conazon sslmode=disable'
SECURECOOKIE - If true, enables secure on all cookies (only use cookie on https). Otherwise, default value of `false` is used. MUST BE TRUE IN PROD
RABBITMQURL - URL to RabbitMQ instance. Defaults to a docker container if not given
```

Then run

`docker-compose up`

to run the project.

All other `conazon` back-end endpoints must be running for the project to work

The docker container is currently configured to just run `npm start` for development purposes. You should change this to build and serve when officially deploying.
