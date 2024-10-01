FROM node:10.24.1-alpine3.11
WORKDIR /app
COPY . .
RUN npm install
RUN npm run migrate
EXPOSE 8080
CMD [ "node", "./server" ]