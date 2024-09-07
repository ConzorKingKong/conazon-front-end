FROM node:22.3.0-alpine3.19
WORKDIR /app
RUN mkdir public
RUN mkdir src
COPY package.json  ./
RUN npm install
COPY public ./public
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]