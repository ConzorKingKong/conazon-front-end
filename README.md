# Conazon Front-end

The front-end for Conazon. This project uses Nginx to reverse proxy api requests across the other go microservices. Session is handled in the cookies set by the `conazon-users-and-auth` project.

Run `docker-compose up` to run the project

The docker container is currently configured to just run `npm start` for development purposes. You should change this to build and serve when officially deploying.
